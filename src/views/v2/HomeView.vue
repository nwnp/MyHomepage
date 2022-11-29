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
  padding: 10px;
  display: flex;
  justify-content: center;
}
</style>
