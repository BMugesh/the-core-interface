import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ContextualHUD } from './ContextualHUD';
import { useVisitedSections } from '../hooks/useVisitedSections';
import { FocusReveal } from './FocusReveal';
import { IntelligentText } from './IntelligentText';

interface Project {
  id: string;
  name: string;
  purpose: string;
  stack: string[];
  status: 'active' | 'prototype' | 'research';
}

const projects: Project[] = [
  {
    id: "EXP-001",
    name: "StockGenie",
    purpose: "Hybrid AI system for time-series market prediction and future decision intelligence",
    stack: ["Python", "TensorFlow", "React", "FastAPI"],
    status: "active",
  },
  {
    id: "EXP-002",
    name: "EduPredict",
    purpose: "AI-based student performance forecasting system focused on early risk detection",
    stack: ["Python", "Scikit-learn", "FastAPI", "React"],
    status: "active",
  },
  {
    id: "EXP-003",
    name: "PowerCast",
    purpose: "Deep-learning-driven energy load forecasting system",
    stack: ["Python", "PyTorch", "TimeSeries", "Visualization"],
    status: "prototype",
  },
  {
    id: "EXP-004",
    name: "AI Study Companion",
    purpose: "Full-stack AI-powered learning assistant platform",
    stack: ["React", "Node.js", "OpenAI", "MongoDB"],
    status: "research",
  },
];

// Floating containment module for experiments
const ExperimentModule = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });

  useEffect(() => {
    if (!ref.current || !isInView) return;

    const ctx = gsap.context(() => {
      // Gentle floating motion - less floaty, more "hovering"
      gsap.to(ref.current, {
        y: -10,
        duration: 4 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      });
    }, ref);

    return () => ctx.revert();
  }, [isInView, index]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-signal-green';
      case 'prototype': return 'text-neon-amber';
      case 'research': return 'text-neon-cyan';
      default: return 'text-gray-500';
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      data-parallax-speed={0.1 + (index * 0.05)}
    >
      {/* Containment Frame */}
      <div className="relative p-6 bg-void-deep/80 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 group-hover:border-neon-cyan/30">

        {/* Hover Highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Technical Header */}
        <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-2">
          <span className="font-mono text-[10px] text-white/40 tracking-widest">{project.id}</span>
          <span className={`font-mono text-[10px] tracking-widest uppercase ${getStatusColor(project.status)}`}>
            [{project.status}]
          </span>
        </div>

        {/* Project Title */}
        <div className="mb-2">
          <FocusReveal
            text={project.name}
            className="font-display text-xl text-white font-bold group-hover:text-neon-cyan transition-colors"
            delay={index * 0.1 + 0.2}
            blurStrength={8}
          />
        </div>

        {/* Purpose */}
        <div className="mb-6">
          <FocusReveal
            text={project.purpose}
            className="font-sans text-sm text-gray-400 leading-relaxed"
            delay={index * 0.1 + 0.4}
            blurStrength={4}
          />
        </div>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map(tech => (
            <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
              {tech}
            </span>
          ))}
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-neon-cyan transition-colors" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-neon-cyan transition-colors" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-neon-cyan transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-neon-cyan transition-colors" />
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const { hasVisited, markSectionVisited } = useVisitedSections();
  const isFirstVisit = !hasVisited('projects');

  useEffect(() => {
    if (isInView) {
      markSectionVisited('projects');
    }
  }, [isInView, markSectionVisited]);

  return (
    <section id="projects" ref={sectionRef} className="section relative min-h-screen py-32 px-6">
      <ContextualHUD
        title="PROTOCOLS"
        code="SYS.03"
        alignment="right"
        className="hidden md:block"
      />

      <div className="max-w-6xl mx-auto relative z-10">
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
              ENGINEERED SYSTEMS
            </IntelligentText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ExperimentModule key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Background Parallax Layer */}
      <div className="section-parallax-layer absolute inset-0 pointer-events-none opacity-[0.02]"
        data-parallax-speed="0.2"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />
    </section>
  );
};