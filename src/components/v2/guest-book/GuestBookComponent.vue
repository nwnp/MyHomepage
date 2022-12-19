<template>
  <div class="guestbook-container">
    <div v-if="userId !== paramsId" class="route-wrap">
      <RouteComponent />
    </div>
    <div v-if="userId !== paramsId" class="register-btn-wrap">
      <button class="register-btn" @click="registerBtn">
        나도 방명록 남기기
      </button>
    </div>
    <div class="wrap">
      <div v-if="getComments.length === 0" class="card-wrap">
        방명록이 없습니다. 방명록을 남겨주세요 😿
      </div>
      <div v-else v-for="(comment, idx) in getComments" :key="idx">
        <div
          :class="
            comment.secret
              ? comment.user.id == userId || comment.UserId == paramsId
                ? 'card-wrap-owner'
                : 'card-wrap'
              : 'card-wrap'
          "
        >
          <div class="card-top">{{ comment.user.nickname }}님의 한마디 👍</div>
          <div
            v-if="comment.secret"
            @click="
              clickedComment(
                comment.CommentedUserId,
                'secret',
                comment.id,
                comment.comment
              )
            "
          >
            <div class="card-secret-content">
              <SecretSVG />
              <div>이 글은 비밀글입니다</div>
            </div>
          </div>
          <div
            v-else
            class="card-bottom"
            @click="
              clickedComment(
                comment.CommentedUserId,
                'public',
                comment.id,
                comment.comment
              )
            "
          >
            <div class="card-content">{{ comment.comment }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteComponent from "@/components/v2/common/RouteComponent.vue";
import { Query } from "@/apollo/query/query";
import { getCookie } from "@/functions/getCookie";
import SecretSVG from "@/components/svgs/SecretSVG.vue";

export default {
  components: {
    RouteComponent,
    SecretSVG,
  },
  data() {
    return {
      getComments: "",
      userId: getCookie("userId"),
      paramsId: this.$route.params.id,
    };
  },
  watch: {
    getComments: function getComments() {
      this.$apollo.queries.getComments.refetch();
    },
  },
  apollo: {
    getComments: {
      query: Query.getComments,
      variables() {
        return {
          id: this.paramsId,
        };
      },
    },
  },
  methods: {
    async clickedComment(commentUserId, type, commentId, comment) {
      if (type == "secret") {
        if (this.userId !== this.paramsId && this.userId !== commentUserId) {
          return alert("비밀글은 접근할 수 없습니다. ❌");
        }
      }
      this.$store.commit("setComment", comment);
      await this.$router.push({
        name: "detail-comment",
        params: {
          paramsId: this.paramsId,
        },
        query: {
          commentId,
          commentUserId,
        },
      });
    },
    registerBtn() {
      this.$router.push({
        name: "guest-book-register",
        params: {
          paramsId: this.$route.params.id,
        },
        query: {
          userId: this.userId,
        },
      });
    },
  },
};
</script>

<style scoped>
.guestbook-container {
  display: flex;
  flex-direction: column;
  background-color: #f2f0f0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  gap: 10;
  padding: 10px 0 0 0;
}

.route-wrap {
  padding: 0 10px 0 10px;
}

.wrap {
  margin-bottom: 150px;
  padding: 0 10px 0 10px;
}

.register-btn-wrap {
  display: flex;
  padding: 0 10px 0 10px;
  margin-bottom: 10px;
}

.register-btn {
  width: 100%;
  height: 40px;
  color: #fff;
  background-color: #60b6f0;
  border: none;
  border-radius: 8px;
}

.card-wrap {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.card-wrap-owner {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #dcdcdc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.card-wrap-secret {
  background-color: #dcdcdc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  pointer-events: none;
  width: 100%;
}

.card-content {
  margin-top: 10px;
  padding-left: 10px;
  border-left: 2px solid #e5e5e5;
  color: #838383;
  margin: 8px 0px 0px 10px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.1em;
}

.card-secret-content {
  display: flex;
  gap: 10px;
}
</style>
