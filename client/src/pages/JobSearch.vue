<template>
  <div class="grid-wrapper" tabindex="0" @keydown="handleKey">
    <div class="grid">
      <div v-for="index in 25" :key="index" class="cell"></div>
    </div>
    <div class="image-wrapper" :style="imageStyle">
      <div
        class="image"
        :style="{ transform: `scaleX(${invertImg ? -1 : 1})` }"
      >
        <SachaCartoonArmsCrossed v-if="!isWalking" style="height: 100px" />
        <SachaWalking style="height: 100px" v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import SachaCartoonArmsCrossed from "../components/SachaCartoonArmsCrossed.vue";
import SachaWalking from "../components/SachaWalking.vue";
import socketService from "@/services/SocketService";

const isWalking = ref(false);
const invertImg = ref(false);

const gridSize = 5;
const cellSize = 80; // px
const gapSize = 2; // px

const x = ref(0);
const y = ref(0);

const moveByDirection = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

let timeoutId;
function handleIsWalking() {
  isWalking.value = true;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    isWalking.value = false;
  }, 500);
}

function updatePosition(direction) {
  if (!direction) return;
  if (
    (direction === "up" && y.value === 0) ||
    (direction === "down" && y.value === gridSize - 1) ||
    (direction === "left" && x.value === 0) ||
    (direction === "right" && x.value === gridSize - 1)
  )
    return;

  invertImg.value =
    direction === "right"
      ? true
      : direction === "left"
      ? false
      : invertImg.value;
  isWalking.value = true;
  handleIsWalking();

  x.value += moveByDirection[direction].x;
  y.value += moveByDirection[direction].y;
}

const handleKey = (e) => {
  const keysData = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };

  updatePosition(keysData[e.key]);
};

socketService.on("updateJobSearch", (data) => {
  console.log("Received response:", data);

  updatePosition(data.direction);
});

// Total offset = cellSize * index + gapSize * index
const imageStyle = computed(() => ({
  transform: `translate(${x.value * (cellSize + gapSize)}px, ${
    y.value * (cellSize + gapSize)
  }px)`,
}));
</script>

<style scoped>
.grid-wrapper {
  position: relative;
  width: calc(5 * 80px + 4 * 2px); /* 5 cells + 4 gaps */
  height: calc(5 * 80px + 4 * 2px);
  outline: none;
  margin: 100px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 80px);
  grid-template-rows: repeat(5, 80px);
  gap: 2px;
  background: #333;
  position: absolute;
  top: 0;
  left: 0;
}

.cell {
  background: white;
  border: 1px solid #ccc;
}

.image-wrapper {
  transition: transform 300ms ease-in-out;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.image img {
  width: 60%;
  height: 60%;
  object-fit: contain;
}
</style>
