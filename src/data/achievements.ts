import type { RankTier } from './skills';

export interface AchievementTitle {
  id: string;
  badge: string;
  titleName: string;
  event: string;
  year: string;
  locationOrScope: string;
  rank: RankTier;
  description: string;
  hardwareOrDomain: string[];
  mediaTodo?: string;
}

export const achievements: AchievementTitle[] = [
  {
    id: 'snapdragon-multiverse-2026',
    badge: 'FINALIST',
    titleName: 'MULTIVERSE ARCHITECT',
    event: 'Snapdragon Multiverse Hackathon (Qualcomm)',
    year: '2026',
    locationOrScope: 'Noida',
    rank: 'S',
    description:
      'One of a limited number of teams selected to build a multi-device AI solution using Snapdragon AI PC, Arduino UNO Q, and Qualcomm AI Cloud 100.',
    hardwareOrDomain: ['Snapdragon AI PC', 'Arduino UNO Q', 'Qualcomm AI Cloud 100'],
    mediaTodo: 'TODO: Add photo of Snapdragon AI PC + Arduino UNO Q setup from Noida finals.',
  },
  {
    id: 'cognizant-technoverse-2026',
    badge: 'SEMI-FINALIST',
    titleName: 'EDGE SENTINEL',
    event: 'Cognizant Technoverse National Hackathon',
    year: '2026',
    locationOrScope: 'National',
    rank: 'A',
    description:
      'Shortlisted nationally for an Edge-AI defect detection system (Raspberry Pi 5 + ResNet-50) built under severe time constraints.',
    hardwareOrDomain: ['Raspberry Pi 5', 'ResNet-50', 'Edge-AI Defect Detection'],
    mediaTodo: 'TODO: Add photo of Raspberry Pi 5 + ResNet-50 defect detection rig.',
  },
  {
    id: 'sih-2024',
    badge: 'FINALIST',
    titleName: 'DEFENCE INTERCEPTOR',
    event: 'Smart India Hackathon (SIH)',
    year: '2024',
    locationOrScope: 'National — Bharat Electronics Limited (BEL)',
    rank: 'S',
    description:
      'Micro-doppler effect-based Birds vs Drones classifier for Bharat Electronics Limited (BEL), delivering real-time aerial object classification for defence.',
    hardwareOrDomain: ['Micro-Doppler Classification', 'Real-Time Aerial CV', 'BEL Defence'],
  },
];
