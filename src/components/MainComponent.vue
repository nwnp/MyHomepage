<template>
  <section class="container">
    <div class="wrap">
      <CarouselComponent />
    </div>
  </section>
</template>

<script>
import CarouselComponent from "@/components/common/CarouselComponent.vue";

export default {
  components: {
    CarouselComponent,
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  background-color: white;
  height: 95vh;
  width: 95vh;
  border-radius: 15px;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 880px) and (min-width: 700px) {
  .wrap {
    width: 700px;
  }
}

@media (max-width: 699px) and (min-width: 300px) {
  .wrap {
    width: 350px;
  }
}
</style>
