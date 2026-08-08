import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site, about, projects, skillTree, journey, contact } from './src/data/content.js'

/** Escape text for safe interpolation into HTML. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Real, crawlable markup built from the same content.ts data the app renders.
 *  Injected into #root at build time so the first HTML response (before any
 *  JS runs) already has actual text on it, not an empty div. React's
 *  createRoot().render() fully replaces #root on mount, so this never
 *  shows to a real visitor for more than a flash — it's purely for anything
 *  reading the raw HTML (search crawlers, link unfurlers, etc). */
function seoShellHtml(): string {
  const bio = about.bio.map((p) => `<p>${esc(p)}</p>`).join('')

  const projectItems = projects
    .map((p) => {
      const link = p.links.demo ?? p.links.github
      const cta = link
        ? `<a href="${esc(link)}">${p.links.demo ? 'View demo' : 'View code'}</a>`
        : ''
      return `<li><h3>${esc(p.title)} — ${esc(p.short)}</h3><p>${esc(p.description)}</p>${cta}</li>`
    })
    .join('')

  const skillItems = skillTree
    .map(
      (b) =>
        `<li><strong>${esc(b.title)}:</strong> ${b.nodes.map((n) => esc(n.label)).join(', ')}</li>`,
    )
    .join('')

  const journeyItems = journey
    .map((c) => `<li>${esc(c.year)} — ${esc(c.title)}, ${esc(c.org)}</li>`)
    .join('')

  return (
    `<h1>${esc(site.fullName)} — ${esc(site.role)}</h1>` +
    `<p>${esc(site.location)} · ${esc(site.availability)} · ${esc(site.experience)}</p>` +
    bio +
    `<h2>Projects</h2><ul>${projectItems}</ul>` +
    `<h2>Skills</h2><ul>${skillItems}</ul>` +
    `<h2>Journey</h2><ul>${journeyItems}</ul>` +
    `<h2>Contact</h2><p>${esc(contact.blurb)}</p>` +
    `<p><a href="${esc(site.socials.github)}">GitHub</a> · ` +
    `<a href="${esc(site.socials.linkedin)}">LinkedIn</a> · ` +
    `<a href="${esc(site.socials.email)}">Email</a></p>`
  )
}

/** Injects the SEO shell into the built index.html's #root div. Build-only —
 *  dev mode is untouched so the editor experience doesn't change. */
function seoShellPlugin(): Plugin {
  const html = seoShellHtml()
  return {
    name: 'seo-shell-inject',
    apply: 'build',
    transformIndexHtml(source) {
      return source.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoShellPlugin()],

  base: '/',

  server: {
    port: Number(process.env.PORT) || 5173,
  },

  build: {
    // Shared output dir: portal-pantry and simmer also write into subfolders of
    // this same dist/. Emptying it here would race with them under `pnpm -r`
    // (parallel) and wipe their output — the root `clean` script clears it once.
    outDir: '../../dist',
    emptyOutDir: false,
  },
})