<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="Username"
        label="Username"
        placeholder="Username"
        :rules="[{ required: true, message: 'Username is required' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="Password"
        label="Password"
        placeholder="Password"
        :rules="[{ required: true, message: 'Password is required' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

const username = ref("");
const password = ref("");

const loginUrl = "/api/m1/4253461-0-default/user/login?apifoxApiId=165961442";

const onSubmit = () => {
  axios
    .post(loginUrl, {
      username: username.value,
      password: password.value,
    })
    .then((response: any) => {
      let data = response.data;
      data["userRole"] = "user";
      store.setUser(data);
      router.push("/");
    })
    .catch((e: any) => {
      console.error(e);
    });
};
</script>
