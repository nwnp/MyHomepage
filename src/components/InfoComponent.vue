<template>
  <div class="info-wrap">
    <div class="view-count">
      <div class="view-total-count">
        <p>TOTAL 3000</p>
      </div>
      <div class="view-today-count">
        <p>TODAY 32</p>
      </div>
    </div>
    <div class="image-wrap">
      <img class="info-profile-image" src="./파이리.png" />
    </div>
    <button @click="logout">LOGOUT</button>
    <div class="info-description">
      <div class="name">
        <i class="fa-solid fa-person"></i>
        {{ me.nickname ? me.nickname : "NO NICKNAME" }}
      </div>
      <div class="name">
        <i class="fa-solid fa-paper-plane"></i>
        {{ me.email }}
      </div>
      <div class="name">
        <i class="fa-brands fa-github"></i>
        {{ me.githubUrl ? me.githubUrl : "NOTHING URL" }}
      </div>
    </div>
    <div class="info-today-graph"></div>
  </div>
</template>

<script>
import { getCookie } from "@/functions/getCookie.js";
import { isLoggedIn } from "../functions/isAuthMiddleware.js";
import { Query } from "@/apollo/query/query.js";

export default {
  data() {
    return {
      me: "",
    };
  },
  created() {
    this.loginCheck();
  },
  apollo: {
    me: {
      query: Query.meForInfo,
      variables() {
        return { id: getCookie() };
      },
    },
  },
  methods: {
    loginCheck() {
      if (!isLoggedIn()) {
        alert("로그인이 되어 있지 않습니다.");
        this.$router.push("/");
        return;
      }
    },
    async logout() {
      const result = confirm("로그아웃 하시겠습니까?");
      if (result) {
        await this.$store.dispatch("Logout", { userId: getCookie() });
      }
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.info-wrap {
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100vh;
  border-radius: 8px;
  background-color: #e6e3e3;
  padding: 10px;
  margin: 10px;
  align-items: center;
}

.view-count {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.image-wrap {
  width: 250px;
  height: 250px;
  display: flex;
}

.info-profile-image {
  border-radius: 40px;
  width: 250px;
  height: 250px;
}

.info-description {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-items: center;
  margin-top: 10px;
}

.name {
  display: flex;
  padding-left: 10px;
  gap: 30px;
  margin-bottom: 5px;
  align-items: center;
}

i {
  display: flex;
  font-size: 1em;
  width: 15px;
  justify-content: center;
}

button {
  cursor: pointer;
  width: 100%;
  border-radius: 15px;
  height: 35px;
  background-color: #3498db;
  color: white;
  margin-top: 1em;
  border: none;
  transition: all, 0.5s;
}

button:hover {
  background-color: #60b6f0;
}
</style>
