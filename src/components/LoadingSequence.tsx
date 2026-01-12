import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingSequenceProps {
  onComplete: () => void;
}

// IMAX-grade cinematic name decoder - clarity emerging, not corruption dissolving
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
  const [displayText, setDisplayText] = useState<string>('');
  const [decodeProgress, setDecodeProgress] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      hasCompletedRef.current = false;
      return;
    }

    // Reset state only when activation starts
    setDisplayText('');
    setDecodeProgress(0);
    hasCompletedRef.current = false;

    const chars = text.split('');
    
    // IMAX timing - minimal initial delay for immediate start
    const initialDelay = 20; // Nearly instant start
    const timePerChar = 180; // 180ms per character - fast reveal
    
    startTimeRef.current = Date.now();

    const animate = () => {
      if (!startTimeRef.current || hasCompletedRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      
      if (elapsed < initialDelay) {
        // Initial state - characters appear as subtle placeholders
        const initialText = chars.map(char => char === ' ' ? ' ' : '·').join('');
        setDisplayText(initialText);
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const adjustedElapsed = elapsed - initialDelay;
      const totalProgress = adjustedElapsed / (chars.length * timePerChar);
      setDecodeProgress(Math.min(totalProgress, 1));

      let newText = '';
      let allDecoded = true;

      for (let i = 0; i < chars.length; i++) {
        if (chars[i] === ' ') {
          newText += ' ';
          continue;
        }

        const charStartTime = i * timePerChar;
        const charElapsed = adjustedElapsed - charStartTime;

        if (charElapsed < 0) {
          // Character hasn't started - show placeholder
          newText += '·';
          allDecoded = false;
        } else if (charElapsed < timePerChar) {
          // Character is resolving - smooth transition
          const charProgress = Math.min(charElapsed / timePerChar, 1);
          
          // Smooth fade from placeholder to character
          if (charProgress < 0.3) {
            // Early: mostly placeholder
            newText += '·';
            allDecoded = false;
          } else if (charProgress < 0.7) {
            // Mid: transitioning
            newText += chars[i];
            allDecoded = false;
          } else {
            // Late: fully resolved
            newText += chars[i];
          }
        } else {
          // Character is fully decoded and locked
          newText += chars[i];
        }
      }

      setDisplayText(newText);

      // Check completion
      if (allDecoded && adjustedElapsed >= (chars.length * timePerChar)) {
        // Ensure final text is perfect and locked
        setDisplayText(text);
        setDecodeProgress(1);
        hasCompletedRef.current = true;
        
        // Immediate callback without delay
        onComplete();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  // Calculate visual clarity based on decode progress
  const clarity = decodeProgress;
  const isLocked = decodeProgress >= 1;

  return (
    <motion.div
      className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white select-none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        filter: isLocked ? 'blur(0px)' : `blur(${Math.max(0, 0.3 - clarity * 0.3)}px)`,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        textShadow: isLocked
          ? '0 0 60px rgba(255, 255, 255, 0.2), 0 0 120px rgba(255, 255, 255, 0.1)'
          : `0 0 ${20 + clarity * 40}px rgba(255, 255, 255, ${0.08 + clarity * 0.12})`,
        letterSpacing: '0.08em',
      }}
    >
      {displayText || text.split('').map(() => '·').join('')}
    </motion.div>
  );
};

export const LoadingSequence = ({ onComplete }: LoadingSequenceProps) => {
  const [phase, setPhase] = useState(0);
  const [nameDecoded, setNameDecoded] = useState(false);
  const [enteringWorldVisible, setEnteringWorldVisible] = useState(false);
  const [cameraProgress, setCameraProgress] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
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
          PHASE 3 & 4: NAME LOCKED + TRANSITION
          Name is solid and permanent
          "Entering the World" appears quietly
          Camera continues forward
          ======================================== */}
      {(phase === 3 || phase === 4) && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Decoded name - locked, solid, permanent */}
          <motion.div
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              textShadow: '0 0 60px rgba(255, 255, 255, 0.2), 0 0 120px rgba(255, 255, 255, 0.1)',
            }}
          >
            BALA MUGESH M K
          </motion.div>
          
          {/* "Entering the World" - narrative bridge */}
          {enteringWorldVisible && (
            <motion.span
              className="font-display text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase"
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
          Camera continues naturally
          Content resolves into focus
          Same spatial plane
          ======================================== */}
      {phase === 5 && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-10"
          animate={{ 
            opacity: [1, 0.8, 0],
          }}
          transition={{ 
            duration: 1.5, 
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.5, 1]
          }}
        >
          <motion.div
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white"
            style={{
              textShadow: '0 0 60px rgba(255, 255, 255, 0.2), 0 0 120px rgba(255, 255, 255, 0.1)',
            }}
          >
            BALA MUGESH M K
          </motion.div>
          
          {enteringWorldVisible && (
            <motion.span
              className="font-display text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase"
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
