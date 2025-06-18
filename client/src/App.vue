<template>
  <div class="app-container">
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
import NavBar from "./components/nav/NavBar.vue";

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
  background: linear-gradient(45deg, var(--c-dark) 0%, #348f8f 55%);
  display: flex;
  flex-direction: column;
  align-items: center;
  .nav-area {
    position: fixed;
    left: 0;
    top: 0;
    width: var(--nav-width);
    height: fit-content;
    z-index: 100;
  }

  .content-area {
    // padding-left: var(--nav-width);
    position: relative;
    min-height: 100dvh;
    // background: linear-gradient(45deg, var(--c-dark) 0%, #348f8f 55%);
    max-width: 1500px;
    width: 100%;
  }
}
</style>
