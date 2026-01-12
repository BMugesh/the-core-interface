import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export const CursorEffects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover (not touch)
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Add trail point
      trailIdRef.current += 1;
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current }];
        return newTrail.slice(-8); // Keep last 8 points
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [data-magnetic], [role="button"]');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [cursorX, cursorY]);

  // Clean up old trail points
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrail(prev => prev.slice(-6));
    }, 50);
    return () => clearInterval(cleanup);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trail particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute rounded-full"
          initial={{ 
            x: point.x - 2, 
            y: point.y - 2, 
            opacity: 0.6,
            scale: 1
          }}
          animate={{ 
            opacity: 0, 
            scale: 0 
          }}
          transition={{ 
            duration: 0.5, 
            ease: 'easeOut' 
          }}
          style={{
            width: 4 - (index * 0.3),
            height: 4 - (index * 0.3),
            background: `radial-gradient(circle, hsl(var(--neon-cyan) / ${0.4 - index * 0.04}), transparent)`,
          }}
        />
      ))}

      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full border border-neon-cyan/20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering ? 'hsl(var(--neon-cyan) / 0.5)' : 'hsl(var(--neon-cyan) / 0.2)',
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Inner cursor dot */}
      <motion.div
        className="absolute rounded-full bg-neon-cyan/80"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 8 : 6,
          height: isHovering ? 8 : 6,
          boxShadow: isHovering 
            ? '0 0 20px hsl(var(--neon-cyan) / 0.8), 0 0 40px hsl(var(--neon-cyan) / 0.4)'
            : '0 0 10px hsl(var(--neon-cyan) / 0.6)',
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Magnetic field indicator when hovering */}
      {isHovering && (
        <motion.div
          className="absolute rounded-full border border-arcane-gold/30"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 32, height: 32, opacity: 0 }}
          animate={{ 
            width: 56, 
            height: 56, 
            opacity: 1,
            rotate: 360,
          }}
          transition={{ 
            width: { duration: 0.3 },
            height: { duration: 0.3 },
            opacity: { duration: 0.2 },
            rotate: { duration: 3, repeat: Infinity, ease: 'linear' }
          }}
        />
      )}
    </div>
  );
};
