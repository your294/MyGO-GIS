import UserSettings from "@/views/UserSettings.vue";
import Home from "../views/HomeView.vue";
import MapView from "../views/MapView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import CameraView from "@/views/CameraView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/map", component: MapView },
  { path: "/settings", component: UserSettings },
  { path: "/camera", component: CameraView },
  {
    path: "/user",
    children: [
      {
        path: "/login",
        name: "登录",
        component: UserLoginView,
      },
      {
        path: "/register",
        name: "注册",
        component: UserRegisterView,
      },
    ],
  },
];

export default routes;
