<div align="center">

# David Guijosa — Developer Portfolio

**Full-Stack Software Engineer & Game Developer** · Riverside, CA

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
![No runtime deps](https://img.shields.io/badge/runtime%20deps-just%20React-34D399)

[Live site](https://www.zntsns.com) · [LinkedIn](https://www.linkedin.com/in/davidguijosa/) · [GitHub](https://github.com/Davidzent)

</div>

![Portfolio hero](docs/hero.jpg)

A single-page portfolio built with **React 19 + TypeScript + Vite** — no UI
libraries, zero runtime dependencies beyond React itself. Beyond the résumé,
it ships **two full interactive demo apps** that run entirely in the browser.

---

## Highlights

- **Content-driven** — every word, link, project, and job lives in one file:
  [`src/data/content.ts`](src/data/content.ts).
- **Dark / light theme** — respects system preference, persists the choice, and
  applies before first paint (no flash).
- **Fully responsive** — desktop, tablet, and mobile with a slide-down menu.
- **Polished** — scroll-reveal animations (with `prefers-reduced-motion`),
  active-section nav tracking, copy-email, SEO/OG tags, accessible landmarks.
- **Two live demos** shipped as extra pages in one multi-page Vite build.

![Projects section](docs/projects.jpg)

---

## Built-in live demos

Both are self-contained, fully client-side, and part of this same build.

| Demo | What it is | Source | Readme |
|------|-----------|--------|--------|
| **Portal Pantry** | An interdimensional food-delivery app (Uber-Eats-for-the-multiverse) with a **mock backend**, customer & store-owner roles, an owner analytics dashboard, reviews, and image uploads. | [`src/portal-pantry/`](src/portal-pantry/) | [Read more →](src/portal-pantry/README.md) |
| **Simmer** | A warm, standalone **recipe finder** on [TheMealDB](https://www.themealdb.com) — search by name, category, or ingredient, or shuffle random meals. | [`src/simmer/`](src/simmer/) | [Read more →](src/simmer/README.md) |

<table>
  <tr>
    <td width="50%"><img src="docs/portal-pantry/storefront.jpg" alt="Portal Pantry"><p align="center"><em>Portal Pantry</em></p></td>
    <td width="50%"><img src="docs/simmer/home.jpg" alt="Simmer"><p align="center"><em>Simmer</em></p></td>
  </tr>
</table>

---

## Tech stack

- **Framework:** React 19, TypeScript (strict), Vite 8 (multi-page build)
- **Styling:** hand-written CSS with custom properties (design tokens), no CSS
  frameworks
- **Tooling:** ESLint, `tsc` project references
- **Zero runtime dependencies** beyond `react` / `react-dom`

## Project structure

```
src/
├─ components/       Portfolio sections (Hero, About, Skills, Projects…) + shared UI
├─ data/content.ts  Single source of truth for all portfolio copy
└─ hooks/           useTheme, useScrollReveal
```

## Getting started

```bash
npm install
npm run dev      # dev server (http://localhost:5173)
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build
```

The demos live at `/simmer/` and `/portal-pantry/`.

## Deploy

The `dist/` output is fully static — deploy to Vercel, Netlify, Cloudflare
Pages, GitHub Pages, or any static host.

---

<div align="center">

Designed & built by **David Guijosa** ·
[zntsns.com](https://www.zntsns.com) ·
[davidgin641@gmail.com](mailto:davidgin641@gmail.com)

</div>
