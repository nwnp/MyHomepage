<template>
  <section class="container">
    <div class="wrap">
      <h1>main page</h1>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  height: 100vh;
  width: 800px;
}
@media (max-width: 500px) {
  .wrap {
    width: 300px;
  }
}
</style>
