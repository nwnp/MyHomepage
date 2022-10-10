<template>
  <div id="app">
    <nav>
      <HeaderComponent />
    </nav>
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },
};
</script>
