import React from 'react';
import type { BouquetItem, FlowerData } from '../../types';
import { FLOWERS } from '../../data/flowers';
import { FlowerIllustration } from '../flowers/FlowerIllustrations';
import { soundEngine } from '../../audio/soundEngine';
import { Plus, Minus, RotateCcw, Sparkles, HeartHandshake } from 'lucide-react';

interface BouquetBuilderProps {
  items: BouquetItem[];
  onAddFlower: (flower: FlowerData) => void;
  onRemoveLast: () => void;
  onReset: () => void;
  onSurprise: () => void;
  onProceedToMessage: () => void;
}

export const BouquetBuilder: React.FC<BouquetBuilderProps> = ({
  items,
  onAddFlower,
  onRemoveLast,
  onReset,
  onSurprise,
  onProceedToMessage,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Central Visual Bouquet Display Area */}
      <div className="relative w-full h-[460px] md:h-[520px] flex items-end justify-center overflow-visible select-none my-4">
        {/* Ambient Halo Behind the Bouquet */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[340px] md:w-[460px] h-[340px] md:h-[460px] rounded-full bg-gradient-to-t from-amber-400/25 via-yellow-500/10 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

        {/* Empty state prompt if 0 items */}
        {items.length === 0 ? (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-6 rounded-2xl glass-panel max-w-sm border border-dashed border-amber-400/30">
            <span className="text-4xl block mb-2 animate-bounce">🌻</span>
            <p className="font-serif text-lg text-white font-medium mb-1">Tu ramo está esperando</p>
            <p className="text-xs text-neutral-400 mb-4">
              Selecciona tus flores favoritas abajo o pulsa "Sorpréndeme" para crear una combinación mágica.
            </p>
            <button
              onClick={() => {
                soundEngine.playSparkle();
                onSurprise();
              }}
              className="px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>✨ Generar ramo sorpresa</span>
            </button>
          </div>
        ) : null}

        {/* Render Bouquet Flowers */}
        <div className="relative w-72 md:w-96 h-full flex items-end justify-center pointer-events-none">
          {items.map((item, index) => {
            return (
              <div
                key={item.uid}
                className="absolute bottom-28 transition-all duration-700 ease-out origin-bottom animate-sway pointer-events-auto"
                style={{
                  transform: `translate(${item.offsetX}px, ${item.offsetY}px) rotate(${item.rotation}deg) scale(${item.scale})`,
                  zIndex: item.zIndex,
                  animationDelay: `${(index % 5) * 0.4}s`,
                }}
              >
                <div className="hover:scale-105 transition-transform duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                  <FlowerIllustration type={item.flowerId} size={190} glow={true} />
                </div>
              </div>
            );
          })}

          {/* Lush Green Foliage Accents behind wrapping */}
          {items.length > 0 && (
            <div className="absolute bottom-24 w-full flex justify-center z-15 pointer-events-none">
              <svg viewBox="0 0 200 100" className="w-64 h-28 opacity-90">
                <path d="M 60 90 Q 20 60 10 30 Q 35 45 65 85 Z" fill="#15803d" />
                <path d="M 80 90 Q 40 40 30 10 Q 55 25 85 80 Z" fill="#16a34a" />
                <path d="M 140 90 Q 180 60 190 30 Q 165 45 135 85 Z" fill="#15803d" />
                <path d="M 120 90 Q 160 40 170 10 Q 145 25 115 80 Z" fill="#16a34a" />
              </svg>
            </div>
          )}

          {/* Bouquet Wrapping Cone / Kraft Paper and Ribbon (Foreground) */}
          <div className="absolute bottom-0 z-20 w-44 md:w-52 h-44 pointer-events-none flex flex-col items-center">
            <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
              <defs>
                <linearGradient id="kraft-body" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="40%" stopColor="#fde68a" />
                  <stop offset="85%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
                <linearGradient id="silk-ribbon" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>

              {/* Folded luxury paper wrapper */}
              <path
                d="M 20 10 L 80 150 L 120 150 L 180 10 C 140 35 60 35 20 10 Z"
                fill="url(#kraft-body)"
                stroke="#b45309"
                strokeWidth="1.5"
              />
              <path
                d="M 30 20 L 90 145 L 110 145 L 170 20"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                fill="none"
              />

              {/* Silk ribbon bow */}
              <path d="M 75 125 Q 100 135 125 125" stroke="url(#silk-ribbon)" strokeWidth="9" fill="none" strokeLinecap="round" />
              {/* Bow loops */}
              <ellipse cx="85" cy="126" rx="14" ry="7" fill="#f59e0b" transform="rotate(-25 85 126)" />
              <ellipse cx="115" cy="126" rx="14" ry="7" fill="#f59e0b" transform="rotate(25 115 126)" />
              <circle cx="100" cy="126" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              {/* Ribbon tails hanging down */}
              <path d="M 96 130 Q 90 160 84 175" stroke="#f59e0b" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M 104 130 Q 110 160 118 175" stroke="#f59e0b" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bouquet Info Bar */}
      <div className="flex items-center gap-3 mb-4 text-xs text-amber-200/90 font-medium">
        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30">
          Total de flores: <strong className="text-amber-300 font-bold">{items.length}</strong>
        </span>
        {items.length > 0 && (
          <span className="hidden sm:inline-block text-neutral-400">
            Arreglo florecido y armonizado para el 21 de septiembre
          </span>
        )}
      </div>

      {/* Builder Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl glass-panel border border-amber-400/20 max-w-xl shadow-xl">
        {/* Quick Add Button */}
        <button
          onClick={() => {
            const randomFlower = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
            soundEngine.playBloom();
            onAddFlower(randomFlower);
          }}
          className="px-3.5 py-2 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 text-amber-300" />
          <span>+ Agregar flor</span>
        </button>

        {/* Remove Last */}
        <button
          onClick={() => {
            soundEngine.playChime(0.8);
            onRemoveLast();
          }}
          disabled={items.length === 0}
          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-40 disabled:pointer-events-none text-neutral-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95"
        >
          <Minus className="w-3.5 h-3.5" />
          <span>− Quitar flor</span>
        </button>

        {/* Reset */}
        <button
          onClick={() => {
            soundEngine.playChime(0.7);
            onReset();
          }}
          disabled={items.length === 0}
          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:border-rose-400/30 border border-white/10 disabled:opacity-40 disabled:pointer-events-none text-neutral-300 hover:text-rose-200 text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar</span>
        </button>

        {/* Surprise Me Button */}
        <button
          onClick={() => {
            soundEngine.playSparkle();
            onSurprise();
          }}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-amber-500/20 hover:from-amber-400/30 hover:to-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>✨ Sorpréndeme</span>
        </button>

        {/* Deliver / Proceed Button */}
        <button
          onClick={() => {
            soundEngine.playBloom();
            onProceedToMessage();
          }}
          disabled={items.length === 0}
          className="ml-auto w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-neutral-950 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)] active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Escribir dedicatoria ✨</span>
        </button>
      </div>
    </div>
  );
};
