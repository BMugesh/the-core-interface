import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'CORE', icon: '◇' },
  { id: 'about', label: 'MIND', icon: '◈' },
  { id: 'skills', label: 'MODULES', icon: '⬡' },
  { id: 'projects', label: 'EXPERIMENTS', icon: '⬢' },
  { id: 'achievements', label: 'SIGNALS', icon: '◉' },
  { id: 'contact', label: 'EXIT', icon: '◎' },
];

export const HUDNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  const navOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  const navY = useTransform(scrollY, [0, 200], [-20, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const currentSection = sections.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      style={{ opacity: navOpacity, y: navY }}
      initial={{ opacity: 0, y: -20 }}
    >
      <motion.div
        className="relative px-2 py-2 rounded-full"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--void) / 0.9) 0%, hsl(var(--card) / 0.8) 100%)',
          border: '1px solid hsl(var(--neon-cyan) / 0.3)',
          boxShadow: '0 10px 40px hsl(0 0% 0% / 0.5), 0 0 20px hsl(var(--neon-cyan) / 0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* HUD frame decorations */}
        <motion.div
          className="absolute -top-px left-8 right-8 h-px"
          style={{ background: 'var(--gradient-hud-line)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-px left-8 right-8 h-px"
          style={{ background: 'var(--gradient-hud-line)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        <div className="flex items-center gap-1">
          {/* System indicator */}
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 mr-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-signal-green"
              animate={{ 
                boxShadow: ['0 0 5px hsl(var(--signal-green))', '0 0 15px hsl(var(--signal-green))', '0 0 5px hsl(var(--signal-green))']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] text-hud-text tracking-wider hidden md:block">
              NAV.SYS
            </span>
          </motion.div>

          {/* Separator */}
          <div className="w-px h-6 bg-steel/50 mr-2 hidden md:block" />

          {/* Nav items */}
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-3 py-1.5 rounded-full group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active indicator background */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    layoutId="activeSection"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--neon-cyan) / 0.2) 0%, hsl(var(--neon-cyan) / 0.1) 100%)',
                      border: '1px solid hsl(var(--neon-cyan) / 0.5)',
                      boxShadow: '0 0 15px hsl(var(--neon-cyan) / 0.3)',
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Content */}
                <div className="relative flex items-center gap-1.5">
                  <span className={`text-xs transition-colors duration-300 ${
                    isActive ? 'text-neon-cyan' : 'text-hud-text group-hover:text-neon-cyan/80'
                  }`}>
                    {item.icon}
                  </span>
                  <span className={`font-mono text-[10px] tracking-wider transition-colors duration-300 hidden lg:block ${
                    isActive ? 'text-neon-cyan' : 'text-hud-text group-hover:text-neon-cyan/80'
                  }`}>
                    {item.label}
                  </span>
                </div>

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(circle, hsl(var(--neon-cyan) / 0.1) 0%, transparent 70%)',
                  }}
                />
              </motion.button>
            );
          })}

          {/* Separator */}
          <div className="w-px h-6 bg-steel/50 ml-2 hidden md:block" />

          {/* Operator badge */}
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 ml-2 hidden md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-mono text-[10px] text-neon-amber tracking-wider">
              BMK
            </span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-neon-amber"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Corner brackets */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-neon-cyan/40" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-neon-cyan/40" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-neon-cyan/40" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-neon-cyan/40" />
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.6 : 0 }}
        transition={{ delay: 0.3 }}
      >
        {navItems.map((item, index) => {
          const sectionIndex = navItems.findIndex(n => n.id === activeSection);
          const isPast = index < sectionIndex;
          const isCurrent = index === sectionIndex;
          
          return (
            <motion.div
              key={item.id}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                isPast ? 'w-4 bg-neon-cyan/60' : 
                isCurrent ? 'w-6 bg-neon-cyan' : 
                'w-2 bg-steel/50'
              }`}
              animate={isCurrent ? { 
                boxShadow: ['0 0 5px hsl(var(--neon-cyan) / 0.5)', '0 0 10px hsl(var(--neon-cyan))', '0 0 5px hsl(var(--neon-cyan) / 0.5)']
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          );
        })}
      </motion.div>
    </motion.nav>
  );
};
