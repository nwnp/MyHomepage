<template>
  <div class="container">
    <div>
      <InfoComponent />
    </div>
    <div class="dashboard">
      <BgmComponent />
      <DashboardComponent />
    </div>
    <div>
      <BannerComponent />
    </div>
  </div>
</template>

<script>
import InfoComponent from "@/components/InfoComponent.vue";
import DashboardComponent from "@/components/DashboardComponent.vue";
import BgmComponent from "@/components/BgmComponent.vue";
import BannerComponent from "@/components/BannerComponent.vue";

export default {
  components: {
    InfoComponent,
    DashboardComponent,
    BgmComponent,
    BannerComponent,
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
  align-items: center;
  width: 100%;
  margin-left: 10px;
}
</style>
