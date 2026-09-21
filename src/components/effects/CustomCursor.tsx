import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [target, setTarget] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFlower, setIsFlower] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setTarget({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const targetEl = e.target as HTMLElement | null;
      if (targetEl) {
        const isInteractive = !!targetEl.closest('button, a, input, textarea, [data-cursor="pointer"]');
        const isFlowerEl = !!targetEl.closest('[data-cursor="flower"]');

        setIsHovered(isInteractive);
        setIsFlower(isFlowerEl);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    let animId: number;
    const lerp = () => {
      setPos((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.22,
        y: prev.y + (target.y - prev.y) * 0.22,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible, target.x, target.y]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer subtle aura ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isFlower
              ? 'w-12 h-12 border-amber-300/80 bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-125 rotate-45'
              : isHovered
              ? 'w-10 h-10 border-yellow-300/70 bg-yellow-400/15 shadow-[0_0_15px_rgba(250,204,21,0.5)] scale-110'
              : isClicked
              ? 'w-5 h-5 border-amber-400/90 bg-amber-400/30 scale-90'
              : 'w-8 h-8 border-amber-200/40 bg-transparent'
          }`}
        />
      </div>

      {/* Center sharp glowing dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-0 ease-linear"
        style={{
          transform: `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full bg-amber-300 transition-all duration-150 ${
            isFlower ? 'w-2.5 h-2.5 bg-yellow-200 shadow-[0_0_10px_#fde047]' : 'w-1.5 h-1.5'
          }`}
        />
      </div>
    </>
  );
};
