import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for scroll-based character-by-character text reveals
 * Creates cinematic text animation as sections scroll into view
 */
export const useTextReveal = () => {
  const revealRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!revealRef.current) return;

    // Find all elements with data-reveal-text attribute
    const revealElements = revealRef.current.querySelectorAll('[data-reveal-text]');

    revealElements.forEach((element) => {
      const text = element.textContent || '';
      const chars = text.split('');

      // Clear original text
      element.innerHTML = '';

      // Create span for each character
      chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.className = 'reveal-char';
        element.appendChild(span);
      });

      // Animate reveals on scroll
      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        onEnter: () => {
          gsap.to(element.querySelectorAll('.reveal-char'), {
            opacity: 1,
            duration: 0.4,
            stagger: 0.03,
            ease: 'power2.out',
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === revealRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return revealRef;
};

/**
 * Hook for line-by-line text reveals
 * Animates paragraph lines as they come into view
 */
export const useLineReveal = () => {
  const revealRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!revealRef.current) return;

    const lineElements = revealRef.current.querySelectorAll('[data-reveal-lines]');

    lineElements.forEach((element) => {
      const lines = element.innerHTML.split('<br>');
      element.innerHTML = '';

      lines.forEach((line, i) => {
        const lineDiv = document.createElement('div');
        lineDiv.innerHTML = line;
        lineDiv.style.opacity = '0';
        lineDiv.style.transform = 'translateY(20px)';
        lineDiv.className = 'reveal-line';
        element.appendChild(lineDiv);
      });

      ScrollTrigger.create({
        trigger: element,
        start: 'top 75%',
        end: 'top 25%',
        onEnter: () => {
          gsap.to(element.querySelectorAll('.reveal-line'), {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === revealRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return revealRef;
};

/**
 * Hook for word-by-word text reveals
 * Animates individual words with stagger effect
 */
export const useWordReveal = () => {
  const revealRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!revealRef.current) return;

    const wordElements = revealRef.current.querySelectorAll('[data-reveal-words]');

    wordElements.forEach((element) => {
      const text = element.textContent || '';
      const words = text.split(' ');

      element.innerHTML = '';

      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.marginRight = '0.3em';
        span.style.opacity = '0';
        span.style.transform = 'translateX(-10px)';
        span.className = 'reveal-word';
        element.appendChild(span);
      });

      ScrollTrigger.create({
        trigger: element,
        start: 'top 70%',
        end: 'top 30%',
        onEnter: () => {
          gsap.to(element.querySelectorAll('.reveal-word'), {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out',
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === revealRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return revealRef;
};

/**
 * Hook for progressive text opacity reveal
 * Fades in entire text blocks smoothly
 */
export const useFadeReveal = () => {
  const revealRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!revealRef.current) return;

    const fadeElements = revealRef.current.querySelectorAll('[data-fade-reveal]');

    fadeElements.forEach((element) => {
      gsap.set(element, { opacity: 0 });

      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        end: 'top 40%',
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === revealRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return revealRef;
};
