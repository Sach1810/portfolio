<template>
  <div class="home-page">
    <IntroSection/>
    <ProjectsSection/>
  </div>
</template>

<script setup lang="ts">
import IntroSection from '../components/home/Intro.Section.vue';
import ProjectsSection from '../components/home/ProjectsSection.vue';
</script>

<style scoped lang="scss">
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 