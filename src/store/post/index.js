import { Mutation } from "@/apollo/mutation/mutations";
import { getCookie } from "@/functions/getCookie";

export default {
  state: {
    updateCheck: false,
    deleteCheck: false,
    postCommentCheck: false,
  },
  getters: {
    updateCheck: (state) => state.updateCheck,
    deleteCheck: (state) => state.deleteCheck,
    postCommentCheck: (state) => state.postCommentCheck,
  },
  mutations: {
    setUpdateCheck(state, bool) {
      state.updateCheck = bool;
    },
    setDeleteCheck(state, bool) {
      state.deleteCheck = bool;
    },
    setPostCommentCheck(state, bool) {
      state.postCommentCheck = bool;
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

    async deletePost({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.deletePost,
          variables: {
            id: payload.PostId,
          },
        });
      } catch (error) {
        console.log(error);
        commit("setDeleteCheck", false);
        return;
      }
      commit("setDeleteCheck", result.data.deletePost);
    },

    async registerPostComment({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.registerPostComment,
          variables: {
            post: {
              UserId: getCookie("userId"),
              PostId: payload.PostId,
              comment: payload.comment,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        console.log(result);
        commit("setPostCommentCheck", result.data.registerPostComment);
      }
    },
  },
};