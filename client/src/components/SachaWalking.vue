<template>
  <div class="walk-wrapper">
    <component :is="currentComponent" style="height: 300px" />
  </div>
</template>

<script setup>
import WalkOne from "./SachaWalkOne.vue";
import WalkTwo from "./SachaWalkTwo.vue";
import WalkThree from "./SachaWalkThree.vue";

import { ref, computed } from "vue";

const step = ref(2);
const componentList = [WalkOne, WalkTwo, WalkThree];

const currentComponent = computed(() => {
  return componentList[step.value];
});

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function start() {
  step.value = 0;
  next();
}

async function next() {
  await sleep(200);
  step.value = (step.value + 1) % componentList.length;
  next();
}

start();
</script>

<style scoped>
.walk-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.walk-wrapper .walk-svg {
  height: 100px;
}
</style>
