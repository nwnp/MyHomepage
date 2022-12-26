<template>
  <div>
    <div v-for="(list, idx) in followList" :key="idx">
      <div v-if="list.followers !== null" class="card">
        <div class="card-info" @click="route(list.followers.id)">
          <div class="email-wrap">{{ list.followers.email }}</div>
          <div class="nickname-wrap">{{ list.followers.nickname }}</div>
        </div>
        <button @click="remove(list.followers.id)">삭제</button>
      </div>
      <div v-else class="card">
        <div @click="route(list.followings.id)">
          <div class="email-wrap">{{ list.followings.email }}</div>
          <div class="nickname-wrap">{{ list.followings.nickname }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Query } from "@/apollo/query/query";
import { getCookie } from "@/functions/getCookie";

export default {
  props: {
    info: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      followList: "",
      userId: getCookie("userId"),
    };
  },
  apollo: {
    followList: {
      query: Query.followList,
      variables() {
        return {
          info: {
            type: this.info.type === "follower" ? "followingMe" : "imFollowing",
            userId: ~~this.info.paramsId,
          },
        };
      },
    },
  },
  methods: {
    route(followerId) {
      this.$router.push({ name: "main-user", params: { id: followerId } });
    },
    async remove(followerId) {
      await this.$store.dispatch("registerFollowing", {
        apollo: this.$apollo,
        followerId: followerId,
      });
      const result = await this.$store.getters.followCheck;
      if (!result) return alert("다시 시도해주세요");
      await this.$apollo.queries.followList.refetch();
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px 15px;
  justify-content: space-between;
}

.card-info {
  display: flex;
  flex-direction: column;
}

button {
  background-color: #fff;
  color: #969696;
  border: 1px solid #969696;
  border-radius: 3px;
  width: 45px;
  height: 25px;
}

.nickname-wrap {
  color: #797979;
}
</style>
