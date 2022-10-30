<template>
  <section class="signup-container">
    <h2 class="signup-title">SIGNUP</h2>
    <form @submit.prevent="submitForm" class="form-wrap">
      <div class="widget">
        <label for="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          id="email"
          v-model="email"
          placeholder="Required fields"
          required
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
          placeholder="Required fields"
          required
        />
      </div>
      <div class="widget">
        <label for="nickname">
          <b>Nickname</b>
        </label>
        <input
          type="nickname"
          id="nickname"
          v-model="nickname"
          placeholder="Required fields"
          required
        />
      </div>
      <div class="widget">
        <label for="blogUrl">
          <b>Blog URL</b>
        </label>
        <input type="text" id="blogUrl" v-model="blogUrl" />
      </div>
      <div class="widget">
        <label for="job">
          <b>Job</b>
        </label>
        <input type="text" id="job" v-model="job" />
      </div>
      <div class="widget">
        <label for="gender">
          <b>Gender</b>
        </label>
        <input type="text" id="gender" v-model="gender" />
      </div>
      <div class="widget">
        <label for="githubUrl">
          <b>Github URL</b>
        </label>
        <input type="githubUrl" id="githubUrl" v-model="githubUrl" />
      </div>
      <div class="button-wrap">
        <router-link to="/">
          <button>cancel</button>
        </router-link>
        <button type="submit">submit</button>
      </div>
    </form>
  </section>
</template>

<script>
import { Mutation } from "@/apollo/mutation/mutations";
export default {
  data() {
    return {
      email: "",
      nickname: "",
      password: "",
      job: "",
      gender: "",
      githubUrl: "",
      blogUrl: "",
    };
  },
  methods: {
    async submitForm() {
      const payload = {
        email: this.email,
        nickname: this.nickname,
        password: this.password,
        job: this.job,
        gender: this.gender,
        githubUrl: this.githubUrl,
        blogUrl: this.blogUrl,
      };

      const result = await this.$apollo.mutate({
        mutation: Mutation.signup,
        variables: {
          user: { ...payload },
        },
      });

      // console.log(result.data.signup);
      this.clearForm();
    },
    clearForm() {
      this.email = "";
      this.nickname = "";
      this.password = "";
      this.job = "";
      this.gender = "";
      this.githubUrl = "";
      this.blogUrl = "";
    },
  },
};
</script>

<style>
.signup-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  width: 300px;
  height: 550px;
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.5);
  padding: 2em;
}

.form-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
  width: 300px;
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
  padding: 0 0.5em 0;
}

.button-wrap {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.button-wrap button {
  width: 100px;
  border-radius: 15px;
  height: 35px;
  background-color: #3498db;
  color: white;
  margin-top: 1em;
  border: none;
  cursor: pointer;
  transition: all, 0.5s;
}

.button-wrap button:hover {
  width: 120px;
  height: 38px;
  background-color: #60b6f0;
}
</style>
