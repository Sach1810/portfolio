<template>
  <div class="app-container">
    <BackgroundPattern class="background-pattern" />
    <div ref="navArea" class="nav-area">
      <NavBar />
    </div>
    <div ref="contentArea" class="content-area">
      <router-view></router-view>
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
  position: relative;
  display: flex;
  justify-content: center;

  .background-pattern {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 0;
    opacity: 0.1;
    transform: translateX(-50%);
    // width: 100dvw;
  }

  .nav-area {
    position: fixed;
    left: 50%;
    top: 0;
    width: var(--nav-width);
    height: fit-content;
    z-index: 100;
  }

  .content-area {
    position: relative;
    min-height: 100dvh;
    width: 100%;
    overflow: scroll;
  }
}

.home-page {
  display: grid;
  grid-template-columns: 1fr; // single column on small screens
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, max-content);
  }
  // ... rest of your styles
}
</style>
