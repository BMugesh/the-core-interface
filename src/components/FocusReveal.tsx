import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FocusRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'none' | 'up' | 'down';
  blurStrength?: number;
}

/**
 * FocusReveal - Cinematic text reveal that simulates a camera lens finding focus.
 * 
 * Logic:
 * 1. Pre-existence: Text is blurred and low opacity
 * 2. Focus Pull: Blur reduces, opacity increases
 * 3. Lock-In: Text sharpens completely
 * 
 * No character shuffling, no typewriting. Pure optical resolution.
 */
export const FocusReveal = ({ 
  text, 
  className = '', 
  delay = 0,
  duration = 1.2,
  direction = 'none',
  blurStrength = 10
}: FocusRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10%" });

  // Initial state based on direction
  const getInitialY = () => {
    switch (direction) {
      case 'up': return 20;
      case 'down': return -20;
      default: return 0;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        filter: `blur(${blurStrength}px)`,
        y: getInitialY()
      }}
      animate={isInView ? { 
        opacity: 1, 
        filter: 'blur(0px)',
        y: 0
      } : {}}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1], // Cinematic easing (sine/cubic-like)
      }}
    >
      {text}
    </motion.div>
  );
};
