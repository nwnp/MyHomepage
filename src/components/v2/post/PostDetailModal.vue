<template>
  <div class="container">
    <div class="modal-wrap">
      <div>
        <h3>게시글 자세히 보기</h3>
      </div>
      <div class="post-title">
        <div>TITLE</div>
        <div>{{ postInfo.title }}</div>
      </div>
      <div class="post-content">{{ postInfo.content }}</div>
      <div class="post-comment-wrap">
        <form @submit.prevent="registerComment" class="post-comment-register">
          <input
            type="text"
            v-model="inputValue"
            :placeholder="
              getPostWithComment.length
                ? '댓글 달기'
                : '댓글이 없습니다.. 채워주시렵니까 😭'
            "
          />
          <button type="submit">댓글 등록</button>
        </form>
        <ul>
          <li v-if="getPostWithComment.length < 1">텅.... 😿</li>
          <li
            v-else
            v-for="(comment, id) in getPostWithComment"
            :key="(comment, id)"
          >
            <div class="comment-wrap">
              <div class="comment-title">
                <div class="comment-title-nickname">
                  {{ comment.user.nickname }}
                </div>
                <div class="comment-title-email">
                  ({{ comment.user.email }})
                </div>
              </div>
              <div class="comment">{{ comment.post_comment }}</div>
            </div>
          </li>
        </ul>
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
      if (this.inputValue.trim() == "") {
        alert("아무것도 입력하지 않았습니다. 다시 시도해주세요 😿");
        this.inputValue = "";
        return;
      }
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
        this.inputValue = "";
        this.$apollo.queries.getPostWithComment.refetch();
        alert("댓글 등록에 성공했습니다 😀");
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
      this.$apollo.queries.getPostWithComment.refetch();
      alert("댓글 삭제가 완료되었습니다 😀");
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
        this.$apollo.queries.getPostWithComment.refetch();
        alert("댓글 수정이 완료되었습니다 😀");
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-wrap {
  background-color: #fff;
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  overflow: scroll;
}

h3 {
  text-align: center;
}

.post-title {
  display: flex;
  gap: 10px;
  font-size: 1.25em;
  margin-bottom: 10px;
  font-weight: bold;
}

.post-content {
  border: 1px solid #e5e5e5;
  padding: 5px;
  height: 40%;
  margin-bottom: 10px;
}

.post-comment-register {
  display: flex;
  gap: 10px;
  align-items: center;
  height: 30px;
  justify-content: space-between;
  margin-bottom: 4px;
}

input {
  height: 17px;
  padding: 5px;
  width: 70%;
  border: none;
  border-bottom: 1px solid #e5e5e5;
}

.post-comment-register button {
  width: 20%;
  height: 100%;
  border: none;
  background-color: #3498db;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.post-comment-register button:hover {
  background-color: #60b6f0;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5) inset;
}

ul {
  border: none;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin: 0px;
  padding: 2px;
}

li {
  list-style: none;
  margin: 5px 0px 5px 0px;
}

.comment-title {
  align-items: center;
  display: flex;
  gap: 3px;
}

.comment-title-email {
  margin: 5px;
  font-size: 0.8em;
  color: #b9b9b9;
}

.comment {
  border: none;
  border-left: 1px solid #b9b9b9;
  padding-left: 7px;
  font-size: 0.9em;
  margin: 5px 0px 0px 5px;
  width: 100%;
}
</style>
