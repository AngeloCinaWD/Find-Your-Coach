import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      // userId: 'c1'
      token: null,
      userId: null,
      // tokenExpiration: null,
      didAutoLogout: false
    };
  },
  getters,
  mutations,
  actions
};
