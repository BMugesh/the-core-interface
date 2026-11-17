'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { projects } from '@/data/projects';
import { useSystem } from '@/lib/motionPrefs';

export const DagScrub: React.FC = () => {
  const { reducedMotion } = useSystem();
  const rioProject = projects.find((p) => p.slug === 'rio');
  const nodes = rioProject?.architectureNodes ?? [];
  const [activeStep, setActiveStep] = useState(nodes.length - 1);

  return (
    <div className="space-y-6 font-mono">
      {/* Interactive Node Scrubber Control */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-panel-elevated border border-white/10 text-xs">
        <div className="flex items-center gap-2 text-cyan-sys font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>R.I.O. DAG EXECUTION SCRUBBER</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
          {nodes.map((node, idx) => (
            <button
              key={node.id}
              onClick={() => setActiveStep(idx)}
              className={`px-2 py-1 text-[10px] uppercase font-bold border transition-colors ${
                idx <= activeStep
                  ? 'border-cyan-sys bg-cyan-sys/20 text-cyan-sys'
                  : 'border-white/10 text-ink-dim hover:border-white/30'
              }`}
            >
              {idx + 1}. {node.label}
            </button>
          ))}
          <button
            onClick={() => setActiveStep(nodes.length - 1)}
            className="px-2 py-1 text-[10px] bg-magenta-sys/20 text-magenta-sys border border-magenta-sys/40 font-bold"
          >
            RUN ALL
          </button>
        </div>
      </div>

      {/* SVG DAG Visualizer */}
      <div className="relative p-6 bg-black/70 border border-cyan-sys/40 clip-panel overflow-x-auto">
        <div className="min-w-[720px] flex items-center justify-between gap-2 relative">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-white/15 z-0"
          />
          <div
            aria-hidden="true"
            className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-cyan-sys transition-all duration-300 z-0"
            style={{
              width: `${(activeStep / (nodes.length - 1)) * 92}%`,
              boxShadow: '0 0 10px #00e5ff',
            }}
          />

          {nodes.map((node, idx) => {
            const isPassed = idx <= activeStep;
            const isCurrent = idx === activeStep;

            return (
              <motion.div
                key={node.id}
                animate={isCurrent && !reducedMotion ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: isCurrent ? Infinity : 0 }}
                className={`relative z-10 flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
                  isPassed ? 'opacity-100' : 'opacity-40'
                }`}
                onClick={() => setActiveStep(idx)}
              >
                {/* Node Glyph */}
                <div
                  className={`w-12 h-12 flex items-center justify-center border-2 font-display text-base transition-all duration-200 ${
                    isCurrent
                      ? 'border-cyan-sys bg-cyan-sys text-bg shadow-[0_0_16px_#00e5ff]'
                      : isPassed
                      ? 'border-cyan-sys bg-panel text-cyan-sys'
                      : 'border-white/20 bg-panel text-ink-dim'
                  }`}
                >
                  0{idx + 1}
                </div>

                <div className="mt-2 font-display text-sm tracking-wider uppercase text-ink">
                  {node.label}
                </div>
                <div className="text-[10px] text-cyan-sys font-mono max-w-[100px] leading-tight">
                  {node.sublabel.split(' ')[0]}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active Node Detail Card */}
      <div className="p-4 bg-panel border border-cyan-sys/50 font-mono text-xs">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
          <span className="text-cyan-sys font-bold">
            ACTIVE NODE: {nodes[activeStep]?.label} [ROLE: {nodes[activeStep]?.role.toUpperCase()}]
          </span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            EVIDENCE VERIFIED
          </span>
        </div>
        <p className="font-sans text-xs text-ink/90 leading-relaxed">
          {nodes[activeStep]?.sublabel}
        </p>
      </div>
    </div>
  );
};
