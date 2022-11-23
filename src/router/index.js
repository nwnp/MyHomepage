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
  {
    path: "/main",
    component: () => import("@/views/v2/MainPage.vue"),
  },
  {
    path: "/post",
    component: () => import("@/views/v2/PostPage.vue"),
  },
  {
    path: "/til",
    component: () => import("@/views/v2/TILPage.vue"),
  },
  {
    path: "/guest-book",
    component: () => import("@/views/v2/GuestBookPage.vue"),
  },

  // v1
  {
    path: "/v1/main",
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
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
