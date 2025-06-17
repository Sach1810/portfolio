<template>
  <div>
    <button @click="downloadPDF">Download PDF</button>
    <FullResume @pdfContent="pdfContent = $event" ref="pdfContent" />
  </div>
</template>

<script setup>
import FullResume from "../components/cv/FullCv.vue";
import { ref, nextTick } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
</script>
