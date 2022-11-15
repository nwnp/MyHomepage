export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async updatePost({ commit }, payload) {
      console.log(payload.title, payload.content, payload.apollo);
    },
  },
};
