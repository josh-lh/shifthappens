import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    shiftTypes: [],
  },
  mutations: {
    updateShiftTypes(state, shiftTypes) {
      state.shiftTypes = shiftTypes;
    },
    addShiftType(state, shiftType) {
      state.shiftTypes.push(shiftType);
    },
  },
  actions: {
    async getShiftTypes({ commit }) {
      const result = await Api.http.get('/api/shiftTypes');
      commit('updateShiftTypes', result.data);
    },
    async addNewShiftType({ commit }, shiftType) {
      try {
        const result = await Api.http.post('/api/ShiftTypes', shiftType);
        commit('addShiftType', result.data);
        Api.notify.success('Shift type created.');
        return result;
      } catch (error) {
        Api.notify.alert('Error creating shift type');
        return null;
      }
    },
  },
};
