import { Mutation } from "@/apollo/mutation/mutations";

export default {
  state: {
    tilCommentRegisterCheck: false,
    tilCommentDeleteCheck: false,
    tilCommentUpdateCheck: false,
    tilRegisterCheck: false,
    tilDeleteCheck: false,
    tilUpdateCheck: false,
  },
  getters: {
    tilCommentRegisterCheck: (state) => state.tilCommentRegisterCheck,
    tilCommentDeleteCheck: (state) => state.tilCommentDeleteCheck,
    tilCommentUpdateCheck: (state) => state.tilCommentUpdateCheck,
    tilRegisterCheck: (state) => state.tilRegisterCheck,
    tilDeleteCheck: (state) => state.tilDeleteCheck,
    tilUpdateCheck: (state) => state.tilUpdateCheck,
  },
  mutations: {
    setTilCommentRegisterCheck(state, bool) {
      state.tilCommentRegisterCheck = bool;
    },
    setTilCommentDeleteCheck(state, bool) {
      state.tilCommentDeleteCheck = bool;
    },
    setTilCommentUpdateCheck(state, bool) {
      state.tilCommentUpdateCheck = bool;
    },
    setTilRegisterCheck(state, bool) {
      state.tilRegisterCheck = bool;
    },
    setTilDeleteCheck(state, bool) {
      state.tilDeleteCheck = bool;
    },
    setTilUpdateCheck(state, bool) {
      state.tilUpdateCheck = bool;
    },
  },
  actions: {
    async registerTilComment({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.registerTilComment,
          variables: {
            til: {
              TilId: ~~payload.TilId,
              UserId: ~~payload.UserId,
              til_comment: payload.til_comment,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setTilCommentRegisterCheck", result.data.registerTilComment);
      }
    },
    async deleteTilComment({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.deleteTilComment,
          variables: {
            til: {
              id: ~~payload.id,
              CommentedUserId: ~~payload.CommentedUserId,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setTilCommentDeleteCheck", result.data.deleteTilComment);
      }
    },
    async updateTilComment({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.updateTilComment,
          variables: {
            til: {
              id: ~~payload.id,
              CommentedUserId: ~~payload.CommentedUserId,
              til_comment: payload.til_comment,
            },
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        commit("setTilCommentUpdateCheck", result.data.updateTilComment);
      }
    },
    async registerTil({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.registerTil,
          variables: {
            til: {
              title: payload.title,
              til_content: payload.content,
              UserId: ~~payload.UserId,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setTilRegisterCheck", result.data.registerTil);
      }
    },
    async deleteTil({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.deleteTil,
          variables: {
            til: {
              UserId: payload.UserId,
              tilId: payload.tilId,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setTilDeleteCheck", result.data.deleteTil);
      }
    },
    async updateTil({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.updateTil,
          variables: {
            til: {
              title: payload.title,
              til_content: payload.til_content,
              UserId: payload.UserId,
              tilId: payload.tilId,
            },
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        commit("setTilUpdateCheck", result.data.updateTil);
      }
    },
  },
};
