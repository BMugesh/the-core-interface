import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { DecodingText } from './DecodingText';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence = ({ onComplete }: LoadingSequenceProps) => {
  const [phase, setPhase] = useState(-1); // -1 = black frame, 0 = signal, 1 = decode, 2 = confirm, 3 = drift, 4 = exit
  const [showSignal, setShowSignal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nameDecodeStart, setNameDecodeStart] = useState(false);

  useEffect(() => {
    // Always show loading sequence on first render
    // (Comment out this block to enable revisit behavior later)
    
    // Mark as initialized for future visits
    sessionStorage.setItem('portfolio-initialized', 'true');

    // Master timeline using GSAP for deterministic timing
    const timeline = gsap.timeline();

    // Phase 1: Black Frame (0-500ms)
    // Already in state -1

    // Phase 2: Signal Detection (500-3000ms) - INCREASED from 1.5s to 2.5s
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(0);
          setShowSignal(true);
        },
        duration: 0.001,
      },
      0.5
    );

    // Signal holds until 3s, then start decode
    // Phase 3: Identity Decoding (3000-5500ms) - INCREASED from 1s to 2.5s
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(1);
          setNameDecodeStart(true);
        },
        duration: 0.001,
      },
      3.0
    );

    // Phase 4: System Confirmation (5500-7000ms) - INCREASED from 1s to 1.5s
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(2);
          setShowConfirm(true);
        },
        duration: 0.001,
      },
      5.5
    );

    // Confirm holds for 1.5s, then fades

    // Phase 5: Camera Handoff & HUD (7000-8500ms) - INCREASED from 1s to 1.5s
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(3);
        },
        duration: 0.001,
      },
      7.0
    );

    // Phase 6: Seamless Transition to Hero (8500ms+) - INCREASED from 5s to 8.5s total
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(4);
        },
        duration: 0.001,
        onComplete: () => {
          // Wait a tiny bit more for smooth exit
          setTimeout(() => onComplete(), 300);
        },
      },
      8.5
    );

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'circIn' }}
    >
      {/* Phase 1-2: Black frame + Signal detection */}
      {phase >= 0 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 0 ? 1 : phase === 1 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Signal line - subtle, minimal */}
          <motion.div
            className="flex flex-col items-center gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: showSignal ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="font-mono text-xs md:text-sm text-white/60 tracking-widest">
              SIGNAL DETECTED
            </div>

            {/* Minimal alignment line */}
            <motion.div
              className="w-32 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: showSignal ? 1 : 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Phase 3: Identity Decoding */}
      {(phase === 1 || phase === 2 || phase === 3) && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 && phase <= 3 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Decoding name - controlled multi-pass */}
            <div className="h-20 flex items-center justify-center">
              {nameDecodeStart && (
                <DecodingText
                  text="BALA MUGESH M K"
                  className="text-2xl md:text-4xl font-mono tracking-wider text-white"
                  passes={2}
                  duration={2000}
                  delay={0}
                  onComplete={() => {
                    // Name is locked, hold briefly
                  }}
                />
              )}
            </div>

            {/* Confirmation message - appears after decode completes */}
            {phase >= 2 && (
              <motion.div
                className="font-mono text-xs text-neon-cyan/70 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: showConfirm ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                IDENTITY CONFIRMED
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Phase 5: Camera drift + HUD alignment (subtle) */}
      {phase === 3 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Very subtle HUD elements during camera handoff */}
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-px bg-neon-cyan/20"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.3 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-px bg-neon-cyan/20"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {/* Fade out all elements */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};



