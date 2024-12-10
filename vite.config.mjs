import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import path from 'path';
import tailwindcss from 'tailwindcss';
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  define: {
    'process.env': loadEnv(mode, process.cwd(), ''),
  },
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern', // or "modern"
        silenceDeprecations: ['legacy-js-api'],
      },
    },
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, 'src/@types'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      config: path.resolve(__dirname, 'src/config'),
      contexts: path.resolve(__dirname, 'src/contexts'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      interfaces: path.resolve(__dirname, 'src/interfaces'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      pages: path.resolve(__dirname, 'src/pages'),
      routes: path.resolve(__dirname, 'src/routes'),
      services: path.resolve(__dirname, 'src/services'),
      stores: path.resolve(__dirname, 'src/stores'),
      styles: path.resolve(__dirname, 'src/styles'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
}));
