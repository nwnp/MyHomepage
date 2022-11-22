<template>
  <div class="main-container">
    <div class="main-wrap">
      <div class="main-post-wrap">
        <div class="main-post-list">
          <ul>
            <div class="wrap-name">내 최신 게시글</div>
            <li v-if="getPostsByUserId.length < 1">
              현재 게시글이 존재하지 않습니다 😭
            </li>
            <li v-else v-for="(post, id) in getPostsByUserId" :key="(post, id)">
              <div class="post-title">📌 {{ post.title }}</div>
              <div class="post-content">- {{ post.content }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-til-wrap">
        <div class="main-til-list">
          <ul>
            <li>TIL 1</li>
            <li>TIL 2</li>
            <li>TIL 3</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Query } from "@/apollo/query/query";
import { getCookie } from "@/functions/getCookie";

export default {
  data() {
    return {
      getPostsByUserId: "",
    };
  },
  apollo: {
    getPostsByUserId: {
      query: Query.postForDashboard,
      variables() {
        return {
          id: getCookie("userId"),
        };
      },
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  background-color: #f2f0f0;
  width: 100%;
  height: 100vh;
}

.main-wrap {
  padding: 10px;
  margin-bottom: 65px;
}

.main-post-wrap {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
}

.main-post-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.main-til-wrap {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
}

ul {
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}

.wrap-name {
  font-weight: bold;
  margin-bottom: 7px;
}

li {
  list-style: none;
  margin: 0px 0px 7px 0px;
  background-color: #e5e5e5;
  border-radius: 4px;
  padding: 5px;
}

.post-content {
  margin-left: 10px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
