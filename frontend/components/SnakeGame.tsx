import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GRID_SIZE, Direction, Point, INITIAL_SPEED, SPEED_INCREMENT, MIN_SPEED } from '../constants';

type GameState = {
    snake: Point[];
    food: Point;
    dir: Direction;
    gameOver: boolean;
    score: number;
    isPaused: boolean;
    speed: number;
};

const generateFood = (snake: Point[]): Point => {
    let newFood: Point;
    let isOccupied = true;
    while (isOccupied) {
        newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
        // eslint-disable-next-line no-loop-func
        isOccupied = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    }
    return newFood!;
};

const initialSnake: Point[] = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
];

const initialState: GameState = {
    snake: initialSnake,
    food: { x: 5, y: 5 }, // Will be regenerated on mount
    dir: Direction.UP,
    gameOver: false,
    score: 0,
    isPaused: true,
    speed: INITIAL_SPEED
};

const SnakeGame: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(initialState);
    const nextDirRef = useRef<Direction>(Direction.UP);
    const currentDirRef = useRef<Direction>(Direction.UP);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Initialize food properly on mount
    useEffect(() => {
        setGameState(prev => ({ ...prev, food: generateFood(prev.snake) }));
        if (gameContainerRef.current) {
            gameContainerRef.current.focus();
        }
    }, []);

    // Handle Keyboard Input
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent default scrolling for arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }

            const current = currentDirRef.current;
            
            if (e.key === ' ') {
                setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
                return;
            }

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (current !== Direction.DOWN) nextDirRef.current = Direction.UP;
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (current !== Direction.UP) nextDirRef.current = Direction.DOWN;
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (current !== Direction.RIGHT) nextDirRef.current = Direction.LEFT;
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (current !== Direction.LEFT) nextDirRef.current = Direction.RIGHT;
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Game Loop
    useEffect(() => {
        if (gameState.isPaused || gameState.gameOver) return;

        const moveSnake = () => {
            setGameState(prev => {
                if (prev.gameOver) return prev;

                const dir = nextDirRef.current;
                currentDirRef.current = dir; // Lock in the direction for this tick

                const head = prev.snake[0];
                const newHead = { ...head };

                switch (dir) {
                    case Direction.UP: newHead.y -= 1; break;
                    case Direction.DOWN: newHead.y += 1; break;
                    case Direction.LEFT: newHead.x -= 1; break;
                    case Direction.RIGHT: newHead.x += 1; break;
                }

                // Check Wall Collision
                if (
                    newHead.x < 0 || newHead.x >= GRID_SIZE ||
                    newHead.y < 0 || newHead.y >= GRID_SIZE
                ) {
                    return { ...prev, gameOver: true };
                }

                // Check Self Collision
                if (prev.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    return { ...prev, gameOver: true };
                }

                const newSnake = [newHead, ...prev.snake];
                let newScore = prev.score;
                let newFood = prev.food;
                let newSpeed = prev.speed;

                // Check Food Collision
                if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
                    newScore += 10;
                    newFood = generateFood(newSnake);
                    newSpeed = Math.max(MIN_SPEED, prev.speed - SPEED_INCREMENT);
                } else {
                    newSnake.pop(); // Remove tail if no food eaten
                }

                return {
                    ...prev,
                    snake: newSnake,
                    food: newFood,
                    score: newScore,
                    speed: newSpeed,
                    dir: dir
                };
            });
        };

        const intervalId = setInterval(moveSnake, gameState.speed);
        return () => clearInterval(intervalId);
    }, [gameState.isPaused, gameState.gameOver, gameState.speed]);

    const resetGame = () => {
        setGameState({
            ...initialState,
            food: generateFood(initialSnake),
            isPaused: false
        });
        nextDirRef.current = Direction.UP;
        currentDirRef.current = Direction.UP;
        if (gameContainerRef.current) {
            gameContainerRef.current.focus();
        }
    };

    const togglePause = () => {
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
        if (gameContainerRef.current) {
            gameContainerRef.current.focus();
        }
    };

    // Render Grid
    const renderGrid = () => {
        const cells = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const isSnakeHead = gameState.snake[0].x === x && gameState.snake[0].y === y;
                const isSnakeBody = gameState.snake.some((s, i) => i !== 0 && s.x === x && s.y === y);
                const isFood = gameState.food.x === x && gameState.food.y === y;

                let cellClass = "w-full h-full rounded-sm transition-all duration-75 ";
                
                if (isSnakeHead) {
                    cellClass += "bg-neon-green shadow-[0_0_12px_rgba(0,255,0,0.9)] z-10 relative scale-110";
                } else if (isSnakeBody) {
                    cellClass += "bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]";
                } else if (isFood) {
                    cellClass += "bg-neon-pink shadow-[0_0_15px_rgba(255,0,255,0.9)] animate-pulse rounded-full scale-75";
                } else {
                    cellClass += "bg-gray-900/30 border border-gray-800/30";
                }

                cells.push(
                    <div key={`${x}-${y}`} className="p-[1px]">
                        <div className={cellClass} />
                    </div>
                );
            }
        }
        return cells;
    };

    return (
        <div className="flex flex-col items-center space-y-6 w-full max-w-2xl">
            
            {/* Score Board */}
            <div className="flex justify-between items-center w-full px-6 py-4 bg-gray-900/80 border border-neon-pink/30 rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(255,0,255,0.15)]">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Score</span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-purple-500 drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]">
                        {gameState.score.toString().padStart(4, '0')}
                    </span>
                </div>
                
                <div className="flex space-x-4">
                    <button 
                        onClick={togglePause}
                        className="px-6 py-2 rounded-full bg-gray-800 text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300 font-bold tracking-wider uppercase text-sm focus:outline-none"
                    >
                        {gameState.isPaused && !gameState.gameOver ? 'Resume' : 'Pause'}
                    </button>
                    <button 
                        onClick={resetGame}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-neon-pink to-purple-600 text-white shadow-[0_0_15px_rgba(255,0,255,0.5)] hover:shadow-[0_0_25px_rgba(255,0,255,0.8)] hover:scale-105 transition-all duration-300 font-bold tracking-wider uppercase text-sm focus:outline-none"
                    >
                        Restart
                    </button>
                </div>
            </div>

            {/* Game Board Container */}
            <div 
                ref={gameContainerRef}
                tabIndex={0}
                className="relative outline-none group"
            >
                {/* Outer Glow Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                
                {/* Actual Grid */}
                <div 
                    className="relative bg-black border-2 border-gray-800 rounded-xl overflow-hidden shadow-2xl"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                        width: 'min(90vw, 500px)',
                        height: 'min(90vw, 500px)'
                    }}
                >
                    {renderGrid()}

                    {/* Overlays */}
                    {gameState.gameOver && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] mb-4 animate-pulse">
                                GAME OVER
                            </h2>
                            <p className="text-xl text-gray-300 mb-8">Final Score: <span className="text-neon-pink font-bold">{gameState.score}</span></p>
                            <button 
                                onClick={resetGame}
                                className="px-8 py-3 rounded-full bg-red-600 text-white font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:bg-red-500 hover:scale-110 transition-all duration-300"
                            >
                                Play Again
                            </button>
                        </div>
                    )}

                    {gameState.isPaused && !gameState.gameOver && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
                            <h2 className="text-4xl font-black text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                                PAUSED
                            </h2>
                        </div>
                    )}
                </div>
            </div>
            
            <p className="text-gray-500 text-sm tracking-widest uppercase">Use Arrow Keys or WASD to move. Space to pause.</p>
        </div>
    );
};

export default SnakeGame;
