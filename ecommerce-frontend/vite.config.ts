import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  optimizeDeps: {
    include: ['vue3-chartjs', 'chart.js'],
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src', 
    },
  },
  server: {
    proxy: {
      '/products': 'http://localhost:5000',
      '/analytics': 'http://localhost:5000',
    },
  },
});
