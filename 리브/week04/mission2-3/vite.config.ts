import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss()],
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
