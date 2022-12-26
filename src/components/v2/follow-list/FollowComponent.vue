<template>
  <div class="follow-container">
    <div class="follow-info-wrap">
      <div
        :class="type === 'follower' ? 'follow' : 'basic'"
        @click="changeType"
      >
        팔로잉
      </div>
      <div
        :class="type === 'following' ? 'follow' : 'basic'"
        @click="changeType"
      >
        팔로워
      </div>
    </div>
    <ListComponent
      :info="{
        type: type,
        paramsId: paramsId,
      }"
    />
  </div>
</template>

<script>
import ListComponent from "@/components/v2/follow-list/ListComponent.vue";

export default {
  components: {
    ListComponent,
  },
  data() {
    return {
      paramsId: this.$route.params.id,
      type: this.$route.query.type,
    };
  },
  methods: {
    changeType() {
      this.type = this.type === "follower" ? "following" : "follower";
    },
  },
};
</script>

<style scoped>
.follow-info-wrap {
  display: flex;
  width: 100%;
}

.basic {
  background-color: #fff;
  width: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border: none;
  color: #878787;
}

.follow {
  background-color: #fff;
  width: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-bottom: 1px solid #444;
}
</style>
