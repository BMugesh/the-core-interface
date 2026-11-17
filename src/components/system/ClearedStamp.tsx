'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/lib/motionPrefs';

interface ClearedStampProps {
  stampId: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ClearedStamp: React.FC<ClearedStampProps> = ({
  stampId,
  label = 'QUEST CLEARED',
  size = 'md',
  className = '',
}) => {
  const { triggerHitStop, reducedMotion } = useSystem();

  useEffect(() => {
    triggerHitStop(`stamp-${stampId}`);
  }, [stampId, triggerHitStop]);

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 border-2 tracking-widest',
    md: 'text-sm md:text-base px-4 py-1.5 border-[3px] tracking-[0.2em]',
    lg: 'text-lg md:text-2xl px-6 py-2 border-4 tracking-[0.25em]',
  }[size];

  return (
    <motion.div
      initial={reducedMotion ? { scale: 1, rotate: -12, opacity: 1 } : { scale: 2.2, rotate: -35, opacity: 0 }}
      animate={{ scale: 1, rotate: -12, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 18,
        mass: 0.8,
      }}
      className={`inline-block select-none font-display font-bold uppercase text-red-500 border-red-500 bg-red-950/30 shadow-[0_0_16px_rgba(239,68,68,0.45)] backdrop-blur-sm -rotate-12 ${sizeClasses} ${className}`}
      style={{
        textShadow: '0 0 10px rgba(239,68,68,0.8), 2px 2px 0px #000',
        boxShadow: '4px 4px 0px #000, 0 0 16px rgba(239,68,68,0.45)',
      }}
    >
      <span className="flex items-center gap-1.5">
        <span className="text-[10px] font-mono border-r border-red-500 pr-1.5">CLEAR</span>
        <span>{label}</span>
      </span>
    </motion.div>
  );
};
