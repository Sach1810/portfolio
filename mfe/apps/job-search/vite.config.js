import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'job-search',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.vue',
      },
      shared: ['vue', 'vue-router']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    ssr: false
  },
  server: {
    port: 3002
  },
  preview: {
    port: 3002
  },
  optimizeDeps: {
    exclude: ['fsevents']
  }
}) 