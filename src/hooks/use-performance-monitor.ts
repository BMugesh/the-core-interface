import { useEffect, useState } from 'react';

export type PerformanceProfile = 'high-end' | 'mid-range' | 'low-end';

interface PerformanceMetrics {
  profile: PerformanceProfile;
  canReduceMotion: boolean;
  prefersReducedMotion: boolean;
  deviceMemory: number;
  effectiveType: string;
  isLowEndDevice: boolean;
}

export const usePerformanceMonitor = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    profile: 'high-end',
    canReduceMotion: false,
    prefersReducedMotion: false,
    deviceMemory: 8,
    effectiveType: '4g',
    isLowEndDevice: false,
  });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory || 8;

    // Detect connection quality (if available)
    const effectiveType = (navigator as any).connection?.effectiveType || '4g';
    const saveData = (navigator as any).connection?.saveData || false;

    // Determine performance profile
    let profile: PerformanceProfile = 'high-end';
    let isLowEndDevice = false;

    if (prefersReducedMotion || saveData || deviceMemory <= 2) {
      profile = 'low-end';
      isLowEndDevice = true;
    } else if (deviceMemory <= 4 || effectiveType === '3g' || effectiveType === '4g') {
      profile = 'mid-range';
    }

    // Store preference in localStorage for consistency
    const storedProfile = localStorage.getItem('performance_profile');
    if (storedProfile && ['high-end', 'mid-range', 'low-end'].includes(storedProfile)) {
      profile = storedProfile as PerformanceProfile;
    }

    setMetrics({
      profile,
      canReduceMotion: prefersReducedMotion || saveData,
      prefersReducedMotion,
      deviceMemory,
      effectiveType,
      isLowEndDevice,
    });

    // Listen for reduced motion preference changes
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setMetrics(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
        canReduceMotion: e.matches || prev.canReduceMotion,
      }));
    };

    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, []);

  return metrics;
};

// Helper to apply performance-based settings
export const getMotionSettings = (profile: PerformanceProfile) => {
  switch (profile) {
    case 'low-end':
      return {
        scrubIntensity: 0, // Disable scrubbing
        particleDensity: 0.3, // 30% particles
        blurEffects: false,
        parallaxEnabled: false,
        hudAnimationsEnabled: false,
      };
    case 'mid-range':
      return {
        scrubIntensity: 1, // Slower scrub
        particleDensity: 0.6, // 60% particles
        blurEffects: false, // Use gradient fakes instead
        parallaxEnabled: true,
        hudAnimationsEnabled: true,
      };
    case 'high-end':
      return {
        scrubIntensity: 1.5, // Full scrub
        particleDensity: 1, // 100% particles
        blurEffects: true,
        parallaxEnabled: true,
        hudAnimationsEnabled: true,
      };
  }
};
