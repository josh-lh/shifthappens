import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loading: false,
    handovers: [
    ],
  },
  mutations: {
    updateHandover(state, handovers) {
      state.handovers = handovers;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
    addHandover(state, handover) {
      state.handovers.push(handover);
    },
  },
  actions:
  {
    async getHandovers({ commit }) {
      const result = await Api.http.get('/api/handover');
      commit('updateHandover', result.data);
      commit('updateLoading', false);
    },
    async addHandovers({ commit }, handover) {
      await Api.http.post('/api/handover', handover);
      commit('addHandover', handover);
    },
  },

  getters: {
    allEvents(state) {
      return state.events;
    },
  },
};
