<template>
  <div
    class="flex-center"
    :style="{
      borderRadius: '50%',
      backgroundColor: props.backgroundColor,
      padding: props.padding,
    }"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
const props = defineProps({
  backgroundColor: {
    type: String,
    default: "#000",
  },
  padding: {
    type: String,
    default: "10px",
  },
});

const slotContentRef = ref(null);
</script>
