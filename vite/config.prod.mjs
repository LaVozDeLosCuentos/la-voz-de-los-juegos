import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const msg = "Building LaVozDeLosCuentosGames project...";

export default defineConfig({
  base: '',  // Asegúrate de que esta línea esté presente y correcta
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
    viteStaticCopy({
      targets: [
        {
          src: 'public/assets',
          dest: 'assets'
        }
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
