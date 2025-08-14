import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',        // This is the key part!
    port: 5173,
    strictPort: true,
    origin: 'https://xyz.ngrok-free.app', // ✅ replace with your actual ngrok URL
    allowedHosts: ['.ngrok-free.app'],    // ✅ explicitly allow ngrok host
    cors: true                            // ✅ allow CORS for external devices   // ✅ Add this line         // Optional: you can set your preferred port
  }
})
