<template>
  <div>
    <h1>TIL PAGE</h1>
  </div>
</template>

<script>
import { isLoggedIn } from "@/functions/isAuthMiddleware";

export default {
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
