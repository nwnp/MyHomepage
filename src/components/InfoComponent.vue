<template>
  <div class="info-wrap">
    <div class="info-profile">
      <div class="view-total-count">32340</div>
      <div class="view-today-count">781</div>
      <div class="info-profile-image">image</div>
    </div>
    <div class="info-description">
      <div class="name">nickname</div>
      <div class="name">{{ email }}</div>
      <div class="name">blog</div>
    </div>
    <div class="info-today-graph"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      const user = JSON.parse(localStorage.getItem("user"));
      this.email = user.email;
      this.password = user.password;
    },
  },
};
</script>

<style scoped>
.info-wrap {
}
</style>
