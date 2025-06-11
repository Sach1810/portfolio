<template>
  <section class="flex-center">
    <CircularLayout v-if="slots.icon" class="icon-wrapper">
      <slot name="icon" />
    </CircularLayout>
    <div class="title-wrapper" v-if="slots.title">
      <hr />
      <slot name="title" />
      <hr />
    </div>
    <div class="content-wrapper">
      <slot name="content" />
    </div>
  </section>
</template>

<script setup>
import CircularLayout from "../icons/CircularLayout.vue";
const slots = defineSlots();
</script>

<style lang="scss" scoped>
section {
  width: 100%;

  .icon-wrapper {
    margin-bottom: 2mm;
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    gap: 2mm;
    margin-bottom: 2mm;
    hr {
      width: 100%;
      height: 0.5mm;
      background: black;
      border: none;
    }
  }

  .content-wrapper {
    font-weight: normal;
  }
}
</style>
