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

ZNTSNS is a pnpm workspace that builds several independent front ends into a single static site. Each app owns its own Vite config, `base` path, and dev port, and each writes its production output into a shared `dist/` at the repo root. Firebase Hosting serves that directory, with rewrites mapping every app to its own SPA entry point.

The result is one deploy, one domain, and no coupling between apps — you can work on any of them in isolation.

**Audience:** primarily the author and anyone reading the code as a work sample. It is not a library and is not published to a package registry.

## Apps

| App | Path | Served at | Dev port | What it is |
|---|---|---|---|---|
| **Portfolio** | [`apps/portafolio`](apps/portafolio) | `/` | `5173` | The main portfolio site — animated hero, project showcase, 3D scene, and an in-page code editor / terminal. |
| **Portal Pantry** | [`apps/portal-pantry`](apps/portal-pantry) | `/portal-pantry/` | `5175` | A food-delivery front end with a fully mocked in-browser backend: two account roles, session auth, an owner analytics dashboard, reviews, and image uploads. |
| **Simmer** | [`apps/simmer`](apps/simmer) | `/simmer/` | `5174` | A recipe finder built on the free [TheMealDB](https://www.themealdb.com) API — search by name, category, or ingredient, or shuffle. |
| **Aniversario** | [`apps/aniversario`](apps/aniversario) | `/aniversario` | — | A single hand-written HTML page. Its "build" copies the file into `dist/`. |

Each app has its own README with screenshots and detail.

## Features

- **Independent apps, one deploy** — every app builds into a subfolder of the shared root `dist/`; Firebase rewrites route each to its own `index.html`.
- **Parallel-build safe** — `emptyOutDir` is off in every app; the root `clean` script clears `dist/` exactly once so parallel `pnpm -r build` runs can't wipe each other's output.
- **Strict TypeScript everywhere** — `tsc -b` project references run before every production build, so type errors fail the build.
- **Continuous deployment** — pushes to `main` deploy to the live channel; pull requests get their own Firebase preview channel.
- **Long-lived asset caching** — hashed `js`/`css`/`woff2`/`webp` are served `immutable` for a year, HTML `no-cache`.
- **No app-level lockfiles** — a single `pnpm-lock.yaml` at the root keeps shared dependency versions aligned.

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

Work on a single app instead:

```bash
pnpm --filter portfolio dev
pnpm --filter simmer dev
pnpm --filter portal-pantry dev
```

Type-check and build everything into `dist/`:

```bash
pnpm build
```

Preview a production build the way it will be served:

```bash
pnpm --filter portfolio preview
```

Lint one app:

```bash
pnpm --filter portfolio lint
```

<!-- TODO: no test runner is configured yet — `pnpm test` currently exits 1. Remove this note once tests exist. -->

## Configuration

| Where | What it controls |
|---|---|
| [`pnpm-workspace.yaml`](pnpm-workspace.yaml) | Workspace globs — `apps/*` and `packages/*`. Anything dropped into `apps/` is picked up automatically. |
| `apps/<app>/vite.config.ts` | The app's `base` public path, dev-server port, and `outDir` inside the shared `dist/`. |
| [`firebase.json`](firebase.json) | Hosting root, SPA rewrites per app, and cache headers. |
| [`.firebaserc`](.firebaserc) | Default Firebase project (`zntsns-34aee`). |
| `PORT` env var | Overrides an app's dev-server port: `PORT=4000 pnpm --filter simmer dev`. |

### Adding an app

1. Create `apps/<name>` with its own `package.json`, exposing at least a `build` script.
2. In its `vite.config.ts`, set `base: '/<name>/'`, `build.outDir: '../../dist/<name>'`, and `build.emptyOutDir: false`.
3. Add a rewrite for `/<name>/**` in [`firebase.json`](firebase.json).

## Deployment

The site is hosted on **Firebase Hosting**. Deployment is automatic:

- **Push to `main`** → [`firebase-hosting-merge.yml`](.github/workflows/firebase-hosting-merge.yml) builds the workspace and deploys to the live channel.
- **Open a pull request** → [`firebase-hosting-pull-request.yml`](.github/workflows/firebase-hosting-pull-request.yml) deploys a temporary preview channel.

To deploy by hand (requires the Firebase CLI and access to the project):

```bash
pnpm deploy
```

Because `dist/` is plain static output, it can also be served by any static host.

## Contributing

This is a personal project, but issues and pull requests are welcome.

1. Fork the repo and branch off `main`.
2. Run `pnpm install`.
3. Make your change, then confirm it builds cleanly: `pnpm build`.
4. Lint the app you touched: `pnpm --filter <app> lint`.
5. Open a pull request — CI will publish a preview URL you can link to in the description.

Keep changes scoped to a single app where possible; anything that changes `dist/` layout must be reflected in [`firebase.json`](firebase.json).

## License

Released under the **ISC License**, as declared in [`package.json`](package.json).

<!-- TODO: no LICENSE file exists in the repo yet — add one, or update this section if a different license is intended. -->

## Acknowledgments

- [TheMealDB](https://www.themealdb.com) — free recipe API and photography powering Simmer.
- [Vite](https://vite.dev), [React](https://react.dev), and [pnpm](https://pnpm.io) — the foundation of the whole workspace.
- [Firebase Hosting](https://firebase.google.com/docs/hosting) and [`FirebaseExtended/action-hosting-deploy`](https://github.com/FirebaseExtended/action-hosting-deploy) — hosting and preview channels.
- [Phosphor Icons](https://phosphoricons.com), [GSAP](https://gsap.com), [Lenis](https://lenis.darkroom.engineering), [Motion](https://motion.dev), and [Three.js](https://threejs.org) — motion and visuals in the portfolio app.

---

Built by **David Guijosa** · [zntsns.com](https://www.zntsns.com) · [davidgin641@gmail.com](mailto:davidgin641@gmail.com)
