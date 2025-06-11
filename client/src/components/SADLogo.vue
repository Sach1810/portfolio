<template>
  <div class="logo-container">
    <Sacha style="width: 70px; height: 70px" />
  </div>
</template>

<script setup>
import Sacha from "./SachaSvg.vue";
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
}

.logo-text {
  margin-left: -10px;
}
</style>
