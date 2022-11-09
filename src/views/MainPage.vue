<template>
  <div class="container">
    <div>
      <InfoComponent />
    </div>
    <div class="dashboard">
      <BgmComponent />
      <DashboardComponent />
    </div>
    <div class="banner">
      <SearchComponent />
      <BannerComponent />
    </div>
  </div>
</template>

<script>
import InfoComponent from "@/components/InfoComponent.vue";
import DashboardComponent from "@/components/DashboardComponent.vue";
import BgmComponent from "@/components/BgmComponent.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  components: {
    InfoComponent,
    DashboardComponent,
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
