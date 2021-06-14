export default {
  namespaced: true,
  state: () => ({
    name: '',
    phone: '',
    age: '',
    children: '',
    adults: '',
  }),
  mutations: {
    setName(state, payload) {
      state.name = payload;
    },
    setPhone(state, payload) {
      state.phone = payload;
    },
    setAge(state, payload) {
      state.age = payload;
    },
    setChildren(state, payload) {
      state.children = payload;
    },
    setAdults(state, payload) {
      state.adults = payload;
    },
  },
  actions: {
    setName({ commit }, data) {
      commit('setName', data);
    },
    setPhone({ commit }, data) {
      commit('setPhone', data);
    },
    setAge({ commit }, data) {
      commit('setAge', data);
    },
    setChildren({ commit }, data) {
      commit('setChildren', data);
    },
    setAdults({ commit }, data) {
      commit('setAdults', data);
    },
  },
};
