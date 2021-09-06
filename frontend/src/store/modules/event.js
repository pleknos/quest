export default {
  namespaced: true,
  state: () => ({
    isStarted: false,
  }),
  mutations: {
    setStarted(state, payload) {
      state.isStarted = payload;
    },
  },
  actions: {
    setStarted({ commit }, data) {
      commit('setStarted', data);
    },
  },
};
