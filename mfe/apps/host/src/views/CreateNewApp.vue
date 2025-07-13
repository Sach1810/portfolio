<template>
  <div class="create-new-app">
    <div class="hero">
      <h1>Create New Microfrontend App</h1>
      <p>Follow these steps to add a new microfrontend to your architecture</p>
    </div>
    
    <div class="steps-container">
      <div class="step-card" v-for="(step, index) in steps" :key="index">
        <div class="step-header">
          <div class="step-number">{{ index + 1 }}</div>
          <h3>{{ step.title }}</h3>
        </div>
        <div class="step-content">
          <p>{{ step.description }}</p>
          <div v-if="step.code" class="code-block">
            <pre><code>{{ step.code }}</code></pre>
          </div>
          <div v-if="step.subSteps" class="sub-steps">
            <ul>
              <li v-for="(subStep, subIndex) in step.subSteps" :key="subIndex">
                {{ subStep }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="quick-start">
      <h3>Quick Start Commands</h3>
      <div class="command-grid">
        <div class="command-card">
          <h4>1. Create App Structure</h4>
          <pre><code>mkdir apps/new-app
cd apps/new-app
npm create vite@latest . -- --template react-ts</code></pre>
        </div>
        <div class="command-card">
          <h4>2. Install Dependencies</h4>
          <pre><code>npm install @originjs/vite-plugin-federation
npm install</code></pre>
        </div>
        <div class="command-card">
          <h4>3. Configure Vite</h4>
          <pre><code># Update vite.config.ts with federation plugin
# Add remote to host app
# Update routing</code></pre>
        </div>
        <div class="command-card">
          <h4>4. Build & Test</h4>
          <pre><code>npm run build
npm run dev</code></pre>
        </div>
      </div>
    </div>

    <div class="port-info">
      <h3>Port Management</h3>
      <div class="port-list">
        <div class="port-item">
          <span class="port-number">3000</span>
          <span class="port-label">Host App</span>
        </div>
        <div class="port-item">
          <span class="port-number">3001</span>
          <span class="port-label">React App</span>
        </div>
        <div class="port-item">
          <span class="port-number">3002</span>
          <span class="port-label">Vue App</span>
        </div>
        <div class="port-item">
          <span class="port-number">3003</span>
          <span class="port-label">Serve Remotes</span>
        </div>
        <div class="port-item new-port">
          <span class="port-number">3004</span>
          <span class="port-label">New App (Next Available)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const steps = ref([
  {
    title: 'Create App Directory Structure',
    description: 'Set up the basic directory structure for your new microfrontend app.',
    subSteps: [
      'Create apps/new-app/ directory',
      'Initialize with Vite using your chosen framework template',
      'Set up TypeScript configuration',
      'Create src/ directory with main components'
    ]
  },
  {
    title: 'Configure Vite with Module Federation',
    description: 'Update the vite.config.ts to enable module federation for your app.',
    code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'new-app',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  server: {
    port: 3004
  }
})`
  },
  {
    title: 'Set Up Package.json Dependencies',
    description: 'Configure the necessary dependencies for your framework.',
    code: `{
  "name": "new-app",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "@originjs/vite-plugin-federation": "^1.3.0"
  }
}`
  },
  {
    title: 'Update Host App Configuration',
    description: 'Add your new app as a remote in the host app configuration.',
    code: `// In apps/host/vite.config.ts
federation({
  name: 'host',
  remotes: {
    'react-app': 'http://localhost:3001/assets/remoteEntry.js',
    'job-search': 'http://localhost:3002/assets/remoteEntry.js',
    'new-app': 'http://localhost:3004/assets/remoteEntry.js',
  },
  shared: ['vue', 'vue-router']
})`
  },
  {
    title: 'Add Navigation to Host App',
    description: 'Update the host app navigation and routing to include your new app.',
    subSteps: [
      'Add navigation link in App.vue',
      'Create new view component in views/',
      'Add route in main.ts router configuration',
      'Update any shared components or utilities'
    ]
  },
  {
    title: 'Build and Test Integration',
    description: 'Build your new app and test the integration with the host.',
    subSteps: [
      'Run npm install in new app directory',
      'Build the app with npm run build',
      'Start the development server',
      'Test navigation from host app',
      'Verify module federation is working correctly'
    ]
  }
])
</script>

<style scoped>
.create-new-app {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

.steps-container {
  margin-bottom: 3rem;
}

.step-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-2px);
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.step-number {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 1rem;
}

.step-header h3 {
  color: white;
  font-size: 1.5rem;
  margin: 0;
}

.step-content p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.code-block {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  color: #e6e6e6;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.sub-steps ul {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  padding-left: 1.5rem;
}

.sub-steps li {
  margin-bottom: 0.5rem;
}

.quick-start {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.quick-start h3 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.command-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.command-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.command-card h4 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.command-card pre {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  padding: 0.75rem;
  margin: 0;
  color: #e6e6e6;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.3;
  overflow-x: auto;
}

.port-info {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.port-info h3 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.port-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.port-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.port-item.new-port {
  border-color: #51cf66;
  background: rgba(81, 207, 102, 0.1);
}

.port-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #74c0fc;
  margin-bottom: 0.5rem;
}

.port-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.new-port .port-number {
  color: #51cf66;
}
</style> 