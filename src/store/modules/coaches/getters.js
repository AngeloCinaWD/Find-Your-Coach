export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0; // restituisce vero se c'è almeno un coach, mi serve per visualizzare o non la lista dei coaches
  },
  isCoach(_state, getters, _rootState, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;

    if (!lastFetch) {
      return true;
    }
    const currentFetch = new Date().getTime();

    // console.log(lastFetch, currentFetch);

    return (currentFetch - lastFetch) / 1000 > 60; // voglio sapere se è vero che è passato più di un minuto dall'ultimo fetch
  }
};
