import { Mutation } from "@/apollo/mutation/mutations";
import { getCookie } from "@/functions/getCookie";

export default {
  state: {
    updateCheck: false,
  },
  getters: {
    updateCheck: (state) => state.updateCheck,
  },
  mutations: {
    setUpdateCheck(state, bool) {
      state.updateCheck = bool;
    },
  },
  actions: {
    async updatePost({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.updatePost,
          variables: {
            post: {
              UserId: getCookie("userId"),
              PostId: payload.PostId,
              title: payload.title,
              content: payload.content,
            },
          },
        });
      } catch (error) {
        console.log(error);
        commit("setUpdateCheck", false);
        return;
      }
      commit("setUpdateCheck", result.data.updatePost);
    },
  },
};
