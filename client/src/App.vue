<template>
  <div class="app-container" :class="{ 'nav-expanded': navExpanded }">
    <div class="nav-area">
      <NavBar :expanded="navExpanded" @toggle="navExpanded = !navExpanded" />
    </div>
    <div class="content-area">
      <BackgroundPattern class="background-pattern" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "@/components/nav/NavBar.vue";
import BackgroundPattern from "@/components/BackgroundPattern.vue";

const navExpanded = ref(false);
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: "Kodchasan", system-ui, Avenir, Helvetica, Arial, sans-serif;
  background: radial-gradient(
    circle at 30% 30%,
    $c-bg-dark,
    $c-bg-mid 70%,
    $c-bg-light 100%
  );
  background-color: $c-bg-mid;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  color: $c-font-light;
  display: grid;
  grid-template-columns: $nav-closed-width 1fr;
  transition: grid-template-columns 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &.nav-expanded {
    grid-template-columns: 300px 1fr;
  }

  .background-pattern {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 0;
    opacity: 0.1;
    transform: translateX(-50%);
  }

  .content-area {
    overflow-x: hidden;
    min-width: 0;
    position: relative;
  }
}
</style>
