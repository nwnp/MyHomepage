import { Mutation } from "@/apollo/mutation/mutations.js";

export default {
  state: {
    user: {},
  },
  getters: {
    getUser: (state) => state.user,
  },
  mutations: {
    setUser(state, payload) {
      state.user = { ...payload };
    },
  },
  actions: {
    async Login({ commit }, user) {
      localStorage.setItem("user", JSON.stringify(user));
      commit("setUser", user);
    },
  },
};
