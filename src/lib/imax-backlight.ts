/**
 * IMAX Backlight System
 * 
 * Provides a controlled cinematic glow effect that subtly illuminates
 * key text elements across all major sections. This creates the effect
 * of a soft projector-style backlight rather than harsh neon or lens flare.
 * 
 * Characteristics:
 * - Soft, diffuse projection-style light
 * - Low intensity but perceptible
 * - Consistent projection source across all sections
 * - Adds atmospheric depth and presence
 * - Feels like screen projection rather than decoration
 */

export const IMAXBacklightConfig = {
  // Base backlight glow - soft radial gradient
  glow: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)',

  // Color variations for different sections (subtle)
  variants: {
    default: 'rgba(255, 255, 255, 0.05)',
    warm: 'rgba(255, 200, 150, 0.04)',
    cool: 'rgba(150, 200, 255, 0.04)',
  },

  // Animation configuration for breathing effect
  animation: {
    duration: 4, // seconds - very slow, barely perceptible
    intensity: {
      min: 0.05,
      max: 0.15,
    },
  },
};

/**
 * Apply IMAX backlight to an element
 * Usage in JSX:
 * <div className="imax-backlight">
 *   <div className="imax-backlight-glow" />
 *   Your content here
 * </div>
 */
export const getIMAXBacklightStyles = (variant: 'default' | 'warm' | 'cool' = 'default') => ({
  container: 'relative',
  glow: `absolute inset-0 pointer-events-none bg-${
    variant === 'warm' ? '[radial-gradient(circle_at_center,_rgba(255,_200,_150,_0.08)_0%,_rgba(255,_200,_150,_0.02)_40%,_transparent_70%)]' :
    variant === 'cool' ? '[radial-gradient(circle_at_center,_rgba(150,_200,_255,_0.08)_0%,_rgba(150,_200,_255,_0.02)_40%,_transparent_70%)]' :
    '[radial-gradient(circle_at_center,_rgba(255,_255,_255,_0.08)_0%,_rgba(255,_255,_255,_0.02)_40%,_transparent_70%)]'
  }`,
  content: 'relative z-10',
});

/**
 * Tailwind utilities for IMAX backlight
 * Add to your CSS/tailwind config for easier usage
 */
export const imaxBacklightTailwind = `
  @layer components {
    .imax-backlight {
      @apply relative;
    }
    
    .imax-backlight-glow {
      @apply absolute inset-0 pointer-events-none;
      background: radial-gradient(
        circle at center,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(255, 255, 255, 0.02) 40%,
        transparent 70%
      );
      z-index: 0;
    }

    .imax-backlight-glow.warm {
      background: radial-gradient(
        circle at center,
        rgba(255, 200, 150, 0.08) 0%,
        rgba(255, 200, 150, 0.02) 40%,
        transparent 70%
      );
    }

    .imax-backlight-glow.cool {
      background: radial-gradient(
        circle at center,
        rgba(150, 200, 255, 0.08) 0%,
        rgba(150, 200, 255, 0.02) 40%,
        transparent 70%
      );
    }

    .imax-backlight-content {
      @apply relative z-10;
    }

    /* Breathing animation for static backlight */
    @keyframes imax-breathing {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 1.3;
      }
    }

    .imax-backlight-breathing {
      animation: imax-breathing 4s ease-in-out infinite;
    }
  }
`;
