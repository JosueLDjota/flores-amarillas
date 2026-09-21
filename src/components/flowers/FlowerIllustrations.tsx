import React from 'react';
import type { FlowerType } from '../../types';

interface FlowerIllustrationProps {
  type: FlowerType;
  className?: string;
  size?: number;
  glow?: boolean;
}

export const FlowerIllustration: React.FC<FlowerIllustrationProps> = ({
  type,
  className = '',
  size = 180,
  glow = false,
}) => {
  const glowFilter = glow ? 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.65))' : undefined;

  switch (type) {
    case 'girasol':
      return (
        <svg
          viewBox="0 0 200 240"
          width={size}
          height={(size * 240) / 200}
          className={`transition-transform duration-300 ${className}`}
          style={{ filter: glowFilter }}
        >
          <defs>
            <linearGradient id="sunflower-petal-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="sunflower-petal-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <radialGradient id="sunflower-center" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="70%" stopColor="#78350f" />
              <stop offset="90%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
            <linearGradient id="sunflower-stem" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            <linearGradient id="leaf-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
          </defs>

          {/* Stem */}
          <path
            d="M 100 120 Q 98 170 102 240"
            stroke="url(#sunflower-stem)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Left leaf */}
          <path
            d="M 98 165 C 65 155 45 175 40 190 C 60 195 85 180 99 173 Z"
            fill="url(#leaf-grad)"
          />
          {/* Leaf vein */}
          <path d="M 98 168 Q 65 175 42 188" stroke="#14532d" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Right leaf */}
          <path
            d="M 101 190 C 135 180 155 200 160 215 C 140 220 115 205 101 198 Z"
            fill="url(#leaf-grad)"
          />

          {/* Petals layer 1 (Outer circle - 18 petals) */}
          <g transform="translate(100, 95)">
            {Array.from({ length: 18 }).map((_, i) => (
              <path
                key={`p1-${i}`}
                d="M 0 0 C -10 -40 -16 -68 0 -82 C 16 -68 10 -40 0 0 Z"
                fill="url(#sunflower-petal-1)"
                transform={`rotate(${i * 20})`}
                opacity="0.95"
              />
            ))}
          </g>

          {/* Petals layer 2 (Inner offset circle - 18 petals) */}
          <g transform="translate(100, 95)">
            {Array.from({ length: 18 }).map((_, i) => (
              <path
                key={`p2-${i}`}
                d="M 0 0 C -8 -35 -12 -60 0 -72 C 12 -60 8 -35 0 0 Z"
                fill="url(#sunflower-petal-2)"
                transform={`rotate(${i * 20 + 10})`}
              />
            ))}
          </g>

          {/* Center disc */}
          <circle cx="100" cy="95" r="32" fill="url(#sunflower-center)" />
          {/* Center seed texture details */}
          <circle cx="100" cy="95" r="28" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.7" />
          <circle cx="100" cy="95" r="21" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="100" cy="95" r="14" fill="none" stroke="#b45309" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7" />
          <circle cx="100" cy="95" r="7" fill="#451a03" />
        </svg>
      );

    case 'margarita':
      return (
        <svg
          viewBox="0 0 200 240"
          width={size}
          height={(size * 240) / 200}
          className={`transition-transform duration-300 ${className}`}
          style={{ filter: glowFilter }}
        >
          <defs>
            <linearGradient id="daisy-petal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            <radialGradient id="daisy-center" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
          </defs>

          {/* Stem */}
          <path
            d="M 100 115 Q 105 170 98 240"
            stroke="#15803d"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Leaves */}
          <path d="M 102 160 Q 130 150 140 165 Q 120 175 102 170 Z" fill="#22c55e" />
          <path d="M 98 190 Q 70 180 60 195 Q 80 205 98 200 Z" fill="#16a34a" />

          {/* 22 Delicate radiating petals */}
          <g transform="translate(100, 100)">
            {Array.from({ length: 22 }).map((_, i) => (
              <path
                key={`daisy-${i}`}
                d="M 0 0 C -5 -30 -6 -65 0 -75 C 6 -65 5 -30 0 0 Z"
                fill="url(#daisy-petal)"
                transform={`rotate(${(i * 360) / 22})`}
                opacity="0.92"
              />
            ))}
          </g>

          {/* Center */}
          <circle cx="100" cy="100" r="22" fill="url(#daisy-center)" />
          <circle cx="100" cy="100" r="16" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />
        </svg>
      );

    case 'rosa':
      return (
        <svg
          viewBox="0 0 200 240"
          width={size}
          height={(size * 240) / 200}
          className={`transition-transform duration-300 ${className}`}
          style={{ filter: glowFilter }}
        >
          <defs>
            <linearGradient id="rose-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="80%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="rose-inner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
          </defs>

          {/* Stem with thorn */}
          <path d="M 100 130 Q 96 180 102 240" stroke="#166534" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M 98 175 L 88 170 L 98 178 Z" fill="#14532d" />
          <path d="M 101 205 L 111 200 L 101 208 Z" fill="#14532d" />

          {/* Rose leaves */}
          <path d="M 97 165 C 60 150 45 175 40 185 C 60 190 85 180 97 172 Z" fill="#15803d" />
          <path d="M 102 185 C 140 170 155 195 160 205 C 140 210 115 200 102 192 Z" fill="#22c55e" />

          {/* Outer swirled rose petals */}
          <g transform="translate(100, 95)">
            <ellipse cx="0" cy="10" rx="48" ry="36" fill="url(#rose-gold)" opacity="0.9" />
            <path d="M -42 0 C -45 -35 -20 -50 0 -45 C 20 -50 45 -35 42 0 C 35 30 -35 30 -42 0 Z" fill="url(#rose-gold)" />
            <path d="M -30 -15 C -35 -40 0 -55 25 -35 C 35 -15 25 15 -10 20 C -25 15 -35 0 -30 -15 Z" fill="#eab308" opacity="0.95" />
            <path d="M 25 -10 C 30 -35 -5 -45 -22 -30 C -30 -10 -15 15 15 15 Z" fill="#facc15" />
            {/* Center spiral bud */}
            <circle cx="0" cy="-8" r="16" fill="url(#rose-inner)" />
            <path d="M -8 -8 C -4 -16 4 -16 8 -8 C 6 2 -6 2 -8 -8 Z" fill="#fef08a" />
          </g>
        </svg>
      );

    case 'ramo':
      return (
        <svg
          viewBox="0 0 200 240"
          width={size}
          height={(size * 240) / 200}
          className={`transition-transform duration-300 ${className}`}
          style={{ filter: glowFilter }}
        >
          <defs>
            <linearGradient id="kraft-wrap" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="60%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Stems bundle at bottom */}
          <path d="M 85 190 L 78 240 M 95 190 L 98 240 M 110 190 L 118 240" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" />

          {/* Wrapping paper cone / kraft */}
          <path
            d="M 60 135 L 85 200 L 115 200 L 140 135 C 120 145 80 145 60 135 Z"
            fill="url(#kraft-wrap)"
            stroke="#b45309"
            strokeWidth="1.5"
            opacity="0.95"
          />

          {/* Ribbon Bow */}
          <path d="M 85 195 Q 100 202 115 195" stroke="url(#ribbon)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="92" cy="196" rx="9" ry="5" fill="#f59e0b" transform="rotate(-20 92 196)" />
          <ellipse cx="108" cy="196" rx="9" ry="5" fill="#f59e0b" transform="rotate(20 108 196)" />
          <circle cx="100" cy="196" r="4.5" fill="#fde047" />

          {/* Arrangement of blooms overflowing */}
          {/* Main center sunflower */}
          <g transform="translate(100, 85) scale(0.65)">
            {Array.from({ length: 14 }).map((_, i) => (
              <path
                key={`b-sun-${i}`}
                d="M 0 0 C -8 -30 -12 -55 0 -65 C 12 -55 8 -30 0 0 Z"
                fill="#facc15"
                transform={`rotate(${i * (360 / 14)})`}
              />
            ))}
            <circle cx="0" cy="0" r="22" fill="#78350f" />
          </g>

          {/* Left mini rose */}
          <g transform="translate(68, 105) scale(0.45)">
            <circle cx="0" cy="0" r="30" fill="#eab308" />
            <circle cx="0" cy="0" r="18" fill="#fef08a" opacity="0.8" />
            <circle cx="0" cy="0" r="10" fill="#ca8a04" />
          </g>

          {/* Right mini daisy */}
          <g transform="translate(132, 105) scale(0.45)">
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse key={`b-d-${i}`} cx="0" cy="-28" rx="7" ry="20" fill="#fde047" transform={`rotate(${i * 30})`} />
            ))}
            <circle cx="0" cy="0" r="16" fill="#d97706" />
          </g>

          {/* Top golden sprigs */}
          <circle cx="90" cy="42" r="5" fill="#fef08a" />
          <circle cx="110" cy="40" r="5" fill="#fef08a" />
          <circle cx="100" cy="30" r="6" fill="#facc15" />
        </svg>
      );

    case 'campo':
      return (
        <svg
          viewBox="0 0 200 240"
          width={size}
          height={(size * 240) / 200}
          className={`transition-transform duration-300 ${className}`}
          style={{ filter: glowFilter }}
        >
          {/* Majestic tall wild sunflower with sunbeam backlight */}
          <defs>
            <radialGradient id="sun-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Backlit halo */}
          <circle cx="100" cy="85" r="75" fill="url(#sun-halo)" />

          {/* Long arching stem */}
          <path d="M 100 110 Q 112 175 100 240" stroke="#15803d" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 103 160 C 135 150 150 170 155 180 C 135 185 115 175 103 167 Z" fill="#22c55e" />

          {/* Wild wind-blown petals */}
          <g transform="translate(100, 85)">
            {Array.from({ length: 16 }).map((_, i) => (
              <path
                key={`c-${i}`}
                d="M 0 0 C -9 -35 -14 -70 2 -80 C 18 -65 10 -35 0 0 Z"
                fill="#fbbf24"
                transform={`rotate(${i * 22.5})`}
              />
            ))}
            <circle cx="0" cy="0" r="28" fill="#581c87" opacity="0.1" />
            <circle cx="0" cy="0" r="26" fill="#713f12" />
            <circle cx="0" cy="0" r="18" fill="#451a03" />
          </g>
        </svg>
      );

    case 'silvestres':
    default:
      return (
        <svg
          viewBox="0 0 200 240"
          width={size}
          height={(size * 240) / 200}
          className={`transition-transform duration-300 ${className}`}
          style={{ filter: glowFilter }}
        >
          {/* Wild Golden Meadow Spikes and Campanulas */}
          {/* Stems */}
          <path d="M 80 120 Q 75 180 85 240" stroke="#166534" strokeWidth="4" fill="none" />
          <path d="M 100 90 Q 102 165 98 240" stroke="#15803d" strokeWidth="5" fill="none" />
          <path d="M 125 110 Q 130 175 115 240" stroke="#16a34a" strokeWidth="4" fill="none" />

          {/* Left wildflower cluster */}
          <circle cx="75" cy="115" r="12" fill="#fde047" />
          <circle cx="70" cy="100" r="10" fill="#fef08a" />
          <circle cx="75" cy="115" r="4" fill="#ca8a04" />

          {/* Central golden campanula / wild daisy */}
          <g transform="translate(100, 90)">
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse key={`w-${i}`} cx="0" cy="-22" rx="6" ry="16" fill="#facc15" transform={`rotate(${i * 45})`} />
            ))}
            <circle cx="0" cy="0" r="9" fill="#92400e" />
          </g>

          {/* Right golden spike / wheat-like sprig */}
          <g transform="translate(125, 110)">
            <ellipse cx="-6" cy="-15" rx="5" ry="10" fill="#fef08a" transform="rotate(-30)" />
            <ellipse cx="6" cy="-25" rx="5" ry="10" fill="#fde047" transform="rotate(30)" />
            <ellipse cx="-6" cy="-35" rx="5" ry="10" fill="#fbbf24" transform="rotate(-30)" />
            <ellipse cx="6" cy="-45" rx="4" ry="9" fill="#f59e0b" transform="rotate(30)" />
            <ellipse cx="0" cy="-55" rx="4" ry="8" fill="#fef9c3" />
          </g>
        </svg>
      );
  }
};
