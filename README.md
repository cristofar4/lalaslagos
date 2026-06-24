# Lala's Bistro — Website Redesign

A modern, art-directed marketing site for **Lala's Bistro**, the boho-chic resto-bar
tucked inside the Lala's Lagos boutique hotel in Victoria Island, Lagos.

This is a ground-up redesign concept built to feel warm, editorial and unmistakably
"boho luxe" — deep greenery, terracotta, candlelight and slow Lagos afternoons.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** for tooling / dev server / build
- **Tailwind CSS v4** (configured via CSS `@theme`, no `tailwind.config.js`)
- **GSAP** + `@gsap/react` (`useGSAP`) with **ScrollTrigger** for scroll-driven motion
- **Lenis** for buttery smooth scrolling, synced to GSAP's ticker

## Design language

| Token        | Value     | Use                            |
| ------------ | --------- | ------------------------------ |
| Bone         | `#F3EAD9` | Page background (warm cream)    |
| Forest       | `#2C362C` | Deep greenery / dark sections   |
| Clay         | `#C0694A` | Terracotta accent               |
| Ochre        | `#C9A24B` | Gold highlights                 |
| Espresso     | `#241B12` | Primary text                    |

Type pairing: **Fraunces** (display serif) + **Inter** (UI sans).

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

The visuals are intentionally **self-contained** (CSS gradients + SVG art direction,
film grain, botanical line-art) so the site looks cohesive with zero external image
dependencies. To use real photography, each art-directed panel accepts an optional
image; drop URLs into the `image` fields in `site.ts` and they'll render in place of
the gradient art.

> Menu items and prices are representative of Lala's Bistro's real offering and the
> published ₦ price bands; confirm exact figures with the restaurant before going live.
