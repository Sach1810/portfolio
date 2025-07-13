<template>
  <div class="job-search-app">
    <div class="app-header">
      <h2>SACHA Job Search Application</h2>
      <p>This is a job search app that can be dynamically loaded by the host application</p>
    </div>
    
    <div class="content">
      <div class="feature-card">
        <h3>Job Search Features</h3>
        <ul>
          <li>Built with Vue 3 Composition API</li>
          <li>JavaScript support</li>
          <li>Vite for fast development</li>
          <li>Module Federation ready</li>
        </ul>
      </div>
      
      <div class="feature-card">
        <h3>Integration</h3>
        <p>This job search app is designed to be seamlessly integrated into the main host application through Module Federation.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue 3 Composition API with vanilla JavaScript
</script>

<style scoped>
.job-search-app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
}

.app-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.app-header p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
}

.content {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.feature-card ul {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}

.feature-card li {
  margin-bottom: 0.5rem;
}
</style> 