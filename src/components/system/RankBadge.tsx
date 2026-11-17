'use client';

import React from 'react';
import type { RankTier } from '@/data/skills';

interface RankBadgeProps {
  rank: RankTier;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const rankStyles: Record<
  RankTier,
  { bg: string; text: string; border: string; glow: string; label: string }
> = {
  S: {
    bg: 'bg-cyan-sys/20',
    text: 'text-cyan-sys',
    border: 'border-cyan-sys',
    glow: 'shadow-[0_0_12px_rgba(0,229,255,0.6)]',
    label: 'RANK S // APEX',
  },
  A: {
    bg: 'bg-magenta-sys/20',
    text: 'text-magenta-sys',
    border: 'border-magenta-sys',
    glow: 'shadow-[0_0_10px_rgba(255,43,214,0.5)]',
    label: 'RANK A // MASTER',
  },
  B: {
    bg: 'bg-amber-sys/20',
    text: 'text-amber-sys',
    border: 'border-amber-sys',
    glow: 'shadow-[0_0_8px_rgba(255,179,0,0.4)]',
    label: 'RANK B // EXPERT',
  },
  C: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-400',
    glow: 'shadow-[0_0_8px_rgba(52,211,153,0.3)]',
    label: 'RANK C // PROFICIENT',
  },
  D: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-400',
    glow: 'none',
    label: 'RANK D // INITIATE',
  },
  E: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-300',
    border: 'border-gray-400',
    glow: 'none',
    label: 'RANK E // NOVICE',
  },
};

export const RankBadge: React.FC<RankBadgeProps> = ({ rank, size = 'md', showLabel = false }) => {
  const style = rankStyles[rank] || rankStyles.A;

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-9 h-9 text-base',
    lg: 'w-14 h-14 text-2xl',
  }[size];

  return (
    <div className="inline-flex items-center gap-2 font-mono">
      <div
        className={`relative flex items-center justify-center font-display font-bold border-2 ${style.border} ${style.bg} ${style.text} ${style.glow} ${sizeClasses} clip-skew select-none`}
      >
        <span className="relative z-10">{rank}</span>
      </div>
      {showLabel && (
        <span className={`text-[10px] tracking-wider uppercase font-bold ${style.text}`}>
          {style.label}
        </span>
      )}
    </div>
  );
};
