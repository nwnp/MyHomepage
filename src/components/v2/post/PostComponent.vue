<template>
  <div class="post-container">
    <div v-if="userId !== paramId" class="wrap">
      <RouteComponent />
    </div>
  </div>
</template>

<script>
import RouteComponent from "@/components/v2/common/RouteComponent.vue";
import { getCookie } from "@/functions/getCookie";

export default {
  components: {
    RouteComponent,
  },
  data() {
    return {
      userId: getCookie("userId"),
      paramId: this.$route.params.id,
    };
  },
};
</script>

<style scoped>
.post-container {
  display: flex;
  flex-direction: column;
  background-color: #f2f0f0;
  width: 100%;
  height: 100vh;
}
</style>
