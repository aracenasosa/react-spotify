import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
  ],
  server: {
    port: 3000,
    host: true, // listen on 0.0.0.0 so 127.0.0.1 works after Spotify redirect
    open: true,
    https: true,
  },
  // Allow JSX in .js files (CRA-style) and ensure .jsx is parsed correctly
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.(js|jsx)$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
      },
    },
  },
});
