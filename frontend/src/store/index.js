import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import user from './modules/user';
import event from './modules/event';
import targets from './modules/targets';

export default createStore({
  modules: {
    user,
    event,
    targets,
  },
  plugins: [
    createPersistedState({
      paths: [
        'user',
        'targets',
      ],
    }),
  ],
});
