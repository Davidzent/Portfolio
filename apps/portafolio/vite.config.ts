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

/**
 * Crawlable markup built from the same content.ts the app renders, so the first
 * HTML response carries real text instead of an empty div. Never seen by a
 * visitor: globals.css hides [data-seo-shell] before first paint.
 */
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

/** Build-only, so dev keeps an empty #root and the editor experience is unchanged. */
function seoShellPlugin(): Plugin {
  const html = seoShellHtml()
  return {
    name: 'seo-shell-inject',
    apply: 'build',
    transformIndexHtml(source) {
      return source.replace(
        '<div id="root"></div>',
        `<div id="root"><div data-seo-shell>${html}</div></div>`,
      )
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
