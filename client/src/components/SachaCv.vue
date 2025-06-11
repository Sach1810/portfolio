<template>
  <div>
    <button @click="downloadPDF">Download PDF</button>

    <div ref="pdfContent" class="a4-page">
      <div class="left-col">
        <img :src="sadIcon" alt="Sacha David Logo" style="width: 35%" />
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
        <section class="flex-center" style="width: 100%">
          <SectionTitle>
            <template #icon> <PhDevices :size="30" color="#fff" /></template>
            <template #title>
              <span style="font-size: 4.5mm; white-space: nowrap">
                ABOUT & CONTACT
              </span></template
            >
            <template #content>Contact details here in a css grid</template>
          </SectionTitle>
        </section>
      </div>
      <div class="divider-wrapper"><div class="divider"></div></div>
      <div>This is printable content in A4 size.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import html2pdf from "html2pdf.js";
import sadIcon from "../assets/SADIcon.png";

import SectionTitle from "./cv/SectionTitle.vue";
import { PhDevices } from "@phosphor-icons/vue";

const pdfContent = ref(null);

async function downloadPDF() {
  await nextTick();
  const element = pdfContent.value;
  if (!element) return alert("No content found");

  html2pdf()
    .set({
      margin: 10,
      filename: "sacha_david_cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save();
}
</script>

<style lang="scss" scoped>
.a4-page {
  width: 210mm;
  height: 100%;
  min-height: 277mm;
  padding: 8mm;
  background: white;
  color: black;
  border: 5px solid red;
  display: grid;
  grid-template-columns: 30% 10mm 70%;
  font-family: "Kodchasan";
  font-size: 4.5mm;

  // > * {
  //   border: 2px dashed grey;
  // }
  .left-col {
    display: flex;
    align-items: center;
    flex-direction: column;

    .name-wrapper {
      font-size: 10mm;
      font-weight: bold;
      color: black;
      position: relative;
      width: 100%;
      margin-top: 3mm;
      .first-wrapper,
      .last {
        z-index: 1;
      }

      .first-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        position: relative;

        hr {
          width: 10mm;
          height: 0.5mm;
          background: black;
          border: none;
        }
        .first {
          letter-spacing: 1.5mm;
          padding: 0 0 0 3mm;
        }
      }

      .last {
        margin-top: -6mm;
        margin-left: 3.5mm;
        letter-spacing: 2.5mm;
      }
    }

    .role-wrapper {
      font-size: 4mm;
      opacity: 0.6;
      margin-bottom: 10mm;
    }
  }
  .divider-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 4mm;
    justify-self: center;
    .divider {
      width: 0.25mm;
      height: 100%;
      background: #000;
      transform: translateX(50%);
    }
  }
}
</style>
