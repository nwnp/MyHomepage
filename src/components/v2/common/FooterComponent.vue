<template>
  <footer class="footer-container">
    <div class="footer-post">
      <p>게시글</p>
    </div>
    <div class="footer-home">
      <i class="fa-solid fa-house-user"></i>
      <p>홈</p>
    </div>
    <div class="footer-til">
      <p>TIL</p>
    </div>
    <div class="footer-guest-book">
      <p>방명록</p>
    </div>
  </footer>
</template>

<script>
export default {};
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

p {
  font-size: 13px;
  margin: 0px;
  text-align: center;
}
</style>
