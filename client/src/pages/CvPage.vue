<template>
  <div class="cv-page">
    <div class="display-resume max-width" style="background: white; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
      <embed
        :src="cvPdf"
        type="application/pdf"
        width="100%"
        height="1150px"
        style="border: none; display: block; margin: 0 auto; background: white;"
      />
    </div>
  </div>
</template>

<script setup>
import cvPdf from "../assets/Sacha_David_cv.pdf";
//   {
//     component: PhDownloadSimple,
//     size: iconSize,
//     color: iconColor,
//     weight: iconWeight,
//     action: downloadCV,
//     tooltip: "Download CV",
//   },
//   {
//     component: PhPrinter,
//     size: iconSize,
//     color: iconColor,
//     weight: iconWeight,
//     action: printCV,
//     tooltip: "Print CV",
//   },
// ];
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
    background: white;
    padding-bottom: 24px;
    margin-top: $space-m
  }
}
</style>
