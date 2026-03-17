import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

import { useVisitedSections } from '../hooks/useVisitedSections';
import { FocusReveal } from './FocusReveal';
import { IntelligentText } from './IntelligentText';
interface Achievement {
  title: string;
  event: string;
  year: string;
  code: string;
}

const achievements: Achievement[] = [
  {
    title: "National Finalist",
    event: "Smart India Hackathon",
    year: "2024",
    code: "LOG.01"
  },
  {
    title: "Semi-Finalist",
    event: "VLaunchpad Startup Competition",
    year: "2024",
    code: "LOG.02"
  },
];

const SignalLog = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center gap-6 p-6 group"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Timeline connector */}
      <motion.div
        className="absolute left-[23px] top-full w-px h-full bg-white/5 group-hover:bg-neon-cyan/20 transition-colors"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Signal indicator */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-void border border-white/20 flex items-center justify-center group-hover:border-neon-cyan/80 transition-colors duration-500">
           <div className={`w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon-cyan transition-colors duration-500 ${isInView ? 'animate-pulse' : ''}`} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-8 p-5 border-l border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
             <span className="font-mono text-[10px] text-gray-500 tracking-widest">{achievement.code}</span>
             <span className="font-mono text-[10px] text-neon-cyan/60">{achievement.year}</span>
          </div>
          <div className="mb-1">
            <FocusReveal 
              text={achievement.title} 
              className="font-display text-lg font-bold text-white group-hover:text-neon-cyan transition-colors"
              delay={index * 0.2 + 0.3}
              blurStrength={6}
            />
          </div>
          <div className="mt-1">
            <FocusReveal 
              text={achievement.event}
              className="font-sans text-sm text-gray-400"
              delay={index * 0.2 + 0.5}
              blurStrength={4}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div
            className="flex items-center gap-2 px-2 py-1 bg-signal-green/10 border border-signal-green/20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            <span className="w-1 h-1 bg-signal-green rounded-full" />
            <span className="font-mono text-[10px] text-signal-green tracking-wider">VERIFIED</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const AchievementsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const { hasVisited, markSectionVisited } = useVisitedSections();
  const isFirstVisit = !hasVisited('achievements');

  useEffect(() => {
    if (isInView) {
      markSectionVisited('achievements');
    }
  }, [isInView, markSectionVisited]);

  return (
    <section id="achievements" ref={sectionRef} className="section relative min-h-[60vh] flex items-center py-32 px-6">

      <div className="max-w-4xl mx-auto w-full relative z-10">
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
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            <IntelligentText 
              type="heading"
              hasVisited={!isFirstVisit}
              delay={0.4}
            >
              SIGNAL RECOGNITION
            </IntelligentText>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {achievements.map((achievement, index) => (
            <SignalLog key={index} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};