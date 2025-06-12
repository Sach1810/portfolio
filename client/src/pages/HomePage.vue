<template>
  <div id="main-layout">
    <div class="side left"></div>
    <div class="center">
      <h1 @click="isWalking = !isWalking">Coming soon</h1>
      <div>
        <SachaCartoonArmsCrossed v-if="!isWalking" style="height: 50vh" />
        <SachaWalking style="height: 48vh" v-else />
      </div>
    </div>
    <div class="side right"><QrCode /></div>
    <!-- <a
      class="bottom"
      href="/assets/Sacha-David-Resume.pdf"
      download="Sacha-David-Resume.pdf"
    > -->
    <div class="bottom">
      <div>SACHA DAVID</div>
      <div class="subtitle">Fullstack Developer</div>
      <!-- <div class="download-text">Download Resume</div> -->
    </div>
    <!-- </a> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
//TODO sacha move grid to a layout and use slots to put data inside
// import Sad from "./components/SADLogo.vue";
import QrCode from "../components/QrCode.vue";
import SachaCartoonArmsCrossed from "../components/SachaCartoonArmsCrossed.vue";
import SachaWalking from "../components/SachaWalking.vue";

const isWalking = ref(false);
</script>

<style lang="scss" scoped>
#main-layout {
  max-width: 1200px;
  min-width: 90dvw;
  min-height: 90dvh;
  display: grid;
  border-radius: 15px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 20vh;
  grid-template-areas:
    "side-left center side-right"
    "bottom bottom bottom";
  // overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

h1 {
  letter-spacing: 15px;
  text-wrap: nowrap;
  position: absolute;
  font-size: 100px;
}

.side {
  background: var(--c2);
}

.side .left {
  grid-area: side-left;
}

.side .right {
  grid-area: side-right;
}
.center {
  background: var(--c3);
  grid-area: center;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom {
  background: #fff;
  grid-area: bottom;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: var(--c1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.bottom:active {
  color: #fff;
  background: var(--c2);
}

.bottom .subtitle {
  font-size: 55%;
  letter-spacing: 1.8px;
  margin-top: -7px;
}

.bottom .download-text {
  font-size: 40%;
  margin-top: 5px;
}
</style>
