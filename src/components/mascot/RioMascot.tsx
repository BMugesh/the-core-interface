'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { MascotState } from '@/lib/motionPrefs';
import { useSystem } from '@/lib/motionPrefs';

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

  useEffect(() => {
    if (!interactive || reducedMotion) return;

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      setScrollTilt(Math.max(-8, Math.min(8, delta * 0.15)));
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

  // Expression colors and visor matrix based on state
  const visorColors = {
    idle: {
      primary: '#00e5ff',
      glow: 'rgba(0, 229, 255, 0.65)',
      halo: 'rgba(0, 229, 255, 0.25)',
      tag: 'IDLE // READY',
    },
    thinking: {
      primary: '#ff2bd6',
      glow: 'rgba(255, 43, 214, 0.8)',
      halo: 'rgba(255, 43, 214, 0.3)',
      tag: 'PROCESSING // RAG',
    },
    alert: {
      primary: '#ffb300',
      glow: 'rgba(255, 179, 0, 0.85)',
      halo: 'rgba(255, 179, 0, 0.35)',
      tag: 'TACTICAL // ALERT',
    },
    celebrate: {
      primary: '#00ffc4',
      glow: 'rgba(0, 255, 196, 0.9)',
      halo: 'rgba(0, 255, 196, 0.4)',
      tag: 'QUEST // CLEARED',
    },
  }[state];

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ width: size, height: size * 1.15 }}
      aria-label={`R.I.O. AI Companion Status: ${state}`}
    >
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
          y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 0.2, ease: 'easeOut' },
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 160 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]"
        >
          <defs>
            {/* Outer Holo Halo Glow */}
            <radialGradient id="holoGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={visorColors.halo} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Cyber Armor Plate Gradients */}
            <linearGradient id="hoodOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#121626" />
              <stop offset="50%" stopColor="#0b0e1b" />
              <stop offset="100%" stopColor="#05060b" />
            </linearGradient>

            <linearGradient id="hoodInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#05060d" />
              <stop offset="100%" stopColor="#020306" />
            </linearGradient>

            <linearGradient id="armorPlates" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e263d" />
              <stop offset="50%" stopColor="#141a2c" />
              <stop offset="100%" stopColor="#0d111d" />
            </linearGradient>
          </defs>

          {/* Background Ambient Holo Field */}
          <circle cx="80" cy="85" r="72" fill="url(#holoGlow)" />

          {/* Outer Cyber Hood Silhouette (Hard Cel-Shaded Facets) */}
          <path
            d="M 80 14 L 126 36 L 140 82 L 132 134 L 110 160 L 50 160 L 28 134 L 20 82 L 34 36 Z"
            fill="url(#hoodOuter)"
            stroke="#000000"
            strokeWidth="3.5"
          />

          {/* Crest Crest Plate */}
          <polygon
            points="80,18 96,38 80,48 64,38"
            fill="url(#armorPlates)"
            stroke={visorColors.primary}
            strokeWidth="1.5"
          />

          {/* Outer Edge Accent Lines */}
          <path
            d="M 34 36 L 48 86 L 38 126"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />
          <path
            d="M 126 36 L 112 86 L 122 126"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />

          {/* Dark Inner Hood Cavity */}
          <path
            d="M 80 34 L 118 52 L 124 92 L 108 132 L 52 132 L 36 92 L 42 52 Z"
            fill="url(#hoodInner)"
            stroke="#000000"
            strokeWidth="3"
          />

          {/* Collar Armor Mantle */}
          <path
            d="M 46 132 L 80 148 L 114 132 L 126 156 L 80 170 L 34 156 Z"
            fill="url(#armorPlates)"
            stroke="#000000"
            strokeWidth="2.5"
          />
          <line
            x1="80"
            y1="148"
            x2="80"
            y2="170"
            stroke={visorColors.primary}
            strokeWidth="2"
          />

          {/* The Holo Visor Chamber */}
          <g transform={`translate(${lookOffset.x}, ${lookOffset.y})`}>
            {/* Hex Visor Base Shield */}
            <polygon
              points="52,72 108,72 116,98 80,112 44,98"
              fill="#060913"
              stroke={visorColors.primary}
              strokeWidth="2"
              style={{ filter: `drop-shadow(0 0 8px ${visorColors.glow})` }}
            />

            {/* Visor Scanline Texture */}
            <line x1="50" y1="79" x2="110" y2="79" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="48" y1="87" x2="112" y2="87" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="52" y1="95" x2="108" y2="95" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            {/* Expression-Driven Optical Visor Matrix */}
            {state === 'idle' && (
              <g>
                {/* Twin Cyan Optical Bars */}
                <rect
                  x="60"
                  y="84"
                  width="16"
                  height="5"
                  rx="1"
                  fill={visorColors.primary}
                  style={{ filter: `drop-shadow(0 0 6px ${visorColors.primary})` }}
                />
                <rect
                  x="84"
                  y="84"
                  width="16"
                  height="5"
                  rx="1"
                  fill={visorColors.primary}
                  style={{ filter: `drop-shadow(0 0 6px ${visorColors.primary})` }}
                />
                <circle cx="80" cy="98" r="2.5" fill={visorColors.primary} />
              </g>
            )}

            {state === 'thinking' && (
              <g>
                {/* Orbiting / Rotating Matrix */}
                <circle
                  cx="80"
                  cy="88"
                  r="12"
                  stroke={visorColors.primary}
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  className="animate-spin origin-[80px_88px]"
                  style={{ filter: `drop-shadow(0 0 8px ${visorColors.primary})` }}
                />
                <polygon
                  points="76,85 84,85 80,92"
                  fill={visorColors.primary}
                />
              </g>
            )}

            {state === 'alert' && (
              <g>
                {/* Sharp Angled Optical Slits */}
                <polygon
                  points="58,82 76,87 74,92 56,87"
                  fill={visorColors.primary}
                  style={{ filter: `drop-shadow(0 0 8px ${visorColors.primary})` }}
                />
                <polygon
                  points="102,82 84,87 86,92 104,87"
                  fill={visorColors.primary}
                  style={{ filter: `drop-shadow(0 0 8px ${visorColors.primary})` }}
                />
                <line x1="80" y1="84" x2="80" y2="98" stroke="#ff1e38" strokeWidth="2.5" />
              </g>
            )}

            {state === 'celebrate' && (
              <g>
                {/* Radiant Starburst / Cleared Spark */}
                <polygon
                  points="80,78 84,85 92,88 84,91 80,98 76,91 68,88 76,85"
                  fill={visorColors.primary}
                  style={{ filter: `drop-shadow(0 0 10px ${visorColors.primary})` }}
                />
                <circle cx="62" cy="88" r="2" fill="#fff" />
                <circle cx="98" cy="88" r="2" fill="#fff" />
              </g>
            )}
          </g>

          {/* Floating Cheek HUD Nodes */}
          <circle cx="34" cy="100" r="2" fill={visorColors.primary} />
          <circle cx="126" cy="100" r="2" fill={visorColors.primary} />
        </svg>

        {/* Floating Holographic Ring */}
        <div
          aria-hidden="true"
          className="absolute -bottom-1 w-20 h-3 border border-dashed rounded-full pointer-events-none opacity-40 animate-pulse"
          style={{ borderColor: visorColors.primary }}
        />
      </motion.div>

      {/* R.I.O. Status HUD Tag */}
      <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 bg-black/80 border border-white/10 font-mono text-[9px] tracking-widest uppercase">
        <span
          className="w-1.5 h-1.5 rounded-full animate-ping"
          style={{ backgroundColor: visorColors.primary }}
        />
        <span style={{ color: visorColors.primary }}>R.I.O.</span>
        <span className="text-ink-dim">[{state.toUpperCase()}]</span>
      </div>
    </div>
  );
};
