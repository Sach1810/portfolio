<template>
    <div class="logo-area">
      <SachaSvg :animateWink="true" color="#227c9d" class="logo" />
      <div class="title-container">
        <span class="title">S.A.D</span>
        <span class="subtitle">It's my initials!</span>
      </div>
    </div>
</template>

<script setup lang="ts">
import SachaSvg from "../svgs/SachaSvg.vue";
</script>



<style scoped lang="scss">
  .logo-area {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-m);
    margin-left: -100px;
    font-family: var(--font-family-heading);
    user-select: none;

    .logo {
      width: var(--font-headline);
      height: var(--font-headline);
    }

    .title-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin-left: -25px;

      .title {
        font-size: var(--font-xl);
        color: var(--c-font-light);
        font-weight: bold;
        line-height: 0.9;
      }

    }
  }
</style>