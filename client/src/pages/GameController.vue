<template>
  <div class="game-controller">
    <h1>{{ lastDirection }}</h1>
    <div class="controller">
      <div class="btn" @click="tiltService.start()">start</div>
      <div class="btn" @click="tiltService.stop()">stop</div>
      <div class="left">
        <div class="btn" @click="updateGame({ direction: 'left', speed: 1 })">
          Left
        </div>
        <div class="btn" @click="updateGame({ direction: 'up', speed: 1 })">
          Up
        </div>
        <div class="btn" @click="updateGame({ direction: 'down', speed: 1 })">
          Down
        </div>
        <div class="btn" @click="updateGame({ direction: 'right', speed: 1 })">
          Right
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import socketService from "@/services/SocketService.js";
import TiltDetectorService from "@/services/TiltDetectorService.js";

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
    name: "sacha",
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

const tiltService = new TiltDetectorService({
  onTilt: (direction, x, y) => {
    updateGame({ direction });
  },
});
</script>

<style lang="scss" scoped>
.game-controller {
  height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;

  .btn {
    border: 2px solid white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 50px;
  }
}
</style>
