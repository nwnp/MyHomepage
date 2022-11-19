<template>
  <div class="container">
    <div class="modal-wrap">
      <div>
        <button @click="$emit('closeModal')">cancel</button>
      </div>
      <h1>POST DETAIL</h1>
      <div>{{ getPostWithComment[0].post.title }}</div>
      <div>{{ getPostWithComment[0].post.content }}</div>
      <div
        v-for="comment in getPostWithComment"
        :key="comment"
        class="comment-list"
      >
        <div>{{ comment.user.nickname }}({{ comment.user.email }}):</div>
        <div>{{ comment.post_comment }}</div>
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
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comment-list {
  display: flex;
  gap: 10px;
}
</style>
