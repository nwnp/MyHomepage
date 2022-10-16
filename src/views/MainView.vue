<template>
  <div>
    <article class="main">
      <MainComponent />
    </article>
    <FooterComponent />
  </div>
</template>

<script>
import MainComponent from "@/components/MainComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";

export default {
  components: {
    MainComponent,
    FooterComponent,
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
