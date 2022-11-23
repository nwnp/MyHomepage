import { Mutation } from "@/apollo/mutation/mutations";
import { getCookie } from "@/functions/getCookie";

export default {
  state: {
    updateCheck: false,
    deleteCheck: false,
    postCommentRegisterCheck: false,
    postCommentDeleteCheck: false,
    postCommentUpdateCheck: false,
    postModal: false,
  },
  getters: {
    updateCheck: (state) => state.updateCheck,
    deleteCheck: (state) => state.deleteCheck,
    postCommentRegisterCheck: (state) => state.postCommentRegisterCheck,
    postCommentDeleteCheck: (state) => state.postCommentDeleteCheck,
    postCommentUpdateCheck: (state) => state.postCommentUpdateCheck,
  },
  mutations: {
    setUpdateCheck(state, bool) {
      state.updateCheck = bool;
    },
    setDeleteCheck(state, bool) {
      state.deleteCheck = bool;
    },
    setPostCommentRegisterCheck(state, bool) {
      state.postCommentRegisterCheck = bool;
    },
    setPostCommentDeleteCheck(state, bool) {
      state.postCommentDeleteCheck = bool;
    },
    setPostCommentUpdateCheck(state, bool) {
      state.postCommentUpdateCheck = bool;
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
        commit("setPostCommentRegisterCheck", result.data.registerPostComment);
      }
    },

    async deletePostComment({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.deletePostComment,
          variables: {
            post: {
              UserId: payload.UserId,
              PostId: payload.PostId,
              commentId: payload.commentId,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setPostCommentDeleteCheck", result.data.deletePostComment);
      }
    },

    async updatePostComment({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.updatePostComment,
          variables: {
            post: {
              id: payload.commentId,
              UserId: payload.UserId,
              PostId: payload.PostId,
              comment: payload.comment,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setPostCommentUpdateCheck", result.data.updatePostComment);
      }
    },
  },
};
