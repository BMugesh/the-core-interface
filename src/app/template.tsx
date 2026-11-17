'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/lib/motionPrefs';

export default function Template({ children }: { children: React.ReactNode }) {
  const { reducedMotion } = useSystem();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}
      animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
