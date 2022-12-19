<template>
  <div class="container">
    <div class="modal-wrap">
      <div class="modal-title">방명록 수정</div>
      <div>
        <textarea
          cols="30"
          rows="10"
          class="update-gb-content"
          v-modal="updateValue"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateValue: this.$store.getters.comment,
    };
  },
  computed: {
    getComment() {
      return this.$store.getters.comment;
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
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  gap: 15px;
}

.modal-title {
  text-align: center;
  font-weight: bold;
  font-size: 22px;
}

.update-gb-content {
  width: 100%;
  padding: 10px;
  resize: none;
  margin-bottom: 10px;
  border: 1px solid #e5e5e5;
}
</style>
