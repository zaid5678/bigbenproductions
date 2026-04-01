# CLAUDE.md

Read this file first. Every time. No exceptions.

## Pre-Flight (Do This Before Writing Any Code)

1. **Always do first. Invoke the frontend-design skill before writing any frontend code, every session, no exceptions.**
2. Run the UI/UX Pro Max skill from `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git` — use its design system generator to derive style, palette, typography, and layout pattern before touching markup. If installed locally via `uipro init --ai claude`, reference `.claude/skills/ui-ux-pro-max/SKILL.md` and run the search script against the photography product type.

## Project Overview

Photography portfolio and booking site. The design must feel like a working photographer built it — not a template, not a tech demo. Every decision should serve the work (the photos) first.

## Stack

- HTML + Tailwind CSS (default)
- Vanilla JS where interaction is needed
- No frameworks unless explicitly asked

## Design Direction

**Mood:** Editorial, unhurried, gallery-like. Think printed photo book, not SaaS landing page.

**Layout principles:**
- Full-bleed imagery — photos run edge-to-edge where possible
- Generous whitespace; let images breathe
- Asymmetric grids over rigid columns
- Minimal chrome — navigation stays out of the way until needed
- Mobile-first; images should dominate on every viewport

**What to avoid:**
- Anything that competes with the photos (busy backgrounds, heavy UI elements, decorative gradients)
- Stock-photo placeholder energy — use solid grey boxes with aspect ratios if no images are provided yet
- Carousel sliders with arrows and dots — use scroll-snap or simple fade transitions instead

## Frontend Aesthetics (Mandatory)

Do not converge on generic, safe defaults. Make creative, distinctive choices that feel genuinely designed for a photographer's context.

**Typography:** Pick fonts with personality. No Inter, Roboto, Arial, or system defaults. Lean toward editorial/serif display fonts for headings paired with a clean geometric sans for body. Vary choices between projects — don't default to Space Grotesk or DM Sans every time.

**Colour:** Commit to a cohesive palette. Use CSS custom properties for consistency. For photography sites, restraint works — near-black backgrounds with warm or cool off-whites, a single accent colour for CTAs. Dominant tones with sharp accents beat evenly-distributed palettes. Avoid purple-on-white AI gradients.

**Motion:** CSS-only transitions preferred. One well-orchestrated page load with staggered reveals (animation-delay) beats scattered hover effects. Respect `prefers-reduced-motion`. Image reveal animations (fade/slide-up on scroll) add polish — keep them under 400ms.

**Backgrounds:** Atmosphere over flat colour. Subtle texture, grain overlays, or very soft gradients that reference darkroom / print aesthetics. Nothing that fights the photography.

## Code Standards

- Semantic HTML — `<header>`, `<main>`, `<section>`, `<figure>`, `<figcaption>`
- Images get `loading="lazy"`, explicit `width`/`height` or `aspect-ratio`, and descriptive `alt` text
- Accessibility: 4.5:1 contrast minimum, visible focus states, keyboard-navigable galleries
- `cursor-pointer` on every clickable element
- Hover states with smooth transitions (150–300ms)
- No emoji as icons — use inline SVGs (Lucide or Heroicons)

## Pre-Delivery Checklist

Before marking anything as done:

- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No layout shift from images (dimensions declared)
- [ ] `prefers-reduced-motion` respected
- [ ] All interactive elements have focus-visible styles
- [ ] Lighthouse accessibility score ≥ 90
- [ ] No orphaned `console.log` statements
- [ ] Fonts loaded via `font-display: swap`
- [ ] CSS custom properties used for all colours and spacing tokens

## File Structure

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── images/
└── CLAUDE.md          ← you are here
```

## Workflow

1. Read this file
2. Invoke frontend-design skill + UI/UX Pro Max skill
3. Generate design system (palette, fonts, spacing, layout pattern)
4. Build mobile-first, section by section
5. Run through pre-delivery checklist
6. Ship
