import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionConnection {
  fromId: string;
  toId: string;
  color?: 'cyan' | 'amber' | 'mixed';
  intensity?: number;
}

const connections: SectionConnection[] = [
  { fromId: 'hero', toId: 'about', color: 'cyan', intensity: 0.6 },
  { fromId: 'about', toId: 'skills', color: 'amber', intensity: 0.5 },
  { fromId: 'skills', toId: 'projects', color: 'cyan', intensity: 0.7 },
  { fromId: 'projects', toId: 'achievements', color: 'amber', intensity: 0.6 },
  { fromId: 'achievements', toId: 'contact', color: 'mixed', intensity: 0.8 },
];

const EnergyBeam = ({
  from,
  to,
  color = 'cyan',
}: {
  from: DOMRect | null;
  to: DOMRect | null;
  color: 'cyan' | 'amber' | 'mixed';
}) => {
  if (!from || !to) return null;

  const startX = from.left + from.width / 2;
  const startY = from.top + from.height;
  const endX = to.left + to.width / 2;
  const endY = to.top;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  const colorMap = {
    cyan: 'hsl(190 100% 50%)',
    amber: 'hsl(38 100% 50%)',
    mixed: `linear-gradient(90deg, hsl(190 100% 50%), hsl(38 100% 50%))`,
  };

  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <defs>
        <linearGradient id={`beam-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color === 'cyan' ? '#00d4ff' : color === 'amber' ? '#ffd700' : '#00d4ff'} stopOpacity="0" />
          <stop offset="50%" stopColor={color === 'cyan' ? '#00d4ff' : color === 'amber' ? '#ffd700' : '#ffd700'} stopOpacity="1" />
          <stop offset="100%" stopColor={color === 'cyan' ? '#00d4ff' : color === 'amber' ? '#ffd700' : '#00d4ff'} stopOpacity="0" />
        </linearGradient>
        <filter id="beam-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={`url(#beam-gradient-${color})`}
        strokeWidth="2"
        filter="url(#beam-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{
          filter: `drop-shadow(0 0 10px ${color === 'cyan' ? 'hsl(190 100% 50% / 0.5)' : 'hsl(38 100% 50% / 0.5)'})`,
        }}
      />
    </svg>
  );
};

export const SectionInterconnections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamPositionsRef = useRef<Map<string, DOMRect>>(new Map());

  useEffect(() => {
    const updatePositions = () => {
      connections.forEach((conn) => {
        const fromEl = document.getElementById(conn.fromId);
        const toEl = document.getElementById(conn.toId);

        if (fromEl && toEl) {
          beamPositionsRef.current.set(`${conn.fromId}-${conn.toId}`, fromEl.getBoundingClientRect());
        }
      });
    };

    updatePositions();
    window.addEventListener('scroll', updatePositions);
    window.addEventListener('resize', updatePositions);

    return () => {
      window.removeEventListener('scroll', updatePositions);
      window.removeEventListener('resize', updatePositions);
    };
  }, []);

  useEffect(() => {
    // Animate connection strength based on scroll position
    connections.forEach((conn) => {
      const fromEl = document.getElementById(conn.fromId);
      const toEl = document.getElementById(conn.toId);

      if (fromEl && toEl) {
        ScrollTrigger.create({
          trigger: fromEl,
          start: 'top center',
          end: 'bottom center',
          onUpdate: (self) => {
            const progress = self.progress;
            const beam = document.querySelector(`[data-beam="${conn.fromId}-${conn.toId}"]`);

            if (beam) {
              gsap.set(beam, {
                opacity: 0.3 + progress * 0.4,
                strokeWidth: 1 + progress * 2,
              });
            }
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {connections.map((conn) => {
        const fromEl = document.getElementById(conn.fromId);
        const toEl = document.getElementById(conn.toId);

        if (!fromEl || !toEl) return null;

        const from = fromEl.getBoundingClientRect();
        const to = toEl.getBoundingClientRect();

        return (
          <motion.svg
            key={`${conn.fromId}-${conn.toId}`}
            data-beam={`${conn.fromId}-${conn.toId}`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            <defs>
              <filter id={`glow-${conn.fromId}-${conn.toId}`}>
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.line
              x1={from.left + from.width / 2}
              y1={from.top + from.height}
              x2={to.left + to.width / 2}
              y2={to.top}
              stroke={conn.color === 'cyan' ? '#00d4ff' : conn.color === 'amber' ? '#ffd700' : '#00d4ff'}
              strokeWidth="2"
              opacity="0.4"
              filter={`url(#glow-${conn.fromId}-${conn.toId})`}
              style={{
                filter: `drop-shadow(0 0 8px ${conn.color === 'cyan' ? 'hsl(190 100% 50% / 0.5)' : 'hsl(38 100% 50% / 0.5)'})`,
              }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.svg>
        );
      })}
    </div>
  );
};

/**
 * Enhanced section signal markers
 * Shows energy flow between sections
 */
export const SectionSignal = ({ sectionId, intensity = 1 }: { sectionId: string; intensity?: number }) => {
  return (
    <motion.div
      className="absolute -top-8 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Signal pulse indicator */}
      <motion.div
        className="relative w-3 h-3 rounded-full"
        style={{
          background: sectionId.includes('hero') || sectionId.includes('skills') || sectionId.includes('contact-signal') ? '#00d4ff' : '#ffd700',
          boxShadow: `0 0 20px ${sectionId.includes('hero') || sectionId.includes('skills') || sectionId.includes('contact-signal') ? 'hsl(190 100% 50% / 0.6)' : 'hsl(38 100% 50% / 0.6)'}`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 2 + intensity,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

/**
 * Holographic connection path between sections
 */
export const HolographicPath = ({
  fromId,
  toId,
  label,
}: {
  fromId: string;
  toId: string;
  label?: string;
}) => {
  const pathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);

    if (!fromEl || !toEl) return;

    const updatePath = () => {
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const startX = fromRect.left + fromRect.width / 2;
      const startY = fromRect.top + fromRect.height;
      const endX = toRect.left + toRect.width / 2;
      const endY = toRect.top;

      const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      const angle = Math.atan2(endY - startY, endX - startX);

      gsap.set(pathRef.current, {
        width: distance,
        height: 2,
        left: startX,
        top: startY,
        rotation: angle * (180 / Math.PI),
        transformOrigin: '0 50%',
      });
    };

    updatePath();
    window.addEventListener('scroll', updatePath);
    window.addEventListener('resize', updatePath);

    return () => {
      window.removeEventListener('scroll', updatePath);
      window.removeEventListener('resize', updatePath);
    };
  }, [fromId, toId]);

  return (
    <motion.div
      ref={pathRef}
      className="fixed pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, hsl(190 100% 50% / 0.4), hsl(38 100% 50% / 0.4))',
        boxShadow: '0 0 15px hsl(190 100% 50% / 0.3), 0 0 15px hsl(38 100% 50% / 0.3)',
        zIndex: 5,
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
  );
};
