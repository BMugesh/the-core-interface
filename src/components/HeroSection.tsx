import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useVisitedSections } from '../hooks/useVisitedSections';
const HUDCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const isTop = position.includes('t');
  const isLeft = position.includes('l');
  const cornerSize = 32;
  
  return (
    <motion.div
      className={`absolute pointer-events-none`}
      style={{
        top: isTop ? 0 : 'auto',
        bottom: !isTop ? 0 : 'auto',
        left: isLeft ? 0 : 'auto',
        right: !isLeft ? 0 : 'auto',
        width: cornerSize,
        height: cornerSize,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Horizontal line */}
      <div
        className="absolute h-px bg-neon-cyan/70"
        style={{
          top: isTop ? 0 : 'auto',
          bottom: !isTop ? 0 : 'auto',
          left: isLeft ? 0 : 'auto',
          right: !isLeft ? 0 : 'auto',
          width: cornerSize,
          boxShadow: '0 0 10px hsl(var(--neon-cyan) / 0.5)'
        }}
      />
      {/* Vertical line */}
      <div
        className="absolute w-px bg-neon-cyan/70"
        style={{
          top: isTop ? 0 : 'auto',
          bottom: !isTop ? 0 : 'auto',
          left: isLeft ? 0 : 'auto',
          right: !isLeft ? 0 : 'auto',
          height: cornerSize,
          boxShadow: '0 0 10px hsl(var(--neon-cyan) / 0.5)'
        }}
      />
    </motion.div>
  );
};

// Scanning line text reveal
const TextRevealScanning = ({ text, delay }: { text: string; delay: number }) => {
  return (
    <span className="relative inline-block">
      <div className="relative overflow-hidden">
        {/* Scanning line effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 0.6, delay, ease: "easeInOut" }}
        />
        
        {/* Characters stabilize one by one */}
        <motion.div className="relative">
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, color: 'hsl(var(--neon-cyan) / 0.3)' }}
              animate={{ opacity: 1, color: 'currentColor' }}
              transition={{
                duration: 0.05,
                delay: delay + (i * 0.02),
              }}
              className="inline-block"
              style={{
                textShadow: '0 0 8px hsl(var(--neon-cyan) / 0.3)'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </span>
  );
};

// Grid background with subtle animation
const HUDGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.to(gridRef.current, {
      backgroundPosition: ['0 0', '20px 20px'],
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
  }, []);

  return (
    <motion.div
      ref={gridRef}
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, hsl(var(--neon-cyan) / 0.3) 25%, hsl(var(--neon-cyan) / 0.3) 26%, transparent 27%, transparent 74%, hsl(var(--neon-cyan) / 0.3) 75%, hsl(var(--neon-cyan) / 0.3) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, hsl(var(--neon-cyan) / 0.3) 25%, hsl(var(--neon-cyan) / 0.3) 26%, transparent 27%, transparent 74%, hsl(var(--neon-cyan) / 0.3) 75%, hsl(var(--neon-cyan) / 0.3) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '20px 20px',
      }}
    />
  );
};

// Floating data points - Optimized for performance
const DataPoint = ({ delay, x, y, isReduced }: { delay: number; x: number; y: number; isReduced?: boolean }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-neon-cyan"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      boxShadow: isReduced ? 'none' : '0 0 8px hsl(var(--neon-cyan) / 0.6)',
      willChange: 'transform, opacity',
    }}
    animate={{
      opacity: [0.3, 1, 0.3],
      scale: isReduced ? 1 : [0.8, 1.2, 0.8]
    }}
    transition={{
      duration: isReduced ? 2 : (3 + Math.random() * 2),
      delay,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  />
);

// Subtle dimensional distortion background
const DimensionalFog = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `
        radial-gradient(ellipse at 20% 50%, hsl(var(--neon-amber) / 0.03) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, hsl(var(--neon-cyan) / 0.02) 0%, transparent 50%)
      `
    }}
    animate={{
      opacity: [0.4, 0.6, 0.4]
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  />
);

export const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHighEnd, setIsHighEnd] = useState(() => {
    if (typeof window === 'undefined') return true;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const deviceMemory = (navigator as any).deviceMemory || 8;
    return !prefersReduced && deviceMemory > 4;
  });

  const { hasVisited, markSectionVisited } = useVisitedSections();
  const sectionVisited = hasVisited('hero');

  // Mark section as visited on mount
  useEffect(() => {
    markSectionVisited('hero');
  }, [markSectionVisited]);

  // Camera drift effect via GSAP - Only on high-end devices
  useEffect(() => {
    if (!sectionRef.current || !isHighEnd) return;

    const parallaxElements = sectionRef.current.querySelectorAll('[data-parallax]');
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 20 - 10;
      const y = (e.clientY / window.innerHeight) * 20 - 10;

      parallaxElements.forEach((el) => {
        gsap.to(el, {
          x: x * 0.5,
          y: y * 0.5,
          duration: 0.5,
          overwrite: 'auto'
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHighEnd]);

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="section relative min-h-screen w-full overflow-hidden bg-void-deep"
      data-parallax-speed="0.3"
    >
      {/* Infinite dark tech space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-void-deep to-slate-900" />
      
      {/* Subtle Doctor Strange dimensional distortion */}
      <DimensionalFog />

      {/* HUD Grid background */}
      <HUDGrid />

      {/* Floating data points */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: isHighEnd ? 12 : 6 }).map((_, i) => (
          <DataPoint
            key={i}
            delay={i * 0.3}
            x={Math.random() * 100}
            y={Math.random() * 100}
            isReduced={!isHighEnd}
          />
        ))}
      </div>

      {/* HUD Frame - Full viewport */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer frame borders */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-cyan/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-cyan/40 to-transparent" />

        {/* Corner brackets */}
        <HUDCorner position="tl" />
        <HUDCorner position="tr" />
        <HUDCorner position="bl" />
        <HUDCorner position="br" />

        {/* Alignment markers - subtle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-px h-20 bg-neon-cyan/30" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          <div className="w-20 h-px bg-neon-cyan/30" />
        </motion.div>
      </motion.div>

      {/* Main HUD Content - Centered Interface */}
      <div className="relative z-10 h-screen w-full flex flex-col items-center justify-center px-6">
        <div className="max-w-5xl w-full">
          {/* SYSTEM HEADER - Online indicator */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <motion.div
                className="w-2 h-2 rounded-full bg-neon-cyan"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ boxShadow: '0 0 12px hsl(var(--neon-cyan))' }}
              />
              <span className="font-mono text-xs text-neon-cyan/80 tracking-[0.3em] uppercase">
                SYSTEM INITIALIZATION COMPLETE
              </span>
              <motion.div
                className="w-2 h-2 rounded-full bg-neon-amber"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                style={{ boxShadow: '0 0 12px hsl(var(--neon-amber))' }}
              />
            </div>
          </motion.div>

          {/* MAIN HEADLINE - System output text - Adaptive animation */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={!sectionVisited ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: sectionVisited ? 0 : 0.6 }}
          >
            <h1 className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold text-neon-cyan leading-tight tracking-tighter">
              {!sectionVisited ? (
                // First visit: Full scan reveal
                <TextRevealScanning text="I BUILD SYSTEMS THAT THINK." delay={0.8} />
              ) : (
                // Revisit: Subtle brightness recognition
                <motion.div
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(76, 175, 255, 0)',
                      '0 0 25px rgba(76, 175, 255, 0.4)',
                      '0 0 10px rgba(76, 175, 255, 0)',
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: 1,
                    ease: 'easeInOut',
                  }}
                >
                  I BUILD SYSTEMS THAT THINK.
                </motion.div>
              )}
            </h1>
          </motion.div>

          {/* SYSTEM DESCRIPTION - Log entry style - Adaptive */}
          <motion.div
            className="space-y-6 mb-16 text-center"
            initial={{ opacity: 0 }}
            animate={!sectionVisited ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: sectionVisited ? 0 : 1.4 }}
          >
            <p className="font-mono text-lg text-neon-cyan/70">
              {!sectionVisited ? (
                // First visit: Scan reveal
                <TextRevealScanning text="Engineering intelligence across dimensions." delay={1.6} />
              ) : (
                // Revisit: Static instant
                <motion.span
                  animate={{ opacity: [1, 1.02, 1] }}
                  transition={{ duration: 0.6, repeat: 1, ease: 'easeInOut' }}
                >
                  Engineering intelligence across dimensions.
                </motion.span>
              )}
            </p>

            {/* System specs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-neon-cyan/40" />
                <span className="font-mono text-xs text-neon-cyan/60 tracking-[0.2em] uppercase">
                  AI · FRONTEND · BACKEND · PYTHON SYSTEMS
                </span>
                <span className="w-8 h-px bg-neon-cyan/40" />
              </div>
            </motion.div>
          </motion.div>

          {/* IDENTITY PANEL - Bottom left readout */}
          <motion.div
            className="mb-20 text-left md:absolute md:bottom-20 md:left-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            <div className="inline-block border border-neon-cyan/40 px-6 py-4 bg-neon-cyan/[0.02] backdrop-blur-sm">
              <p className="font-mono text-xs text-neon-cyan/60 mb-2 tracking-widest">
                — OPERATOR IDENTIFICATION —
              </p>
              <p className="font-mono text-sm font-bold text-neon-cyan mb-1">
                BALA MUGESH M K
              </p>
              <p className="font-mono text-xs text-neon-cyan/50">
                AI Engineer · Full-Stack System Architect
              </p>
            </div>
          </motion.div>

          {/* CTA CONTROLS - Console commands */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12 md:absolute md:bottom-20 md:right-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.8 }}
          >
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group px-6 py-3 border border-neon-cyan/70 bg-transparent text-neon-cyan font-mono text-xs font-bold tracking-wider uppercase overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: '0 0 20px hsl(var(--neon-cyan) / 0.8), inset 0 0 20px hsl(var(--neon-cyan) / 0.1)',
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: '0 0 8px hsl(var(--neon-cyan) / 0.3)',
                  duration: 0.3
                });
              }}
              style={{
                boxShadow: '0 0 8px hsl(var(--neon-cyan) / 0.3)'
              }}
            >
              <span className="relative z-10">→ ENTER LAB</span>
              {/* Energy trace effect */}
              <motion.div
                className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/5"
                initial={false}
              />
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group px-6 py-3 border border-neon-amber/70 bg-transparent text-neon-amber font-mono text-xs font-bold tracking-wider uppercase overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: '0 0 20px hsl(var(--neon-amber) / 0.8), inset 0 0 20px hsl(var(--neon-amber) / 0.1)',
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: '0 0 8px hsl(var(--neon-amber) / 0.3)',
                  duration: 0.3
                });
              }}
              style={{
                boxShadow: '0 0 8px hsl(var(--neon-amber) / 0.3)'
              }}
            >
              <span className="relative z-10">◈ SYSTEMS</span>
              {/* Energy trace effect */}
              <motion.div
                className="absolute inset-0 bg-neon-amber/0 group-hover:bg-neon-amber/5"
                initial={false}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR - Bottom center */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.0 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-neon-cyan/60 tracking-[0.2em] uppercase">Scroll Interface</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-neon-cyan/60 to-transparent"
            animate={{ opacity: [0.5, 1, 0.5], height: [40, 50, 40] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
