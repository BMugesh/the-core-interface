import { motion } from 'framer-motion';

const HUDCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const isTop = position.includes('t');
  const isLeft = position.includes('l');
  
  return (
    <div className={`absolute ${isTop ? 'top-0' : 'bottom-0'} ${isLeft ? 'left-0' : 'right-0'}`}>
      <motion.div
        className="relative w-16 h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div 
          className={`absolute ${isTop ? 'top-0' : 'bottom-0'} ${isLeft ? 'left-0' : 'right-0'} w-full h-px bg-gradient-to-${isLeft ? 'r' : 'l'} from-neon-cyan/60 to-transparent`}
        />
        <div 
          className={`absolute ${isTop ? 'top-0' : 'bottom-0'} ${isLeft ? 'left-0' : 'right-0'} w-px h-full bg-gradient-to-${isTop ? 'b' : 't'} from-neon-cyan/60 to-transparent`}
        />
      </motion.div>
    </div>
  );
};

const DataStream = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-full h-px"
    style={{ top: `${20 + Math.random() * 60}%` }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.3, 0] }}
    transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: 5 }}
  >
    <motion.div
      className="h-full w-32 bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
      animate={{ x: ['-100%', '200vw'] }}
      transition={{ duration: 4, delay, repeat: Infinity, repeatDelay: 5, ease: "linear" }}
    />
  </motion.div>
);

const ArcaneOrbit = ({ size, delay, reverse = false }: { size: number; delay: number; reverse?: boolean }) => (
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-amber/20"
    style={{ width: size, height: size }}
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{ duration: 40 + delay * 10, repeat: Infinity, ease: "linear" }}
  >
    {[0, 120, 240].map((angle) => (
      <motion.div
        key={angle}
        className="absolute w-2 h-2 text-neon-amber/40 text-xs flex items-center justify-center"
        style={{
          top: '50%',
          left: '50%',
          transform: `rotate(${angle}deg) translateX(${size / 2}px) rotate(-${angle}deg)`,
        }}
      >
        ◇
      </motion.div>
    ))}
  </motion.div>
);

export const HeroSection = () => {
  const titleWords = ["I", "BUILD", "SYSTEMS", "THAT", "THINK."];
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background HUD elements */}
      <div className="absolute inset-0">
        {/* Arc reactor rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hud-ring opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] hud-ring opacity-30"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] hud-ring opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Arcane orbit rings */}
        <ArcaneOrbit size={500} delay={0} />
        <ArcaneOrbit size={650} delay={1} reverse />
        
        {/* Data streams */}
        <DataStream delay={0} />
        <DataStream delay={2} />
        <DataStream delay={4} />
      </div>

      {/* Central arc reactor core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-neon-cyan"
        animate={{ 
          scale: [1, 1.3, 1],
          boxShadow: [
            '0 0 30px hsl(var(--neon-cyan)), 0 0 60px hsl(var(--neon-cyan) / 0.5)',
            '0 0 50px hsl(var(--neon-cyan)), 0 0 100px hsl(var(--neon-cyan) / 0.5)',
            '0 0 30px hsl(var(--neon-cyan)), 0 0 60px hsl(var(--neon-cyan) / 0.5)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* HUD Frame */}
        <div className="relative p-12">
          <HUDCorner position="tl" />
          <HUDCorner position="tr" />
          <HUDCorner position="bl" />
          <HUDCorner position="br" />

          {/* System status */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="font-mono text-xs text-hud-text tracking-[0.3em] uppercase">
              The Convergence Point
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block mr-4 ${i === 2 || i === 4 ? 'text-neon-cyan' : 'text-foreground'}`}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  textShadow: (i === 2 || i === 4) 
                    ? '0 0 30px hsl(var(--neon-cyan) / 0.5), 0 0 60px hsl(var(--neon-cyan) / 0.3)'
                    : 'none'
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="space-y-3 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <p className="font-mono text-lg md:text-xl text-hud-text tracking-wide">
              Engineering intelligence across dimensions.
            </p>
            <p className="font-mono text-sm text-neon-amber/70 tracking-widest">
              AI · Frontend · Backend · Python
            </p>
          </motion.div>

          {/* Identity */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
              Bala Mugesh M K
            </h2>
            <p className="font-mono text-sm text-muted-foreground tracking-wider">
              AI Engineer | Full-Stack System Architect
            </p>
          </motion.div>

          {/* Control switches */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="control-switch px-8 py-4 rounded-sm text-sm"
            >
              Enter the Lab
            </button>
            <button 
              onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              className="control-switch px-8 py-4 rounded-sm text-sm border-neon-amber/40 text-neon-amber hover:border-neon-amber/60"
            >
              Observe Experiments
            </button>
          </motion.div>
        </div>

        {/* Bottom indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-hud-text"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-mono text-xs tracking-widest uppercase">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
