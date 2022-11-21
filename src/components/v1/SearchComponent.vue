<template>
  <div class="search-wrap">
    <button>친구 찾기</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.search-wrap {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

button {
  margin: 0px 5px 9px 5px;
  cursor: pointer;
  border-radius: 15px;
  height: 25px;
  width: 100%;
  background-color: #3498db;
  color: white;
  border: none;
  transition: all, 0.5s;
}

button:hover {
  background-color: #60b6f0;
}
</style>
