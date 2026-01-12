import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecodingTextProps {
  text: string;
  className?: string;
  passes?: number;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
  enableGlitch?: boolean;
  enableColor?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

// Enhanced glyph sets for more cyberpunk feel
const GLYPH_SETS = {
  tech: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&',
  corrupted: '▓░╫▯╪╬╧╨╩╝╜╛╞╟╠╡╢╣║',
  symbols: '◊◇□■●○△▲▼▽◈◉◎◐◑◒◓◔◕',
  mixed: '█▓▒░╠╩╦╣═║$#@%&©®™×÷±∓∑√∞≈≠≤≥'
};

type GlyphSet = keyof typeof GLYPH_SETS;

export const DecodingText = ({
  text,
  className = '',
  passes = 2,
  duration = 600,
  delay = 0,
  onComplete,
  enableGlitch = true,
  enableColor = true,
  intensity = 'medium'
}: DecodingTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState('idle'); // idle, decoding, locked
  const [colorVariant, setColorVariant] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const isStartedRef = useRef(false);
  const glitchSeedRef = useRef<number>(0);

  const intensityMultipliers = {
    low: 0.5,
    medium: 1,
    high: 1.5
  };

  const glyphProgression: GlyphSet[] = ['corrupted', 'symbols', 'mixed', 'tech'];

  useEffect(() => {
    const startTimer = setTimeout(() => {
      isStartedRef.current = true;
      startTimeRef.current = performance.now();
      setPhase('decoding');
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  // Color cycling effect
  useEffect(() => {
    if (phase !== 'decoding' || !enableColor) return;

    const colorTimer = setInterval(() => {
      setColorVariant(prev => (prev + 1) % 3);
    }, 100);

    return () => clearInterval(colorTimer);
  }, [phase, enableColor]);

  useEffect(() => {
    if (phase !== 'decoding' || !isStartedRef.current) return;

    const animationFrame = setInterval(() => {
      if (!startTimeRef.current) return;

      const elapsed = performance.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const intensity_mult = intensityMultipliers[intensity];

      let newText = '';
      const charCount = text.length;

      for (let i = 0; i < charCount; i++) {
        // Staggered character reveal with wave effect
        const baseCharProgress = (progress * passes + (i * 0.08) / intensity_mult) % 1;
        const charProgress = Math.sin(baseCharProgress * Math.PI) * baseCharProgress;

        let char = text[i];

        if (charProgress > 0.9) {
          // Fully resolved - final character
          char = text[i];
        } else if (charProgress > 0.65) {
          // Late decode phase - mostly correct with occasional corruption
          if (enableGlitch && Math.random() > 0.85) {
            const glyphSet = GLYPH_SETS.tech;
            char = glyphSet[Math.floor(Math.random() * glyphSet.length)];
          } else {
            char = text[i];
          }
        } else if (charProgress > 0.35) {
          // Mid-decode phase - character corruption and transitions
          const passIndex = Math.floor(charProgress * glyphProgression.length);
          const selectedSet = glyphProgression[Math.min(passIndex, glyphProgression.length - 1)];
          const glyphSet = GLYPH_SETS[selectedSet];
          const offset = (glitchSeedRef.current + i + Math.floor(charProgress * 8)) % glyphSet.length;
          char = glyphSet[offset];
        } else if (charProgress > 0) {
          // Early scramble - full chaos
          const allGlyphs = Object.values(GLYPH_SETS).join('');
          char = allGlyphs[Math.floor(Math.random() * allGlyphs.length)];
        } else {
          // Not yet active
          char = ' ';
        }

        newText += char;
      }

      glitchSeedRef.current = (glitchSeedRef.current + 1) % 256;
      setDisplayText(newText);

      if (progress >= 1) {
        setDisplayText(text);
        setPhase('locked');
        if (onComplete) onComplete();
      }
    }, 20);

    return () => clearInterval(animationFrame);
  }, [phase, text, duration, passes, onComplete, enableGlitch, intensity]);

  // Color class mapping based on phase
  const getColorClass = () => {
    if (!enableColor) return '';
    
    if (phase === 'locked') {
      return 'text-white';
    }

    const colors = [
      'text-cyan-400',
      'text-green-400',
      'text-white'
    ];
    return colors[colorVariant];
  };

  // Glow effect during decode
  const getGlowStyle = () => {
    if (phase === 'locked') {
      return {
        textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)',
      };
    }

    if (enableColor) {
      const glows = [
        '0 0 15px rgba(34, 211, 238, 0.8), 0 0 30px rgba(34, 211, 238, 0.4)',
        '0 0 15px rgba(74, 222, 128, 0.8), 0 0 30px rgba(74, 222, 128, 0.4)',
        '0 0 10px rgba(255, 255, 255, 0.5)',
      ];
      return { textShadow: glows[colorVariant] };
    }

    return { textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' };
  };

  return (
    <motion.span
      className={`inline-block font-mono tracking-wide transition-colors duration-100 ${getColorClass()} ${className}`}
      style={getGlowStyle()}
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'idle' ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText || text}
    </motion.span>
  );
};
