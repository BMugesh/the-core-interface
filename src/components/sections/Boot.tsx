'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/data/profile';
import { useSystem } from '@/lib/motionPrefs';

const BOOT_SEEN_KEY = 'rio_boot_seen_v1';

export const Boot: React.FC = () => {
  const { reducedMotion } = useSystem();
  const [visible, setVisible] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [wiping, setWiping] = useState(false);

  const finishBoot = useCallback(() => {
    try {
      window.sessionStorage.setItem(BOOT_SEEN_KEY, '1');
    } catch {
      // ignore storage errors
    }
    setWiping(true);
    window.setTimeout(() => {
      setVisible(false);
    }, 320);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false);
      return;
    }

    try {
      if (window.sessionStorage.getItem(BOOT_SEEN_KEY) === '1') {
        setVisible(false);
        return;
      }
    } catch {
      // continue to show boot
    }

    setVisible(true);
  }, [reducedMotion]);

  // Escape key skips immediately
  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishBoot();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, finishBoot]);

  // Fast typing timer — total under ~3.2s
  useEffect(() => {
    if (!visible || wiping) return;

    const lines = profile.bootLines;
    if (lineIndex >= lines.length) {
      const doneTimer = window.setTimeout(finishBoot, 420);
      return () => window.clearTimeout(doneTimer);
    }

    const currentLine = lines[lineIndex];
    if (charIndex < currentLine.length) {
      const timer = window.setTimeout(() => {
        setCharIndex((c) => c + 3);
      }, 22);
      return () => window.clearTimeout(timer);
    } else {
      const nextLineTimer = window.setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 180);
      return () => window.clearTimeout(nextLineTimer);
    }
  }, [visible, wiping, lineIndex, charIndex, finishBoot]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="R.I.O. System Boot Sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center p-6 font-mono ${
            wiping ? 'animate-glitch-skew' : ''
          }`}
        >
          {/* Scanline overlay */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 scanlines opacity-75" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 halftone-bg opacity-25" />

          {/* Boot terminal panel */}
          <div className="relative z-10 w-full max-w-2xl bg-panel border-2 border-cyan-sys shadow-sys-cyan clip-panel p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5 text-xs">
              <div className="flex items-center gap-2 text-cyan-sys font-bold tracking-widest">
                <span className="w-2 h-2 bg-cyan-sys animate-ping" />
                <span>[ SYSTEM // BOOT ]</span>
                <span className="font-jp text-ink-dim font-normal">起動</span>
              </div>
              <button
                type="button"
                onClick={finishBoot}
                className="px-3 py-1 bg-cyan-sys/15 border border-cyan-sys text-cyan-sys text-xs font-bold uppercase tracking-wider hover:bg-cyan-sys hover:text-bg transition-colors"
              >
                SKIP [ESC]
              </button>
            </div>

            <div className="space-y-2.5 min-h-[140px] text-xs sm:text-sm">
              {profile.bootLines.map((line, idx) => {
                if (idx > lineIndex) return null;
                const textToShow =
                  idx === lineIndex ? line.slice(0, Math.min(charIndex, line.length)) : line;
                const isLast = idx === profile.bootLines.length - 1;
                return (
                  <p
                    key={line}
                    className={`leading-relaxed ${
                      isLast
                        ? 'text-cyan-sys font-bold text-sm sm:text-base pt-1'
                        : 'text-ink'
                    }`}
                  >
                    {textToShow}
                    {idx === lineIndex && (
                      <span className="inline-block w-2 h-4 ml-1 bg-cyan-sys align-middle animate-pulse" />
                    )}
                  </p>
                );
              })}
            </div>

            {/* Boot progress bar */}
            <div className="mt-6 h-1.5 bg-black border border-white/15 overflow-hidden">
              <div
                className="h-full bg-cyan-sys transition-all duration-150"
                style={{
                  width: `${Math.min(100, ((lineIndex + 0.5) / profile.bootLines.length) * 100)}%`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
