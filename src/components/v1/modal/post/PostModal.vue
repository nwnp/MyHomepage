<template>
  <!-- 게시글 수정일 때 -->
  <div v-if="postInfo.modalType === 'UPDATE'" class="container">
    <div class="modal-wrap">
      <div class="header-bar">
        <button class="cancel-button" @click="close"></button>
      </div>
      <form @submit.prevent="updatePost" class="form">
        <div class="modal-title">{{ postInfo.modalType }} POST</div>
        <div class="modal-mid">
          <label for="title">TITLE</label>
          <input type="text" id="title" class="update-title" v-model="title" />
        </div>
        <div class="modal-mid-bottom">
          <label>CONTENT</label>
          <textarea
            id="content"
            cols="30"
            rows="10"
            v-model="content"
            class="update-content"
          ></textarea>
        </div>
        <button class="update-btn">UPDATE</button>
      </form>
    </div>
  </div>
  <!-- 게시글 삭제일 때 -->
  <div v-else class="container">
    <div class="modal-wrap">
      <div class="header-bar">
        <button class="cancel-button" @click="close"></button>
      </div>
      <form @submit.prevent="deletePost" class="form">
        <div class="modal-title">{{ postInfo.modalType }} POST</div>
        <div class="intro">게시글을 영구히 삭제하시겠습니까?</div>
        <button class="delete-btn">DELETE</button>
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
  data() {
    return {
      title: this.postInfo.title,
      content: this.postInfo.content,
      PostId: this.postInfo.PostId,
    };
  },
  methods: {
    close() {
      this.$emit("closeModal");
    },
    async updatePost() {
      if (
        this.title === this.postInfo.title &&
        this.content === this.postInfo.content
      ) {
        return alert("변경사항이 없습니다.");
      }

      if (!confirm("게시글을 수정하시겠습니까?")) return;

      await this.$store.dispatch("updatePost", {
        PostId: this.PostId,
        title: this.title,
        content: this.content,
        apollo: this.$apollo,
      });
      const bool = await this.$store.getters.updateCheck;
      if (!bool) {
        return alert("등록에 실패했습니다. 다시 시도해주세요");
      }
      alert("게시글을 성공적으로 수정했습니다.");
      this.$emit("updateSuccess");
    },
    async deletePost() {
      if (!confirm("삭제하시겠습니까?")) return;
      await this.$store.dispatch("deletePost", {
        PostId: this.PostId,
        apollo: this.$apollo,
      });
      const bool = await this.$store.getters.deleteCheck;
      if (!bool) return alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
      alert("게시글을 성공적으로 삭제했습니다.");
      this.$emit("deleteSuccess");
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
  height: 500px;
  background-color: white;
  border-radius: 10px;
}

.header-bar {
  display: flex;
  justify-content: end;
  height: 23px;
  background-color: #446485;
  border-radius: 10px 10px 0px 0px;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 437px;
  gap: 10px;
}

.update-btn {
  cursor: pointer;
  width: 100%;
  border-radius: 15px;
  height: 35px;
  background-color: #3498db;
  color: white;
  margin-top: 1em;
  border: none;
  transition: all, 0.5s;
}

.update-btn:hover {
  background-color: #60b6f0;
}

.modal-title {
  font-size: 30px;
  text-align: center;
  font-weight: bold;
}

.modal-mid {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.modal-mid-bottom {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.update-title {
  width: 100%;
  border: none;
  padding: 5px;
  border-bottom: 1px solid #e5e5e5;
}

.update-content {
  resize: none;
  border: 1px solid #e5e5e5;
  padding: 5px;
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

.intro {
  text-align: center;
  font-size: 20px;
}

.delete-title {
  width: 100%;
  text-align: center;
}

.delete-btn {
  cursor: pointer;
  width: 100%;
  border-radius: 15px;
  height: 35px;
  background-color: #3498db;
  color: white;
  margin-top: 1em;
  border: none;
  transition: all, 0.5s;
}

.delete-btn:hover {
  background-color: #60b6f0;
}
</style>
