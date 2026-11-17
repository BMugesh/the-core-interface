'use client';

import React from 'react';
import { Sparkles, Terminal as TerminalIcon, Cpu } from 'lucide-react';
import { SystemWindow } from '@/components/system/SystemWindow';
import { DagScrub } from '@/components/system/DagScrub';
import { RioMascot } from '@/components/mascot/RioMascot';
import { useSystem } from '@/lib/motionPrefs';

export const RioSection: React.FC = () => {
  const { setChatOpen, setTerminalOpen, mascotState } = useSystem();

  return (
    <section
      id="rio"
      aria-label="R.I.O. Companion and Runtime Architecture"
      className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-sys/30 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-sys">
              <span className="w-2 h-2 bg-cyan-sys animate-pulse" />
              <span>[ R.I.O. // AUTONOMOUS COMPANION TERMINAL ]</span>
              <span className="font-jp text-ink-dim">対話端末</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-wide mt-1 uppercase">
              INTERACT WITH R.I.O. RUNTIME
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="btn-powerup px-4 py-2 font-bold uppercase inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>LAUNCH LIVE CHAT [CTRL+K]</span>
            </button>
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              className="px-3 py-2 border border-white/20 text-ink-dim hover:border-cyan-sys hover:text-cyan-sys transition-colors inline-flex items-center gap-1.5"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>SHELL [`]</span>
            </button>
          </div>
        </div>

        <SystemWindow
          title="R.I.O. AGENT ARCHITECTURE & LIVE TERMINAL"
          jpTag="自律実行"
          badge="300+ TESTS VALIDATED"
          systemTag="[ GROQ LLM + LOCAL RTX 4050 ROUTER ]"
          glow="cyan"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-3 flex flex-col items-center text-center p-4 bg-black/50 border border-white/10">
              <RioMascot state={mascotState} size={140} />
              <p className="font-mono text-[11px] text-cyan-sys mt-3">
                SERVER-SIDE GROQ + LOCAL BM25 RAG
              </p>
              <p className="font-sans text-xs text-ink-dim mt-1">
                Strictly grounded in verified profile records with per-IP rate limiting.
              </p>
              <button
                type="button"
                onClick={() => setChatOpen(true)}
                className="mt-4 w-full py-2 bg-cyan-sys/20 border border-cyan-sys text-cyan-sys font-mono text-xs font-bold hover:bg-cyan-sys hover:text-bg transition-colors"
              >
                ASK R.I.O. NOW
              </button>
            </div>

            <div className="lg:col-span-9 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-magenta-sys">
                <Cpu className="w-4 h-4" />
                <span>INTERACTIVE DAG ORCHESTRATION GRAPH (CLICK NODES TO INSPECT)</span>
              </div>
              <DagScrub />
            </div>
          </div>
        </SystemWindow>
      </div>
    </section>
  );
};
