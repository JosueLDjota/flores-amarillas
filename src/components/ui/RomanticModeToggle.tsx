import React from 'react';
import { soundEngine } from '../../audio/soundEngine';
import { Heart } from 'lucide-react';

interface RomanticModeToggleProps {
  isRomantic: boolean;
  onToggle: (enabled: boolean) => void;
}

export const RomanticModeToggle: React.FC<RomanticModeToggleProps> = ({ isRomantic, onToggle }) => {
  const handleClick = () => {
    soundEngine.playSparkle();
    onToggle(!isRomantic);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all backdrop-blur-md shadow-lg ${
        isRomantic
          ? 'bg-amber-400/20 border-amber-400/60 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
          : 'bg-black/40 hover:bg-black/60 border-white/15 text-neutral-300 hover:text-amber-200'
      }`}
      title="Activar/desactivar pétalos extra y calidez romántica"
    >
      <Heart
        className={`w-3.5 h-3.5 transition-colors ${
          isRomantic ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-neutral-400'
        }`}
      />
      <span className="text-[11px] font-medium hidden sm:inline">Modo romántico 💛</span>
    </button>
  );
};
