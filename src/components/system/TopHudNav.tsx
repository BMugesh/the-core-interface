'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal as TerminalIcon, Sparkles, Download, Zap, EyeOff } from 'lucide-react';
import { profile } from '@/data/profile';
import { useSystem } from '@/lib/motionPrefs';

const NAV_LINKS = [
  { href: '/#status', label: 'STATUS', jp: '状態' },
  { href: '/#quests', label: 'QUESTS', jp: '任務' },
  { href: '/#titles', label: 'TITLES', jp: '称号' },
  { href: '/#guild', label: 'GUILD', jp: '経歴' },
  { href: '/#inventory', label: 'ITEMS', jp: '装備' },
  { href: '/#contact', label: 'SUMMON', jp: '召喚' },
];

export const TopHudNav: React.FC = () => {
  const { simpleMode, toggleSimpleMode, berserkMode, setChatOpen, setTerminalOpen } = useSystem();

  return (
    <header className="sticky top-1 z-40 mx-auto max-w-7xl px-3 sm:px-6 pt-2">
      <nav
        aria-label="Primary System Navigation"
        className="flex flex-wrap items-center justify-between gap-2 bg-panel/90 backdrop-blur-md border border-cyan-sys/40 px-3 sm:px-4 py-2 shadow-sys-cyan"
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-cyan-sys hover:text-ink transition-colors"
        >
          <span className="w-2 h-2 bg-cyan-sys" />
          <span>R.I.O. // SYS</span>
          {berserkMode && (
            <span className="px-1.5 py-0.5 text-[9px] bg-red-600 text-white">BERSERK</span>
          )}
        </Link>

        {/* Section links (desktop) */}
        <div className="hidden lg:flex items-center gap-4 font-mono text-[11px]">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-1 text-ink-dim hover:text-cyan-sys transition-colors"
            >
              <span>{item.label}</span>
              <span className="font-jp text-[9px] opacity-50 group-hover:opacity-100">
                {item.jp}
              </span>
            </Link>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-cyan-sys/15 border border-cyan-sys text-cyan-sys font-bold hover:bg-cyan-sys hover:text-bg transition-colors"
            title="Ask R.I.O. AI Assistant (Ctrl+K)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ASK R.I.O.</span>
            <kbd className="hidden sm:inline-block ml-1 px-1 text-[9px] border border-current opacity-80">
              Ctrl+K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setTerminalOpen(true)}
            className="hidden sm:flex items-center gap-1 px-2 py-1.5 border border-white/15 text-ink-dim hover:border-cyan-sys hover:text-cyan-sys transition-colors"
            title="Open System Terminal (` or /)"
            aria-label="Open System Terminal"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
          </button>

          <a
            href={profile.contact.resumePath}
            download
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-magenta-sys/15 border border-magenta-sys text-magenta-sys font-bold hover:bg-magenta-sys hover:text-bg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESUME</span>
          </a>

          <button
            type="button"
            onClick={toggleSimpleMode}
            aria-pressed={simpleMode}
            className={`flex items-center gap-1 px-2 py-1.5 border text-[10px] font-bold transition-colors ${
              simpleMode
                ? 'border-amber-sys bg-amber-sys/20 text-amber-sys'
                : 'border-white/15 text-ink-dim hover:border-white/40 hover:text-ink'
            }`}
            title="Toggle Simple Mode / Skip Animations"
          >
            {simpleMode ? <EyeOff className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
            <span className="hidden md:inline">{simpleMode ? 'SIMPLE ON' : 'SIMPLE MODE'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
