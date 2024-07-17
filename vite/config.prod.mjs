import { defineConfig } from 'vite';
import { resolve } from 'path';

const msg = "Building Phaser project..."; // Asegúrate de definir la variable msg

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, '../src/index.js'),
      name: 'LaVozDeLosCuentosGames',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `lavozdeloscuentosgames.${format}.js`,
    },
    rollupOptions: {
      // Asegúrate de externalizar dependencias que no quieres incluir en tu bundle
      external: ['phaser'],
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
        console.log(msg); // Utiliza la variable msg que definimos
      },
    },
  ],
});
