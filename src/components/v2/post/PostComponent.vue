<template>
  <div class="post-container">
    <div class="post-wrap">
      <div v-if="userId !== paramId" class="wrap">
        <RouteComponent />
      </div>
      <div v-if="getPostsByUserId.length === 0" class="post-card-wrap">
        현재 게시글이 존재하지 않습니다 😭
      </div>
      <div
        v-for="(post, id) in getPostsByUserId"
        :key="id"
        class="post-card-wrap"
      >
        <div class="card-list" @click="clickedPost(id)">
          <div>📌 {{ post.title }}</div>
          <div class="card-content">{{ post.content }}</div>
        </div>
      </div>
      <div v-if="userId === paramId" class="register-component">
        <RegisterBtnComponent :registerInfo="registerInfo" />
      </div>
    </div>
    <PostDetailModal
      v-if="postDetailModal"
      class="detail-modal"
      :postInfo="postInfo"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import RouteComponent from "@/components/v2/common/RouteComponent.vue";
import RegisterBtnComponent from "@/components/v2/common/RegisterBtnComponent.vue";
import PostDetailModal from "@/components/v2/post/PostDetailModal.vue";
import { getCookie } from "@/functions/getCookie";
import { Query } from "@/apollo/query/query";

export default {
  components: {
    RouteComponent,
    RegisterBtnComponent,
    PostDetailModal,
  },
  data() {
    return {
      userId: getCookie("userId"),
      paramId: this.$route.params.id,
      registerInfo: {
        type: "post",
        userId: getCookie("userId"),
      },
      postInfo: {
        PostId: "",
        title: "",
        content: "",
        UserId: "",
      },
      getPostsByUserId: [],
      postDetailModal: false,
    };
  },
  watch: {
    getPostsByUserId: function getPostsByUserId() {
      this.$apollo.queries.getPostsByUserId.refetch();
    },
  },
  apollo: {
    getPostsByUserId: {
      query: Query.getPostsByUserId,
      variables() {
        return {
          id: ~~this.paramId,
        };
      },
    },
  },
  methods: {
    clickedPost(id) {
      this.postInfo = {
        PostId: this.getPostsByUserId[id].id,
        title: this.getPostsByUserId[id].title,
        content: this.getPostsByUserId[id].content,
        UserId: this.$route.params.id,
      };
      this.postDetailModal = !this.postDetailModal;
    },
    closeModal() {
      this.postDetailModal = !this.postDetailModal;
      this.$apollo.queries.getPostsByUserId.refetch();
    },
  },
};
</script>

<style scoped>
.post-container {
  display: flex;
  flex-direction: column;
  background-color: #f2f0f0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
}

.wrap {
  width: 100%;
}

.post-wrap {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 65px;
  align-items: center;
}

.register-component {
  width: 30%;
  position: fixed;
  bottom: 90px;
}

.post-card-wrap {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.card-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
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
