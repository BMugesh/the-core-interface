'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/lib/motionPrefs';

interface TitleToastProps {
  titleName: string;
  event: string;
  badge: string;
  visible: boolean;
  onClose?: () => void;
}

export const TitleToast: React.FC<TitleToastProps> = ({
  titleName,
  event,
  badge,
  visible,
  onClose,
}) => {
  const { reducedMotion } = useSystem();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed top-6 right-6 z-[9980] max-w-sm w-full bg-panel border-2 border-amber-sys/80 p-4 shadow-sys-amber clip-panel text-ink"
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 font-mono text-[11px]">
            <span className="flex items-center gap-2 text-amber-sys font-bold">
              <span className="w-2 h-2 bg-amber-sys animate-ping rounded-full" />
              [ SYSTEM ALERT ]
            </span>
            <span className="px-1.5 py-0.5 text-[10px] bg-amber-sys/20 text-amber-sys font-bold border border-amber-sys/40">
              {badge}
            </span>
          </div>

          <div className="font-display text-xl tracking-wide text-ink uppercase">
            {titleName}
          </div>
          <div className="text-xs font-mono text-cyan-sys mt-0.5">{event}</div>
          <p className="text-[11px] text-ink-dim mt-2 font-sans">
            TITLE ACQUIRED — Stat sync profile updated.
          </p>

          {onClose && (
            <button
              onClick={onClose}
              className="mt-3 text-[10px] font-mono text-ink-dim hover:text-ink tracking-wider uppercase underline underline-offset-2"
            >
              DISMISS [ESC]
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
