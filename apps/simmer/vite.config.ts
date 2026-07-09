import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  base: '/simmer/',

  server: {
    port: Number(process.env.PORT) || 5174,
  },

  build: {
    outDir: '../../dist/simmer',
    emptyOutDir: false,
  },
})