import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    allowedHosts: ['pixelprompt-frontend.onrender.com'],
    host: '0.0.0.0',
    port: process.env.PORT || 4173
  }
})