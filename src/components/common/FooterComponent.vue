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
}

.wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 500px;
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
