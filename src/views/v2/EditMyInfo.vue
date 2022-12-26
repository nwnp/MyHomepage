<template>
  <div class="container">
    <div class="edit-container">
      <div class="edit-head">회원정보</div>
      <div class="form-wrap">
        <div class="form-card">
          <label for="nickname">닉네임</label>
          <input type="text" id="nickname" v-model="me.nickname" />
        </div>
        <div class="form-card">
          <label for="github"> 깃허브 URL </label>
          <input type="text" id="github" v-model="me.githubUrl" />
        </div>
        <div class="form-card">
          <label for="blog">블로그 URL</label>
          <input type="text" id="blog" v-model="me.blogUrl" />
        </div>
        <div class="btn-wrap">
          <button type="submit" @click="submit">수정</button>
          <button style="background-color: #b9b9b9" @click="cancel">
            돌아가기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      me: {
        paramsId: this.$route.params.id,
        nickname: "",
        githubUrl: "",
        blogUrl: "",
      },
    };
  },
  created() {
    const me = this.$store.getters.me;
    if (me === "") {
      return this.$router.push({
        name: "main",
        params: {
          id: this.me.paramsId,
        },
      });
    }
    this.me = {
      paramsId: this.$route.params.id,
      nickname: me.nickname,
      githubUrl: me.githubUrl,
      blogUrl: me.blogUrl,
    };
  },
  methods: {
    async submit() {
      await this.$store.dispatch("updateUser", {
        apollo: this.$apollo,
        nickname: this.me.nickname,
        githubUrl: this.me.githubUrl,
        blogUrl: this.me.blogUrl,
      });
      const result = await this.$store.getters.updateUserCheck;
      if (!result) return alert("수정에 실패했습니다. 다시 시도해주세요");
      alert("정보 수정에 성공했습니다.");
      this.$router.push({
        name: "main",
        params: {
          id: this.me.paramsId,
        },
      });
    },
    cancel() {
      if (confirm("수정을 취소하시겠습니까?")) this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: scroll;
}
.edit-container {
  width: 100%;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 50px;
}

@media (min-width: 600px) {
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .edit-container {
    width: 50%;
    height: 100vh;
    margin-bottom: 0;
  }
}

.edit-head {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-wrap {
  padding: 10px 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
}

.form-card {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  gap: 10px;
}

.form-card input {
  box-sizing: border-box;
  height: 35px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  font-size: 0.9em;
}

.btn-wrap {
  display: flex;
  width: 100%;
  height: 35px;
  gap: 10px;
}

button {
  width: 50%;
  height: 100%;
  border: none;
  border-radius: 8px;
  background-color: #60b6f0;
  color: #fff;
}
</style>
