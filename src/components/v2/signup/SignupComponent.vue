<template>
  <div class="signup-container">
    <div class="wrap">
      <h2>회원가입</h2>
      <form @submit.prevent="signup" class="form">
        <div>
          <label for="email">이메일</label>
          <input
            type="text"
            id="email"
            placeholder="required"
            v-model="email"
            required
          />
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="required"
            v-model="password"
            required
          />
        </div>
        <div>
          <label for="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            placeholder="required"
            v-model="nickname"
            required
          />
        </div>
        <div>
          <label for="name">이름</label>
          <input
            type="text"
            id="name"
            placeholder="required"
            v-model="name"
            required
          />
        </div>
        <div>
          <label for="job">직업</label>
          <input type="text" id="job" v-model="job" />
        </div>
        <div>
          <label for="github">Github URL</label>
          <input type="text" id="github" v-model="githubUrl" />
        </div>
        <div>
          <label for="blog">Blog URL</label>
          <input type="text" id="blog" v-model="blogUrl" />
        </div>
        <div class="gender-radio">
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              v-model="gender"
            />
            <label for="male">남성</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              v-model="gender"
            />
            <label for="female">여성</label>
          </div>
        </div>
        <button type="submit" class="register-btn">회원가입</button>
      </form>
      <button @click="signupCancel" class="cancel-btn">돌아가기</button>
    </div>
  </div>
</template>

<script>
import { Mutation } from "@/apollo/mutation/mutations";
export default {
  data() {
    return {
      email: "",
      password: "",
      nickname: "",
      name: "",
      gender: "",
      job: "",
      githubUrl: "",
      blogUrl: "",
    };
  },
  methods: {
    async signup() {
      const payload = {
        email: this.email,
        nickname: this.nickname,
        name: this.name,
        password: this.password,
        job: this.job,
        gender: this.gender,
        githubUrl: this.githubUrl,
        blogUrl: this.blogUrl,
      };
      await this.$apollo
        .mutate({
          mutation: Mutation.signup,
          variables: {
            user: { ...payload },
          },
        })
        .then((res) => {
          this.clearForm();
          alert("가입에 성공했습니다 ✅");
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          alert("가입에 실패했습니다. 다시 시도해주세요.");
          this.clearForm();
        });
    },
    signupCancel() {
      if (confirm("회원가입을 취소하시겠습니까?")) {
        this.clearForm();
        this.$router.push("/");
      }
    },
    clearForm() {
      this.email = "";
      this.password = "";
      this.nickname = "";
      this.gender = "";
      this.job = "";
      this.githubUrl = "";
      this.blogUrl = "";
    },
  },
};
</script>

<style scoped>
.signup-container {
  height: 100%;
  padding: 10px;
}

.wrap {
  height: 100%;
  border-radius: 3px;
  background-color: #fff;
  padding: 20px;
}

h2 {
  margin: 19px 0 19px 0;
  text-align: center;
  font-weight: 100;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form label {
  font-size: 0.9em;
}

.form input {
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  padding: 5px;
  width: 100%;
}

.gender-radio {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
}

.gender-radio input {
  width: auto;
}

.register-btn {
  border: none;
  height: 40px;
  border-radius: 8px;
  color: #fff;
  background-color: #60b6f0;
}

.cancel-btn {
  margin-top: 10px;
  border: none;
  height: 40px;
  border-radius: 8px;
  color: #fff;
  width: 100%;
  background-color: #b9b9b9;
}

@media (min-width: 750px) {
  .wrap {
    width: 450px;
    height: auto;
    border-radius: 10px;
  }
  .signup-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    align-items: center;
  }
  .gender-radio input {
    width: auto;
  }
}

@media (max-width: 380px) {
  .form {
    gap: 7px;
  }
  .gender-radio input {
    width: auto;
  }
}
</style>
