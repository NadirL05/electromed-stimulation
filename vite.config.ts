import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
  },
  server: {
    host: true, // Écoute sur toutes les interfaces réseau
    port: 5173,
    strictPort: false,
    hmr: {
      clientPort: 5173,
    },
  },
})
