# Lala's Bistro — Website Redesign

A modern, art-directed marketing site for **Lala's Bistro**, the boho-chic resto-bar
tucked inside the Lala's Lagos boutique hotel in Victoria Island, Lagos.

This is a ground-up redesign concept built to feel mature, editorial and upscale —
a refined palette of charcoal, ivory, brass and bordeaux, candlelight and slow
Lagos evenings.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** for tooling / dev server / build
- **Tailwind CSS v4** (configured via CSS `@theme`, no `tailwind.config.js`)
- **GSAP** + `@gsap/react` (`useGSAP`) with **ScrollTrigger** for scroll-driven motion
- **Lenis** for buttery smooth scrolling, synced to GSAP's ticker

## Design language

| Token    | Value     | Use                          |
| -------- | --------- | ---------------------------- |
| Bone     | `#EFE9DD` | Page background (ivory)       |
| Forest   | `#242019` | Charcoal / dark sections      |
| Clay     | `#7C403B` | Bordeaux accent (primary)     |
| Ochre    | `#B0894F` | Brass highlights (secondary)  |
| Espresso | `#211C15` | Primary text                  |

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

The site uses **real photography** (Unsplash CDN) for the hero, story, signatures,
patio and visit panels. The image URLs are defined in the `images` object and the
`signatures` list in `site.ts` — swap the Unsplash ids (or paste full URLs) for the
venue's own photos.

Every `ArtPanel` keeps a matured gradient composition (grain + vignette) underneath
the photo as a **graceful fallback**: if an image is missing or blocked, the panel
shows the gradient instead of a broken-image icon — so the layout never breaks.

> Menu items and prices are representative of Lala's Bistro's real offering and the
> published ₦ price bands; confirm exact figures with the restaurant before going live.
