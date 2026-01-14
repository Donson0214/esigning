import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
<<<<<<< HEAD
=======
      '@shared': fileURLToPath(new URL('../backend/src/shared', import.meta.url)),
    },
  },
  server: {
    fs: {
      allow: ['..'],
>>>>>>> e054afa1 (Save 1)
    },
  },
});
