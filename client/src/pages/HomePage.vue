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
      <SachaCartoonArmsCrossed style="height: 550px" />
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
  grid-template-columns: repeat(2, max-content);
  min-height: 100dvh;
  align-content: center;
  padding: $page-padding;
  gap: $space-l;
  justify-content: center;
  font-weight: normal;

  @include respond-to(md) {
    grid-template-columns: 1fr;
    align-content: center;
    padding: $page-padding * 1.5 $page-padding;
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
        padding: 0 $space-xl;
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
        margin-top: $space-m;
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
        color: $highlight;
        text-shadow: -1px -1px 0 $dark, 1px -1px 0 $dark, -1px 1px 0 $dark,
          1px 1px 0 $dark;

        @include respond-to(md) {
          font-size: $font-m;
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
  }
}
</style>
