import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const ContactLink = ({ 
  icon: Icon, 
  label, 
  href, 
  delay 
}: { 
  icon: typeof Mail; 
  label: string; 
  href: string; 
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-4 border border-steel/30 rounded-sm hover:border-neon-cyan/50 transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 5 }}
    >
      <div className="w-12 h-12 flex items-center justify-center border border-neon-cyan/30 rounded-sm group-hover:border-neon-cyan/60 group-hover:bg-neon-cyan/10 transition-all duration-300">
        <Icon className="w-5 h-5 text-neon-cyan" />
      </div>
      <span className="font-mono text-sm text-foreground group-hover:text-neon-cyan transition-colors">
        {label}
      </span>
      <motion.div
        className="ml-auto w-8 h-px bg-neon-cyan/50 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.a>
  );
};

export const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
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
              System.exit
            </span>
            <motion.div
              className="w-12 h-px bg-neon-cyan"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            EXIT THE LAB
          </h2>
          <motion.p
            className="font-mono text-lg text-hud-text max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            If you understand what you just saw, let's talk.
          </motion.p>
        </motion.div>

        {/* Contact links */}
        <div className="max-w-md mx-auto space-y-4">
          <ContactLink
            icon={Mail}
            label="hello@thelab.dev"
            href="mailto:hello@thelab.dev"
            delay={0.5}
          />
          <ContactLink
            icon={Github}
            label="github.com/thelab"
            href="https://github.com"
            delay={0.6}
          />
          <ContactLink
            icon={Linkedin}
            label="linkedin.com/in/thelab"
            href="https://linkedin.com"
            delay={0.7}
          />
        </div>

        {/* Footer */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="inline-flex flex-col items-center gap-4">
            {/* Lab seal */}
            <motion.div
              className="relative w-16 h-16"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border border-neon-cyan/30" />
              <div className="absolute inset-2 rounded-full border border-neon-cyan/20" />
              <div className="absolute inset-4 rounded-full border border-neon-cyan/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-neon-cyan rounded-full" style={{ boxShadow: '0 0 10px hsl(var(--neon-cyan))' }} />
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <p className="font-display text-sm text-foreground tracking-widest uppercase">
                The Lab
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                Systems. Intelligence. Design.
              </p>
            </div>

            {/* System status bar */}
            <motion.div
              className="mt-8 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              <div className="w-2 h-2 bg-signal-green rounded-full animate-pulse" />
              <span className="font-mono text-xs text-hud-text">
                All systems operational
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
