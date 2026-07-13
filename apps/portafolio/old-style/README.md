# /old-style — archived design

Archived 2026-07-13, during the "dual-boot" redesign of zntsns.com.

This folder holds the previous portfolio design (the "Two Worlds" amber system:
hand-written CSS in `index.css`, Bricolage Grotesque + Hanken Grotesk type, a
light/dark toggle, and animated SVG project covers). It is kept verbatim as a
visual and code reference only.

## Rules

- Nothing here is imported, built, or shipped. Vite does not include this folder.
- Relative imports inside these files point at the original `src/` tree and will
  not resolve from here. That is expected. Do not try to "fix" them.
- The live content source of truth is `src/data/content.ts` at the project root,
  not a copy in here.

## What was archived

- `index.html` — old entry (Google Fonts `<link>` + pre-paint theme script)
- `src/main.tsx`, `src/App.tsx`, `src/index.css` — old entry, composition, styles
- `src/components/*` — 15 presentational components (Hero, About, Skills,
  Projects, Experience, Contact, Footer, Navbar, Logo, Icon, ProjectLogos,
  ProjectCover, CountUp, NeuralBackdrop, TerminalBackdrop)
- `src/hooks/*` — `useScrollReveal`, `useTheme`
- `public/*.svg` — old favicon and project marks (`favicon`, `portal`, `simmer`)

## What stayed live (reused by the new build)

- `src/data/content.ts` — content source of truth, reshaped in place
- `public/resume.pdf`, `og.jpg`, `robots.txt`, `sitemap.xml`
- build config: `package.json`, `vite.config.ts`, `tsconfig*`, `eslint.config.js`
