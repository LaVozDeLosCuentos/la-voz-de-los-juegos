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
      // No externalizamos 'phaser' para incluirlo en el bundle
      output: {
        // Proporciona variables globales para usar en el caso de formato UMD
        globals: {
          phaser: 'Phaser',
        },
      },
    },
  },
  plugins: [
    {
      name: 'phasermsg',
      buildEnd() {
        console.log(msg);
      },
    },
  ],
});
