'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { useSystem } from '@/lib/motionPrefs';
import { profile } from '@/data/profile';
import { skillCategories } from '@/data/skills';
import { projects } from '@/data/projects';

interface TermLine {
  id: string;
  type: 'cmd' | 'out' | 'err';
  text: string;
}

const HELP_TEXT = `AVAILABLE COMMANDS:
  help      Show this command list
  skills    Display player stat categories & stack
  quests    List cleared S/A-rank project quests
  resume    Trigger resume PDF download
  contact   Print verified email, phone, and GitHub
  rio       Launch interactive R.I.O. AI chat palette
  berserk   Toggle Berserk theme override
  clear     Clear terminal output
  exit      Close hidden terminal`;

export const SystemTerminal: React.FC = () => {
  const {
    terminalOpen,
    setTerminalOpen,
    setChatOpen,
    triggerBerserkMode,
    reducedMotion,
  } = useSystem();
  const [lines, setLines] = useState<TermLine[]>([
    {
      id: 'init',
      type: 'out',
      text: `R.I.O. HIDDEN SHELL v2.6 // TYPE 'help' FOR COMMANDS (PRESS ESC TO EXIT)`,
    },
  ]);
  const [cmd, setCmd] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalOpen) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTerminalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [terminalOpen, setTerminalOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const execute = (raw: string) => {
    const clean = raw.trim().toLowerCase();
    if (!clean) return;

    const push = (type: TermLine['type'], text: string) => {
      setLines((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, type, text }]);
    };

    push('cmd', `rio@system:~$ ${raw.trim()}`);
    setCmd('');

    switch (clean) {
      case 'help':
        push('out', HELP_TEXT);
        break;
      case 'skills':
        push(
          'out',
          skillCategories
            .map((s) => `[${s.rank}] ${s.label}: ${s.items.join(', ')}`)
            .join('\n')
        );
        break;
      case 'quests':
        push(
          'out',
          projects
            .map((p) => `[RANK ${p.rank}] ${p.title} (${p.year}) -> /quests/${p.slug}`)
            .join('\n')
        );
        break;
      case 'resume': {
        push('out', `Initiating download: ${profile.contact.resumePath}`);
        const a = document.createElement('a');
        a.href = profile.contact.resumePath;
        a.download = 'Bala_Mugesh_Resume.pdf';
        a.click();
        break;
      }
      case 'contact':
        push(
          'out',
          `NAME:   ${profile.name}\nEMAIL:  ${profile.contact.email}\nPHONE:  ${profile.contact.phone}\nGITHUB: ${profile.contact.github}`
        );
        break;
      case 'rio':
        setTerminalOpen(false);
        setChatOpen(true);
        break;
      case 'berserk':
        triggerBerserkMode();
        push('out', 'BERSERK MODE TOGGLED.');
        break;
      case 'clear':
        setLines([]);
        break;
      case 'exit':
        setTerminalOpen(false);
        break;
      default:
        push('err', `Unknown command: '${clean}'. Type 'help' to list valid commands.`);
    }
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Hidden R.I.O. System Terminal"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9986] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setTerminalOpen(false);
          }}
        >
          <div className="w-full max-w-2xl bg-[#04060c] border-2 border-cyan-sys shadow-sys-cyan font-mono flex flex-col max-h-[75vh]">
            <div className="flex items-center justify-between px-4 py-2.5 bg-panel border-b border-cyan-sys/40 text-xs text-cyan-sys">
              <div className="flex items-center gap-2 font-bold">
                <TerminalIcon className="w-4 h-4" />
                <span>[ HIDDEN TERMINAL // BACKTICK OR / ]</span>
              </div>
              <button
                type="button"
                onClick={() => setTerminalOpen(false)}
                aria-label="Close Terminal"
                className="text-ink-dim hover:text-cyan-sys"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto p-4 space-y-2 text-xs min-h-[240px] whitespace-pre-wrap"
            >
              {lines.map((l) => (
                <div
                  key={l.id}
                  className={
                    l.type === 'cmd'
                      ? 'text-magenta-sys font-bold'
                      : l.type === 'err'
                      ? 'text-red-400'
                      : 'text-ink/90'
                  }
                >
                  {l.text}
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                execute(cmd);
              }}
              className="flex items-center gap-2 px-4 py-2.5 border-t border-white/15 bg-black text-xs"
            >
              <span className="text-cyan-sys font-bold">rio@system:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={cmd}
                onChange={(e) => setCmd(e.target.value)}
                placeholder="help | skills | quests | resume | contact | rio"
                aria-label="Terminal command input"
                className="flex-1 bg-transparent text-ink placeholder:text-ink-dim/60 focus:outline-none"
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
