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
        <router-link to="/jobsearch">
          <div class="work-item">
            <div class="title">
              <h1>Job Search</h1>
            </div>
            <div class="image"><InterviewSvg style="width: 100%" /></div>
            <div class="description">
              <p>
                A very basic game that can use a mobile phone as a controller
                based on the phones movement (also keyboard/swipe compatible).
                Loosly based on Snake. Get to the targets and avoid the trees
                which block you. For the best experience move around by tilting
                the phone.
              </p>
            </div>
            <div class="tech">
              <div>Websockets</div>
              <div>devicemotion api</div>
              <div>Vue 3</div>
              <div>Scss</div>
              <div>Vite</div>
            </div>
          </div>
        </router-link>
        <router-link to="/targetshooter">
          <div class="work-item">
            <div class="title">
              <h1>Target shooter</h1>
            </div>
            <div class="image"><TargetShooterSvg style="width: 100%" /></div>
            <div class="tech">
              <div>Tensorflow js</div>
              <div>MediaDevices api</div>
              <div>Vue 3</div>
              <div>Scss</div>
              <div>Vite</div>
            </div>
            <div class="description">
              <p>Use your fingers to shoot the targets on the screen.</p>
            </div>
          </div>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SachaCartoonArmsCrossed from "../components/SachaCartoonArmsCrossed.vue";
import InterviewSvg from "@/components/jobsearch/InterviewSvg.vue";
import TargetShooterSvg from "@/components/svgs/TargetShooterSvg.vue";
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
    padding: $padding-t-b 0;
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
      white-space: nowrap;

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
      gap: $space-l;
      font-size: $font-m;

      a {
        text-decoration: none;
        color: inherit;
        outline: none;

        &:hover {
          text-decoration: none;
          color: inherit;
        }

        &:focus {
          text-decoration: none;
          color: inherit;
          outline: none;
        }

        &:visited {
          text-decoration: none;
          color: inherit;
        }
      }

      .work-item {
        display: grid;
        grid-template-areas:
          "title title"
          "image description"
          "tech tech";
        grid-template-columns: 200px 1fr;
        grid-template-rows: auto auto auto;
        gap: $space-m;
        padding: $space-l;
        border-radius: 5px;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.15),
          rgba(255, 255, 255, 0.02)
        );

        @include respond-to(md) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: $space-m;
        }

        .title {
          grid-area: title;
          background: $c-bg-darker;
          padding: $space-s;
          font-size: $font-m;
          width: 100%;

          background: linear-gradient(
            135deg,
            rgba(33, 77, 86, 0.55),
            rgba(33, 77, 86, 0.15)
          );
          border-radius: 5px;
        }
        .image {
          grid-area: image;
        }
        .tech {
          grid-area: tech;
          display: flex;
          flex-wrap: wrap;
          gap: $space-m;
          width: 100%;

          > div {
            flex-shrink: 0;
            white-space: nowrap;
          }

          @include respond-to(md) {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            gap: $space-xs $space-l;
            width: 100%;
          }
        }
        .description {
          grid-area: description;
        }
      }
    }
  }
}
</style>
