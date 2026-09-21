import React, { useState } from 'react';
import { soundEngine } from '../../audio/soundEngine';
import { Sparkles, Heart, Send } from 'lucide-react';

interface LuxuryLetterProps {
  onDeliver: () => void;
}

export const LuxuryLetter: React.FC<LuxuryLetterProps> = ({ onDeliver }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    soundEngine.playSparkle();
    soundEngine.playBloom();
    setIsOpen(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4 flex flex-col items-center select-none">
      {!isOpen ? (
        /* Sealed Luxury Envelope */
        <div
          onClick={handleOpen}
          data-cursor="pointer"
          className="cursor-pointer group relative w-full max-w-lg h-72 rounded-3xl bg-gradient-to-br from-[#1d1914] via-[#14110e] to-[#0a0907] border border-amber-500/30 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-[1.02] hover:border-amber-400/60"
        >
          {/* Triangular flap highlight */}
          <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-amber-500/20 [clip-path:polygon(0_0,50%_100%,100%_0)] bg-amber-500/[0.04] pointer-events-none" />

          {/* Golden Wax Seal with Sunflower */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 border-2 border-amber-200/60 shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <span className="text-3xl">🌻</span>
          </div>

          <p className="font-serif text-xl text-amber-200 mt-6 font-medium tracking-wide">
            Una carta para ti
          </p>
          <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Toca el sello para abrirla</span>
          </p>
        </div>
      ) : (
        /* Unfolded Editorial Romantic Manuscript */
        <div className="w-full relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#181410] via-[#120f0c] to-[#090806] border border-amber-500/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)] animate-fade-in text-center">
          {/* Luxury Double Filigree Border */}
          <div className="absolute inset-3 border border-amber-500/20 rounded-2xl pointer-events-none" />
          <div className="absolute inset-5 border border-amber-500/10 rounded-xl pointer-events-none" />

          {/* Corner Filigrees */}
          <div className="absolute top-6 left-6 text-amber-400/50 text-sm">✦</div>
          <div className="absolute top-6 right-6 text-amber-400/50 text-sm">✦</div>
          <div className="absolute bottom-6 left-6 text-amber-400/50 text-sm">✦</div>
          <div className="absolute bottom-6 right-6 text-amber-400/50 text-sm">✦</div>

          {/* Wax Seal Emblem Header */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] border border-amber-200/50">
              <span className="text-2xl">🌻</span>
            </div>
          </div>

          {/* Header Title */}
          <div className="mb-6">
            <p className="font-serif italic text-xs tracking-[0.3em] text-amber-300/80 uppercase mb-2">
              21 de Septiembre · Día de las Flores Amarillas
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Para una persona muy especial <span className="text-amber-400">💛</span>
            </h2>
            <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mt-3" />
          </div>

          {/* Fixed Emotional Poetic Body */}
          <div className="space-y-4 font-serif text-base sm:text-lg text-neutral-200 leading-relaxed italic font-light max-w-xl mx-auto px-2">
            <p>
              "Hay personas que iluminan cualquier día sin siquiera intentarlo; personas que con su sola presencia hacen que todo se sienta más cálido, más bonito y más en paz."
            </p>
            <p>
              "Hoy, 21 de septiembre, estas flores amarillas son para ti: para recordarte lo valiosa que es tu luz, para sacarte una sonrisa y para desearte que siempre florezcas con la misma fuerza y alegría con la que alegras la vida de quienes te rodean."
            </p>
          </div>

          {/* Elegant Signoff */}
          <div className="pt-6 mt-6 border-t border-amber-500/15 flex items-center justify-center gap-2 text-amber-300/80 font-serif italic text-sm">
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Siempre con cariño sincero</span>
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>

          {/* Deliver / Celebration Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => {
                soundEngine.playBloom();
                onDeliver();
              }}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-neutral-950 font-serif font-bold text-sm sm:text-base tracking-wider flex items-center gap-2.5 shadow-[0_0_35px_rgba(251,191,36,0.65)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4 text-neutral-950" />
              <span>Entregar flores y celebrar ✨</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
