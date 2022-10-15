<template>
  <article class="main">
    <MainComponent />
  </article>
</template>

<script>
import MainComponent from "@/components/MainComponent.vue";

export default {
  components: {
    MainComponent,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
