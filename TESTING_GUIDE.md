# Cinematic Sequence Testing Guide

## Quick Start

1. **Start dev server**:
   ```bash
   npm run dev
   ```
   Opens at: `http://localhost:8081/`

2. **First Visit**: Watch the complete 5-second loading sequence
   - **0–0.5s**: Black frame (no motion)
   - **0.5–2s**: "SIGNAL DETECTED" fades in and holds
   - **2–3s**: "BALA MUGESH M K" decodes with controlled multi-pass
   - **3–4s**: "IDENTITY CONFIRMED" appears and fades
   - **4–5s**: Minimal HUD alignment lines, camera drift
   - **5s+**: Hero section resolves via focus-pull, ready to scroll

3. **Revisit (Same Session)**: Hard refresh or revisit in same browser session
   - Skips loading sequence entirely
   - Goes directly to hero section
   - Text is already in place (no decoding replay)

4. **New Session**: Clear session storage or use incognito/private window
   - Full sequence plays again
   - System initializes fresh

---

## Performance Targets

- ✅ **No frame drops**: 60fps throughout
- ✅ **Loading duration**: Exactly 5 seconds (GSAP timeline precision)
- ✅ **Hero reveal**: ~3 seconds total (label + name + roles + tagline)
- ✅ **Revisit skip**: <500ms to hero display

---

## What to Look For

### Loading Sequence (First Visit):

| Phase | Timing | Expected Behavior | Check |
|-------|--------|-------------------|-------|
| Black Frame | 0–0.5s | Pure black, no motion | [ ] Absolute stillness |
| Signal | 0.5–2s | "SIGNAL DETECTED" fades in, holds | [ ] Single line, minimal grid |
| Decode | 2–3s | Name shifts through glyphs, locks character-by-character | [ ] Horizontal stabilization (NOT chaotic) |
| Confirm | 3–4s | "IDENTITY CONFIRMED" appears and fades | [ ] Secondary confirmation text |
| Handoff | 4–5s | HUD alignment lines, subtle drift | [ ] Minimal motion, no aggression |
| Transition | 5s+ | Hero emerges via focus-pull (blur→clarity) | [ ] Smooth, deterministic reveal |

### Hero Section (All Visits):

| Element | Timing | Expected | Check |
|---------|--------|----------|-------|
| "SIGNAL LOCKED" | 0–1.4s | Blurred → clear (opacity 0.2→0.6) | [ ] First element resolves |
| Name | 0.2–1.8s | Deep blur → sharp (opacity 0.3→1.0) | [ ] Largest text, emphasis |
| Roles | 0.4–1.9s | Blur fades (opacity 0.2→0.8) | [ ] Secondary text clarity |
| Tagline | 0.6–2.4s | Blur → clarity (opacity 0.1→0.7) | [ ] Final lock-in, holds 1-2s |
| Grid | Always | Barely visible (~8% opacity) | [ ] Subtle, not prominent |
| Scroll Indicator | After hero | Appears, pulses downward | [ ] Signals readiness |

---

## Debug Checklist

### Timing Issues?
1. Open DevTools → Console
2. Check for GSAP timeline logs:
   ```javascript
   // In LoadingSequence.tsx:
   // timeline.to({}, { onStart: () => console.log('Phase 0'), ... }, 0.5)
   ```
3. Verify sequence progresses on schedule

### Decoding Not Working?
1. Check DecodingText component receives correct props:
   - `text="BALA MUGESH M K"`
   - `passes={2}`
   - `duration={1000}` (in ms)
2. Verify glyph set renders: `GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'`
3. Look for console errors

### Hero Text Not Resolving?
1. Ensure HeroSection has `useInView` hook active
2. Check blur filters are supported (DevTools → Computed Styles → filter)
3. Verify opacity transitions are smooth (not stuck at 0 or 1)

### Blur Not Working?
1. Test in Chrome first (most stable)
2. Check CSS `filter: blur(Xpx)` is valid
3. Verify no conflicting `backdrop-filter` rules
4. Mobile: Blur may be disabled on low-end devices (acceptable)

### Revisit Not Skipping?
1. Check sessionStorage is enabled
2. Verify `sessionStorage.getItem('portfolio-initialized')` returns 'true'
3. Try incognito/private window to test fresh sequence

---

## Performance Profiling

### Using Chrome DevTools:

1. **Performance Tab**:
   - Record loading sequence
   - Check for 60fps (no red frames)
   - Look for layout thrashing or style recalculations

2. **Rendering Tab**:
   - Enable "Show Rendering Stats"
   - Verify FPS stays stable during blur/opacity transitions

3. **Lighthouse**:
   - Run audit (should target >90 Performance)
   - Check for layout shifts (CLS < 0.1)

### Mobile Testing:
- Use DevTools device emulation or actual device
- Check paralax doesn't cause jank
- Blur may be simplified or disabled
- Verify touch interactions don't interfere

---

## Visual Validation

### Color Accuracy:
- **Black frame**: Should be absolute void (no visible pixels)
- **Cyan accents**: Should be bright, crisp (hsl(190 100% 50%))
- **Grid**: Should be barely visible (~8% opacity)
- **Text**: White should contrast strongly against void

### Typography:
- **Decoding phase**: Monospace (JetBrains Mono or fallback)
- **Hero display**: Display font (Orbitron or Inter fallback)
- **HUD elements**: Monospace, tracking-widest
- **No serif fonts** should appear

### Motion Quality:
- ✅ Smooth, deterministic transitions
- ✅ No jittering or jumping
- ✅ Blur fades progressively, not in steps
- ❌ No bouncing, overshooting, or elastic easing
- ❌ No chaotic character flicker during decode

---

## Testing Scenarios

### Scenario 1: First Visit (Fresh Session)
```
1. Open http://localhost:8081/ in new incognito window
2. Watch 5-second sequence from start
3. Hero section should be fully revealed and ready
4. Scroll to explore other sections
5. Expected: Smooth, controlled, no stutters
```

### Scenario 2: Revisit (Same Session)
```
1. After completing Scenario 1, refresh page (Ctrl+R or Cmd+R)
2. Should skip loading sequence entirely
3. Jump directly to hero
4. Expected: <500ms to hero display, no decoding replay
```

### Scenario 3: New Session (After Clear Storage)
```
1. DevTools → Application → Session Storage → Clear All
2. Refresh or navigate to http://localhost:8081/
3. Should play full 5-second sequence again
4. Expected: Identical to Scenario 1
```

### Scenario 4: Mobile Emulation
```
1. DevTools → Device Emulation (iPhone 12 or Galaxy S10)
2. Watch sequence on mobile viewport
3. Check for layout shifts or blur artifacts
4. Expected: All animations remain smooth, blur simplified if needed
```

### Scenario 5: Reduced Motion
```
1. System Preferences → Accessibility → Reduce Motion (macOS)
   or System Settings → Ease of Access → Display → Reduce Motion (Windows)
2. Refresh page
3. Expected: Faster transitions, no parallax motion
   (if implemented - see App.css for @media (prefers-reduced-motion))
```

---

## Common Issues & Fixes

### Issue: Sequence plays but name doesn't decode
**Fix**: Check DecodingText component receives `nameDecodeStart={true}` in LoadingSequence
```tsx
{nameDecodeStart && (
  <DecodingText
    text="BALA MUGESH M K"
    duration={1000}
    passes={2}
  />
)}
```

### Issue: Hero text appears blurry even after reveal
**Fix**: Verify `filter: 'blur(0px)'` in animate state
```tsx
animate={{ opacity: 1, filter: 'blur(0px)' }}
```

### Issue: Timing is off by several seconds
**Fix**: Ensure GSAP timeline timings match LoadingSequence phase changes
- 0.5s: SIGNAL
- 2.0s: DECODE starts
- 3.0s: CONFIRM starts
- 4.0s: HANDOFF starts
- 5.0s: EXIT

### Issue: Revisit behavior not working
**Fix**: Clear browser cache and session storage
```javascript
sessionStorage.clear();
location.reload();
```

### Issue: Grid is too visible or text is too dim
**Fix**: Adjust opacity in HeroSection
```tsx
opacity-[0.08]  // Change to desired percentage
text-white/50   // Adjust opacity class
```

---

## Browser Compatibility Matrix

| Browser | Blur | Opacity | GSAP | Parallax | Status |
|---------|------|---------|------|----------|--------|
| Chrome 120+ | ✅ | ✅ | ✅ | ✅ | Full |
| Firefox 121+ | ✅ | ✅ | ✅ | ✅ | Full |
| Safari 17+ | ✅* | ✅ | ✅ | ⚠️ | Good* |
| Edge 120+ | ✅ | ✅ | ✅ | ✅ | Full |
| Mobile Chrome | ⚠️ | ✅ | ✅ | ⚠️ | Good |
| Mobile Safari | ⚠️ | ✅ | ✅ | ⚠️ | Good |

*Safari: Blur may stutter on older devices; parallax simplified

---

## Next Steps

1. ✅ Build passes with no errors
2. ✅ Dev server runs successfully
3. 🔍 **MANUAL TESTING**: Open browser, verify each phase
4. 📊 **PERFORMANCE**: Profile with DevTools
5. 📱 **MOBILE**: Test on actual device or emulation
6. 🎯 **TIMING VALIDATION**: Ensure ±100ms tolerance
7. 🚀 **DEPLOYMENT**: Ready for production build

---

## Production Checklist

Before deploying:
- [ ] Timing validated (all phases within ±100ms)
- [ ] No console errors or warnings
- [ ] Performance score >90 (Lighthouse)
- [ ] Mobile responsive and smooth
- [ ] Revisit behavior confirmed working
- [ ] Session storage not interfering with user data
- [ ] Accessibility tested (keyboard nav after sequence)
- [ ] Browser compatibility verified (Chrome, Firefox, Safari)
- [ ] Asset loading optimized (no large JS/CSS bundles)
- [ ] Glyph set rendering correctly during decode
