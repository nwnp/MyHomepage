<template>
  <div class="home-container">
    <div>my hompy</div>
    <form @submit.prevent="submitLogin">
      <div>
        <input type="text" id="email" v-model="email" placeholder="이메일" />
        <label for="email" />
      </div>
      <div>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="비밀번호"
        />
        <label for="password" />
      </div>
      <button style="submit">로그인</button>
    </form>
    <div>
      <div>이메일 찾기</div>
      <div>비밀번호 찾기</div>
      <router-link to="/signup">회원가입</router-link>
    </div>
  </div>
</template>

<script>
import { isLoggedIn } from "@/functions/isAuthMiddleware.js";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created() {
    this.loginCheck();
  },
  methods: {
    loginCheck() {
      if (isLoggedIn()) this.$router.push("/main");
    },
    async submitLogin() {
      await this.$store.dispatch("Login", {
        apollo: this.$apollo,
        user: {
          email: this.email,
          password: this.password,
        },
      });
      const loginCheck = await this.$store.getters.loginCheck;
      if (!loginCheck) {
        alert("이메일 혹은 비밀번호를 다시 확인해주세요.");
        this.clearForm();
        return;
      }
      alert("로그인에 성공했습니다.");
      this.$router.push({ path: "/main" });
    },
    clearForm() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
  padding: 10px;
  background-color: #fff;
}

a {
  text-decoration: none;
  color: black;
}
</style>
