<template>
  <div>
    <MainComponent />
  </div>
</template>

<script>
import MainComponent from "@/components/v2/main/MainComponent.vue";
import { isLoggedIn } from "@/functions/isAuthMiddleware";

export default {
  components: {
    MainComponent,
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
