# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a portfolio website project built with React + TypeScript + Vite, featuring an immersive sci-fi themed interface with cinematic animations. The project uses Lovable.dev as its primary development platform, which provides auto-commit on changes made through the Lovable interface.

**Tech Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite with SWC plugin
- **Styling:** Tailwind CSS + DaisyUI (sci-fi-dark theme)
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Animations:** Framer Motion + GSAP with ScrollTrigger
- **Routing:** React Router v6
- **State:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod validation

## Development Commands

```powershell
# Install dependencies
npm i

# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint
```

**Note:** The dev server runs on `http://[::]:8080` (all network interfaces).

## Architecture Overview

### Entry Points
- `src/main.tsx` - Application entry point, renders root React component
- `src/App.tsx` - Root component with providers (QueryClient, TooltipProvider, BrowserRouter)

### Routing Structure
- Single-page application with React Router
- Primary route: `/` → `src/pages/Index.tsx`
- Catch-all route: `*` → `src/pages/NotFound.tsx`
- **Important:** Add all custom routes ABOVE the catch-all `*` route in `App.tsx`

### Component Organization
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (accordion, button, card, etc.)
│   ├── AboutSection.tsx
│   ├── AchievementsSection.tsx
│   ├── ContactSection.tsx
│   ├── HeroSection.tsx
│   ├── HUDNavigation.tsx
│   ├── LoadingSequence.tsx
│   ├── ParticleBackground.tsx
│   ├── ProjectsSection.tsx
│   ├── SectionInterconnections.tsx
│   └── SkillsSection.tsx
├── hooks/
│   ├── use-cinematic-scroll.ts    # GSAP ScrollTrigger animations
│   ├── use-performance-monitor.ts # Device capability detection
│   ├── use-mobile.tsx
│   ├── use-text-reveal.ts
│   ├── use-toast.ts
│   └── useVisitedSections.ts
├── lib/
│   ├── cinematic-motion.ts        # Framer Motion animation presets
│   ├── daisyui-design-system.ts
│   └── utils.ts                   # cn() utility for className merging
└── pages/
    ├── Index.tsx                  # Main portfolio page
    └── NotFound.tsx
```

### Key Architectural Patterns

#### Performance-Aware Animations
The application detects device capabilities and adjusts animation complexity accordingly:
- **High-end:** Full GSAP parallax, particle effects, blur effects (scrub 1.5)
- **Mid-range:** Reduced particles (60%), no blur, slower scrub (1.0)
- **Low-end:** Minimal animations, no parallax, no scrub (0)

Use `usePerformanceMonitor()` to get the device profile and `useCinematicScroll(profile)` for scroll-based animations.

#### Animation Libraries
- **Framer Motion:** Used for component-level animations, page transitions, and interactive states
  - Presets available in `lib/cinematic-motion.ts`
  - Includes variants for: buttons, cards, scroll reveals, ambient motion
- **GSAP + ScrollTrigger:** Used for complex scroll-choreographed animations
  - Implemented in `use-cinematic-scroll.ts`
  - Handles parallax layers with `data-parallax-speed` attributes
  - Progressive section activation with `data-lazy-animate`

#### Theme System
- Custom sci-fi theme defined in `tailwind.config.ts`
- Custom color variables: `void`, `neon`, `steel`, `hud`, `signal`
- Custom fonts: Orbitron (display), JetBrains Mono (mono), Inter (sans)
- Custom keyframe animations: `hud-scan`, `data-stream`, `ring-pulse`, `glow-pulse`, `text-reveal`, `line-draw`, `orbit`
- DaisyUI theme: `sci-fi-dark` with custom colors

#### Path Aliases
All imports use `@/` prefix mapped to `src/`:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCinematicScroll } from "@/hooks/use-cinematic-scroll"
```

## TypeScript Configuration

- **Strict mode:** Disabled (`strict: false`)
- **No implicit any:** Disabled
- **Unused parameters/locals:** Not enforced
- **Null checks:** Disabled

This configuration prioritizes rapid development over strict type safety. When adding new features, follow the existing patterns rather than introducing strict typing.

## Adding shadcn/ui Components

This project uses shadcn/ui. Configuration is in `components.json`. To add components, use:
```powershell
npx shadcn@latest add [component-name]
```

Components are added to `src/components/ui/`.

## Styling Guidelines

1. Use Tailwind utility classes with the custom sci-fi theme colors
2. Leverage custom color tokens: `bg-void-deep`, `text-neon-cyan`, `border-steel`, etc.
3. Use `cn()` utility from `@/lib/utils` to merge className conditionally
4. Apply custom animations from tailwind.config.ts: `animate-hud-scan`, `animate-glow-pulse`, etc.
5. For complex animations, use presets from `lib/cinematic-motion.ts`

## Animation Guidelines

### For Component Animations
Use Framer Motion variants from `lib/cinematic-motion.ts`:
```typescript
import { interactiveVariants, scrollVariants } from '@/lib/cinematic-motion'

<motion.div
  variants={interactiveVariants.card}
  initial="rest"
  whileHover="hover"
/>
```

### For Scroll-Based Animations
1. Add `data-parallax-speed` attribute to elements for parallax effect (0 = background, 1 = foreground)
2. Add `data-lazy-animate` to elements that should animate on scroll-in
3. Wrap sections with `className="section"` for automatic scroll choreography

### Performance Considerations
- Check `usePerformanceMonitor()` profile before adding heavy effects
- Use `getMotionSettings(profile)` helper for feature flags
- Test on mid-range and low-end profiles

## Git Workflow

This project uses Lovable.dev:
- Changes via Lovable are auto-committed
- Manual commits should follow standard practices
- No special branch workflow required

## Important Notes

- The development server uses `lovable-tagger` plugin in dev mode for component tracking
- ESLint is configured but lenient (unused vars disabled)
- The project includes extensive markdown documentation files (CINEMATIC_ENHANCEMENT_GUIDE.md, GSAP_SCROLL_CHOREOGRAPHY.md, etc.) - reference these for implementation details
- All routes must be added ABOVE the catch-all route in `App.tsx`
