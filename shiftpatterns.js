import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    shiftPatterns: [],
    creating: false,
    createdSuccess: false,
  },
  mutations: {
    updateShiftPatterns(state, shiftPatterns) {
      state.shiftPatterns = shiftPatterns;
    },
    addShiftPattern(state, shiftPattern) {
      state.shiftPatterns.push(shiftPattern);
    },
    updateCreating(state, value) {
      state.creating = value;
    },
    updateCreatedSuccess(state, value) {
      state.createdSuccess = value;
    },
  },
  actions: {
    async getShiftPatterns({ commit }) {
      const result = await Api.http.get('/api/ShiftPatterns');
      commit('updateShiftPatterns', result.data);
    },
    async addShiftPattern({ commit }, pattern) {
      commit('updateCreating', true);
      try {
        const result = await Api.http.post('/api/ShiftPatterns', pattern);
        commit('addShiftPattern', result.data);
        Api.notify.success('Shift pattern created!');
        commit('updateCreatedSuccess', true);
        commit('updateCreating', false);
      } catch (error) {
        Api.notify.alert(error);
        commit('updateCreatedSuccess', false);
        commit('updateCreating', false);
      }
    },
  },
};
