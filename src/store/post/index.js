import { Mutation } from "@/apollo/mutation/mutations";
import { getCookie } from "@/functions/getCookie";

export default {
  state: {
    updateCheck: false,
    deleteCheck: false,
    registerCheck: false,
    postCommentRegisterCheck: false,
    postCommentDeleteCheck: false,
    postCommentUpdateCheck: false,
    postModal: false,
  },
  getters: {
    registerCheck: (state) => state.registerCheck,
    updateCheck: (state) => state.updateCheck,
    deleteCheck: (state) => state.deleteCheck,
    postCommentRegisterCheck: (state) => state.postCommentRegisterCheck,
    postCommentDeleteCheck: (state) => state.postCommentDeleteCheck,
    postCommentUpdateCheck: (state) => state.postCommentUpdateCheck,
  },
  mutations: {
    setRegisterCheck(state, bool) {
      state.registerCheck = bool;
    },
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
    async registerPost({ commit }, payload) {
      try {
        await payload.apollo.mutate({
          mutation: Mutation.registerPost,
          variables: {
            post: {
              title: payload.title,
              content: payload.content,
              UserId: ~~payload.UserId,
            },
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        commit("setRegisterCheck", true);
      }
    },
    async updatePost({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.updatePost,
          variables: {
            post: {
              PostId: payload.PostId,
              title: payload.title,
              content: payload.content,
              UserId: payload.UserId,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setUpdateCheck", result.data.updatePost);
      }
    },

    async deletePost({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.deletePost,
          variables: {
            post: {
              postId: payload.postId,
              UserId: payload.UserId,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setDeleteCheck", result.data.deletePost);
      }
    },

    async registerPostComment({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.registerPostComment,
          variables: {
            post: {
              UserId: ~~payload.UserId,
              PostId: ~~payload.PostId,
              comment: payload.comment,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
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
