'use client';

import React from 'react';
import { Award, Wrench, ShieldCheck, Box } from 'lucide-react';
import { certifications, toolItems } from '@/data/skills';
import { SystemWindow } from '@/components/system/SystemWindow';
import { Halftone } from '@/components/fx/Halftone';

export const Inventory: React.FC = () => {
  return (
    <section
      id="inventory"
      aria-label="Player Inventory and Tools"
      className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
    >
      <Halftone opacity={0.16} />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-sys/30 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-sys">
              <span className="w-2 h-2 bg-cyan-sys" />
              <span>[ SECTION 05 // INVENTORY &amp; CODEX ]</span>
              <span className="font-jp text-ink-dim">所持品一覧</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-wide mt-1 uppercase">
              ITEMS &amp; CERTIFICATIONS CODEX
            </h2>
          </div>
          <div className="font-mono text-xs text-ink-dim">
            4 CERTIFICATIONS // 7 TOOL RELICS
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Certifications ("Codex Items") */}
          <div className="lg:col-span-7 space-y-4">
            <SystemWindow
              title="CERTIFICATIONS CODEX"
              jpTag="資格文書"
              systemTag="[ CODEX // VERIFIED KNOWLEDGE ]"
              glow="cyan"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 bg-panel-elevated/80 border border-white/10 hover:border-cyan-sys/60 transition-colors font-mono relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1.5">
                      <span className="text-cyan-sys font-bold">{cert.slot}</span>
                      <span
                        className={`px-1.5 py-0.5 text-[9px] font-bold uppercase border ${
                          cert.rarity === 'EPIC'
                            ? 'bg-magenta-sys/20 text-magenta-sys border-magenta-sys/50'
                            : 'bg-cyan-sys/20 text-cyan-sys border-cyan-sys/50'
                        }`}
                      >
                        {cert.rarity}
                      </span>
                    </div>

                    <div className="font-sans font-semibold text-xs text-ink line-clamp-2 min-h-[32px]">
                      {cert.title}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-ink-dim mt-2 pt-2 border-t border-white/10">
                      <span>ISSUER: {cert.issuer.toUpperCase()}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
            </SystemWindow>
          </div>

          {/* Right Column: Tools & Utility Equipment */}
          <div className="lg:col-span-5 space-y-4">
            <SystemWindow
              title="TOOL ARSENAL"
              jpTag="装備具"
              systemTag="[ GEAR // PRODUCTION UTILITIES ]"
              glow="magenta"
            >
              <div className="space-y-4 font-mono text-xs">
                <p className="font-sans text-xs text-ink-dim">
                  Core runtime environments, deployment infrastructure, and orchestration utilities
                  utilized across AI agent and edge workflows.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {toolItems.map((tool) => (
                    <div
                      key={tool}
                      className="p-2.5 bg-black/60 border border-white/10 hover:border-magenta-sys/60 transition-colors flex items-center gap-2"
                    >
                      <Wrench className="w-3.5 h-3.5 text-magenta-sys shrink-0" />
                      <span className="text-ink font-semibold truncate">{tool}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-black/40 border border-white/10 text-[10px] space-y-1">
                  <div className="text-amber-sys font-bold">[ LEETCODE PROBLEM SOLVING ]</div>
                  <p className="text-ink-dim font-sans">
                    150+ LeetCode problems cleared focusing on Data Structures &amp; Algorithms
                    (Trees, Graphs, DP, Arrays, Heaps).
                  </p>
                </div>
              </div>
            </SystemWindow>
          </div>
        </div>
      </div>
    </section>
  );
};
