<template>
  <div class="container">
    <div class="modal-wrap">
      <i
        class="fa-solid fa-x"
        style="color: #b9b9b9"
        @click="$emit('closeModal', 'post')"
      ></i>
      <div>
        <h3>게시글 자세히 보기</h3>
      </div>
      <div class="post-title">
        <div>TITLE</div>
        <div>{{ postInfo.title }}</div>
      </div>
      <div v-if="~~paramId === ~~userId" class="edit-btn-wrap">
        <div v-if="!updatePostButton" class="btn-wrap">
          <button
            class="update-btn"
            @click="postUpdateBtn(postInfo.content, postInfo.title)"
          >
            수정
          </button>
          <button class="delete-btn" @click="deletePost">삭제</button>
        </div>
        <div v-else class="btn-wrap">
          <button class="update-btn" @click="updatePost">등록</button>
          <button
            class="delete-btn"
            @click="updatePostButton = !updatePostButton"
          >
            취소
          </button>
        </div>
      </div>
      <div v-if="!updatePostButton" class="post-content">
        {{ postInfo.content }}
      </div>
      <div v-else class="update-post-wrap">
        <input
          type="text"
          v-model="updatePostTitle"
          class="update-post-title"
        />
        <textarea
          id="update-area"
          cols="30"
          rows="10"
          class="update-post-content"
          v-model="updatePostContent"
        >
        </textarea>
      </div>
      <div class="post-comment-wrap">
        <form @submit.prevent="registerComment" class="post-comment-register">
          <input
            class="post-comment-input"
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
                <div
                  v-if="comment.user.id == userId"
                  class="comment-edit-button"
                >
                  <div
                    @click="
                      commentId == ''
                        ? (commentId = comment.id)
                        : commentUpdateCancel()
                    "
                    class="comment-title-button"
                  >
                    수정
                  </div>
                  <div
                    class="comment-title-button"
                    @click="deleteComment(comment.id)"
                  >
                    삭제
                  </div>
                </div>
              </div>
              <div class="comment">{{ comment.post_comment }}</div>
              <div
                v-if="commentId == comment.id"
                style="display: flex; gap: 5px; align-items: center"
              >
                <input
                  type="text"
                  v-model="updateCommentValue"
                  :placeholder="comment.post_comment"
                />
                <button class="edit-button" @click="commentUpdateCancel">
                  취소
                </button>
                <button class="edit-button" @click="updateComment(comment.id)">
                  등록
                </button>
              </div>
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
      userId: getCookie("userId"),
      paramId: this.$route.params.id,
      updateCommentValue: "",
      updatePostContent: "",
      commentId: "",
      updatePostValue: "",
      updatePostButton: false,
      updatePostTemp: "",
      updateTitleTemp: "",
      updatePostTitle: "",
    };
  },
  apollo: {
    getPostWithComment: {
      query: Query.getPostWithComment,
      variables() {
        return {
          info: {
            UserId: ~~this.postInfo.UserId,
            PostId: ~~this.postInfo.PostId,
          },
        };
      },
    },
  },
  methods: {
    async registerComment() {
      if (!this.checkValue("register"))
        return alert("아무것도 입력하지 않았습니다. 다시 시도해주세요. 😿");
      const payload = {
        apollo: this.$apollo,
        PostId: this.postInfo.PostId,
        UserId: this.userId,
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
      if (!confirm("댓글을 영구히 삭제하시겠습니까?")) return;
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
      if (!this.checkValue("update"))
        return alert("아무것도 입력하지 않았습니다. 다시 시도해주세요. 😿");
      const payload = {
        apollo: this.$apollo,
        PostId: this.postInfo.PostId,
        UserId: getCookie("userId"),
        comment: this.updateCommentValue,
        commentId,
      };
      await this.$store.dispatch("updatePostComment", payload);
      const result = await this.$store.getters.postCommentUpdateCheck;
      if (!result)
        return alert("댓글 수정을 실패했습니다. 다시 시도해주세요 🙏");
      else {
        this.$apollo.queries.getPostWithComment.refetch();
        this.inputValue = "";
        this.commentId = "";
        alert("댓글 수정이 완료되었습니다 😀");
      }
    },
    commentUpdateCancel() {
      this.commentId = "";
      this.updateCommentValue = "";
    },
    checkValue(type) {
      if (type == "register") {
        if (this.inputValue.trim() == "") {
          this.inputValue = "";
          return false;
        }
        return true;
      } else {
        if (this.updateCommentValue.trim() == "") {
          this.updateCommentValue = "";
          return false;
        }
        return true;
      }
    },
    async updatePost() {
      if (
        this.updatePostContent == this.updateContentTemp &&
        this.updatePostTitle == this.updateTitleTemp
      ) {
        return alert("내용, 제목 둘 중 하나는 변경을 해야합니다 ❌");
      }
      await this.$store.dispatch("updatePost", {
        apollo: this.$apollo,
        title: this.updatePostTitle,
        content: this.updatePostContent,
        UserId: ~~this.userId,
        PostId: ~~this.postInfo.PostId,
      });
      const result = await this.$store.getters.updateCheck;
      if (!result) {
        return alert("수정에 실패했습니다. 다시 시도해주세요");
      }
      alert("수정에 성공했습니다.");
      this.$emit("closeModal");
    },
    async deletePost() {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        await this.$store.dispatch("deletePost", {
          apollo: this.$apollo,
          postId: ~~this.postInfo.PostId,
          UserId: ~~this.userId,
        });
        const result = await this.$store.getters.deleteCheck;
        if (!result) {
          return alert("댓글 삭제에 실패했습니다. 다시 시도해주세요 ❌");
        }

        alert("게시글을 삭제했습니다");
        this.$emit("closeModal");
      }
    },
    postUpdateBtn(content, title) {
      this.updatePostContent = content;
      this.updateContentTemp = content;
      this.updatePostTitle = title;
      this.updateTitleTemp = title;
      this.updatePostButton = !this.updatePostButton;
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

.edit-btn-wrap {
  width: 100%;
  margin-bottom: 10px;
}

.btn-wrap {
  display: flex;
  width: 100%;
  gap: 10px;
}

.update-btn {
  width: 50%;
  height: 30px;
  border: none;
  border-radius: 8px;
  background-color: #60b6f0;
  color: #fff;
}

.delete-btn {
  width: 50%;
  height: 30px;
  border: none;
  border-radius: 8px;
  background-color: #b9b9b9;
  color: #fff;
}

.post-content {
  border: 1px solid #e5e5e5;
  padding: 5px;
  height: 40%;
  margin-bottom: 10px;
}

.update-post-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.update-post-title {
  height: 17px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
}

.update-post-content {
  padding: 10px;
  resize: none;
  margin-bottom: 10px;
  border: 1px solid #e5e5e5;
}

.post-comment-register {
  display: flex;
  gap: 10px;
  align-items: center;
  height: 30px;
  justify-content: space-between;
  margin-bottom: 4px;
}

.post-comment-input {
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
  background-color: #f7f7f7;
}

.comment-title-email {
  margin: 5px;
  font-size: 0.8em;
  color: #b9b9b9;
}

.comment-edit-button {
  display: flex;
  gap: 10px;
  align-items: center;
}

.comment-title-button {
  margin-left: 10px;
  font-size: 0.8em;
  color: #b9b9b9;
  cursor: pointer;
  transition: all, 0.3s;
}

.comment {
  border: none;
  border-left: 1px solid #b9b9b9;
  padding-left: 7px;
  font-size: 0.9em;
  margin: 5px 0px 0px 5px;
  width: 100%;
}

.edit-button {
  border: none;
  border-radius: 4px;
  color: #a1a1a1;
  font-size: 0.8em;
  background-color: #fff;
  cursor: pointer;
  transition: all, 0.3s;
}

i {
  display: flex;
  justify-content: end;
  cursor: pointer;
}
</style>
