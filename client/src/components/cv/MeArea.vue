<template>
  <section class="me">
    <div class="logo-wrapper flex-center">
      <img :src="sadIcon" alt="Sacha David Logo" class="logo" />
    </div>
    <div class="name-wrapper flex-center">
      <div class="first-wrapper">
        <hr />
        <span class="first">SACHA</span>
        <hr />
      </div>
      <span class="last">DAVID</span>
    </div>
    <div class="role-wrapper">
      <span>Fullstack Developer</span> &
      <span>Web Specialist</span>
    </div>
  </section>
</template>
<script setup>
import sadIcon from "../../assets/SADIcon.png";
</script>
<style lang="scss" scoped>
.me {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .logo-wrapper {
    margin-bottom: 5px;
    .logo {
      height: 100px;
      object-fit: contain;
    }
  }

  .name-wrapper {
    font-size: 30px;
    font-weight: bold;
    color: black;
    position: relative;
    width: 100%;
    gap: 8px;

    .first-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 5px;

      hr {
        width: 100%;
        height: 2px;
        background: black;
        border: none;
      }

      .first {
        letter-spacing: 5px;
        padding-left: 5px;
      }
    }

    .last {
      margin-top: -20px;
      margin-left: 8px;
      letter-spacing: 8px;
    }
  }

  .role-wrapper {
    opacity: 0.5;
  }
}
</style>
