<template>
  <div style="position: relative; width: 100%; height: 100%; padding-top: 70px">
    <div class="actions-wrapper">
      <PhDownloadSimple :size="32" color="#ffffff" @click="downloadPDF" />
      <PhPrinter :size="32" color="#ffffff" @click="printPDF" />
    </div>
    <FullResume />
    <FullResume
      @pdfContent="pdfContent = $event"
      ref="pdfContent"
      :forPrint="true"
      style="z-index: -100"
    />
  </div>
</template>

<script setup>
import FullResume from "../components/cv/FullCv.vue";
import { ref, nextTick } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { PhDownloadSimple, PhPrinter } from "@phosphor-icons/vue";

const pdfContent = ref(null);
async function downloadPDF() {
  console.log(pdfContent.value);
  await nextTick();
  const el = pdfContent.value;
  if (!el) return alert("No content to export.");

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });

  const imgData = canvas.toDataURL("image/jpeg", 1.0);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm

  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pageWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  pdf.save("sacha_david_cv.pdf");
}

async function printPDF() {
  await nextTick();
  const el = pdfContent.value;
  if (!el) return alert("No content to print.");

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });

  const imgData = canvas.toDataURL("image/png", 1.0);

  // Open the image in a new window and print
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print CV</title>
        <style>
          body, html { margin: 0; padding: 0; }
          img { width: 100%; }
        </style>
      </head>
      <body>
        <img src="${imgData}" onload="window.print();window.close()" />
      </body>
    </html>
  `);
  printWindow.document.close();
}
</script>

<style lang="scss" scoped>
.actions-wrapper {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  padding: 20px;

  > svg {
    cursor: pointer;
    margin-left: 10px;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      opacity: 0.5;
    }
  }
}
</style>
