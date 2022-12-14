<template>
  <footer class="footer-container">
    <router-link :to="`/post/${userId}`" class="footer-post">
      <i class="fa-solid fa-file"></i>
      <p>게시글</p>
    </router-link>
    <router-link
      :to="{ name: 'main', params: { id: userId } }"
      class="footer-home"
    >
      <!-- <router-link to="/main" class="footer-home"> -->
      <i class="fa-solid fa-house-user"></i>
      <p>홈</p>
    </router-link>
    <router-link
      :to="{ name: 'til', params: { id: userId } }"
      class="footer-til"
    >
      <i class="fa-solid fa-list"></i>
      <p>TIL</p>
    </router-link>
    <router-link to="/guest-book" class="footer-guest-book">
      <i class="fa-solid fa-comments"></i>
      <p>방명록</p>
    </router-link>
  </footer>
</template>

<script>
import { getCookie } from "@/functions/getCookie";

export default {
  data() {
    return {
      userId: getCookie("userId"),
    };
  },
};
</script>

<style scoped>
.footer-container {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 65px;
  background-color: #262626;
  color: white;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.footer-container div {
  cursor: pointer;
}

a {
  color: white;
  text-decoration: none;
}

.footer-post {
  text-align: center;
}

.footer-guest-book {
  text-align: center;
}

p {
  font-size: 13px;
  margin: 0px;
  text-align: center;
}
</style>
