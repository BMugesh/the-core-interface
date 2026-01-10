import { motion } from 'framer-motion';

interface ContextualHUDProps {
  title: string;
  code: string;
  alignment?: 'left' | 'right';
  className?: string;
}

export const ContextualHUD = ({ title, code, alignment = 'left', className = '' }: ContextualHUDProps) => {
  return (
    <div className={`absolute pointer-events-none z-20 ${alignment === 'left' ? 'left-8 top-1/4' : 'right-8 top-1/4'} ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: alignment === 'left' ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="flex flex-col gap-2"
      >
        {/* Technical Label */}
        <div className={`flex items-center gap-2 ${alignment === 'right' ? 'flex-row-reverse' : ''}`}>
          <span className="w-2 h-2 bg-neon-cyan/80" />
          <span className="font-mono text-xs text-neon-cyan/80 tracking-widest">{code}</span>
          <div className="h-px w-12 bg-neon-cyan/40" />
        </div>

        {/* Section Title */}
        <h2 className={`font-display text-2xl text-white/10 tracking-[0.2em] font-bold ${alignment === 'right' ? 'text-right' : 'text-left'}`}>
          {title}
        </h2>

        {/* Diagnostic Lines */}
        <div className={`flex flex-col gap-1 mt-2 ${alignment === 'right' ? 'items-end' : 'items-start'}`}>
          <div className="w-32 h-px bg-white/5" />
          <div className="w-16 h-px bg-white/5" />
        </div>
      </motion.div>
    </div>
  );
};
