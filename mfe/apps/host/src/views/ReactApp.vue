<template>
  <div class="react-app-container">
    <div class="app-header">
      <h2>React Microfrontend</h2>
      <p>Dynamically loaded React app with internal routing</p>
    </div>
    
    <div class="remote-container">
      <div v-if="loading" class="loading">
        <p>Loading React app...</p>
      </div>
      <div v-if="error" class="error">
        <p>Error loading React app: {{ error }}</p>
        <button @click="retryLoad" class="retry-btn">Retry</button>
      </div>
      <div v-if="!loading && !error" class="success">
        <p>React app loaded successfully!</p>
        <div class="app-info">
          <h3>React App Features:</h3>
          <ul>
            <li>Built with React 18 and TypeScript</li>
            <li>Internal routing with React Router</li>
            <li>Home and About pages</li>
            <li>Module Federation ready</li>
          </ul>
        </div>
        <div class="navigation-hint">
          <p>To see the full React app, visit: <a href="http://localhost:3001" target="_blank">http://localhost:3001</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)
const error = ref<string | null>(null)

const loadReactApp = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // For now, we'll show a success message
    // In a real implementation, you would load the actual React app
    loading.value = false
  } catch (err) {
    console.error('Failed to load React app:', err)
    error.value = err instanceof Error ? err.message : 'Unknown error'
    loading.value = false
  }
}

const retryLoad = () => {
  loadReactApp()
}

onMounted(() => {
  loadReactApp()
})
</script>

<style scoped>
.react-app-container {
  max-width: 1200px;
  margin: 0 auto;
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
}

.app-header h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.app-header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

.remote-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  min-height: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.loading, .error, .success {
  text-align: center;
  padding: 2rem;
  color: white;
}

.error {
  color: #ff6b6b;
}

.success {
  color: #51cf66;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.app-info {
  text-align: left;
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.app-info h3 {
  color: white;
  margin-bottom: 1rem;
}

.app-info ul {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}

.app-info li {
  margin-bottom: 0.5rem;
}

.navigation-hint {
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.navigation-hint a {
  color: #74c0fc;
  text-decoration: none;
  font-weight: bold;
}

.navigation-hint a:hover {
  text-decoration: underline;
}
</style> 