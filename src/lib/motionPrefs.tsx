'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type MascotState = 'idle' | 'thinking' | 'alert' | 'celebrate';

interface SystemContextValue {
  reducedMotion: boolean;
  simpleMode: boolean;
  toggleSimpleMode: () => void;
  berserkMode: boolean;
  triggerBerserkMode: () => void;
  mascotState: MascotState;
  setMascotState: (state: MascotState) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  triggerHitStop: (id: string) => void;
  hitFlash: boolean;
  hitShake: boolean;
}

const SystemContext = createContext<SystemContextValue | null>(null);

const SIMPLE_MODE_KEY = 'rio_simple_mode';

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [berserkMode, setBerserkMode] = useState(false);
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  const [chatOpen, setChatOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [hitFlash, setHitFlash] = useState(false);
  const [hitShake, setHitShake] = useState(false);
  const [triggeredIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', onChange);

    try {
      const saved = window.localStorage.getItem(SIMPLE_MODE_KEY);
      if (saved === 'true') setSimpleMode(true);
    } catch {
      // Ignore storage failures in restricted environments
    }

    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-simple-mode', simpleMode ? 'true' : 'false');
  }, [simpleMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-berserk', berserkMode ? 'true' : 'false');
  }, [berserkMode]);

  const toggleSimpleMode = useCallback(() => {
    setSimpleMode((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(SIMPLE_MODE_KEY, String(next));
      } catch {
        // Ignore storage failures
      }
      return next;
    });
  }, []);

  const reducedMotion = prefersReduced || simpleMode;

  const triggerHitStop = useCallback(
    (id: string) => {
      if (reducedMotion || triggeredIds.has(id)) return;
      triggeredIds.add(id);
      setHitShake(true);
      setHitFlash(true);
      window.setTimeout(() => setHitFlash(false), 75);
      window.setTimeout(() => setHitShake(false), 115);
    },
    [reducedMotion, triggeredIds]
  );

  const triggerBerserkMode = useCallback(() => {
    setBerserkMode((prev) => !prev);
    setMascotState('alert');
    if (!reducedMotion) {
      setHitShake(true);
      setHitFlash(true);
      window.setTimeout(() => setHitFlash(false), 90);
      window.setTimeout(() => setHitShake(false), 140);
    }
    window.setTimeout(() => setMascotState('idle'), 2200);
  }, [reducedMotion]);

  // Global keyboard shortcuts: Ctrl/Cmd+K for R.I.O. chat, ` or / for hidden terminal, Konami code for Berserk
  useEffect(() => {
    const konami = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let konamiIdx = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K toggles R.I.O. Command Palette / Chat
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen(false);
        setChatOpen((prev) => !prev);
        return;
      }

      const tag = (e.target as HTMLElement | null)?.tagName;
      const isTyping =
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        (e.target as HTMLElement | null)?.isContentEditable;

      if (!isTyping && (e.key === '`' || e.key === '/')) {
        e.preventDefault();
        setChatOpen(false);
        setTerminalOpen((prev) => !prev);
        return;
      }

      // Konami sequence tracker
      const expected = konami[konamiIdx];
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        konamiIdx += 1;
        if (konamiIdx === konami.length) {
          konamiIdx = 0;
          triggerBerserkMode();
        }
      } else {
        konamiIdx = e.key === konami[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [triggerBerserkMode]);

  return (
    <SystemContext.Provider
      value={{
        reducedMotion,
        simpleMode,
        toggleSimpleMode,
        berserkMode,
        triggerBerserkMode,
        mascotState,
        setMascotState,
        chatOpen,
        setChatOpen,
        terminalOpen,
        setTerminalOpen,
        triggerHitStop,
        hitFlash,
        hitShake,
      }}
    >
      <div className={hitShake ? 'hit-stop-shake' : undefined}>{children}</div>
      {hitFlash && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9990] bg-white/15 mix-blend-difference"
        />
      )}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const ctx = useContext(SystemContext);
  if (!ctx) {
    throw new Error('useSystem must be used inside SystemProvider');
  }
  return ctx;
}
