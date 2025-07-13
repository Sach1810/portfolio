<template>
  <div id="app">
    <NavSidebar/>
    <router-link to="/job-search" class="nav-link">Job Search</router-link>
    <div class="content-area">
      <BackgroundPattern class="background-pattern" />
      <router-view />
    </div>
  </div>
  <!-- <div id="app">
    <nav class="navbar">
      <div class="nav-brand">Microfrontend Host</div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/react-app" class="nav-link">React App</router-link>
        <router-link to="/job-search" class="nav-link">Job Search</router-link>
        <router-link to="/create_new_app" class="nav-link">Create New App</router-link>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
  </div> -->
</template>

<script setup lang="ts">
import BackgroundPattern from './components/BackgroundPattern.vue';
import NavSidebar from './components/nav/NavSidebar.vue';

</script>

<style scoped lang="scss">
#app {
  min-height: 100vh;
  background: radial-gradient(
    circle at 30% 30%,
    var(--c-bg-dark),
    var(--c-bg-mid) 70%,
    var(--c-bg-light) 100%
  );
  padding: var(--page-padding);
}

/* .navbar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

.main-content {
  padding: 2rem;
  min-height: calc(100vh - 80px);
} */
</style> 