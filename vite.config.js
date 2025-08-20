import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  base: '/2025_MECC_fes_workshop/',   // 👈 EXACT repo name
  plugins: [react(), tailwind()],
})
