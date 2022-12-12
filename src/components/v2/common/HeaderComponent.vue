<template>
  <header class="header-container">
    <div class="header-top">
      <a :href="`/main/${userId}`">MY-HOMEPAGE</a>
      <button @click="clickedMenu">
        <i class="fa-solid fa-bars fa-xl"></i>
      </button>
    </div>
    <div v-if="sidebar" class="sidebar-wrap">
      <div class="sidebar">
        <div class="sidebar-header">
          <div>MYPAGE</div>
        </div>
        <div class="sidebar-top">
          <button @click="routing('my-info')" class="sidebar-btn">
            내 정보
          </button>
        </div>
        <div class="sidebar-mid">
          <ul>
            <li @click="routing('post')">내 게시글</li>
            <li @click="routing('til')">내 TIL</li>
            <li @click="routing('guest-book')">방명록</li>
            <li @click="routing('calendar')">캘린더</li>
          </ul>
        </div>
        <div class="sidebar-bottom">
          <ul>
            <li @click="routing('feedback')">관리자한테 피드백하기</li>
            <!-- <li @click="routing()">친구 찾기</li> -->
            <li @click="logout">로그아웃</li>
          </ul>
        </div>
        <button class="sidebar-exit" @click="exit">
          <i class="fa-sharp fa-solid fa-right-from-bracket"></i>
          <div>닫기</div>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { getCookie } from "@/functions/getCookie";

export default {
  data() {
    return {
      sidebar: false,
      userId: getCookie("userId"),
    };
  },
  methods: {
    clickedMenu() {
      if (getCookie("userId")) {
        this.sidebar = !this.sidebar;
        return;
      }
      alert("로그인이 되어 있지 않습니다.");
    },
    exit() {
      this.sidebar = !this.sidebar;
    },
    routing(to) {
      this.exit();
      this.$router.push({ name: to, params: { id: this.userId } });
    },
    async logout() {
      if (confirm("로그아웃 하시겠습니까?")) {
        this.exit();
        await this.$store.dispatch("Logout");
        await this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5) inset;
  height: 50px;
  background-color: white;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

a {
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;
  color: black;
}

button {
  border: none;
  background-color: white;
}

i {
  cursor: pointer;
}

.sidebar-wrap {
  position: fixed;
  display: flex;
  right: 0;
  top: 0;
  left: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  flex-direction: row-reverse;
}

.sidebar {
  flex-direction: column;
  background-color: white;
  padding: 20px;
  width: 55%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 6%;
  font-size: 1.4em;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  font-weight: bold;
  justify-content: center;
}

.sidebar-top {
  width: 100%;
  height: 7%;
  border: none;
  border-bottom: 1px solid #e5e5e5;
}

.sidebar-btn {
  width: 100%;
  height: 60%;
  border: none;
  background-color: #3498db;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.sidebar-mid {
  border: none;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
}

.sidebar-bottom {
  border: none;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
  font-size: 1.1em;
  margin-bottom: 6px;
  font-weight: bold;
}

.sidebar-exit {
  background-color: #b9b9b9;
  align-items: center;
  display: flex;
  gap: 10px;
  color: #fff;
  justify-content: center;
  height: 4%;
  border-radius: 8px;
  cursor: pointer;
}
</style>
