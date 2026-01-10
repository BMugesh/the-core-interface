import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useLineReveal } from '@/hooks/use-text-reveal';

const DataLine = ({ children, delay }: { children: string; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 py-3 border-l border-neon-cyan/20"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-neon-cyan rounded-full"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.3 }}
        style={{ boxShadow: '0 0 10px hsl(var(--neon-cyan))' }}
      />
      <p className="font-mono text-base md:text-lg text-foreground/90 leading-relaxed">
        {children}
      </p>
    </motion.div>
  );
};

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const contentRef = useRef<HTMLDivElement>(null);

  // Apply line reveal animation to data lines
  useLineReveal(contentRef);

  return (
    <section id="about" ref={sectionRef} className="section relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="w-12 h-px bg-neon-cyan"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />
            <span className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase">
              System.mind
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            THE MIND INTERFACE
          </h2>
        </motion.div>

        {/* Briefing panel */}
        <div className="relative">
          {/* Panel frame */}
          <motion.div
            className="absolute inset-0 border border-neon-cyan/10 rounded-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          />
          
          {/* Top line accent */}
          <motion.div
            className="absolute top-0 left-8 right-8 h-px"
            style={{ background: 'var(--gradient-hud-line)' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <div className="p-8 md:p-12 space-y-6">
            {/* Classification header */}
            <motion.div
              className="flex items-center justify-between pb-6 border-b border-steel/30"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-signal-green rounded-full animate-pulse" />
                <span className="font-mono text-xs text-hud-text uppercase tracking-wider">
                  Intelligence Panel Active
                </span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                REF: MIND.001
              </span>
            </motion.div>

            {/* Data lines */}
            <div className="space-y-4" ref={contentRef} data-reveal-lines>
              <DataLine delay={0.4}>
                I design systems where interface, logic, and intelligence converge.
              </DataLine>
              <DataLine delay={0.6}>
                Each project is a controlled experiment in scalability, adaptability, and thought.
              </DataLine>
              <DataLine delay={0.8}>
                Technology so advanced it appears magical. Magic so structured it feels engineered.
              </DataLine>
              <DataLine delay={1.0}>
                Building the future: systems that understand context, adapt, and evolve.
              </DataLine>
            </div>

            {/* Footer metadata */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-8 border-t border-steel/30"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground uppercase">Operator:</span>
                <span className="tech-label">Bala Mugesh M K</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground uppercase">Focus:</span>
                <span className="tech-label">AI + Full-Stack</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground uppercase">Status:</span>
                <span className="tech-label text-signal-green border-signal-green/30">Active</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
