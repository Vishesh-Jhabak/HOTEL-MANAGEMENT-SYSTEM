import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enable network access
    port: 5173,
    strictPort: false,
    proxy: {
      '/api/auth': { target: 'http://localhost:8081', changeOrigin: true, rewrite: p => p.replace(/^\/api\/auth/, '/auth') },
      '/api/bookings': { target: 'http://localhost:8082', changeOrigin: true },
      '/api/rooms': { target: 'http://localhost:8083', changeOrigin: true, rewrite: p => p.replace(/^\/api\/rooms/, '/rooms') },
      '/api/analytics': { target: 'http://localhost:8084', changeOrigin: true, rewrite: p => p.replace(/^\/api\/analytics/, '/analytics') }
    }
  }
})
