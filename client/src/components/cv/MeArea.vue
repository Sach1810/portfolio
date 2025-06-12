<template>
  <section class="me">
    <img :src="sadIcon" alt="Sacha David Logo" style="width: 120px" />
    <div class="name-wrapper flex-center">
      <div class="first-wrapper">
        <hr />
        <span class="first">SACHA</span>
        <hr />
      </div>
      <span class="last">DAVID</span>
    </div>
    <div class="role-wrapper flex-center">
      <span>Fullstack Developer</span>
      <span>Web Specialist</span>
    </div>
  </section>
</template>
<script setup>
import sadIcon from "../../assets/SADIcon.png";
</script>
<style lang="scss" scoped>
.me {
  text-align: center;
  .name-wrapper {
    font-size: 40px;
    font-weight: bold;
    color: black;
    position: relative;
    width: 100%;

    .first-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      hr {
        width: 30px;
        height: 2px;
        background: black;
        border: none;
      }

      .first {
        letter-spacing: 4px;
        padding-left: 6px;
      }
    }

    .last {
      margin-top: -20px;
      margin-left: 8px;
      letter-spacing: 8px;
    }
  }

  .role-wrapper {
    font-size: 16px;
    opacity: 0.6;
  }
}
</style>
