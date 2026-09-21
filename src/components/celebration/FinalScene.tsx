import React from 'react';
import type { BouquetItem } from '../../types';
import { FlowerIllustration } from '../flowers/FlowerIllustrations';
import { soundEngine } from '../../audio/soundEngine';
import { RotateCcw, Sparkles } from 'lucide-react';

interface FinalSceneProps {
  items: BouquetItem[];
  onRestart: () => void;
}

export const FinalScene: React.FC<FinalSceneProps> = ({ items, onRestart }) => {
  return (
    <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center text-center select-none">
      {/* Bouquet Centerpiece with Floating Aura */}
      <div className="relative w-72 h-64 flex items-end justify-center mb-6 transform-gpu animate-gentle-float">
        {/* Warm Golden Backdrop Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

        <div className="relative w-full h-full flex items-end justify-center">
          {items.slice(0, 7).map((item, idx) => (
            <div
              key={item.uid}
              className="absolute bottom-10 origin-bottom animate-sway"
              style={{
                transform: `translate(${item.offsetX * 0.75}px, ${item.offsetY * 0.75}px) rotate(${item.rotation}deg) scale(${item.scale * 0.8})`,
                zIndex: item.zIndex,
                animationDelay: `${idx * 0.3}s`,
              }}
            >
              <FlowerIllustration type={item.flowerId} size={160} glow={true} />
            </div>
          ))}

          {/* Kraft wrapper */}
          <div className="absolute bottom-0 z-20 w-36 h-32 flex justify-center">
            <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              <path d="M 20 10 L 80 150 L 120 150 L 180 10 C 140 35 60 35 20 10 Z" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
              <circle cx="100" cy="115" r="9" fill="#f59e0b" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Final Headlines */}
      <div className="space-y-4 max-w-2xl mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-amber-400/30 text-amber-300 text-xs font-serif tracking-[0.25em] uppercase">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>21 de septiembre</span>
        </div>

        <p className="font-serif text-xl sm:text-2xl text-amber-200/90 font-light">
          Para una persona muy especial <span className="text-amber-400">💛</span>
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide text-gold-gradient drop-shadow-[0_0_35px_rgba(251,191,36,0.45)]">
          Feliz Día de las Flores Amarillas 🌻
        </h1>

        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-3" />

        <p className="font-serif text-base sm:text-xl text-neutral-300 font-light leading-relaxed italic max-w-xl mx-auto px-4">
          "Que nunca te falten motivos para regalar flores, sonreír y recordar lo bonito que es tener a alguien especial en la vida."
        </p>
      </div>

      {/* Restart Button */}
      <div className="pt-2">
        <button
          onClick={() => {
            soundEngine.playChime();
            onRestart();
          }}
          className="py-3 px-8 rounded-2xl glass-panel hover:bg-white/10 text-white font-serif text-sm tracking-wide border border-white/15 hover:border-amber-400/40 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          <RotateCcw className="w-4 h-4 text-amber-300" />
          <span>✨ Volver a vivirlo</span>
        </button>
      </div>
    </div>
  );
};
