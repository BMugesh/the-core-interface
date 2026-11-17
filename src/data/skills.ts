export type RankTier = 'S' | 'A' | 'B' | 'C' | 'D' | 'E';

export interface SkillCategory {
  id: string;
  statCode: string;
  label: string;
  jpLabel: string;
  rank: RankTier;
  /** Stylistic bar fill (0–100), strictly decorative and derived from evidence */
  stylisticPower: number;
  evidenceNote: string;
  items: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  rarity: 'EPIC' | 'RARE';
  slot: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'agents-llms',
    statCode: 'INT // AGT',
    label: 'Agents & LLMs',
    jpLabel: '自律知能',
    rank: 'S',
    stylisticPower: 95,
    evidenceNote: 'R.I.O. autonomous runtime + CODEBOOSTER LangChain RAG & tool-calling',
    items: [
      'LangChain',
      'Groq',
      'AutoGen',
      'RAG',
      'Prompt Engineering',
      'System-Level Task Automation',
    ],
  },
  {
    id: 'languages',
    statCode: 'STR // LNG',
    label: 'Languages',
    jpLabel: '言語',
    rank: 'S',
    stylisticPower: 92,
    evidenceNote: 'Python (Advanced) across AI runtimes, FastAPI/Flask backends, and ML; C++',
    items: ['Python (Advanced)', 'C++'],
  },
  {
    id: 'ai-ml-cv',
    statCode: 'PER // VIS',
    label: 'AI/ML & Computer Vision',
    jpLabel: '視覚推論',
    rank: 'S',
    stylisticPower: 90,
    evidenceNote: 'YOLOv11n on 33,000+ images, ResNet-50 edge CV, Transformers, NLP & semantic search',
    items: [
      'PyTorch',
      'Scikit-learn',
      'CNNs (ResNet-50, YOLOv11n)',
      'Transformers',
      'Object Detection',
      'Synthetic Data Generation',
      'NLP',
      'Embeddings',
      'semantic search',
      'tool calling',
      'structured outputs',
    ],
  },
  {
    id: 'systems-edge',
    statCode: 'VIT // EDG',
    label: 'Systems, Edge & Hardware',
    jpLabel: '辺縁機器',
    rank: 'A',
    stylisticPower: 86,
    evidenceNote: 'Snapdragon AI PC, Raspberry Pi 5, Arduino UNO Q, Qualcomm AI Hub, AWS EC2',
    items: [
      'AWS EC2',
      'ONNX',
      'TFLite Quantization',
      'Snapdragon AI PC',
      'Raspberry Pi 5',
      'Arduino UNO Q',
      'Qualcomm AI Hub',
    ],
  },
  {
    id: 'backend',
    statCode: 'AGI // API',
    label: 'Backend & Integration',
    jpLabel: '基盤接続',
    rank: 'A',
    stylisticPower: 88,
    evidenceNote: 'FastAPI, Flask, WebSockets, SQL (CTEs/window functions), Next.js & React',
    items: [
      'FastAPI',
      'Flask',
      'Node.js',
      'SQL',
      'Vector Databases',
      'REST APIs',
      'WebSockets',
      'Next.js',
      'React',
    ],
  },
  {
    id: 'problem-solving',
    statCode: 'DEX // DSA',
    label: 'Problem Solving',
    jpLabel: '算法',
    rank: 'A',
    stylisticPower: 82,
    evidenceNote: '150+ LeetCode problems (DSA)',
    items: ['150+ LeetCode problems (DSA)'],
  },
];

export const toolItems: string[] = [
  'Git',
  'GitHub',
  'AWS EC2',
  'Jupyter',
  'Vercel',
  'Netlify',
  'Docker',
];

export const certifications: CertificationItem[] = [
  {
    id: 'cert-genai-leaders',
    title: 'Generative AI and AI for Leaders',
    issuer: 'Udemy',
    rarity: 'EPIC',
    slot: 'CODEX // 01',
  },
  {
    id: 'cert-prompt-eng',
    title: 'Prompt Engineering',
    issuer: 'Udemy',
    rarity: 'EPIC',
    slot: 'CODEX // 02',
  },
  {
    id: 'cert-js-complete',
    title: 'The Complete JavaScript Course: From Zero to Expert',
    issuer: 'Udemy',
    rarity: 'RARE',
    slot: 'CODEX // 03',
  },
  {
    id: 'cert-cisco-ds',
    title: 'Data Science Essentials with Python',
    issuer: 'Cisco',
    rarity: 'RARE',
    slot: 'CODEX // 04',
  },
];
