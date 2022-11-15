<template>
  <!-- 게시글 수정일 때 -->
  <div v-if="postInfo.modalType === 'UPDATE'" class="container">
    <div class="modal-wrap">
      <div class="header-bar">
        <button class="cancel-button" @click="close"></button>
      </div>
      <form @submit.prevent="updatePost">
        <div class="modal-title">{{ postInfo.modalType }} POST</div>
        <div class="modal-input-title">{{ postInfo.title }}</div>
        <div class="modal-input-content">{{ postInfo.content }}</div>
        <button>update</button>
      </form>
    </div>
  </div>
  <!-- 게시글 삭제일 때 -->
  <div v-else class="container">
    <div class="modal-wrap">
      <div class="header-bar">
        <button class="cancel-button" @click="close"></button>
      </div>
      <form @submit.prevent="deletePost">
        <div class="intro">게시글을 영구히 삭제하시겠습니까?</div>
        <div class="modal-title">{{ postInfo.modalType }} POST</div>
        <div class="modal-input-title">{{ postInfo.title }}</div>
        <div class="modal-input-content">{{ postInfo.content }}</div>
        <button>delete</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("closeModal");
    },
    updatePost() {
      console.log("update button clicked");
    },
    deletePost() {
      console.log("delete button clicked");
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
  width: 400px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
}

.header-bar {
  display: flex;
  justify-content: end;
  background-color: #446485;
  border-radius: 10px 10px 0px 0px;
}

.cancel-button {
  margin: 4px;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: red;
  border: none;
  cursor: pointer;
}
</style>
