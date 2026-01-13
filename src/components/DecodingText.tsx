import { useState, useEffect, useRef } from 'react';

interface DecodingTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
  resolveDirection?: 'left-to-right' | 'center-out';
}

// IMAX-grade glyph system - intentional, engineered symbols
const GLYPH_SETS = {
  // Technical alphanumeric glyphs
  tech: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&',
  // Abstract block / corrupted glyphs
  corrupted: '▓░╫▯╪╬╧╨╩╝╜╛╞╟╠╡╢╣║',
  // Geometric symbols
  symbols: '◊◇□■●○△▲▼▽◈◉◎◐◑◒◓◔◕',
  // Mixed technical-symbol sets
  mixed: '█▓▒░╠╩╦╣═║$#@%&©®™×÷±∓∑√∞≈≠≤≥'
};

// Glyph progression: corrupted → symbols → mixed → tech → final character
const GLYPH_PROGRESSION = [
  GLYPH_SETS.corrupted,
  GLYPH_SETS.symbols,
  GLYPH_SETS.mixed,
  GLYPH_SETS.tech
];

export const DecodingText = ({
  text,
  className = '',
  duration = 2000,
  delay = 0,
  onComplete,
  resolveDirection = 'left-to-right'
}: DecodingTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);

  // Calculate character resolve order based on direction
  const getCharacterResolveOrder = (length: number): number[] => {
    if (resolveDirection === 'center-out') {
      const order: number[] = [];
      const mid = Math.floor(length / 2);
      for (let offset = 0; offset < length; offset++) {
        if (mid - offset >= 0) order.push(mid - offset);
        if (mid + offset < length && offset !== 0) order.push(mid + offset);
      }
      return order;
    }
    // Default: left-to-right
    return Array.from({ length }, (_, i) => i);
  };

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsDecoding(true);
      startTimeRef.current = performance.now();
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isDecoding || hasCompletedRef.current) return;

    const chars = text.split('');
    const resolveOrder = getCharacterResolveOrder(chars.length);
    const timePerChar = duration / chars.length;

    const animate = () => {
      if (!startTimeRef.current || hasCompletedRef.current) return;

      const elapsed = performance.now() - startTimeRef.current;
      const overallProgress = Math.min(elapsed / duration, 1);

      let newText = '';
      let allResolved = true;

      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        // Preserve spaces
        if (char === ' ') {
          newText += ' ';
          continue;
        }

        // Calculate when this character should start resolving
        const charIndex = resolveOrder.indexOf(i);
        const charStartTime = charIndex * timePerChar;
        const charElapsed = elapsed - charStartTime;

        if (charElapsed < 0) {
          // Character hasn't started decoding yet - show initial glyph
          const initialGlyph = GLYPH_SETS.corrupted[i % GLYPH_SETS.corrupted.length];
          newText += initialGlyph;
          allResolved = false;
        } else if (charElapsed < timePerChar) {
          // Character is actively decoding
          const charProgress = charElapsed / timePerChar;

          if (charProgress >= 0.95) {
            // Final lock - character is resolved
            newText += char;
          } else {
            // Glyph cycling phase
            // Progress through glyph sets: corrupted → symbols → mixed → tech
            const glyphSetIndex = Math.min(
              Math.floor(charProgress * GLYPH_PROGRESSION.length),
              GLYPH_PROGRESSION.length - 1
            );
            const currentGlyphSet = GLYPH_PROGRESSION[glyphSetIndex];

            // Cycle through glyphs in current set (slowing down as we progress)
            const cycleSpeed = Math.max(1, 8 - Math.floor(charProgress * 7));
            const glyphIndex = Math.floor((elapsed / (50 * cycleSpeed)) + i) % currentGlyphSet.length;

            newText += currentGlyphSet[glyphIndex];
            allResolved = false;
          }
        } else {
          // Character is fully resolved and locked
          newText += char;
        }
      }

      setDisplayText(newText);

      // Check if all characters are resolved
      if (allResolved && overallProgress >= 1) {
        setDisplayText(text);
        hasCompletedRef.current = true;
        if (onComplete) onComplete();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDecoding, text, duration, onComplete, resolveDirection]);

  return (
    <span className={`inline-block font-mono ${className}`}>
      {displayText || text.split('').map((c) => c === ' ' ? ' ' : '·').join('')}
    </span>
  );
};
