<template>
  <div class="home-container">
    <div class="home-title">MY HOMPY</div>
    <form @submit.prevent="submitLogin" class="form">
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
      <button style="submit" class="login-btn">로그인</button>
    </form>
    <div class="home-bottom">
      <router-link to="/">이메일 찾기</router-link>
      <router-link to="/">비밀번호 찾기</router-link>
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

.home-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 3em;
  height: 30%;
  font-weight: bold;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
}

.form input {
  box-sizing: border-box;
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 3px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  font-size: 1em;
}

.login-btn {
  height: 40px;
  font-size: 1em;
  border-radius: 8px;
  border: none;
  color: #fff;
  background-color: #60b6f0;
  margin-top: 20px;
  transition: all, 0.5s;
}

.home-bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  font-size: 0.8em;
}

.home-bottom a:nth-child(2) {
  text-align: center;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

a {
  text-align: center;
  text-decoration: none;
  color: #4c4c4c;
}
</style>
