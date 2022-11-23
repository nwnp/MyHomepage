<template>
  <article class="home">
    <HomeComponent />
  </article>
</template>

<script>
import HomeComponent from "@/components/v2/HomeComponent.vue";

export default {
  name: "HomeView",
  components: {
    HomeComponent,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
