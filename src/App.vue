<template>
  <div id="app" class="app">
    <HeaderComponent />
    <router-view class="router" />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/v2/common/HeaderComponent.vue";
import FooterComponent from "@/components/v2/common/FooterComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style scoped>
.app {
  height: 100%;
}
.router {
  height: 100%;
}
</style>
