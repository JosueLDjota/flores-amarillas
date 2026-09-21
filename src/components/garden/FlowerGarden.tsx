import React, { useEffect, useRef } from 'react';
import { FlowerIllustration } from '../flowers/FlowerIllustrations';
import type { FlowerType } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

interface FlowerItem {
  id: string;
  type: FlowerType;
  xPercent: number;
  bottomPercent: number;
  scale: number;
  rotation: number;
  swayDelay: number;
  depth: number;
  zIndex: number;
}

interface FlowerGardenProps {
  onFlowerClick?: (type: FlowerType) => void;
}

export const FlowerGarden: React.FC<FlowerGardenProps> = ({ onFlowerClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const flowers: FlowerItem[] = [
    // Background layer
    { id: 'bg-1', type: 'campo', xPercent: 8, bottomPercent: 12, scale: 0.55, rotation: -4, swayDelay: 0.2, depth: 0.3, zIndex: 1 },
    { id: 'bg-2', type: 'silvestres', xPercent: 22, bottomPercent: 14, scale: 0.5, rotation: 3, swayDelay: 1.1, depth: 0.35, zIndex: 1 },
    { id: 'bg-3', type: 'margarita', xPercent: 38, bottomPercent: 11, scale: 0.55, rotation: -2, swayDelay: 0.8, depth: 0.3, zIndex: 1 },
    { id: 'bg-4', type: 'campo', xPercent: 54, bottomPercent: 13, scale: 0.6, rotation: 5, swayDelay: 1.5, depth: 0.4, zIndex: 1 },
    { id: 'bg-5', type: 'silvestres', xPercent: 70, bottomPercent: 10, scale: 0.48, rotation: -3, swayDelay: 2.1, depth: 0.32, zIndex: 1 },
    { id: 'bg-6', type: 'margarita', xPercent: 86, bottomPercent: 14, scale: 0.52, rotation: 4, swayDelay: 0.5, depth: 0.38, zIndex: 1 },

    // Midground layer
    { id: 'mid-1', type: 'girasol', xPercent: 15, bottomPercent: 4, scale: 0.85, rotation: -3, swayDelay: 0.4, depth: 0.7, zIndex: 3 },
    { id: 'mid-2', type: 'rosa', xPercent: 32, bottomPercent: 6, scale: 0.8, rotation: 4, swayDelay: 1.6, depth: 0.65, zIndex: 3 },
    { id: 'mid-3', type: 'margarita', xPercent: 48, bottomPercent: 3, scale: 0.75, rotation: -2, swayDelay: 2.3, depth: 0.6, zIndex: 3 },
    { id: 'mid-4', type: 'ramo', xPercent: 64, bottomPercent: 5, scale: 0.85, rotation: 2, swayDelay: 0.9, depth: 0.75, zIndex: 4 },
    { id: 'mid-5', type: 'girasol', xPercent: 82, bottomPercent: 5, scale: 0.9, rotation: 3, swayDelay: 0.7, depth: 0.7, zIndex: 3 },

    // Foreground layer
    { id: 'fg-1', type: 'silvestres', xPercent: 4, bottomPercent: -4, scale: 1.1, rotation: 5, swayDelay: 1.2, depth: 1.1, zIndex: 6 },
    { id: 'fg-2', type: 'girasol', xPercent: 24, bottomPercent: -6, scale: 1.2, rotation: -4, swayDelay: 0.1, depth: 1.2, zIndex: 7 },
    { id: 'fg-3', type: 'rosa', xPercent: 44, bottomPercent: -3, scale: 1.05, rotation: 2, swayDelay: 1.9, depth: 1.0, zIndex: 6 },
    { id: 'fg-4', type: 'margarita', xPercent: 72, bottomPercent: -5, scale: 1.15, rotation: -3, swayDelay: 2.5, depth: 1.1, zIndex: 6 },
    { id: 'fg-5', type: 'girasol', xPercent: 92, bottomPercent: -4, scale: 1.2, rotation: 4, swayDelay: 0.6, depth: 1.15, zIndex: 7 },
  ];

  useEffect(() => {
    let targetX = 0;
    let currentX = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Smooth lerp on CSS variable without React re-renders
    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', currentX.toFixed(3));
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleInteraction = (f: FlowerItem) => {
    soundEngine.playChime(1.1 + f.scale * 0.2);
    if (onFlowerClick) {
      onFlowerClick(f.type);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] md:min-h-[460px] overflow-hidden select-none pointer-events-auto transform-gpu"
      style={{ '--mouse-x': '0' } as React.CSSProperties}
    >
      {/* Ground misty golden fog */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-amber-950/40 via-yellow-900/10 to-transparent pointer-events-none z-10" />

      {/* Atmospheric warm horizon light */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/15 blur-3xl pointer-events-none" />

      {/* Render flowers */}
      {flowers.map((f) => (
        <div
          key={f.id}
          data-cursor="flower"
          onClick={() => handleInteraction(f)}
          className="absolute cursor-pointer will-change-transform group"
          style={{
            left: `${f.xPercent}%`,
            bottom: `${f.bottomPercent}%`,
            zIndex: f.zIndex,
            transform: `translate3d(calc(-50% + calc(var(--mouse-x, 0) * ${20 * f.depth}px)), 0, 0) scale(${f.scale}) rotate(${f.rotation}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div
            className="animate-sway origin-bottom transition-transform duration-300 group-hover:scale-110"
            style={{ animationDelay: `${f.swayDelay}s` }}
          >
            <FlowerIllustration type={f.type} size={200} />
          </div>
        </div>
      ))}
    </div>
  );
};
