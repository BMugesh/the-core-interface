import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface LoadingSequenceProps {
  onComplete: () => void;
}

// Cinematic name decoder - slow, controlled, 1-2 passes only
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
  const [phase, setPhase] = useState(0); // 0 = scrambled, 1 = partial, 2 = complete
  
  const glyphSets = useMemo(() => ({
    corrupted: '△▢#@◊∆◇□■●○',
    partial: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ',
  }), []);

  useEffect(() => {
    if (!isActive) return;

    const chars = text.split('');
    
    // Phase 0: Initial corrupted state (0-400ms)
    const corrupted = chars.map((char, i) => {
      if (char === ' ') return ' ';
      // 60% corrupted initially
      return Math.random() > 0.4 
        ? glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)]
        : char;
    }).join('');
    setDisplayText(corrupted);
    setPhase(0);

    // Phase 1: Partial decode (400-800ms)
    const timer1 = setTimeout(() => {
      const partial = chars.map((char, i) => {
        if (char === ' ') return ' ';
        // 20% corrupted
        return Math.random() > 0.8 
          ? glyphSets.corrupted[Math.floor(Math.random() * glyphSets.corrupted.length)]
          : char;
      }).join('');
      setDisplayText(partial);
      setPhase(1);
    }, 500);

    // Phase 2: Complete (800ms+)
    const timer2 = setTimeout(() => {
      setDisplayText(text);
      setPhase(2);
      onComplete();
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActive, text, glyphSets, onComplete]);

  return (
    <motion.div
      className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white select-none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        filter: phase === 2 ? 'blur(0px)' : 'blur(0.5px)'
      }}
      transition={{ duration: 0.4 }}
      style={{
        textShadow: phase === 2 
          ? '0 0 60px rgba(255, 255, 255, 0.15), 0 0 120px rgba(255, 255, 255, 0.05)'
          : '0 0 30px rgba(255, 255, 255, 0.1)',
      }}
    >
      {displayText}
    </motion.div>
  );
};

export const LoadingSequence = ({ onComplete }: LoadingSequenceProps) => {
  const [phase, setPhase] = useState(0);
  const [nameDecoded, setNameDecoded] = useState(false);

  useEffect(() => {
    // Check for return visits - skip sequence if already seen this session
    const hasSeenSequence = sessionStorage.getItem('portfolio-viewed-sequence');
    if (hasSeenSequence === 'true') {
      onComplete();
      return;
    }

    // Phase timing (IMAX cinematic pacing)
    const timeline = [
      { phase: 1, delay: 900 },    // End black, show welcome
      { phase: 2, delay: 2200 },   // End welcome, start name decode
      { phase: 3, delay: 3400 },   // Name decoded, hold
      { phase: 4, delay: 5000 },   // Show "Entering the World"
      { phase: 5, delay: 6200 },   // Camera push begins
      { phase: 6, delay: 7400 },   // Exit
    ];

    const timers = timeline.map(({ phase: p, delay }) => 
      setTimeout(() => setPhase(p), delay)
    );

    // Final exit
    const exitTimer = setTimeout(() => {
      sessionStorage.setItem('portfolio-viewed-sequence', 'true');
      onComplete();
    }, 8000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

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
          PHASE 3: CINEMATIC NAME DECODING (2.2-3.4s)
          Slow, deliberate, 1-2 correction passes
          Like signal locking onto focus
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
            onComplete={() => setNameDecoded(true)}
          />
        </motion.div>
      )}

      {/* ========================================
          PHASE 4: NAME HOLD (3.4-5s)
          Stable. Clean. Let it breathe.
          ======================================== */}
      {phase === 3 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white"
            style={{
              textShadow: '0 0 60px rgba(255, 255, 255, 0.15), 0 0 120px rgba(255, 255, 255, 0.05)',
            }}
          >
            BALA MUGESH M K
          </motion.div>
        </motion.div>
      )}

      {/* ========================================
          PHASE 5: WORLD ENTRY LINE (5-6.2s)
          "ENTERING THE WORLD" appears below
          Narrative, not technical
          ======================================== */}
      {phase === 4 && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white"
            style={{
              textShadow: '0 0 60px rgba(255, 255, 255, 0.15), 0 0 120px rgba(255, 255, 255, 0.05)',
            }}
          >
            BALA MUGESH M K
          </motion.div>
          
          <motion.span
            className="font-display text-sm md:text-base text-white/50 tracking-[0.35em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Entering the World
          </motion.span>
        </motion.div>
      )}

      {/* ========================================
          PHASE 6: CAMERA PUSH (6.2-7.4s)
          Slow forward drift. Subtle HUD lines.
          No flash. No cut. Continuous.
          ======================================== */}
      {phase === 5 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1.08 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Subtle alignment lines - appear then dissolve */}
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            animate={{ width: '300px', opacity: [0, 0.3, 0] }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            animate={{ width: '300px', opacity: [0, 0.3, 0] }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.1 }}
          />
          
          {/* Name continues stable during drift */}
          <motion.div
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.08em] text-white"
            animate={{ opacity: [1, 0.8, 0] }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              textShadow: '0 0 60px rgba(255, 255, 255, 0.15), 0 0 120px rgba(255, 255, 255, 0.05)',
            }}
          >
            BALA MUGESH M K
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
