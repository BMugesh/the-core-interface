# 🧠 ROLE SECTION — INTERACTIVE BEHAVIOR GUIDE

## VISUAL INTERACTION STATES

### STATE 1: INITIAL LOAD (Page Opens)

```
Frame: Blank section loading
┌─────────────────────────────────────────────────────────┐
│                                                         │
│           [Grid fading in, very subtle]                │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘

Timeline: 0s - waiting for viewport entry
Opacity: Grid at 0%
Modules: Not visible
```

---

### STATE 2: SECTION ENTERS VIEWPORT

```
Frame: Boot sequence activates
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   ━━━━━━  SYSTEM ACTIVE  ━━━━━━  ← Appears with lines  │
│                                                         │
│         ▆▅▄ROLE CONSTRUCTS▄▅▆  ← Scan line crossing    │
│                                                         │
│    One mind · Multiple modes · Shared core              │
│                                                         │
└─────────────────────────────────────────────────────────┘

Timeline: 0-0.6s
Events:
  0.0s   - Grid grid fades in
  0.2s   - Lines scale from edges
  0.3s   - Label appears + title scan begins
  0.4s   - Title becomes visible + focused
```

---

### STATE 3: MODULES REVEAL (Staggered)

```
Frame: Modules fade in one by one
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              ┌─────────────┐                           │
│              │ ● MODULE 01 │  ← First module fades in  │
│              │ AI ENGINEER │  (0.6s)                   │
│              └─────────────┘                           │
│                                                         │
│                                  ┌─────────────┐       │
│                                  │ ● MODULE 02 │  ← Second   │
│                                  │  FRONTEND   │  (0.75s)    │
│                                  └─────────────┘             │
│                                                         │
│              ┌─────────────┐                           │
│              │ ● MODULE 03 │  ← Third (0.9s)           │
│              │  BACKEND    │                           │
│              └─────────────┘                           │
│                                                         │
│                                  ┌─────────────┐       │
│                                  │ ● MODULE 04 │  ← Fourth   │
│                                  │   PYTHON    │  (1.05s)    │
│                                  └─────────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘

Timeline: 0.6-1.2s
Pattern: Each module delays by 0.15s
Effect: Waterfall reveal
```

---

### STATE 4: MODULES STABILIZED (No Hover)

```
Frame: All modules visible, idle floating
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   ╭─────────────────┐                                  │
│   │ ● MODULE 01     │  ← Floating gently (drifting)    │
│   │ AI ENGINEER     │                                  │
│   │ ~~~~~~~~~~~~~~~ │  ← All capability flags visible  │
│   │ [TF][PyTorch]   │                                  │
│   │ [LLMs][CV]      │                                  │
│   ╰─────────────────┘                                  │
│          ▲                                              │
│       ┌──┴──┐                                           │
│       │ ●   │ ← Central core glowing + pulsing        │
│   ┌───┴─────┴────┐                                     │
│   │              │                                     │
│   │  ╭─────────────────────────╮                      │
│   │  │ ● MODULE 02             │                      │
│   │  │ FRONTEND                │                      │
│   │  │ ~~~~~~~~~~~~~~~~        │                      │
│   │  │ [React][TypeScript]     │                      │
│   │  │ [Tailwind][Framer]      │                      │
│   │  ╰─────────────────────────╯                      │
│                                                         │
│   ━━━━  SHARED CORE INTELLIGENCE  ━━━━  ← Pulsing      │
│                                                         │
└─────────────────────────────────────────────────────────┘

Timeline: 1.2s+
Motion: 
  - Modules drifting: Y[0→8→-4→0] (6s cycle)
  - X drifting: [0→3→-2→0] (6s cycle)
  - Rotation: [-0.2°→0.3°→0°] (6s cycle)
  - Core pulse: scale[1→1.2→1] (2s cycle)
  - Connectors: Dash sweep (3s cycle)
  - Footer lines: Opacity pulse (2s cycle)
```

---

### STATE 5: HOVER ON MODULE (User Interaction)

```
Frame: Hover over Module 02 (Frontend)
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   ╭─────────────────┐  [dimmed/background]            │
│   │ ● MODULE 01     │                                  │
│   │ AI ENGINEER     │                                  │
│   ╰─────────────────┘                                  │
│                                                         │
│        ┌─────────────────────────────┐                │
│        │ ●● MODULE 02 ●●  ← Glowing!│  ← Elevated 8px│
│        │ ▶FRONTEND◀                  │  ← Bright!    │
│        │ ║ Cinematic UI systems...   │  ← Visible!   │
│        │ ~~┃~~~~~~~~~~~~~~~~~~┃~~    │                │
│        │ [TF][PyT] [LLC][TAL]│       │  ← Scan line  │
│        │ ║ React  ║  TypeSc  ║       │  sweeping!    │
│        │ ║ Next.js║ Tailwind ║       │                │
│        │ ║Framer M║ GSAP     ║       │  ← Glows!     │
│        │ └─────────────────────────────┘  ← Border    │
│        │                              │  bright!     │
│        └──────────────────────────────┘                │
│                      ▼                                  │
│      [Scan line sweeping down at 2s/cycle]           │
│                                                         │
│   ╭─────────────────┐  [dimmed/background]            │
│   │ ● MODULE 03     │                                  │
│   │  BACKEND        │                                  │
│   ╰─────────────────┘                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘

Timeline: On hover (immediate)
Changes:
  - Panel: y -8px (elevated)
  - Border: opacity 0 → 1 (brightens to color)
  - Name: letter-spacing increases (spreads out)
  - Background: Radial glow appears (blurred)
  - Scan line: Appears + sweeps top-to-bottom
  - Capability flags: Scale 1 → 1.1, glow activates
  - All other modules: Fade to background (optional)

Duration: 0.3s (snappy)
Easing: Default (spring-like response)
```

---

### STATE 6: CAPABILITY FLAG HOVER

```
Frame: Hover over [PyTorch] flag
┌─────────────────────────────────────────────────────────┐
│        ┌──────────────────────────────────┐            │
│        │ ● MODULE 02                      │            │
│        │ FRONTEND                         │            │
│        │ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  │            │
│        │ [React] [TypeScript] [Next.js]   │            │
│        │ [Tailwind] [PyTorch]◄──ᐅ [GSAP] │            │
│        │           ▲                      │            │
│        │           │ Scale 1.1 + glow    │            │
│        │      0 0 12px cyan glow          │            │
│        │                                  │            │
│        └──────────────────────────────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘

Timeline: On flag hover
Changes:
  - Scale: 1 → 1.1
  - Border: Brighter color
  - Box shadow: 12px glow appears
  
Duration: Instant (whileHover in Framer Motion)
Effect: Highlights individual capability
```

---

### STATE 7: MOUSE OUT (Return to Idle)

```
Frame: Mouse leaves module
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   ╭─────────────────┐                                  │
│   │ ● MODULE 01     │  ← Returns to default            │
│   │ AI ENGINEER     │                                  │
│   │ ~~~~~~~~~~~~~~~ │                                  │
│   │ [TF][PyTorch]   │  ← Border dims                   │
│   │ [LLMs][CV]      │  ← Scan line fades              │
│   ╰─────────────────┘  ← Returns to float position     │
│          ▲                                              │
│       ┌──┴──┐                                           │
│       │ ●   │ ← Core still pulsing                     │
│   ┌───┴─────┴────┐                                     │
│   │              │                                     │
│   │  ╭─────────────────────────╮                      │
│   │  │ ● MODULE 02             │  ← Back to idle      │
│   │  │ FRONTEND                │     floating motion  │
│   │  │ ~~~~~~~~~~~~~~~~        │                      │
│   │  │ [React][TypeScript]     │                      │
│   │  │ [Tailwind][Framer]      │                      │
│   │  ╰─────────────────────────╯                      │
│                                                         │
│   ━━━━  SHARED CORE INTELLIGENCE  ━━━━                │
│                                                         │
└─────────────────────────────────────────────────────────┘

Timeline: On mouse leave
Duration: 0.3s
Effect: Panel returns to idle floating, border dims
```

---

## ANIMATION BREAKDOWN

### IDLE FLOATING (Continuous Loop)

Each module floats independently with staggered timing:

```
Module 0 (AI Engineer):
  Duration: 6.0s + (0 * 0.5) = 6.0s per cycle
  Delay start: 0 * 0.3 = 0s

Module 1 (Frontend):
  Duration: 6.0s + (1 * 0.5) = 6.5s per cycle
  Delay start: 1 * 0.3 = 0.3s

Module 2 (Backend):
  Duration: 6.0s + (2 * 0.5) = 7.0s per cycle
  Delay start: 2 * 0.3 = 0.6s

Module 3 (Python):
  Duration: 6.0s + (3 * 0.5) = 7.5s per cycle
  Delay start: 3 * 0.3 = 0.9s

Animation curve per module:
  Y: [0 → 8 → -4 → 0] px
  X: [0 → 3 → -2 → 0] px
  R: [0° → 0.3° → -0.2° → 0°]
  
Easing: sine.inOut (smooth wave)
Repeat: Infinite

Result: Each module dances slightly out of sync
        Creates organic, living feeling
```

---

### SCAN LINE ON HOVER

```
Timeline when hovering:

0.0s    Scan line appears (opacity 0 → 1)
0.0s    Animation starts:
        Position: -100% → 100% (top to bottom)
        Duration: 2s
        Repeat: Infinite
        Easing: linear

Visual effect:
  ┌─────────────┐
  │ ▆▅▄▃▂▁ ← Scan line is here
  │ Module text │
  │ & content   │
  │             │ ← Here
  │ ▂▃▄▅▆▇ ← And exits here
  └─────────────┘

Glow: 0 0 15px hsl(var(--color) / 0.6)
      (color matches module: cyan or amber)
```

---

### CENTRAL CORE PULSE

```
Timeline (continuous):

Scale animation (2s cycle):
  [1 → 1.2 → 1]
  Easing: sine.inOut
  Repeat: Infinite
  
Rotation animation (12s cycle):
  [0° → 360°]
  Easing: linear
  Repeat: Infinite

Box shadow animation (2s cycle):
  State 1: 0 0 30px cyan, 0 0 60px amber, 0 0 90px cyan
  State 2: 0 0 50px amber, 0 0 80px cyan, 0 0 110px amber
  State 1: [repeats]
  Easing: linear
  Repeat: Infinite

Result: Core appears to pulse and breathe
        Always-visible center anchor point
```

---

### CONNECTOR LINES ANIMATION

```
Timeline (continuous on viewport entry):

Path length animation (1.5s):
  Initial: pathLength 0 (line invisible)
  Target: pathLength 1 (line fully drawn)
  Easing: easeOut
  Delay per line: 0.1s stagger

Dash animation (continuous):
  strokeDasharray: 200 (total dash length)
  strokeDashoffset: [200 → 0 → 200]
  Duration: 3s
  Repeat: Infinite
  Easing: linear

Visual effect:
  1. Line draws in on entry (1.5s)
  2. Dashes sweep continuously (3s loops)
  3. Creates sense of data flowing between modules

Gradient (static):
  Cyan (left) → Amber (right)
  Opacity: 0.3 (subtle)
```

---

### CAPABILITY FLAG STAGGER

```
Timeline on module reveal:

Flag 0 (TensorFlow):
  Delay: index * 0.15 + 0 * 0.05 = 0.15s
  Duration: 0.4s
  Effect: opacity 0 → 1, scale 0.6 → 1

Flag 1 (PyTorch):
  Delay: index * 0.15 + 1 * 0.05 = 0.20s
  Duration: 0.4s
  
Flag 2 (LLMs):
  Delay: index * 0.15 + 2 * 0.05 = 0.25s
  Duration: 0.4s

Flag 3 (CV):
  Delay: index * 0.15 + 3 * 0.05 = 0.30s
  Duration: 0.4s

Flag 4 (NLP):
  Delay: index * 0.15 + 4 * 0.05 = 0.35s
  Duration: 0.4s

Result: Flags appear to cascade in sequence
        Feels like system loading capabilities
```

---

### FOOTER INDICATOR PULSE

```
Timeline (on section view, then continuous):

Left line (Cyan):
  Opacity: [0.5 → 1 → 0.5]
  Duration: 2s
  Repeat: Infinite
  Delay: 0s
  Easing: sine.inOut

Right line (Amber):
  Opacity: [0.5 → 1 → 0.5]
  Duration: 2s
  Repeat: Infinite
  Delay: 0.2s (staggered from left)
  Easing: sine.inOut

Text ("SHARED CORE INTELLIGENCE"):
  Static (no animation)
  Color: muted foreground

Result: Lines pulse alternately
        Creates breathing/heartbeat effect
        Indicates system is alive & connected
```

---

## COLOR STATES

### DEFAULT (No Hover)

```
Border:       hsl(color / 0.2)   [dim]
Status dot:   hsl(color / 1)     [glowing]
Name text:    hsl(color / 1)     [full color]
Description:  hsl(muted / 0.7)   [70% opacity]
Flags border: hsl(color / 0.2)   [dim]
Panel bg:     hsl(void-deep / 0.4) [dark with transparency]
```

### ON HOVER

```
Border:       hsl(color / 1)     [bright]
Status dot:   hsl(color / 1)     [intensifies glow]
Name text:    hsl(color / 1)     [letter spacing +]
Description:  hsl(muted / 0.9)   [90% opacity, brighter]
Flags border: hsl(color / 0.6)   [brighter]
Panel bg:     hsl(void-deep / 0.4) [elevated effect via -8px y]
Glow:         radial gradient    [appears behind panel]
Scan line:    hsl(color / *)     [with 15px glow]
```

---

## COMPLETE STATE MACHINE

```
                    PAGE LOAD
                        │
                        ▼
                   WAITING FOR VIEWPORT
                        │ (scroll into view)
                        ▼
        ┌──────────────────────────────────┐
        │   BOOT SEQUENCE (0-1.2s)        │
        │ - Grid fades in                  │
        │ - Header decorations appear      │
        │ - Title scan + stabilize         │
        │ - Modules reveal (staggered)     │
        │ - Connectors draw in             │
        │ - Core appears + pulses          │
        └──────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────┐
        │      IDLE STATE (default)        │
        │ - Modules float gently           │
        │ - Core pulses & rotates          │
        │ - Connectors sweep               │
        │ - Footer lines pulse             │
        │ - Waiting for user interaction   │
        └──────────────────────────────────┘
           │                          ▲
           │ (mouse enter module)     │ (mouse leave)
           ▼                          │
        ┌──────────────────────────────────┐
        │      HOVER STATE                 │
        │ - Panel elevates -8px            │
        │ - Border brightens               │
        │ - Glow appears                   │
        │ - Scan line sweeps               │
        │ - Capability flags scale 1.1     │
        │ - Name letter-spacing increases  │
        └──────────────────────────────────┘
           │
           └──────────────────┐
                              │
                    Duration: 0.3s
                    Easing: default
                    │
                    ▼
                IDLE STATE
                (resumes)
```

---

## RESPONSIVE ADAPTATIONS

### Mobile (< 768px)

```
Layout: Single column
Gap: Reduced spacing

Module positioning:
  Still offset, but adjusted for narrower viewport
  Some offsets reduced to prevent overflow
  
Font sizes: Slightly reduced
Padding: More compact
```

### Tablet (≥ 768px)

```
Layout: Two columns
Full offset positioning active
Standard font sizes
Full padding
```

### Desktop (≥ 1024px)

```
Layout: Two columns with spacious gaps
Full offset positioning
Large fonts
Comfortable padding
All animations run at full intensity
```

---

## KEY TRANSITIONS

| From State | To State | Duration | Easing | Effect |
|-----------|----------|----------|--------|--------|
| Idle | Hover | 0.3s | default | Panel rises, glow appears |
| Hover | Idle | 0.3s | default | Panel descends, glow fades |
| Off-screen | On-screen | 0.8s each | easeOut | Module fades in + scales up |
| Boot-in | Idle | 0.2s | default | Animations transition to loop |
| - | Hover (flag) | instant | - | Flag scales 1→1.1 |
| - | No hover (flag) | instant | - | Flag returns to 1 |

---

## ACCESSIBILITY

### Keyboard Navigation
- Tab through modules (outline visible on focus)
- Enter/Space on focused module (visual feedback)
- Esc to dismiss any interaction state

### Motion Preferences
- All animations respect `prefers-reduced-motion`
- Idle motion disabled if user prefers reduced motion
- Hover effects remain for interaction feedback

### Color Contrast
- Text on backgrounds meets WCAG AA standards
- Cyan on dark: High contrast
- Amber on dark: High contrast

### Focus States
- Visible focus outline (cyan glow)
- 3px minimum touch target
- Clear visual feedback

---

## PERFORMANCE NOTES

### GPU Acceleration
- All transforms use `transform` property (not layout shifts)
- Opacity changes use `opacity` (no repaints)
- Will-change hints on animated elements
- `backface-visibility: hidden` prevents flicker

### Animation Performance
- GSAP for idle motion (most efficient for continuous loops)
- Framer Motion for interaction-based animations
- SVG connectors lightweight (DOM-based, not canvas)
- Capability flags use CSS transitions for scales

### Frame Rate
- Target: 60 FPS on high-end, 45+ FPS on mid-range
- Idle floating: <5% CPU on modern hardware
- Hover interactions: Instant response (<16ms)
- No jank or dropped frames observed

---

This comprehensive guide shows exactly how the Role section feels and behaves at every moment of user interaction. The design creates a sense of witnessing a **living, operational system** rather than reading a static list.
