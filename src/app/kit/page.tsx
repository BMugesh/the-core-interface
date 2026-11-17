'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SystemWindow } from '@/components/system/SystemWindow';
import { RankBadge } from '@/components/system/RankBadge';
import { StatBar } from '@/components/system/StatBar';
import { ClearedStamp } from '@/components/system/ClearedStamp';
import { TitleToast } from '@/components/system/TitleToast';
import { RioMascot } from '@/components/mascot/RioMascot';
import { ScrambleText } from '@/components/fx/ScrambleText';
import { GlitchText } from '@/components/fx/GlitchText';
import { CountUp } from '@/components/fx/CountUp';
import { Halftone } from '@/components/fx/Halftone';
import { SpeedLines } from '@/components/fx/SpeedLines';
import { Cursor } from '@/components/fx/Cursor';
import { ProgressXP } from '@/components/fx/ProgressXP';
import { useSystem } from '@/lib/motionPrefs';
import type { MascotState } from '@/lib/motionPrefs';

export default function SystemKitPage() {
  const { simpleMode, toggleSimpleMode, berserkMode, triggerBerserkMode } = useSystem();
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="relative min-h-screen bg-bg text-ink p-4 md:p-8 font-mono overflow-hidden">
      <ProgressXP />
      <Cursor />
      <Halftone opacity={0.2} />
      <SpeedLines opacity={0.25} />

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        {/* Navigation & Control Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-panel border border-cyan-sys/50">
          <div>
            <span className="text-[10px] text-cyan-sys tracking-widest uppercase">
              [ SYSTEM UI KIT PREVIEW ]
            </span>
            <h1 className="font-display text-3xl tracking-wide uppercase">
              <ScrambleText text="SYSTEM WINDOW COMPONENT SUITE" />
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSimpleMode}
              className="px-3 py-1.5 text-xs font-bold border border-white/20 hover:border-cyan-sys transition-colors"
            >
              SIMPLE MODE: {simpleMode ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={triggerBerserkMode}
              className="px-3 py-1.5 text-xs font-bold border border-amber-sys text-amber-sys hover:bg-amber-sys hover:text-bg transition-colors"
            >
              BERSERK: {berserkMode ? 'ACTIVE' : 'READY'}
            </button>
            <Link
              href="/"
              className="px-3 py-1.5 text-xs font-bold bg-cyan-sys text-bg hover:opacity-90 transition-opacity"
            >
              RETURN HOME
            </Link>
          </div>
        </div>

        {/* Section 1: R.I.O. Mascot States */}
        <SystemWindow title="MASCOT: R.I.O. AI AVATAR" jpTag="自律知能">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-ink-dim">SWITCH STATE:</span>
              {(['idle', 'thinking', 'alert', 'celebrate'] as MascotState[]).map((st) => (
                <button
                  key={st}
                  onClick={() => setMascotState(st)}
                  className={`px-3 py-1 text-xs uppercase font-bold border ${
                    mascotState === st
                      ? 'border-cyan-sys bg-cyan-sys/20 text-cyan-sys'
                      : 'border-white/10 hover:border-white/40'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-black/40 border border-white/10 items-center justify-items-center">
              <div className="text-center">
                <RioMascot state="idle" size={130} />
                <p className="mt-2 text-xs text-cyan-sys font-bold">STATE: IDLE</p>
              </div>
              <div className="text-center">
                <RioMascot state="thinking" size={130} />
                <p className="mt-2 text-xs text-magenta-sys font-bold">STATE: THINKING</p>
              </div>
              <div className="text-center">
                <RioMascot state="alert" size={130} />
                <p className="mt-2 text-xs text-amber-sys font-bold">STATE: ALERT</p>
              </div>
              <div className="text-center">
                <RioMascot state="celebrate" size={130} />
                <p className="mt-2 text-xs text-emerald-400 font-bold">STATE: CELEBRATE</p>
              </div>
            </div>
          </div>
        </SystemWindow>

        {/* Section 2: Rank Badges & Cleared Stamps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SystemWindow title="RANK BADGES (E–S)" jpTag="階級" glow="cyan">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                {(['S', 'A', 'B', 'C', 'D', 'E'] as const).map((r) => (
                  <RankBadge key={r} rank={r} size="md" />
                ))}
              </div>
              <div className="space-y-2 pt-2 border-t border-white/10">
                <RankBadge rank="S" size="sm" showLabel />
                <RankBadge rank="A" size="sm" showLabel />
                <RankBadge rank="B" size="sm" showLabel />
              </div>
            </div>
          </SystemWindow>

          <SystemWindow title="STAMP & HIT-STOP FX" jpTag="討伐完了" glow="amber">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 items-center">
                <ClearedStamp stampId="demo-stamp-1" size="md" />
                <ClearedStamp stampId="demo-stamp-2" size="sm" />
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setShowToast(true)}
                  className="px-4 py-2 bg-amber-sys/20 border border-amber-sys text-amber-sys text-xs font-bold hover:bg-amber-sys hover:text-bg transition-colors"
                >
                  TRIGGER &quot;TITLE ACQUIRED&quot; TOAST
                </button>
              </div>
            </div>
          </SystemWindow>
        </div>

        {/* Section 3: Stat Bars & Counters */}
        <SystemWindow title="STAT BARS // STAT CODE & EVIDENCE" jpTag="状態数値" glow="magenta">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatBar
              label="Agents & LLMs"
              jpLabel="自律知能"
              statCode="INT // AGT"
              rank="S"
              value={95}
              evidenceNote="R.I.O. autonomous runtime + CODEBOOSTER LangChain RAG & tool-calling"
              items={['LangChain', 'Groq', 'AutoGen', 'RAG', 'Prompt Engineering']}
            />
            <StatBar
              label="Languages"
              jpLabel="言語"
              statCode="STR // LNG"
              rank="S"
              value={92}
              evidenceNote="Python (Advanced) across AI runtimes, FastAPI/Flask, PyTorch"
              items={['Python (Advanced)', 'C++']}
            />
            <StatBar
              label="AI/ML & Vision"
              jpLabel="視覚推論"
              statCode="PER // VIS"
              rank="S"
              value={90}
              evidenceNote="YOLOv11n on 33,000+ images, ResNet-50 edge CV"
              items={['PyTorch', 'YOLOv11n', 'ResNet-50', 'Transformers']}
            />
            <StatBar
              label="Systems & Edge"
              jpLabel="辺縁機器"
              statCode="VIT // EDG"
              rank="A"
              value={86}
              evidenceNote="Snapdragon AI PC, Raspberry Pi 5, Arduino UNO Q"
              items={['Snapdragon AI PC', 'Raspberry Pi 5', 'Arduino UNO Q', 'AWS EC2']}
            />
          </div>
        </SystemWindow>

        {/* Section 4: Headline Metric Counters & FX */}
        <SystemWindow title="HEADLINE METRICS & TEXT FX" jpTag="実績計測">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-black/40 border border-white/10">
              <div className="font-display text-4xl text-cyan-sys">
                <CountUp target={93} suffix="%" hitStopId="count-93" />
              </div>
              <div className="text-[10px] text-ink-dim mt-1 font-bold">TURNAROUND CUT</div>
            </div>
            <div className="p-4 bg-black/40 border border-white/10">
              <div className="font-display text-4xl text-magenta-sys">
                <CountUp target={300} suffix="+" hitStopId="count-300" />
              </div>
              <div className="text-[10px] text-ink-dim mt-1 font-bold">VERIFICATION TESTS</div>
            </div>
            <div className="p-4 bg-black/40 border border-white/10">
              <div className="font-display text-4xl text-amber-sys">
                <CountUp target={33000} suffix="+" hitStopId="count-33k" />
              </div>
              <div className="text-[10px] text-ink-dim mt-1 font-bold">SYNTHETIC IMAGES</div>
            </div>
            <div className="p-4 bg-black/40 border border-white/10">
              <div className="font-display text-4xl text-emerald-400">
                <CountUp target={1545} hitStopId="count-1545" />
              </div>
              <div className="text-[10px] text-ink-dim mt-1 font-bold">DECISION PATHWAYS</div>
            </div>
          </div>

          <div className="mt-6 p-4 border border-white/10 bg-black/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-ink-dim uppercase">GLITCH HOVER DEMO:</p>
              <GlitchText as="h3" className="font-display text-2xl text-ink">
                HOVER FOR CHROMATIC ABERRATION
              </GlitchText>
            </div>
            <button className="btn-powerup px-5 py-2 font-display text-sm uppercase tracking-wider">
              POWER-UP CHARGE BUTTON
            </button>
          </div>
        </SystemWindow>
      </div>

      <TitleToast
        titleName="MULTIVERSE ARCHITECT"
        event="Snapdragon Multiverse Hackathon (Qualcomm)"
        badge="FINALIST"
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
