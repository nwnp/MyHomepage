<template>
  <section class="container">
    <div class="home-container">
      <div>
        <h2 class="title">LOGIN</h2>
      </div>
      <div class="form">
        <form @submit.prevent="submitLogin" class="form">
          <div class="widget">
            <label for="email">
              <b> Email </b>
            </label>
            <input
              type="text"
              id="email"
              v-model="email"
              placeholder="깃허브 로그인을 네이버 로그인으로 수정"
            />
          </div>
          <div class="widget">
            <label for="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="페이스북 로그인을 카카오 로그인으로 수정"
            />
          </div>
          <button>로그인하기</button>
        </form>
      </div>
      <div>
        <button>비회원으로 로그인하기</button>
      </div>
      <div class="socials">
        <div class="facebook">
          <i class="fa-brands fa-facebook"></i>
        </div>
        <div class="google">
          <i class="fa-brands fa-google"></i>
        </div>
        <div class="github">
          <i class="fa-brands fa-github"></i>
        </div>
      </div>
      <div class="links">
        <div class="signup">
          <router-link to="/signup">SIGNUP</router-link>
        </div>
        <div class="forgot-password">
          <b> FORGOT PASSWORD? </b>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Mutation } from "@/apollo/mutation/mutations";
import { isLoggedIn } from "../functions/isAuthMiddleware.js";

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
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  width: 300px;
  height: 500px;
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.5);
  justify-content: space-between;
  padding: 2em;
}

.title {
  font-size: 2em;
  text-align: center;
}

.widget {
  display: flex;
  flex-direction: column;
  row-gap: 0.5em;
  margin-bottom: 1em;
}

input {
  border: none;
  outline: none;
  border-bottom: 1px solid #e5e5e5;
  padding: 0.5em 0;
}

button {
  cursor: pointer;
  width: 100%;
  border-radius: 15px;
  height: 35px;
  background-color: #3498db;
  color: white;
  margin-top: 1em;
  border: none;
  transition: all, 0.5s;
}

button:hover {
  background-color: #60b6f0;
}

i {
  font-size: 2.5em;
}

.facebook {
  color: #2980b9;
}

.google {
  color: #e74c3c;
}

.github {
  color: #34495e;
}

.socials {
  display: flex;
  justify-content: center;
  column-gap: 1em;
}

.links signup {
  color: #34495e;
  font-size: 85%;
}

.links {
  display: flex;
  justify-content: space-between;
}

a {
  text-decoration: none;
  color: black;
}
</style>
