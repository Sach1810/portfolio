<template>
  <button @click="downloadPDF">Download PDF</button>
  <CvTest @pdfContent="pdfContent = $event" ref="pdfContent" />
  <!-- <SachaCv @pdfContent="pdfContent = $event" ref="pdfContent" /> -->
</template>

<script setup>
// import SachaCv from "../components/SachaCv.vue";
import CvTest from "../components/cv/TestCv.vue";
import { ref, nextTick } from "vue";
import html2pdf from "html2pdf.js";

const pdfContent = ref(null);
async function downloadPDF() {
  console.log("Downloading PDF...");
  await nextTick();
  console.log("content", pdfContent.value);
  const element = pdfContent.value;
  if (!element) return alert("No content found");

  html2pdf()
    .set({
      margin: 0,
      filename: "sacha_david_cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        windowHeight: 1122, // 297mm at 96 DPI
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    })
    .from(element)
    .save();
}
</script>

<style lang="scss" scoped></style>
