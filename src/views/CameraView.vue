<template>
  <video id="cameraVideo" class="w-full h-4/5" autoplay></video>
  <van-button type="primary" class="rounded-full" @click="quitCamera"
    >自拍</van-button
  >
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter();

let traceCameraStream: any = null;

onMounted(() => {
  const videoElement = document.getElementById("cameraVideo");

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      if (videoElement === null) {
        console.error("video element is null");
      }
      (videoElement as HTMLMediaElement).srcObject = stream;
      traceCameraStream = stream;
    })
    .catch(function (error) {
      console.error("获取摄像头失败:", error);
    });
})


const quitCamera = () => {
  traceCameraStream.getTracks().forEach((track: any) => {
    if (track.readyState == 'live') {
          track.stop();
      }
  })
  
  const videoElement = document.getElementById("cameraVideo");
  (videoElement as HTMLMediaElement).srcObject = null;
  router.back();
};

onUnmounted(() => {
  // const videoElement = document.getElementById("cameraVideo");
  // (videoElement as HTMLMediaElement).srcObject = null;
})
</script>
