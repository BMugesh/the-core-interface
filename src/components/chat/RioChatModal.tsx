'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Terminal as TerminalIcon } from 'lucide-react';
import { useSystem } from '@/lib/motionPrefs';
import { RioMascot } from '@/components/mascot/RioMascot';

interface ChatMessage {
  id: string;
  role: 'user' | 'rio';
  text: string;
}

const STARTER_CHIPS = [
  'What did he build at Appxcess?',
  'Explain the R.I.O. agent runtime',
  'Hackathon results',
  'Why hire him?',
];

export const RioChatModal: React.FC = () => {
  const { chatOpen, setChatOpen, mascotState, setMascotState, reducedMotion } = useSystem();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'rio',
      text: '[R.I.O. RUNTIME ACTIVE] Ask me anything about Bala Mugesh M K — projects, internships, edge-AI hardware, or verified metrics.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input on open & handle Escape
  useEffect(() => {
    if (!chatOpen) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setChatOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [chatOpen, setChatOpen]);

  // Auto-scroll chat log
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendQuery = async (queryText: string) => {
    const clean = queryText.trim();
    if (!clean || isStreaming) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: clean,
    };
    const rioMsgId = `r-${Date.now() + 1}`;
    setMessages((prev) => [...prev, userMsg, { id: rioMsgId, role: 'rio', text: '' }]);
    setInput('');
    setIsStreaming(true);
    setMascotState('thinking');

    try {
      const res = await fetch('/api/rio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: clean }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const errMsg =
          errData?.error || 'R.I.O. telemetry encountered an error. Please try again shortly.';
        setMessages((prev) =>
          prev.map((m) => (m.id === rioMsgId ? { ...m, text: `[SYSTEM ERROR] ${errMsg}` } : m))
        );
        setMascotState('alert');
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error('ReadableStream not available');
      }

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === rioMsgId ? { ...m, text: accumulated } : m))
        );
      }

      setMascotState('celebrate');
      window.setTimeout(() => setMascotState('idle'), 1600);
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === rioMsgId
            ? {
                ...m,
                text: '[FALLBACK] Unable to reach R.I.O. runtime endpoint. Please contact Bala directly at balamugesh.mk2023eee@sece.ac.in.',
              }
            : m
        )
      );
      setMascotState('alert');
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="R.I.O. AI Companion Chat & Command Palette"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9985] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setChatOpen(false);
          }}
        >
          <motion.div
            initial={reducedMotion ? false : { scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={reducedMotion ? undefined : { scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-panel border-2 border-cyan-sys shadow-sys-cyan clip-panel flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Header with live R.I.O. Mascot */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/15 bg-black/50 font-mono">
              <div className="flex items-center gap-3">
                <RioMascot state={isStreaming ? 'thinking' : mascotState} size={52} interactive={false} />
                <div>
                  <div className="flex items-center gap-2 text-xs text-cyan-sys font-bold tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>R.I.O. // LIVE SYSTEM ASSISTANT</span>
                  </div>
                  <p className="text-[10px] text-ink-dim">
                    GROUNDED RAG KNOWLEDGE BASE · ZERO HALLUCINATION POLICY
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label="Close R.I.O. Chat"
                className="p-1.5 border border-white/15 text-ink-dim hover:border-cyan-sys hover:text-cyan-sys transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Starter Chips */}
            <div className="px-4 py-2.5 border-b border-white/10 bg-black/30 flex flex-wrap gap-1.5 font-mono">
              {STARTER_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  disabled={isStreaming}
                  onClick={() => sendQuery(chip)}
                  className="px-2.5 py-1 text-[11px] bg-panel-elevated border border-cyan-sys/40 text-cyan-sys hover:bg-cyan-sys hover:text-bg transition-colors disabled:opacity-40"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Message Stream */}
            <div
              ref={scrollRef}
              aria-live="polite"
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[260px]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-magenta-sys/20 border border-magenta-sys/60 text-ink font-mono'
                        : 'bg-panel-elevated border border-cyan-sys/40 text-ink/95 font-sans'
                    }`}
                  >
                    {msg.role === 'rio' && (
                      <div className="font-mono text-[10px] text-cyan-sys font-bold mb-1">
                        R.I.O. // RESPONSE
                      </div>
                    )}
                    {msg.text || (isStreaming ? 'Syncing telemetry…' : '')}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendQuery(input);
              }}
              className="p-3 border-t border-white/15 bg-black/60 flex items-center gap-2 font-mono"
            >
              <TerminalIcon className="w-4 h-4 text-cyan-sys shrink-0 ml-1" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={350}
                placeholder="Ask R.I.O. about Bala's projects, metrics, or stack…"
                aria-label="Ask R.I.O. a question"
                className="flex-1 bg-transparent text-xs sm:text-sm text-ink placeholder:text-ink-dim focus:outline-none py-1.5"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="btn-powerup px-3.5 py-2 text-xs font-bold uppercase inline-flex items-center gap-1.5 disabled:opacity-40"
              >
                <span>SEND</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
