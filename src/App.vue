<template>
  <div id="app" class="app">
    <HeaderComponent />
    <router-view />
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
  mounted() {
    this.alertWhenStart();
  },
  methods: {
    alertWhenStart() {
      alert(`모바일에 최적화된 사이트입니다\n모바일 환경에서 접속바랍니다 😀`);
    },
  },
};
</script>

<style scoped>
.app {
  background-color: #f2f0f0;
}
</style>
