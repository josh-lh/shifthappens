import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loading: false,
    thankyous: [
    ],
  },
  mutations: {
    updateThankYous(state, thankYous) {
      state.thankyous = thankYous;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
    addThankyou(state, thankyou) {
      state.thankyous.push(thankyou);
    },
  },
  actions:
  {
    async getThankYous({ commit }) {
      const result = await Api.http.get('/api/ThankYous');
      commit('updateThankYous', result.data);
      commit('updateLoading', false);
    },
    async addthankYou({ commit }, thankyou) {
      await Api.http.post('/api/ThankYous', thankyou);
      commit('addThankyou', thankyou);
    },
  },

  getters: {
    allEvents(state) {
      return state.events;
    },
  },
};
