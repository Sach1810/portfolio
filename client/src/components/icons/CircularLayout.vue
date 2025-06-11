<template>
  <div
    class="flex-center"
    :style="{
      borderRadius: '50%',
      backgroundColor: props.backgroundColor,
      width: 'fit-content',
      height: 'fit-content',
      padding: '5%',
    }"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  backgroundColor: {
    type: String,
    default: "#000",
  },
});
</script>

<style lang="scss" scoped></style>
