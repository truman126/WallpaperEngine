import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build', // CRA's default build output
  },
  server: {
    port: 3000
  },
  watch: {
    usePolling: true
  },

});