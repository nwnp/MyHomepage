import { Mutation } from "@/apollo/mutation/mutations";

export default {
  state: {
    feedbackRegisterCheck: false,
  },
  getters: {
    feedbackRegisterCheck: (state) => state.feedbackRegisterCheck,
  },
  mutations: {
    setFeedbackRegisterCheck(state, bool) {
      state.feedbackRegisterCheck = bool;
    },
  },
  actions: {
    async registerFeedback({ commit }, payload) {
      let result = "";
      try {
        result = await payload.apollo.mutate({
          mutation: Mutation.registerFeedback,
          variables: {
            feedback: {
              title: payload.title,
              content: payload.content,
              UserId: ~~payload.UserId,
            },
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        commit("setFeedbackRegisterCheck", result.data.registerFeedback);
      }
    },
  },
};
