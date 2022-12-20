<template>
  <div class="feedback-container">
    <div class="feedback-wrap">
      <div class="feedback-header">반갑습니다 {{ me.nickname }}님 😀</div>
      <div class="feedback-header">
        관리자 겸 신입 개발자한테
        <div class="header-emphasis">&nbsp;소중한 피드백</div>
        을 전해주세요
      </div>
      <div class="card-wrap">
        <form @submit.prevent="registerBtn">
          <div class="feedback-title">
            <label for="title">제목</label>
            <input
              type="text"
              id="title"
              v-model="title"
              placeholder="제목 입력"
              class="title-input"
            />
          </div>
          <div class="feedback-content">
            <div>내용</div>
            <textarea
              id="content"
              cols="30"
              rows="15"
              v-model="content"
              placeholder="내용을 입력해주세요"
            ></textarea>
          </div>
          <div class="button-wrap">
            <button @click="backToMain" class="cancel-btn">취소</button>
            <button type="submit" class="register-btn">피드백 보내기</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Query } from "@/apollo/query/query";
export default {
  data() {
    return {
      user: this.$route.params.id,
      me: "",
      title: "",
      content: "",
    };
  },
  apollo: {
    me: {
      query: Query.me,
      variables() {
        return {
          id: ~~this.user,
        };
      },
    },
  },
  methods: {
    async registerBtn() {
      await this.$store.dispatch("registerFeedback", {
        apollo: this.$apollo,
        title: this.title,
        content: this.content,
        UserId: this.user,
      });
      const result = await this.$store.getters.feedbackRegisterCheck;
      if (!result) {
        return alert("피드백 등록에 실패했습니다. 다시 시도해주세요");
      }
      alert(
        "피드백을 등록했습니다. \n소중한 피드백 진심으로 감사드립니다 👍👍"
      );
      await this.$store.dispatch("webhook", {
        text: `${this.user}님이 피드백을 남겨주셨습니다.`,
      });
      this.backToMain();
    },
    backToMain() {
      this.$router.push({ name: "main", params: { id: this.user } });
    },
  },
};
</script>

<style scoped>
.feedback-container {
  display: flex;
  flex-direction: column;
  background-color: #f2f0f0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
}

.feedback-wrap {
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  gap: 10px;
}

.card-wrap {
  background-color: #fff;
  width: 100%;
  padding: 10px;
}

.feedback-header {
  display: flex;
  font-weight: bold;
}

.header-emphasis {
  color: rgb(0, 134, 255);
}

.feedback-title {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 22px;
  font-weight: bold;
  gap: 10px;
}

.title-input {
  height: 25px;
  font-size: 16px;
  padding: 7px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 10px;
}

.feedback-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: none;
  font-size: 22px;
  font-weight: bold;
}

textarea {
  resize: none;
  border: 1px solid #e5e5e5;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
}

.button-wrap {
  display: flex;
  gap: 10px;
}

.register-btn {
  width: 50%;
  height: 40px;
  border: none;
  background-color: #60b6f0;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
}

.cancel-btn {
  width: 50%;
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: #b9b9b9;
  color: #fff;
  font-weight: bold;
}
</style>
