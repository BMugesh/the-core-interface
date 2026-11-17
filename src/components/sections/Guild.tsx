'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Shield, CheckCircle2 } from 'lucide-react';
import { experiences } from '@/data/experience';
import { SystemWindow } from '@/components/system/SystemWindow';
import { Halftone } from '@/components/fx/Halftone';
import { useSystem } from '@/lib/motionPrefs';

export const Guild: React.FC = () => {
  const { reducedMotion, setMascotState } = useSystem();

  return (
    <section
      id="guild"
      aria-label="Guild History and Internships"
      className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
    >
      <Halftone opacity={0.18} />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-sys/30 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-sys">
              <span className="w-2 h-2 bg-cyan-sys" />
              <span>[ SECTION 04 // GUILD EXPEDITIONS ]</span>
              <span className="font-jp text-ink-dim">経歴一覧</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-wide mt-1 uppercase">
              GUILD HISTORY // INTERNSHIPS
            </h2>
          </div>
          <div className="font-mono text-xs text-ink-dim">
            REVERSE CHRONOLOGICAL // 3 EXPEDITIONS LOGGED
          </div>
        </div>

        {/* Timeline Log Container */}
        <div className="relative pl-4 md:pl-8 border-l-2 border-cyan-sys/40 space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={reducedMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              onMouseEnter={() => setMascotState('thinking')}
              onMouseLeave={() => setMascotState('idle')}
              className="relative"
            >
              {/* Timeline node pip */}
              <div
                aria-hidden="true"
                className="absolute -left-[25px] md:-left-[41px] top-6 w-4 h-4 bg-panel border-2 border-cyan-sys shadow-[0_0_8px_#00e5ff] flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 bg-cyan-sys" />
              </div>

              <SystemWindow
                title={exp.organization.toUpperCase()}
                jpTag="遠征記録"
                badge={exp.period}
                systemTag={`[ ${exp.guildCode} ]`}
                glow="cyan"
              >
                <div className="space-y-4">
                  {/* Role and Period Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <h3 className="font-display text-2xl text-ink tracking-wide uppercase">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs text-magenta-sys font-bold">
                        @ {exp.organization}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-cyan-sys bg-black/60 px-3 py-1 border border-cyan-sys/30">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2">
                    {exp.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-ink/90 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-cyan-sys shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Chips */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10px] text-ink-dim mr-1 uppercase">
                      TECH DEPLOYED:
                    </span>
                    {exp.stack.map((st) => (
                      <span
                        key={st}
                        className="px-2 py-0.5 text-[10px] font-mono bg-black/60 border border-white/15 text-cyan-sys font-medium"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </SystemWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
