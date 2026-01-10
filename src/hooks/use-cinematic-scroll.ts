import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const useCinematicScroll = (performanceProfile: 'high-end' | 'mid-range' | 'low-end' = 'high-end') => {
  useEffect(() => {
    // Initialize Lenis for cinematic smooth scrolling
    // "Dolly" feel: smooth damping, no hard stops
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for "weight"
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly heavier feel
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // IMAX Principle: Camera drift (scroll = deliberate camera movement)
    const sections = gsap.utils.toArray('.section') as Element[];
    
    // Global depth tween based on scroll progress
    gsap.to('body', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: performanceProfile === 'high-end' ? 1.5 : (performanceProfile === 'mid-range' ? 1 : 0),
        onUpdate: (self) => {
          // Camera lens distortion effect based on velocity
          const velocity = self.getVelocity();
          const twist = gsap.utils.clamp(-2, 2, velocity * 0.0001);
          
          // Only apply on high-end devices and if target exists
          if (performanceProfile === 'high-end') {
            const targets = document.querySelectorAll('.section-parallax-layer');
            if (targets.length > 0) {
              gsap.to(targets, {
                rotateZ: twist,
                overwrite: 'auto',
                duration: 0.1,
              });
            }
          }
        },
      },
    });

    // IMAX Principle: Large foreground elements move faster than background
    sections.forEach((section, i) => {
      const parallaxLayers = section.querySelectorAll('[data-parallax-speed]');
      
      parallaxLayers.forEach((layer) => {
        const speed = parseFloat((layer as HTMLElement).dataset.parallaxSpeed || '1');
        
        gsap.to(layer, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: performanceProfile !== 'low-end' ? 0.5 : false,
            onUpdate: (self) => {
              // True parallax: background moves slower
              const progress = self.progress;
              const move = (progress - 0.5) * 100 * (1 - speed);
              gsap.set(layer, { y: move, overwrite: 'auto' });
            },
          },
        });
      });

      // Section opacity based on proximity to viewport center
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 15%',
          scrub: 0.5,
        },
        opacity: 1,
        ease: 'power2.inOut',
      });

      // Before entering: dimmed
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 100%',
          end: 'top 85%',
          scrub: 0.5,
        },
        opacity: 0.7,
      });

      // After leaving: dimmed
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'bottom 15%',
          end: 'bottom 0%',
          scrub: 0.5,
        },
        opacity: 0.7,
      });
    });

    // Progressive section activation
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          section.classList.add('section-active');
          // Initialize heavy animations only when visible
          const animations = section.querySelectorAll('[data-lazy-animate]');
          animations.forEach((el) => {
            el.classList.add('animate-ready');
          });
        },
        onLeave: () => {
          if (performanceProfile !== 'high-end') {
            section.classList.remove('section-active');
          }
        },
        onLeaveBack: () => {
          section.classList.remove('section-active');
        },
      });
    });

    // IMAX Principle: Background parallax only on high-end
    if (performanceProfile === 'high-end') {
      const bg = document.querySelector('.particle-bg');
      if (bg) {
        gsap.to(bg, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            onUpdate: (self) => {
              // Velocity-based distortion
              const velocity = gsap.utils.clamp(-2, 2, self.getVelocity() * 0.0005);
              gsap.set(bg, {
                rotateZ: velocity,
                overwrite: 'auto',
              });
            },
          },
        });
      }
    }

    // Pause all animations on mid-range when user stops scrolling
    if (performanceProfile === 'mid-range') {
      let scrollTimeout: ReturnType<typeof setTimeout>;
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        gsap.globalTimeline.timeScale(1);
        
        scrollTimeout = setTimeout(() => {
          // Slow down animations when idle
          gsap.globalTimeline.timeScale(0.3);
        }, 2000);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [performanceProfile]);
};

