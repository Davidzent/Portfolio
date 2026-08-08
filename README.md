# ZNTSNS

**The monorepo behind [zntsns.com](https://www.zntsns.com) — a developer portfolio and the interactive demo apps it ships with.**

[![Deploy](https://github.com/Davidzent/ZNTSNS/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/Davidzent/ZNTSNS/actions/workflows/firebase-hosting-merge.yml)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![pnpm workspace](https://img.shields.io/badge/pnpm-workspace-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/workspaces)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](#license)

<!-- TODO: replace the badge URLs above if the repo is renamed or moved to another org. -->

---

## Table of contents

- [Overview](#overview)
- [Apps](#apps)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview

ZNTSNS is a pnpm workspace that builds several independent front ends into a single static site. Each app owns its own Vite config, `base` path, and dev port, and each writes its production output into a shared `dist/` at the repo root. Firebase Hosting serves that directory directly: no app uses client-side routing, so each one is reached through its own directory index and anything unmatched gets a real `404`.

The result is one deploy, one domain, and no coupling between apps — you can work on any of them in isolation.

**Audience:** primarily the author and anyone reading the code as a work sample. It is not a library and is not published to a package registry.

## Apps

| App | Path | Served at | Dev port | What it is |
|---|---|---|---|---|
| **Portfolio** | [`apps/portafolio`](apps/portafolio) | `/` | `5173` | The main portfolio site — animated hero, project showcase, 3D scene, and an in-page code editor / terminal. |
| **Simmer** | [`apps/simmer`](apps/simmer) | `/simmer/` | `5174` | A recipe finder built on the free [TheMealDB](https://www.themealdb.com) API — search by name, category, or ingredient, or shuffle. |
| **Portal Pantry** | [`apps/portal-pantry`](apps/portal-pantry) | `/portal-pantry/` | `5175` | A food-delivery front end with a fully mocked in-browser backend: two account roles, session auth, an owner analytics dashboard, reviews, and image uploads. |
| **Warehouse** | [`apps/warehouse`](apps/warehouse) | `/warehouse/` | `5176` | Inbound receiving against a real HTTP API — the only app that talks to a live backend. See [Configuration](#configuration). |
| **Aniversario** | [`apps/aniversario`](apps/aniversario) | `/aniversario/` | — | A single self-contained HTML page. Its "build" copies the file into `dist/`; there is no bundler and no dev server. |

Each app except Aniversario has its own README with screenshots and detail.

## Features

- **Independent apps, one deploy** — every app builds into a subfolder of the shared root `dist/` and is served from its own directory index. No app does path-based client routing, so there are no SPA rewrites and an unknown URL returns a genuine `404` instead of a soft one.
- **Parallel-build safe** — `emptyOutDir` is off in every app; the root `clean` script clears `dist/` exactly once so parallel `pnpm -r build` runs can't wipe each other's output.
- **Strict TypeScript everywhere** — `strict` lives in [`packages/tsconfig`](packages/tsconfig) and every app extends it. `tsc -b` project references run before every production build, so type errors fail the build.
- **One ESLint config, one dependency version** — apps extend [`packages/eslint-config`](packages/eslint-config), and shared dependency versions come from the `catalog:` in [`pnpm-workspace.yaml`](pnpm-workspace.yaml) so no two apps can drift onto different versions of Vite or React.
- **Continuous deployment** — pushes to `main` lint, build, and deploy to the live channel; pull requests get their own Firebase preview channel. Both are serialized so a slower run can't overwrite a newer one.
- **Cache headers that match the filenames** — only `assets/**` is `immutable` for a year, because only Vite's output carries a content hash. Files copied verbatim from an app's `public/` keep their names across deploys and take Hosting's short default TTL, so replacing one actually reaches visitors. HTML is `no-cache`, and each entry point is listed by its real extensionless path (`/`, `/simmer/`, …) — a glob on `*.html` matches the request URL, which none of them end in.
- **Crawlable HTML before any JS runs** — a build-only Vite plugin injects the portfolio's real copy, drawn from the same `content.ts` the app renders, into `#root`. It is clipped by a render-blocking rule so it never paints, and React replaces it on mount.
- **One lockfile** — a single `pnpm-lock.yaml` at the root; no app has its own.

## Installation

Requires **Node 24+** and **pnpm 11+** (the version is pinned via `packageManager` in `package.json`; `corepack enable` will pick it up automatically).

```bash
git clone https://github.com/Davidzent/ZNTSNS.git
cd ZNTSNS
pnpm install
```

## Usage

Run every app's dev server at once:

```bash
pnpm dev
```

Then open:

- Portfolio — <http://localhost:5173>
- Simmer — <http://localhost:5174/simmer/>
- Portal Pantry — <http://localhost:5175/portal-pantry/>
- Warehouse — <http://localhost:5176/warehouse/>

Work on a single app instead — the filter name is the directory name:

```bash
pnpm --filter portafolio dev
```

Type-check and build everything into `dist/`:

```bash
pnpm build
```

Preview a production build the way it will be served:

```bash
pnpm --filter portafolio preview
```

Lint everything, or one app:

```bash
pnpm lint
```

```bash
pnpm --filter portafolio lint
```

Run the tests:

```bash
pnpm test
```

`pnpm test` fans out to every app that defines a `test` script and passes when none do, so adding a suite to another app needs no change here. **Warehouse** is the app that has one — Vitest on jsdom, covering the request-ordering guard and the inventory panel. Watch it with `pnpm --filter warehouse test:watch`.

Note that Vitest strips types rather than checking them, so a test file can pass while failing `tsc -b`. `pnpm build` is what catches that.

## Configuration

| Where | What it controls |
|---|---|
| [`pnpm-workspace.yaml`](pnpm-workspace.yaml) | Workspace globs — `apps/*` and `packages/*` — and the `catalog:` that pins one version per shared dependency. Anything dropped into `apps/` is picked up automatically. |
| [`packages/tsconfig`](packages/tsconfig) | The `strict` TypeScript bases every app extends. |
| [`packages/eslint-config`](packages/eslint-config) | The ESLint flat config every app re-exports. |
| `apps/<app>/vite.config.ts` | The app's `base` public path, dev-server port, and `outDir` inside the shared `dist/`. |
| [`firebase.json`](firebase.json) | Hosting root and cache headers. No rewrites — apps are served from their directory indexes, and `dist/404.html` handles anything unmatched. |
| [`.firebaserc`](.firebaserc) | Default Firebase project (`zntsns-34aee`). |
| `PORT` env var | Overrides an app's dev-server port: `PORT=4000 pnpm --filter simmer dev`. |

### Warehouse and its API

Warehouse is the one app that calls a real backend, and it needs an origin for it.

- **In dev**, leave `VITE_API_BASE_URL` empty and set `VITE_API_TARGET` to the local API. The client then issues same-origin `/api` requests and the dev server proxies them, so the API needs no CORS setup. Copy [`.env.example`](apps/warehouse/.env.example) to `.env.local` to get this.
- **In production**, `VITE_API_BASE_URL` must be an absolute origin. CI supplies it from the `WAREHOUSE_API_URL` repository variable. **If it is missing, the CI build fails on purpose** — an empty value would point every request at the hosting origin, which serves no API, and the demo would 404 its way through a green deploy.

### Adding an app

1. Create `apps/<name>` with its own `package.json`, exposing at least a `build` script.
2. Take shared dependencies as `"catalog:"` rather than a version range, and add `@zntsns/eslint-config` and `@zntsns/tsconfig` as `"workspace:*"` dev dependencies.
3. Point `tsconfig.app.json` / `tsconfig.node.json` at the shared bases and re-export the shared ESLint config.
4. In its `vite.config.ts`, set `base: '/<name>/'`, `build.outDir: '../../dist/<name>'`, and `build.emptyOutDir: false`.
5. Add `/<name>/` to the `no-cache` header sources in [`firebase.json`](firebase.json) and an entry in [`sitemap.xml`](apps/portafolio/public/sitemap.xml). No rewrite is needed unless the app uses path-based client routing — none currently do.

## Deployment

The site is hosted on **Firebase Hosting**. Deployment is automatic:

- **Push to `main`** → [`firebase-hosting-merge.yml`](.github/workflows/firebase-hosting-merge.yml) builds the workspace and deploys to the live channel.
- **Open a pull request** → [`firebase-hosting-pull-request.yml`](.github/workflows/firebase-hosting-pull-request.yml) deploys a temporary preview channel.

To deploy by hand (requires the Firebase CLI and access to the project):

```bash
pnpm run deploy:hosting
```

The script is not called `deploy` because pnpm has a built-in command by that name that would shadow it.

Because `dist/` is plain static output, it can also be served by any static host.

## Contributing

This is a personal project, but issues and pull requests are welcome.

1. Fork the repo and branch off `main`.
2. Run `pnpm install`.
3. Make your change, then confirm it builds cleanly: `pnpm build`.
4. Lint: `pnpm lint`. CI runs this before it builds, so a lint error blocks the preview.
5. Open a pull request — CI will publish a preview URL you can link to in the description.

Keep changes scoped to a single app where possible; anything that changes `dist/` layout must be reflected in [`firebase.json`](firebase.json).

## License

The **code** is released under the **ISC License** — see [`LICENSE`](LICENSE), matching the declaration in [`package.json`](package.json).

Two things that licence does **not** cover:

- **Personal content.** The written copy, photography under [`apps/portafolio/public/travel`](apps/portafolio/public/travel), the portrait, and `resume.pdf` are not licensed for reuse. Take the code, not the biography.
- **Bundled third-party assets.** Portal Pantry ships three subset webfonts under the SIL Open Font License, with each family's licence alongside them — see [`apps/portal-pantry/src/app/fonts`](apps/portal-pantry/src/app/fonts).

`apps/simmer` and `apps/warehouse` carry their own copy of the licence, because [`publish-apps.yml`](.github/workflows/publish-apps.yml) splits those directories into standalone repositories where a root-level file would not follow.

## Acknowledgments

- [TheMealDB](https://www.themealdb.com) — free recipe API and photography powering Simmer.
- [Vite](https://vite.dev), [React](https://react.dev), and [pnpm](https://pnpm.io) — the foundation of the whole workspace.
- [Firebase Hosting](https://firebase.google.com/docs/hosting) and [`FirebaseExtended/action-hosting-deploy`](https://github.com/FirebaseExtended/action-hosting-deploy) — hosting and preview channels.
- [Phosphor Icons](https://phosphoricons.com), [GSAP](https://gsap.com), [Lenis](https://lenis.darkroom.engineering), [Motion](https://motion.dev), and [Three.js](https://threejs.org) — motion and visuals in the portfolio app.

---

Built by **David Guijosa** · [zntsns.com](https://www.zntsns.com) · [davidgin641@gmail.com](mailto:davidgin641@gmail.com)
