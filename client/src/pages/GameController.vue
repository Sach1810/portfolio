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
          <div
            :class="['btn start', hasGyroStarted ? 'disabled' : null]"
            @click="startGyro"
          >
            Start
          </div>
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
const iconSize = "70px";

const tiltService = new TiltDetectorService({
  onTilt: (direction, x, y) => {
    updateGame({ direction });
  },
});
const error = ref(null);
const isGyroSupported = ref(tiltService.isSupported());
const hasGyroStarted = ref(false);
if (!isGyroSupported.value) {
  error.value = "Gyroscope not supported";
}

const controllerType = ref(isGyroSupported.value ? "gyroscope" : "keypad");

async function handleType(type) {
  console.log("click");
  tiltService.stop();
  hasGyroStarted.value = false;
  console.log("handleType", type, isGyroSupported.value);
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
    return;
  } else {
    error.value = null;
    hasGyroStarted.value = true;
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
      padding-top: $space-l;
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
        margin-top: -$space-xxl * 3;

        .arrow-keys {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          justify-content: center;
          align-items: center;
          grid-template-areas:
            ". up ."
            "left . right"
            ". down .";
          gap: 10px;
          width: fit-content;
          margin: 0 auto;

          .arrow-up {
            grid-area: up;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .arrow-left {
            grid-area: left;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .arrow-down {
            grid-area: down;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .arrow-right {
            grid-area: right;
            display: flex;
            justify-content: center;
            align-items: center;
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
        width: 70vw;
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
