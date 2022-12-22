<template>
  <div class="register-container">
    <div class="register-wrap">
      <div class="register-header">
        동료가 될 지도 모를 {{ me.nickname }}님에게
        <div class="header-emphasis">&nbsp;특별한 피드백</div>
        을 남겨주세요 😀
      </div>
      <div class="card-wrap">
        <div class="register-comment">
          <div class="comment-title">내용</div>
          <textarea
            id="comment"
            cols="30"
            rows="15"
            v-model="comment"
            placeholder="내용을 입력해주세요"
          ></textarea>
        </div>
        <div class="register-secret">
          <Secret />
          <label for="secret">
            <div>비밀글로 설정하기</div>
          </label>
          <input
            type="checkbox"
            id="secret"
            name="secret-check"
            value="secret"
            v-model="secret"
          />
        </div>
        <div class="btn-wrap">
          <button class="cancel-btn" @click="cancel">취소</button>
          <button class="register-btn" @click="submit">등록하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from "@/functions/getCookie";
import Secret from "@/components/svgs/SecretSVG.vue";
import { Query } from "@/apollo/query/query";

export default {
  components: {
    Secret,
  },
  data() {
    return {
      paramsId: this.$route.params.paramsId,
      userId: this.$route.query.userId,
      secret: false,
      comment: "",
      me: "",
    };
  },
  created() {
    this.typeCheck();
  },
  apollo: {
    me: {
      query: Query.me,
      variables() {
        return {
          id: ~~this.paramsId,
        };
      },
    },
  },
  methods: {
    async submit() {
      await this.$store.dispatch("registerComment", {
        apollo: this.$apollo,
        UserId: ~~this.paramsId,
        secret: this.secret ? 1 : 0,
        comment: this.comment,
      });
      const result = await this.$store.getters.commentRegisterCheck;
      if (!result) {
        alert("등록에 실패했습니다. 다시 시도해주세요");
        this.clearForm();
      } else {
        alert("등록에 성공했습니다 🚀");
        this.back();
      }
    },
    async cancel() {
      if (confirm("작성을 취소하십니까?")) this.back();
    },
    clearForm() {
      this.secret = false;
      this.comment = "";
    },
    async back() {
      await this.$router.push({
        name: "guest-book-user",
        params: { id: this.paramsId },
      });
    },

    // bug로 인한 임시조치
    typeCheck() {
      if (this.paramsId === "register" || this.paramsId === "detail") {
        alert(`잘못된 경로입니다. \n메인으로 돌아갑니다.`);
        this.$router.push({
          name: "main",
          params: {
            id: getCookie("userId"),
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  background-color: #f2f0f0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
}

.register-header {
  display: flex;
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
}

.header-emphasis {
  color: rgb(0, 134, 255);
}

.register-wrap {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 200px;
  align-items: center;
  gap: 10px;
}

.card-wrap {
  padding: 10px;
  background-color: #fff;
  width: 100%;
}

.register-comment {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
}

.comment-title {
  font-size: 22px;
  font-weight: bold;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  padding: 5px;
}

textarea {
  resize: none;
  border: 1px solid #e5e5e5;
  padding: 10px;
  font-size: 1em;
}

.register-secret {
  display: flex;
  justify-content: end;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  align-items: center;
  gap: 5px;
}

.btn-wrap {
  display: flex;
  gap: 10px;
  margin: 10px 0px;
}

.register-btn {
  width: 100%;
  background-color: #60b6f0;
  border: none;
  border-radius: 8px;
  height: 35px;
  color: #fff;
}

.cancel-btn {
  border: none;
  width: 100%;
  background-color: #b9b9b9;
  height: 35px;
  border-radius: 8px;
  color: #fff;
}

@media (max-width: 350px) {
  .register-header {
    font-size: 0.7em;
  }
  .comment-title {
    font-size: 1.2em;
  }
}
</style>
