<template>
  <div class="wrap">
    <div v-if="userId == commentUserId" class="edit-button-wrap">
      <div class="delete-btn" @click="deleteComment">삭제하기</div>
      <!-- <div class="update-btn" @click="updateModal = !updateModal">수정하기</div> -->
    </div>
    <div class="card-wrap">
      <div @click="backToGBPage" class="back-btn">뒤로가기</div>
      <div class="card-title">{{ me.nickname }}님의 방명록</div>
      <div class="card-guest-book">
        <div class="guest-book-title">내용</div>
        <div class="guest-book-comment">
          {{ getComment }}
        </div>
        <div class="button-wrap">
          <button :class="like ? 'button-clicked' : 'button-basic'">
            <i v-if="like" class="fa-regular fa-thumbs-up"></i>
            <i v-else class="fa-solid fa-thumbs-up"></i>
            <div>좋아요</div>
          </button>
          <button :class="bookmark ? 'button-clicked' : 'button-basic'">
            <i v-if="bookmark" class="fa-regular fa-bookmark"></i>
            <i v-else class="fa-solid fa-bookmark"></i>
            <div>북마크</div>
          </button>
        </div>
        <div class="gb-comment-wrap">
          <div style="display: flex; justify-content: space-between">
            <input type="text" placeholder="댓글 달기" />
            <button class="comment-button">등록하기</button>
          </div>
          <div class="gb-comment-content">
            <div class="content-user">
              <div class="user-nickname">nwnp</div>
              <div class="user-email">ujm0418@gmail.com</div>
            </div>
            <div class="content-comment">댓글</div>
          </div>
        </div>
      </div>
    </div>
    <UpdateModal v-if="updateModal" class="detail-modal" />
  </div>
</template>

<script>
import { getCookie } from "@/functions/getCookie";
import { Query } from "@/apollo/query/query";
import UpdateModal from "@/components/v2/guest-book/UpdateModal.vue";

export default {
  components: {
    UpdateModal,
  },
  data() {
    return {
      userId: getCookie("userId"),
      paramsId: this.$route.params.paramsId,
      commentId: this.$route.query.commentId,
      commentUserId: this.$route.query.commentUserId,
      me: "",
      bookmark: false,
      like: false,
      updateModal: false,
    };
  },
  created() {
    this.gettersCommentCheck();
  },

  // store에서 방명록 내용 가져오기
  computed: {
    getComment() {
      return this.$store.getters.comment;
    },
  },
  apollo: {
    me: {
      query: Query.me,
      variables() {
        return {
          id: ~~this.commentUserId,
        };
      },
    },
  },
  methods: {
    // getters가 비어있으면 방명록 페이지로 이동
    gettersCommentCheck() {
      if (this.$store.getters.comment === "") this.backToGBPage();
    },
    async deleteComment() {
      if (confirm("방명록을 영구히 삭제하시겠습니까?")) {
        await this.$store.dispatch("deleteComment", {
          apollo: this.$apollo,
          commentId: this.commentId,
          commentedUserId: this.commentUserId,
        });
        const result = await this.$store.getters.commentDeleteCheck;
        if (!result) {
          return alert("삭제에 실패했습니다. 다시 시도해주세요");
        }
        this.backToGBPage();
      }
    },
    backToGBPage() {
      if (this.userId === this.paramsId) {
        return this.$router.push({
          name: "guest-book",
          params: { id: this.paramsId },
        });
      }
      this.$router.push({
        name: "guest-book-user",
        params: { id: this.paramsId },
      });
    },
  },
};
</script>

<style scoped>
.wrap {
  padding: 10px;
  margin-bottom: 65px;
}

.edit-button-wrap {
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  height: 30px;
}

.delete-btn {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  border-radius: 8px;
  background-color: #b9b9b9;
  height: 100%;
  color: #fff;
  justify-content: center;
}

.update-btn {
  display: flex;
  align-items: center;
  width: 50%;
  text-align: center;
  border-radius: 8px;
  background-color: #60b6f0;
  height: 100%;
  color: #fff;
  justify-content: center;
}

.card-wrap {
  background-color: #fff;
  padding: 10px;
}

.back-btn {
  display: flex;
  justify-content: end;
}

.card-title {
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  margin: 10px 0 20px 0;
}

.card-guest-book {
  display: flex;
  flex-direction: column;
  border: none;
  border-top: 1px solid #e5e5e5;
  padding: 10px 10px 0 10px;
  gap: 10px;
}

.guest-book-title {
  margin: 10px 0;
  font-size: 21px;
  font-weight: bold;
}

.guest-book-comment {
  border: 1px solid #e5e5e5;
  padding: 10px;
}

.button-wrap {
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: 40px;
  gap: 10px;
}

.button-basic {
  display: flex;
  align-items: center;
  border: 1px solid #60b6f0;
  color: #60b6f0;
  width: 50%;
  border-radius: 8px;
  justify-content: center;
  gap: 7px;
  background-color: #fff;
}

.button-clicked {
  display: flex;
  align-items: center;
  border: 1px solid #60b6f0;
  color: #fff;
  width: 50%;
  border-radius: 8px;
  justify-content: center;
  gap: 7px;
  background-color: #60b6f0;
}

input {
  width: 70%;
  box-sizing: border-box;
  height: 35px;
  padding: 5px;
  border: none;
  font-size: 1em;
  border-bottom: 1px solid #e5e5e5;
}

.comment-button {
  background-color: #60b6f0;
  color: #fff;
  border: none;
  padding: 5px;
  width: 25%;
  height: 35px;
  border-radius: 8px;
}

.gb-comment-wrap {
  border: none;
  border-top: 1px solid #e5e5e5;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
  gap: 10px;
}

.detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
