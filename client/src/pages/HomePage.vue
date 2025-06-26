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
    <div class="info-container">Info</div>
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
  grid-template-columns: repeat(2, max-content);
  min-height: 100dvh;
  align-content: center;
  padding: $page-padding;
  gap: $space-l;
  justify-content: center;
  font-weight: normal;

  @include respond-to(md) {
    $padding-t-b: $page-padding * 1.5;
    grid-template-columns: 1fr;
    align-content: center;
    padding: $padding-t-b $nav-closed-width $padding-t-b 0;
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
    padding: $space-m;
    border-radius: 5px;
    grid-column: 1 / -1;
    height: 100px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.02)
    );

    @include respond-to(md) {
      grid-column: auto;
    }
  }
}
</style>
