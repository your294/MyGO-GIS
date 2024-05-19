<template>
  <div class="operation-bar">
    <span
      class="icon-[ri--arrow-left-double-line] icon-btn"
      style="color: inherit"
      @click="routerChange"
    ></span>
    <h3>打卡相册</h3>
  </div>

  <div class="album-container">
    <div
      class="pic-cell"
      :class="{ zoom: isZoom }"
      v-for="(item, idx) in photoAlbum"
      :style="{ backgroundImage: `url(${item})` }"
      :key="idx"
      @click="zoomPicture"
    ></div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const staticImgBaseUrl = "http://127.0.0.1:3000";
const photoAlbum = ref([]);
const isZoom = ref(false);

const routerChange = () => {
  router.push("/");
};

// 点击图片放大
const zoomPicture = () => {
  isZoom.value = !isZoom.value;
};

const getAllImageName = () => {
  axios
    .get("/server/koa/images-name")
    .then(function (response) {
      const data = response.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = staticImgBaseUrl + "/" + data[i];
      }
      photoAlbum.value = data;
    })
    .catch(function (err) {
      console.error(err);
    });
};

onMounted(getAllImageName);
</script>

<style scoped>
.operation-bar {
  width: 100%;
  height: auto;
  position: relative;
}

.operation-bar .icon-btn {
  @apply shadow-lg;
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-70%);
  cursor: pointer;
}

h3 {
  text-align: center;
  margin: 5px 0 10px 0;
}

.album-container {
  height: 100%;
  width: 100%;
  padding: 5px 10px 10px 25px;
  display: grid;
  grid-template-columns: repeat(4, minmax(80px, 1fr));
  gap: 5px;
}

.pic-cell {
  background-color: orange;
  background-size: cover;
  background-position: center;
  width: 80px;
  height: 80px;
  border: 1px solid gray;
  cursor: pointer;
  transition: transform 0.3s ease, height 0.3s linear width 0.3s linear;
}

.pic-cell.zoom {
  position: absolute;
  top: 5%;
  left: 0;
  right: 0;
  width: 100%;
  height: 80%;
}

.pic-cell.zoom::after {
  content: "点击图片缩放";
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
}

.pic-cell:active {
  transform: scale(0.95);
}
</style>
