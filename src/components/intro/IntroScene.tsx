import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';
import { Sparkles } from 'lucide-react';

interface IntroSceneProps {
  onStart: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onStart }) => {
  const [isStarting, setIsStarting] = useState(false);

  const handleClick = () => {
    setIsStarting(true);
    soundEngine.init();
    soundEngine.playBloom();
    soundEngine.startMusic();

    // Trigger transition
    setTimeout(() => {
      onStart();
    }, 1200);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 select-none z-20 text-center">
      {/* Subtle night stars & deep celestial gradient */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        {/* Soft centered moonlit halo */}
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-b from-blue-950/30 via-amber-500/5 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Floating subtle badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-amber-300/80 text-xs font-serif tracking-[0.25em] uppercase backdrop-blur-md">
        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
        <span>21 de septiembre</span>
      </div>

      {/* Hero poetic phrase */}
      <div className="max-w-2xl mx-auto space-y-4 mb-10">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-wide leading-tight">
          "Hay días que simplemente <br />
          <span className="text-gold-gradient font-normal italic drop-shadow-[0_0_25px_rgba(250,204,21,0.45)]">
            merecen flores.
          </span>"
        </h1>

        <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light tracking-wider uppercase max-w-md mx-auto pt-2">
          Una experiencia cinematográfica e interactiva
        </p>
      </div>

      {/* Elegant Large CTA Button */}
      <div className="relative group">
        {/* Golden outer glow behind button */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-40 blur-xl group-hover:opacity-75 group-hover:blur-2xl transition duration-500" />

        <button
          onClick={handleClick}
          disabled={isStarting}
          className={`relative px-8 sm:px-12 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-neutral-950 font-serif font-bold text-base sm:text-lg tracking-wider flex items-center gap-3 shadow-[0_0_35px_rgba(251,191,36,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 ${
            isStarting ? 'scale-95 opacity-90' : ''
          }`}
        >
          <Sparkles className="w-5 h-5 text-neutral-950" />
          <span>Comenzar ✨</span>
        </button>
      </div>

      {/* Tiny hint */}
      <p className="mt-8 text-[11px] text-neutral-500 tracking-wide">
        Activa tus sentidos para disfrutar de la música y las animaciones
      </p>
    </div>
  );
};
