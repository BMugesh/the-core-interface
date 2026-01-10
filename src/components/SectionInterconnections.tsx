import { useEffect, useRef, useState } from 'react';
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

const StructuralLink = ({
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

  // Technical color mapping - desaturated and precise
  const colorMap = {
    cyan: 'rgba(0, 212, 255, 0.4)',
    amber: 'rgba(255, 215, 0.4)',
    mixed: 'rgba(255, 255, 255, 0.3)',
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
      {/* Structural Line - Precise vector, no glow */}
      <motion.line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={color === 'mixed' ? 'url(#link-gradient)' : colorMap[color]}
        strokeWidth="1"
        strokeDasharray="4 4" 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'circOut' }}
      />
      {/* Endpoints - Technical anchors */}
      <circle cx={startX} cy={startY} r="2" fill={colorMap[color]} />
      <circle cx={endX} cy={endY} r="2" fill={colorMap[color]} />
    
      {color === 'mixed' && (
        <defs>
           <linearGradient id="link-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 212, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 215, 0.3)" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
};

export const SectionInterconnections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [beamPositions, setBeamPositions] = useState<Map<string, DOMRect>>(new Map());

  const updatePositions = () => {
    const newPositions = new Map<string, DOMRect>();
    connections.forEach(({ fromId, toId }) => {
      const fromEl = document.getElementById(fromId);
      const toEl = document.getElementById(toId);

      if (fromEl) newPositions.set(fromId, fromEl.getBoundingClientRect());
      if (toEl) newPositions.set(toId, toEl.getBoundingClientRect());
    });
    setBeamPositions(newPositions);
  };

  useEffect(() => {
    // Initial update
    updatePositions();
    
    // Update on scroll/resize
    window.addEventListener('scroll', updatePositions);
    window.addEventListener('resize', updatePositions);
    
    return () => {
      window.removeEventListener('scroll', updatePositions);
      window.removeEventListener('resize', updatePositions);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {connections.map((conn, i) => (
        <StructuralLink
          key={i}
          from={beamPositions.get(conn.fromId) || null}
          to={beamPositions.get(conn.toId) || null}
          color={conn.color || 'cyan'}
        />
      ))}
    </div>
  );
};
