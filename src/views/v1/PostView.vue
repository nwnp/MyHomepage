<template>
  <div class="container">
    <div>
      <InfoComponent />
    </div>
    <div class="dashboard">
      <BgmComponent />
      <PostDashboard />
    </div>
    <div class="banner">
      <SearchComponent />
      <BannerComponent />
    </div>
  </div>
</template>

<script>
import InfoComponent from "@/components/v1/InfoComponent.vue";
import PostDashboard from "@/components/v1/post/PostDashboard.vue";
import BgmComponent from "@/components/v1/BgmComponent.vue";
import BannerComponent from "@/components/v1/BannerComponent.vue";
import SearchComponent from "@/components/v1/SearchComponent.vue";

export default {
  components: {
    InfoComponent,
    PostDashboard,
    BgmComponent,
    BannerComponent,
    SearchComponent,
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.dashboard {
  display: flex;
  flex-direction: column;
  width: 1300px;
  padding: 10px 0px;
}

.banner {
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  width: 10%;
}
</style>
