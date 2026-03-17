import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useVisitedSections } from '../hooks/useVisitedSections';

import { FocusReveal } from './FocusReveal';
import { IntelligentText } from './IntelligentText';

interface RoleModule {
  name: string;
  description: string;
  capabilities: string[];
  color: 'cyan' | 'amber';
  code: string;
}

const roles: RoleModule[] = [
  {
    name: "AI Engineer",
    description: "Intelligence, prediction, learning systems",
    capabilities: ["TensorFlow", "PyTorch", "LLMs", "Computer Vision", "NLP"],
    color: "cyan",
    code: "MOD.AI"
  },
  {
    name: "Frontend Developer",
    description: "Experience engineering, motion control",
    capabilities: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    color: "amber",
    code: "MOD.UI"
  },
  {
    name: "Backend Developer",
    description: "Logic, APIs, data flow",
    capabilities: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
    color: "cyan",
    code: "MOD.SYS"
  },
  {
    name: "Python Developer",
    description: "Systems, automation, computation",
    capabilities: ["FastAPI", "Django", "Celery", "Pandas", "Scripting"],
    color: "amber",
    code: "MOD.PY"
  },
];

// Module HUD Panel - System Diagnostics Style
const RoleModulePanel = ({
  role,
  index,
  isInView,
}: {
  role: RoleModule;
  index: number;
  isInView: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative w-full"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {/* HUD Frame */}
      <div className="relative border-l-2 border-white/10 pl-6 py-2 group hover:border-neon-cyan/50 transition-colors duration-500">

        {/* Active Marker */}
        <div className="absolute left-[-2.5px] top-0 h-0 w-[3px] bg-neon-cyan group-hover:h-full transition-all duration-500 ease-in-out" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[10px] text-neon-cyan/60 tracking-widest">{role.code}</span>
          <div className="h-px w-8 bg-white/10 group-hover:bg-neon-cyan/30 transition-colors" />
        </div>

        {/* Title */}
        <div className="mb-2">
          <FocusReveal
            text={role.name}
            className="font-display text-2xl text-white font-bold group-hover:text-neon-cyan transition-colors"
            delay={index * 0.15 + 0.2}
            blurStrength={8}
          />
        </div>

        {/* Description */}
        <div className="mb-4 max-w-md">
          <FocusReveal
            text={role.description}
            className="font-sans text-sm text-gray-400"
            delay={index * 0.15 + 0.4}
            blurStrength={4}
          />
        </div>

        {/* Capabilities - Data Stream Style */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {role.capabilities.map((cap, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span className="font-mono text-[11px] text-gray-500 uppercase tracking-wide group-hover:text-gray-300 transition-colors">
                {cap}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const { hasVisited, markSectionVisited } = useVisitedSections();
  const isFirstVisit = !hasVisited('skills');

  useEffect(() => {
    if (isInView) {
      markSectionVisited('skills');
    }
  }, [isInView, markSectionVisited]);

  return (
    <section id="skills" ref={sectionRef} className="section relative min-h-screen py-32 px-6 flex items-center">

      <div className="max-w-5xl mx-auto w-full relative z-10">
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
              SYSTEM MODULES
            </IntelligentText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {roles.map((role, index) => (
            <RoleModulePanel
              key={index}
              role={role}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Background Grid Accent */}
      <div className="section-parallax-layer absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
    </section>
  );
};