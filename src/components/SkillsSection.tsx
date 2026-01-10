import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface SkillModule {
  name: string;
  subtitle: string;
  skills: string[];
  color: string;
}

const modules: SkillModule[] = [
  {
    name: "AI Engineer",
    subtitle: "Deep Learning · Transformers · Reinforcement Learning",
    skills: ["TensorFlow", "PyTorch", "LLMs", "Computer Vision", "NLP"],
    color: "neon-cyan",
  },
  {
    name: "Frontend Engineer",
    subtitle: "Cinematic UI · Motion Systems · Immersive Interfaces",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    color: "neon-amber",
  },
  {
    name: "Backend Engineer",
    subtitle: "Architecture · APIs · Scalable Logic",
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
    color: "neon-cyan",
  },
  {
    name: "Python Systems",
    subtitle: "Automation · Pipelines · Intelligent Systems",
    skills: ["FastAPI", "Django", "Celery", "Pandas", "Scripting"],
    color: "neon-amber",
  },
];

const SkillModuleCard = ({ 
  module, 
  index, 
  mouseX, 
  mouseY 
}: { 
  module: SkillModule; 
  index: number;
  mouseX: any;
  mouseY: any;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), springConfig);
  const y = useSpring(useTransform(mouseY, [0, 1], [-5, 5]), springConfig);

  const isAmber = module.color === 'neon-amber';

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      style={{ x, y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`float-card p-6 rounded-lg cursor-pointer transition-all duration-500 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        style={{
          borderColor: isHovered 
            ? `hsl(var(--${module.color}) / 0.5)` 
            : `hsl(var(--${module.color}) / 0.2)`,
        }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Module header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              className={`w-3 h-3 rounded-full ${isAmber ? 'bg-neon-amber' : 'bg-neon-cyan'}`}
              animate={{ 
                boxShadow: isHovered 
                  ? `0 0 20px hsl(var(--${module.color}))` 
                  : `0 0 10px hsl(var(--${module.color}) / 0.5)` 
              }}
            />
            <h3 className={`font-display text-lg font-semibold ${isAmber ? 'text-neon-amber' : 'text-neon-cyan'}`}>
              {module.name}
            </h3>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            {module.subtitle}
          </p>
        </div>

        {/* Skill nodes */}
        <div className="flex flex-wrap gap-2">
          {module.skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="tech-label"
              style={{
                borderColor: `hsl(var(--${module.color}) / 0.3)`,
                color: `hsl(var(--${module.color}))`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.15 + i * 0.05 }}
              whileHover={{ 
                scale: 1.1,
                borderColor: `hsl(var(--${module.color}))`,
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* HUD decorations */}
        <motion.div
          className="absolute -bottom-2 left-4 right-4 h-px"
          style={{ 
            background: isAmber 
              ? 'linear-gradient(90deg, transparent 0%, hsl(var(--neon-amber) / 0.8) 50%, transparent 100%)'
              : 'var(--gradient-hud-line)' 
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

const OrbitalRing = ({ radius, speed, reverse = false }: { radius: number; speed: number; reverse?: boolean }) => (
  <motion.div
    className="absolute top-1/2 left-1/2 rounded-full border border-neon-cyan/10"
    style={{
      width: radius * 2,
      height: radius * 2,
      marginLeft: -radius,
      marginTop: -radius,
    }}
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
  >
    {[0, 90, 180, 270].map((angle) => (
      <motion.div
        key={angle}
        className="absolute w-1.5 h-1.5 bg-neon-cyan/40 rounded-full"
        style={{
          top: '50%',
          left: '50%',
          transform: `rotate(${angle}deg) translateX(${radius}px) translateY(-50%)`,
        }}
      />
    ))}
  </motion.div>
);

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background orbital visualization */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <OrbitalRing radius={200} speed={30} />
        <OrbitalRing radius={300} speed={40} reverse />
        <OrbitalRing radius={400} speed={50} />
        
        {/* Center core - shared intelligence */}
        <motion.div
          className="absolute w-6 h-6 rounded-full"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--neon-cyan)) 0%, hsl(var(--neon-amber)) 100%)',
          }}
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 10, repeat: Infinity, ease: "linear" }
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              className="w-12 h-px bg-neon-cyan"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: 'right' }}
            />
            <span className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase">
              System.constructs
            </span>
            <motion.div
              className="w-12 h-px bg-neon-cyan"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            ROLE CONSTRUCTS
          </h2>
          <p className="font-mono text-sm text-muted-foreground mt-4">
            One mind, many forms — dimensional constructs floating in space
          </p>
        </motion.div>

        {/* Skill modules grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <SkillModuleCard 
              key={module.name} 
              module={module} 
              index={index}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
        </div>

        {/* Central connection indicator */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-px bg-neon-cyan/50" />
            <span className="font-mono text-xs text-hud-text">Shared core intelligence</span>
            <div className="w-8 h-px bg-neon-amber/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
