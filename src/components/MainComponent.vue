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
  height: 500px;
  width: 300px;
  border-radius: 15px;
}
@media (max-width: 500px) {
  .wrap {
    width: 300px;
  }
}
</style>
