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
    name: "main",
    component: () => import("@/views/v2/main/MainPage.vue"),
  },
  {
    path: "/main/_idx/:id",
    name: "main-user",
    component: () => import("@/views/v2/main/_idx.vue"),
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("@/views/v2/post/PostPage.vue"),
  },
  {
    path: "/post/_idx/:id",
    name: "post-user",
    component: () => import("@/views/v2/post/_idx.vue"),
  },
  {
    path: "/til/:id",
    name: "til",
    component: () => import("@/views/v2/til/TILPage.vue"),
  },
  {
    path: "/til/_idx/:id",
    name: "til-user",
    component: () => import("@/views/v2/til/_idx.vue"),
  },
  {
    path: "/signup",
    component: () => import("@/views/v2/SignupPage.vue"),
  },
  {
    path: "/feedback/:id",
    name: "feedback",
    component: () => import("@/views/v2/FeedbackPage.vue"),
  },
  {
    path: "/guest-book/:id",
    name: "guest-book",
    component: () => import("@/views/v2/guest-book/GuestBookPage.vue"),
  },
  {
    path: "/guest-book/_idx/:id",
    name: "guest-book-user",
    component: () => import("@/views/v2/guest-book/_idx.vue"),
  },
  {
    path: "/guest-book/detail/:paramsId",
    name: "detail-comment",
    component: () => import("@/views/v2/guest-book/DetailGuestBook.vue"),
  },
  {
    path: "/guest-book/register/:paramsId",
    name: "guest-book-register",
    component: () => import("@/views/v2/guest-book/RegisterGuestBook.vue"),
  },
  {
    path: "/my-info/:id",
    name: "my-info",
    component: () => import("@/views/v2/MyInfo.vue"),
  },
  {
    path: "/my-info/edit/:id",
    name: "my-info-edit",
    component: () => import("@/views/v2/EditMyInfo.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/v2/RegisterPage.vue"),
  },
  {
    path: "/calendar/:id",
    name: "calendar",
    component: () => import("@/views/v2/calendar/CalendarPage.vue"),
  },
  {
    path: "/calendar/_idx/:id",
    name: "calendar-user",
    component: () => import("@/views/v2/calendar/_idx.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/v2/SearchPage.vue"),
  },
  {
    path: "/follow-list/:id",
    name: "follow-list",
    component: () => import("@/views/v2/follower/FollowList.vue"),
  },
  {
    path: "/follow-list/_idx/:id",
    name: "follow-list-idx",
    component: () => import("@/views/v2/follower/_idx.vue"),
  },
  {
    path: "*",
    component: () => import("@/views/NotFound.vue"),
  },

  // v1
  // {
  //   path: "/v1/main",
  //   component: () => import("@/views/v1/MainPage.vue"),
  // },
  // {
  //   path: "/v1/signup",
  //   component: () => import("@/views/v1/SignupView.vue"),
  // },
  // {
  //   path: "/post",
  //   component: () => import("@/views/v1/PostView.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
