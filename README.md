# Lala's Bistro — Website Redesign

A modern, art-directed marketing site for **Lala's Bistro**, the boho-chic resto-bar
tucked inside the Lala's Lagos boutique hotel in Victoria Island, Lagos.

A bold, dark-canvas "Noir & Lime" concept — near-black throughout, cream type and
an electric lime accent, built to feel modern and to stand out.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** for tooling / dev server / build
- **Tailwind CSS v4** (configured via CSS `@theme`, no `tailwind.config.js`)
- **GSAP** + `@gsap/react` (`useGSAP`) with **ScrollTrigger** for scroll-driven motion
- **Lenis** for buttery smooth scrolling, synced to GSAP's ticker

## Design language

| Token | Value     | Use                          |
| ----- | --------- | ---------------------------- |
| Ink   | `#0F0F0D` | Page background (near-black)  |
| Coal  | `#1E1E1A` | Raised panels / cards         |
| Cream | `#F4F1E9` | Primary text                  |
| Lime  | `#C9F24D` | Accent (buttons, marks, glow) |
| Stone | `#9B968A` | Muted / secondary text        |

Type pairing: **Fraunces** (display serif) + **Inter** (UI sans).

## Structure

Restructured into a dark-dominant flow: **Hero → marquee → Manifesto → horizontal
pinned Signatures showcase → Story → light Menu break → Patio → auto-scroll Gallery
→ Visit → Footer.**

## GSAP highlights

- Custom trailing **cursor** with `data-cursor` labels (desktop only)
- Top **scroll-progress** bar
- Animated **preloader**, masked hero reveal, magnetic CTAs
- **Pinned horizontal scroll** showcase (`gsap.matchMedia`, desktop) that becomes a
  snap-scroll carousel on mobile
- Masked **word-by-word headline** reveals with a lime "marker" accent
- Clip-path image reveals, parallax, dual marquees, animated stat counters
- `prefers-reduced-motion` guards throughout

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to /dist
npm run preview  # preview the production build
npm run typecheck
```

## Project structure

```
src/
├─ components/        # Page sections (Hero, Menu, Experience, …)
│  └─ ui/             # Small reusable pieces (Eyebrow, Grain, Leaf, MagneticButton…)
├─ data/site.ts       # Single source of truth: nav, menu, hours, contact
├─ lib/               # GSAP plugin registration + Lenis smooth-scroll hook
├─ App.tsx
├─ main.tsx
└─ index.css          # Tailwind import, theme tokens, base + utilities
```

## Customising content

All copy, menu items, prices, hours and contact details live in
[`src/data/site.ts`](src/data/site.ts) — edit there to update the site.

The site uses **real photography** (Unsplash CDN) for the hero strip, signatures
showcase, story, patio, gallery and visit panels. The image URLs live in the
`images`, `signatures` and `gallery` entries in `site.ts` — swap the Unsplash ids
(or paste full URLs) for the venue's own photos.

The hero uses an **animated Canvas backdrop** (`HeroCanvas`) — drifting lime/cream
"ember" sparks over a slow-moving glow on near-black, with zero external
dependencies. It honors `prefers-reduced-motion`. To use real footage instead, swap
`<HeroCanvas/>` in `Hero.tsx` for a `<video autoPlay muted loop playsInline>` and
point it at a self-hosted clip in `public/`.

Images render through a `SmartImg` / `ArtPanel` **graceful fallback**: if an image is
missing or blocked, a noir/lime gradient shows instead of a broken-image icon — so
the layout never breaks.

> Menu items and prices are representative of Lala's Bistro's real offering and the
> published ₦ price bands; confirm exact figures with the restaurant before going live.
