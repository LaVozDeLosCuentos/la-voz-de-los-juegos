import { defineConfig } from 'vite';
import { resolve } from 'path';
import copy from 'vite-plugin-copy';

const msg = "Building LaVozDeLosCuentosGames project...";

export default defineConfig({
  base: '',
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
  plugins: [
    copy({
      targets: [
        { src: 'public/assets/*', dest: 'dist/assets' } // Copia los assets al directorio de destino
      ]
    }),
    {
      name: 'phasermsg',
      buildEnd() {
        console.log(msg);
      },
    },
  ],
});
