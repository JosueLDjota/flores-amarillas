import React, { useState } from 'react';
import type { FlowerData } from '../../types';
import { FlowerIllustration } from '../flowers/FlowerIllustrations';
import { soundEngine } from '../../audio/soundEngine';
import { Sparkles, Plus, Check } from 'lucide-react';

interface FlowerCardProps {
  flower: FlowerData;
  count: number;
  onAdd: (flower: FlowerData) => void;
  onRemove?: (flowerId: FlowerData['id']) => void;
}

export const FlowerCard: React.FC<FlowerCardProps> = ({ flower, count, onAdd }) => {
  const [isJustAdded, setIsJustAdded] = useState(false);

  const handleSelect = () => {
    setIsJustAdded(true);
    soundEngine.playBloom();
    onAdd(flower);

    setTimeout(() => {
      setIsJustAdded(false);
    }, 600);
  };

  const isSelected = count > 0;

  return (
    <div
      data-cursor="flower"
      onClick={handleSelect}
      className={`group relative rounded-2xl p-5 transition-all duration-500 cursor-pointer select-none overflow-hidden ${
        isSelected ? 'glass-panel-active ring-1 ring-amber-400/50' : 'glass-panel hover:border-amber-400/30'
      } hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-10px_rgba(245,158,11,0.25)]`}
    >
      {/* Background ambient radial glow when selected or hovered */}
      <div
        className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none ${
          isSelected ? 'bg-amber-400/25 opacity-100' : 'bg-yellow-500/10 opacity-0 group-hover:opacity-100'
        }`}
      />

      {/* Selected badge with count */}
      {count > 0 && (
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs font-semibold backdrop-blur-md shadow-[0_0_12px_rgba(251,191,36,0.3)] animate-pulse">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>{count} en tu ramo</span>
        </div>
      )}

      {/* Flower Illustration with subtle hover lift and floating animation */}
      <div className="relative h-44 w-full flex items-center justify-center my-2">
        <div
          className={`transition-all duration-500 ${
            isJustAdded ? 'scale-115 rotate-3' : 'group-hover:scale-108 group-hover:-translate-y-1'
          }`}
        >
          <FlowerIllustration type={flower.id} size={150} glow={isSelected} />
        </div>

        {/* Transient burst effect on selection */}
        {isJustAdded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 rounded-full border border-amber-300/80 animate-ping opacity-75" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 pt-2 border-t border-amber-500/10">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="font-serif text-xl font-semibold text-white tracking-wide group-hover:text-amber-200 transition-colors">
            {flower.name}
          </h3>
          <span className="text-sm opacity-80">{flower.emoji}</span>
        </div>

        <p className="font-sans text-xs italic text-amber-300/80 mb-2">{flower.scientificName}</p>
        <p className="font-sans text-xs text-neutral-300/80 line-clamp-2 leading-relaxed mb-3">
          {flower.description}
        </p>

        {/* Meaning pill */}
        <div className="text-[11px] text-amber-100/70 bg-amber-950/40 border border-amber-500/20 rounded-lg p-2 leading-snug">
          <span className="text-amber-300 font-medium">Significado: </span>
          {flower.meaning}
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSelect();
          }}
          className={`mt-4 w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-medium tracking-wide transition-all duration-300 ${
            isJustAdded
              ? 'bg-amber-400 text-neutral-950 shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-[1.02]'
              : isSelected
              ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30'
              : 'bg-white/5 hover:bg-amber-400/20 text-neutral-200 hover:text-amber-200 border border-white/10 hover:border-amber-400/30'
          }`}
        >
          {isJustAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-neutral-950" />
              <span>¡Agregada al ramo!</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>{isSelected ? 'Agregar otra más' : 'Agregar al ramo'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
