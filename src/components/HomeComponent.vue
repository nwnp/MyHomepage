<template>
  <div>
    <div class="container">
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
          <b>SIGNUP</b>
        </div>
        <div class="forgot-password">
          <b> FORGOT PASSWORD? </b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitLogin() {
      console.log(this.email, this.password);
    },
  },
};
</script>

<style scoped>
.container {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  width: 100%;
  border-radius: 15px;
  height: 35px;
  background-color: #3498db;
  color: white;
  margin-top: 1em;
  border: none;
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
</style>
