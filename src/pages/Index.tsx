import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingSequence } from '@/components/LoadingSequence';
import { ParticleBackground } from '@/components/ParticleBackground';
import { HUDNavigation } from '@/components/HUDNavigation';
import { CursorEffects } from '@/components/CursorEffects';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AchievementsSection } from '@/components/AchievementsSection';
import { ContactSection } from '@/components/ContactSection';
import { SectionInterconnections } from '@/components/SectionInterconnections';
import { useCinematicScroll } from '@/hooks/use-cinematic-scroll';
import { usePerformanceMonitor } from '@/hooks/use-performance-monitor';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const performance = usePerformanceMonitor();
  
  // Initialize cinematic scroll animations with performance profile
  useCinematicScroll(performance.profile);

  return (
    <div className="relative min-h-screen bg-void-deep text-foreground overflow-x-hidden cursor-none">
      <AnimatePresence>
        {isLoading && (
          <LoadingSequence onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CursorEffects />
          <ParticleBackground />
          <HUDNavigation />
          
          {/* Section interconnection visuals */}
          <SectionInterconnections />
          
          <motion.main
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
          >
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <AchievementsSection />
            <ContactSection />
          </motion.main>
        </>
      )}
    </div>
  );
};

export default Index;
