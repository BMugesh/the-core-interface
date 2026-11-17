'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { RankBadge } from './RankBadge';
import type { RankTier } from '@/data/skills';
import { useSystem } from '@/lib/motionPrefs';

interface StatBarProps {
  label: string;
  jpLabel?: string;
  statCode: string;
  rank: RankTier;
  value: number; // 0 - 100
  evidenceNote?: string;
  items?: string[];
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  jpLabel,
  statCode,
  rank,
  value,
  evidenceNote,
  items,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const { reducedMotion } = useSystem();
  const [animatedValue, setAnimatedValue] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (isInView || reducedMotion) {
      setAnimatedValue(value);
    }
  }, [isInView, reducedMotion, value]);

  // Discrete ticks (10 segments)
  const segments = 10;
  const activeSegments = Math.round((animatedValue / 100) * segments);

  return (
    <div ref={ref} className="p-3 bg-panel-elevated/70 border border-white/10 font-mono text-xs">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <RankBadge rank={rank} size="sm" />
          <span className="text-cyan-sys font-bold tracking-wider">{statCode}</span>
          <span className="text-ink font-semibold">{label}</span>
          {jpLabel && <span className="font-jp text-[10px] text-ink-dim opacity-70">[{jpLabel}]</span>}
        </div>
        <div className="text-right">
          <span className="font-display text-sm text-cyan-sys">{animatedValue}</span>
          <span className="text-ink-dim text-[10px]"> / 100</span>
        </div>
      </div>

      {/* Discrete segment progress bar */}
      <div className="flex gap-1 h-2 bg-black/60 p-0.5 border border-white/15">
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = i < activeSegments;
          return (
            <motion.div
              key={i}
              initial={reducedMotion ? false : { opacity: 0, scaleY: 0 }}
              animate={isActive ? { opacity: 1, scaleY: 1 } : { opacity: 0.15, scaleY: 1 }}
              transition={{ duration: 0.25, delay: i * 0.035 }}
              className={`flex-1 transition-colors ${
                isActive
                  ? rank === 'S'
                    ? 'bg-cyan-sys shadow-[0_0_6px_#00e5ff]'
                    : 'bg-magenta-sys shadow-[0_0_6px_#ff2bd6]'
                  : 'bg-white/10'
              }`}
            />
          );
        })}
      </div>

      {evidenceNote && (
        <p className="mt-2 text-[11px] text-ink-dim font-sans italic">{evidenceNote}</p>
      )}

      {items && items.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {items.map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 text-[10px] font-mono tracking-wide bg-black/40 border border-white/10 text-ink/90 hover:border-cyan-sys/60 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
