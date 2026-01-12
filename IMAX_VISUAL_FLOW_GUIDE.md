# IMAX Experience - Visual Flow & Timing Diagram

## 🎬 The Complete 6.5-Second Journey

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                     IMAX CINEMATIC LOADING EXPERIENCE              ┃
┃                          Total Duration: 6.5s                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


TIMELINE VISUALIZATION:
═════════════════════════════════════════════════════════════════════

0.0s  ╔════╗
      ║    ║  PHASE 1: BLACK FRAME
      ║ ■  ║  Duration: 0.5 seconds
      ║    ║  Action: Pure black void, absolute silence
      ║    ║  Feeling: Void, anticipation
      ╚════╝
            │
            │
0.5s        ╔═══════════════════╗
            ║                   ║  PHASE 2: WELCOME TEXT
            ║ WELCOME TO THE    ║  Duration: 1.5 seconds
            ║  WORLD OF         ║  Action: Fade in (opacity: 0 → 1)
            ║                   ║  Feeling: Invitation, calm
            ╚═══════════════════╝
                      │
                      │
2.0s                  ╔══════════════════════════════════════╗
                      ║                                      ║  PHASE 3: NAME DECODE ⭐
                      ║ B△L@ M▢G#SH M K  (0ms)             ║  Duration: 2.5 seconds
                      ║ BALA MU▓#SH M K  (600ms)           ║  Action: Glyphic reveal
                      ║ BALA MUGESH M K  (1200ms)          ║  3-pass progression
                      ║ BALA MUGESH M K ✓ LOCKED (2400ms) ║  Feeling: REVELATION
                      ║                                      ║  Signal corrected to truth
                      ╚══════════════════════════════════════╝
                                  │
                                  │
4.5s                              ╔════════════════════════════════╗
                                  ║  BALA MUGESH M K               ║  PHASE 4: TRANSITION
                                  ║                                ║  Duration: 1.0 second
                                  ║  ENTERING THE WORLD            ║  Action: Transition text
                                  ║  (fades in, holds, dissolves)  ║  Feeling: Imminent
                                  ╚════════════════════════════════╝
                                           │
                                           │
5.5s                                       ╔════════════════════════════╗
                                           ║   ─────────────────────   ║  PHASE 5: CAMERA
                                           ║      (camera drift)       ║  Duration: 1.0 second
                                           ║   Scale: 1.0 → 1.08      ║  Action: Zoom forward
                                           ║      ●  (center)          ║  HUD lines emerge/fade
                                           ║   ─────────────────────   ║  Feeling: IMMERSION
                                           ║  (no cuts, no flashes)    ║  Transport into world
                                           ╚════════════════════════════╝
                                                    │
                                                    │
6.5s                                               ╔════════════════════╗
                                                   ║  BALA MUGESH M K   ║  PHASE 6: HERO
                                                   ║  AI Engineer       ║  Duration: 0.5s+
                                                   ║  Full-Stack Dev    ║  Action: Main appears
                                                   ║  Python Spec.      ║  Backlight reveals
                                                   ║                    ║  Feeling: ARRIVAL
                                                   ║ (+ IMAX Backlight) ║  Welcome to the world
                                                   ╚════════════════════╝
                                                            │
                                                            │
                                                           END
```

---

## 📊 Phase Breakdown Table

| Phase | Duration | Start | End | Content | Animation | Feeling |
|-------|----------|-------|-----|---------|-----------|---------|
| 1 | 0.5s | 0.0s | 0.5s | Black void | None | Void |
| 2 | 1.5s | 0.5s | 2.0s | Welcome text | Fade in | Anticipation |
| 3 | 2.5s | 2.0s | 4.5s | Name decode | 3-pass reveal | **REVELATION** |
| 4 | 1.0s | 4.5s | 5.5s | Transition text | Fade in/out | Imminent |
| 5 | 1.0s | 5.5s | 6.5s | Camera drift | Scale + HUD | **IMMERSION** |
| 6 | 0.5s+ | 6.5s | 7.0s+ | Hero section | Fade in | **ARRIVAL** |

---

## 🎨 Animation Easing Curves

### Phase 2: Welcome Text
```
opacity: 0 → 1
┌─────────────────
│                 ╲
│                  ╲___
└────────────────────────
Duration: 0.8s | Easing: easeOut
```

### Phase 3: Character Resolution (Per Character)
```
charProgress (0 → 1)
┌────────────┐
│  Random    │ Mid-Decode │ Locked
│  Glyphs    │  Glyphs    │ Char
│  Noise     │            │
└────────────┴────────────┴───────
0%         40%           85%  100%
Passes: 3 (staggered waves)
```

### Phase 5: Camera Scale
```
scale: 1.0 → 1.08
└─────────────────────┐
                      │
                      ╲___
────────────────────────────
Duration: 1.0s | Easing: easeInOut
```

---

## 🎭 Glyphic Decode Visualization

### Character-by-Character Progress

```
Position 0: B (highest priority)
└─ 0ms:    △  (random glyph)
└─ 600ms:  B  (resolved early)
└─ 1200ms: B  (locked)

Position 1: A
└─ 100ms:   L  (glyphic noise)
└─ 700ms:   A  (resolving)
└─ 1300ms:  A  (locked)

Position 2: L
└─ 200ms:   @  (glyphic noise)
└─ 800ms:   L  (resolving)
└─ 1400ms:  L  (locked)

...and so on for each character
```

### Multi-Pass System

```
PASS 1 (0-800ms): First wave of resolution
B△L@ M▢G#SH M K → BA▢A MU▓#SH M K

PASS 2 (800-1600ms): Second wave of clarity
BA▢A MU▓#SH M K → BAL@ MUG#SH M K

PASS 3 (1600-2400ms): Final polish and lock
BAL@ MUG#SH M K → BALA MUGESH M K ✓
```

---

## 🔄 Return Visit Flow

### Session 1: First Visit
```
┌─────────────────────────────────────────┐
│ User opens portfolio                    │
├─────────────────────────────────────────┤
│ sessionStorage.getItem('portfolio-visited')
│ → null (not set)                        │
├─────────────────────────────────────────┤
│ PLAY FULL SEQUENCE (6.5s)               │
│ ├─ Black frame                          │
│ ├─ Welcome text                         │
│ ├─ Name decode ⭐                       │
│ ├─ Entering World                       │
│ ├─ Camera handoff                       │
│ └─ Hero appears                         │
├─────────────────────────────────────────┤
│ sessionStorage.setItem('portfolio-visited', 'true')
│ → stored for this session               │
└─────────────────────────────────────────┘
```

### Session 1: Return Visits (Refresh/Navigate)
```
┌─────────────────────────────────────────┐
│ User refreshes or navigates back        │
├─────────────────────────────────────────┤
│ sessionStorage.getItem('portfolio-visited')
│ → 'true' (found!)                       │
├─────────────────────────────────────────┤
│ SKIP SEQUENCE                           │
│ Hero section appears immediately        │
├─────────────────────────────────────────┤
│ Duration: < 0.5s                        │
└─────────────────────────────────────────┘
```

### New Session: Browser Tab/Incognito
```
┌─────────────────────────────────────────┐
│ User opens in new tab/incognito         │
├─────────────────────────────────────────┤
│ sessionStorage.getItem('portfolio-visited')
│ → null (new session, clean storage)     │
├─────────────────────────────────────────┤
│ PLAY FULL SEQUENCE AGAIN (6.5s)         │
│ (Same as first visit)                   │
├─────────────────────────────────────────┤
│ sessionStorage.setItem('portfolio-visited', 'true')
│ → stored for this new session           │
└─────────────────────────────────────────┘
```

---

## 🎯 HUD Alignment Animation (Phase 5)

### Camera Handoff Visual

```
        BEFORE CAMERA DRIFT
        
    ─────────────────────────
    (upper HUD line - hidden)
    
           Hero Text
        (scale 1.0, centered)
    
    ─────────────────────────
    (lower HUD line - hidden)


        DURING CAMERA DRIFT
        
        ─────────────────────  (1/4 width appears)
        
           Hero Text
        (scale 1.02, zoom in)
        
        ─────────────────────  (1/4 width appears)


        AT PEAK ZOOM
        
    ────────────────────────────  (full width visible)
             ●  (center point)
    ────────────────────────────
        
           Hero Text
        (scale 1.08, full zoom)
        Opacity rising


        FADE OUT PHASE
        
    ──────────────────────────
    (lines fade out)
             
           Hero Text
        (stays visible)
        
    ──────────────────────────
    (lines fade out)
```

### HUD Line Animation Details

```
Upper Line:
width: 0 → 280px (0.6s, easeOut)
opacity: 0 → 0.4 (0.6s, easeOut)
delay: 0ms

Center Point:
scale: 0 → 1 (0.5s, easeOut)
opacity: 0 → 0.5 (0.5s, easeOut)
delay: 0.2s

Lower Line:
width: 0 → 280px (0.6s, easeOut)
opacity: 0 → 0.4 (0.6s, easeOut)
delay: 0.1s

All Fade Out:
opacity: [all elements] → 0 (0.8s, easeInOut)
delay: 0.4s
```

---

## 💡 IMAX Backlight Gradient Visualization

```
RADIAL GRADIENT LAYERS:
════════════════════════════════════════

Layer 1 (Inner): Center Point
┌─────────────┐
│  White 8%   │ ← Bright glow at center
│   Opacity   │
└─────────────┘

Layer 2 (Middle): Fade Zone
├─────────────┤
│  White 2%   │ ← Gradual fade
│   Opacity   │
└─────────────┘

Layer 3 (Outer): Transparent
├─────────────────────────────┤
│      Transparent 0%         │ ← Fades to nothing
│   (Full transparency)       │
└─────────────────────────────┘


VISUAL EFFECT:
══════════════════════════════════════════

        ◌ ← Center (bright)
       ◐◐◐ ← Middle (fading)
      ◑◑◑◑◑ ← Outer (transparent)
     ◓◓◓◓◓◓◓ ← Far edges (invisible)


COVERAGE:
══════════════════════════════════════════

70% of viewport covered
Falloff distance: Smooth and natural
No sharp edges
Subtle but perceptible effect
```

---

## 📐 Text Sizing (Responsive)

### Hero Title: "BALA MUGESH M K"
```
Mobile:   text-4xl  = 36px
Tablet:   text-5xl  = 48px
Desktop:  text-6xl  = 60px

Font: Monospace (font-mono)
Weight: Bold (font-bold)
Tracking: 0.15em (tight spacing)
```

### Welcome Text
```
Mobile:   text-sm   = 14px
Tablet:   text-base = 16px
Desktop:  text-lg   = 18px

Font: Monospace
Tracking: 0.3em
```

### Transition Text
```
Mobile:   text-sm   = 14px
Tablet:   text-base = 16px
Desktop:  text-base = 16px

Font: Monospace
Tracking: 0.2em
```

---

## ⚙️ Performance Targets

### Frame Rate by Phase
```
Phase 1 (Black): 60fps ✓
Phase 2 (Welcome): 60fps ✓
Phase 3 (Decode): 60fps ✓ [Most complex]
Phase 4 (Entering): 60fps ✓
Phase 5 (Camera): 60fps ✓ [Scale animation]
Phase 6 (Hero): 60fps ✓
```

### Memory Usage
```
Peak Memory: < 50MB
Backlight CSS: 6.2KB (uncompressed)
Backlight CSS: 2.3KB (gzipped)
Util File: 2.8KB (uncompressed)
Util File: 1.1KB (gzipped)
```

---

## ✨ Final Frame States

```
FRAME 0: Black
╔═══════════════════╗
║                   ║
║      ■ BLACK      ║
║                   ║
╚═══════════════════╝

FRAME 1: Welcome Text
╔═══════════════════╗
║                   ║
║  WELCOME TO THE   ║
║   WORLD OF        ║
║                   ║
╚═══════════════════╝

FRAME 2: Name Decode (Mid)
╔═══════════════════╗
║                   ║
║ B△L@ M▢G#SH M K  ║
║  (glyphic chaos)  ║
║                   ║
╚═══════════════════╝

FRAME 3: Name Locked
╔═══════════════════╗
║                   ║
║ BALA MUGESH M K ✓ ║
║    (clarity)      ║
║                   ║
╚═══════════════════╝

FRAME 4: Transition
╔═══════════════════╗
║ BALA MUGESH M K   ║
║                   ║
║ ENTERING THE      ║
║    WORLD          ║
╚═══════════════════╝

FRAME 5: Camera Drift
╔═══════════════════╗
║  ─────────────    ║
║    BALA M...      ║ (zoomed in)
║      ●            ║ (center)
║  ─────────────    ║
╚═══════════════════╝

FRAME 6: Hero Arrives
╔═══════════════════╗
║ BALA MUGESH M K   ║
║ AI Engineer ·     ║
║ Full-Stack Dev    ║
║ Python Spec.      ║
║                   ║
║ Designing...      ║ (+ IMAX backlight glow)
╚═══════════════════╝
```

---

## 🎬 The Complete Cinematic Arc

```
EMOTIONAL JOURNEY:
═════════════════════════════════════════

0s      VOID → Anticipation builds
        ↓
0.5s    INVITATION → Welcome received
        ↓
2s      REVELATION ⭐ → Identity revealed
        ↓
4.5s    IMMINENT → Entering moment approaches
        ↓
5.5s    IMMERSION → Moving through the world
        ↓
6.5s    ARRIVAL → Welcome to the world
        ↓
        EXPLORATION → Portfolio awaits


VISUAL INTENSITY:
═════════════════════════════════════════

100% |
     |        ╱────╲        ╱──
     |       ╱      ╲      ╱
  50% |  ───╱        ╲────╱
     |
   0% |_________________________________
     0    1    2    3    4    5    6
        Phase Progression (seconds)

Peak intensity at Phase 3 (Name Decode)
```

---

## 🔗 Cross-Reference

For detailed information, see:
- [IMAX_LOADING_IMPLEMENTATION.md](./IMAX_LOADING_IMPLEMENTATION.md) - Technical details
- [IMAX_TESTING_GUIDE.md](./IMAX_TESTING_GUIDE.md) - Testing procedures
- [IMAX_QUICK_REFERENCE.md](./IMAX_QUICK_REFERENCE.md) - Quick reference

---

**This visual guide provides a complete picture of the IMAX loading experience flow, timing, and visual presentation.**

