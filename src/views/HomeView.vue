<template>
  <div class="home">
    <HomeComponent />
  </div>
</template>

<script>
import HomeComponent from "@/components/HomeComponent.vue";

export default {
  name: "HomeView",
  components: {
    HomeComponent,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
}
</style>
