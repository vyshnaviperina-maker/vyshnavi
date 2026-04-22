import React from 'react';

export const PlayIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

export const PauseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
    </svg>
);

export const NextIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.983 8.983a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H4.5a.75.75 0 010-1.5h11.443l-2.97-2.97a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);

export const PrevIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M11.017 8.983a.75.75 0 00-1.06 0l-4.25 4.25a.75.75 0 000 1.06l4.25 4.25a.75.75 0 001.06-1.06l-2.97-2.97H19.5a.75.75 0 000-1.5H8.057l2.97-2.97a.75.75 0 000-1.06z" clipRule="evenodd" />
    </svg>
);

export const MusicNoteIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M19.36 2.727a.75.75 0 01.14.723l-2.5 10a.75.75 0 01-.54.506l-8 2a.75.75 0 01-.96-.73V6.5a.75.75 0 01.56-.727l9-2.25a.75.75 0 01.3-.023zM10.5 15.25v3.5a2.25 2.25 0 11-4.5 0v-3.5a2.25 2.25 0 114.5 0zm7.5-2v3.5a2.25 2.25 0 11-4.5 0v-3.5a2.25 2.25 0 114.5 0z" clipRule="evenodd" />
    </svg>
);
