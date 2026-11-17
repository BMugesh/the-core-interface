export interface GuildEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  guildCode: string;
  highlights: string[];
  stack: string[];
}

/**
 * Reverse chronological order ("Guild / Dungeon Log")
 */
export const experiences: GuildEntry[] = [
  {
    id: 'appxcess',
    role: 'Software Development Intern',
    organization: 'Appxcess Technologies',
    period: 'June–July 2026',
    guildCode: 'GUILD // 03',
    highlights: [
      'Engineered FastAPI backend APIs and WebSocket-based real-time communication services.',
      'Managed production deployments on AWS EC2.',
      'Collaborated on enterprise projects PMT, A2F, and a scalable chat platform.',
    ],
    stack: ['FastAPI', 'WebSockets', 'AWS EC2', 'Python', 'Enterprise Systems'],
  },
  {
    id: 'codebooster',
    role: 'AI Agent Intern',
    organization: 'CODEBOOSTER',
    period: 'July 2025',
    guildCode: 'GUILD // 02',
    highlights: [
      'Built autonomous LLM agents with LangChain and Python featuring structured JSON outputs and multi-step tool calling to automate internal backend workflows.',
      'Constructed a semantic retrieval (RAG) pipeline with dense embeddings + vector database to ground agent responses and reduce hallucinations.',
      'Integrated agent endpoints with existing REST APIs and added automated validation checks for reliable multi-turn task execution.',
    ],
    stack: ['LangChain', 'Python', 'RAG', 'Dense Embeddings', 'Vector Database', 'REST APIs'],
  },
  {
    id: 'rvtech',
    role: 'MERN Stack Intern',
    organization: 'RV TECH',
    period: 'January 2025',
    guildCode: 'GUILD // 01',
    highlights: [
      'Developed scalable web applications using MongoDB, Express.js, React.js, and Node.js.',
      'Built RESTful APIs for reliable client-server communication.',
    ],
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'RESTful APIs'],
  },
];
