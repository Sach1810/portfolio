<template>
  <div id="qr-code" ref="qrCodeRef" @click="emit"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import QRCodeStyling from "qr-code-styling";
import socketService from "@/services/SocketService";

const route = useRoute();
const router = useRouter();

const qrCodeRef = ref(null);
const desitnationUrl =
  process.env.NODE_ENV === "production"
    ? "https://sachadavid.dev/#"
    : "https://192.168.86.27:5173/#";

const options = ref({
  width: 115,
  height: 115,
  type: "svg",
  data: `${desitnationUrl}/controller`,
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

// Update QR code data when socket connects
socketService.onConnect((socketId) => {
  options.value.data = `${desitnationUrl}/controller?socketId=${socketId}`;
});

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

function emit() {
  if (!socketService.isConnected()) return;
  socketService.emit("test", "Hello from QR Code!");
}

const updates = ref({
  direction: "none",
  speed: 0,
});

socketService.on("startJobSearch", (msg) => {
  const targetPath = "/jobsearch";
  if (route.path !== targetPath) {
    router.replace(targetPath);
  }
});
</script>

<style scoped>
#qr-code {
  background: #fff;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  overflow: hidden;
}
</style>
