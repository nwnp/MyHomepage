<template>
  <div class="detail-container">
    <DetailGuestBook />
  </div>
</template>

<script>
import DetailGuestBook from "@/components/v2/guest-book/DetailComponent.vue";

export default {
  components: {
    DetailGuestBook,
  },
};
</script>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  background-color: #f2f0f0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
}
</style>
