'use client';

import React from 'react';
import { GraduationCap, Award, BrainCircuit, Code, Terminal, Sparkles } from 'lucide-react';
import { profile } from '@/data/profile';
import { skillCategories } from '@/data/skills';
import { SystemWindow } from '@/components/system/SystemWindow';
import { StatBar } from '@/components/system/StatBar';
import { RankBadge } from '@/components/system/RankBadge';
import { Halftone } from '@/components/fx/Halftone';

export const Status: React.FC = () => {
  return (
    <section
      id="status"
      aria-label="Player Status Window"
      className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
    >
      <Halftone opacity={0.18} />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-sys/30 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-sys">
              <span className="w-2 h-2 bg-cyan-sys" />
              <span>[ SECTION 01 // STATUS SCREEN ]</span>
              <span className="font-jp text-ink-dim">状態画面</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-wide mt-1 uppercase">
              PLAYER STATUS &amp; STAT MATRIX
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 bg-black/60 border border-cyan-sys/50 text-cyan-sys">
              CLASS: FORWARD DEPLOYED AI
            </span>
            <RankBadge rank="S" size="sm" showLabel />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Player Core Specs & Education */}
          <div className="lg:col-span-4 space-y-6">
            <SystemWindow
              title="PLAYER STATS CORE"
              jpTag="個人情報"
              systemTag="[ SPECIFICATION // V2.6 ]"
              glow="cyan"
            >
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3 bg-panel-elevated border border-white/10 space-y-1.5">
                  <div className="text-ink-dim text-[10px] uppercase">PLAYER NAME</div>
                  <div className="font-display text-2xl text-ink tracking-wider">
                    {profile.name}
                  </div>
                  <div className="text-magenta-sys font-bold">&gt; {profile.classTitle}</div>
                </div>

                <div className="p-3 bg-panel-elevated border border-white/10 space-y-2">
                  <div className="flex items-center gap-1.5 text-cyan-sys font-bold">
                    <GraduationCap className="w-4 h-4" />
                    <span>GUILD ACADEMY // EDUCATION</span>
                  </div>
                  <div className="text-ink font-semibold">{profile.education.degree}</div>
                  <div className="text-ink-dim text-[11px]">{profile.education.institution}</div>
                  <div className="flex justify-between items-center pt-1 border-t border-white/10 text-[11px]">
                    <span className="text-ink-dim">PERIOD: {profile.education.period}</span>
                    <span className="px-2 py-0.5 bg-cyan-sys/20 text-cyan-sys font-bold border border-cyan-sys/40">
                      CGPA {profile.education.cgpa}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-panel-elevated border border-white/10 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-sys font-bold">
                    <BrainCircuit className="w-4 h-4" />
                    <span>SYSTEM ARCHITECTURE SUMMARY</span>
                  </div>
                  <p className="font-sans text-[11px] text-ink-dim leading-relaxed">
                    Autonomous Python agent runtimes with OS permission barriers, distributed edge-AI
                    computer vision (YOLOv11n, ResNet-50), and optimized SQL analytics backends.
                  </p>
                </div>

                <div className="p-3 bg-black/60 border border-white/10 text-[10px] space-y-1">
                  <div className="text-cyan-sys font-bold">[ GAMIFIED STAT CONVENTION ]</div>
                  <p className="text-ink-dim font-sans leading-tight">
                    Stat codes, tiers (E–S), and bars reflect evidenced competencies. All metrics
                    are grounded in verified project results.
                  </p>
                </div>
              </div>
            </SystemWindow>
          </div>

          {/* Right Column: Stat Bars (Skills) */}
          <div className="lg:col-span-8 space-y-4">
            <SystemWindow
              title="SKILL ATTRIBUTE MATRIX"
              jpTag="能力値"
              systemTag="[ ATTRIBUTES // 6 ACTIVE CATEGORIES ]"
              glow="magenta"
            >
              <div className="space-y-3">
                {skillCategories.map((cat) => (
                  <StatBar
                    key={cat.id}
                    label={cat.label}
                    jpLabel={cat.jpLabel}
                    statCode={cat.statCode}
                    rank={cat.rank}
                    value={cat.stylisticPower}
                    evidenceNote={cat.evidenceNote}
                    items={cat.items}
                  />
                ))}
              </div>
            </SystemWindow>
          </div>
        </div>
      </div>
    </section>
  );
};
