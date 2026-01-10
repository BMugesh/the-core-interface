import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecodingTextProps {
  text: string;
  className?: string;
  passes?: number;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export const DecodingText = ({
  text,
  className = '',
  passes = 2,
  duration = 600,
  delay = 0,
  onComplete
}: DecodingTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState('idle'); // idle, decoding, locked
  const startTimeRef = useRef<number | null>(null);
  const isStartedRef = useRef(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      isStartedRef.current = true;
      startTimeRef.current = performance.now();
      setPhase('decoding');
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (phase !== 'decoding' || !isStartedRef.current) return;

    const animationFrame = setInterval(() => {
      if (!startTimeRef.current) return;

      const elapsed = performance.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Multi-pass reveal: each pass resolves characters more completely
      let newText = '';
      for (let i = 0; i < text.length; i++) {
        // Character-by-character progress
        const charProgress = (progress * passes + i * 0.1) % 1;

        if (charProgress > 0.85) {
          // Locked in place
          newText += text[i];
        } else if (charProgress > 0.4) {
          // Mid-decode: slight character corruption
          const seed = (text.charCodeAt(i) + i) % GLYPHS.length;
          newText += GLYPHS[(seed + Math.floor(charProgress * 4)) % GLYPHS.length];
        } else {
          // Early scramble
          newText += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(newText);

      if (progress >= 1) {
        setDisplayText(text);
        setPhase('locked');
        if (onComplete) onComplete();
      }
    }, 30);

    return () => clearInterval(animationFrame);
  }, [phase, text, duration, passes, onComplete]);

  return (
    <motion.span
      className={`inline-block font-mono tracking-wide ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'idle' ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText || text}
    </motion.span>
  );
};
