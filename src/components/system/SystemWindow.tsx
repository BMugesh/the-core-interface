'use client';

import React from 'react';

interface SystemWindowProps {
  title?: string;
  jpTag?: string;
  badge?: string;
  systemTag?: string;
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'magenta' | 'amber' | 'none';
  variant?: 'panel' | 'card' | 'manga';
  id?: string;
}

export const SystemWindow: React.FC<SystemWindowProps> = ({
  title = 'STATUS WINDOW',
  jpTag,
  badge,
  systemTag = '[ SYSTEM: R.I.O. // ONLINE ]',
  children,
  className = '',
  glow = 'cyan',
  variant = 'panel',
  id,
}) => {
  const glowClasses = {
    cyan: 'shadow-sys-cyan border-cyan-sys/60',
    magenta: 'shadow-sys-magenta border-magenta-sys/60',
    amber: 'shadow-sys-amber border-amber-sys/60',
    none: 'border-white/15',
  }[glow];

  return (
    <div
      id={id}
      className={`relative bg-panel/95 backdrop-blur-md border ${glowClasses} clip-panel p-4 md:p-6 text-ink overflow-hidden transition-all duration-200 ${
        variant === 'manga' ? 'shadow-manga-hard border-2' : ''
      } ${className}`}
    >
      {/* Scanline overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 scanlines opacity-60"
      />

      {/* Manga halftone subtle texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 halftone-bg opacity-30"
      />

      {/* Decorative corner brackets (HUD aesthetic) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-sys"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-sys"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-sys"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-sys"
      />

      {/* Window Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-sys animate-pulse shadow-[0_0_8px_#00e5ff]" />
          <span className="text-cyan-sys font-bold tracking-wider">{systemTag}</span>
          {jpTag && <span className="font-jp text-[10px] text-ink-dim opacity-70">[{jpTag}]</span>}
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-magenta-sys/20 text-magenta-sys border border-magenta-sys/50">
              {badge}
            </span>
          )}
          <span className="font-display text-sm tracking-wide text-ink uppercase">{title}</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
