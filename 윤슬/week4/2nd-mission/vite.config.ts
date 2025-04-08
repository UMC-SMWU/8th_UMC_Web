import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],  // 🚨 이게 맞아! tailwindcss() 넣으면 안 돼!
})
