<template>
  <div>
    <component
      :is="props.icon"
      :size="props.size"
      :color="props.color"
      :weight="props.weight"
    ></component>
    <div class="label" :style="{ color: props.color }">{{ props.label }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  size: {
    type: [String, Number],
    default: "40",
  },
  color: {
    type: String,
    default: "white",
  },
  weight: {
    type: String,
    default: "fill",
  },
  label: {
    type: String,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.label {
  margin-top: -10px;
  font-weight: bold;
}
</style>
