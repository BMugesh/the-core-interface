import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingSequenceProps {
  onComplete: () => void;
}

// Enhanced Cinematic name decoder with character-by-character decoding
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
  const [decodePhase, setDecodePhase] = useState(0); // 0 = corrupted, 1 = partial, 2 = complete
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const charStatesRef = useRef<Array<{ char: string; decoded: boolean; pass: number }>>([]);
  
  const glyphSets = useMemo(() => ({
    corrupted: '△▢#@◊∆◇□■●○▲▼◄►',
    partial: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  }), []);

  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
      setDecodePhase(0);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const chars = text.split('');
    const totalDuration = 2800; // 2.8 seconds for full decode
    const pass1Duration = 1200; // First pass: 1.2s
    const pass2Duration = 1000; // Second pass: 1.0s
    const pass3Duration = 600;  // Final pass: 0.6s

    // Initialize character states
    charStatesRef.current = chars.map((char) => ({
      char: char === ' ' ? ' ' : char,
      decoded: char === ' ',
      pass: 0,
    }));

    // Initial corrupted state
    const initialText = chars.map((char, i) => {
      if (char === ' ') return ' ';
      return glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
    }).join('');
    setDisplayText(initialText);
    setDecodePhase(0);
    startTimeRef.current = Date.now();

    const animate = () => {
      if (!startTimeRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / totalDuration, 1);

      let newText = '';
      let allDecoded = true;

      // Pass 1: Initial corruption with gradual reveal (0-1.2s)
      if (elapsed < pass1Duration) {
        const pass1Progress = elapsed / pass1Duration;
        setDecodePhase(0);
        
        for (let i = 0; i < chars.length; i++) {
          const state = charStatesRef.current[i];
          if (state.char === ' ') {
            newText += ' ';
            continue;
          }

          // Staggered character reveal with wave effect
          const charProgress = (pass1Progress * chars.length + i * 0.15) / chars.length;
          
          if (charProgress > 0.3 && Math.random() > 0.7) {
            // Some characters start to resolve
            if (Math.random() > 0.5) {
              newText += state.char;
              state.decoded = true;
              state.pass = 1;
            } else {
              newText += glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
            }
          } else {
            // Still corrupted
            newText += glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
            allDecoded = false;
          }
        }
      }
      // Pass 2: Major resolution (1.2-2.2s)
      else if (elapsed < pass1Duration + pass2Duration) {
        const pass2Progress = (elapsed - pass1Duration) / pass2Duration;
        setDecodePhase(1);
        
        for (let i = 0; i < chars.length; i++) {
          const state = charStatesRef.current[i];
          if (state.char === ' ') {
            newText += ' ';
            continue;
          }

          const charProgress = (pass2Progress * chars.length + i * 0.2) / chars.length;
          
          if (charProgress > 0.4 || state.decoded) {
            // Character resolved or resolving
            if (Math.random() > 0.15) {
              newText += state.char;
              state.decoded = true;
              state.pass = 2;
            } else {
              // Occasional glitch
              newText += glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
              allDecoded = false;
            }
          } else {
            // Still resolving
            if (Math.random() > 0.6) {
              newText += state.char;
            } else {
              newText += glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
            }
            allDecoded = false;
          }
        }
      }
      // Pass 3: Final lock (2.2-2.8s)
      else {
        const pass3Progress = (elapsed - pass1Duration - pass2Duration) / pass3Duration;
        setDecodePhase(2);
        
        for (let i = 0; i < chars.length; i++) {
          const state = charStatesRef.current[i];
          if (state.char === ' ') {
            newText += ' ';
            continue;
          }

          const charProgress = (pass3Progress * chars.length + i * 0.1) / chars.length;
          
          if (charProgress > 0.2 || state.decoded) {
            newText += state.char;
            state.decoded = true;
            state.pass = 3;
          } else {
            // Final glitches resolving
            if (Math.random() > 0.3) {
              newText += state.char;
              state.decoded = true;
            } else {
              newText += glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)];
            }
            allDecoded = false;
          }
        }
      }

      setDisplayText(newText);

      if (progress >= 1 || allDecoded) {
        // Ensure final text is correct
        setDisplayText(text);
        setDecodePhase(2);
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
  }, [isActive, text, glyphSets, onComplete]);

  return (
    <motion.div
      className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white select-none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        filter: decodePhase === 2 ? 'blur(0px)' : decodePhase === 1 ? 'blur(0.3px)' : 'blur(0.8px)'
      }}
      transition={{ duration: 0.3 }}
      style={{
        textShadow: decodePhase === 2 
          ? '0 0 80px rgba(255, 255, 255, 0.2), 0 0 140px rgba(255, 255, 255, 0.1), 0 0 200px rgba(255, 255, 255, 0.05)'
          : decodePhase === 1
          ? '0 0 50px rgba(255, 255, 255, 0.15), 0 0 100px rgba(255, 255, 255, 0.08)'
          : '0 0 30px rgba(255, 255, 255, 0.1), 0 0 60px rgba(255, 255, 255, 0.05)',
        letterSpacing: decodePhase === 2 ? '0.08em' : '0.12em',
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
