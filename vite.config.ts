import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Habilita el modo host
    port: 3000,  // Puedes cambiar el puerto si lo deseas
  },
})
