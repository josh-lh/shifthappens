import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loading: false,
    handoverTickets: [
    ],
  },
  mutations: {
    updateHandoverTickets(state, handoverTickets) {
      state.handoverTickets = handoverTickets;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
    addHandoverTickets(state, handoverTickets) {
      state.handoverTickets.push(handoverTickets);
    },
  },
  actions:
  {
    async getHandoverTickets({ commit }) {
      const result = await Api.http.get('/api/handovertickets');
      commit('updateHandoverTickets', result.data);
      commit('updateLoading', false);
    },
    async addHandoverTickets({ commit }, handoverTickets) {
      await Api.http.post('/api/handovertickets', handoverTickets);
      commit('addHandoverTickets', handoverTickets);
    },
  },

  getters: {
    allEvents(state) {
      return state.events;
    },
  },
};
