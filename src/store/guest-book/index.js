import { Mutation } from "@/apollo/mutation/mutations";

export default {
  state: {
    registerCheck: false,
    deleteCheck: false,
    comment: "",
  },
  getters: {
    comment: (state) => state.comment,
    commentRegisterCheck: (state) => state.registerCheck,
    commentDeleteCheck: (state) => state.deleteCheck,
  },
  mutations: {
    setComment(state, comment) {
      state.comment = comment;
    },
    setRegisterCheck(state, bool) {
      state.registerCheck = bool;
    },
    setDeleteCheck(state, bool) {
      state.deleteCheck = bool;
    },
  },
  actions: {
    async registerComment({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.registerComment,
          variables: {
            commentInfo: {
              UserId: payload.UserId,
              secret: payload.secret,
              comment: payload.comment,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setRegisterCheck", result.data.registerComment);
      }
    },
    async deleteComment({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.deleteComment,
          variables: {
            commentInfo: {
              id: payload.commentId,
              commentedUserId: payload.commentedUserId,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setDeleteCheck", result.data.deleteComment);
      }
    },
  },
};
