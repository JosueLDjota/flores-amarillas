import React, { useEffect, useState } from 'react';
import type { BouquetItem, DedicationMessage } from '../../types';
import { FlowerIllustration } from '../flowers/FlowerIllustrations';
import { soundEngine } from '../../audio/soundEngine';
import { Sparkles, Heart } from 'lucide-react';

interface CinematicRevelationProps {
  items: BouquetItem[];
  dedication: DedicationMessage;
  onComplete: () => void;
}

export const CinematicRevelation: React.FC<CinematicRevelationProps> = ({
  items,
  dedication,
  onComplete,
}) => {
  const [phase, setPhase] = useState<'dim' | 'rise' | 'glow' | 'reveal'>('dim');

  useEffect(() => {
    soundEngine.playBloom();

    const t1 = setTimeout(() => {
      setPhase('rise');
      soundEngine.playSparkle();
    }, 1200);

    const t2 = setTimeout(() => {
      setPhase('glow');
    }, 2800);

    const t3 = setTimeout(() => {
      setPhase('reveal');
      soundEngine.playBloom();
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center p-4 overflow-hidden bg-black/90 backdrop-blur-md transition-all duration-1000">
      {/* Background Volumetric Glow */}
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-1000 ${
          phase === 'dim'
            ? 'w-64 h-64 bg-amber-500/10 blur-2xl opacity-40'
            : phase === 'rise'
            ? 'w-[420px] h-[420px] bg-amber-400/25 blur-3xl opacity-80 scale-110'
            : 'w-[600px] h-[600px] bg-amber-500/30 blur-3xl opacity-100 scale-125'
        }`}
      />

      {/* Floating Bouquet with Cinematic Elevation */}
      <div
        className={`relative flex items-end justify-center transition-all duration-1000 ease-out select-none transform-gpu ${
          phase === 'dim'
            ? 'scale-90 translate-y-8 opacity-80'
            : phase === 'rise'
            ? 'scale-110 -translate-y-6 opacity-100'
            : 'scale-100 -translate-y-10'
        }`}
      >
        <div className="relative w-64 md:w-80 h-64 flex items-end justify-center">
          {items.map((item, index) => (
            <div
              key={item.uid}
              className="absolute bottom-16 transition-all duration-700 origin-bottom animate-sway"
              style={{
                transform: `translate(${item.offsetX * 0.85}px, ${item.offsetY * 0.85}px) rotate(${item.rotation}deg) scale(${item.scale * 0.9})`,
                zIndex: item.zIndex,
                animationDelay: `${(index % 4) * 0.3}s`,
              }}
            >
              <FlowerIllustration type={item.flowerId} size={170} glow={true} />
            </div>
          ))}

          {/* Kraft Wrap Foreground */}
          <div className="absolute bottom-0 z-20 w-36 h-32 flex justify-center">
            <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              <path d="M 20 10 L 80 150 L 120 150 L 180 10 C 140 35 60 35 20 10 Z" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
              <circle cx="100" cy="120" r="9" fill="#f59e0b" />
            </svg>
          </div>
        </div>
      </div>

      {/* Revelation Card: "Para ti 💛" + Custom Letter */}
      <div
        className={`relative z-40 max-w-lg w-full text-center transition-all duration-1000 ${
          phase === 'reveal'
            ? 'opacity-100 translate-y-0 filter-none'
            : 'opacity-0 translate-y-10 blur-sm pointer-events-none'
        }`}
      >
        <div className="glass-panel-active p-8 rounded-3xl border border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] mt-2">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="font-serif text-amber-200 tracking-widest text-xs uppercase">
              21 de Septiembre
            </span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal mb-3">
            Para ti <span className="text-amber-400">💛</span>
          </h2>

          {/* Golden Separator */}
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />

          {/* Dedication Body */}
          <p className="font-serif text-lg md:text-xl text-neutral-100 leading-relaxed italic mb-6">
            "{dedication.message || 'Estas flores son para recordarte lo especial que eres.'}"
          </p>

          {/* Continue to Fireworks Button */}
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onComplete();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-neutral-950 font-bold text-sm shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-neutral-950" />
            <span>Ver celebración y fuegos artificiales ✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};
