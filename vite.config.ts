import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'src', replacement: '/src' }
    ]
  },
  build: {
    minify: false, 
    chunkSizeWarningLimit: 1600
  }
})