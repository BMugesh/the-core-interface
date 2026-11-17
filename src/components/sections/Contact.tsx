'use client';

import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Download, Send, CheckCircle2, Copy } from 'lucide-react';
import { profile } from '@/data/profile';
import { SystemWindow } from '@/components/system/SystemWindow';
import { Halftone } from '@/components/fx/Halftone';
import { useSystem } from '@/lib/motionPrefs';

export const Contact: React.FC = () => {
  const { setMascotState } = useSystem();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setMascotState('celebrate');
    window.setTimeout(() => {
      setCopied(null);
      setMascotState('idle');
    }, 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Summon and Contact Portal"
      className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
    >
      <Halftone opacity={0.2} />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-sys/30 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-sys">
              <span className="w-2 h-2 bg-cyan-sys" />
              <span>[ SECTION 06 // SUMMON PORTAL ]</span>
              <span className="font-jp text-ink-dim">召喚交信</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-wide mt-1 uppercase">
              TRANSMIT REQUEST // SUMMON PLAYER
            </h2>
          </div>
          <div className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>CHANNEL OPEN &amp; LISTENING</span>
          </div>
        </div>

        <SystemWindow
          title="COMMUNICATION TRANSMITTER"
          jpTag="召喚通信"
          systemTag="[ FREQUENCY: BALA MUGESH M K ]"
          glow="cyan"
          variant="manga"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start font-mono">
            {/* Direct Channels */}
            <div className="space-y-4">
              <p className="font-sans text-xs sm:text-sm text-ink-dim leading-relaxed">
                Direct transmission line for engineering roles, AI agent development, and systems
                collaboration. Connect via institutional email, phone, or code repositories.
              </p>

              {/* Email channel */}
              <div className="p-3 bg-panel-elevated border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-cyan-sys uppercase">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    INSTITUTIONAL EMAIL
                  </span>
                  <button
                    onClick={() => copyToClipboard(profile.contact.email, 'email')}
                    className="flex items-center gap-1 hover:text-ink text-ink-dim transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied === 'email' ? 'COPIED!' : 'COPY'}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="font-mono text-xs sm:text-sm text-ink hover:text-cyan-sys transition-colors block truncate"
                >
                  {profile.contact.email}
                </a>
              </div>

              {/* Phone channel */}
              <div className="p-3 bg-panel-elevated border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-magenta-sys uppercase">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    VOICE / TELEMETRY LINE
                  </span>
                  <button
                    onClick={() => copyToClipboard(profile.contact.phone, 'phone')}
                    className="flex items-center gap-1 hover:text-ink text-ink-dim transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied === 'phone' ? 'COPIED!' : 'COPY'}</span>
                  </button>
                </div>
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="font-mono text-xs sm:text-sm text-ink hover:text-magenta-sys transition-colors block"
                >
                  {profile.contact.phone}
                </a>
              </div>

              {/* Verified Links */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/60 border border-white/15 hover:border-cyan-sys text-center flex items-center justify-center gap-2 text-xs font-bold text-ink hover:text-cyan-sys transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB</span>
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/60 border border-white/15 hover:border-cyan-sys text-center flex items-center justify-center gap-2 text-xs font-bold text-ink hover:text-cyan-sys transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>

            {/* Resume & Dispatch Card */}
            <div className="p-5 bg-panel-elevated border border-cyan-sys/40 space-y-4">
              <div className="text-xs text-cyan-sys font-bold tracking-widest uppercase">
                [ PLAYER SPECIFICATION DISPATCH ]
              </div>
              <h3 className="font-display text-2xl text-ink uppercase tracking-wide">
                FORWARD DEPLOYED AI ENGINEER
              </h3>
              <p className="font-sans text-xs text-ink-dim leading-relaxed">
                Download verified resume artifact containing end-to-end project metrics, hackathon
                results, and engineering competencies.
              </p>

              <div className="pt-2">
                <a
                  href={profile.contact.resumePath}
                  download
                  className="btn-powerup w-full py-3 px-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD VERIFIED RESUME (PDF)</span>
                </a>
              </div>

              <div className="pt-2 text-[10px] text-ink-dim space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>VERIFIED RECORD: BALA MUGESH M K</span>
                </div>
                <div>SECE 2023–2027 · CGPA 7.6 · 150+ LeetCode Clear</div>
              </div>
            </div>
          </div>
        </SystemWindow>
      </div>
    </section>
  );
};
