import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingSequence } from '@/components/LoadingSequence';
import { ParticleBackground } from '@/components/ParticleBackground';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AchievementsSection } from '@/components/AchievementsSection';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-void-deep text-foreground overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <LoadingSequence onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ParticleBackground />
          
          <motion.main
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
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
