<template>
  <div class="container">
    <div class="header-container">
      <div class="header-box">Jin's Homepage</div>
      <div class="header-box">자기소개서</div>
      <div class="header-box">포트폴리오</div>
      <div class="button-wrap">
        <button class="dropdown">
          <i class="fa-solid fa-layer-group icon"></i>
          <div class="button-title">프로젝트 보기</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  color: white;
}

button {
  background-color: #3498db;
  border-radius: 8px;
  border: none;
}

.dropdown {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 120px;
  padding: 6px;
}

.icon {
  color: white;
}

.button-title {
  color: white;
}
</style>
