<template>
  <section class="flex-center">
    <CircularLayout v-if="props.iconName" class="icon-wrapper">
      <component :is="iconComponent" :size="16" color="#fff" />
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
import { computed } from "vue";
import CircularLayout from "../icons/CircularLayout.vue";
import {
  PhPaperPlaneTilt,
  PhPerson,
  PhDevices,
  PhChartPieSlice,
  PhBriefcase,
  PhStudent,
  PhUserList,
} from "@phosphor-icons/vue";

const slots = defineSlots();
const props = defineProps({
  iconName: {
    type: String,
    default: null,
  },
});

const iconComponent = computed(() => {
  const icons = {
    PhPaperPlaneTilt,
    PhPerson,
    PhDevices,
    PhChartPieSlice,
    PhBriefcase,
    PhStudent,
    PhUserList,
  };
  if (!props.iconName || !icons[props.iconName]) {
    return null;
  }
  return icons[props.iconName];
});
</script>

<style lang="scss" scoped>
section {
  width: 100%;

  .icon-wrapper {
    margin-bottom: 5px;
    display: content;
    padding: 20px;
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    gap: 5px;
    margin-bottom: 5px;
    white-space: nowrap;
    hr {
      width: 100%;
      height: 0.5mm;
      background: black;
      border: none;
    }
  }

  .content-wrapper {
    font-weight: normal;
    width: 100%;
  }
}
</style>
