import { Mutation } from "@/apollo/mutation/mutations";
import { deleteCookie } from "@/functions/deleteCookie.js";
import jwtDecode from "jwt-decode";

export default {
  state: {
    user: {
      token: "",
      userId: "",
    },
    loginCheck: "",
    searchUserList: "",
    updateUserCheck: "",
    me: "",
  },
  getters: {
    getUser: (state) => state.user,
    loginCheck: (state) => state.loginCheck,
    searchUserList: (state) => state.searchUserList,
    me: (state) => state.me,
    updateUserCheck: (state) => state.updateUserCheck,
  },
  mutations: {
    setMe(state, payload) {
      state.me = payload;
    },
    setUser(state, payload) {
      state.user = { ...payload };
    },
    setLoginCheck(state, bool) {
      state.loginCheck = bool;
    },
    setSearchUserList(state, payload) {
      state.searchUserList = payload;
    },
    setUpdateUserCheck(state, payload) {
      state.updateUserCheck = payload;
    },
  },
  actions: {
    async Login({ commit }, payload) {
      let token = "";
      try {
        token = await payload.apollo.mutate({
          mutation: Mutation.login,
          variables: {
            userInfo: {
              email: payload.user.email,
              password: payload.user.password,
            },
          },
        });
      } catch (error) {
        commit("setLoginCheck", false);
        return;
      }

      const { accessToken } = token.data.login;
      let date = new Date(Date.now() + 7200e3);
      date = date.toUTCString();
      const { id } = jwtDecode(accessToken);
      document.cookie = `userId=${id};path=/;expires=${date}`;
      document.cookie = `token=${accessToken};path=/;expires=${date}`;
      window.location.reload();
      commit("setLoginCheck", true);
      commit("setUser", {
        accessToken,
        userId: id,
      });
    },
    Logout({ commit }, payload) {
      deleteCookie("userId");
      deleteCookie("token");
      commit("setLoginCheck", false);
    },
    async searchUserByNickname({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.searchUserByNickname,
          variables: {
            nickname: payload.nickname,
          },
        });
      } catch (error) {
        console.error(error);
        return commit("setSearchUserList", false);
      }
      commit("setSearchUserList", result.data.searchUserByNickname);
    },
    async searchUserByEmail({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.searchUserByEmail,
          variables: {
            email: payload.email,
          },
        });
      } catch (error) {
        console.error(error);
        return commit("setSearchUserList", false);
      }
      commit("setSearchUserList", result.data.searchUserByEmail);
    },
    async updateUser({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.updateUser,
          variables: {
            user: {
              nickname: payload.nickname,
              githubUrl: payload.githubUrl,
              blogUrl: payload.blogUrl,
            },
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        commit("setUpdateUserCheck", result.data.updateUser);
      }
    },
  },
};
