<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="home" icon="home-o">保安队员</van-tabbar-item>
    <van-tabbar-item name="location" icon="location">地图</van-tabbar-item>
    <van-tabbar-item name="chat" icon="chat-o">消息</van-tabbar-item>
    <van-tabbar-item name="setting" icon="setting-o">个人设置</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const active = ref("home");

const onChange = (name: string) => {
  if (name === "home") {
    router.push("/");
  } else if (name === "location") {
    router.push("/map");
  } else if (name === "chat") {
    router.push("/chat");
  } else {
    router.push("/settings");
  }
};
</script>
