export interface ProfileData {
  name: string;
  classTitle: string;
  systemId: string;
  tagline: string;
  jpLabel: string;
  education: {
    degree: string;
    institution: string;
    period: string;
    cgpa: string;
  };
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string; // TODO: Replace with verified LinkedIn profile URL
    resumePath: string; // TODO: Place actual PDF at /public/Bala_Mugesh_Resume.pdf
  };
  headlineMetrics: {
    id: string;
    value: number;
    prefix?: string;
    suffix: string;
    label: string;
    detail: string;
  }[];
  bootLines: string[];
}

export const profile: ProfileData = {
  name: 'BALA MUGESH M K',
  classTitle: 'Forward Deployed AI Engineer',
  systemId: 'R.I.O. // RUNTIME v2.6',
  tagline:
    'Autonomous agent architectures, edge computer vision, and production AI systems deployed end-to-end.',
  jpLabel: '起動 // PLAYER PROFILE',
  education: {
    degree: 'B.E. (EEE)',
    institution: 'Sri Eshwar College of Engineering',
    period: '2023–2027',
    cgpa: '7.6',
  },
  contact: {
    email: 'balamugesh.mk2023eee@sece.ac.in',
    phone: '8778848565',
    github: 'https://github.com/BMugesh',
    linkedin: 'https://www.linkedin.com', // TODO: Replace with exact LinkedIn URL
    resumePath: '/Bala_Mugesh_Resume.pdf', // TODO: Place Bala_Mugesh_Resume.pdf in /public
  },
  headlineMetrics: [
    {
      id: 'turnaround',
      value: 93,
      suffix: '%',
      label: 'REPORT TURNAROUND CUT',
      detail: 'PMT Analytics: 2 days → 3 hours',
    },
    {
      id: 'tests',
      value: 300,
      suffix: '+',
      label: 'R.I.O. VERIFICATION TESTS',
      detail: 'Automated & live acceptance checks',
    },
    {
      id: 'synthetic',
      value: 33000,
      suffix: '+',
      label: 'SYNTHETIC IMAGES',
      detail: 'ConsensusIQ (62,000+ defects)',
    },
    {
      id: 'pathways',
      value: 1545,
      suffix: '',
      label: 'DECISION PATHWAYS MINED',
      detail: 'ResolveTrace from 28K+ conversations',
    },
  ],
  bootLines: [
    '> initializing R.I.O. runtime…',
    '> loading agents… planner [OK] router [OK] verifier [OK] executor [OK]',
    '> permission boundary: ARMED',
    '> player detected: BALA MUGESH M K',
  ],
};
