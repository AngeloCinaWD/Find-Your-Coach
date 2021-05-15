export default {
  requests(state, _getters, _rootState, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter(request => request.coachId === coachId); // filtro le richieste per coach
  },
  hasRequests(_state, getters) {
    // return state.requests && state.requests.length > 0;
    return getters.requests && getters.requests.length > 0; // devo validare le richieste filtrate non più quelle generali
  }
};
