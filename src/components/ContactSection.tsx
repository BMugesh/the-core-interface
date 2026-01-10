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
      className="btn btn-outline btn-lg gap-4 justify-start"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 8 }}
    >
      <Icon className="w-5 h-5" />
      <span>
        {label}
      </span>
    </motion.a>
  );
};

export const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={sectionRef} className="section relative py-32 px-6">
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
            LEAVING THE LAB
          </h2>
          <motion.p
            className="font-mono text-lg text-hud-text max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            If this made sense to you, we should talk.
          </motion.p>
        </motion.div>

        {/* Contact links */}
        <div className="max-w-md mx-auto space-y-4">
          <ContactLink
            icon={Mail}
            label="mkbm1307@gmail.com"
            href="mailto:mkbm1307@gmail.com"
            delay={0.5}
          />
          <ContactLink
            icon={Github}
            label="github.com/BMugesh"
            href="https://github.com/BMugesh"
            delay={0.6}
          />
          <ContactLink
            icon={Linkedin}
            label="linkedin.com/in/balamugeshmk"
            href="https://linkedin.com/in/balamugeshmk"
            delay={0.7}
          />
        </div>

        {/* Access note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          <span className="font-mono text-xs text-muted-foreground">
            No forms. No noise. Just access.
          </span>
        </motion.div>

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
              className="relative w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border border-neon-cyan/30" />
              <div className="absolute inset-2 rounded-full border border-neon-amber/20" />
              <div className="absolute inset-4 rounded-full border border-neon-cyan/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--neon-cyan)) 0%, hsl(var(--neon-amber)) 100%)',
                    boxShadow: '0 0 15px hsl(var(--neon-cyan))'
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <p className="font-display text-lg text-foreground tracking-widest uppercase">
                Bala Mugesh M K
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                Multiversal Lab — Online
              </p>
            </div>

            {/* System status bar */}
            <motion.div
              className="mt-8 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              <motion.div 
                className="w-2 h-2 bg-signal-green rounded-full"
                animate={{ 
                  boxShadow: ['0 0 5px hsl(var(--signal-green))', '0 0 15px hsl(var(--signal-green))', '0 0 5px hsl(var(--signal-green))']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
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
