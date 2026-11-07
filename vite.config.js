import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Listen on the local network so phones on the same Wi-Fi can open the site
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
