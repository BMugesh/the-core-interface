import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useVisitedSections } from '../hooks/useVisitedSections';

import { IntelligentText } from './IntelligentText';

// Scan-line text reveal for classified data
const ClassifiedDataLine = ({ 
  children, 
  delay, 
  isFirstVisit 
}: { 
  children: string; 
  delay: number;
  isFirstVisit: boolean;
}) => {
  return (
    <div className="pl-8 py-3 border-l border-neon-cyan/20 overflow-hidden relative">
      <IntelligentText 
        type="body"
        hasVisited={!isFirstVisit}
        delay={delay}
        className="font-mono text-sm md:text-base text-gray-400 leading-relaxed tracking-wide"
      >
        {children}
      </IntelligentText>
    </div>
  );
};

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const { hasVisited, markSectionVisited } = useVisitedSections();
  const isFirstVisit = !hasVisited('about');

  // Mark section as visited
  useEffect(() => {
    if (isInView) {
      markSectionVisited('about');
    }
  }, [isInView, markSectionVisited]);

  // Camera Push Effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.camera-target', {
        scale: 1.05,
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        ease: 'none'
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden">
      
      {/* Contextual HUD */}
      <ContextualHUD 
        title="NEURAL_ARCH" 
        code="SYS.01" 
        alignment="left" 
        className="hidden md:block"
      />

      <div className="camera-target max-w-4xl mx-auto relative z-10" data-parallax-speed="0.8">
        {/* Section header */}
        <div className="mb-16 pl-8">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="w-12 h-px bg-neon-cyan"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: isFirstVisit ? 0.2 : 0 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            <IntelligentText 
              type="heading"
              hasVisited={!isFirstVisit}
              delay={0.4}
            >
              INTELLIGENCE BRIEFING
            </IntelligentText>
          </h2>
        </div>

        {/* Briefing panel */}
        <div className="relative">
          {/* Panel frame */}
          <motion.div
            className="absolute inset-0 border border-neon-cyan/10 rounded-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          />
        
          <div className="p-8 md:p-12 space-y-6">
            {/* Classification header */}
            <motion.div
              className="flex items-center justify-between pb-6 border-b border-steel/30"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: isFirstVisit ? 0.2 : 0 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-2 h-2 bg-signal-green rounded-full"
                  animate={{ 
                    boxShadow: [
                      '0 0 5px hsl(var(--signal-green))',
                      '0 0 15px hsl(var(--signal-green))',
                      '0 0 5px hsl(var(--signal-green))'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-xs text-hud-text uppercase tracking-wider">
                  Decryption: Complete · Access: Granted
                </span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                REF: BMK-CORE-001
              </span>
            </motion.div>

            {/* Classified data streams */}
            <div className="space-y-4">
              <ClassifiedDataLine delay={0.4} isFirstVisit={isFirstVisit}>
                I design systems where interface, logic, and intelligence converge.
              </ClassifiedDataLine>
              <ClassifiedDataLine delay={0.7} isFirstVisit={isFirstVisit}>
                Each project is a controlled experiment in scalability, adaptability, and thought.
              </ClassifiedDataLine>
              <ClassifiedDataLine delay={1.0} isFirstVisit={isFirstVisit}>
                Technology so advanced it appears magical. Magic so structured it feels engineered.
              </ClassifiedDataLine>
              <ClassifiedDataLine delay={1.3} isFirstVisit={isFirstVisit}>
                Building the future: systems that understand context, adapt, and evolve.
              </ClassifiedDataLine>
            </div>

            {/* System metadata - terminal style */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-8 border-t border-steel/30"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: isFirstVisit ? 1.6 : 0 }}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground uppercase">ID:</span>
                <span className="tech-label">Bala Mugesh M K</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground uppercase">Domain:</span>
                <span className="tech-label">AI · Full-Stack · Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground uppercase">Clearance:</span>
                <span className="tech-label text-signal-green border-signal-green/30">Level-5</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    
      {/* Background Decoration */}
      <div className="section-parallax-layer absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none" data-parallax-speed="0.2">
         <div className="w-[500px] h-[500px] border border-white rounded-full flex items-center justify-center">
            <div className="w-[300px] h-[300px] border border-white rounded-full" />
         </div>
      </div>
    </section>
  );
};
