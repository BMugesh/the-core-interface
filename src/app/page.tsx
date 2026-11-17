import { profile } from '@/data/profile';

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-bg text-ink p-8 font-mono">
      <div className="max-w-4xl mx-auto border border-cyan-sys/40 bg-panel p-6">
        <p className="text-xs text-cyan-sys tracking-widest uppercase">
          [ SYSTEM ] // PHASE 1 FOUNDATION READY
        </p>
        <h1 className="font-display text-5xl mt-2 tracking-wide">{profile.name}</h1>
        <p className="text-magenta-sys text-lg mt-1">{profile.classTitle}</p>
        <p className="font-sans text-ink-dim mt-4">{profile.tagline}</p>
      </div>
    </main>
  );
}
