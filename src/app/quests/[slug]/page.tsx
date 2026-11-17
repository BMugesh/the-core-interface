import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/data/projects';
import { QuestDetailClient } from '@/components/sections/QuestDetailClient';

interface QuestPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: QuestPageProps): Metadata {
  const quest = getProjectBySlug(params.slug);
  if (!quest) {
    return { title: 'Quest Not Found' };
  }
  return {
    title: `${quest.title} — Quest Case Study`,
    description: quest.summary,
  };
}

export default function QuestDetailPage({ params }: QuestPageProps) {
  const quest = getProjectBySlug(params.slug);
  if (!quest) {
    notFound();
  }
  return <QuestDetailClient quest={quest} />;
}
