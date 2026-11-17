'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useSystem } from '@/lib/motionPrefs';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+/<>[]';

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  triggerOnView?: boolean;
  speedMs?: number;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  as: Tag = 'span',
  triggerOnView = true,
  speedMs = 28,
}) => {
  const { reducedMotion } = useSystem();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(text);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(text);
      return;
    }
    if (triggerOnView && !isInView) return;
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    let frame = 0;
    const totalFrames = Math.max(12, text.length * 2);

    const interval = window.setInterval(() => {
      frame += 1;
      const revealCount = Math.floor((frame / totalFrames) * text.length);

      const scrambled = text
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < revealCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplay(scrambled);

      if (frame >= totalFrames) {
        setDisplay(text);
        window.clearInterval(interval);
      }
    }, speedMs);

    return () => window.clearInterval(interval);
  }, [text, isInView, triggerOnView, reducedMotion, speedMs]);

  return (
    <span ref={ref} className="inline-block">
      <Tag className={className}>{display}</Tag>
    </span>
  );
};
