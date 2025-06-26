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
        <Tree
          v-if="treeCells.includes(index - 1)"
          style="height: 100%; max-width: 100%"
        />
        <component
          v-else-if="index - 1 === activeCellIndex"
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
import SachaWalking from "@/components/svgs/SachaWalking.vue";
import socketService from "@/services/SocketService";
import ApplyForJobSvg from "@/components/jobserach/ApplyForJobSvg.vue";
import InterviewSvg from "@/components/jobserach/InterviewSvg.vue";
import AcceptSvg from "@/components/jobserach/AcceptSvg.vue";
import Tree from "@/components/svgs/TreeSvg.vue";

const isWalking = ref(false);
const invertImg = ref(false);

const gridSize = 7;
const cellSize = 100; // px
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
  // Calculate target position
  let targetX = x.value + (moveByDirection[direction]?.x || 0);
  let targetY = y.value + (moveByDirection[direction]?.y || 0);
  // Check bounds
  if (targetX < 0 || targetX >= gridSize || targetY < 0 || targetY >= gridSize)
    return;
  // Check for tree collision
  const targetIndex = targetY * gridSize + targetX;
  if (treeCells.value.includes(targetIndex)) return;
  invertImg.value =
    direction === "right"
      ? true
      : direction === "left"
      ? false
      : invertImg.value;
  isWalking.value = true;
  handleIsWalking();

  x.value = targetX;
  y.value = targetY;

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
        randomizeTrees();
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
  updatePosition(data.direction);
});

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

// --- TREE OBSTACLE LAYER ---
const treeCells = ref([]);

function getRandomTreeCells({ count, gridSize, forbidden = [] } = {}) {
  if (!count) {
    count =
      Math.floor(Math.random() * gridSize - gridSize / 2 + 1) + gridSize / 2;
  }
  // forbidden: cells that cannot have a tree (e.g., character, active cell)
  const totalCells = gridSize * gridSize;
  let available = Array.from({ length: totalCells }, (_, i) => i).filter(
    (i) => !forbidden.includes(i)
  );
  const chosen = [];
  while (chosen.length < count && available.length > 0) {
    // Pick a random cell
    const idx = Math.floor(Math.random() * available.length);
    const cell = available[idx];
    chosen.push(cell);
    // Remove this cell and all adjacent cells (including diagonals) from available
    const x = cell % gridSize;
    const y = Math.floor(cell / gridSize);
    available = available.filter((i) => {
      const ix = i % gridSize;
      const iy = Math.floor(i / gridSize);
      return Math.abs(ix - x) > 1 || Math.abs(iy - y) > 1;
    });
  }
  return chosen;
}

function randomizeTrees() {
  // Character's current cell and active cell are forbidden
  const charIndex = y.value * gridSize + x.value;
  treeCells.value = getRandomTreeCells({
    gridSize,
    forbidden: [charIndex, activeCellIndex.value],
  });
}

// ---

function randomizeComponentAndCell() {
  activeComponentIndex.value = Math.floor(Math.random() * components.length);
  activeCellIndex.value = getRandomCellIndex();
  randomizeTrees();
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
