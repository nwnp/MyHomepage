<template>
  <div class="dashboard-wrap">
    <div class="dashboard-nickname">
      <div>🚀 {{ me.nickname }}님의 미니홈피입니다 🚀</div>
    </div>
    <div class="dashboard-content">
      <div v-for="(post, id) in getPostsByUserId" :key="id" class="post-wrap">
        <div class="button-wrap">
          <button
            style="background-color: #fcf19a"
            title="수정"
            @click="updateOrDeletePost(id, 'UPDATE')"
          ></button>
          <button
            style="background-color: red"
            title="삭제"
            @click="updateOrDeletePost(id, 'DELETE')"
          ></button>
        </div>
        <div class="card-wrap" @click="detailPost(id)">
          <div class="post-title">
            {{ post.title }}
          </div>
          <div class="post-content">
            {{ post.content }}
          </div>
        </div>
      </div>
      <button class="register-post-btn">게시글 등록하기</button>
    </div>
    <PostModal
      v-if="editModalCheck"
      class="modal"
      :postInfo="postInfo"
      @closeModal="editModalCheck = !editModalCheck"
      @updateSuccess="success"
      @deleteSuccess="success"
    />
    <PostDetailModal
      v-if="detailModalCheck"
      class="modal"
      :postInfo="postInfo"
      @closeModal="detailModalCheck = !detailModalCheck"
    />
  </div>
</template>

<script>
import { Query } from "@/apollo/query/query.js";
import { getCookie } from "@/functions/getCookie.js";
import PostModal from "@/components/modal/post/PostModal.vue";
import PostDetailModal from "@/components/modal/post/PostDetailModal.vue";

export default {
  components: {
    PostModal,
    PostDetailModal,
  },
  data() {
    return {
      me: "",
      getPostsByUserId: "",
      editModalCheck: false,
      detailModalCheck: false,
      postInfo: {
        modalType: "",
        title: "",
        content: "",
        PostId: "",
      },
    };
  },
  apollo: {
    me: {
      query: Query.meForDashboard,
      variables() {
        return {
          id: parseInt(getCookie("userId")),
        };
      },
    },
    getPostsByUserId: {
      query: Query.postForDashboard,
      variables() {
        return {
          id: getCookie("userId"),
        };
      },
    },
  },
  methods: {
    updateOrDeletePost(id, type) {
      this.postInfoSetup(id, type);
      this.editModalCheck = !this.editModalCheck;
    },
    detailPost(id) {
      this.postInfoSetup(id, "DETAIL");
      this.detailModalCheck = !this.detailModalCheck;
    },
    success() {
      this.$router.go();
    },
    postInfoSetup(id, type) {
      if (type === "DETAIL") {
        this.postInfo = {
          title: this.getPostsByUserId[id].title,
          content: this.getPostsByUserId[id].content,
          PostId: this.getPostsByUserId[id].id,
        };
      } else {
        this.postInfo = {
          modalType: type,
          title: this.getPostsByUserId[id].title,
          content: this.getPostsByUserId[id].content,
          PostId: this.getPostsByUserId[id].id,
        };
      }
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
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.3);
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 5px;
  align-items: center;
  padding: 10px 10px 10px 10px;
}

.image-icon {
  size: 100px;
}

.post-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  width: 100vh;
  height: 140px;
  cursor: pointer;
}

.post-wrap:hover {
  background-color: #2c3e50;
  color: white;
}

.card-wrap {
  padding: 4px 4px 20px 20px;
}

.post-title {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}

.post-content {
  width: 780px;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.register-post-btn {
  position: fixed;
  right: auto;
  left: auto;
  bottom: 50px;
  border: none;
  border-radius: 8px;
  background-color: #2c3e50;
  color: white;
  width: 120px;
  height: 40px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.4);
  transition: all, 0.3s;
}

.register-post-btn:hover {
  background-color: #446485;
}

.button-wrap {
  display: flex;
  justify-content: end;
  background-color: #446485;
  gap: 4px;
  border-radius: 8px 8px 0px 0px;
  padding: 4px;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
