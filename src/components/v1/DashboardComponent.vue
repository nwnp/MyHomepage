<template>
  <div class="dashboard-wrap">
    <div class="dashboard-nickname">
      <div>🚀 {{ me.nickname }}님의 미니홈피입니다 🚀</div>
    </div>
    <div class="dashboard-content">
      <div class="content-post">게시글</div>
      <div class="content-calendar">캘린더</div>
    </div>
    <div class="dashboard-comment">comment</div>
  </div>
</template>

<script>
import { Query } from "@/apollo/query/query.js";
import { getCookie } from "@/functions/getCookie.js";

export default {
  data() {
    return {
      me: "",
    };
  },
  apollo: {
    me: {
      query: Query.meForDashboard,
      variables() {
        return { id: parseInt(getCookie("userId")) };
      },
    },
  },
};
</script>

<style scoped>
.dashboard-wrap {
  display: flex;
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  flex-direction: column;
}

.dashboard-nickname {
  height: 3%;
  display: flex;
  justify-content: center;
}

.dashboard-content {
  display: flex;
  width: 100%;
  height: 60%;
  margin-bottom: 5px;
}

.content-post {
  width: 50%;
  background-color: antiquewhite;
}
.content-calendar {
  width: 50%;
  background-color: blueviolet;
}

.dashboard-comment {
  display: flex;
  width: 100%;
  height: 40%;
}
</style>
