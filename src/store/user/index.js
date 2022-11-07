import { Mutation } from "@/apollo/mutation/mutations";
import jwtDecode from "jwt-decode";

export default {
  state: {
    user: {
      token: "",
      userId: "",
    },
    loginCheck: false,
  },
  getters: {
    getUser: (state) => state.user,
    loginCheck: (state) => state.loginCheck,
  },
  mutations: {
    setUser(state, payload) {
      state.user = { ...payload };
    },
    setLoginCheck(state, bool) {
      state.loginCheck = bool;
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

      const { accessToken, refreshToken } = token.data.login;
      let date = new Date(Date.now() + 7200e3);
      date = date.toUTCString();
      sessionStorage.setItem("refreshToken", refreshToken);
      const { id } = jwtDecode(accessToken);
      document.cookie = `token=${accessToken};path=/;expires=${date}`;
      document.cookie = `userId=${id}`;
      commit("setLoginCheck", true);
      commit("setUser", {
        accessToken,
        userId: id,
      });
    },
    async Logout({ commit }, payload) {
      console.log(payload);
    },
  },
};
