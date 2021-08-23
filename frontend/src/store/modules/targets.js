export default {
  namespaced: true,
  state: () => ({
    list: [],
    finished: false,
  }),
  mutations: {
    setTargets(state, payload) {
      state.list = payload;
    },
    removeTarget(state, payload) {
      state.list = state.list.filter(listItem => listItem.id !== payload);
      if (state.list.length === 0) {
        state.finished = true;
      }
    },
  },
  actions: {
    setTargets({ commit }, data) {
      commit('setTargets', data);
    },
    removeTarget({ commit }, data) {
      commit('removeTarget', data);
    },
  },
};
