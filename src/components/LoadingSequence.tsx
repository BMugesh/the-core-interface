import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { DecodingText } from './DecodingText';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence = ({ onComplete }: LoadingSequenceProps) => {
  // Phase states:
  // -1 = black frame (0-1s)
  // 0 = welcome text (1-2s)
  // 1 = name decoding (2-3s)
  // 1.5 = name hold (3-4.5s)
  // 2 = transition statement (4.5-5.5s)
  // 3 = camera handoff (5.5-6.5s)
  // 4 = fade to hero
  
  const [phase, setPhase] = useState(-1);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showNameDecode, setShowNameDecode] = useState(false);
  const [nameDecoded, setNameDecoded] = useState(false);
  const [showTransitionStatement, setShowTransitionStatement] = useState(false);
  const [cameraHandoff, setCameraHandoff] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    // IMPORTANT: Always show the sequence on component mount
    // This ensures users always see it on fresh page loads
    // (Remove the return visit optimization for now to show the sequence)
    
    // TODO: Implement proper return visit tracking that survives page refreshes
    // (Would need localStorage instead of sessionStorage for true return visits)

    // Mark as viewed in this session
    sessionStorage.setItem('portfolio-viewed-sequence', 'true');

    // Master timeline using GSAP for deterministic timing
    const timeline = gsap.timeline();

    // Phase 1: Black Frame (0-1s) - Extended pause
    // Already in black state

    // Phase 2: Welcome Text (1-2s)
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(0);
          setShowWelcome(true);
        },
        duration: 0.001,
      },
      1.0
    );

    // Phase 3: Name Decoding (2-3s) - Extended, deliberate
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(1);
          setShowNameDecode(true);
        },
        duration: 0.001,
      },
      2.0
    );

    // Phase 3.5: Name Hold (3-4.5s) - Stable, clean
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(1.5);
          setNameDecoded(true);
        },
        duration: 0.001,
      },
      3.0
    );

    // Phase 4: Transition Statement (4.5-5.5s)
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(2);
          setShowTransitionStatement(true);
        },
        duration: 0.001,
      },
      4.5
    );

    // Phase 5: Camera Handoff (5.5-6.5s)
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(3);
          setCameraHandoff(true);
        },
        duration: 0.001,
      },
      5.5
    );

    // Phase 6: Exit to Hero (6.5s)
    timeline.to(
      {},
      {
        onStart: () => {
          setPhase(4);
          setShouldExit(true);
        },
        duration: 0.001,
        onComplete: () => {
          setTimeout(() => onComplete(), 400);
        },
      },
      6.5
    );

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      animate={{ opacity: shouldExit ? 0 : 1 }}
    >
      {/* ========================================
          PHASE 1: Black Frame (0-1s)
          Absolute black, no UI, no sound
          Pure pause before system "wakes up"
          ======================================== */}
      {phase === -1 && <div className="absolute inset-0 bg-black" />}

      {/* ========================================
          PHASE 2: Opening Invocation (1-2s)
          "WELCOME TO THE WORLD OF"
          Fade in then fade out
          ======================================== */}
      {phase >= 0 && phase < 1 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={showWelcome ? { opacity: 1 } : {}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div className="font-mono text-sm md:text-lg text-white/70 tracking-[0.3em] uppercase">
              Welcome to the World of
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ========================================
          PHASE 3: Extended IMAX Name Decoding (2-3s)
          Multiple controlled passes
          No rapid flicker, slow and intentional
          ======================================== */}
      {phase >= 1 && phase < 1.5 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center flex-col gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Decoded name - extended 5-step progression */}
          <div className="h-24 flex items-center justify-center">
            {showNameDecode && (
              <DecodingText
                text="BALA MUGESH M K"
                className="text-4xl md:text-6xl font-mono font-bold tracking-[0.15em] text-white"
                passes={5}
                duration={1000}
                delay={50}
                onComplete={() => {
                  // Name is locked
                }}
              />
            )}
          </div>
        </motion.div>
      )}

      {/* ========================================
          PHASE 3.5: Decoded Name Hold (3-4.5s)
          Stable, clean, perfectly locked
          Lets viewer absorb name as title card
          ======================================== */}
      {phase >= 1.5 && phase < 2 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center flex-col gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Stable name display */}
          <div className="h-24 flex items-center justify-center">
            <motion.div
              className="text-4xl md:text-6xl font-mono font-bold tracking-[0.15em] text-white"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.08), 0 0 60px rgba(255, 255, 255, 0.04)',
              }}
            >
              BALA MUGESH M K
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ========================================
          PHASE 4: Transition Statement (4.5-5.5s)
          "ENTERING THE WORLD" fades in below
          Both hold briefly, then statement fades out
          ======================================== */}
      {phase >= 2 && phase < 3 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center flex-col gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Stable name */}
          <div className="h-24 flex items-center justify-center">
            <motion.div
              className="text-4xl md:text-6xl font-mono font-bold tracking-[0.15em] text-white"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.08), 0 0 60px rgba(255, 255, 255, 0.04)',
              }}
            >
              BALA MUGESH M K
            </motion.div>
          </div>

          {/* Transition statement - fades in then out */}
          <motion.div
            className="font-mono text-sm md:text-base text-white/60 tracking-[0.2em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={showTransitionStatement ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            Entering the World
          </motion.div>
        </motion.div>
      )}

      {/* ========================================
          PHASE 5: IMAX Camera Handoff (5.5-6.5s)
          Slow forward drift through stable title
          Subtle HUD lines appear then dissolve
          Continuous movement into world
          ======================================== */}
      {phase >= 3 && phase < 4 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center flex-col gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        >
          {/* Camera drift container */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: cameraHandoff ? 1.06 : 1,
            }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          >
            {/* Name stays stable during drift */}
            <div className="h-24 flex items-center justify-center relative z-10">
              <div
                className="text-4xl md:text-6xl font-mono font-bold tracking-[0.15em] text-white"
                style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.08), 0 0 60px rgba(255, 255, 255, 0.04)',
                }}
              >
                BALA MUGESH M K
              </div>
            </div>

            {/* Upper HUD alignment line */}
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '280px', opacity: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            />

            {/* Lower HUD alignment line */}
            <motion.div
              className="absolute bottom-1/3 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '280px', opacity: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            />

            {/* HUD lines fade out */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Soft vignette during handoff */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </motion.div>
      )}

      {/* ========================================
          PHASE 6: Exit to Hero
          Seamless fade to hero section
          ======================================== */}
      {phase >= 4 && (
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: shouldExit ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
};



