<template>
  <div class="main-container">
    <div class="main-wrap">
      <div class="main-card-wrap">
        <div class="main-card-list">
          <ul>
            <div class="wrap-name">내 최신 게시글</div>
            <li v-if="getLimitedPosts.length < 1">
              현재 게시글이 존재하지 않습니다 😭
            </li>
            <li
              v-else
              v-for="(post, id) in getLimitedPosts"
              :key="(post, id)"
              @click="clickedPost(id, 'DETAIL')"
            >
              <div class="card-title">📌 {{ post.title }}</div>
              <div class="card-content">{{ post.content }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-card-wrap">
        <div class="main-card-list">
          <ul>
            <div class="wrap-name">내 최신 TIL</div>
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

export default {
  components: {
    PostDetailModal,
    TilDetailComponent,
  },
  data() {
    return {
      getLimitedPosts: "",
      getLimitedTils: "",
      postDetailModal: false,
      tilDetailModal: false,
      userId: this.$route.params.id,
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
    };
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

.main-card-wrap {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
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
</style>
