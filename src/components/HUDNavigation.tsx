import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
  code: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'CORE', code: '00' },
  { id: 'about', label: 'MIND', code: '01' },
  { id: 'skills', label: 'MODULES', code: '02' },
  { id: 'projects', label: 'WORK', code: '03' },
  { id: 'achievements', label: 'SIGNALS', code: '04' },
  { id: 'contact', label: 'LINK', code: '05' },
];

export const HUDNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const currentSection = sections.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        // Check if section is roughly in the middle of viewport
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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
      style={{ opacity: navOpacity }}
    >
      <div className="relative flex items-center gap-8 px-8 py-3 pointer-events-auto bg-black/80 border-b border-white/10 backdrop-blur-sm rounded-b-lg">
        {/* HUD Decoration Lines */}
        <div className="absolute top-0 left-0 w-4 h-full border-l border-white/20" />
        <div className="absolute top-0 right-0 w-4 h-full border-r border-white/20" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative flex flex-col items-center gap-1 min-w-[60px]"
            >
              {/* Top Marker */}
              <motion.div 
                className="w-full h-[2px] bg-neon-cyan"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className={`text-[10px] font-mono tracking-widest transition-colors duration-300 ${isActive ? 'text-neon-cyan' : 'text-white/40 group-hover:text-white/70'}`}>
                {item.code}
              </div>
              <div className={`text-xs font-display tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                {item.label}
              </div>

              {/* Active Bracket Effect */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -inset-2 border border-neon-cyan/30 rounded-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                   <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-neon-cyan" />
                   <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-neon-cyan" />
                   <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-neon-cyan" />
                   <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-neon-cyan" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};
