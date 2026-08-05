import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

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