<template>
  <div class="container">
    <div class="modal-wrap">
      <div class="button-wrap">
        <button @click="$emit('closeModal')" class="cancel-btn"></button>
      </div>
      <h1>POST DETAIL</h1>
      <div class="post-title-wrap">
        <div class="post-subtitle">TITLE</div>
        <div class="post-title">
          {{ getPostWithComment[0].post.title }}
        </div>
      </div>
      <div class="post-content-wrap">
        <div class="post-content">
          {{ getPostWithComment[0].post.content }}
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
            <button @click="updateComment">수정하기</button>
            <button @click="deleteComment">삭제하기</button>
          </div>
        </div>
        <div class="comment-bottom">{{ comment.post_comment }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Query } from "@/apollo/query/query";
import { getCookie } from "@/functions/getCookie";

export default {
  props: ["postId"],
  data() {
    return {
      getPostWithComment: "",
      inputValue: "",
      me: getCookie("userId"),
    };
  },
  apollo: {
    getPostWithComment: {
      query: Query.getPostWithComment,
      variables() {
        return {
          info: {
            UserId: getCookie("userId"),
            PostId: this.postId,
          },
        };
      },
    },
  },
  methods: {
    registerComment() {
      console.log(this.inputValue);
      this.inputValue = "";
    },
    updateComment() {
      console.log("update btn clicked!!");
    },
    deleteComment() {
      console.log("delete btn clicked!!");
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
</style>
