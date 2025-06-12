<template>
  <div ref="pdfContent" class="a4-page">cv here</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const emit = defineEmits(["pdfContent"]);
const pdfContent = ref(null);
onMounted(() => {
  emit("pdfContent", pdfContent.value);
});
</script>

<style lang="scss" scoped>
.a4-page {
  width: 210mm;
  height: 296.5mm;
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 4px rgba(0, 0, 0, 1);
  margin: 0;
  // padding: 7mm;
  // margin: 0;
  // box-sizing: border-box;
  // overflow: hidden;
  // background: white;
  // color: black;
  // font-family: "Kodchasan";
  // font-size: 4.5mm;
}
</style>
