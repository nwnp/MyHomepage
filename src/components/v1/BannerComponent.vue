<template>
  <div class="banner-wrap">
    <div>
      <router-link to="/post">게시글</router-link>
    </div>
    <div>방명록</div>
    <div>캘린더</div>
    <div>TIL</div>
    <div>친구목록</div>
    <div>
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
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #2c3e50;
  height: 500px;
  margin: 0px 5px 0px 0px;
  border: none;
}

a {
  text-decoration: none;
  color: black;
}

.banner-wrap div {
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  color: black;
}

.banner-wrap div:hover {
  font-size: 22px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.4);
  background-color: white;
  color: black;
  border-radius: 0px 8px 8px 0px;
}
</style>
