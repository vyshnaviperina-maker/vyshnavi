export const GRID_SIZE = 20;
export const INITIAL_SPEED = 120;
export const SPEED_INCREMENT = 2;
export const MIN_SPEED = 50;

export enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export type Point = {
    x: number;
    y: number;
};

export type Track = {
    id: number;
    title: string;
    artist: string;
    url: string;
};

// Using reliable public domain/cc0 or standard test audio files for the demo
export const TRACKS: Track[] = [
    {
        id: 1,
        title: "Cybernetic Pulse",
        artist: "AI Gen Alpha",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Neon Horizon",
        artist: "SynthMind",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Digital Dreams",
        artist: "Neural Network",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];
