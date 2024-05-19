<template>
  <div class="camera-container">
    <video
      :class="{ opacity: showPhoto }"
      style="object-fit: cover; height: 650px"
      id="cameraVideo"
      class="w-full h-auto mb-4"
      autoplay
    ></video>
    <div class="upload-container" :class="{ hidden: !showPhoto }">
      <canvas id="canvas" :class="{ hidden: !showPhoto }"></canvas>
      <div
        style="text-align: center"
        :class="{ hidden: !showPhoto }"
        class="w-full h-auto p-2 mt-8"
      >
        <button class="mr-8 btn close-btn" @click="handleReCapture">
          <span
            class="icon-[ri--close-line]"
            style="color: inherit; font-size: 3rem"
          ></span>
        </button>
        <button class="btn upload-btn" @click="handleUpload">
          <span
            class="icon-[ri--check-fill]"
            style="color: inherit; font-size: 3rem"
          ></span>
        </button>
      </div>
    </div>

    <div class="title-bar">
      <span>图片</span>
      <span>拍照</span>
      <span>改变摄像头</span>
    </div>
    <div class="operation-bar">
      <button class="pic-btn" @click="openPhotoAlbum">
        <img :src="teamAvatar" />
      </button>
      <!-- <van-button type="primary" class="rounded-full" @click="quitCamera"
        ><div class="circle"></div
      ></van-button> -->

      <button class="main-btn" @click="takePhoto">
        <div class="circle"></div>
      </button>

      <button
        class="toggle-btn"
        :class="{ active: isActive }"
        @click="handleToggle"
      >
        <span class="icon-[ri--loop-right-line]" style="color: inherit"></span>
      </button>
    </div>
    <van-button
      class="quit-btn"
      type="primary"
      @click="
        () => {
          quitCamera();
          router.back();
        }
      "
      >quit</van-button
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import teamAvatar from "../assets/teamAvatar.png";

const router = useRouter();
const isActive = ref(false);
const showPhoto = ref(false);

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
});

const quitCamera = () => {
  traceCameraStream.getTracks().forEach((track: any) => {
    if (track.readyState == "live") {
      track.stop();
    }
  });

  const videoElement = document.getElementById("cameraVideo");
  (videoElement as HTMLMediaElement).srcObject = null;
};

const handleToggle = () => {
  isActive.value = true;
  setTimeout(() => {
    isActive.value = false;
  }, 500);
};

const openPhotoAlbum = () => {
  quitCamera();
  router.push("/album");
};

const takePhoto = async () => {
  showPhoto.value = !showPhoto.value;
  const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;
  const video = document.getElementById("cameraVideo");
  if (canvas === null) {
    console.error("no canvas element");
  }
  let context = canvas!.getContext("2d");

  // 调整canvas的尺寸以匹配video的尺寸
  canvas.width = Number(video?.clientWidth);
  canvas.height = Number(video?.clientWidth);

  // 将当前视频帧绘制到canvas上
  context!.drawImage(video, 0, 0, canvas.width, canvas.height);

  // 可选：将canvas转换为img标签显示或上传到服务器
  const dataURL = canvas.toDataURL("image/jpeg");
  const blob = await (await fetch(dataURL)).blob();

  // create FormData
  const formData = new FormData();
  formData.append("image", blob, "camera.jpg");
  try {
    const response = await axios.post("/server/koa/upload", formData, {
      headers: {
        "Content-Type": "multipart/form_data",
      },
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("图片上传api出问题: ", error);
  }
};

const handleReCapture = () => {
  showPhoto.value = false;
};

const handleUpload = () => {
  quitCamera();
  router.back();
};

onUnmounted(() => {
  // const videoElement = document.getElementById("cameraVideo");
  // (videoElement as HTMLMediaElement).srcObject = null;
});
</script>

<style scoped>
.camera-container {
  height: 100vh;
  color: var(--prism-foreground);
  position: relative;
}

.camera-container .operation-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.camera-container .title-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 10px;
}

.opacity {
  opacity: 0;
}

.hidden {
  display: none;
}

.camera-container .upload-container {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.upload-container .btn {
  height: 4rem;
  width: 4rem;
  border: 0;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}

.upload-container .close-btn {
  background-color: red;
}

.upload-container .upload-btn {
  background-color: green;
}

.title-bar {
  text-align: center;
}

.main-btn {
  background-color: #fff;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.main-btn:active {
  transform: scale(0.98);
}

.main-btn .circle {
  background-color: #ff7600;
  height: 2.8rem;
  width: 2.8rem;
  border-radius: 50%;
  border: 1px solid black;
}

.pic-btn {
  height: 2rem;
  width: 2rem;
  background-color: #fff;
  border-radius: 4px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.pic-btn img {
  border-radius: 4px;
  border: 0;
}

.pic-btn:active img {
  transition: transform 0.3s ease-in;
  transform: scale(0.8);
}

.toggle-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  /* animation: rotateToggle 0.5s ease-in forwards; */
}

.toggle-btn.active {
  animation: rotateToggle 0.5s ease-in forwards;
}

.quit-btn {
  position: absolute;
  bottom: 8%;
  left: 0;
  right: 0;
}

@keyframes rotateToggle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

.toggle-btn:active {
  transform: rotate(180deg);
}
</style>
