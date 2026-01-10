/**
 * DAISYUI + CINEMATIC MOTION SYSTEM DESIGN TOKENS
 * 
 * This file documents the design system for the Iron-Man × Doctor-Strange
 * portfolio lab, integrating DaisyUI components with cinematic motion.
 * 
 * PRINCIPLE: DaisyUI provides structure & semantics.
 * Cinematic motion + custom colors provide personality.
 * Together: invisible framework + visceral experience.
 */

// ====================
// COLOR SYSTEM
// ====================

/**
 * PRIMARY PALETTE
 * Arc Reactor Blue - System primary
 * Mystic Gold - Secondary accent
 * Charcoal Void - Background depth
 */

export const colors = {
  // Neon system colors
  cyan: '#00d4ff', // Arc Reactor (primary)
  cyanGlow: '#00e6ff',
  cyanDim: '#0099cc',

  // Mystic secondary
  amber: '#ffd700', // Mystic gold
  amberGlow: '#ffeb3b',
  amberDim: '#cc9900',

  // Void backgrounds
  black: '#0a0a0a', // Deep void
  charcoal: '#1a1a1a', // Mid charcoal
  steel: '#2a2a2a', // Light steel

  // System signals
  success: '#00ff88', // Verified signal
  warning: '#ffaa00', // Caution
  error: '#ff4444', // Alert
  info: '#00d4ff', // Information

  // Neutral grays
  white: '#ffffff',
  gray1: '#f5f5f5',
  gray2: '#e0e0e0',
  gray3: '#999999',
  gray4: '#555555',
};

// ====================
// DAISU UI BUTTON VARIANTS
// ====================

/**
 * DaisyUI buttons with cinematic motion
 * .btn - Base button (use with .btn-primary, .btn-secondary, etc.)
 * .btn-primary - Arc reactor blue, system primary actions
 * .btn-secondary - Mystic gold, alternative actions
 * .btn-outline - Border-only for non-primary interactions
 * .btn-sm, .btn-md, .btn-lg - Size variants
 * .btn-disabled - Inactive states
 */

export const buttonUsage = {
  primary: 'btn btn-primary', // System entry points
  secondary: 'btn btn-secondary', // Observe / explore
  outline: 'btn btn-outline', // Contact / external
  control: 'btn btn-primary btn-sm', // Compact controls
  disabled: 'btn btn-disabled', // Inactive states
};

// ====================
// DAISYUI CARD VARIANTS
// ====================

/**
 * DaisyUI cards as "system modules"
 * .card - Base card container
 * .card-body - Content wrapper
 * .card-title - Card heading
 * .card-actions - Action buttons
 * .shadow-xl - Depth shadow
 */

export const cardUsage = {
  skill: 'card bg-base-100 shadow-xl border border-primary/20', // Skill module
  project: 'card bg-base-100 shadow-lg', // Project exhibit
  achievement: 'card bg-base-100 border border-success/30', // Verified signal
};

// ====================
// DAISYUI BADGE VARIANTS
// ====================

/**
 * DaisyUI badges for status indicators
 * .badge - Base badge
 * .badge-primary - Primary status
 * .badge-secondary - Secondary status
 * .badge-success - Verified/active
 * .badge-warning - In development
 * .badge-error - Archived
 */

export const badgeUsage = {
  active: 'badge badge-success',
  prototype: 'badge badge-warning',
  research: 'badge badge-info',
  archived: 'badge badge-error',
};

// ====================
// TYPOGRAPHY
// ====================

export const typography = {
  // Display font (Orbitron)
  displayLarge: 'font-display text-7xl md:text-8xl font-bold tracking-wider',
  displayMedium: 'font-display text-5xl md:text-6xl font-bold tracking-wide',
  displaySmall: 'font-display text-3xl md:text-4xl font-semibold tracking-wide',

  // Heading font
  headingLarge: 'text-3xl md:text-4xl font-bold',
  headingMedium: 'text-2xl md:text-3xl font-semibold',
  headingSmall: 'text-xl md:text-2xl font-medium',

  // Body text
  bodyLarge: 'text-lg md:text-xl leading-relaxed',
  bodyMedium: 'text-base md:text-lg leading-relaxed',
  bodySmall: 'text-sm md:text-base leading-relaxed',

  // Mono for system text
  monoLarge: 'font-mono text-lg md:text-xl tracking-wide',
  monoMedium: 'font-mono text-base tracking-wide',
  monoSmall: 'font-mono text-xs md:text-sm tracking-widest',
};

// ====================
// SPACING SYSTEM (Tailwind)
// ====================

export const spacing = {
  sectionPadding: 'py-32 px-6', // Section vertical breathing room
  containerPadding: 'max-w-6xl mx-auto',
  gapSmall: 'gap-2',
  gapMedium: 'gap-4',
  gapLarge: 'gap-6',
};

// ====================
// BORDER & RADIUS
// ====================

export const borders = {
  thin: 'border border-primary/10', // Subtle division
  medium: 'border border-primary/30', // Moderate emphasis
  strong: 'border border-primary/60', // High emphasis
  glowCyan: 'border border-cyan/50 shadow-lg shadow-cyan/20', // Glowing border
  glowAmber: 'border border-amber/50 shadow-lg shadow-amber/20', // Golden glow
};

export const radius = {
  none: 'rounded-none', // Sharp sci-fi corners
  small: 'rounded-sm', // Minimal rounding
  medium: 'rounded-md',
  large: 'rounded-lg',
};

// ====================
// SHADOW & DEPTH
// ====================

export const shadows = {
  floatSmall: 'shadow-md',
  floatMedium: 'shadow-lg',
  floatLarge: 'shadow-xl',
  glowCyan: 'shadow-lg shadow-cyan/20',
  glowAmber: 'shadow-lg shadow-amber/20',
};

// ====================
// OPACITY & BLEND
// ====================

export const effects = {
  subtleHover: 'hover:opacity-80 transition-opacity',
  glowOnHover: 'hover:shadow-lg hover:shadow-cyan/30',
  backdropBlur: 'backdrop-blur-sm',
};

// ====================
// DAISYUI COMPONENT INTEGRATION
// ====================

/**
 * FORM INPUTS
 * .input - Base input field
 * .select - Dropdown
 * .textarea - Multi-line text
 * .checkbox - Checkbox
 * .radio - Radio button
 * .toggle - Toggle switch
 * 
 * All inherit primary color scheme from DaisyUI theme
 */

export const formUsage = {
  input: 'input input-bordered input-primary w-full',
  select: 'select select-bordered select-primary w-full',
  textarea: 'textarea textarea-bordered textarea-primary w-full',
  checkbox: 'checkbox checkbox-primary',
  radio: 'radio radio-primary',
  toggle: 'toggle toggle-primary',
};

/**
 * TABLES
 * .table - Base table
 * .table-zebra - Striped rows
 * .table-pin-rows - Sticky header
 * .table-pin-cols - Sticky columns
 */

export const tableUsage = {
  base: 'table table-zebra',
  responsive: 'table table-zebra table-sm md:table-md',
};

/**
 * MODALS / DIALOGS
 * .modal - Base modal
 * .modal-box - Modal content container
 * .modal-action - Button container
 * Use with DaisyUI modal trigger patterns
 */

export const modalUsage = {
  dialog: 'modal',
  box: 'modal-box',
  actions: 'modal-action',
};

// ====================
// ANIMATION TOKENS
// ====================

export const animationDurations = {
  fast: 'duration-200',
  normal: 'duration-300',
  slow: 'duration-500',
  cinematic: 'duration-800',
};

export const animationEasing = {
  linear: 'ease-linear',
  in: 'ease-in',
  out: 'ease-out',
  inOut: 'ease-in-out',
};

// ====================
// RESPONSIVE BREAKPOINTS
// ====================

export const breakpoints = {
  sm: '@media (min-width: 640px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 1024px)',
  xl: '@media (min-width: 1280px)',
  '2xl': '@media (min-width: 1536px)',
};

// ====================
// COMPONENT PATTERNS
// ====================

export const patterns = {
  /**
   * HUD FRAME - Sci-fi bordered container
   * Use .border and corner accents
   */
  hudFrame: 'border border-cyan/20 p-8 relative',

  /**
   * TECH LABEL - Badge-like text pill
   */
  techLabel: 'inline-block px-3 py-1 border border-primary/30 rounded-sm font-mono text-xs tracking-wider',

  /**
   * DATA LINE - Mono text with left border accent
   */
  dataLine: 'relative pl-8 py-3 border-l border-primary/20 font-mono text-sm',

  /**
   * SYSTEM STATUS - Live indicator with dot
   */
  systemStatus: 'flex items-center gap-2 font-mono text-xs uppercase tracking-wider',

  /**
   * FLOATING CARD - Elevated module
   */
  floatingCard: 'card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow',

  /**
   * GRADIENT ACCENT - Horizontal line
   */
  gradientAccent: 'h-px bg-gradient-to-r from-transparent via-primary to-transparent',
};

// ====================
// DAISYUI THEME CONFIGURATION
// ====================

/**
 * Theme name: "sci-fi-dark"
 * Configured in tailwind.config.ts
 * 
 * Primary: #00d4ff (Arc reactor cyan)
 * Secondary: #ffd700 (Mystic gold)
 * Accent: #00d4ff
 * Neutral: #1a1a1a (Deep charcoal)
 * Base: #0a0a0a (Void black)
 * 
 * DaisyUI automatically applies these to all components:
 * - .btn-primary uses primary color
 * - .card inherits base-100 background
 * - .badge variants use semantic colors
 * - All form inputs inherit primary focus state
 */

// ====================
// PERFORMANCE HINTS
// ====================

export const performance = {
  /**
   * GPU acceleration for smooth motion
   */
  hardwareAccel: 'transform translate3d(0, 0, 0)',

  /**
   * Prevent layout shift during animations
   */
  willChange: 'will-change: transform, opacity',

  /**
   * Lazy load heavy components
   */
  lazyLoad: 'loading="lazy"',

  /**
   * Respect prefers-reduced-motion
   */
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
};
