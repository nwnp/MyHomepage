<template>
  <div class="banner-wrap">
    <div class="banner-router">
      <router-link to="/post">게시글</router-link>
    </div>
    <div class="banner-router">방명록</div>
    <div class="banner-router">캘린더</div>
    <div class="banner-router">TIL</div>
    <div class="banner-router">친구목록</div>
    <div class="banner-router">
      <router-link to="/main"> 메인으로 </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.banner-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  height: 58.5%;
  margin: 0px 5px 0px 0px;
  border-radius: 0px 8px 8px 0px;
}

.banner-router {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.7s;
}

.banner-router:hover {
  font-size: 23px;
}

a {
  text-decoration: none;
  color: black;
}
</style>
