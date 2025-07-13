import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/styles/main.scss'),
      name: 'SDTheme',
      formats: ['es'],
      fileName: 'sd-theme'
    },
    rollupOptions: {
      output: {
        assetFileNames: 'sd-theme[extname]'
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
}) 