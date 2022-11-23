<template>
  <div class="main-container">
    <div class="main-wrap">
      <div class="main-post-wrap">
        <div class="main-post-list">
          <ul>
            <div class="wrap-name">내 최신 게시글</div>
            <li v-if="getLimitedPosts.length < 1">
              현재 게시글이 존재하지 않습니다 😭
            </li>
            <li
              v-else
              v-for="(post, id) in getLimitedPosts"
              :key="(post, id)"
              @click="clickedPost(post.id)"
            >
              <div class="post-title">📌 {{ post.title }}</div>
              <div class="post-content">{{ post.content }}</div>
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
      getLimitedPosts: "",
    };
  },
  apollo: {
    getLimitedPosts: {
      query: Query.getLimitedPosts,
      variables() {
        return {
          post: {
            UserId: getCookie("userId"),
            count: 3,
          },
        };
      },
    },
  },
  methods: {
    clickedPost(postId) {
      console.log("clicked post", postId);
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
  overflow: scroll;
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
  width: 90%;
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
  height: 100%;
}

.wrap-name {
  font-weight: bold;
  margin-bottom: 7px;
}

li {
  list-style: none;
  margin: 0px 0px 7px 0px;
  border-radius: 4px;
}

.post-content {
  text-overflow: ellipsis;
  width: auto;
  white-space: nowrap;
  overflow: hidden;
  padding-left: 10px;
  border-left: 2px solid #e5e5e5;
  height: 30px;
  color: #b7b7b7;
  margin: 8px 0px 0px 10px;
  display: flex;
  align-items: center;
}
</style>
