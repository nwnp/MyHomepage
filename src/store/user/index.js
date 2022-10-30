import { Mutation } from "@/apollo/mutation/mutations.js";

export default {
  state: {
    user: {
      id: "",
      email: "",
      token: "",
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
  mutations: {
    setUser(state, payload) {
      state.user = {
        id: "1",
        email: payload.email,
        token: "token",
      };
    },
  },
  actions: {
    async Login({ commit }, user) {
      localStorage.setItem("user", JSON.stringify(user));
      commit("setUser", user);
    },
    async Signup({ commit }, user, apollo) {
      const result = await apollo.mutate({
        mutation: Mutation.signup,
        variables: {
          ...user,
        },
      });
      console.log(result);
    },
  },
};
