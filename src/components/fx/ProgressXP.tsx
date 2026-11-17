'use client';

import React, { useEffect, useState } from 'react';
import { useSystem } from '@/lib/motionPrefs';

export const ProgressXP: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const { berserkMode } = useSystem();

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(pct);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      aria-label={`Sync Rate ${Math.round(progress)}%`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/80 pointer-events-none"
    >
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: berserkMode ? '#ff1e38' : '#00e5ff',
          boxShadow: berserkMode
            ? '0 0 10px rgba(255, 30, 56, 0.85)'
            : '0 0 10px rgba(0, 229, 255, 0.85)',
        }}
      />
      <div className="hidden sm:flex fixed top-2 right-3 items-center gap-1.5 px-2 py-0.5 bg-bg/90 border border-cyan-sys/40 font-mono text-[10px] tracking-widest text-cyan-sys">
        <span>SYNC RATE</span>
        <span className="font-bold text-ink">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};
