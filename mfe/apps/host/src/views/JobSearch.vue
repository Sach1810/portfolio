<template>
  <div class="job-search-container">
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Loading Job Search Application...</p>
    </div>
    
    <div v-if="error" class="error">
      <h3>Error Loading Job Search App</h3>
      <p>{{ error }}</p>
      <button @click="retryLoad" class="retry-btn">Retry</button>
    </div>
    
    <div v-if="!loading && !error && JobSearchComponent" class="remote-app">
      <component :is="JobSearchComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)
const error = ref<string | null>(null)
const JobSearchComponent = ref<any>(null)

const loadJobSearchApp = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Dynamically import the job-search app using Module Federation
    // @ts-ignore - Module Federation dynamic import
    const module = await import('job-search/App')
    JobSearchComponent.value = module.default
    
    loading.value = false
  } catch (err) {
    console.error('Failed to load job search app:', err)
    error.value = err instanceof Error ? err.message : 'Unknown error'
    loading.value = false
  }
}

const retryLoad = () => {
  JobSearchComponent.value = null
  loadJobSearchApp()
}

onMounted(() => {
  loadJobSearchApp()
})
</script>

<style scoped>
.job-search-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading {
  text-align: center;
  color: white;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  color: #ff6b6b;
  padding: 2rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.error h3 {
  margin-bottom: 1rem;
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

.remote-app {
  width: 100%;
  height: 100vh;
}
</style> 