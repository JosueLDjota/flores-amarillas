import React, { useState } from 'react';
import type { DedicationMessage, BouquetItem } from '../../types';
import { FlowerIllustration } from '../flowers/FlowerIllustrations';
import { soundEngine } from '../../audio/soundEngine';
import { RotateCcw, Flower2, Copy, Check } from 'lucide-react';

interface FinalSceneProps {
  dedication: DedicationMessage;
  items: BouquetItem[];
  onCreateAnother: () => void;
  onRestart: () => void;
}

export const FinalScene: React.FC<FinalSceneProps> = ({
  dedication,
  items,
  onCreateAnother,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    soundEngine.playChime(1.2);
    const text = `🌻 21 de Septiembre — Día de las Flores Amarillas 💛\n\n"${dedication.message}"\n\n✨ "Que nunca falten motivos para regalar flores, sonreír y recordar lo bonito que es tener a alguien especial."`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative z-20 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center text-center">
      {/* Bouquet Centerpiece with Floating Aura */}
      <div className="relative w-72 h-64 flex items-end justify-center mb-6 select-none transform-gpu">
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
        <p className="font-serif italic text-amber-300 text-sm tracking-[0.25em] uppercase">
          21 de septiembre
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide text-gold-gradient drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]">
          Feliz Día de las Flores Amarillas 🌻
        </h1>

        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-3" />

        <p className="font-serif text-lg sm:text-xl text-neutral-300 font-light leading-relaxed italic max-w-xl mx-auto">
          "Que nunca falten motivos para regalar flores, sonreír y recordar lo bonito que es tener a alguien especial."
        </p>
      </div>

      {/* Action Buttons: Create Another Bouquet / Start Over */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md pt-2">
        <button
          onClick={() => {
            soundEngine.playBloom();
            onCreateAnother();
          }}
          className="flex-1 min-w-[180px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-neutral-950 font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all hover:scale-105 active:scale-95"
        >
          <Flower2 className="w-4 h-4 text-neutral-950" />
          <span>🌻 Crear otro ramo</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playChime();
            onRestart();
          }}
          className="flex-1 min-w-[180px] py-3.5 px-6 rounded-2xl glass-panel hover:bg-white/10 text-white font-medium text-xs sm:text-sm tracking-wide border border-white/15 hover:border-amber-400/40 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-amber-300" />
          <span>✨ Volver a comenzar</span>
        </button>
      </div>

      {/* Secondary Share / Copy Dedication */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleCopy}
          className="py-2 px-4 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-amber-400/30 text-neutral-300 hover:text-amber-200 text-xs flex items-center gap-1.5 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-300">¡Copiado al portapapeles!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>Copiar dedicatoria</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
