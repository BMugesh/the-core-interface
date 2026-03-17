import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

import { useVisitedSections } from '../hooks/useVisitedSections';
import { FocusReveal } from './FocusReveal';
import { IntelligentText } from './IntelligentText';
import { MagneticButton } from './MagneticButton';
// Terminal-style data stream link
const DataStreamLink = ({ 
  icon: Icon, 
  label, 
  href, 
  delay,
  protocol 
}: { 
  icon: typeof Mail; 
  label: string; 
  href: string; 
  delay: number;
  protocol: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [isTransmitting, setIsTransmitting] = useState(false);

  return (
    <MagneticButton strength={0.2} className="w-full">
      <motion.div
        ref={ref}
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay }}
      >
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-4 p-4 border border-white/10 backdrop-blur-sm overflow-hidden bg-void-deep/40 hover:border-neon-cyan/50 transition-colors duration-500"
          onMouseEnter={() => setIsTransmitting(true)}
          onMouseLeave={() => setIsTransmitting(false)}
        >
          {/* Data stream background */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(var(--neon-cyan) / 0.05) 50%, transparent 100%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransmitting ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Scan line effect */}
          {isTransmitting && (
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="absolute w-full h-px bg-neon-cyan/40"
                style={{ boxShadow: '0 0 10px hsl(var(--neon-cyan))' }}
                animate={{ y: ['0%', '400%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          )}

          {/* Icon with pulse */}
          <div className="relative z-10 flex items-center justify-center w-10 h-10 border border-white/10 group-hover:border-neon-cyan/50 transition-colors duration-500">
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan transition-colors duration-300" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                {protocol}
              </span>
              <motion.span
                className="font-mono text-[10px] text-neon-cyan"
                animate={{ opacity: isTransmitting ? [1, 0.5, 1] : 0.3 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                {'>>>'}
              </motion.span>
            </div>
            <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors">
              {label}
            </span>
          </div>
        </motion.a>
      </motion.div>
    </MagneticButton>
  );
};

export const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const { hasVisited, markSectionVisited } = useVisitedSections();
  const isFirstVisit = !hasVisited('contact');

  useEffect(() => {
    if (isInView) {
      markSectionVisited('contact');
    }
  }, [isInView, markSectionVisited]);

  return (
    <section id="contact" ref={sectionRef} className="section relative min-h-[60vh] flex items-center justify-center py-20 px-6 overflow-hidden">
      <ContextualHUD 
        title="SYSTEM_HANDOFF" 
        code="SYS.05" 
        alignment="right"
      />

      <div className="max-w-3xl w-full mx-auto relative z-10">
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
              COMMUNICATION LINK
            </IntelligentText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Identity Block */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-2">
                <FocusReveal 
                  text="Bala Mugesh M K"
                  className="font-display text-4xl font-bold text-white"
                  delay={0.2}
                  blurStrength={10}
                />
              </div>
              <div>
                <FocusReveal 
                  text="AI Engineer · Full-Stack Developer · Python Developer"
                  className="font-mono text-sm text-neon-cyan/80 tracking-widest uppercase"
                  delay={0.4}
                  blurStrength={5}
                />
              </div>
            </motion.div>

            <motion.div
              className="h-px w-32 bg-white/20"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ transformOrigin: 'left' }}
            />

            <motion.p
              className="text-gray-400 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Connection established. System ready for collaboration.
            </motion.p>
          </div>

          {/* Channels Block */}
          <div className="space-y-4">
            <DataStreamLink 
              icon={Mail} 
              label="mkbm1307@gmail.com" 
              href="mailto:mkbm1307@gmail.com" 
              delay={0.8}
              protocol="SMTP_SECURE"
            />
            <DataStreamLink 
              icon={Linkedin} 
              label="LinkedIn Profile" 
              href="#" 
              delay={1.0}
              protocol="LINK_EXT"
            />
          </div>

        </div>
      </div>

      {/* Background Parallax Layer */}
      <div className="section-parallax-layer absolute inset-0 pointer-events-none opacity-[0.05]" 
           data-parallax-speed="0.1"
           style={{ 
             background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05) 50%, transparent)',
           }} 
      />
    </section>
  );
};
