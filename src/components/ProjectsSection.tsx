import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Project {
  id: string;
  name: string;
  purpose: string;
  stack: string[];
  status: 'active' | 'prototype' | 'archived';
}

const projects: Project[] = [
  {
    id: "EXP-001",
    name: "Neural Interface Dashboard",
    purpose: "Real-time AI model monitoring and control system",
    stack: ["React", "Python", "TensorFlow", "WebSocket"],
    status: "active",
  },
  {
    id: "EXP-002",
    name: "Quantum State Manager",
    purpose: "Distributed state management with predictive caching",
    stack: ["TypeScript", "Redis", "GraphQL", "Docker"],
    status: "active",
  },
  {
    id: "EXP-003",
    name: "Cognitive Search Engine",
    purpose: "Context-aware search with natural language understanding",
    stack: ["Next.js", "OpenAI", "PostgreSQL", "Vector DB"],
    status: "prototype",
  },
  {
    id: "EXP-004",
    name: "Adaptive UI Framework",
    purpose: "Self-modifying interface based on user behavior patterns",
    stack: ["React", "ML Kit", "Framer Motion", "Analytics"],
    status: "prototype",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="float-card p-6 rounded-lg relative overflow-hidden"
        animate={{
          y: isHovered ? -5 : 0,
          rotateY: isHovered ? 2 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Holographic frame effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered 
              ? 'linear-gradient(135deg, hsl(var(--neon-cyan) / 0.1) 0%, transparent 50%, hsl(var(--neon-cyan) / 0.05) 100%)'
              : 'transparent'
          }}
        />

        {/* Scan line effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="absolute w-full h-px bg-neon-cyan/30"
            animate={{ y: isHovered ? ['0%', '500%'] : '0%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="font-mono text-xs text-muted-foreground">{project.id}</span>
            <h3 className="font-display text-xl font-semibold text-foreground mt-1">
              {project.name}
            </h3>
          </div>
          <div className={`px-2 py-1 rounded-sm text-xs font-mono uppercase ${
            project.status === 'active' 
              ? 'bg-signal-green/20 text-signal-green border border-signal-green/30' 
              : 'bg-neon-amber/20 text-neon-amber border border-neon-amber/30'
          }`}>
            {project.status}
          </div>
        </div>

        {/* Purpose */}
        <p className="font-mono text-sm text-muted-foreground mb-6 leading-relaxed">
          {project.purpose}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech, i) => (
            <motion.span
              key={tech}
              className="tech-label"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + i * 0.05 + 0.3 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Data lines decoration */}
        <motion.div
          className="flex items-center gap-2 pt-4 border-t border-steel/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          <motion.div
            className="flex-1 h-px bg-gradient-to-r from-neon-cyan/50 to-transparent"
            animate={{ 
              scaleX: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
          <span className="font-mono text-xs text-hud-text">
            {isHovered ? 'Accessing...' : 'Ready'}
          </span>
        </motion.div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-8 h-8">
          <motion.div
            className="absolute top-0 right-0 w-full h-px bg-neon-cyan/50"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.2 }}
            style={{ transformOrigin: 'right' }}
          />
          <motion.div
            className="absolute top-0 right-0 w-px h-full bg-neon-cyan/50"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.3 }}
            style={{ transformOrigin: 'top' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
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
              System.experiments
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            EXPERIMENTS & BUILDS
          </h2>
          <p className="font-mono text-sm text-muted-foreground mt-4 max-w-xl">
            Active prototypes and system builds. Each project is a living experiment.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <span className="font-mono text-xs text-muted-foreground">
            More experiments in progress...
          </span>
        </motion.div>
      </div>
    </section>
  );
};
