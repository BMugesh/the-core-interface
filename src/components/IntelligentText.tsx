import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IntelligentTextProps {
  children: string | ReactNode;
  type: 'hero' | 'heading' | 'body' | 'tag';
  hasVisited: boolean;
  delay?: number;
  className?: string;
}

/**
 * Intelligent text component that adapts animations based on visit state
 * 
 * FIRST LOAD: Full cinematic animation
 * REVISIT: Subtle recognition pulse
 */
export const IntelligentText = ({
  children,
  type,
  hasVisited,
  delay = 0,
  className = '',
}: IntelligentTextProps) => {
  // Hero text: scan-line assembly on first visit, brightness wave on revisit
  if (type === 'hero') {
    if (!hasVisited) {
      return (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay }}
        >
          {children}
        </motion.div>
      );
    }

    // Revisit: subtle brightness pulse
    return (
      <motion.div
        className={className}
        animate={{
          textShadow: [
            '0 0 0px rgba(76, 175, 255, 0)',
            '0 0 20px rgba(76, 175, 255, 0.3)',
            '0 0 0px rgba(76, 175, 255, 0)',
          ],
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
  }

  // Section headings: horizontal scan on first visit, underline glow on revisit
  if (type === 'heading') {
    if (!hasVisited) {
      return (
        <motion.div
          className={className}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      );
    }

    // Revisit: instant with micro underline glow
    return (
      <motion.div
        className={className}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          style={{
            height: '1px',
            marginTop: '8px',
            background: '#4CAFFFF',
            opacity: 0.3,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {children}
      </motion.div>
    );
  }

  // Body text: line-by-line fade on first visit, opacity pulse on revisit
  if (type === 'body') {
    if (!hasVisited) {
      return (
        <motion.p
          className={className}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        >
          {children}
        </motion.p>
      );
    }

    // Revisit: static with tiny opacity pulse (barely visible)
    return (
      <motion.p
        className={className}
        animate={{ opacity: [1, 1.02, 1] }}
        transition={{ duration: 0.6, repeat: 1, ease: 'easeInOut' }}
      >
        {children}
      </motion.p>
    );
  }

  // Tech tags/labels: pop-in on first visit, static on revisit
  if (type === 'tag') {
    if (!hasVisited) {
      return (
        <motion.span
          className={className}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.3,
            delay,
            ease: 'easeOut',
          }}
        >
          {children}
        </motion.span>
      );
    }

    // Revisit: static, instant
    return <span className={className}>{children}</span>;
  }

  // Fallback
  return <div className={className}>{children}</div>;
};
