import React, { useEffect } from 'react';
import type { BouquetItem } from '../../types';
import { FlowerIllustration } from '../flowers/FlowerIllustrations';
import { soundEngine } from '../../audio/soundEngine';
import { Sparkles } from 'lucide-react';

interface CinematicRevelationProps {
  items: BouquetItem[];
  onComplete: () => void;
}

export const CinematicRevelation: React.FC<CinematicRevelationProps> = ({
  items,
  onComplete,
}) => {
  useEffect(() => {
    soundEngine.playBloom();
    soundEngine.playSparkle();

    // After 2.6s of cinematic bouquet elevation, automatically launch into the fireworks!
    const timer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center p-4 overflow-hidden bg-black/90 backdrop-blur-md">
      {/* Dynamic Golden Halo */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-t from-amber-500/35 via-yellow-400/25 to-transparent blur-3xl scale-125 animate-pulse" />

      {/* Floating Bouquet with Cinematic Elevation */}
      <div className="relative flex items-end justify-center select-none transform-gpu animate-gentle-float">
        <div className="relative w-72 md:w-84 h-72 flex items-end justify-center">
          {items.map((item, index) => (
            <div
              key={item.uid}
              className="absolute bottom-16 transition-all duration-700 origin-bottom animate-sway"
              style={{
                transform: `translate(${item.offsetX * 0.9}px, ${item.offsetY * 0.9}px) rotate(${item.rotation}deg) scale(${item.scale * 0.95})`,
                zIndex: item.zIndex,
                animationDelay: `${(index % 4) * 0.3}s`,
              }}
            >
              <FlowerIllustration type={item.flowerId} size={180} glow={true} />
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

      {/* Gentle Floating Text */}
      <div className="relative z-40 text-center mt-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs font-serif">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Para una persona muy especial</span>
        </div>
        <p className="font-serif text-2xl sm:text-3xl text-white font-light italic text-gold-gradient">
          "Un pedacito de sol en este día..."
        </p>
      </div>
    </div>
  );
};
