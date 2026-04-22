import React, { useState, useRef, useEffect } from 'react';
import { TRACKS } from '../constants';
import { PlayIcon, PauseIcon, NextIcon, PrevIcon, MusicNoteIcon } from './Icons';

const MusicPlayer: React.FC = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement>(null);

    const currentTrack = TRACKS[currentTrackIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Autoplay prevented:", error);
                    setIsPlaying(false);
                });
            }
        } else if (!isPlaying && audioRef.current) {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrackIndex]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    };

    const handleEnded = () => {
        nextTrack();
    };

    return (
        <div className="bg-gray-900/80 border border-cyan-500/30 rounded-2xl p-6 w-full max-w-md backdrop-blur-md shadow-[0_0_30px_rgba(0,255,255,0.15)] flex flex-col items-center space-y-6">
            
            {/* Hidden Audio Element */}
            <audio 
                ref={audioRef} 
                src={currentTrack.url} 
                onEnded={handleEnded}
                preload="metadata"
            />

            {/* Track Info */}
            <div className="text-center space-y-2 w-full">
                <div className="flex justify-center items-center space-x-2 mb-2">
                    <MusicNoteIcon className={`w-5 h-5 ${isPlaying ? 'text-neon-pink animate-pulse' : 'text-gray-500'}`} />
                    <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Now Playing</span>
                </div>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] truncate px-4">
                    {currentTrack.title}
                </h2>
                <p className="text-sm text-neon-purple drop-shadow-[0_0_5px_rgba(176,38,255,0.5)]">
                    {currentTrack.artist}
                </p>
            </div>

            {/* Visualizer (Fake) */}
            <div className="flex items-end justify-center space-x-1 h-12 w-full px-8">
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-2 bg-cyan-400 rounded-t-sm shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-150 ease-in-out ${isPlaying ? 'animate-pulse-fast' : 'h-1'}`}
                        style={{ 
                            height: isPlaying ? `${Math.max(10, Math.random() * 100)}%` : '4px',
                            animationDelay: `${i * 0.1}s`
                        }}
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6 w-full">
                <button 
                    onClick={prevTrack}
                    className="p-3 rounded-full bg-gray-800 text-cyan-400 hover:bg-gray-700 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 focus:outline-none"
                >
                    <PrevIcon />
                </button>
                
                <button 
                    onClick={togglePlay}
                    className="p-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] hover:scale-105 transition-all duration-300 focus:outline-none"
                >
                    {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8 ml-1" />}
                </button>

                <button 
                    onClick={nextTrack}
                    className="p-3 rounded-full bg-gray-800 text-cyan-400 hover:bg-gray-700 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 focus:outline-none"
                >
                    <NextIcon />
                </button>
            </div>

            {/* Volume Control */}
            <div className="w-full flex items-center space-x-3 px-4">
                <span className="text-xs text-gray-500">Vol</span>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
            </div>
        </div>
    );
};

export default MusicPlayer;
