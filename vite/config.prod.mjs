import { defineConfig } from 'vite';
import { resolve } from 'path';

const msg = "Building LaVozDeLosCuentosGames project...";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, '../src/index.js'),
      name: 'LaVozDeLosCuentosGames',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `la-voz-de-los-cuentos-games.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          phaser: 'Phaser',
        },
      },
    },
  },
  publicDir: resolve(__dirname, '../public'),
});
