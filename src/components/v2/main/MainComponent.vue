<template>
  <div class="main-container">
    <div class="main-wrap">
      <div v-if="visitedUserId !== userId">
        <RouteComponent />
      </div>
      <div class="card-wrap">
        <div class="user-info">
          <div class="user-name">
            {{ me.nickname }}({{ me.name }})님의 개발홈피
          </div>
          <div class="user-email">
            <i class="fa-sharp fa-solid fa-envelope"></i>
            {{ me.email }}
          </div>
          <div class="user-url">
            <a :href="me.githubUrl == 'gitless' ? '#' : me.githubUrl">
              <i class="fa-brands fa-github"></i>
              {{ me.githubUrl != "gitless" ? me.githubUrl : "Nothing github" }}
            </a>
          </div>
          <div class="user-url">
            <a :href="me.blogUrl == 'blogless' ? '#' : me.blogUrl">
              <i class="fa-solid fa-blog"></i>
              {{ me.blogUrl != "blogless" ? me.blogUrl : "Nothing blog" }}
            </a>
          </div>
          <div
            v-if="visitedUserId !== userId"
            :class="followCheck ? 'unfollow-btn' : 'follow-btn'"
            @click="followBtn"
          >
            {{ followCheck ? "언팔하기" : "팔로우하기" }}
          </div>
          <div class="follow-card">
            <div class="follower-follower" @click="followList('follower')">
              팔로잉 {{ followsForLogin.following_me }}
            </div>
            <div class="follower-following" @click="followList('following')">
              팔로워 {{ followsForLogin.im_following }}
            </div>
          </div>
        </div>
      </div>
      <div class="card-wrap">
        <div class="main-card-list">
          <ul>
            <div class="wrap-name">{{ me.nickname }}님의 최신 게시글</div>
            <li v-if="getLimitedPosts.length < 1">
              현재 게시글이 존재하지 않습니다 😭
            </li>
            <li
              v-else
              v-for="(post, id) in getLimitedPosts"
              :key="(post, id)"
              @click="clickedPost(id, 'DETAIL')"
            >
              <div class="card-title">🚀 {{ post.title }}</div>
              <div class="card-content">{{ post.content }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-wrap">
        <div class="main-card-list">
          <ul>
            <div class="wrap-name">{{ me.nickname }}님의 최신 TIL</div>
            <li v-if="getLimitedTils.length < 1">
              현재 TIL이 존재하지 않습니다 😭
            </li>
            <li
              v-else
              v-for="(til, id) in getLimitedTils"
              :key="(til, id)"
              @click="clickedTil(id)"
            >
              <div class="card-title">📌 {{ til.title }}</div>
              <div class="card-content">{{ til.til_content }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <PostDetailModal
      v-if="postDetailModal"
      class="detail-modal"
      :postInfo="postInfo"
      @closeModal="closeModal"
    />
    <TilDetailComponent
      v-if="tilDetailModal"
      class="detail-modal"
      :tilInfo="tilInfo"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import { Query } from "@/apollo/query/query";
import PostDetailModal from "@/components/v2/post/PostDetailModal.vue";
import TilDetailComponent from "@/components/v2/til/TilDetailComponent.vue";
import { getCookie } from "@/functions/getCookie";
import RouteComponent from "@/components/v2/common/RouteComponent.vue";

export default {
  components: {
    PostDetailModal,
    TilDetailComponent,
    RouteComponent,
  },
  data() {
    return {
      getLimitedPosts: "",
      getLimitedTils: "",
      postDetailModal: false,
      tilDetailModal: false,
      visitedUserId: getCookie("userId"),
      userId: this.$route.params.id,
      followCheck: false,
      postInfo: {
        UserId: "",
        modalType: "",
        title: "",
        content: "",
        PostId: "",
      },
      tilInfo: {
        tilId: "",
        title: "",
        content: "",
        userId: "",
      },
      me: "",
      followsForLogin: "",
    };
  },
  watch: {
    getLimitedPosts: function () {
      this.$apollo.queries.getLimitedPosts.refetch();
    },
    getLimitedTils: function () {
      this.$apollo.queries.getLimitedTils.refetch();
    },
    me: function () {
      this.$apollo.queries.me.refetch();
    },
  },
  apollo: {
    getLimitedPosts: {
      query: Query.getLimitedPosts,
      variables() {
        return {
          post: {
            count: 3,
            UserId: ~~this.userId,
          },
        };
      },
    },
    getLimitedTils: {
      query: Query.getLimitedTils,
      variables() {
        return {
          til: {
            UserId: ~~this.userId,
            count: 3,
          },
        };
      },
    },
    me: {
      query: Query.me,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
    followsForLogin: {
      query: Query.followsForLogin,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
    followCheck: {
      query: Query.followCheck,
      variables() {
        return {
          userId: ~~this.$route.params.id,
        };
      },
    },
  },
  methods: {
    clickedPost(id, type) {
      this.postInfo = {
        modalType: type,
        title: this.getLimitedPosts[id].title,
        content: this.getLimitedPosts[id].content,
        PostId: this.getLimitedPosts[id].id,
        UserId: this.$route.params.id,
      };
      this.postDetailModal = !this.postDetailModal;
    },
    clickedTil(id) {
      this.tilInfo = {
        tilId: this.getLimitedTils[id].id,
        title: this.getLimitedTils[id].title,
        content: this.getLimitedTils[id].til_content,
        userId: this.$route.params.id,
      };
      this.tilDetailModal = !this.tilDetailModal;
    },
    closeModal(type) {
      if (type == "post") this.postDetailModal = !this.postDetailModal;
      else this.tilDetailModal = !this.tilDetailModal;
    },
    followList(type) {
      if (this.userId !== this.visitedUserId) {
        return this.$router.push({
          name: "follow-list-idx",
          params: {
            id: this.userId,
          },
          query: {
            type: type,
          },
        });
      }
      this.$router.push({
        name: "follow-list",
        params: {
          id: this.visitedUserId,
        },
        query: {
          type: type,
        },
      });
    },
    async followBtn() {
      await this.$store.dispatch("registerFollowing", {
        apollo: this.$apollo,
        followerId: this.userId,
      });
      const result = await this.$store.getters.followCheck;
      if (!result) return alert("다시 시도해주세요.");
      await this.$apollo.queries.followCheck.refetch();
      await this.$apollo.queries.followsForLogin.refetch();
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
  margin-bottom: 200px;
}

.card-wrap {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-name {
  font-size: 1.1em;
  font-weight: bold;
}

.main-card-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
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
  cursor: pointer;
}

.card-content {
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

.detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}

.unfollow-btn {
  width: 100%;
  background-color: #fff;
  border: 1px solid #b9b9b9;
  border-radius: 4px;
  padding: 5px;
  box-sizing: border-box;
  text-align: center;
  color: #898989;
}

.follow-btn {
  width: 100%;
  border: 1px solid #60b6f0;
  background-color: #60b6f0;
  border-radius: 4px;
  padding: 5px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
}

.follow-card {
  display: flex;
  height: 100%;
  justify-content: space-around;
  margin-top: 10px;
}

.follower-following {
  border: none;
  width: 50%;
  border-left: 1px solid #b9b9b9;
  border-right: 1px solid #b9b9b9;
  text-align: center;
  color: #7a7a7a;
}

.follower-follower {
  color: #7a7a7a;
  border: none;
  width: 50%;
  border-left: 1px solid #b9b9b9;
  text-align: center;
}

a {
  text-decoration: none;
  color: black;
}
</style>
