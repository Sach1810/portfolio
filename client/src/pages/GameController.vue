<template>
  <div :class="['game-controller', !controllerType ? 'select-type' : null]">
    <div class="controller-wrapper">
      <div class="controller-selector">
        <div
          :class="[
            'btn',

            !isGyroSupported
              ? 'disabled'
              : controllerType === 'gyroscope'
              ? 'active'
              : null,
          ]"
          @click="handleType('gyroscope')"
        >
          Gyroscope
        </div>
        <div
          :class="['btn', controllerType === 'keypad' ? 'active' : null]"
          @click="handleType('keypad')"
        >
          Keypad
        </div>
      </div>
      <div class="controlls">
        <div v-if="controllerType === 'gyroscope'" class="gyroscope">
          <ol>
            <li>Point phone at screen</li>
            <li>Rotate wrist to move sideways (roll)</li>
            <li>Tilt nose of phone to move up and down (pitch)</li>
          </ol>
          <div class="btn start" @click="startGyro">Start</div>
          <div v-if="error" class="error">{{ error }}</div>
          <ControlInstructions class="guide" />
        </div>
        <div class="keypad" v-if="controllerType === 'keypad'">
          <div class="arrow-keys">
            <div class="arrow-up">
              <PhArrowSquareUp
                class="arrow-key"
                @click="updateGame({ direction: 'up' })"
                :size="iconSize"
                :color="iconColor"
                weight="fill"
              />
            </div>
            <div class="arrow-left">
              <PhArrowSquareLeft
                class="arrow-key"
                @click="updateGame({ direction: 'left' })"
                :size="iconSize"
                :color="iconColor"
                weight="fill"
              />
            </div>
            <div class="arrow-down">
              <PhArrowSquareDown
                class="arrow-key"
                @click="updateGame({ direction: 'down' })"
                :size="iconSize"
                :color="iconColor"
                weight="fill"
              />
            </div>
            <div class="arrow-right">
              <PhArrowSquareRight
                class="arrow-key"
                @click="updateGame({ direction: 'right' })"
                :size="iconSize"
                :color="iconColor"
                weight="fill"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import socketService from "@/services/SocketService.js";
import TiltDetectorService from "@/services/TiltDetectorService.js";
import ControlInstructions from "@/components/svgs/ControlInstructions.vue";
import {
  PhArrowSquareUp,
  PhArrowSquareDown,
  PhArrowSquareLeft,
  PhArrowSquareRight,
} from "@phosphor-icons/vue";

const rootStyles = getComputedStyle(document.documentElement);
const baseIconColor = rootStyles.getPropertyValue("--c-font-light").trim();
const iconColor = ref(baseIconColor);
const iconSize = "100px";

const tiltService = new TiltDetectorService({
  onTilt: (direction, x, y) => {
    updateGame({ direction });
  },
});
const error = ref(null);
// const isGyroSupported = ref(tiltService.isSupported());
const isGyroSupported = ref(true);
if (!isGyroSupported.value) {
  error.value = "Gyroscope not supported";
}
console.log(tiltService.isSupported());

const controllerType = ref(isGyroSupported.value ? "gyroscope" : "keypad");

async function handleType(type) {
  tiltService.stop();
  if (type === "gyroscope") {
    if (!isGyroSupported.value) return;
  }

  controllerType.value = type;
}

async function startGyro() {
  const result = await tiltService.start();
  console.log("start result:", result);
  if (result.error) {
    const msg =
      result.type === "access-denied"
        ? "Gyroscope permission denied. Please allow motion access or switch to keypad."
        : "Error starting gyroscope. Please switch to keypad.";
    error.value = msg;
  } else {
    error.value = null; // Clear any previous errors
  }
}

function getSocketIdFromHash() {
  const hash = window.location.hash;
  const queryIndex = hash.indexOf("?");
  if (queryIndex === -1) return null;
  const queryString = hash.substring(queryIndex);
  const params = new URLSearchParams(queryString);
  return params.get("socketId");
}

const urlParams = new URLSearchParams(window.location.search);
const clientSocketId = urlParams.get("socketId") || getSocketIdFromHash();
console.log("passed socketId:", clientSocketId);
socketService.onConnect((socketId) => {
  console.log("Connected with socket ID:", clientSocketId);
  socketService.emit("controllerConnected", {
    socketId: clientSocketId,
  });
});

function updateGame({ direction }) {
  socketService.emit("updateJobSearch", {
    socketId: clientSocketId,
    direction,
  });
}
const lastDirection = ref("");
let lastUpdate = 0;
</script>

<style lang="scss" scoped>
.game-controller {
  height: 100dvh;
  width: 100%;
  margin-right: $nav-closed-width;
  display: flex;
  align-items: center;
  justify-content: center;

  .controller-wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 10px;
    height: 100%;
    width: 100%;
    max-width: 600px;

    .controller-selector {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: $space-l;
    }

    .controlls {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;

      .gyroscope {
        .error {
          color: red;
          font-size: $font-m;
          margin-bottom: $space-xs;
          text-align: center;
          word-wrap: break-word;
          word-break: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
          padding: 0 $space-s;
        }

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        height: 100%;
        width: 100%;
        padding: $space-m;
        overflow: hidden;

        ol {
          color: $c-font-light;
          font-size: 1.1em;
          line-height: 1.6;
          margin: 0;
          padding-left: 0;
          list-style-position: inside;

          li {
            margin-bottom: 0.5em;
            color: $c-font-light;
          }
        }

        .guide {
          height: 50vh;
          max-width: 70vw;
        }
      }

      .keypad {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        height: 100%;

        .arrow-keys {
          display: grid;
          grid-template-columns: repeat(3, max-content);
          grid-template-rows: repeat(3, max-content);
          justify-content: center;
          align-items: center;
          grid-template-areas:
            ". up ."
            "left . right"
            ". down .";
          gap: 20px;

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
    }

    .btn {
      background: $c-bg-darker;
      color: $c-font-light;
      font-weight: bold;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      width: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      &.start {
        width: 80vw;
        border: 2px solid $c-font-light;
        font-size: $font-xl;
        margin-top: $space-m;
      }

      &.active {
        background: $c-bg-mid;
        border: 2px solid $c-font-light;
      }

      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .arrow-key {
      &:active {
        opacity: 0.5;
      }
    }
  }
}
</style>
