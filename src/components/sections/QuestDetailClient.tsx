'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import type { ProjectQuest } from '@/data/projects';
import { SystemWindow } from '@/components/system/SystemWindow';
import { RankBadge } from '@/components/system/RankBadge';
import { ClearedStamp } from '@/components/system/ClearedStamp';
import { DagScrub } from '@/components/system/DagScrub';
import { TopHudNav } from '@/components/system/TopHudNav';
import { ProgressXP } from '@/components/fx/ProgressXP';
import { Cursor } from '@/components/fx/Cursor';
import { Halftone } from '@/components/fx/Halftone';
import { getGsap } from '@/lib/gsap';
import { useSystem } from '@/lib/motionPrefs';

export const QuestDetailClient: React.FC<{ quest: ProjectQuest }> = ({ quest }) => {
  const { reducedMotion } = useSystem();
  const isRio = quest.slug === 'rio';
  const scrubRef = useRef<HTMLDivElement>(null);
  const [scrollNodeIndex, setScrollNodeIndex] = useState(quest.architectureNodes.length - 1);

  // For R.I.O. case study: pinned scroll-scrubbed DAG node drawing sequence
  useEffect(() => {
    if (!isRio || reducedMotion) {
      setScrollNodeIndex(quest.architectureNodes.length - 1);
      return;
    }
    const el = scrubRef.current;
    if (!el) return;

    const { gsap, ScrollTrigger } = getGsap();
    const totalNodes = quest.architectureNodes.length;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 25%',
        end: '+=900',
        pin: window.innerWidth >= 1024,
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(totalNodes - 1, Math.floor(self.progress * totalNodes));
          setScrollNodeIndex(idx);
        },
      });
    }, el);

    return () => ctx.revert();
  }, [isRio, reducedMotion, quest.architectureNodes.length]);

  return (
    <div className="relative min-h-screen bg-bg text-ink overflow-x-hidden">
      <ProgressXP />
      <Cursor />
      <TopHudNav />
      <Halftone opacity={0.18} />

      <main id="main-content" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Breadcrumb / Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/#quests"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-panel border border-cyan-sys/50 text-cyan-sys hover:bg-cyan-sys hover:text-bg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO QUEST LOG</span>
          </Link>
          <span className="text-ink-dim">
            CASE STUDY // {quest.code} // {quest.year}
          </span>
        </div>

        {/* Hero Quest Header */}
        <SystemWindow
          title={`QUEST DOSSIER: ${quest.title}`}
          jpTag="任務詳細"
          badge={quest.year}
          systemTag={`[ ${quest.code} // VERIFIED ]`}
          glow="cyan"
          variant="manga"
        >
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <RankBadge rank={quest.rank} size="md" showLabel />
              </div>
              <ClearedStamp stampId={`detail-${quest.slug}`} label="QUEST CLEARED" size="md" />
            </div>

            <div>
              <h1 className="font-display text-4xl sm:text-6xl text-ink uppercase tracking-wide">
                {quest.title}
              </h1>
              <p className="font-mono text-sm sm:text-base text-magenta-sys font-bold mt-1">
                {quest.subtitle}
              </p>
            </div>

            <p className="font-sans text-sm sm:text-base text-ink/90 leading-relaxed">
              {quest.summary}
            </p>

            {/* Stack chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {quest.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono bg-black/60 border border-cyan-sys/40 text-cyan-sys"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </SystemWindow>

        {/* Problem Statement */}
        <SystemWindow title="01 // PROBLEM STATEMENT" jpTag="課題" glow="magenta">
          <p className="font-sans text-sm sm:text-base text-ink/90 leading-relaxed">
            {quest.problem}
          </p>
        </SystemWindow>

        {/* Architecture Diagram (R.I.O. gets both scroll-scrubbed DAG & interactive scrubber) */}
        <div ref={scrubRef}>
          <SystemWindow
            title="02 // SYSTEM ARCHITECTURE DIAGRAM"
            jpTag="構造図"
            badge={isRio ? 'SCROLL-SCRUBBED DAG' : 'PIPELINE GRAPH'}
            glow="cyan"
          >
            {isRio ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between font-mono text-xs text-cyan-sys">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    EXECUTION PIPELINE PROGRESS: NODE 0{scrollNodeIndex + 1} / 0
                    {quest.architectureNodes.length}
                  </span>
                  {!reducedMotion && (
                    <span className="hidden lg:inline text-ink-dim">
                      SCROLL TO DRAW DAG NODES ↓
                    </span>
                  )}
                </div>

                {/* Scroll-driven node graph */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                  {quest.architectureNodes.map((node, idx) => {
                    const active = idx <= scrollNodeIndex;
                    const current = idx === scrollNodeIndex;
                    return (
                      <div
                        key={node.id}
                        className={`p-3 border font-mono transition-all duration-200 ${
                          current
                            ? 'border-cyan-sys bg-cyan-sys/20 shadow-sys-cyan scale-[1.03]'
                            : active
                            ? 'border-cyan-sys/60 bg-panel-elevated opacity-100'
                            : 'border-white/10 bg-black/40 opacity-35'
                        }`}
                      >
                        <div className="text-[10px] text-cyan-sys font-bold">0{idx + 1}</div>
                        <div className="font-display text-lg text-ink mt-0.5">{node.label}</div>
                        <div className="font-sans text-[11px] text-ink-dim mt-1 leading-snug">
                          {node.sublabel}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive manual scrubber below */}
                <div className="pt-4 border-t border-white/10">
                  <DagScrub />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {quest.architectureNodes.map((node, idx) => (
                  <div
                    key={node.id}
                    className="relative p-3.5 bg-panel-elevated border border-cyan-sys/50 font-mono"
                  >
                    <div className="flex items-center justify-between text-[10px] text-cyan-sys mb-1">
                      <span>NODE 0{idx + 1}</span>
                      <span className="uppercase opacity-70">{node.role}</span>
                    </div>
                    <div className="font-display text-lg text-ink">{node.label}</div>
                    <p className="font-sans text-xs text-ink-dim mt-1 leading-snug">
                      {node.sublabel}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </SystemWindow>
        </div>

        {/* Approach */}
        <SystemWindow title="03 // ENGINEERING APPROACH" jpTag="実装手順" glow="cyan">
          <div className="space-y-3">
            {quest.approach.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-panel-elevated/70 border border-white/10"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-sys shrink-0 mt-0.5" />
                <p className="font-sans text-sm text-ink/90 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </SystemWindow>

        {/* Verified Results */}
        <SystemWindow title="04 // VERIFIED RESULTS & METRICS" jpTag="成果指標" glow="amber">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
            {quest.results.map((res) => (
              <div key={res.label} className="p-4 bg-black/60 border border-amber-sys/40">
                <div className="text-xs text-ink-dim uppercase">{res.label}</div>
                <div className="font-display text-2xl sm:text-3xl text-amber-sys mt-1 tracking-wide">
                  {res.value}
                </div>
              </div>
            ))}
          </div>
        </SystemWindow>

        {/* Media Slot (TODO placeholder for hardware/demos) */}
        <SystemWindow title="05 // HARDWARE & DEMO MEDIA SLOT" jpTag="記録映像" glow="none">
          <div className="p-8 border-2 border-dashed border-white/20 bg-black/40 text-center space-y-2 font-mono">
            <ImageIcon className="w-8 h-8 text-ink-dim mx-auto" />
            <div className="text-xs text-amber-sys font-bold uppercase">[ MEDIA PLACEHOLDER ]</div>
            <p className="text-xs text-ink-dim max-w-xl mx-auto">{quest.mediaSlotTodo}</p>
          </div>
        </SystemWindow>

        {/* Links Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-12 font-mono text-xs">
          <Link
            href="/#quests"
            className="px-4 py-2.5 border border-white/20 text-ink hover:border-cyan-sys hover:text-cyan-sys transition-colors"
          >
            ← ALL QUESTS
          </Link>
          {quest.hasGithubLink && quest.githubUrl && (
            <a
              href={quest.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-powerup px-5 py-2.5 font-bold uppercase inline-flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>VIEW REPOSITORY ON GITHUB</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </main>
    </div>
  );
};
