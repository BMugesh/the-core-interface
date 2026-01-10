'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface LoadingSequenceProps {
  onComplete: () => void;
}

// HUD Corner Bracket Component
const CornerBracket = ({ 
  position, 
  delay, 
  isActive 
}: { 
  position: 'tl' | 'tr' | 'bl' | 'br'; 
  delay: number;
  isActive: boolean;
}) => {
  const positions = {
    tl: 'top-6 left-6',
    tr: 'top-6 right-6',
    bl: 'bottom-6 left-6',
    br: 'bottom-6 right-6',
  };

  return (
    <motion.div
      className={`absolute w-8 h-8 border-2 ${positions[position]} pointer-events-none`}
      style={{
        borderTop: isActive ? '2px solid hsl(var(--neon-cyan))' : '2px solid hsl(var(--neon-cyan) / 0.2)',
        borderLeft: isActive ? '2px solid hsl(var(--neon-cyan))' : '2px solid hsl(var(--neon-cyan) / 0.2)',
        borderRight: 'none',
        borderBottom: 'none',
        boxShadow: isActive ? '0 0 15px hsl(var(--neon-cyan) / 0.6), inset 0 0 15px hsl(var(--neon-cyan) / 0.2)' : 'none',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay }}
    />
  );
};

// Subtle Star Noise Background
const StarNoise = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.08 }}
      transition={{ duration: 1 }}
    >
      {[...Array(200)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${0.5 + Math.random() * 1}px`,
            height: `${0.5 + Math.random() * 1}px`,
            opacity: Math.random() * 0.6,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
};

// HUD Grid Background
const HUDGrid = ({ isActive }: { isActive: boolean }) => {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 0.04 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--neon-cyan))" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </motion.svg>
  );
};

// Dimensional Distortion (Very Subtle)
const DimensionalDistortion = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.02, 0.05, 0.02],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, hsl(var(--neon-cyan) / 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }}
    />
  );
};

// Floating Data Line
const FloatingDataLine = ({ 
  text, 
  delay, 
  isActive,
  isAmber = false 
}: { 
  text: string;
  delay: number;
  isActive: boolean;
  isAmber?: boolean;
}) => {
  return (
    <motion.div
      className="font-mono text-xs tracking-widest"
      initial={{ opacity: 0, x: -10, y: -20 }}
      animate={isActive ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay }}
      style={{
        color: isAmber ? 'hsl(var(--neon-amber))' : 'hsl(var(--neon-cyan))',
      }}
    >
      {text}
      <motion.span
        className="inline-block w-1 h-3 ml-1"
        style={{
          background: isAmber ? 'hsl(var(--neon-amber))' : 'hsl(var(--neon-cyan))',
          display: isActive ? 'inline-block' : 'none',
        }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    </motion.div>
  );
};

export const LoadingSequence = ({ onComplete }: LoadingSequenceProps) => {
  const [phase, setPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Create GSAP timeline for orchestration
    const timeline = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // PHASE 1: VOID (0.5s)
    timeline.to({}, { duration: 0.5 }, 0);
    timeline.call(() => setPhase(1), [], 0);

    // PHASE 2: HUD MATERIALIZATION (1.2s)
    timeline.to({}, { duration: 1.2 }, 0.5);
    timeline.call(() => setPhase(2), [], 0.5);

    // PHASE 3: SYSTEM DIAGNOSTICS (1.5s)
    timeline.to({}, { duration: 1.5 }, 1.7);
    timeline.call(() => setPhase(3), [], 1.7);

    // PHASE 4: IDENTITY BINDING (1s)
    timeline.to({}, { duration: 1 }, 3.2);
    timeline.call(() => setPhase(4), [], 3.2);

    // PHASE 5: FINAL LOCK (0.8s)
    timeline.to({}, { duration: 0.8 }, 4.2);
    timeline.call(() => setPhase(5), [], 4.2);

    // PHASE 6: TRANSITION (Fade out starts at 5s, completes by 5.6s)
    timeline.to({}, { duration: 0.6 }, 5);
    timeline.call(() => setPhase(6), [], 5);

    timelineRef.current = timeline;

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-void-deep overflow-hidden flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0 }}
    >
      {/* Background layers */}
      <StarNoise />
      <HUDGrid isActive={phase >= 1} />
      <DimensionalDistortion />

      {/* Main container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* PHASE 1: Single alignment dot in void */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="absolute"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'hsl(var(--neon-cyan))',
                  boxShadow: '0 0 20px hsl(var(--neon-cyan))',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 2: HUD frames materialize */}
        {phase >= 2 && (
          <>
            {/* Corner brackets */}
            {(['tl', 'tr', 'bl', 'br'] as const).map((pos, i) => (
              <CornerBracket key={pos} position={pos} delay={i * 0.1} isActive={true} />
            ))}
          </>
        )}

        {/* PHASE 3: System diagnostics lines */}
        {phase >= 3 && (
          <motion.div
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FloatingDataLine
              text="SYS://NEURAL_MODULES — synchronized"
              delay={0.1}
              isActive={true}
              isAmber={false}
            />
            <FloatingDataLine
              text="SYS://LOGIC_CORE — stable"
              delay={0.2}
              isActive={true}
              isAmber={false}
            />
            <FloatingDataLine
              text="SYS://DIMENSIONAL_LAYERS — aligned"
              delay={0.3}
              isActive={true}
              isAmber={false}
            />
          </motion.div>
        )}

        {/* PHASE 4: Identity binding */}
        {phase >= 4 && (
          <motion.div
            className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 space-y-2 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FloatingDataLine
              text="OPERATOR: Bala Mugesh M K"
              delay={0}
              isActive={true}
              isAmber={true}
            />
            <FloatingDataLine
              text="STATUS: Authorized"
              delay={0.15}
              isActive={true}
              isAmber={true}
            />
          </motion.div>
        )}

        {/* PHASE 5: Final lock */}
        {phase >= 5 && (
          <motion.div
            className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="font-display text-3xl font-bold tracking-wider"
              style={{ color: 'hsl(var(--neon-cyan))' }}
              animate={{
                textShadow: [
                  '0 0 20px hsl(var(--neon-cyan) / 0.4)',
                  '0 0 40px hsl(var(--neon-cyan) / 0.8)',
                  '0 0 20px hsl(var(--neon-cyan) / 0.4)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              SYSTEM READY
            </motion.div>
            <motion.p
              className="font-mono text-xs tracking-widest"
              style={{ color: 'hsl(var(--neon-cyan) / 0.7)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Entering lab interface…
            </motion.p>
          </motion.div>
        )}

        {/* Status indicators (persistent) */}
        {phase >= 1 && (
          <>
            {/* Top-left label */}
            <motion.div
              className="absolute top-12 left-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="font-mono text-xs tracking-widest" style={{ color: 'hsl(var(--neon-cyan) / 0.6)' }}>
                SYS://BOOT_SEQUENCE_INIT
              </p>
            </motion.div>

            {/* Top-right version */}
            <motion.div
              className="absolute top-12 right-12"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="font-mono text-xs text-right" style={{ color: 'hsl(var(--neon-cyan) / 0.5)' }}>
                v2.0.25
              </p>
            </motion.div>

            {/* Bottom-right phase indicator */}
            <motion.div
              className="absolute bottom-12 right-12"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-right space-y-2">
                <p className="font-mono text-xs" style={{ color: 'hsl(var(--neon-cyan) / 0.6)' }}>
                  PHASE {phase}/6
                </p>
                {/* Phase progress dots */}
                <div className="flex gap-1.5 justify-end">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background:
                          i < phase
                            ? i % 2 === 0
                              ? 'hsl(var(--neon-cyan))'
                              : 'hsl(var(--neon-amber))'
                            : 'hsl(var(--steel) / 0.3)',
                      }}
                      animate={i < phase ? { opacity: [0.5, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Overlay fade for transition */}
      {phase >= 6 && (
        <motion.div
          className="absolute inset-0 bg-void-deep"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
};
