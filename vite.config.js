import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom') || id.includes('react-router')) return 'react-vendor'
          if (id.includes('react-helmet'))                              return 'helmet'
          if (id.includes('node_modules'))                              return 'vendor'
        },
      },
    },
    chunkSizeWarningLimit: 600,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_funcs: ['console.log', 'console.warn'],
      },
      mangle: { safari10: true },
    },
    cssMinify: true,
    reportCompressedSize: false,
  },
})
