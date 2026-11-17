# BALA MUGESH M K — R.I.O. System Window Portfolio

An autonomous agent runtime ("R.I.O.")–themed personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP + ScrollTrigger**, **Lenis**, **React Three Fiber**, and the **Groq SDK**.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (optional for offline fallback; required for live Groq LLM streaming)
cp .env.example .env.local
# Edit .env.local and add your GROQ_API_KEY

# 3. Start local development server
npm run dev

# 4. Production build
npm run build
npm run start
```

---

## Editing Portfolio Content (No Component Edits Needed)

All text, metrics, projects, internships, hackathons, skills, and RAG grounding live inside typed files under `src/data/`:

| File | Controls |
|---|---|
| `src/data/profile.ts` | Name, class title, tagline, education, contact links, resume path, headline metrics, boot lines |
| `src/data/skills.ts` | Status Window stat categories, stylistic ranks/power bars, certifications codex, tool arsenal |
| `src/data/projects.ts` | Quest Log cards, `/quests/[slug]` case study pages, architecture DAG nodes, verified metrics, media `TODO` slots |
| `src/data/experience.ts` | Guild History internship timeline (reverse chronological) |
| `src/data/achievements.ts` | Hackathon Titles / Achievements and unlock toast metadata |
| `src/data/knowledge.json` | Grounding chunks retrieved via local BM25 scoring by `/api/rio` |

---

## Setting `GROQ_API_KEY` (Live R.I.O. Chat)

The live R.I.O. assistant (`Ctrl+K` or **Ask R.I.O.**) calls `/api/rio` (`src/app/api/rio/route.ts`), which runs **strictly on the server**:

1. Obtain an API key from [console.groq.com/keys](https://console.groq.com/keys).
2. Add it to `.env.local` for local dev (never commit `.env.local`):
   ```env
   GROQ_API_KEY=gsk_...
   ```
3. In **Vercel Project Settings → Environment Variables**, add `GROQ_API_KEY` for Production and Preview environments.
4. If `GROQ_API_KEY` is omitted or unreachable, `/api/rio` gracefully streams a deterministic grounded response directly from `src/data/knowledge.json` so the chat never breaks.

---

## Swapping the R.I.O. Mascot with Rive

The current mascot is an original SVG vector avatar (`src/components/mascot/RioMascot.tsx`) exposing a clean state-machine interface:

```tsx
<RioMascot state="idle | thinking | alert | celebrate" size={160} interactive />
```

To upgrade to an interactive **Rive** mascot:

1. **Install the Rive CLI** from [rive.app/cli](https://rive.app/cli), then build your state machine (`idle`, `thinking`, `alert`, `celebrate` inputs) and push it to your Rive account so you can refine it in the Rive Editor.
2. Export the compiled `.riv` file to `/public/mascot/rio.riv`.
3. Install the lightweight React runtime:
   ```bash
   npm install @rive-app/react-canvas
   ```
4. Dynamically load `useRive` inside `src/components/mascot/RioMascot.tsx` when `reducedMotion` is false, mapping the `state` prop directly to your Rive State Machine input, while keeping the existing SVG as the instant SSR / reduced-motion fallback.

---

## Interactive Shortcuts & Accessibility

- **`Ctrl+K` / `Cmd+K`** — Open R.I.O. AI Chat & Command Palette
- **`` ` `` or `/`** — Open Hidden System Terminal (`help`, `skills`, `quests`, `resume`, `contact`, `rio`, `berserk`)
- **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) — Toggle **Berserk Mode** theme override
- **Simple Mode Toggle** — Persisted in `localStorage`; disables animations, boot sequence, 3D core, and smooth scroll
- **`prefers-reduced-motion`** — Automatically respected site-wide
- **UI Kit Preview** — Visit `/kit` to inspect all System Window primitives

---

## Remaining Asset `TODO`s

- [ ] Place official resume PDF at `/public/Bala_Mugesh_Resume.pdf` (replaces stub PDF)
- [ ] Update verified LinkedIn profile URL in `src/data/profile.ts` and direct GitHub repo URLs in `src/data/projects.ts`
- [ ] Add real edge-hardware photos/videos (Snapdragon AI PC, Arduino UNO Q, Raspberry Pi 5 + ResNet-50) and wire into `/quests/[slug]` media slots
- [ ] Export and connect `/public/mascot/rio.riv` (optional Rive upgrade)
