import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingSequenceProps {
  onComplete: () => void;
}

const frames = [
  { id: 1, text: null, phase: 'void' },
  { id: 2, text: null, phase: 'reactor' },
  { id: 3, text: null, phase: 'arcane' },
  { id: 4, text: "Booting neural architecture...", phase: 'logs' },
  { id: 5, text: "Stabilizing dimensional layers...", phase: 'logs' },
  { id: 6, text: "Synchronizing logic and intelligence...", phase: 'logs' },
  { id: 7, text: "Reality alignment: stable", phase: 'calibration' },
  { id: 8, text: "Operator identified: Bala Mugesh M K", phase: 'identity' },
  { id: 9, text: "Multiversal Lab — Online.", phase: 'online' },
];

const HUDRing = ({ size, delay, reverse = false, isAmber = false }: { size: number; delay: number; reverse?: boolean; isAmber?: boolean }) => (
  <motion.div
    className={`absolute rounded-full border ${isAmber ? 'border-neon-amber/40' : 'border-neon-cyan/30'}`}
    style={{ width: size, height: size }}
    initial={{ scale: 0, opacity: 0, rotate: 0 }}
    animate={{ 
      scale: 1, 
      opacity: [0, 0.6, 0.4],
      rotate: reverse ? -360 : 360 
    }}
    transition={{ 
      scale: { duration: 1.2, delay },
      opacity: { duration: 1.5, delay },
      rotate: { duration: 20 + delay * 5, repeat: Infinity, ease: "linear" }
    }}
  >
    {[...Array(isAmber ? 12 : 8)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-${isAmber ? '0.5' : '1'} h-${isAmber ? '2' : '3'} ${isAmber ? 'bg-neon-amber/60' : 'bg-neon-cyan/50'}`}
        style={{
          left: '50%',
          top: 0,
          width: isAmber ? 2 : 4,
          height: isAmber ? 8 : 12,
          transform: `translateX(-50%) rotate(${i * (360 / (isAmber ? 12 : 8))}deg)`,
          transformOrigin: `50% ${size / 2}px`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + i * 0.03 }}
      />
    ))}
  </motion.div>
);

const ArcaneGlyph = ({ index, delay }: { index: number; delay: number }) => {
  const glyphs = ['⟁', '⟐', '⬡', '◈', '⬢', '◇'];
  const radius = 220;
  const angle = (index * 60) * (Math.PI / 180);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      className="absolute font-display text-2xl text-neon-amber/60"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
        filter: 'drop-shadow(0 0 10px hsl(var(--neon-amber) / 0.5))',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.8, 0.6],
        scale: [0, 1.2, 1],
        rotate: [0, 360]
      }}
      transition={{ 
        delay,
        duration: 1,
        rotate: { delay: delay + 0.5, duration: 30, repeat: Infinity, ease: "linear" }
      }}
    >
      {glyphs[index]}
    </motion.div>
  );
};

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
    {[...Array(80)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-0.5 h-0.5 rounded-full ${i % 3 === 0 ? 'bg-neon-amber/30' : 'bg-neon-cyan/30'}`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0, 0.6, 0],
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
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full border ${i % 2 === 0 ? 'border-neon-cyan/40' : 'border-neon-amber/40'}`}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ 
          width: [0, 700],
          height: [0, 700],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 2.5,
          delay: i * 0.25,
          ease: "easeOut",
        }}
        style={{
          boxShadow: i % 2 === 0 
            ? '0 0 30px hsl(var(--neon-cyan) / 0.3)' 
            : '0 0 30px hsl(var(--neon-amber) / 0.3)',
        }}
      />
    ))}
  </motion.div>
);

const EnergySpark = () => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-white"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: [0, 2, 1],
      opacity: [0, 1, 0.8]
    }}
    transition={{ duration: 1.2 }}
    style={{ 
      boxShadow: '0 0 20px white, 0 0 40px hsl(var(--neon-cyan)), 0 0 60px hsl(var(--neon-cyan))'
    }}
  />
);

export const LoadingSequence = ({ onComplete }: LoadingSequenceProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const timings = [600, 1000, 1200, 800, 800, 800, 1000, 1200, 1800];
    
    if (currentFrame < frames.length) {
      const timer = setTimeout(() => {
        setCurrentFrame(prev => prev + 1);
      }, timings[currentFrame]);
      
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 400);
    }
  }, [currentFrame, onComplete]);

  const frame = frames[currentFrame];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-void-deep flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ParticleField />
      
      {/* Grid overlay with warp effect */}
      <motion.div 
        className="absolute inset-0 grid-overlay opacity-20"
        animate={frame?.phase === 'calibration' ? { 
          scale: [1, 1.02, 1],
          rotate: [0, 0.5, 0]
        } : {}}
        transition={{ duration: 1.5 }}
      />
      
      {/* Central HUD container */}
      <div className="relative flex items-center justify-center">
        {/* Frame 1: Energy spark in void */}
        <AnimatePresence>
          {currentFrame >= 0 && (
            <EnergySpark />
          )}
        </AnimatePresence>

        {/* Frame 2: Arc reactor HUD rings (Iron Man style) */}
        {currentFrame >= 1 && (
          <>
            <HUDRing size={100} delay={0} />
            <HUDRing size={160} delay={0.15} reverse />
            <HUDRing size={220} delay={0.3} />
            <DataArc radius={130} startAngle={30} endAngle={150} delay={0.2} />
            <DataArc radius={130} startAngle={210} endAngle={330} delay={0.35} />
          </>
        )}

        {/* Frame 3: Arcane glyphs overlay (Doctor Strange style) */}
        {currentFrame >= 2 && (
          <>
            <HUDRing size={300} delay={0.1} isAmber reverse />
            {[...Array(6)].map((_, i) => (
              <ArcaneGlyph key={i} index={i} delay={0.2 + i * 0.1} />
            ))}
          </>
        )}

        {/* Frame 7: Dimensional calibration */}
        {currentFrame === 6 && <DimensionalRipple />}

        {/* Frame 8: Identity lock */}
        {currentFrame === 7 && (
          <motion.div
            className="absolute"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 border border-neon-amber"
                style={{
                  top: i < 2 ? -180 : 180,
                  left: i % 2 === 0 ? -180 : 180,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, rotate: 45 }}
                animate={{ scale: [0, 1.5, 1], rotate: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              />
            ))}
          </motion.div>
        )}

        {/* Text display */}
        <AnimatePresence mode="wait">
          {frame?.text && (
            <motion.div
              key={currentFrame}
              className="absolute mt-96 text-center max-w-md"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <span className={`font-mono text-sm tracking-widest ${
                currentFrame === 8 
                  ? 'text-neon-cyan text-base font-semibold' 
                  : currentFrame === 7 
                    ? 'text-neon-amber text-sm'
                    : 'text-hud-text'
              }`}>
                {frame.text}
              </span>
              {currentFrame < 8 && (
                <motion.span
                  className="inline-block w-2 h-4 bg-neon-cyan/70 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final frame: Perfect symmetry lock */}
        {currentFrame === 8 && (
          <motion.div
            className="absolute"
            initial={{ scale: 1.3, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-8 h-8 border-2 border-neon-cyan rounded-sm"
              animate={{ 
                boxShadow: ['0 0 20px hsl(var(--neon-cyan))', '0 0 40px hsl(var(--neon-cyan))', '0 0 20px hsl(var(--neon-cyan))']
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>

      {/* Corner HUD elements */}
      <div className="absolute top-8 left-8">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: currentFrame >= 1 ? 1 : 0, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-2 h-2 rounded-full"
            style={{ background: currentFrame >= 2 ? 'hsl(var(--neon-amber))' : 'hsl(var(--neon-cyan))' }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-mono text-xs text-hud-text">
            {currentFrame >= 2 ? 'DUAL.SYS' : 'CORE.INIT'}
          </span>
        </motion.div>
      </div>

      <div className="absolute top-8 right-8">
        <motion.div
          className="text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: currentFrame >= 1 ? 1 : 0, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-hud-text">v2.0.25</span>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8">
        <motion.div
          className="text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: currentFrame >= 1 ? 1 : 0, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-hud-text block">SEQUENCE {currentFrame + 1}/9</span>
          <div className="flex gap-1 mt-2 justify-end">
            {frames.map((_, i) => (
              <motion.div
                key={i}
                className={`w-4 h-1 rounded-full ${
                  i <= currentFrame 
                    ? i % 2 === 0 ? 'bg-neon-cyan' : 'bg-neon-amber/80'
                    : 'bg-steel'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: i <= currentFrame ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: currentFrame >= 3 ? 1 : 0, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-neon-amber/60 block">ARCANE.LAYER</span>
          <span className="font-mono text-[10px] text-hud-text/50">Dimensional sync active</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
