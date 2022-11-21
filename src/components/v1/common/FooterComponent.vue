<template>
  <footer class="footer">
    <div class="wrap">
      <p>Author: nwnp</p>
      <div>
        <a href="https://github.com/nwnp">Github</a>
      </div>
      <div>
        <a href="https://cpp12.tistory.com/">Tistory</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  background-color: white;
  width: 100%;
}

.wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  align-items: center;
}

.wrap a {
  text-decoration: none;
  cursor: pointer;
  color: black;
}

@media (max-width: 520px) {
  .wrap {
    justify-content: space-around;
  }
}
</style>
