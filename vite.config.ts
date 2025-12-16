import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
    allowedHosts: [
      '.railway.app',
      '.up.railway.app',
      'localhost',
    ],
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    hmr: {
      clientPort: 5173,
    },
  },
})
