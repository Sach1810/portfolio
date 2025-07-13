import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      remotes: {
        'react-app': 'http://localhost:3001/assets/remoteEntry.js',
        'job-search': 'http://localhost:3003/job-search/assets/remoteEntry.js',
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
    port: 3000
  },
  preview: {
    port: 3000
  },
  optimizeDeps: {
    exclude: ['fsevents']
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  },
  logLevel: 'info'
}) 