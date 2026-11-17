'use client';

import React from 'react';
import { Boot } from '@/components/sections/Boot';
import { TopHudNav } from '@/components/system/TopHudNav';
import { ProgressXP } from '@/components/fx/ProgressXP';
import { Cursor } from '@/components/fx/Cursor';
import { Hero } from '@/components/sections/Hero';
import { Status } from '@/components/sections/Status';
import { QuestLog } from '@/components/sections/QuestLog';
import { Titles } from '@/components/sections/Titles';
import { Guild } from '@/components/sections/Guild';
import { Inventory } from '@/components/sections/Inventory';
import { RioSection } from '@/components/sections/RioSection';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg text-ink overflow-x-hidden selection:bg-cyan-sys selection:text-bg">
      {/* Session boot sequence */}
      <Boot />

      {/* Fixed HUD elements */}
      <ProgressXP />
      <Cursor />

      {/* Top sticky navigation */}
      <TopHudNav />

      {/* System Window Sections */}
      <main id="main-content" className="relative z-10 space-y-8">
        <Hero />
        <Status />
        <QuestLog />
        <Titles />
        <Guild />
        <Inventory />
        <RioSection />
        <Contact />
      </main>

      {/* Footer System Status Bar */}
      <footer className="relative z-10 border-t border-cyan-sys/20 bg-panel/80 py-8 px-6 font-mono text-xs text-ink-dim">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-sys" />
            <span className="text-cyan-sys font-bold">R.I.O. SYSTEM ARCHITECTURE</span>
            <span>// FORWARD DEPLOYED AI</span>
          </div>
          <div>
            <span>OPERATOR: BALA MUGESH M K · </span>
            <span className="text-ink">SECE (2023–2027)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-black/60 px-2 py-1 border border-white/10">
              PRESS [`] OR [/] FOR SHELL
            </span>
            <span className="text-[10px] bg-cyan-sys/10 px-2 py-1 border border-cyan-sys/30 text-cyan-sys">
              CTRL+K FOR R.I.O.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
