<template>
  <div class="carousel-wrap">
    <carousel
      :per-page="1"
      :navigate-to="someLocalProperty"
      :mouse-drag="false"
      :autoplay="true"
      :autoplayTimeout="2500"
      :loop="true"
    >
      <slide class="carousel-slide">
        <!-- <img src="../../../public/파이리.png" alt="파이리" class="image" /> -->
      </slide>
      <slide> Slide 2 Content </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style scoped>
.carousel-wrap {
  align-items: center;
}

.carousel-slide {
  display: flex;
  justify-content: center;
}

.image {
  width: 500px;
  border-radius: 8px;
}
</style>
