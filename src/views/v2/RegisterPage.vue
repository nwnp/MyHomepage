<template>
  <div class="container">
    <div class="main-wrap">
      <div class="card-container">
        <div class="card-header">
          <h3>{{ type.toUpperCase() }} 작성</h3>
        </div>
        <form @submit.prevent="submitBtn">
          <div class="title-wrap">
            <input
              type="text"
              id="title"
              v-model="title"
              placeholder="제목 입력"
            />
          </div>
          <div class="content-wrap">
            <textarea
              id="content"
              cols="30"
              rows="15"
              placeholder="내용 입력"
              v-model="content"
              class="content-area"
            ></textarea>
          </div>
          <button type="submit" class="register-btn">등록</button>
        </form>
        <button @click="routing" class="cancel-btn">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: this.$route.query.type,
      me: this.$route.query.userId,
      title: "",
      content: "",
    };
  },
  methods: {
    async submitBtn() {
      if (!this.checkForm()) return alert("유효하지 않은 입력값입니다.");
      else if (!this.validationTitle())
        return alert("제목은 3글자 이상이어야 합니다.");
      else if (!this.validationContent())
        return alert("내용은 10글자 보다 많아야 합니다.");

      const payload = {
        apollo: this.$apollo,
        title: this.title,
        content: this.content,
        UserId: this.me,
      };

      if (this.type === "til") {
        await this.$store.dispatch("registerTil", payload);
        const result = await this.$store.getters.tilRegisterCheck;
        if (!result) {
          this.clearForm();
          return alert("TIL 등록에 실패했습니다. 다시 시도해주세요 ❌");
        }
        this.clearForm();
        alert("TIL 등록에 성공했습니다 🌠");
        this.$router.push({ name: "til", params: { id: this.me } });
      } else if (this.type == "post") {
        await this.$store.dispatch("registerPost", payload);
        const result = await this.$store.getters.registerCheck;
        if (!result) {
          this.clearForm();
          return alert("게시글 등록에 실패했습니다. 다시 시도해주세요 ❌");
        }
        this.clearForm();
        alert("게시글 등록에 성공했습니다 🌠");
        this.$router.push({ name: "post", params: { id: this.me } });
      }
    },
    clearForm() {
      this.title = "";
      this.content = "";
    },
    checkForm() {
      const trimTitle = this.title.trim();
      const trimContent = this.content.trim();
      if (trimTitle == "" || trimContent == "") return false;
      else return true;
    },
    validationTitle() {
      const trimTitle = this.title.trim();
      if (trimTitle.length < 3) return false;
      else return true;
    },
    validationContent() {
      const trimContent = this.content.trim();
      if (trimContent.length < 10) return false;
      else return true;
    },
    routing() {
      this.$router.push({ name: this.type, params: { id: this.me } });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.main-wrap {
  padding: 10px;
  height: 90%;
}

.card-header {
  text-align: center;
}

.card-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  height: 90%;
}

.title-wrap {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  font-size: 1em;
}

.content-wrap {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.content-area {
  font-size: 1em;
  resize: none;
  border: 1px solid #e5e5e5;
  padding: 5px;
}

.register-btn {
  width: 100%;
  height: 35px;
  border: none;
  color: #fff;
  background-color: #60b6f0;
  border-radius: 8px;
  margin-bottom: 10px;
}

.cancel-btn {
  border: none;
  height: 35px;
  width: 100%;
  border-radius: 8px;
  background-color: #b9b9b9;
  color: #fff;
}
</style>
