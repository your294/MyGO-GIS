import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    loginUser: {
      id: "-1",
      userRole: "NOT_LOGIN",
      userName: "xxx",
      userAvatar: "xxx",
      email: "xxx",
      telephone: "xxx",
    },
  }),
  actions: {
    async updateUser() {
      await axios
        .get("/api/m1/4253461-0-default/user/getLogin")
        .then((response: any) => {
          if (response.data.userRole !== "NOT_LOGIN") {
            this.loginUser = response.data;
          }
        })
        .catch((e: any) => {
          console.error(e);
        });
    },
    setUser(user: any) {
      this.loginUser = user;
    },
  },
});
