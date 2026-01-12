import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingSequenceProps {
  onComplete: () => void;
}

// Clean letter-by-letter sequential decoder - slow, deliberate, perfect
const CinematicNameDecoder = ({ 
  text, 
  isActive,
  onComplete 
}: { 
  text: string; 
  isActive: boolean;
  onComplete: () => void;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [decodePhase, setDecodePhase] = useState(0); // 0 = corrupted, 1 = decoding, 2 = complete
  const [overallProgress, setOverallProgress] = useState(0); // 0-1 for visual effects
  const currentCharIndexRef = useRef<number>(0);
  const charDecodeStateRef = useRef<Array<{ 
    char: string; 
    decoded: boolean; 
    decodeProgress: number; // 0-1 for individual char decode animation
  }>>([]);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  const glyphSets = useMemo(() => ({
    corrupted: '△▢#@◊∆◇□■●○▲▼◄►',
  }), []);

  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
      setDecodePhase(0);
      currentCharIndexRef.current = 0;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const chars = text.split('');
    
    // Timing configuration - slow and deliberate
    const timePerLetter = 180; // 180ms per letter (slow and clean)
    const charDecodeDuration = 120; // 120ms for each letter's decode animation
    const initialCorruptionDelay = 300; // 300ms initial corruption display
    
    // Initialize character states
    charDecodeStateRef.current = chars.map((char) => ({
      char: char,
      decoded: char === ' ', // Spaces are already "decoded"
      decodeProgress: 0,
    }));

    // Initial corrupted state - all characters corrupted
    const initialText = chars.map((char) => {
      if (char === ' ') return ' ';
      return glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
    }).join('');
    setDisplayText(initialText);
    setDecodePhase(0);
    currentCharIndexRef.current = 0;
    startTimeRef.current = Date.now();

    const animate = () => {
      if (!startTimeRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      
      // Wait for initial corruption display
      if (elapsed < initialCorruptionDelay) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const adjustedElapsed = elapsed - initialCorruptionDelay;
      setDecodePhase(1); // Start decoding phase

      let newText = '';
      let allDecoded = true;
      const totalChars = chars.length;

      // Calculate which character should be decoding now
      const targetCharIndex = Math.floor(adjustedElapsed / timePerLetter);
      
      // Build the display text letter by letter
      for (let i = 0; i < chars.length; i++) {
        const state = charDecodeStateRef.current[i];
        
        if (state.char === ' ') {
          newText += ' ';
          continue;
        }

        // Characters before current index are fully decoded
        if (i < targetCharIndex) {
          newText += state.char;
          state.decoded = true;
          state.decodeProgress = 1;
        }
        // Current character being decoded
        else if (i === targetCharIndex) {
          const charStartTime = targetCharIndex * timePerLetter;
          const charElapsed = adjustedElapsed - charStartTime;
          const charProgress = Math.min(charElapsed / charDecodeDuration, 1);
          
          state.decodeProgress = charProgress;
          
          if (charProgress >= 1) {
            // Character is fully decoded
            newText += state.char;
            state.decoded = true;
          } else {
            // Character is in decode animation - show glitch transitioning to correct
            if (charProgress < 0.3) {
              // Early phase: mostly corrupted with occasional correct flashes
              if (Math.random() > 0.7) {
                newText += state.char;
              } else {
                newText += glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
              }
            } else if (charProgress < 0.7) {
              // Mid phase: more correct, less corrupted
              if (Math.random() > 0.4) {
                newText += state.char;
              } else {
                newText += glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
              }
            } else {
              // Late phase: mostly correct, final glitches
              if (Math.random() > 0.15) {
                newText += state.char;
              } else {
                newText += glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
              }
            }
            allDecoded = false;
          }
        }
        // Characters after current index are still corrupted
        else {
          newText += glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
          allDecoded = false;
        }
      }

      setDisplayText(newText);

      // Update overall progress for visual effects
      const decodedCount = charDecodeStateRef.current.filter(state => 
        state.char === ' ' || state.decoded
      ).length;
      const progress = decodedCount / totalChars;
      setOverallProgress(progress);

      // Check if all characters are decoded
      const allCharsDecoded = charDecodeStateRef.current.every(state => 
        state.char === ' ' || state.decoded
      );
      
      // Calculate total time needed
      const totalTimeNeeded = initialCorruptionDelay + (totalChars * timePerLetter) + charDecodeDuration;
      
      if (allCharsDecoded && adjustedElapsed >= (totalChars * timePerLetter + charDecodeDuration - 50)) {
        // Ensure final text is perfect
        setDisplayText(text);
        setDecodePhase(2);
        setOverallProgress(1);
        
        // Small delay to show final decoded state
        setTimeout(() => {
          onComplete();
        }, 200);
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
  }, [isActive, text, glyphSets, onComplete]);

  return (
    <motion.div
      className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white select-none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        filter: decodePhase === 2 
          ? 'blur(0px)' 
          : decodePhase === 1 
          ? `blur(${Math.max(0, 0.5 - overallProgress * 0.5)}px)`
          : 'blur(0.8px)'
      }}
      transition={{ duration: 0.2 }}
      style={{
        textShadow: decodePhase === 2 
          ? '0 0 80px rgba(255, 255, 255, 0.25), 0 0 140px rgba(255, 255, 255, 0.15), 0 0 200px rgba(255, 255, 255, 0.08)'
          : decodePhase === 1
          ? `0 0 ${30 + overallProgress * 50}px rgba(255, 255, 255, ${0.1 + overallProgress * 0.15}), 0 0 ${60 + overallProgress * 80}px rgba(255, 255, 255, ${0.05 + overallProgress * 0.1})`
          : '0 0 30px rgba(255, 255, 255, 0.1), 0 0 60px rgba(255, 255, 255, 0.05)',
        letterSpacing: decodePhase === 2 ? '0.08em' : '0.1em',
      }}
    >
      {displayText || text}
    </motion.div>
  );
};

export const LoadingSequence = ({ onComplete }: LoadingSequenceProps) => {
  const [phase, setPhase] = useState(0);
  const [nameDecoded, setNameDecoded] = useState(false);
  const [enteringWorldVisible, setEnteringWorldVisible] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all timers helper
  const clearAllTimers = () => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
  };

  // Phase 0 -> 1: Black to Welcome (fixed timing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase(1);
    }, 900);
    timersRef.current.push(timer);

    return () => clearAllTimers();
  }, []);

  // Phase 1 -> 2: Welcome to Name Decode (fixed timing)
  useEffect(() => {
    if (phase === 1) {
      const timer = setTimeout(() => {
        setPhase(2);
      }, 1300); // 1.3s after welcome appears
      timersRef.current.push(timer);
    }
  }, [phase]);

  // Phase 2 -> 3: Wait for name decoding to complete (event-driven)
  const handleNameDecoded = () => {
    setNameDecoded(true);
    // Hold the decoded name for a moment before showing "Entering the World"
    const timer = setTimeout(() => {
      setPhase(3);
      // After a brief hold, fade up "Entering the World"
      const enteringTimer = setTimeout(() => {
        setEnteringWorldVisible(true);
        // After "Entering the World" fades up, proceed to camera handoff
        const cameraTimer = setTimeout(() => {
          setPhase(4);
        }, 1500); // Hold "Entering the World" for 1.5s
        timersRef.current.push(cameraTimer);
      }, 800); // Brief hold of decoded name
      timersRef.current.push(enteringTimer);
    }, 600); // Hold decoded name for 0.6s
    timersRef.current.push(timer);
  };

  // Phase 4 -> 5: Camera handoff (after "Entering the World")
  useEffect(() => {
    if (phase === 4) {
      const timer = setTimeout(() => {
        setPhase(5);
        // After camera handoff, exit to hero
        const exitTimer = setTimeout(() => {
          setPhase(6);
          // Final exit after camera handoff completes
          const finalTimer = setTimeout(() => {
            onComplete();
          }, 1200); // Camera handoff duration
          timersRef.current.push(finalTimer);
        }, 200); // Brief delay before exit
        timersRef.current.push(exitTimer);
      }, 1400); // Camera handoff animation duration
      timersRef.current.push(timer);
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
      animate={{ opacity: phase >= 6 ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* ========================================
          PHASE 1: IMAX BLACK (0-0.9s)
          Pure stillness. Earn attention.
          ======================================== */}
      {phase === 0 && (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* ========================================
          PHASE 2: OPENING LINE (0.9-2.2s)
          "WELCOME TO THE WORLD OF"
          Opacity fade only. No movement.
          ======================================== */}
      {phase === 1 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.span
            className="font-display text-lg md:text-xl text-white/60 tracking-[0.4em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Welcome to the World of
          </motion.span>
        </motion.div>
      )}

      {/* ========================================
          PHASE 3: CINEMATIC NAME DECODING
          Enhanced character-by-character decoding
          Event-driven: waits for full decode
          ======================================== */}
      {phase === 2 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CinematicNameDecoder 
            text="BALA MUGESH M K"
            isActive={phase === 2}
            onComplete={handleNameDecoded}
          />
        </motion.div>
      )}

      {/* ========================================
          PHASE 4: NAME HOLD + ENTERING WORLD FADE-UP
          Decoded name holds, then "Entering the World" fades up
          ======================================== */}
      {(phase === 3 || phase === 4) && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Decoded name - stable and glowing */}
          <motion.div
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              textShadow: '0 0 80px rgba(255, 255, 255, 0.2), 0 0 140px rgba(255, 255, 255, 0.1), 0 0 200px rgba(255, 255, 255, 0.05)',
            }}
          >
            BALA MUGESH M K
          </motion.div>
          
          {/* "Entering the World" - smooth fade up */}
          {enteringWorldVisible && (
            <motion.span
              className="font-display text-sm md:text-base text-white/60 tracking-[0.35em] uppercase"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)',
              }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1
              }}
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)',
              }}
            >
              Entering the World
            </motion.span>
          )}
        </motion.div>
      )}

      {/* ========================================
          PHASE 5: IMAX CAMERA HANDOFF
          Enhanced cinematic camera push into hero
          ======================================== */}
      {phase === 5 && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ 
            opacity: [1, 0.95, 0.7, 0],
            scale: [1, 1.05, 1.12, 1.15]
          }}
          transition={{ 
            duration: 1.4, 
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.3, 0.7, 1]
          }}
        >
          {/* Enhanced HUD alignment lines */}
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: ['0px', '400px', '400px', '0px'],
              opacity: [0, 0.5, 0.3, 0]
            }}
            transition={{ 
              duration: 1.4, 
              ease: 'easeInOut',
              times: [0, 0.2, 0.6, 1]
            }}
          />
          
          {/* Center focus point */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0.3, 0],
              scale: [0, 1, 1.5, 0]
            }}
            transition={{ 
              duration: 1.4, 
              ease: 'easeInOut',
              times: [0, 0.3, 0.7, 1]
            }}
          />
          
          <motion.div
            className="absolute bottom-1/3 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: ['0px', '400px', '400px', '0px'],
              opacity: [0, 0.5, 0.3, 0]
            }}
            transition={{ 
              duration: 1.4, 
              ease: 'easeInOut',
              delay: 0.15,
              times: [0, 0.2, 0.6, 1]
            }}
          />
          
          {/* Name and text fade out during camera push */}
          <motion.div
            className="flex flex-col items-center justify-center gap-8"
            animate={{ 
              opacity: [1, 0.9, 0.5, 0],
              y: [0, -10, -20, -30]
            }}
            transition={{ 
              duration: 1.4, 
              ease: 'easeInOut',
              times: [0, 0.3, 0.7, 1]
            }}
          >
            <motion.div
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white"
              style={{
                textShadow: '0 0 80px rgba(255, 255, 255, 0.2), 0 0 140px rgba(255, 255, 255, 0.1)',
              }}
            >
              BALA MUGESH M K
            </motion.div>
            
            {enteringWorldVisible && (
              <motion.span
                className="font-display text-sm md:text-base text-white/60 tracking-[0.35em] uppercase"
                style={{
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                }}
              >
                Entering the World
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Subtle vignette throughout */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </motion.div>
  );
};
