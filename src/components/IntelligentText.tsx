import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { FocusReveal } from './FocusReveal';

interface IntelligentTextProps {
  children: string;
  type: 'hero' | 'heading' | 'body' | 'tag';
  hasVisited: boolean;
  delay?: number;
  className?: string;
}

/**
 * Intelligent text component that adapts animations based on visit state
 * 
 * FIRST LOAD: Cinematic Focus Pull
 * REVISIT: Instant clarity + Subtle recognition pulse
 */
export const IntelligentText = ({
  children,
  type,
  hasVisited,
  delay = 0,
  className = '',
}: IntelligentTextProps) => {
  // First visit: Use FocusReveal
  if (!hasVisited) {
    return (
      <FocusReveal 
        text={children} 
        className={className} 
        delay={delay}
        blurStrength={type === 'hero' || type === 'heading' ? 12 : 5}
        duration={1.5}
      />
    );
  }

  // Revisit: Instant with subtle pulse
  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, filter: 'blur(0px)' }}
      animate={{
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        repeat: 1,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};
