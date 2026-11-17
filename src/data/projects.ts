import type { RankTier } from './skills';

export interface QuestMetric {
  label: string;
  value: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  role: 'input' | 'core' | 'decision' | 'verify' | 'output';
}

export interface ProjectQuest {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  year: string;
  rank: RankTier;
  status: 'CLEARED';
  summary: string;
  problem: string;
  approach: string[];
  results: QuestMetric[];
  stack: string[];
  architectureNodes: ArchitectureNode[];
  githubUrl?: string; // TODO: Add specific repository URLs if public
  hasGithubLink: boolean;
  mediaSlotTodo: string;
}

export const projects: ProjectQuest[] = [
  {
    slug: 'rio',
    code: 'QUEST // 01',
    title: 'R.I.O.',
    subtitle: 'Personal AI Runtime & Autonomous Agent System',
    year: '2025',
    rank: 'S',
    status: 'CLEARED',
    summary:
      'Autonomous agent runtime in Python that converts natural-language and voice goals into structured execution plans using LLM task reasoning, DAG orchestration, tool routing, verification, and failure recovery.',
    problem:
      'Bridging natural-language and persistent voice goals into reliable multi-step OS and computer automation requires strict permission boundaries between AI reasoning and system execution, alongside adaptive local/remote compute routing and verification.',
    approach: [
      'Converts natural-language and voice goals (Whisper STT) into structured execution plans via LLM task reasoning and DAG orchestration.',
      'Enforces permission boundaries separating AI reasoning from OS execution during multi-step computer automation.',
      'Implements adaptive routing across remote LLMs (Groq LLMs) and a local RTX 4050 GPU with resource-aware parallel execution.',
      'Applies evidence-based verification and failure recovery loops across every executed step.',
    ],
    results: [
      { label: 'Acceptance & Automated Tests', value: '300+' },
      { label: 'Quality Safeguards', value: 'LLM output-quality & hallucination checks' },
      { label: 'Local Compute Target', value: 'RTX 4050 GPU + CUDA' },
      { label: 'Interaction Mode', value: 'Persistent voice & natural-language' },
    ],
    stack: ['Python', 'Groq LLMs', 'Whisper STT', 'FastAPI', 'WebSockets', 'PyTorch', 'CUDA'],
    architectureNodes: [
      { id: 'goal', label: 'GOAL', sublabel: 'Voice (Whisper STT) / Natural Language', role: 'input' },
      { id: 'planner', label: 'PLANNER', sublabel: 'LLM Task Reasoning & DAG Synthesis', role: 'core' },
      { id: 'router', label: 'ROUTER', sublabel: 'Adaptive Groq Remote / RTX 4050 Local', role: 'decision' },
      { id: 'tools', label: 'TOOLS', sublabel: 'Permission-Bounded OS & API Execution', role: 'core' },
      { id: 'verifier', label: 'VERIFIER', sublabel: 'Evidence-Based Verification & Quality Checks', role: 'verify' },
      { id: 'recovery', label: 'RECOVERY', sublabel: 'Failure Handling & Plan Adaptation', role: 'decision' },
      { id: 'result', label: 'RESULT', sublabel: 'Verified Output (300+ Tests Validated)', role: 'output' },
    ],
    githubUrl: 'https://github.com/BMugesh', // TODO: Replace with direct R.I.O. repository URL
    hasGithubLink: true,
    mediaSlotTodo: 'TODO: Add R.I.O. runtime execution demo video / DAG execution capture.',
  },
  {
    slug: 'pmt',
    code: 'QUEST // 02',
    title: 'PMT Analytics Dashboard',
    subtitle: 'Appxcess Technologies Enterprise Reporting Platform',
    year: '2026',
    rank: 'S',
    status: 'CLEARED',
    summary:
      'Replaced a spreadsheet-based reporting process with a Python analytics backend (Flask, FastAPI microservices) and a Next.js frontend, cutting report turnaround from two days to three hours (93% reduction).',
    problem:
      'Spreadsheet-based enterprise reporting required two days of turnaround and heavy manual effort across internal stakeholders.',
    approach: [
      'Replaced manual spreadsheet pipelines with Python analytics microservices built on Flask and FastAPI.',
      'Built a responsive Next.js frontend integrated with a real-time Power BI dashboard.',
      'Optimized SQL queries using CTEs, window functions, aggregations, and joins for fast analytical rollups.',
    ],
    results: [
      { label: 'Report Turnaround Reduction', value: '93% (2 days → 3 hours)' },
      { label: 'Manual Reporting Effort Cut', value: '~70%' },
      { label: 'Internal Stakeholders', value: '50+' },
      { label: 'BI Delivery', value: 'Real-time Power BI Dashboard' },
    ],
    stack: ['Python', 'Flask', 'FastAPI', 'Next.js', 'SQL (CTEs & Window Functions)', 'Power BI'],
    architectureNodes: [
      { id: 'sources', label: 'RAW DATA', sublabel: 'Enterprise Operational Tables', role: 'input' },
      { id: 'sql', label: 'SQL ENGINE', sublabel: 'CTEs, Window Functions, Joins, Aggregations', role: 'core' },
      { id: 'services', label: 'MICROSERVICES', sublabel: 'Flask + FastAPI Analytics Layer', role: 'core' },
      { id: 'frontend', label: 'NEXT.JS UI', sublabel: 'Interactive Reporting Web App', role: 'verify' },
      { id: 'powerbi', label: 'POWER BI', sublabel: 'Real-time Dashboard for 50+ Stakeholders', role: 'output' },
    ],
    hasGithubLink: false,
    mediaSlotTodo: 'TODO: Add sanitized PMT Analytics Dashboard screenshot (with enterprise data redacted).',
  },
  {
    slug: 'consensusiq',
    code: 'QUEST // 03',
    title: 'ConsensusIQ',
    subtitle: 'Multi-Device AI Visual Inspection System',
    year: '2026',
    rank: 'A',
    status: 'CLEARED',
    summary:
      'Distributed inspection system for Qualcomm’s Snapdragon Multiverse Hackathon with inference split across edge and telemetry nodes, YOLOv11n trained on 33,000+ synthetic images (62,000+ defects), streaming live to FastAPI + React.',
    problem:
      'Industrial visual defect inspection requires high-throughput detection across constrained edge devices and telemetry nodes without sacrificing live operator visibility.',
    approach: [
      'Architected a distributed visual inspection pipeline splitting inference across edge and telemetry nodes for Qualcomm’s Snapdragon Multiverse Hackathon.',
      'Trained YOLOv11n on 33,000+ synthetic images covering 62,000+ annotated defects.',
      'Streamed live inspection results and defect telemetry to a FastAPI + React dashboard.',
    ],
    results: [
      { label: 'Synthetic Training Dataset', value: '33,000+ images' },
      { label: 'Labeled Defects Trained', value: '62,000+ defects' },
      { label: 'Model Architecture', value: 'YOLOv11n (Edge + Telemetry split)' },
      { label: 'Hackathon Milestone', value: 'Finalist — Snapdragon Multiverse (Qualcomm)' },
    ],
    stack: ['YOLOv11n', 'PyTorch', 'FastAPI', 'React', 'Snapdragon AI PC', 'Arduino UNO Q', 'Qualcomm AI Cloud 100'],
    architectureNodes: [
      { id: 'synthetic', label: 'SYNTHETIC DATA', sublabel: '33,000+ Images / 62,000+ Defects', role: 'input' },
      { id: 'edge', label: 'EDGE NODE', sublabel: 'YOLOv11n Inference on Edge Hardware', role: 'core' },
      { id: 'telemetry', label: 'TELEMETRY NODE', sublabel: 'Multi-Device Consensus & Sync', role: 'decision' },
      { id: 'stream', label: 'FASTAPI STREAM', sublabel: 'Live Inspection Event Pipeline', role: 'verify' },
      { id: 'dashboard', label: 'REACT DASHBOARD', sublabel: 'Real-Time Operator Visualization', role: 'output' },
    ],
    githubUrl: 'https://github.com/BMugesh', // TODO: Replace with direct ConsensusIQ repository URL
    hasGithubLink: true,
    mediaSlotTodo: 'TODO: Add real hardware photos/videos of Snapdragon AI PC, Arduino UNO Q, and live ConsensusIQ inspection feed.',
  },
  {
    slug: 'resolvetrace',
    code: 'QUEST // 04',
    title: 'ResolveTrace',
    subtitle: 'Historical Support Playbook & 3-State Decision Engine',
    year: '2026',
    rank: 'S',
    status: 'CLEARED',
    summary:
      'Mines Condition → Action → Outcome decision pathways from 28K+ reconstructed support conversations (SpotifyCares Twitter data): 1,545 pathways and a 3-state decision engine (auto-handle, escalate, unknown).',
    problem:
      'Pure semantic RAG systems frequently hallucinate or falsely auto-handle ambiguous customer support queries instead of escalating safely when state preconditions are unmet.',
    approach: [
      'Mined 1,545 Condition → Action → Outcome decision pathways from 28K+ reconstructed support conversations (SpotifyCares Twitter data).',
      'Engineered a 3-state decision engine (auto-handle, escalate, unknown) powered by a hybrid matcher combining TF-IDF retrieval with structured state compatibility.',
      'Benchmarked rigorously against a semantic RAG baseline on 212 gold test cases, paired with LLM-judge and human-annotated reply-quality evaluation.',
      'Added drift monitoring using rolling Jensen-Shannon divergence, FastAPI + Streamlit UI, and 19 unit tests.',
    ],
    results: [
      { label: 'Conversations Mined', value: '28K+ (1,545 pathways)' },
      { label: 'Pathway Accuracy (vs RAG)', value: '0.590 vs 0.524 (212 gold cases)' },
      { label: 'False Auto-Handling Cut', value: '11.8% → 5.0%' },
      { label: 'Verification & Drift', value: '19 unit tests + Rolling JSD' },
    ],
    stack: ['Python', 'TF-IDF', 'Structured State Matching', 'FastAPI', 'Streamlit', 'Jensen-Shannon Divergence', 'LLM-Judge'],
    architectureNodes: [
      { id: 'corpus', label: '28K+ THREADS', sublabel: 'Reconstructed SpotifyCares Data', role: 'input' },
      { id: 'miner', label: 'PATHWAY MINER', sublabel: '1,545 Condition → Action → Outcome Flows', role: 'core' },
      { id: 'matcher', label: 'HYBRID MATCHER', sublabel: 'TF-IDF + Structured State Compatibility', role: 'core' },
      { id: 'engine', label: '3-STATE ENGINE', sublabel: 'Auto-Handle | Escalate | Unknown', role: 'decision' },
      { id: 'drift', label: 'DRIFT & EVAL', sublabel: 'Rolling JSD + LLM-Judge + 19 Unit Tests', role: 'verify' },
      { id: 'ui', label: 'FASTAPI + STREAMLIT', sublabel: '0.590 Acc / 5.0% False Auto-Handle', role: 'output' },
    ],
    githubUrl: 'https://github.com/BMugesh', // TODO: Replace with direct ResolveTrace repository URL
    hasGithubLink: true,
    mediaSlotTodo: 'TODO: Add ResolveTrace Streamlit UI screenshot and pathway comparison chart.',
  },
];

export function getProjectBySlug(slug: string): ProjectQuest | undefined {
  return projects.find((p) => p.slug === slug);
}
