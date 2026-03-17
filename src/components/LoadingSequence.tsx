import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DecodingText } from './DecodingText';

interface LoadingSequenceProps {
  onComplete: () => void;
}

// Wrapper component for DecodingText with IMAX styling
const CinematicNameDecoder = ({
  text,
  isActive,
  onComplete,
  cameraProgress
}: {
  text: string;
  isActive: boolean;
  onComplete: () => void;
  cameraProgress: number;
}) => {
  if (!isActive) return null;

  return (
    <div
      className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] select-none"
      style={{
        textShadow: '0 0 60px rgba(255, 255, 255, 0.2), 0 0 120px rgba(255, 255, 255, 0.1)',
        letterSpacing: '0.08em',
      }}
    >
      <DecodingText
        text={text}
        className="text-white"
        duration={2500}
        delay={50}
        onComplete={onComplete}
        resolveDirection="left-to-right"
      />
    </div>
  );
};

export const LoadingSequence = ({ onComplete }: LoadingSequenceProps) => {
  const [phase, setPhase] = useState(0);
  const [nameDecoded, setNameDecoded] = useState(false);
  const [enteringWorldVisible, setEnteringWorldVisible] = useState(false);
  const [cameraProgress, setCameraProgress] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cameraAnimationRef = useRef<number | null>(null);
  const cameraStartTimeRef = useRef<number | null>(null);

  // Clear all timers helper
  const clearAllTimers = () => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
  };

  // Continuous camera movement - starts during name decode, continues seamlessly
  useEffect(() => {
    if (phase >= 2) {
      if (!cameraStartTimeRef.current) {
        cameraStartTimeRef.current = Date.now();
      }

      const cameraDuration = 10000; // 10 seconds total - slow, heavy movement

      const animateCamera = () => {
        if (!cameraStartTimeRef.current) return;

        const elapsed = Date.now() - cameraStartTimeRef.current;
        const progress = Math.min(elapsed / cameraDuration, 1);

        // Slow, heavy camera drift - IMAX rig movement
        // Ease out for natural deceleration
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setCameraProgress(easedProgress);

        if (progress < 1 && phase < 6) {
          cameraAnimationRef.current = requestAnimationFrame(animateCamera);
        }
      };

      cameraAnimationRef.current = requestAnimationFrame(animateCamera);
    }

    return () => {
      if (cameraAnimationRef.current && phase >= 6) {
        cancelAnimationFrame(cameraAnimationRef.current);
      }
    };
  }, [phase]);

  // Phase 0 -> 1: Opening frame - intentional stillness
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase(1);
    }, 1000); // 1 second of pure stillness
    timersRef.current.push(timer);

    return () => clearAllTimers();
  }, []);

  // Phase 1 -> 2: Welcome text to name decode
  useEffect(() => {
    if (phase === 1) {
      const timer = setTimeout(() => {
        setPhase(2);
      }, 1400);
      timersRef.current.push(timer);
    }
  }, [phase]);

  // Phase 2 -> 3: Name decoded - hold and show "Entering the World"
  const handleNameDecoded = () => {
    setNameDecoded(true);
    const timer = setTimeout(() => {
      setPhase(3);
      const enteringTimer = setTimeout(() => {
        setEnteringWorldVisible(true);
        // Continue camera movement into hero
        const heroTimer = setTimeout(() => {
          setPhase(4);
        }, 1200);
        timersRef.current.push(heroTimer);
      }, 600);
      timersRef.current.push(enteringTimer);
    }, 500);
    timersRef.current.push(timer);
  };

  // Phase 4 -> 5: Transition to hero (seamless)
  useEffect(() => {
    if (phase === 4) {
      const timer = setTimeout(() => {
        setPhase(5);
        const exitTimer = setTimeout(() => {
          onComplete();
        }, 1500);
        timersRef.current.push(exitTimer);
      }, 2000);
      timersRef.current.push(timer);
    }
  }, [phase, onComplete]);

  // Calculate camera transform - slow, heavy, intentional IMAX rig movement
  const cameraScale = 1 + (cameraProgress * 0.08); // 1.0 to 1.08 - subtle, controlled push
  const cameraOpacity = phase >= 5 ? Math.max(0, 1 - (cameraProgress * 0.3)) : 1;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, #000000 100%)',
        transform: `scale(${cameraScale})`,
        opacity: cameraOpacity,
        transition: 'transform 0.1s linear, opacity 0.3s ease-out',
      }}
    >
      {/* IMAX backlight - subtle theater screen glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
          opacity: phase >= 1 ? 1 : 0.5,
        }}
      />

      {/* ========================================
          PHASE 0: OPENING FRAME
          Near stillness. Intentional pause.
          ======================================== */}
      {phase === 0 && (
        <div className="absolute inset-0" />
      )}

      {/* ========================================
          PHASE 1: PRIMARY TEXT INTRODUCTION
          "WELCOME TO THE WORLD OF"
          Clean, cinematic, confident
          ======================================== */}
      {phase === 1 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="font-display text-lg md:text-xl text-white/50 tracking-[0.4em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Welcome to the World of
          </motion.span>
        </motion.div>
      )}

      {/* ========================================
          PHASE 2: IMAX NAME DECODING
          Cinematic decoding - clarity emerging
          Camera movement begins here
          ======================================== */}
      {phase === 2 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <CinematicNameDecoder
            text="BALA MUGESH M K"
            isActive={phase === 2}
            onComplete={handleNameDecoded}
            cameraProgress={cameraProgress}
          />
        </motion.div>
      )}

      {/* ========================================
          PHASE 3 & 4: "ENTERING THE WORLD"
          Name fades out, only entering message remains
          Clean transition to hero
          ======================================== */}
      {(phase === 3 || phase === 4) && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* "Entering the World" - clean and centered */}
          {enteringWorldVisible && (
            <motion.span
              className="font-display text-lg md:text-xl text-white/60 tracking-[0.4em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Entering the World
            </motion.span>
          )}
        </motion.div>
      )}

      {/* ========================================
          PHASE 5: SEAMLESS HERO REVEAL
          "Entering the World" fades out
          Transition to main content
          ======================================== */}
      {phase === 5 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.5, 1]
          }}
        >
          {enteringWorldVisible && (
            <motion.span
              className="font-display text-lg md:text-xl text-white/60 tracking-[0.4em] uppercase"
            >
              Entering the World
            </motion.span>
          )}
        </motion.div>
      )}

      {/* Subtle depth vignette - optical, not digital */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)',
        }}
      />
    </motion.div>
  );
};
