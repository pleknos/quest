export default {
  namespaced: true,
  state: () => ({
    email: '',
    password: '',

    name: '',
    phone: '',
    age: '',

    children: '',
    players: '',
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
    setPlayers(state, payload) {
      state.players = payload;
    },
    setEmail(state, payload) {
      state.email = payload;
    },
    setPassword(state, payload) {
      state.password = payload;
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
    setPlayers({ commit }, data) {
      commit('setPlayers', data);
    },
    setEmail({ commit }, data) {
      commit('setEmail', data);
    },
    setPassword({ commit }, data) {
      commit('setPassword', data);
    },
  },
};
