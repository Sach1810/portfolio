<template>
  <div ref="pdfContent" class="pdf-a4">
    <div class="content">
      <div class="side left">
        <MeArea />
        <ContentSection>
          <template #icon><PhDevices :size="30" color="#fff" /></template>
          <template #title>
            <span style="font-size: 4.5mm; white-space: nowrap"
              >ABOUT & CONTACT</span
            >
          </template>
          <template #content>Contact details here in a css grid</template>
        </ContentSection>
      </div>
      <div class="divider"><div class="vertical-line"></div></div>
      <div class="side right">2</div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import sadIcon from "../../assets/SADIcon.png";
import { PhDevices } from "@phosphor-icons/vue";

import MeArea from "./MeArea.vue";
import ContentSection from "./ContentSection.vue";

const emit = defineEmits(["pdfContent"]);
const pdfContent = ref(null);
onMounted(() => {
  emit("pdfContent", pdfContent.value);
});
</script>

<style lang="scss" scoped>
.pdf-a4 {
  width: 794px; /* A4 width at 96 DPI */
  height: 1123px; /* A4 height at 96 DPI */
  background: white;
  color: black;
  box-sizing: border-box;
  font-family: "Kodchasan";
  font-size: 16px;
  border: 1px solid #000;
  .content {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    height: 100%;
    width: 100%;
    padding: 40px;
    display: grid;
    grid-template-columns: 35% 20px 65%;

    .divider {
      height: 100%;
      width: 100%;
      padding: 0 4mm;
      justify-self: center;

      .vertical-line {
        width: 2px;
        height: 100%;
        background: #000;
        transform: translateX(50%);
      }
    }
  }
}

@media print {
  .pdf-a4 {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 40px;
  }
}
</style>
