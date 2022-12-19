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
import { getCookie } from "./functions/getCookie";

export default {
  data() {
    return {
      userId: getCookie("userId"),
    };
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style scoped>
.app {
  height: 100%;
  overflow: hidden;
}
.router {
  height: 100%;
}
</style>
