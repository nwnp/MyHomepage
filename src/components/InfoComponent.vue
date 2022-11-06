<template>
  <div class="info-wrap">
    <div class="view-count">
      <div class="view-total-count">
        <p>total 3000</p>
      </div>
      <div class="view-today-count">
        <p>today 32</p>
      </div>
    </div>
    <div class="image-wrap">
      <img class="info-profile-image" src="./파이리.png" />
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
import { isAuthMiddleware } from "../functions/isAuthMiddleware.js";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created() {
    this.isLoggedIn();
  },
  methods: {
    isLoggedIn() {
      if (!isAuthMiddleware()) {
        alert("로그인이 되어 있지 않습니다.");
        this.$router.push("/");
        return;
      }
    },
  },
};
</script>

<style scoped>
.info-wrap {
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100%;
  border-radius: 8px;
  background-color: #ffffff;
}

.view-count {
  display: flex;
}

.image-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100px;
}

.info-profile-image {
  border-radius: 50%;
  width: 100px;
}
</style>
