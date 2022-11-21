<template>
  <div class="container">
    <div class="modal-wrap">
      <div class="button-wrap">
        <button @click="$emit('closeModal')" class="cancel-btn"></button>
      </div>
      <h1>POST DETAIL</h1>
      <div style="overflow: scroll">
        <div class="post-title-wrap">
          <div class="post-subtitle">TITLE</div>
          <div class="post-title">
            {{ postInfo.title }}
          </div>
        </div>
        <div class="post-content-wrap">
          <div class="post-content">
            {{ postInfo.content }}
          </div>
        </div>
        <form @submit.prevent="registerComment">
          <input
            type="text"
            id="register-comment"
            class="comment-input"
            placeholder="댓글 달기"
            v-model="inputValue"
          />
          <label for="register-comment"></label>
          <button type="submit" class="comment-btn">등록하기</button>
        </form>
        <div
          v-for="(comment, id) in getPostWithComment"
          :key="(comment, id)"
          class="comment-wrap"
        >
          <div class="comment-top">
            <div class="comment-top-wrap">
              <div class="comment-nickname">{{ comment.user.nickname }}</div>
              <div class="comment-email">({{ comment.user.email }})</div>
            </div>
            <div v-if="comment.user.id === me" class="edit-btn-wrap">
              <button @click="commentId = comment.id">수정하기</button>
              <button @click="deleteComment(comment.id)">삭제하기</button>
            </div>
          </div>
          <div v-if="commentId == comment.id" class="comment-bottom">
            <input
              type="text"
              v-model="updateValue"
              :placeholder="comment.post_comment"
            />
            <button @click="updateCancel">취소</button>
            <button @click="updateComment(comment.id)">등록</button>
          </div>
          <div v-else class="comment-bottom">
            {{ comment.post_comment }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Query } from "@/apollo/query/query";
import { getCookie } from "@/functions/getCookie";

export default {
  props: {
    postInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      getPostWithComment: "",
      inputValue: "",
      me: getCookie("userId"),
      updateValue: "",
      commentId: "",
    };
  },
  apollo: {
    getPostWithComment: {
      query: Query.getPostWithComment,
      variables() {
        return {
          info: {
            UserId: getCookie("userId"),
            PostId: this.postInfo.PostId,
          },
        };
      },
    },
  },
  methods: {
    async registerComment() {
      const payload = {
        apollo: this.$apollo,
        PostId: this.postInfo.PostId,
        comment: this.inputValue,
      };
      await this.$store.dispatch("registerPostComment", payload);
      const result = await this.$store.getters.postCommentRegisterCheck;
      if (!result)
        return alert("댓글 등록에 실패했습니다. 다시 시도해주세요 🙏");
      else {
        alert("댓글 등록에 성공했습니다 😀");
        this.inputValue = "";
        this.$router.go();
      }
    },
    async deleteComment(commentId) {
      const payload = {
        apollo: this.$apollo,
        PostId: this.postInfo.PostId,
        UserId: getCookie("userId"),
        commentId,
      };
      await this.$store.dispatch("deletePostComment", payload);
      const result = await this.$store.getters.postCommentDeleteCheck;
      if (!result)
        return alert("댓글 삭제를 실패했습니다. 다시 시도해주세요 🙏");
      else {
        alert("댓글 삭제가 완료되었습니다 😀");
        this.$router.go();
      }
    },
    async updateComment(commentId) {
      console.log("comment id", commentId);
      const payload = {
        apollo: this.$apollo,
        PostId: this.postInfo.PostId,
        UserId: getCookie("userId"),
        comment: this.updateValue,
        commentId,
      };
      await this.$store.dispatch("updatePostComment", payload);
      const result = await this.$store.getters.postCommentUpdateCheck;
      if (!result)
        return alert("댓글 수정을 실패했습니다. 다시 시도해주세요 🙏");
      else {
        alert("댓글 수정이 완료되었습니다 😀");
        this.$router.go();
      }
    },
    updateCancel() {
      this.commentId = "";
      this.updateValue = "";
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrap {
  background-color: white;
  height: 100%;
  width: 600px;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-wrap {
  display: flex;
  justify-content: end;
  background-color: #446485;
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  height: 23px;
  align-items: center;
}

.cancel-btn {
  margin-right: 4px;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: red;
  border: none;
  cursor: pointer;
  color: black;
}

.post-title-wrap {
  width: 490px;
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
}

.post-subtitle {
  padding: 10px;
  text-align: center;
  font-size: 23px;
}

.post-title {
  padding: 10px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
}

.post-content-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}

.post-content {
  width: 430px;
  height: 300px;
  padding: 30px;
  border: 1px solid #e5e5e5;
}

form {
  width: 490px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.comment-input {
  margin: 10px 0px;
  height: 28px;
  width: 380px;
  padding: 4px;
  border: none;
  font-size: 15px;
  border-bottom: 1px solid #e5e5e5;
}

.comment-btn {
  margin: 10px 0px;
  height: 30px;
  width: 100px;
  text-align: center;
  background-color: #3498db;
  border: none;
  border-radius: 8px;
  color: white;
  transition: all, 0.5s;
}

.comment-btn:hover {
  background-color: #60b6f0;
}

.comment-wrap {
  width: 490px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
}

.comment-top {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
  align-items: center;
  background-color: #e0f3ff;
  justify-content: space-between;
}

.comment-top-wrap {
  align-items: center;
  display: flex;
}

.comment-nickname {
  padding: 5px;
  margin-left: 4px;
  font-weight: bold;
  font-size: 1.2em;
}

.comment-email {
  padding: 5px;
  font-size: 1em;
}

.edit-btn-wrap {
  display: flex;
  gap: 10px;
  margin-right: 10px;
}

.edit-btn-wrap button {
  border: none;
  background-color: #e0f3ff;
  cursor: pointer;
  transition: all, 0.3s;
}

.edit-btn-wrap button:hover {
  font-size: 1em;
}

.comment-bottom {
  padding: 5px;
  margin-left: 20px;
}

.comment-bottom input {
  border: none;
  width: 330px;
  height: 25px;
}

.comment-bottom button {
  border: none;
  border-radius: 10px;
  width: 40px;
  height: 30px;
  margin-left: 20px;
  background-color: white;
  transition: all, 0.3s;
}

.comment-bottom button:hover {
  background-color: #e0f3ff;
}
</style>
