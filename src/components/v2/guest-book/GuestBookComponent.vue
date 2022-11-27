<template>
  <div class="guestbook-container">
    <div class="wrap">
      <div v-for="(comment, idx) in getComments" :key="idx">
        <div :class="comment.secret ? 'card-wrap-secret' : 'card-wrap'">
          <div class="card-top">{{ comment.user.nickname }}</div>
          <div v-if="comment.secret">
            <div v-if="comment.user.id == me">
              <button>수정</button>
              <button>삭제</button>
            </div>
            <div>이 글은 비밀글입니다 🚧</div>
          </div>
          <div v-else @click="onClicked" class="card-bottom">
            <div class="card-bottom-guestbook">{{ comment.comment }}</div>
            <div v-if="comment.user.id == me">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
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
      getComments: "",
      me: getCookie("userId"),
    };
  },
  apollo: {
    getComments: {
      query: Query.getComments,
    },
  },
  methods: {
    onClicked() {
      console.log("clicked!!");
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
}

.wrap {
  padding: 10px;
  margin-bottom: 65px;
}

.card-wrap {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.card-wrap-secret {
  background-color: #dcdcdc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  pointer-events: none;
}
</style>
