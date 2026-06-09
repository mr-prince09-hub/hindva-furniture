import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    target: 'es2019',
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    chunkSizeWarningLimit: 600,
  },

  server: {
    port: 5173,
    strictPort: true,
  },

  preview: {
    port: 4173,
    strictPort: true,
  },
})