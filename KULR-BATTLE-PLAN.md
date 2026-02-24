# Kulr Battle Plan — Beating Coolors.co

## Competitor Analysis: Coolors.co

### What They Do Well
- **Brand recognition**: 8M+ users, trusted by Netflix/Apple/Disney
- **Ecosystem**: iOS app, Figma plugin, Chrome extension, Adobe add-on
- **Gradient Maker**: Separate tool we don't have yet
- **Visualizer**: 30+ SVG templates across 5 categories (Mobile, Branding, Typography, Pattern, Illustration) — can upload custom SVGs
- **Image Picker**: Upload, URL, camera, stock photos — very flexible
- **Explore**: Millions of community palettes, search, tags, trending
- **AI features**: 3000 credits/mo on Pro for AI color suggestions
- **Export breadth**: URL, PDF, Image, CSS, ASE, SVG, Tailwind, embed, social

### Where They're Weak (Our Attack Surface)
1. **Paywall everything useful**: Free = 5 colors max, 10 saved palettes, 1 project, 1 collection, ADS everywhere
2. **$3/month for basics**: Dark mode is PRO-ONLY. Contrast checker is PRO-ONLY. That's hostile.
3. **Design is dated**: Functional but boring. White background, no visual personality, looks like 2019
4. **No real-time preview on generator**: You generate, then go to a separate visualizer page
5. **No gradient integration in palette flow**: Gradient maker is a separate disconnected tool
6. **No color blindness simulation on free**: Accessibility should be free
7. **Landing page is generic SaaS**: Nothing memorable, template vibes

### Their Pricing Model
- Free: 5 colors, 10 saves, 1 project, ads, no dark mode, no contrast checker
- Pro: $3/mo — unlimited saves, 10 colors, AI, dark mode, no ads

---

## Our Strategy: "Everything Free, Everything Better"

### Core Philosophy
> Coolors nickels and dimes designers for basic features. We give everything away for free, with a better experience. No accounts, no paywalls, no ads.

### Brand Identity
- **Name**: Kulr (stylized lowercase: kulr)
- **Tagline**: "Colors that click."
- **Personality**: Premium, fast, generous, keyboard-first
- **Visual Identity**: Dark-first, glassmorphism, gradient accents (purple→pink→amber)
- **Fonts**: Inter (UI), JetBrains Mono (color codes)

### What Makes Us DIFFERENT (Not Just a Clone)
1. **100% free, forever**: Everything Coolors charges for — free. Dark mode, contrast checker, unlimited saves, 10 colors, all exports.
2. **Inline visualizer**: See your palette on UI mockups WITHOUT leaving the generator page
3. **Gradient mode built into generator**: Toggle between palette mode and gradient mode in the same tool
4. **Color blindness simulation**: Toggle to see how your palette looks with protanopia, deuteranopia, tritanopia — FREE
5. **Smart harmony suggestions**: As you pick colors, we suggest harmonious additions
6. **Shareable via URL**: Entire palette encoded in the URL hash — share without accounts
7. **Premium dark aesthetic**: Makes Coolors look like a government website

---

## Page-by-Page Battle Plan

### 1. Landing Page (`/`)
**Goal**: Make visitors think "this looks like a $50M startup"
- Hero: Animated gradient mesh background (CSS, not images), giant typography, clear value prop
- Live interactive demo: A mini palette generator right on the landing page — click to randomize
- Feature cards with micro-animations on hover
- Comparison section: "Why Kulr?" showing free vs Coolors Pro
- No fake testimonials — be honest, show the tool quality instead
- Smooth scroll animations, staggered reveals

### 2. Palette Generator (`/generate`) — THE CORE
**Goal**: Better than Coolors in every measurable way
- Full viewport, N columns (2-10, default 5) — ALL FREE
- Each column: full-height color, hex/rgb/hsl display, color name, copy button, lock toggle, shade picker, delete
- Bottom toolbar: generate, undo/redo, add/remove, harmony selector, gradient toggle, export, save
- Keyboard: Space=generate, L=lock, C=copy, E=export, V=toggle visualizer sidebar, G=gradient mode, B=color blind sim
- **INLINE VISUALIZER PANEL**: Toggle a right sidebar showing the palette on a mini dashboard/landing/mobile mockup — live updates as you change colors
- **GRADIENT MODE**: Toggle to convert the palette strip into a gradient preview with adjustable direction, type (linear/radial/conic), and CSS copy
- **COLOR BLIND SIM**: Toggle overlay that simulates how the palette looks under different vision deficiencies
- Smooth 300ms color transitions, satisfying feedback on every action
- Smart generation: Golden ratio hue distribution + optional harmony modes (analogous, complementary, triadic, split, tetradic, monochromatic)

### 3. Explore Page (`/explore`)
**Goal**: Beautiful browsing experience
- 30+ curated palettes with evocative names, organized by mood/category
- Saved palettes from localStorage with heart icon
- Grid cards with color strip preview, hover to see details
- Search by name or color tag
- Filter chips for categories
- Click to open in generator

### 4. Image Extractor (`/extract`)
**Goal**: Faster and more visual than Coolors
- Drag-drop or click to upload (client-side only, no server upload — privacy win)
- Instant k-means extraction with adjustable color count (3-8)
- Color strip preview below image
- "Open in Generator" one-click flow
- Show dominant color percentages

### 5. Contrast Checker (`/contrast`)
**Goal**: Free what Coolors charges for
- Two color panels (foreground + background) with visual pickers
- Live preview of text at multiple sizes
- WCAG 2.1 AA/AAA badges with clear pass/fail
- "Suggest accessible alternative" button
- Swap colors button
- Real-time ratio display

### 6. Palette Visualizer (`/visualizer`)
**Goal**: Better templates than Coolors' 30+
- Dashboard, Landing Page, Mobile App template mockups
- Live color application — change palette, see instant update
- Built with actual Tailwind/CSS, not static SVGs — looks real
- Template selector tabs

### 7. NEW: Gradient Maker (`/gradient`) — COOLORS HAS THIS, WE NEED IT
**Goal**: Integrated gradient tool
- Visual gradient bar with draggable color stops
- Type: linear, radial, conic
- Angle control
- Add/remove stops
- Copy CSS button
- "Use palette colors" — auto-populate stops from current palette

---

## Technical Architecture
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion for all animations
- Zustand for state (palette, settings, saved palettes)
- next-themes for dark/light
- colord for color science
- 100% client-side — no backend, no database, no accounts
- localStorage for persistence
- URL encoding for sharing

## Design Tokens
- Background: #0A0A0B (dark), #FAFAF9 (light)
- Surface: #141415 (dark)
- Accent gradient: #8B5CF6 → #EC4899 → #F59E0B
- Border: rgba(255,255,255,0.06)
- Glass: backdrop-blur-20px + semi-transparent bg
- Radius: sm(6), md(10), lg(16), xl(24)
- Font scale: Inter 14-72px, JetBrains Mono for codes

---

## Agent Deployment Plan

### Wave 1 (Parallel) — Foundation
1. **Designer**: Rewrite globals.css with premium design tokens, create SVG logo, refine the glass/glow aesthetic
2. **Engine**: Rebuild color engine with gradient support, color blind simulation, OKLCH perceptual colors, smarter harmony generation

### Wave 2 (Parallel, after Wave 1) — Pages
3. **Landing**: Rewrite landing page — interactive demo, comparison section, premium animations
4. **Generator**: Rewrite generator — inline visualizer sidebar, gradient mode toggle, color blind sim, better shade picker
5. **Tools**: Rewrite Extract + Contrast + Visualizer + NEW Gradient page

### Wave 3 — Polish
6. **Reviewer**: Test build, fix errors, verify all pages, check responsive, polish animations
