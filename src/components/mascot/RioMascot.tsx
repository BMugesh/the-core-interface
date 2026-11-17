'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import type { MascotState } from '@/lib/motionPrefs';
import { useSystem } from '@/lib/motionPrefs';

const RioRiveCanvas = dynamic(() => import('./RioRiveCanvas'), {
  ssr: false,
  loading: () => null,
});

interface RioMascotProps {
  state?: MascotState;
  className?: string;
  size?: number;
  interactive?: boolean;
}

export const RioMascot: React.FC<RioMascotProps> = ({
  state = 'idle',
  className = '',
  size = 140,
  interactive = true,
}) => {
  const { reducedMotion } = useSystem();
  const [lookOffset, setLookOffset] = useState({ x: 0, y: 0 });
  const [scrollTilt, setScrollTilt] = useState(0);
  const [riveAvailable, setRiveAvailable] = useState(false);
  const [riveLoaded, setRiveLoaded] = useState(false);

  // Probe whether /mascot/rio.riv has been published via Rive CLI
  useEffect(() => {
    if (reducedMotion) {
      setRiveAvailable(false);
      return;
    }
    let cancelled = false;
    fetch('/mascot/rio.riv', { method: 'HEAD' })
      .then((res) => {
        if (!cancelled && res.ok) setRiveAvailable(true);
      })
      .catch(() => {
        if (!cancelled) setRiveAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!interactive || reducedMotion) return;

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      setScrollTilt(Math.max(-6, Math.min(6, delta * 0.12)));
      lastScrollY = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (e.clientX - centerX) / centerX;
      const dy = (e.clientY - centerY) / centerY;
      setLookOffset({
        x: Math.max(-5, Math.min(5, dx * 5)),
        y: Math.max(-4, Math.min(4, dy * 4)),
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive, reducedMotion]);

  const visorColors = {
    idle: {
      primary: '#00e5ff',
      glow: 'rgba(0, 229, 255, 0.7)',
      halo: 'rgba(0, 229, 255, 0.2)',
    },
    thinking: {
      primary: '#ff2bd6',
      glow: 'rgba(255, 43, 214, 0.8)',
      halo: 'rgba(255, 43, 214, 0.25)',
    },
    alert: {
      primary: '#ffb300',
      glow: 'rgba(255, 179, 0, 0.85)',
      halo: 'rgba(255, 179, 0, 0.28)',
    },
    celebrate: {
      primary: '#00ffc4',
      glow: 'rgba(0, 255, 196, 0.9)',
      halo: 'rgba(0, 255, 196, 0.3)',
    },
  }[state];

  const showRive = riveAvailable && !reducedMotion;

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ width: size }}
      aria-label={`R.I.O. AI Companion Status: ${state}`}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Live Rive State Machine Canvas (renders when /public/mascot/rio.riv is published) */}
        {showRive && (
          <div
            className={`absolute inset-0 z-10 transition-opacity duration-200 ${
              riveLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <RioRiveCanvas
              state={state}
              onReady={() => setRiveLoaded(true)}
              onFallback={() => {
                setRiveAvailable(false);
                setRiveLoaded(false);
              }}
            />
          </div>
        )}

        {/* Synchronized Vector Twin / Instant SSR & Reduced-Motion Fallback */}
        {(!showRive || !riveLoaded) && (
          <motion.div
            animate={
              reducedMotion
                ? false
                : {
                    y: [0, -6, 0],
                    rotate: scrollTilt,
                  }
            }
            transition={{
              y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 0.2, ease: 'easeOut' },
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full filter drop-shadow-[0_10px_18px_rgba(0,0,0,0.85)]"
            >
              {/* Rotating Octagonal Holo Halo */}
              <polygon
                points="100,12 162,38 188,100 162,162 100,188 38,162 12,100 38,38"
                fill={visorColors.halo}
                stroke={visorColors.primary}
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />

              {/* Floating Wing Shards */}
              <polygon points="24,82 30,100 24,118 20,100" fill={visorColors.primary} />
              <polygon points="176,82 180,100 176,118 170,100" fill={visorColors.primary} />

              {/* Outer Cel-Shaded Cyber Hood */}
              <path
                d="M 100 28 L 152 55 L 164 106 L 152 152 L 130 168 L 70 168 L 48 152 L 36 106 L 48 55 Z"
                fill="#10172b"
                stroke="#000000"
                strokeWidth="3.5"
                strokeLinejoin="bevel"
              />

              {/* Inner Abyss Shadow */}
              <path
                d="M 100 52 L 142 72 L 148 114 L 130 146 L 70 146 L 52 114 L 58 72 Z"
                fill="#04060d"
                stroke="#000000"
                strokeWidth="3"
                strokeLinejoin="bevel"
              />

              {/* Crest Diamond */}
              <polygon
                points="100,34 112,52 100,62 88,52"
                fill="#141e36"
                stroke={visorColors.primary}
                strokeWidth="1.8"
              />

              {/* Collar Armor Mantle + Glowing Core Seam */}
              <path
                d="M 65 144 L 100 158 L 135 144 L 148 166 L 100 178 L 52 166 Z"
                fill="#151e34"
                stroke="#000000"
                strokeWidth="2.8"
                strokeLinejoin="bevel"
              />
              <rect x="98.5" y="156" width="3" height="19" rx="1" fill={visorColors.primary} />

              {/* Visor Chamber & Expressive Ocular Matrix */}
              <g transform={`translate(${lookOffset.x}, ${lookOffset.y})`}>
                <polygon
                  points="67,82 133,82 139,103 100,119 61,103"
                  fill="#050914"
                  stroke={visorColors.primary}
                  strokeWidth="2.2"
                  strokeLinejoin="miter"
                  style={{ filter: `drop-shadow(0 0 7px ${visorColors.glow})` }}
                />

                {state === 'idle' && (
                  <g>
                    <polygon
                      points="74,92 94,94 92,100 76,99"
                      fill={visorColors.primary}
                      style={{ filter: `drop-shadow(0 0 5px ${visorColors.primary})` }}
                    />
                    <polygon
                      points="126,92 106,94 108,100 124,99"
                      fill={visorColors.primary}
                      style={{ filter: `drop-shadow(0 0 5px ${visorColors.primary})` }}
                    />
                    <polygon points="100,104 104,108 100,112 96,108" fill={visorColors.primary} />
                  </g>
                )}

                {state === 'thinking' && (
                  <g>
                    <polygon
                      points="100,87 112,94 112,106 100,113 88,106 88,94"
                      fill="none"
                      stroke={visorColors.primary}
                      strokeWidth="2.2"
                      className="animate-spin origin-[100px_100px]"
                      style={{ filter: `drop-shadow(0 0 7px ${visorColors.primary})` }}
                    />
                    <polygon points="95,97 105,97 100,105" fill={visorColors.primary} />
                  </g>
                )}

                {state === 'alert' && (
                  <g>
                    <polygon
                      points="73,90 94,97 92,102 72,96"
                      fill={visorColors.primary}
                      style={{ filter: `drop-shadow(0 0 7px ${visorColors.primary})` }}
                    />
                    <polygon
                      points="127,90 106,97 108,102 128,96"
                      fill={visorColors.primary}
                      style={{ filter: `drop-shadow(0 0 7px ${visorColors.primary})` }}
                    />
                    <polygon points="100,104 104,108 100,112 96,108" fill="#ff1e38" />
                  </g>
                )}

                {state === 'celebrate' && (
                  <g>
                    <polygon
                      points="100,86 104,96 114,100 104,104 100,114 96,104 86,100 96,96"
                      fill={visorColors.primary}
                      style={{ filter: `drop-shadow(0 0 9px ${visorColors.primary})` }}
                    />
                    <circle cx="77" cy="98" r="2.2" fill="#ffffff" />
                    <circle cx="123" cy="98" r="2.2" fill="#ffffff" />
                  </g>
                )}
              </g>
            </svg>
          </motion.div>
        )}
      </div>

      {/* R.I.O. Status HUD Tag */}
      <div className="mt-2 flex items-center gap-1.5 px-2.5 py-0.5 bg-black/85 border border-white/15 font-mono text-[10px] tracking-widest uppercase">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: visorColors.primary }}
        />
        <span style={{ color: visorColors.primary }}>R.I.O.</span>
        <span className="text-ink-dim">
          [{state.toUpperCase()}
          {riveLoaded ? ' · RIVE' : ''}]
        </span>
      </div>
    </div>
  );
};
