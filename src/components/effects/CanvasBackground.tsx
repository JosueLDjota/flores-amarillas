import React, { useEffect, useRef } from 'react';

interface CanvasBackgroundProps {
  isRomantic: boolean;
  intensity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  isHeart: boolean;
  oscillation: number;
}

export const CanvasBackground: React.FC<CanvasBackgroundProps> = ({ isRomantic, intensity = 0.5 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Efficient particle count
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 45;
    const petalCount = isMobile ? 12 : 22;

    const particles: Particle[] = [];
    const petals: Petal[] = [];
    const goldColors = ['#fde047', '#facc15', '#eab308', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.4 - 0.1,
        radius: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
      });
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.6 + 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        width: Math.random() * 8 + 6,
        height: Math.random() * 13 + 10,
        color: Math.random() > 0.3 ? '#facc15' : '#fbbf24',
        isHeart: isRomantic && Math.random() > 0.5,
        oscillation: Math.random() * Math.PI * 2,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Render dust particles (No heavy shadowBlur per particle)
      for (const p of particles) {
        p.y += p.vy * 60 * dt;
        p.x += p.vx * 60 * dt;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.globalAlpha = p.alpha * intensity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render falling petals
      for (const pt of petals) {
        pt.oscillation += 0.015;
        pt.x += (pt.vx + Math.sin(pt.oscillation) * 0.4) * 60 * dt;
        pt.y += pt.vy * 60 * dt;
        pt.rotation += pt.rotationSpeed;

        if (pt.y > height + 20) {
          pt.y = -20;
          pt.x = Math.random() * width;
        }
        if (pt.x < -20) pt.x = width + 20;
        if (pt.x > width + 20) pt.x = -20;

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rotation);
        ctx.globalAlpha = 0.75 * Math.min(1, intensity + 0.2);

        if (pt.isHeart) {
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          const s = pt.width * 0.07;
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-5 * s, -8 * s, -12 * s, -2 * s, 0, 8 * s);
          ctx.bezierCurveTo(12 * s, -2 * s, 5 * s, -8 * s, 0, 0);
          ctx.fill();
        } else {
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, pt.width / 2, pt.height / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isRomantic, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 block w-full h-full transform-gpu"
    />
  );
};
