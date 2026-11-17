'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { getGsap } from './gsap';
import { useSystem } from './motionPrefs';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const { reducedMotion } = useSystem();

  useEffect(() => {
    if (reducedMotion) return;

    const { gsap, ScrollTrigger } = getGsap();
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafTick);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
