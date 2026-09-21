import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../../audio/soundEngine';

interface FireworksCanvasProps {
  active: boolean;
  soundEnabled?: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  friction: number;
  gravity: number;
  decay: number;
  flicker: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  exploded: boolean;
  trail: { x: number; y: number; alpha: number }[];
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({ active, soundEnabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];

    const palette = [
      '#fef08a', // Champagne light
      '#fde047', // Warm bright gold
      '#fbbf24', // Rich amber
      '#f59e0b', // Deep sunset gold
      '#ffffff', // Diamond sparkle
      '#fed7aa', // Rose champagne
    ];

    const launchRocket = () => {
      if (!active) return;
      const x = Math.random() * (width * 0.7) + width * 0.15;
      const targetY = Math.random() * (height * 0.4) + height * 0.15;
      const color = palette[Math.floor(Math.random() * palette.length)];

      rockets.push({
        x,
        y: height,
        targetY,
        vy: -(Math.random() * 4 + 11),
        color,
        exploded: false,
        trail: [],
      });
    };

    const explode = (x: number, y: number, color: string) => {
      if (soundEnabled) {
        soundEngine.playFireworkSound();
      }

      const sparkCount = Math.floor(Math.random() * 45) + 60;
      const burstSpeed = Math.random() * 4 + 3.5;

      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.pow(Math.random(), 0.5) * burstSpeed;

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2.2 + 1.2,
          friction: 0.965,
          gravity: 0.045,
          decay: Math.random() * 0.012 + 0.009,
          flicker: Math.random() > 0.4,
        });
      }
    };

    // Initial launch delay
    let timerId: number | null = null;
    const scheduleNextRocket = () => {
      if (!active) return;
      launchRocket();
      const nextDelay = Math.random() * 1400 + 700; // 0.7s to 2.1s interval for natural rhythm
      timerId = window.setTimeout(scheduleNextRocket, nextDelay);
    };

    // Launch first one shortly after mount
    timerId = window.setTimeout(scheduleNextRocket, 400);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Soft semi-transparent clear for cinematic light trails
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(7, 9, 14, 0.22)';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy * 60 * dt;
        r.trail.push({ x: r.x, y: r.y, alpha: 0.8 });

        // Draw trail
        ctx.save();
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let j = 0; j < r.trail.length; j++) {
          const t = r.trail[j];
          t.alpha -= 0.04;
          if (j === 0) ctx.moveTo(t.x, t.y);
          else ctx.lineTo(t.x, t.y);
        }
        ctx.stroke();
        ctx.restore();

        r.trail = r.trail.filter((t) => t.alpha > 0);

        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.vx *= s.friction;
        s.vy *= s.friction;
        s.vy += s.gravity;
        s.x += s.vx * 60 * dt;
        s.y += s.vy * 60 * dt;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        const displayAlpha = s.flicker && Math.random() > 0.4 ? s.alpha * 0.4 : s.alpha;
        ctx.globalAlpha = Math.max(0, Math.min(1, displayAlpha));
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timerId) clearTimeout(timerId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, soundEnabled]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15 block w-full h-full"
    />
  );
};
