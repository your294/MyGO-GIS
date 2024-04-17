<template>
  <div id="GuardPage">
    <div
      class="overflow-auto"
      :key="idx"
      v-for="(worker, idx) in guardWorkerArr"
    >
      <van-card
        class="mb-2 first: mt-1 dark:bg-slate-600 rounded-md"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
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
    .get("/api/m1/4253461-0-default/user/all")
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
p {
  @apply text-xl m-2 p-1;
}
</style>
