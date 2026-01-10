import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Achievement {
  title: string;
  event: string;
  year: string;
}

const achievements: Achievement[] = [
  {
    title: "National Finalist",
    event: "Smart India Hackathon",
    year: "2024",
  },
  {
    title: "Semi-Finalist",
    event: "VLaunchpad Startup Competition",
    year: "2024",
  },
];

const SignalLog = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center gap-6 p-6 group"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Timeline connector */}
      <motion.div
        className="absolute left-[15px] top-full w-px h-full bg-gradient-to-b from-neon-cyan/30 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Signal indicator */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          className="w-8 h-8 rounded-full bg-void border-2 border-neon-cyan/50 flex items-center justify-center"
          animate={{
            borderColor: ['hsl(var(--neon-cyan) / 0.5)', 'hsl(var(--neon-cyan))', 'hsl(var(--neon-cyan) / 0.5)'],
            boxShadow: [
              '0 0 0 0 hsl(var(--neon-cyan) / 0)',
              '0 0 20px 3px hsl(var(--neon-cyan) / 0.4)',
              '0 0 0 0 hsl(var(--neon-cyan) / 0)'
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-signal-green"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-8 p-4 border border-steel/20 rounded-sm group-hover:border-neon-cyan/30 transition-colors">
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-neon-cyan transition-colors">
            {achievement.title}
          </h3>
          <p className="font-mono text-sm text-muted-foreground mt-1">
            {achievement.event}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-hud-text">{achievement.year}</span>
          <motion.div
            className="signal-verified text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            VERIFIED
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const AchievementsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="achievements" ref={sectionRef} className="section relative py-32 px-6">
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
              System.signals
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            VERIFIED SIGNALS
          </h2>
          <p className="font-mono text-sm text-muted-foreground mt-4">
            System confirmations — minimal, unarguable
          </p>
        </motion.div>

        {/* Signal logs */}
        <div className="relative space-y-4">
          {/* Left border line */}
          <motion.div
            className="absolute left-[15px] top-0 bottom-0 w-px bg-steel/30"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1 }}
            style={{ transformOrigin: 'top' }}
          />

          {achievements.map((achievement, index) => (
            <SignalLog key={achievement.title} achievement={achievement} index={index} />
          ))}
        </div>

        {/* System status */}
        <motion.div
          className="mt-16 p-6 border border-steel/30 rounded-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-3 h-3 bg-signal-green rounded-full"
                animate={{ 
                  boxShadow: ['0 0 5px hsl(var(--signal-green))', '0 0 15px hsl(var(--signal-green))', '0 0 5px hsl(var(--signal-green))']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-sm text-hud-text uppercase tracking-wider">
                All signals nominal
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              Last sync: Real-time
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
