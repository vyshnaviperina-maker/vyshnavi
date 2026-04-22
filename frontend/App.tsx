import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-10 px-4 relative overflow-hidden">
            
            {/* Background Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-neon-cyan/20 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <header className="mb-12 text-center z-10">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink drop-shadow-[0_0_15px_rgba(176,38,255,0.6)]">
                    SYNTH<span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">SNAKE</span>
                </h1>
                <p className="text-gray-400 mt-2 tracking-widest text-sm uppercase">Retro Cybernetic Entertainment</p>
            </header>

            {/* Main Content Area */}
            <main className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-12 w-full max-w-7xl z-10">
                
                {/* Left Column: Music Player */}
                <div className="w-full xl:w-1/3 flex justify-center xl:justify-end order-2 xl:order-1">
                    <div className="sticky top-10">
                        <MusicPlayer />
                    </div>
                </div>

                {/* Right Column: Game */}
                <div className="w-full xl:w-2/3 flex justify-center xl:justify-start order-1 xl:order-2">
                    <SnakeGame />
                </div>

            </main>
            
            {/* Footer */}
            <footer className="mt-auto pt-12 pb-4 text-gray-600 text-xs tracking-widest uppercase z-10">
                &copy; {new Date().getFullYear()} Neon Systems. All rights reserved.
            </footer>
        </div>
    );
};

export default App;
