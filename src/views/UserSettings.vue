<template>
  <div>
    <div v-if="login === false">
      <van-empty image="error" description="请先登录" />
      <van-button class="w-full" type="success" @click="turnToLogin"
        >登录</van-button
      >
      <van-button class="w-full mt-2" type="warning" @click="turnToRegister"
        >注册</van-button
      >
    </div>
    <div v-else>
      <div class="person-intro">
        <span
          class="icon-[ri--account-box-line]"
          style="color: inherit; font-size: 3rem"
        ></span>
      </div>

      <van-cell-group>
        <van-cell
          class="mt-1 text-sm"
          :key="idx"
          v-for="(attr, idx) in Object.keys(store.loginUser)"
          :title="attr"
          :value="store.loginUser[attr]"
        />
      </van-cell-group>
      <div class="w-full flex justify-center">
        <van-button
          class="mt-2"
          style="width: 95%"
          type="danger"
          @click="handleLogout"
          >logout</van-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useUserStore();

const login = ref(false);

onMounted(() => {
  // store.updateUser();
  if (store.loginUser.userRole === "NOT_LOGIN") {
    login.value = false;
  } else {
    login.value = true;
  }
});

const handleLogout = () => {
  login.value = false;
};

const turnToLogin = () => {
  router.push({ name: "登录" });
};

const turnToRegister = () => {
  router.push({ name: "注册" });
};
</script>

<style scoped>
.person-intro {
  height: auto;
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
