import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingSequenceProps {
  onComplete: () => void;
}

const frames = [
  { id: 1, text: null, showPulse: true },
  { id: 2, text: null, showRings: true },
  { id: 3, text: "Initializing core architecture..." },
  { id: 4, text: "Loading interface layers..." },
  { id: 5, text: "Synchronizing intelligence modules..." },
  { id: 6, text: "Calibrating spatial environment..." },
  { id: 7, text: "Lab online." },
];

const HUDRing = ({ size, delay, reverse = false }: { size: number; delay: number; reverse?: boolean }) => (
  <motion.div
    className="absolute rounded-full border border-neon-cyan/30"
    style={{ width: size, height: size }}
    initial={{ scale: 0, opacity: 0, rotate: 0 }}
    animate={{ 
      scale: 1, 
      opacity: [0, 0.5, 0.3],
      rotate: reverse ? -360 : 360 
    }}
    transition={{ 
      scale: { duration: 1, delay },
      opacity: { duration: 1.5, delay },
      rotate: { duration: 20 + delay * 5, repeat: Infinity, ease: "linear" }
    }}
  >
    {/* Notches */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-3 bg-neon-cyan/50"
        style={{
          left: '50%',
          top: 0,
          transform: `translateX(-50%) rotate(${i * 45}deg)`,
          transformOrigin: `50% ${size / 2}px`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + i * 0.05 }}
      />
    ))}
  </motion.div>
);

const DataArc = ({ radius, startAngle, endAngle, delay }: { radius: number; startAngle: number; endAngle: number; delay: number }) => {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const x1 = Math.cos(startRad) * radius;
  const y1 = Math.sin(startRad) * radius;
  const x2 = Math.cos(endRad) * radius;
  const y2 = Math.sin(endRad) * radius;
  
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  
  const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  
  return (
    <motion.svg
      className="absolute"
      width={radius * 2 + 20}
      height={radius * 2 + 20}
      viewBox={`${-radius - 10} ${-radius - 10} ${radius * 2 + 20} ${radius * 2 + 20}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.path
        d={d}
        fill="none"
        stroke="hsl(var(--neon-cyan))"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
        style={{ filter: "drop-shadow(0 0 8px hsl(var(--neon-cyan)))" }}
      />
    </motion.svg>
  );
};

const ParticleField = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 h-0.5 bg-neon-cyan/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0, 0.5, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

const DimensionalRipple = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-neon-amber/40"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ 
          width: [0, 600],
          height: [0, 600],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          delay: i * 0.3,
          ease: "easeOut",
        }}
        style={{
          boxShadow: '0 0 30px hsl(var(--neon-amber) / 0.3)',
        }}
      />
    ))}
  </motion.div>
);

export const LoadingSequence = ({ onComplete }: LoadingSequenceProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const timings = [800, 1200, 1000, 1000, 1000, 1200, 1500];
    
    if (currentFrame < frames.length) {
      const timer = setTimeout(() => {
        setCurrentFrame(prev => prev + 1);
      }, timings[currentFrame]);
      
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [currentFrame, onComplete]);

  const frame = frames[currentFrame];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-void-deep flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ParticleField />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      {/* Central HUD container */}
      <div className="relative flex items-center justify-center">
        {/* Frame 1: Initial pulse */}
        <AnimatePresence>
          {currentFrame >= 0 && (
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-neon-cyan"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0.8]
              }}
              transition={{ duration: 0.8 }}
              style={{ boxShadow: '0 0 40px hsl(var(--neon-cyan))' }}
            />
          )}
        </AnimatePresence>

        {/* Frame 2+: HUD Rings */}
        {currentFrame >= 1 && (
          <>
            <HUDRing size={120} delay={0} />
            <HUDRing size={200} delay={0.2} reverse />
            <HUDRing size={280} delay={0.4} />
            <DataArc radius={160} startAngle={45} endAngle={135} delay={0.3} />
            <DataArc radius={160} startAngle={225} endAngle={315} delay={0.5} />
          </>
        )}

        {/* Frame 6: Dimensional ripple */}
        {currentFrame === 5 && <DimensionalRipple />}

        {/* Text display */}
        <AnimatePresence mode="wait">
          {frame?.text && (
            <motion.div
              key={currentFrame}
              className="absolute mt-80 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <span className={`font-mono text-sm tracking-widest ${
                currentFrame === 6 ? 'text-neon-cyan text-lg font-semibold' : 'text-hud-text'
              }`}>
                {frame.text}
              </span>
              {currentFrame < 6 && (
                <motion.span
                  className="inline-block w-2 h-4 bg-neon-cyan/70 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final frame: Lock animation */}
        {currentFrame === 6 && (
          <motion.div
            className="absolute"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-neon-cyan"
                style={{
                  top: i < 2 ? -150 : 150,
                  left: i % 2 === 0 ? -150 : 150,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Corner HUD elements */}
      <div className="absolute top-8 left-8">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: currentFrame >= 2 ? 1 : 0, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
          <span className="font-mono text-xs text-hud-text">SYS.INIT</span>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8">
        <motion.div
          className="text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: currentFrame >= 2 ? 1 : 0, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-hud-text block">SEQUENCE {currentFrame + 1}/7</span>
          <div className="flex gap-1 mt-2 justify-end">
            {frames.map((_, i) => (
              <motion.div
                key={i}
                className={`w-6 h-1 rounded-full ${
                  i <= currentFrame ? 'bg-neon-cyan' : 'bg-steel'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: i <= currentFrame ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
