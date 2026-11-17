'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Download, Sparkles, ChevronDown, ShieldCheck } from 'lucide-react';
import { profile } from '@/data/profile';
import { SystemWindow } from '@/components/system/SystemWindow';
import { RankBadge } from '@/components/system/RankBadge';
import { RioMascot } from '@/components/mascot/RioMascot';
import { ScrambleText } from '@/components/fx/ScrambleText';
import { GlitchText } from '@/components/fx/GlitchText';
import { CountUp } from '@/components/fx/CountUp';
import { SpeedLines } from '@/components/fx/SpeedLines';
import { Halftone } from '@/components/fx/Halftone';
import { useSystem } from '@/lib/motionPrefs';

const HoloCore3D = dynamic(() => import('@/components/fx/HoloCore3D'), {
  ssr: false,
  loading: () => null,
});

export const Hero: React.FC = () => {
  const { reducedMotion, berserkMode, mascotState, setMascotState, setChatOpen } = useSystem();
  const [typedTagline, setTypedTagline] = useState(profile.tagline);
  const [show3D, setShow3D] = useState(false);

  // Enable lightweight 3D core only on desktop when reducedMotion is off
  useEffect(() => {
    if (reducedMotion) {
      setShow3D(false);
      return;
    }
    const isDesktop = window.innerWidth >= 1024;
    setShow3D(isDesktop);
  }, [reducedMotion]);

  // Subtle typewriter effect on mount unless reducedMotion
  useEffect(() => {
    if (reducedMotion) {
      setTypedTagline(profile.tagline);
      return;
    }
    let idx = 0;
    setTypedTagline('');
    const interval = window.setInterval(() => {
      idx += 2;
      setTypedTagline(profile.tagline.slice(0, idx));
      if (idx >= profile.tagline.length) {
        setTypedTagline(profile.tagline);
        window.clearInterval(interval);
      }
    }, 20);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      aria-label="Player Profile Hero"
      className="relative min-h-[90vh] flex items-center py-10 md:py-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background manga speed lines & halftone */}
      <SpeedLines opacity={0.45} />
      <Halftone opacity={0.22} />

      {/* Lightweight dynamic R3F Holographic Core (desktop + full motion only) */}
      {show3D && (
        <div
          aria-hidden="true"
          className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-55 pointer-events-none z-0"
        >
          <HoloCore3D berserk={berserkMode} />
        </div>
      )}

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Player Status Card */}
          <div className="lg:col-span-8">
            <SystemWindow
              title="PLAYER PROFILE"
              jpTag="起動"
              badge="AWAKENED"
              systemTag={`[ ${profile.systemId} ]`}
              glow="cyan"
            >
              <div className="space-y-6">
                {/* Identity Row */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <RankBadge rank="S" size="sm" showLabel />
                  <span className="px-2 py-0.5 bg-cyan-sys/10 border border-cyan-sys/40 text-cyan-sys">
                    CLASS: {profile.classTitle.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    PERMISSION BOUNDARY: ARMED
                  </span>
                </div>

                {/* Display Name with Scramble + Glitch Hover */}
                <div>
                  <p className="font-mono text-xs text-ink-dim tracking-[0.25em] uppercase mb-1">
                    PLAYER DESIGNATION // {profile.education.institution.toUpperCase()}
                  </p>
                  <GlitchText as="div">
                    <ScrambleText
                      as="h1"
                      text={profile.name}
                      triggerOnView={false}
                      className="font-display text-5xl sm:text-6xl md:text-7xl tracking-wider uppercase text-ink leading-none"
                    />
                  </GlitchText>
                  <p className="font-mono text-base sm:text-lg text-magenta-sys font-bold mt-2 tracking-wide">
                    &gt; {profile.classTitle}
                  </p>
                </div>

                {/* Typewriter Tagline */}
                <p className="font-sans text-sm sm:text-base text-ink/90 max-w-2xl leading-relaxed min-h-[48px]">
                  {typedTagline}
                  {!reducedMotion && typedTagline.length < profile.tagline.length && (
                    <span className="inline-block w-2 h-4 ml-1 bg-cyan-sys animate-pulse align-middle" />
                  )}
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setChatOpen(true)}
                    onMouseEnter={() => setMascotState('thinking')}
                    onMouseLeave={() => setMascotState('idle')}
                    className="btn-powerup px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>ASK R.I.O. [CTRL+K]</span>
                  </button>

                  <a
                    href={profile.contact.resumePath}
                    download
                    onMouseEnter={() => setMascotState('celebrate')}
                    onMouseLeave={() => setMascotState('idle')}
                    className="px-5 py-3 bg-magenta-sys text-bg border-2 border-black shadow-manga-hard font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD RESUME</span>
                  </a>

                  <a
                    href="#quests"
                    className="px-4 py-3 border border-white/20 text-ink-dim font-mono text-xs uppercase tracking-wider hover:border-cyan-sys hover:text-cyan-sys transition-colors flex items-center gap-1.5"
                  >
                    <span>ENTER QUEST LOG</span>
                    <ChevronDown className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </SystemWindow>
          </div>

          {/* Right Column: R.I.O. Companion Panel */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <SystemWindow
              title="COMPANION CORE"
              jpTag="相棒"
              systemTag="[ R.I.O. // LIVE ]"
              glow="magenta"
              className="w-full flex flex-col items-center text-center"
            >
              <div
                onClick={() => setChatOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setChatOpen(true);
                  }
                }}
                onMouseEnter={() => setMascotState('alert')}
                onMouseLeave={() => setMascotState('idle')}
                className="cursor-pointer py-2 flex flex-col items-center"
                aria-label="Click to open R.I.O. AI chat"
              >
                <RioMascot state={mascotState} size={170} />
                <p className="mt-4 font-mono text-xs text-cyan-sys uppercase tracking-wider">
                  &quot;System synced. Ask me about Bala&apos;s builds.&quot;
                </p>
                <span className="mt-2 px-3 py-1 bg-black/60 border border-cyan-sys/40 font-mono text-[10px] text-ink-dim">
                  CLICK AVATAR OR PRESS CTRL+K
                </span>
              </div>
            </SystemWindow>
          </div>
        </div>

        {/* Verified Headline Metrics Bar */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.headlineMetrics.map((metric) => (
            <div
              key={metric.id}
              className="manga-card p-4 font-mono relative overflow-hidden group hover:border-cyan-sys transition-colors"
            >
              <div className="text-[10px] text-cyan-sys tracking-widest uppercase">
                {metric.label}
              </div>
              <div className="font-display text-3xl sm:text-4xl text-ink mt-1 tracking-wide">
                <CountUp
                  target={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  hitStopId={`hero-${metric.id}`}
                />
              </div>
              <div className="text-[11px] font-sans text-ink-dim mt-1">{metric.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
