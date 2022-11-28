<template>
  <div>
    <GuestBookComponent />
  </div>
</template>

<script>
import GuestBookComponent from "@/components/v2/guest-book/GuestBookComponent.vue";
import { isLoggedIn } from "@/functions/isAuthMiddleware";

export default {
  components: {
    GuestBookComponent,
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
