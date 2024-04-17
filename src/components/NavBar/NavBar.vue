<template>
  <nav
    class="w-full h-auto p-2 flex justify-around bg-white dark:bg-slate-700 rounded-md shadow-md"
  >
    <a class="icon-btn" @click="() => toggleDark()">
      <span v-if="isDark" class="icon-[ri--moon-fill]"></span>
      <span v-else class="icon-[ri--sun-line]"></span>
    </a>
    <Item :key="idx" v-for="(page, idx) in pages" :content="page" />
    <a class="icon-btn" @click="handleCamera">
      <span class="icon-[ri--camera-line]"></span>
    </a>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toggleDark, isDark } from "../../../src/utils/dark";
import Item from "./item.vue";
import "./style.css";
import { useRouter } from "vue-router";

const router = useRouter();
const pages = ref(["笑川天皇的保安巡逻App"]);

const handleCamera = () => {
  router.push("/camera");
};
</script>
