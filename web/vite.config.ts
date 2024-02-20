import { defineConfig } from 'vite';
import million from 'million/compiler';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
  base: './',
  build: {
    outDir: 'build',
  },
});
