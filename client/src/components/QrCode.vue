<template>
  <div id="qr-code" ref="qrCodeRef"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import QRCodeStyling from "qr-code-styling";

const qrCodeRef = ref(null);
const extension = ref("svg");

const options = ref({
  width: 150,
  height: 150,
  type: "svg",
  data: "https://sachadavid.dev",
  image: "/sad.ico",
  margin: 0,
  qrOptions: {
    typeNumber: 0,
    mode: "Byte",
    errorCorrectionLevel: "Q",
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 2,
    crossOrigin: "anonymous",
  },
  dotsOptions: {
    type: "classy-rounded",
    color: "#000",
    roundSize: true,
  },
  backgroundOptions: {
    round: 0,
    color: "#fff",
  },
  cornersSquareOptions: {
    color: "#000",
    type: "extra-rounded",
  },
  cornersDotOptions: {
    color: "#000",
    type: "dot",
  },
});

const qrCode = new QRCodeStyling(options.value);

onMounted(() => {
  if (qrCodeRef.value) {
    qrCode.append(qrCodeRef.value);
  }
});

watch(
  () => options.value.data,
  () => {
    qrCode.update(options.value);
  }
);

function download() {
  qrCode.download({ extension: extension.value });
}
</script>

<style scoped>
#qr-code {
  background: #fff;
  width: 170px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
</style>
