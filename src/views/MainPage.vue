<template>
  <div class="container">
    <InfoComponent />
  </div>
</template>

<script>
import InfoComponent from "@/components/InfoComponent.vue";

export default {
  components: {
    InfoComponent,
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  margin: 10px;
}
</style>
