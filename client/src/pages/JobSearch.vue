<template>
  <h2>{{ activeStageData.title }}</h2>
  <div
    class="grid-wrapper"
    :style="gridWrapperStyle"
    tabindex="0"
    @keydown="handleKey"
  >
    <div class="grid" :style="gridStyle">
      <div v-for="index in gridSize * gridSize" :key="index" class="cell">
        <component
          v-if="index - 1 === activeCellIndex"
          :is="activeStageData.component"
          style="height: 100%; max-width: 100%"
        />
      </div>
    </div>
    <div class="image-wrapper" :style="imageWrapperStyle">
      <div class="image" :style="imageStyle">
        <SachaCartoonArmsCrossed v-if="!isWalking" style="height: 100%" />
        <SachaWalking style="height: 100%" v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import SachaCartoonArmsCrossed from "@/components/SachaCartoonArmsCrossed.vue";
import SachaWalking from "@/components/SachaWalking.vue";
import socketService from "@/services/SocketService";
import ApplyForJobSvg from "@/components/jobserach/ApplyForJobSvg.vue";
import InterviewSvg from "@/components/jobserach/InterviewSvg.vue";
import AcceptSvg from "@/components/jobserach/AcceptSvg.vue";

const isWalking = ref(false);
const invertImg = ref(false);

const gridSize = 5;
const cellSize = 150; // px
const gapSize = 2; // px

const gridWrapperStyle = computed(() => ({
  width: `${gridSize * (cellSize + gapSize)}px`,
  height: `${gridSize * (cellSize + gapSize)}px`,
}));

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
  gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
  gap: `${gapSize}px`,
}));

const imageWrapperStyle = computed(() => ({
  transform: `translate(${x.value * (cellSize + gapSize)}px, ${
    y.value * (cellSize + gapSize)
  }px)`,
}));

const imageStyle = computed(() => ({
  width: `${cellSize}px`,
  height: `${cellSize}px`,
  transform: `scaleX(${invertImg.value ? -1 : 1})`,
}));

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

let switchTimeoutId = null;

function updatePosition(direction) {
  if (!direction || direction === "center") return;
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

  // Check if character is on the active cell
  const charIndex = y.value * gridSize + x.value;
  if (charIndex === activeCellIndex.value) {
    // Start a 0.5s timeout to switch component
    if (switchTimeoutId) clearTimeout(switchTimeoutId);
    switchTimeoutId = setTimeout(() => {
      // Double-check character is still on the cell
      const currentCharIndex = y.value * gridSize + x.value;
      if (currentCharIndex === activeCellIndex.value) {
        activeComponentIndex.value =
          (activeComponentIndex.value + 1) % components.length;
        activeCellIndex.value = getRandomCellIndex();
      }
      switchTimeoutId = null;
    }, 200);
  } else {
    // If character moves off the cell, cancel the timeout
    if (switchTimeoutId) {
      clearTimeout(switchTimeoutId);
      switchTimeoutId = null;
    }
  }
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

// --- New logic for random component in random cell ---
const components = [ApplyForJobSvg, InterviewSvg, AcceptSvg];
const activeComponentIndex = ref(Math.floor(Math.random() * components.length));
const activeComponent = computed(() => components[activeComponentIndex.value]);
const activeStageData = computed(() => {
  const stagesData = [
    { component: ApplyForJobSvg, title: "Apply for job" },
    { component: InterviewSvg, title: "Interview for job" },
    { component: AcceptSvg, title: "Accept job offer" },
  ];

  return stagesData[activeComponentIndex.value];
});
// Helper to get a random cell index that is not the character's position
function getRandomCellIndex() {
  const charIndex = y.value * gridSize + x.value;
  let available = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    if (i !== charIndex) available.push(i);
  }
  const rand = Math.floor(Math.random() * available.length);
  return available[rand];
}

const activeCellIndex = ref(getRandomCellIndex());

// Function to randomize component and cell
function randomizeComponentAndCell() {
  activeComponentIndex.value = Math.floor(Math.random() * components.length);
  activeCellIndex.value = getRandomCellIndex();
}

onMounted(() => {
  randomizeComponentAndCell();
});
</script>

<style lang="scss" scoped>
.grid-wrapper {
  position: relative;
  outline: none;
  margin: 100px;
  .grid {
    display: grid;
    background: #333;
    position: absolute;
    top: 0;
    left: 0;

    .cell {
      background: white;
      border: 1px solid #ccc;
      text-align: center;
    }
  }

  .image-wrapper {
    transition: transform 300ms ease-in-out;

    .image {
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }
  }
}
</style>
