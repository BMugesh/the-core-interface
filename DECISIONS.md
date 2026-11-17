# ARCHITECTURAL DECISIONS & AUDIT LOG

## Phase 0: Repository Audit & Baseline

### Existing Repository State
- **Framework**: Previously Vite 5.4 + React 18.3.1 + TypeScript 5.8 + React Router DOM 6.30.
- **Styling**: Tailwind CSS 3.4.17 + DaisyUI 5.5 + tailwindcss-animate + custom IMAX backlight / cinematic CSS.
- **Animation & Motion**: Framer Motion 11.18, GSAP 3.14, Lenis 1.3.17.
- **Component Primitives**: Radix UI primitives (`@radix-ui/react-*`), Lucide React icons (`lucide-react`).
- **Assets**:
  - `/bm-logo.png` (563 KB) — preserved for favicon/logo/OG image.
  - `/favicon.ico`, `/favicon.svg`, `/placeholder.svg`, `/robots.txt` — preserved.
- **Deployment & Env**:
  - Live deployment: Vercel (`https://bala-portfolio-two.vercel.app/`).
  - No secret environment variables were checked into git.
  - Vercel automatically deploys Next.js with zero configuration.

### Rebuild Strategy & Decisions
1. **Migration to Next.js App Router**:
   - The user specification mandates Next.js (App Router) + TypeScript + Tailwind CSS with `/api/rio/route.ts` (Groq SDK server-side execution), dynamic case-study routes `/quests/[slug]`, and `next/font` for zero-layout-shift typography (Anton/Bebas Neue, JetBrains Mono, Inter, Noto Sans JP).
   - We migrate the project to Next.js 14 (App Router) with React 18, ensuring seamless compatibility with Framer Motion 11, GSAP 3.14, Lenis, and React Three Fiber (R3F).
   - Vercel deploys Next.js natively with edge / serverless runtime for `/api/rio`.

2. **Design Tokens & System Window Aesthetic**:
   - Palette:
     - Background: `#05050a` (near-black)
     - Panel: `#0b0d17`
     - Ink/Text: `#e8f1ff`
     - Neon Cyan (Primary): `#00e5ff`
     - Neon Magenta (Secondary): `#ff2bd6`
     - Rank Accent / Alert: `#ffb300`
   - Cel-shaded, hard-edged panels with clip-path corner cuts, corner bracket HUD accents, subtle scanlines, and halftone dot overlays. Avoid soft blurry gradients.
   - Typography: Bebas Neue / Anton for high-impact display headers, JetBrains Mono for HUD labels/data, Inter for body copy, Noto Sans JP for decorative anime accents.

3. **Mascot (R.I.O.)**:
   - Original vector-designed stylized AI avatar (hooded visor/holo-core design) implemented via `<RioMascot state="idle|thinking|alert|celebrate" />`.
   - Built with clean SVG and CSS/motion hooks, ready for Rive/Lottie drop-in replacement when binary `.riv` assets are supplied.

4. **Content Layer**:
   - Fully isolated, typed data layer under `/src/data/`:
     - `profile.ts`
     - `skills.ts`
     - `projects.ts`
     - `experience.ts`
     - `achievements.ts`
     - `knowledge.json` (grounding chunks for R.I.O. RAG)
   - Strict adherence to source of truth: 0 invented facts, strictly verified metrics (93%, 70%, 300+, 33,000+, 62,000+, 1,545, 28K+, 0.590 vs 0.524, 11.8% -> 5.0%, 212, 19, 50+).

5. **Serverless AI Assistant**:
   - `/api/rio/route.ts` using `groq-sdk` with `llama-3.3-70b-versatile` or `mixtral-8x7b-32768`.
   - In-memory rate limiting per IP (sliding window).
   - Build-time local keyword/BM25 retrieval against `knowledge.json`.
   - System prompt strictly bound to context; refuses unknown questions gracefully.

6. **TODOs & Missing External Assets**:
   - `TODO`: Place official `Bala_Mugesh_Resume.pdf` in `/public/Bala_Mugesh_Resume.pdf` (placeholder stub provided).
   - `TODO`: Hardware showcase photos/videos for edge devices (Raspberry Pi 5, Snapdragon AI PC, Arduino UNO Q) in `/public/media/hardware/`.
   - `TODO`: Rive mascot file (`rio.riv`) once exported from Rive Editor.
