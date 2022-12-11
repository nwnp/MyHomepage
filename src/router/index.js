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
    path: "/main/:id",
    component: () => import("@/views/v2/MainPage.vue"),
  },
  {
    path: "/post",
    name: "post",
    component: () => import("@/views/v2/PostPage.vue"),
  },
  {
    path: "/til",
    name: "til",
    component: () => import("@/views/v2/TILPage.vue"),
  },
  {
    path: "/signup",
    component: () => import("@/views/v2/SignupPage.vue"),
  },
  {
    path: "/feedback",
    name: "feedback",
    component: () => import("@/views/v2/FeedbackPage.vue"),
  },
  {
    path: "/guest-book",
    name: "guest-book",
    component: () => import("@/views/v2/GuestBookPage.vue"),
  },
  {
    path: "/my-info/:id",
    name: "my-info",
    component: () => import("@/views/v2/MyInfo.vue"),
  },
  {
    path: "/calendar/:id",
    name: "calendar",
    component: () => import("@/views/v2/CalendarPage.vue"),
  },

  // v1
  {
    path: "/v1/main",
    component: () => import("@/views/v1/MainPage.vue"),
  },
  {
    path: "/v1/signup",
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
