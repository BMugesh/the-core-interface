'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Cpu, Award, ExternalLink } from 'lucide-react';
import { achievements } from '@/data/achievements';
import { SystemWindow } from '@/components/system/SystemWindow';
import { RankBadge } from '@/components/system/RankBadge';
import { TitleToast } from '@/components/system/TitleToast';
import { Halftone } from '@/components/fx/Halftone';
import { useSystem } from '@/lib/motionPrefs';

export const Titles: React.FC = () => {
  const { reducedMotion, triggerHitStop, setMascotState } = useSystem();
  const [activeToast, setActiveToast] = useState<{
    titleName: string;
    event: string;
    badge: string;
  } | null>(null);

  const handleTitleEnter = (ach: (typeof achievements)[0]) => {
    triggerHitStop(`title-${ach.id}`);
    setActiveToast({
      titleName: ach.titleName,
      event: ach.event,
      badge: ach.badge,
    });
    setMascotState('celebrate');
    window.setTimeout(() => setMascotState('idle'), 2500);
  };

  return (
    <section
      id="titles"
      aria-label="Achievements and Titles"
      className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
    >
      <Halftone opacity={0.16} />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-sys/30 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-amber-sys">
              <span className="w-2 h-2 bg-amber-sys animate-pulse" />
              <span>[ SECTION 03 // ACHIEVEMENT TITLES ]</span>
              <span className="font-jp text-ink-dim">称号一覧</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-wide mt-1 uppercase">
              UNLOCKED TITLES // HACKATHONS
            </h2>
          </div>
          <div className="font-mono text-xs text-ink-dim">
            3 TITLES ACQUIRED // 0 LOCKED
          </div>
        </div>

        {/* Titles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={reducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.12 }}
              onViewportEnter={() => handleTitleEnter(ach)}
              onMouseEnter={() => setMascotState('alert')}
              onMouseLeave={() => setMascotState('idle')}
              className="h-full"
            >
              <SystemWindow
                title={`TITLE // ${ach.badge}`}
                systemTag={`[ ${ach.year} // ${ach.locationOrScope.toUpperCase()} ]`}
                glow={ach.rank === 'S' ? 'amber' : 'cyan'}
                className="h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Badge & Rank */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 text-xs font-mono font-bold tracking-widest bg-amber-sys/20 text-amber-sys border border-amber-sys/60 uppercase">
                      {ach.badge}
                    </span>
                    <RankBadge rank={ach.rank} size="sm" showLabel />
                  </div>

                  {/* Title Name */}
                  <div>
                    <h3 className="font-display text-2xl text-ink tracking-wider uppercase">
                      {ach.titleName}
                    </h3>
                    <p className="font-mono text-xs text-cyan-sys mt-1 font-semibold">
                      {ach.event}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs text-ink-dim leading-relaxed">
                    {ach.description}
                  </p>

                  {/* Hardware & Domain Chips */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-dim uppercase">
                      <Cpu className="w-3.5 h-3.5 text-cyan-sys" />
                      <span>HARDWARE &amp; DOMAIN SPEC</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ach.hardwareOrDomain.map((hw) => (
                        <span
                          key={hw}
                          className="px-2 py-0.5 text-[10px] font-mono bg-black/60 border border-white/10 text-ink/90"
                        >
                          {hw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {ach.mediaTodo && (
                    <div className="p-2 bg-black/40 border border-dashed border-white/15 text-[10px] font-mono text-ink-dim/80">
                      {ach.mediaTodo}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-cyan-sys">
                  <span>STATUS: PERMANENTLY UNLOCKED</span>
                  <Award className="w-4 h-4 text-amber-sys" />
                </div>
              </SystemWindow>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Title Acquired Popup Toast */}
      {activeToast && (
        <TitleToast
          titleName={activeToast.titleName}
          event={activeToast.event}
          badge={activeToast.badge}
          visible={Boolean(activeToast)}
          onClose={() => setActiveToast(null)}
        />
      )}
    </section>
  );
};
