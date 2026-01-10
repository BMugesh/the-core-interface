import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useVisitedSections } from '../hooks/useVisitedSections';

interface RoleModule {
  name: string;
  description: string;
  capabilities: string[];
  color: 'cyan' | 'amber';
  offset: { x: number; y: number }; // HUD floating offset
}

const roles: RoleModule[] = [
  {
    name: "AI Engineer",
    description: "Deep learning systems, transformer architectures, reinforcement learning optimization",
    capabilities: ["TensorFlow", "PyTorch", "LLMs", "Computer Vision", "NLP"],
    color: "cyan",
    offset: { x: -80, y: -60 },
  },
  {
    name: "Frontend Engineer",
    description: "Cinematic interfaces, motion choreography, immersive visual systems",
    capabilities: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    color: "amber",
    offset: { x: 120, y: -40 },
  },
  {
    name: "Backend Engineer",
    description: "System architecture, API design, scalable infrastructure",
    capabilities: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
    color: "cyan",
    offset: { x: -60, y: 100 },
  },
  {
    name: "Python Systems",
    description: "Automation pipelines, intelligent system orchestration, data processing",
    capabilities: ["FastAPI", "Django", "Celery", "Pandas", "Scripting"],
    color: "amber",
    offset: { x: 100, y: 80 },
  },
];

// Text reveal animation component
const TextReveal = ({ children, delay = 0, staggerDelay = 0.03 }: { children: string; delay?: number; staggerDelay?: number }) => {
  const characters = children.split('');
  
  return (
    <>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  );
};

// Module HUD Panel - System Diagnostics Style
const RoleModulePanel = ({
  role,
  index,
  isInView,
  isActive,
  onHover,
}: {
  role: RoleModule;
  index: number;
  isInView: boolean;
  isActive: boolean;
  onHover: (index: number | null) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const colorName = role.color === 'cyan' ? 'neon-cyan' : 'neon-amber';

  // Idle floating animation
  useEffect(() => {
    if (!ref.current || !isInView) return;

    gsap.to(ref.current, {
      y: [0, 8, -4, 0],
      x: [0, 3, -2, 0],
      rotation: [0, 0.3, -0.2, 0],
      duration: 6 + index * 0.5,
      repeat: -1,
      ease: "sine",
      delay: index * 0.3,
    });

    return () => gsap.killTweensOf(ref.current);
  }, [isInView, index]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-full max-w-xs"
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow background on hover */}
      <motion.div
        className="absolute -inset-4 rounded-lg pointer-events-none"
        style={{
          background:
            role.color === 'cyan'
              ? 'radial-gradient(ellipse at center, hsl(var(--neon-cyan) / 0.15) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, hsl(var(--neon-amber) / 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main HUD panel */}
      <motion.div
        className="relative border border-transparent p-4 backdrop-blur-sm"
        style={{
          background: 'hsl(var(--void-deep) / 0.4)',
          borderColor: isHovered ? `hsl(var(--${colorName}))` : `hsl(var(--${colorName}) / 0.2)`,
          borderWidth: '1.5px',
        }}
        animate={{
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Module header - System style */}
        <div className="mb-3 pb-2 border-b border-dashed" style={{
          borderColor: `hsl(var(--${colorName}) / 0.3)`,
        }}>
          {/* Status indicator + name */}
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{
                background: `hsl(var(--${colorName}))`,
                boxShadow: `0 0 12px hsl(var(--${colorName}))`,
              }}
              animate={isActive || isHovered ? { scale: [1, 1.4, 1] } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
            <span className="font-mono text-xs uppercase tracking-[0.15em] opacity-50">
              Module
            </span>
            <span
              className="font-mono text-xs opacity-30"
              style={{
                background: `linear-gradient(90deg, hsl(var(--${colorName}) / 0.2) 0%, transparent 100%)`,
                padding: '0 4px',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Role name */}
          <motion.h3
            className="font-display text-lg font-bold tracking-tight"
            style={{
              color: `hsl(var(--${colorName}))`,
              textShadow: isHovered ? `0 0 15px hsl(var(--${colorName}) / 0.5)` : 'none',
            }}
            animate={{
              letterSpacing: isHovered ? '0.05em' : '0em',
            }}
          >
            {role.name}
          </motion.h3>
        </div>

        {/* Role description - System capability text */}
        <motion.p
          className="font-mono text-xs leading-relaxed mb-3"
          style={{
            color: 'hsl(var(--muted-foreground))',
          }}
          animate={{
            opacity: isHovered ? 1 : 0.75,
          }}
        >
          {role.description}
        </motion.p>

        {/* Capability flags */}
        <div className="space-y-2">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: `hsl(var(--${colorName}) / 0.5)` }}
          >
            Capabilities
          </span>
          <div className="flex flex-wrap gap-1.5">
            {role.capabilities.map((capability, i) => (
              <motion.span
                key={capability}
                className="font-mono text-xs px-2 py-1 border"
                style={{
                  borderColor: isHovered
                    ? `hsl(var(--${colorName}) / 0.6)`
                    : `hsl(var(--${colorName}) / 0.2)`,
                  color: `hsl(var(--${colorName}))`,
                  background: `hsl(var(--${colorName}) / 0.03)`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15 + i * 0.05,
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 0 12px hsl(var(--${colorName}) / 0.4)`,
                  borderColor: `hsl(var(--${colorName}))`,
                }}
              >
                {capability}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Scan line on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="absolute w-full h-0.5"
            style={{
              background: `linear-gradient(90deg, transparent, hsl(var(--${colorName})), transparent)`,
              boxShadow: `0 0 15px hsl(var(--${colorName}) / 0.6)`,
            }}
            animate={{ y: isHovered ? ['0%', '400%'] : '0%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Connector line between modules
const ModuleConnector = ({
  fromIndex,
  toIndex,
  isInView,
}: {
  fromIndex: number;
  toIndex: number;
  isInView: boolean;
}) => {
  const ref = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!ref.current || !isInView) return;

    gsap.to(ref.current, {
      strokeDashoffset: [200, 0, 200],
      duration: 3,
      repeat: -1,
      ease: "sine",
      delay: fromIndex * 0.2,
    });

    return () => gsap.killTweensOf(ref.current);
  }, [isInView, fromIndex]);

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    >
      <line
        ref={ref}
        x1={`${20 + fromIndex * 25}%`}
        y1={`${30 + (fromIndex % 2) * 40}%`}
        x2={`${20 + toIndex * 25}%`}
        y2={`${30 + (toIndex % 2) * 40}%`}
        stroke="hsl(var(--neon-cyan) / 0.1)"
        strokeWidth="1"
        strokeDasharray="200"
        strokeDashoffset="200"
      />
    </svg>
  );
};

// Central core indicator
const CentralCore = ({ isInView }: { isInView: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !isInView) return;

    gsap.to(ref.current, {
      scale: [1, 1.2, 1],
      duration: 2,
      repeat: -1,
      ease: "sine",
    });

    return () => gsap.killTweensOf(ref.current);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-4 h-4"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.5 }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--neon-cyan)), hsl(var(--neon-amber)))',
          boxShadow: `
            0 0 20px hsl(var(--neon-cyan)),
            0 0 40px hsl(var(--neon-amber) / 0.6),
            inset 0 0 20px hsl(var(--neon-cyan) / 0.3)
          `,
        }}
      />
    </motion.div>
  );
};

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);
  const { hasVisited: sectionVisited, markSectionVisited } = useVisitedSections();
  const isSkillsVisited = sectionVisited('skills');

  const containerRef = useRef<HTMLDivElement>(null);

  // Mark section as visited
  useEffect(() => {
    if (isInView) {
      markSectionVisited('skills');
    }
  }, [isInView, markSectionVisited]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section relative py-32 px-6 overflow-hidden"
      style={{
        '--grid-opacity': isInView ? 0.15 : 0,
      } as React.CSSProperties}
    >
      {/* Background grid - subtle activation */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(190, 100%, 50%, 0.05) 25%, rgba(190, 100%, 50%, 0.05) 26%, transparent 27%, transparent 74%, rgba(190, 100%, 50%, 0.05) 75%, rgba(190, 100%, 50%, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(190, 100%, 50%, 0.05) 25%, rgba(190, 100%, 50%, 0.05) 26%, transparent 27%, transparent 74%, rgba(190, 100%, 50%, 0.05) 75%, rgba(190, 100%, 50%, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Subtle lens effects */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 50%, hsl(var(--neon-cyan) / 0.05) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 70% 40%, hsl(var(--neon-amber) / 0.05) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header - System boot-in */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Scan lines and decorations */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-px bg-neon-cyan"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                width: '60px',
                boxShadow: '0 0 10px hsl(var(--neon-cyan) / 0.5)',
                transformOrigin: 'right',
              }}
            />
            <motion.span
              className="font-mono text-xs tracking-[0.25em] uppercase font-bold"
              style={{ color: 'hsl(var(--neon-cyan))' }}
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={isInView ? { opacity: 1, letterSpacing: '0.25em' } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              SYSTEM ACTIVE
            </motion.span>
            <motion.div
              className="h-px bg-neon-cyan"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                width: '60px',
                boxShadow: '0 0 10px hsl(var(--neon-cyan) / 0.5)',
                transformOrigin: 'left',
              }}
            />
          </div>

          {/* Title - Horizontal scan effect with character reveal */}
          <motion.div className="relative w-full flex justify-center mb-4">
            <div className="relative overflow-hidden">
              {/* Scan line */}
              <motion.div
                className="absolute inset-0 h-full pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(76, 175, 255, 0.2) 50%, transparent 100%)',
                  width: '100%',
                }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 0.8,
                  delay: isInView ? 0.3 : 0,
                  ease: 'easeInOut',
                }}
              />
              <motion.h2
                className="font-display text-5xl md:text-6xl font-bold tracking-tight relative"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.2,
                  delay: isSkillsVisited ? 0 : 0.3,
                }}
              >
                {!isSkillsVisited ? (
                  // First visit: Character reveal
                  <TextReveal delay={0.4} staggerDelay={0.02}>
                    ROLE CONSTRUCTS
                  </TextReveal>
                ) : (
                  // Revisit: Static with underline glow
                  <motion.div
                    animate={{
                      textShadow: [
                        '0 0 0px hsl(var(--neon-cyan) / 0)',
                        '0 0 15px hsl(var(--neon-cyan) / 0.3)',
                        '0 0 0px hsl(var(--neon-cyan) / 0)',
                      ],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: 1,
                      ease: 'easeInOut',
                    }}
                  >
                    ROLE CONSTRUCTS
                  </motion.div>
                )}
              </motion.h2>
            </div>
          </motion.div>

          {/* Subtext - System log with adaptive animation */}
          <motion.p
            className="font-mono text-xs mt-6 max-w-2xl mx-auto"
            style={{
              color: 'hsl(var(--muted-foreground))',
              lineHeight: '1.6',
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.2, delay: isSkillsVisited ? 0 : 0.8 }}
          >
            {!isSkillsVisited ? (
              // First visit: Character reveal
              <TextReveal delay={isSkillsVisited ? 0 : 0.9} staggerDelay={0.01}>
                One mind · Multiple operational modes · Shared intelligence core
              </TextReveal>
            ) : (
              // Revisit: Opacity pulse
              <motion.div
                animate={{ opacity: [1, 1.02, 1] }}
                transition={{ duration: 0.6, repeat: 1, ease: 'easeInOut' }}
              >
                One mind · Multiple operational modes · Shared intelligence core
              </motion.div>
            )}
          </motion.p>
        </motion.div>

        {/* Module grid - Floating HUD panels */}
        <motion.div
          ref={containerRef}
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Connector lines visualization */}
          {isInView && (
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{
                width: '100%',
                height: '100%',
                zIndex: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="connectorGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="hsl(var(--neon-cyan) / 0)" />
                  <stop offset="50%" stopColor="hsl(var(--neon-cyan) / 0.2)" />
                  <stop offset="100%" stopColor="hsl(var(--neon-amber) / 0)" />
                </linearGradient>
              </defs>
              {/* Connector lines between modules */}
              {roles.map((_, i) => {
                const nextI = (i + 1) % roles.length;
                return (
                  <motion.line
                    key={`connector-${i}`}
                    x1={`${20 + i * 23}%`}
                    y1="50%"
                    x2={`${20 + nextI * 23}%`}
                    y2="50%"
                    stroke="url(#connectorGradient)"
                    strokeWidth="1"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{
                      duration: 1.5,
                      delay: 0.8 + i * 0.1,
                    }}
                  />
                );
              })}
            </svg>
          )}

          {/* Modules grid - Centered alignment */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12 relative z-10">
              {roles.map((role, index) => (
                <div
                  key={role.name}
                >
                  <RoleModulePanel
                    role={role}
                    index={index}
                    isInView={isInView}
                    isActive={activeModuleIndex === index}
                    onHover={setActiveModuleIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Central core - Shared intelligence */}
          <CentralCore isInView={isInView} />
        </motion.div>

        {/* Footer indicator */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="inline-flex items-center gap-4">
            <motion.div
              className="h-px bg-neon-cyan"
              style={{
                width: '40px',
                boxShadow: '0 0 12px hsl(var(--neon-cyan) / 0.5)',
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="font-mono text-xs uppercase tracking-widest font-semibold"
              style={{ color: 'hsl(var(--hud-text))' }}
            >
              Shared Core Intelligence
            </span>
            <motion.div
              className="h-px bg-neon-amber"
              style={{
                width: '40px',
                boxShadow: '0 0 12px hsl(var(--neon-amber) / 0.5)',
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
