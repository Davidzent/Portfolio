import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  base: '/portal-pantry/',

  server: {
    port: Number(process.env.PORT) || 5175,
  },

  build: {
    outDir: '../../dist/portal-pantry',
    emptyOutDir: false,

    // Two entries, one deploy:
    //   /portal-pantry/             → the live demo app  (src/app)
    //   /portal-pantry/case-study/  → the case-study page (src/case-study)
    rollupOptions: {
      input: {
        app: fileURLToPath(new URL('./index.html', import.meta.url)),
        'case-study': fileURLToPath(new URL('./case-study/index.html', import.meta.url)),
      },
    },
  },
})