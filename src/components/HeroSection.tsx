import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { IMAXBacklightConfig } from '@/lib/imax-backlight';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Extremely slow ambient parallax (barely perceptible)
      gsap.to('.hero-layer', {
        y: (i, target) => -30 * parseFloat(target.dataset.speed || '1'),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="section relative h-screen w-full flex items-center justify-center overflow-hidden bg-void-deep"
    >
      {/* Background Layers - Subtle depth gradient */}
      <div
        className="section-parallax-layer absolute inset-0 hero-layer z-0"
        data-speed="0.2"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-void-deep via-black to-black opacity-95" />
        {/* Extremely subtle grid (≤10% opacity) */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* IMAX Backlight Layer - Soft projector-style glow */}
      <div
        className="absolute inset-0 pointer-events-none hero-layer z-5"
        data-speed="0.3"
        style={{
          background: IMAXBacklightConfig.glow,
        }}
      />

      {/* Main Content - Camera transmission metaphor */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center gap-8 hero-layer"
        data-speed="0.5"
      >
        {/* Identity label - resolves first via clarity */}
        <motion.div
          className="font-mono text-xs tracking-[0.4em] uppercase text-white/50"
          initial={{ opacity: 0.2, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 0.6, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.4, delay: 0, ease: 'easeOut' }}
        >
          SIGNAL LOCKED
        </motion.div>

        {/* Name - focus pull (clarity + contrast tighten) */}
        <div className="flex flex-col items-center gap-2">
          <motion.h1
            className="font-mono text-5xl md:text-7xl font-bold text-white tracking-wide drop-shadow-lg"
            initial={{ opacity: 0.3, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.6, delay: 0.2, ease: 'easeOut' }}
            style={{
              textShadow: '0 0 30px rgba(255, 255, 255, 0.1), 0 0 60px rgba(255, 255, 255, 0.05)',
            }}
          >
            BALA MUGESH M K
          </motion.h1>

          {/* Roles - appear as calibrated HUD readout (opacity + contrast) */}
          <motion.div
            className="font-mono text-xs md:text-sm text-white/60 tracking-widest uppercase mt-4 flex flex-col items-center gap-1"
            initial={{ opacity: 0.2, filter: 'blur(3px)' }}
            animate={isInView ? { opacity: 0.8, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }}
          >
            <div>AI Engineer · Full-Stack Developer · Python Specialist</div>
          </motion.div>
        </div>

        {/* Final line - resolves last, holds in silence */}
        <motion.div
          className="font-mono text-sm md:text-base text-white/50 text-center max-w-lg leading-relaxed mt-8"
          initial={{ opacity: 0.1, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 0.7, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.8, delay: 0.6, ease: 'easeOut' }}
        >
          Designing intelligence that moves,
          <br />
          interfaces that think.
        </motion.div>
      </div>

      {/* Minimal HUD elements - dissolve after appearance */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Top alignment line - closer to roles text */}
        <motion.div
          className="absolute w-64 h-px bg-neon-cyan/15"
          style={{ top: '50%', transformOrigin: 'center' }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.6 }}
        />

        {/* Bottom alignment line - just below roles */}
        <motion.div
          className="absolute w-64 h-px bg-neon-cyan/15"
          style={{ top: '55%', transformOrigin: 'center' }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
        />
      </div>

      {/* Minimal scroll indicator - appear after reveal completes */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ duration: 0.8, delay: 3.2 }}
      >
        <div className="font-mono text-xs text-white/50">SCROLL TO EXPLORE</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-neon-cyan/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};
