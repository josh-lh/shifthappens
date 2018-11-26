import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loadingBalances: true,
    loadingAbsences: true,
    absences: [],
    absenceBalances: [],
  },
  mutations: {
    updateBalances(state, balances) {
      state.absenceBalances = balances;
    },
    updateLoadingBalances(state, value) {
      state.loadingBalances = value;
    },
    updateAbsences(state, absences) {
      state.absences = absences;
    },
    updateLoadingAbsences(state, value) {
      state.loadingAbsences = value;
    },
  },
  actions:
  {
    async getBalances({ commit }) {
      const result = await Api.http.get('/api/absenceBalances');
      commit('updateBalances', result.data);
      commit('updateLoadingBalances', false);
    },
    async getAbsences({ commit }) {
      const result = await Api.http.get('/api/absences');
      commit('updateAbsences', result.data);
      commit('updateLoadingAbsences', false);
    },
  },
  getters: {
  },
};
