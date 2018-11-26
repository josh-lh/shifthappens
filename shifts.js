import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    shifts: [],
    adding: false,
    added: false,
  },
  mutations: {
    updateShifts(state, shifts) {
      state.shifts = shifts;
    },
    pushShift(state, shift) {
      state.shifts.push(shift);
    },
    updateAdding(state, value) {
      state.adding = value;
    },
    updateAdded(state, value) {
      state.added = value;
    },
  },
  actions: {
    async getShifts({ commit }) {
      const result = await Api.http.get('/api/shifts');
      commit('updateShifts', result.data);
    },
    async addShift({ commit }, shift) {
      commit('updateAdded', false);
      commit('updateAdding', true);
      try {
        const result = await Api.http.post('/api/shifts', shift);
        commit('pushShift', result.data);
        Api.notify.success('Shift created!');
        commit('updateAdded', true);
        commit('updateAdding', false);
      } catch (error) {
        Api.notify.alert('Shift was not created');
        commit('updateAdding', false);
      }
    },
  },
};
