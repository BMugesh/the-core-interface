'use client';

import React, { useEffect, useState } from 'react';
import { useSystem } from '@/lib/motionPrefs';

export const Cursor: React.FC = () => {
  const { reducedMotion } = useSystem();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [locked, setLocked] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setEnabled(false);
      return;
    }
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = (e.target as HTMLElement | null)?.closest(
        'a, button, [role="button"], input, textarea, [data-interactive="true"]'
      ) as HTMLElement | null;

      if (target) {
        const rect = target.getBoundingClientRect();
        setLocked({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          w: Math.min(Math.max(rect.width + 10, 32), 260),
          h: Math.min(Math.max(rect.height + 10, 32), 84),
        });
      } else {
        setLocked(null);
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  const cx = locked ? locked.x : pos.x;
  const cy = locked ? locked.y : pos.y;
  const width = locked ? locked.w : pressed ? 18 : 26;
  const height = locked ? locked.h : pressed ? 18 : 26;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9995] hidden md:block"
    >
      {/* Center reticle dot */}
      <div
        className="fixed w-1.5 h-1.5 bg-cyan-sys -translate-x-1/2 -translate-y-1/2"
        style={{
          left: pos.x,
          top: pos.y,
          boxShadow: '0 0 8px var(--accent-primary)',
        }}
      />

      {/* Locking corner-bracket frame */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 transition-[width,height,left,top] duration-100 ease-out"
        style={{
          left: cx,
          top: cy,
          width,
          height,
        }}
      >
        <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-sys" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-sys" />
        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-sys" />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-sys" />
      </div>
    </div>
  );
};
