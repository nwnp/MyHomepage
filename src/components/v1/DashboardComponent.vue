<template>
  <div class="dashboard-wrap">
    <div class="dashboard-nickname">
      <div>π {{ me.nickname }}λμ λ―ΈλννΌμλλ€ π</div>
    </div>
    <div class="dashboard-content">
      <div class="content-post">κ²μκΈ</div>
      <div class="content-calendar">μΊλ¦°λ</div>
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
