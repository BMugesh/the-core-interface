// Cinematic motion presets for consistent, professional animations
export const cinematicMotion = {
  // Slow, cinematic camera movement
  cameraPushIn: {
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1], // Smooth ease-out
    delay: 0.2,
  },
  
  // Spring physics for magnetic/floating feel
  magneticSpring: {
    type: 'spring',
    stiffness: 100,
    damping: 12,
    mass: 1,
  },

  // Heavy, controlled motion
  heavyEase: {
    duration: 0.8,
    ease: [0.4, 0, 0.2, 1],
  },

  // Quick, snappy transitions
  snappyEase: {
    type: 'spring',
    stiffness: 150,
    damping: 25,
  },

  // Cinematic text reveal
  textReveal: {
    opacity: { duration: 0.6 },
    y: { duration: 0.8 },
    ease: [0.16, 1, 0.3, 1],
  },

  // Holographic projection feel
  holographicAppear: {
    duration: 1,
    ease: [0.165, 0.84, 0.44, 1],
  },

  // Depth separation layers
  depthLayerTransition: {
    duration: 1.5,
    ease: 'easeInOut',
  },

  // System module hover response
  moduleFloat: {
    type: 'spring',
    stiffness: 80,
    damping: 10,
  },

  // Project exhibition entrance
  projectExhibitEntrance: {
    duration: 1.2,
    ease: [0.34, 1.56, 0.64, 1],
    delay: 0.15,
  },
};

// Hover response variants
export const interactiveVariants = {
  button: {
    rest: {
      y: 0,
      boxShadow: '0 4px 12px rgba(0, 212, 255, 0.1)',
    },
    hover: {
      y: -3,
      boxShadow: '0 12px 24px rgba(0, 212, 255, 0.2)',
    },
    tap: {
      y: 1,
      boxShadow: '0 2px 8px rgba(0, 212, 255, 0.1)',
    },
  },
  
  card: {
    rest: {
      scale: 1,
      opacity: 0.95,
    },
    hover: {
      scale: 1.02,
      opacity: 1,
    },
  },

  moduleFloat: {
    rest: {
      y: 0,
      rotateY: 0,
    },
    hover: {
      y: -8,
      rotateY: 3,
    },
  },
};

// Scroll-triggered animations
export const scrollVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    inView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },

  fadeInUpDelay: (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    inView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),

  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    inView: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },

  slideInFromLeft: {
    initial: { x: -60, opacity: 0 },
    inView: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
  },

  slideInFromRight: {
    initial: { x: 60, opacity: 0 },
    inView: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
  },

  depthReveal: {
    initial: { opacity: 0, z: -50 },
    inView: { opacity: 1, z: 0 },
    transition: { duration: 1, ease: 'easeOut' },
  },
};

// Ambient idle motion patterns
export const ambientMotion = {
  floatingIdle: {
    y: [0, 10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },

  subtleRotate: {
    rotate: [0, 1, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },

  breatheGlow: {
    boxShadow: [
      '0 0 20px rgba(0, 212, 255, 0.2)',
      '0 0 40px rgba(0, 212, 255, 0.4)',
      '0 0 20px rgba(0, 212, 255, 0.2)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },

  orbitSlow: {
    rotate: 360,
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};
