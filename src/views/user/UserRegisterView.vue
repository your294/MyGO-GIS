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
      <van-field
        v-model="checkPassword"
        type="password"
        name="CheckPassword"
        label="CheckPassword"
        placeholder="CheckPassword"
        :rules="[{ required: true, message: 'repeat your password' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";

const store = useUserStore();

const username = ref("");
const password = ref("");
const checkPassword = ref("");

const registerUrl =
  "/api/m1/4253461-0-default/user/login?apifoxApiId=165961442";

const onSubmit = () => {
  axios
    .post(registerUrl, {
      username: username.value,
      password: password.value,
      checkPassword: checkPassword.value,
    })
    .then((response: any) => {
      console.log(response);
    })
    .catch((e: any) => {
      console.error(e);
    });
};
</script>
