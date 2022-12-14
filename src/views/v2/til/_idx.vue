<template>
  <div>
    <TilComponent />
  </div>
</template>

<script>
import { isLoggedIn } from "@/functions/isAuthMiddleware";
import TilComponent from "@/components/v2/til/TilComponent.vue";

export default {
  components: {
    TilComponent,
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
