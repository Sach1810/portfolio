<template>
  <div :class="['nav-sidebar', { 'expanded': expanded }]">
        <div class="nav-content"><LogoArea/></div>
        <div class="nav-icon"><HamburgerToClose @clicked="expanded = !expanded" :color="iconColor"/></div>
        <div class="nav-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import HamburgerToClose from './HamburgerToClose.vue';
import LogoArea from './LogoArea.vue';
import { ref, computed } from 'vue';

const expanded = ref<boolean>(false);

const iconColor = computed<string>(() => {
  const rootStyles = getComputedStyle(document.documentElement);
  return rootStyles.getPropertyValue("--c-font-light").trim();
});
</script>

<style scoped lang="scss">
// @use "@sacha/theme/src/styles/media.scss" as *;

.nav-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  display: grid;
  grid-template-columns: 0 40px 0;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--c-font-light);
  pointer-events: none;

  &.expanded {
    background: var(--c-bg-dark-overlay);
    grid-template-columns: 300px 40px 1fr;
    pointer-events: auto;
  }

  .nav-content {
    background: var(--c-bg-dark);
    overflow-x: hidden;
    overflow-y: scroll;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    .expanded & {
      transform: translateX(0);
    }

    &::-webkit-scrollbar {
      width: 0;  /* Remove scrollbar space */
      background: transparent;  /* Optional: just make scrollbar invisible */
    }

    &::-webkit-scrollbar-thumb {
      background: transparent;
    }
  }

  .nav-icon {
    transition: background-color 0.3s ease;
    pointer-events: auto;
  }

  .nav-overlay {
    background: transparent;
    transition: background-color 0.3s ease;
    
    .expanded & {
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>