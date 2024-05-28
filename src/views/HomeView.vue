<template>
  <div id="GuardPage">
    <van-swipe :autoplay="3000" lazy-render :height="200">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>

    <div
      class="overflow-auto wrap-container"
      :key="idx"
      v-for="(worker, idx) in guardWorkerArr"
    >
      <van-card
        class="mb-2 first: mt-1 dark:bg-slate-600 rounded-md shadow-lg card"
        :thumb="
          worker.userAvatar ??
          `https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg`
        "
      >
        <template #title>
          <h3 class="mt-2 text-xl text-sky-500 dark:text-sky-400">
            {{ worker.userName }}
          </h3>
        </template>

        <template #desc>
          <h4 class="mt-1 mb-1 text-sm text-slate-700 dark:text-slate-500">
            {{ worker.intro }}
          </h4>
        </template>
        <template #tags>
          <van-tag
            class="mr-2"
            :key="i"
            v-for="(tag, i) in worker.tags"
            plain
            type="primary"
            size="normal"
            >{{ tag }}</van-tag
          >
        </template>
        <template #footer>
          <van-button plain size="normal" @click="onClick">联系我</van-button>
        </template>
      </van-card>
      <van-dialog v-model:show="showDialog" title="联系方式" show-cancel-button>
        <div class="mx-auto p-2 text-sm text-slate-700">
          <p>{{ "电话: " + worker.telephone }}</p>
          <p>{{ "邮箱: " + worker.email }}</p>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import axios from "axios";

const images = ref([
  "http://127.0.0.1:3000/广告.jpg",
  "https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80",
  "https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
]);

interface GuardInfo {
  userName?: string;
  intro?: string;
  tags?: string[];
  telephone?: string;
  email?: string;
  userAvatar?: string;
}

const guardWorkerArr: Ref<Array<GuardInfo>> = ref([]);

onMounted(() => {
  axios
    .get("/server/koa/user/getAllUsers")
    .then((response: any) => {
      guardWorkerArr.value = response.data;
    })
    .catch((e: any) => {
      console.error(e);
    });
});

const showDialog = ref(false);

const onClick = () => (showDialog.value = !showDialog.value);
</script>

<style scoped>
#GuardPage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.wrap-container {
  padding: 10px;
}

.wrap-container .card:hover {
  transition: transform 0.3s ease;
  transform: scale(0.95);
}

p {
  @apply text-xl m-2 p-1;
}
</style>
