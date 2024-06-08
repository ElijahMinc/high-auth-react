import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.join(__dirname, 'src/app'),
  // build: {
  //   outDir: path.resolve(__dirname, 'dist'),
  //   rollupOptions: {
  //     input: {
  //       index: path.resolve(__dirname, 'src/index.html'),
  //     },
  //   },
  // },
  // build: {
  //   outDir: path.join(__dirname, 'dist'),
  //   rollupOptions: {
  //     input: glob.sync(path.resolve(__dirname, 'src', '*.html')),
  //   },
  // },
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      common: '/src/common',
      components: '/src/components',
      config: '/src/config',
      context: '/src/context',
      // pages: "/src/pages",
      hooks: '/src/hooks',
      router: '/src/router',
      types: '/src/types',
      utils: '/src/utils',
      services: '/src/services',
      constants: '/src/constants.ts',

      // FSD
      '@app': path.resolve('src/app'),
      '@pages': path.resolve('src/pages'),
      '@widgets': path.resolve('src/widgets'),
      '@entities': path.resolve('src/entities'),
      '@features': path.resolve('src/features'),
      '@shared': path.resolve('src/shared'),
    },
  },
});
