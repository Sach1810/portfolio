<template>
  <div class="job-search-container">
    <div class="title"><h1>Job Search</h1></div>
    <div class="image"><InterviewSvg style="width: 200px" /></div>
    <div class="instructions">
      <p>
        Join Sacha on his job hunt. Get to the targets and avoid the trees. For
        the full experience you will need a computer and mobile device to use as
        a
        <strong>controller</strong>
      </p>
    </div>
    <div class="controller">
      <h2>How to play?</h2>
      <div class="qr-guide">
        <QrCode />
        <div class="guide-container"><ControlInstructions class="guide" /></div>
      </div>
      <span
        >Scan to connect phone as controller. Point phone directly at screen and
        tilt the nose up and down to move up and down. Rotate wrist left and
        right to move left and right.</span
      >
    </div>
    <div class="divider">
      <div class="divider-line"></div>
      <div class="divider-text">OR</div>
      <div class="divider-line"></div>
    </div>
    <div class="controls">
      <div class="arrow-keys">
        <div class="arrow-up">
          <PhArrowSquareUp :size="50" :color="iconColor" weight="fill" />
        </div>
        <div class="arrow-left">
          <PhArrowSquareLeft :size="50" :color="iconColor" weight="fill" />
        </div>
        <div class="arrow-down">
          <PhArrowSquareDown :size="50" :color="iconColor" weight="fill" />
        </div>
        <div class="arrow-right">
          <PhArrowSquareRight :size="50" :color="iconColor" weight="fill" />
        </div>
      </div>
      <span v-if="isMobile"><strong>Swipe</strong> to move character</span>
      <span v-else>Use the <strong>arrow keys</strong> to move character</span>
    </div>
    <div class="game" ref="gameBoard">
      <div
        class="grid-wrapper"
        :style="gridWrapperStyle"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <div class="grid" :style="gridStyle">
          <div v-for="index in gridSize * gridSize" :key="index" class="cell">
            <Transition name="cell-svg" mode="out-in">
              <Tree
                v-if="treeCells.includes(index - 1)"
                style="height: 100%; max-width: 100%"
                :key="'tree-' + (index - 1)"
              />
              <component
                v-else-if="index - 1 === activeCellIndex"
                :is="activeStageData.component"
                style="height: 100%; max-width: 100%"
                :key="'stage-' + (index - 1)"
              />
            </Transition>
          </div>
        </div>
        <div class="image-wrapper" :style="imageWrapperStyle">
          <div class="image" :style="imageStyle">
            <SachaCartoonArmsCrossed v-if="!isWalking" style="height: 100%" />
            <SachaWalking style="height: 100%" v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import SachaCartoonArmsCrossed from "@/components/SachaCartoonArmsCrossed.vue";
import SachaWalking from "@/components/svgs/SachaWalking.vue";
import socketService from "@/services/SocketService";
import ApplyForJobSvg from "@/components/jobsearch/ApplyForJobSvg.vue";
import InterviewSvg from "@/components/jobsearch/InterviewSvg.vue";
import AcceptSvg from "@/components/jobsearch/AcceptSvg.vue";
import Tree from "@/components/svgs/TreeSvg.vue";
import QrCode from "@/components/QrCode.vue";
import Bowser from "bowser";
import {
  PhArrowSquareUp,
  PhArrowSquareDown,
  PhArrowSquareLeft,
  PhArrowSquareRight,
} from "@phosphor-icons/vue";
import ControlInstructions from "@/components/svgs/ControlInstructions.vue";

const result = Bowser.parse(window.navigator.userAgent);
const isMobile = result.platform.type === "mobile";

const rootStyles = getComputedStyle(document.documentElement);
const iconColor = rootStyles.getPropertyValue("--c-font-light").trim();

const isWalking = ref(false);
const invertImg = ref(false);

// Add ref for game board element
const gameBoard = ref(null);

const gridSize = isMobile ? 5 : 7;
const cellSize = isMobile ? 50 : 100; // px
const gapSize = 0; // px

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
  }, 200);
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
  if (e && typeof e.preventDefault === "function") e.preventDefault();
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

// Listen for controller connection to scroll to game board
socketService.on("startJobSearch", (data) => {
  console.log("Controller connected, scrolling to game board", data);
  scrollToGameBoard();
});

// Also listen for any controller connection event
socketService.on("controllerConnected", (data) => {
  console.log("Controller connected event received", data);
  scrollToGameBoard();
});

// Function to scroll to game board
function scrollToGameBoard() {
  console.log("scrollToGameBoard called");

  // Simple approach - find the game element and scroll to it
  const gameElement = document.querySelector(".game");
  console.log("Found game element:", gameElement);

  if (gameElement) {
    console.log("Game element found, attempting to scroll");

    // Method 1: Try scrollIntoView first
    try {
      gameElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      console.log("scrollIntoView executed");
    } catch (e) {
      console.log("scrollIntoView failed:", e);

      // Method 2: Use window.scrollTo with getBoundingClientRect
      try {
        const rect = gameElement.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset +
          rect.top -
          window.innerHeight / 2 +
          rect.height / 2;

        window.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
        console.log("window.scrollTo executed to position:", scrollTop);
      } catch (e2) {
        console.log("window.scrollTo also failed:", e2);

        // Method 3: Force scroll with immediate positioning
        const rect = gameElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset + rect.top - 100;
        window.scrollTo(0, scrollTop);
        console.log("Forced scroll to position:", scrollTop);
      }
    }
  } else {
    console.log("Game element not found");
  }
}

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
  const el = document.querySelector(".grid-wrapper");
  if (el) {
    el.addEventListener("touchmove", preventScroll, { passive: false });
  }
  window.addEventListener("keydown", handleKey);

  // Debug socket connection
  console.log(
    "JobSearch mounted, socket connected:",
    socketService.isConnected()
  );
  console.log("Current socket ID:", socketService.getSocketId());

  // Listen for socket connection to ensure QR code gets updated
  socketService.onConnect((socketId) => {
    console.log("Socket connected in JobSearch, ID:", socketId);
  });
});

onUnmounted(() => {
  const el = document.querySelector(".grid-wrapper");
  if (el) {
    el.removeEventListener("touchmove", preventScroll);
  }
  window.removeEventListener("keydown", handleKey);
});

// --- SWIPE SUPPORT FOR MOBILE ---
let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(e) {
  if (e.touches && e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
}

function handleTouchEnd(e) {
  if (!touchStartX && !touchStartY) return;
  let touchEndX, touchEndY;
  if (e.changedTouches && e.changedTouches.length === 1) {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
  } else {
    return;
  }
  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;
  if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return; // ignore small swipes
  if (Math.abs(dx) > Math.abs(dy)) {
    // horizontal swipe
    if (dx > 0) updatePosition("right");
    else updatePosition("left");
  } else {
    // vertical swipe
    if (dy > 0) updatePosition("down");
    else updatePosition("up");
  }
  touchStartX = 0;
  touchStartY = 0;
}

// --- Prevent page scroll on mobile swipe ---
function preventScroll(e) {
  e.preventDefault();
}
</script>

<style lang="scss" scoped>
.job-search-container {
  display: grid;
  grid-template-areas:
    "title title image"
    "instructions instructions image"
    "controller divider controls"
    "game game game";
  max-width: 700px;
  margin: 0 auto;
  gap: $space-l;
  padding: $space-l $nav-closed-width $space-xxl * 2.5 0;
  min-height: 120vh; /* Ensure there's enough content to scroll */
  overflow-y: auto; /* Ensure vertical scrolling is enabled */

  @include respond-to(md) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    grid-area: title;
  }
  .image {
    grid-area: image;
  }
  .instructions {
    grid-area: instructions;
  }

  .controller {
    grid-area: controller;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $space-l;

    .qr-guide {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $space-l;
      width: max-content;
      @include respond-to(md) {
        margin: 0 auto;
      }

      .guide-container {
        padding: $space-s;
        border-radius: 10px;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.35),
          rgba(255, 255, 255, 0.15)
        );

        .guide {
          height: 100px;
          width: 100px;
        }
      }
    }
  }
  .divider {
    grid-area: divider;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-s;
    width: max-content;

    @include respond-to(md) {
      flex-direction: row;
      align-items: center;
      width: 100%;
    }

    .divider-line {
      height: 100%;
      width: 1px;
      background-color: $c-font-light;

      @include respond-to(md) {
        height: 1px;
        width: 100%;
      }
    }
  }
  .controls {
    grid-area: controls;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-l;

    .arrow-keys {
      display: grid;
      grid-template-columns: repeat(3, max-content);
      grid-template-rows: repeat(2, max-content);
      justify-content: center;
      align-items: center;
      grid-template-areas:
        ". up ."
        "left down right";
      height: 120px;

      .arrow-up {
        grid-area: up;
      }
      .arrow-left {
        grid-area: left;
      }
      .arrow-down {
        grid-area: down;
      }
      .arrow-right {
        grid-area: right;
      }
    }
  }

  .game {
    grid-area: game;
    $c-grid: #f6dfb9;
    $c-outline: #e6c89d;

    .grid-wrapper {
      position: relative;
      outline: 10px solid $c-bg-dark;
      border-radius: 3px;
      box-shadow: 0 0 10px 7px $c-highlight;
      .grid {
        display: grid;
        background: $c-outline;
        position: absolute;
        top: 0;
        left: 0;

        .cell {
          background: $c-grid;
          border: 1px solid $c-outline;
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

    .cell-svg-enter-active,
    .cell-svg-leave-active {
      transition: opacity 0.2s, transform 0.2s;
    }
    .cell-svg-enter-from,
    .cell-svg-leave-to {
      opacity: 0;
      transform: scale(0.7);
    }
    .cell-svg-enter-to,
    .cell-svg-leave-from {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
