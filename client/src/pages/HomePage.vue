<template>
  <div class="home-page">
    <div class="content">
      <div class="name-container">
        <div class="name">Sacha</div>
        <div class="name fill">David</div>
        <div class="role">Fullstack Developer</div>
      </div>
      <p>
        &#x1F44B; Hi, I'm Sacha a creative fullstack developer passionate about
        building intuitive software experiences.
      </p>
    </div>
    <div class="image-container">
      <SachaCartoonArmsCrossed class="character" />
    </div>
    <div class="info-container">
      <section class="work-container">
        <div class="work-item">
          <div>
            <h1>Job Search Game</h1>
            <p>
              A very basic game that can use a mobile phone as a controller
              based on the phones movement (also keyboard compatible). Loosly
              based on Snake. Not mobile device compatable
            </p>
          </div>
          <ul>
            <li>Websockets</li>
            <li>devicemotion api</li>
          </ul>
          <div>
            <QrCode /><span
              >Scan with mobile to play or click to use keyboard</span
            >
          </div>
        </div>
        <div class="work-item">
          <div>
            <h1>Target shooter</h1>
            <p>Use your fingers to shoot the targets on the screen.</p>
          </div>
          <ul>
            <li>Tensorflow js</li>
            <li>MediaDevices api</li>
          </ul>
        </div>
        <div class="work-item">
          <div>
            <h1>Target shooter</h1>
            <p>Use your fingers to shoot the targets on the screen.</p>
          </div>
          <ul>
            <li>Tensorflow js</li>
            <li>MediaDevices api</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import QrCode from "../components/QrCode.vue";
import SachaCartoonArmsCrossed from "../components/SachaCartoonArmsCrossed.vue";
</script>

<style lang="scss" scoped>
.home-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: 100dvh;
  align-content: start;
  padding: $page-padding;
  gap: $space-l;
  justify-content: center;
  font-weight: normal;
  max-width: 100vw;
  max-width: 1300px;
  margin: 0 auto;

  @include respond-to(md) {
    $padding-t-b: $page-padding * 1.5;
    grid-template-columns: 1fr;
    align-content: center;
    padding: $padding-t-b $nav-closed-width $padding-t-b 0;
  }

  .content,
  .image-container,
  .info-container {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    overflow-wrap: break-word;
  }

  .content {
    font-size: $font-l;

    @include respond-to(md) {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: $font-m;
    }

    p {
      max-width: 370px;
      line-height: 1.5;
      margin-top: $space-l;
      @include respond-to(md) {
        text-align: center;
      }
    }

    .name-container {
      margin-top: $space-xl;
      display: flex;
      flex-direction: column;
      font-size: $font-headline;
      line-height: 1;
      font-weight: bold;

      @include respond-to(md) {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: $font-headline-s;
        margin-top: 0;
      }

      .name {
        &.fill {
          letter-spacing: 0.35rem;

          @include respond-to(md) {
            letter-spacing: 0.2rem;
          }
        }
      }

      .role {
        margin-top: $space-m;
        text-transform: uppercase;
        font-size: $font-l;
        letter-spacing: 0.28rem;
        color: $c-highlight;
        text-shadow: -1px -1px 0 $c-font-dark, 1px -1px 0 $c-font-dark,
          -1px 1px 0 $c-font-dark, 1px 1px 0 $c-font-dark;

        @include respond-to(md) {
          font-size: $font-m;
          letter-spacing: 0.11rem;
        }
      }
    }
  }

  .image-container {
    display: flex;
    justify-content: center;
    @include respond-to(md) {
      margin-top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: $space-xs;
    }

    .character {
      height: 550px;

      @include respond-to(md) {
        height: 300px;
      }
    }
  }

  .info-container {
    border-radius: 5px;
    grid-column: 1 / -1;
    height: 100px;

    @include respond-to(md) {
      grid-column: auto;
    }

    .work-container {
      display: flex;
      flex-direction: column;
      gap: $space-m;

      .work-item {
        display: grid;
        grid-template-columns: 1fr max-content;
        gap: $space-xl;
        padding: $space-l;
        border-radius: 5px;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.15),
          rgba(255, 255, 255, 0.02)
        );
      }
    }
  }
}
</style>
