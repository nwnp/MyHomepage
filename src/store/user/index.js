export default {
  state: {
    user: {
      token: "",
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
  mutations: {
    setUser(state, token) {
      state.user.token = token;
    },
  },
  actions: {
    async Login({ commit }, token) {
      const { accessToken, refreshToken } = token.data.login;
      let date = new Date(Date.now() + 7200e3);
      date = date.toUTCString();
      sessionStorage.setItem("refreshToken", refreshToken);
      document.cookie = `token=${accessToken};path=/;expires=${date}`;
      document.cookie = `test=test`;
      commit("setUser", accessToken);
    },
  },
};
