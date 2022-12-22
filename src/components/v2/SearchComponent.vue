<template>
  <div class="search-container">
    <div class="search-wrap">
      <div class="info">닉네임 혹은 이메일로 검색해보세요</div>
      <div class="search-card-wrap">
        <div class="search-radio">
          <div>
            <input
              type="radio"
              id="nickname"
              name="type"
              value="nickname"
              v-model="type"
            />
            <label for="nickname">닉네임으로 찾기</label>
          </div>
          <div>
            <input
              type="radio"
              id="email"
              name="type"
              value="email"
              v-model="type"
            />
            <label for="email">이메일로 찾기</label>
          </div>
        </div>
        <div class="input-wrap">
          <label for="input">{{
            type == "email" ? "이메일 입력" : "닉네임 입력"
          }}</label>
          <input
            type="text"
            id="input"
            v-model="value"
            :placeholder="
              type === 'email' ? '예) mypage@mypage.co.kr' : '예) mypage'
            "
          />
          <p v-if="validEmail">이메일 주소를 정확히 입력해주세요.</p>
          <button @click="submit" class="search-btn">찾기</button>
        </div>
      </div>
      <div
        v-if="
          type === 'nickname' &&
          valid.userList.length === 0 &&
          valid.commitCheck
        "
        class="no-search"
      >
        <div>검색 결과가 없습니다&nbsp;</div>
        <div>닉네임을 다시 확인해주세요 😿</div>
      </div>
      <div
        v-if="
          type === 'email' && valid.searchedUser == null && valid.commitCheck
        "
        class="no-search"
      >
        <div>검색 결과가 없습니다&nbsp;</div>
        <div>이메일을 다시 확인해주세요 😿</div>
      </div>
      <div v-if="valid.userList.length >= 1" style="width: 100%">
        <div
          v-for="(user, idx) in valid.userList"
          :key="idx"
          class="user-card-wrap"
        >
          <div class="user-card">
            <div class="card-email">
              {{ user.email }}
            </div>
            <div class="card-nickname">
              {{ user.nickname }}
            </div>
            <div class="card-name">
              {{ user.name }}
            </div>
            <button @click="routeBtn('nickname', idx)" class="card-route-btn">
              방문하기
            </button>
          </div>
        </div>
      </div>
      <div v-if="valid.searchedUser" class="user-card-wrap">
        <div class="user-card">
          <div class="card-email">
            {{ valid.searchedUser.email }}
          </div>
          <div class="card-nickname">
            {{ valid.searchedUser.nickname }}
          </div>
          <div class="card-name">
            {{ valid.searchedUser.name }}
          </div>
          <button
            @click="routeBtn('email', valid.searchedUser.id)"
            class="card-route-btn"
          >
            방문하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from "@/functions/getCookie";

export default {
  data() {
    return {
      type: "nickname",
      value: "",
      validEmail: false,
      valid: {
        userList: "",
        commitCheck: false,
        searchedUser: "",
      },
    };
  },
  watch: {
    value: function () {
      if (this.type === "email") {
        const validateEmail =
          /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;
        if (!validateEmail.test(this.value) || !this.value) {
          this.validEmail = true;
          return;
        }
        this.validEmail = false;
      }
    },
    type: function () {
      this.valid.commitCheck = false;
      if (this.type === "nickname") {
        this.validEmail = false;
      }
      this.value = "";
    },
  },
  methods: {
    async submit() {
      if (this.type === "email") {
        if (this.validEmail || this.value === "") {
          alert("이메일 주소를 정확히 입력해주세요.");
          return this.clearForm();
        }
        // 이메일로 유저 찾기
        await this.$store.dispatch("searchUserByEmail", {
          apollo: this.$apollo,
          email: this.value,
        });
        this.valid = {
          userList: "",
          searchedUser: await this.$store.getters.searchUserList,
          commitCheck: true,
        };
        return;
      } else if (this.value === "" || this.value.trim() === "") {
        this.clearForm();
        return alert("닉네임을 정확히 입력해주세요");
      }
      // 닉네임으로 유저 찾기
      await this.$store.dispatch("searchUserByNickname", {
        apollo: this.$apollo,
        nickname: this.value,
      });
      this.valid = {
        userList: await this.$store.getters.searchUserList,
        commitCheck: true,
        searchedUser: "",
      };
    },
    routeBtn(type, id) {
      if (type === "nickname") {
        if (getCookie("userId") == this.valid.userList[id].id)
          return alert("본인 홈피입니다");
        return this.routing(this.valid.userList[id].id);
      }
      this.routing(id);
    },
    routing(id) {
      this.$router.push({
        name: "main-user",
        params: { id },
      });
    },
    clearForm() {
      this.type = "nickname";
      this.value = "";
      this.validEmail = false;
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  background-color: #f2f0f0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
}

.search-wrap {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 100px;
  align-items: center;
}

.info {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

.search-card-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.search-radio {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
}

.input-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
}

.input-wrap > input {
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding: 5px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
}

p {
  padding: 0;
  margin: 0;
  color: #fa5252;
  font-size: 0.7em;
}

.search-btn {
  width: 100%;
  height: 35px;
  font-size: 0.9em;
  font-weight: bold;
  color: #fff;
  border: none;
  background-color: #60b6f0;
  border-radius: 8px;
}

.no-search {
  background-color: #fff;
  width: 100%;
  padding: 10px;
  text-align: center;
}

.user-card-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  border: none;
  margin-bottom: 5px;
}

.user-card {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.card-email {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 145px;
}

.card-nickname {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 60px;
}

.card-route-btn {
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #60b6f0;
  padding: 5px;
}
</style>
