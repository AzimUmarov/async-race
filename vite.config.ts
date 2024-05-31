import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      { find: '@/Assets', replacement: '/src/assets' },
      { find: '@/Components', replacement: '/src/components' },
      { find: '@/Pages', replacement: '/src/pages' },
      { find: '@/Services', replacement: '/src/services' },
      { find: '@/Utils', replacement: '/src/utils' },
    ],
  },
});
