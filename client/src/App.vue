<template>
  <div class="app-container">
    <div class="nav-area"><NavBar /></div>
    <div class="content-area">
      <BackgroundPattern class="background-pattern" />
      <div class="content-area">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import NavBar from "@/components/nav/NavBar.vue";
import BackgroundPattern from "@/components/BackgroundPattern.vue";

const navArea = ref(null);
const contentArea = ref(null);

const updateNavPosition = () => {
  if (!contentArea.value || !navArea.value) return;
  const rect = contentArea.value.getBoundingClientRect();
  navArea.value.style.position = "fixed";
  navArea.value.style.top = `${rect.top}px`;
  navArea.value.style.left = `${rect.left}px`;
};

onMounted(() => {
  updateNavPosition();
  window.addEventListener("scroll", updateNavPosition);
  window.addEventListener("resize", updateNavPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateNavPosition);
  window.removeEventListener("resize", updateNavPosition);
});
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  font-family: "Kodchasan", system-ui, Avenir, Helvetica, Arial, sans-serif;
  background: radial-gradient(
    circle at 30% 30%,
    #004a68,
    #116d75 70%,
    #00b3bd 100%
  );
  background-color: #0f4f54;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
  display: grid;
  grid-template-columns: max-content 1fr;

  .background-pattern {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 0;
    opacity: 0.1;
    transform: translateX(-50%);
  }
}

.home-page {
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, max-content);
  }
}
</style>
