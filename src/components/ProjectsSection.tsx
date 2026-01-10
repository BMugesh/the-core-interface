import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

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
    purpose: "Predictive Intelligence System for stock market analysis with ML-driven insights",
    stack: ["Python", "TensorFlow", "React", "FastAPI"],
    status: "active",
  },
  {
    id: "EXP-002",
    name: "PitchOS",
    purpose: "AI Evaluation Engine for startup pitch analysis and scoring",
    stack: ["Next.js", "OpenAI", "PostgreSQL", "Python"],
    status: "active",
  },
  {
    id: "EXP-003",
    name: "R.I.O.",
    purpose: "AI Operating System Concept — intelligent assistant framework",
    stack: ["Python", "LangChain", "React", "WebSocket"],
    status: "prototype",
  },
  {
    id: "EXP-004",
    name: "Realm Theory",
    purpose: "Intelligence × Physics Research — exploring computational boundaries",
    stack: ["Python", "NumPy", "Visualization", "Research"],
    status: "research",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'signal-green';
      case 'prototype': return 'neon-amber';
      case 'research': return 'neon-cyan';
      default: return 'steel';
    }
  };

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
          y: isHovered ? -8 : 0,
          rotateY: isHovered ? 2 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Holographic containment field effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered 
              ? 'linear-gradient(135deg, hsl(var(--neon-cyan) / 0.1) 0%, transparent 50%, hsl(var(--neon-cyan) / 0.05) 100%)'
              : 'transparent'
          }}
        />

        {/* Energy pulse on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="absolute inset-0 border border-neon-cyan/30 rounded-lg"
            animate={isHovered ? {
              boxShadow: ['0 0 10px hsl(var(--neon-cyan) / 0.2)', '0 0 25px hsl(var(--neon-cyan) / 0.4)', '0 0 10px hsl(var(--neon-cyan) / 0.2)']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Scan line effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="absolute w-full h-px bg-neon-cyan/40"
            animate={{ y: isHovered ? ['0%', '600%'] : '0%' }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
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
          <div className={`px-2 py-1 rounded-sm text-xs font-mono uppercase bg-${getStatusColor(project.status)}/20 text-${getStatusColor(project.status)} border border-${getStatusColor(project.status)}/30`}
            style={{
              backgroundColor: `hsl(var(--${getStatusColor(project.status)}) / 0.2)`,
              color: `hsl(var(--${getStatusColor(project.status)}))`,
              borderColor: `hsl(var(--${getStatusColor(project.status)}) / 0.3)`,
            }}
          >
            {project.status}
          </div>
        </div>

        {/* Purpose / Diagnostics */}
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
            {isHovered ? 'Accessing diagnostics...' : 'Contained'}
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
    <section id="projects" ref={sectionRef} className="relative py-32 px-6">
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
            LIVING EXPERIMENTS
          </h2>
          <p className="font-mono text-sm text-muted-foreground mt-4 max-w-xl">
            Projects are not cards. They are contained realities — each floating in a holographic containment field.
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
            More experiments incubating...
          </span>
        </motion.div>
      </div>
    </section>
  );
};
