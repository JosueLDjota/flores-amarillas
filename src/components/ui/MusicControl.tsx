import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';
import { Volume2, VolumeX } from 'lucide-react';

export const MusicControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(soundEngine.isPlaying());

  const handleToggle = () => {
    const state = soundEngine.toggleMusic();
    setIsPlaying(state);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 hover:border-amber-400/40 text-neutral-300 hover:text-amber-200 text-xs transition-all backdrop-blur-md shadow-lg group"
      title={isPlaying ? 'Silenciar música ambiental' : 'Activar música ambiental'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[11px] font-medium hidden sm:inline">Música activada</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300" />
          <span className="text-[11px] font-medium hidden sm:inline">Música desactivada</span>
        </>
      )}
    </button>
  );
};
