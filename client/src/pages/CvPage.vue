<template>
  <div class="cv-page">
    <div class="actions-wrapper max-width">
      <component
        class="icon"
        v-for="(icon, index) in icons"
        :key="index"
        :is="icon.component"
        :size="icon.size"
        :color="icon.color"
        :weight="icon.weight"
        @click="icon.action()"
        v-tippy="{ content: icon.tooltip, placement: 'bottom' }"
      />
    </div>
    <FullResume class="display-resume max-width" />
    <FullResume
      @pdfContent="pdfContent = $event"
      ref="pdfContent"
      :forPrint="true"
      style="z-index: -100; position: fixed; top: -1000px; left: -1000px"
    />
  </div>
</template>

<script setup>
import FullResume from "../components/cv/FullCv.vue";
import { ref, nextTick } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { directive as VTippy } from "vue-tippy";
import { PhDownloadSimple, PhPrinter } from "@phosphor-icons/vue";

const pdfContent = ref(null);
async function downloadPDF() {
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

const rootStyles = getComputedStyle(document.documentElement);
const iconColor = rootStyles.getPropertyValue("--c-font-light").trim();
const iconSize = 32;
const iconWeight = "bold";
const icons = [
  {
    component: PhDownloadSimple,
    size: iconSize,
    color: iconColor,
    weight: iconWeight,
    action: downloadPDF,
    tooltip: "Download CV",
  },
  {
    component: PhPrinter,
    size: iconSize,
    color: iconColor,
    weight: iconWeight,
    action: printPDF,
    tooltip: "Print CV",
  },
];
</script>

<style lang="scss" scoped>
.cv-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100dvh;
  padding: 0 10px 10px;

  .max-width {
    max-width: 794px; /* A4 width at 96 DPI */
    width: 100%;
    margin: 0 auto;
  }

  .actions-wrapper {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
    > svg {
      cursor: pointer;
      margin-left: 10px;
      transition: transform 0.2s ease-in-out;
      outline: none;

      &:hover {
        transform: scale(1.1);
      }

      &:active {
        opacity: 0.5;
      }
    }
  }

  .display-resume {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
}
</style>
