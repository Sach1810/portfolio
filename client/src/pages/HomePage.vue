<template>
  <div class="home-page">
    <div class="top-layout">
      <div class="play-container"><QrCode />Scan to play job search</div>
      <div>
        <SachaCartoonArmsCrossed style="height: 50vh" />
      </div>
    </div>
    <div class="bottom-layout">
      <svg
        class="cutout-mask"
        viewBox="0 0 1000 300"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id="text-cutout">
            <!-- Full white base (visible) -->
            <rect x="0" y="0" width="1000" height="300" fill="white" />

            <!-- Title -->
            <text
              x="50%"
              y="45%"
              text-anchor="middle"
              dominant-baseline="middle"
              font-size="80"
              font-weight="700"
              font-family="Kodchasan"
              fill="black"
            >
              SACHA DAVID
            </text>

            <!-- Subtitle -->
            <text
              x="50%"
              y="75%"
              text-anchor="middle"
              dominant-baseline="middle"
              font-size="30"
              font-weight="700"
              font-family="Kodchasan"
              fill="black"
              letter-spacing="5"
            >
              FULLSTACK DEVELOPER
            </text>
          </mask>
        </defs>

        <rect
          x="0"
          y="0"
          width="1000"
          height="300"
          fill="var(--c-light)"
          mask="url(#text-cutout)"
        />

        <rect
          x="-850px"
          y="0"
          width="1000"
          height="300"
          fill="var(--c-light)"
        />

        <rect x="850px" y="0" width="1000" height="300" fill="var(--c-light)" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import QrCode from "../components/QrCode.vue";
import SachaCartoonArmsCrossed from "../components/SachaCartoonArmsCrossed.vue";
</script>

<style lang="scss" scoped>
$edgePadding: 20px;
.home-page {
  display: grid;
  grid-template-rows: 1fr max-content;
  min-height: 100dvh;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .top-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .play-container {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }

  .bottom-layout {
    width: 100%;
    position: relative;
    overflow: hidden;

    .cutout-mask {
      width: 100%;
      max-height: 20vh;
      height: auto;
      display: block;
    }
  }
}
</style>
