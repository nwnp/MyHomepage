<template>
  <button class="btn-wrap" @click="clicked">새로 만들기</button>
</template>

<script>
export default {
  props: {
    registerInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clicked() {
      this.$router.push({
        name: "register",
        query: {
          type: this.registerInfo.type,
          userId: this.registerInfo.userId,
        },
      });
    },
  },
};
</script>

<style scoped>
.btn-wrap {
  width: 100%;
  height: 40px;
  border: none;
  color: #fff;
  background-color: #60b6f0;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 1em;
  font-weight: bold;
}
</style>
