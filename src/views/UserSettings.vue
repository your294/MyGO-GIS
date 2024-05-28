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
    <div class="person-card" v-else>
      <div class="card">
        <div class="circle">
          <div class="imgBx">
            <img :src="store.loginUser.userAvatar" alt="" />
          </div>
        </div>
        <div class="content">
          <a href="#"><span class="icon-[ri--linkedin-box-fill]"></span> </a>
          <h3>
            {{
              store.loginUser.userName === "admin"
                ? "孙笑川"
                : store.loginUser.userName
            }}
          </h3>
          <div class="textIcon">
            <h4>日本天皇兼职保安</h4>
            <a
              href="https://space.bilibili.com/13833854?spm_id_from=333.1007.0.0"
              target="_blank"
              ><span class="icon-[ri--arrow-right-line]"></span>
            </a>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <van-button
          class="mt-2"
          style="width: 340px"
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
@import url("./styles/card.css");

.person-card {
  background: radial-gradient(#777, #222);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}
</style>
