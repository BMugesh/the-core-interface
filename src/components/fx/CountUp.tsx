'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useSystem } from '@/lib/motionPrefs';

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  className?: string;
  hitStopId?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  target,
  suffix = '',
  prefix = '',
  durationMs = 950,
  className = '',
  hitStopId,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const { reducedMotion, triggerHitStop } = useSystem();
  const [val, setVal] = useState(reducedMotion ? target : 0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (reducedMotion || doneRef.current) {
      setVal(target);
      return;
    }
    if (!isInView) return;

    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        doneRef.current = true;
        setVal(target);
        if (hitStopId) triggerHitStop(hitStopId);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, durationMs, reducedMotion, hitStopId, triggerHitStop]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString('en-US')}
      {suffix}
    </span>
  );
};
