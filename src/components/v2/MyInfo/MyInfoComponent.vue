<template>
  <div class="myinfo-container">
    <div class="myinfo-wrap">
      <div class="info-head">
        <div class="greeting-quote">안녕하세요!</div>
        <div class="nickname">{{ me.nickname }}님</div>
      </div>
      <div class="info-mid">
        <div class="mid-email">
          <i class="fa-sharp fa-solid fa-envelope"></i>
          {{ me.email }}
        </div>
        <div>
          <i class="fa-brands fa-github"></i>
          {{
            me.githubUrl === "gitless"
              ? "깃허브 주소를 등록하지 않았습니다."
              : me.githubUrl
          }}
        </div>
        <div>
          <i class="fa-solid fa-blog"></i>
          {{
            me.blogUrl === "blogless"
              ? "블로그 주소를 등록하지 않았습니다."
              : me.blogUrl
          }}
        </div>
      </div>
      <div
        v-for="(list, idx) in bottomList"
        :key="idx"
        class="info-bottom"
        @click="routing(idx)"
      >
        <div>{{ list.name }}</div>
        <i class="fa-solid fa-chevron-right icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { Query } from "@/apollo/query/query";

export default {
  data() {
    return {
      me: "",
      bottomList: [
        { name: "개인정보 수정", value: "my-info-edit" },
        { name: "내 모든 게시글(TIL 포함)", value: "myPosts" },
        { name: "친구 목록", value: "follow-list" },
        { name: "이력서 만들기", value: "makeResume" },
      ],
    };
  },
  apollo: {
    me: {
      query: Query.me,
      variables() {
        return {
          id: ~~this.$route.params.id,
        };
      },
    },
  },
  methods: {
    routing(idx) {
      const value = this.bottomList[idx].value;
      if (value === "makeResume" || value === "myPosts") {
        return alert("현재 개발중입니다..");
      }
      this.$store.commit("setMe", this.me);
      this.$router.push({
        name: value,
        params: {
          id: this.me.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.myinfo-container {
  width: 100%;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

.myinfo-wrap {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  height: 50%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom: 200px;
}

.info-head {
  font-size: 22px;
  font-weight: bold;
  display: flex;
  gap: 5px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 15px;
}

.nickname {
  margin-bottom: 15px;
}

.greeting-quote {
  color: #b9b9b9;
}

.info-mid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.info-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}

.icon {
  color: #60b6f0;
  font-weight: bold;
}

@media (min-width: 600px) {
  .myinfo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
  .myinfo-wrap {
    width: 50%;
    height: 100vh;
    border-radius: 0;
    margin-bottom: 0;
  }
}

@media (max-height: 720px) {
  .myinfo-wrap {
    height: 70%;
  }
  .info-head {
    display: none;
  }
  .info-mid {
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: normal;
  }
  .info-bottom {
    padding: 13px;
    font-size: 15px;
  }
}
</style>
