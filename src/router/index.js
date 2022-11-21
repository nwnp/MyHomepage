import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/v2/HomeView.vue"),
  },
  // v2

  // v1
  {
    path: "/main",
    component: () => import("@/views/v1/MainPage.vue"),
  },
  {
    path: "/signup",
    component: () => import("@/views/v1/SignupView.vue"),
  },
  {
    path: "/post",
    component: () => import("@/views/v1/PostView.vue"),
  },
  {
    path: "*",
    component: () => import("../views/v1/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
