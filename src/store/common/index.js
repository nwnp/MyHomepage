export default {
  state: {
    footerType: false,
  },
  getters: {
    footerType: (state) => state.footerType,
  },
  mutations: {
    setFooterType(state, payload) {
      state.footerType = payload;
    },
  },
};
