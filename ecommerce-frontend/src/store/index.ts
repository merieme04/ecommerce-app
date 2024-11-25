import { createStore } from 'vuex';

export default createStore({
  state: {
    period: '7', // ou la période par défaut que tu utilises
  },
  mutations: {
    setPeriod(state, newPeriod: string) {
      state.period = newPeriod;
    },
  },
  actions: {
    changePeriod({ commit }, newPeriod: string) {
      commit('setPeriod', newPeriod);
    },
  },
  getters: {
    getPeriod: (state) => state.period,
  },
});
