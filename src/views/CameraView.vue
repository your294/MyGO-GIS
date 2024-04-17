<template>
  <video id="cameraVideo" class="w-full h-4/5" autoplay></video>
  <van-button type="primary" class="rounded-full" @click="quitCamera"
    >自拍</van-button
  >
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const videoElement = document.getElementById("cameraVideo");

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    if (videoElement === null) {
      console.error("video element is null");
    }
    (videoElement as HTMLMediaElement).srcObject = stream;
  })
  .catch(function (error) {
    console.error("获取摄像头失败:", error);
  });

const quitCamera = () => {
  router.back();
};
</script>
