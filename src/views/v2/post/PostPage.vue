<template>
  <div>
    <PostComponent />
  </div>
</template>

<script>
import PostComponent from "@/components/v2/post/PostComponent.vue";
import { isLoggedIn } from "@/functions/isAuthMiddleware";

export default {
  components: {
    PostComponent,
  },
  created() {
    this.loginCheck();
  },
  methods: {
    loginCheck() {
      if (!isLoggedIn()) {
        alert("로그인이 되어 있지 않습니다.");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped></style>
