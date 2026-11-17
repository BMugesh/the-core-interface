'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Layers, Sparkles } from 'lucide-react';
import { projects } from '@/data/projects';
import { RankBadge } from '@/components/system/RankBadge';
import { ClearedStamp } from '@/components/system/ClearedStamp';
import { Halftone } from '@/components/fx/Halftone';
import { SpeedLines } from '@/components/fx/SpeedLines';
import { getGsap } from '@/lib/gsap';
import { useSystem } from '@/lib/motionPrefs';

export const QuestLog: React.FC = () => {
  const { reducedMotion, setMascotState } = useSystem();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Desktop pinned horizontal scroll via GSAP ScrollTrigger (disabled on mobile or reducedMotion)
  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - container.offsetWidth + 48);

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 10%',
          end: () => `+=${Math.max(600, track.scrollWidth - container.offsetWidth)}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="quests"
      aria-label="Quest Log Projects"
      className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
    >
      <SpeedLines opacity={0.22} />
      <Halftone opacity={0.18} />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-magenta-sys/40 pb-4 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-magenta-sys">
              <span className="w-2 h-2 bg-magenta-sys animate-pulse" />
              <span>[ SECTION 02 // QUEST LOG ]</span>
              <span className="font-jp text-ink-dim">任務一覧</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-wide mt-1 uppercase">
              COMPLETED QUESTS // DEPLOYED SYSTEMS
            </h2>
          </div>
          <div className="font-mono text-xs text-cyan-sys flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4 S/A-RANK QUESTS CLEARED</span>
            {!reducedMotion && (
              <span className="hidden lg:inline text-ink-dim">// SCROLL TO PAN PANELS →</span>
            )}
          </div>
        </div>

        {/* Horizontal track on desktop (when motion active), vertical grid on mobile / simple mode */}
        <div
          ref={trackRef}
          className={
            reducedMotion
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-nowrap gap-6 lg:w-max'
          }
        >
          {projects.map((quest) => (
            <article
              key={quest.slug}
              onMouseEnter={() => setMascotState('celebrate')}
              onMouseLeave={() => setMascotState('idle')}
              className={`manga-card relative flex flex-col justify-between p-5 sm:p-6 clip-panel-sm transition-transform duration-200 hover:-translate-y-1.5 ${
                reducedMotion ? 'w-full' : 'w-full lg:w-[500px] lg:shrink-0'
              }`}
            >
              {/* Top corner accent */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <RankBadge rank={quest.rank} size="sm" />
                    <span className="text-cyan-sys font-bold">{quest.code}</span>
                    <span className="text-ink-dim">[{quest.year}]</span>
                  </div>
                  <ClearedStamp stampId={`quest-${quest.slug}`} label="CLEARED" size="sm" />
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="font-display text-3xl text-ink tracking-wide uppercase">
                    {quest.title}
                  </h3>
                  <p className="font-mono text-xs text-magenta-sys font-bold mt-0.5">
                    {quest.subtitle}
                  </p>
                </div>

                {/* Summary */}
                <p className="font-sans text-xs sm:text-sm text-ink/90 leading-relaxed">
                  {quest.summary}
                </p>

                {/* Verified Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {quest.results.map((res) => (
                    <div
                      key={res.label}
                      className="p-2.5 bg-black/60 border border-white/10 font-mono"
                    >
                      <div className="text-[10px] text-ink-dim uppercase truncate">{res.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-cyan-sys mt-0.5">
                        {res.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {quest.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono bg-panel-elevated border border-white/15 text-ink/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <Link
                  href={`/quests/${quest.slug}`}
                  className="btn-powerup px-4 py-2 font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>OPEN CASE STUDY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {quest.hasGithubLink && quest.githubUrl && (
                  <a
                    href={quest.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-ink-dim hover:text-cyan-sys transition-colors"
                  >
                    <span>GITHUB</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
