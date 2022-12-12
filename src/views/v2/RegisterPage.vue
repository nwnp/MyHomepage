<template>
  <div class="container">
    <div class="main-wrap">
      <div class="card-container">
        <div class="card-header">{{ type.toUpperCase() }} 새로 만들기</div>
        <form @submit.prevent="submitBtn">
          <div>
            <label for="title">제목</label>
            <input
              type="text"
              id="title"
              v-model="title"
              placeholder="제목 입력"
            />
          </div>
          <div>
            <label for="content">내용</label>
            <input
              type="text"
              id="content"
              placeholder="내용 입력"
              v-model="content"
            />
          </div>
          <button type="submit">등록</button>
        </form>
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
        til_content: this.content,
        UserId: this.me,
      };

      if (this.type === "til") {
        await this.$store.dispatch("registerTil", payload);
        const result = await this.$store.getters.tilRegisterCheck;
        if (!result) {
          this.clearForm();
          return alert("TIL 등록에 실패했습니다. 다시 시도해주세요 ❌");
        } else {
          this.clearForm();
          alert("TIL 등록에 성공했습니다 🌠");
          this.$router.push({ name: "til", params: { id: this.me } });
        }
      }
      this.clearForm();
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

.card-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  height: 90%;
}
</style>
