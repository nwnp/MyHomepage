import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/main",
    component: () => import("@/views/MainPage.vue"),
  },
  {
    path: "/signup",
    component: () => import("@/views/SignupView.vue"),
  },
  {
    path: "/post",
    component: () => import("@/views/PostView.vue"),
  },
  {
    path: "*",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
