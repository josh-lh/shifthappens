import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    configureShiftInProgess: true,
    currentWeekTab: 0,
    loading: true,
    repeatedWeeklyCount: 0,
    shiftTypeName: '',
    shiftTypes: [],
    shiftPattern: [],
    createdShiftPattern: {},
    shiftTypesAdded: false,
  },
  mutations: {
    // addToShiftPattern(state, value) {
    //   state.shiftPattern = value;
    // },
    // resetShiftPattern(state) {
    //   state.shiftPattern = [];
    //   state.currentWeekTab = 0;
    // },
    // updateConfigureShiftInProgress(state, value) {
    //   state.configureShiftInProgess = value;
    // },
    // nextWeeklyTab(state) {
    //   state.currentWeekTab += 1;
    // },
    // previousWeeklyTab(state) {
    //   state.currentWeekTab -= 1;
    // },
    // popShiftPattern(state) {
    //   state.shiftPattern.pop();
    // },
    // spliceShiftPattern(state, index) {
    //   state.shiftPattern.splice(index, 1);
    // },
    // spliceShiftType(state, index) {
    //   state.shiftTypes.splice(index, 1);
    // },
    // // updateWeeklyCount(state, value) {
    // //   state.repeatedWeeklyCount = value;
    // // },
    // updateStartDatePicked(state, value) {
    //   state.startDatePicked = value;
    // },
    // // updateShiftTypeName(state, value) {
    // //   state.shiftTypeName = value;
    // // },
    // updateShiftTypeColour(state, value) {
    //   state.shiftTypeColour = value;
    // },
    // pushShiftTypes(state, value) {
    //   state.shiftTypes.push(value);
    // },
    // updateShiftTypes(state, value) {
    //   state.shiftTypes = value;
    // },
    // updateAddedShiftType(state, { data, index }) {
    //   state.shiftTypes[index] = data;
    // },
    // updateCreatedShiftPattern(state, data) {
    //   state.createdShiftPattern = data;
    // },
    // setShiftTypesAdded(state, value) {
    //   state.shiftTypesAdded = value;
    // },
  },
  actions:
  {
    // async setWeeklyCount({ commit }, value) {
    //   commit('updateWeeklyCount', value);
    // },
    // async setShiftTypeName({ commit }, value) {
    //   commit('updateShiftTypeName', value);
    // },
    // async addToShiftTypes({ commit }, value) {
    //   commit('setShiftTypesAdded', false);
    //   commit('pushShiftTypes', value);
    //   commit('setShiftTypesAdded', true);
    // },
    // async addToShiftPattern({ commit, state }, value) {
    //   const data = state.shiftPattern.concat(value);
    //   commit('addToShiftPattern', data);
    //   commit('nextWeeklyTab');
    // },
    // async popShiftPattern({ commit }) {
    //   commit('popShiftPattern');
    //   commit('previousWeeklyTab');
    // },
    // async spliceShiftPattern({ commit }, index) {
    //   commit('spliceShiftPattern', index);
    // },
    // async patternCompleted({ commit, state }, value) {
    //   const data = state.shiftPattern.concat(value);
    //   commit('addToShiftPattern', data);
    //   commit('updateConfigureShiftInProgress', false);
    // },
    // async reinstatePattern({ commit }) {
    //   commit('updateConfigureShiftInProgress', true);
    // },
    // async addNewShiftType({ commit, state }, shiftType) {
    //   try {
    //     commit('setShiftTypesAdded', false);
    //     commit('pushShiftTypes', shiftType);
    //     const result = await Api.http.post('/api/ShiftTypes', shiftType);
    //     const index = state.shiftTypes.findIndex(s => s.name === shiftType.name);
    //     const { data } = result;
    //     commit('updateAddedShiftType', { data, index });
    //     commit('setShiftTypesAdded', true);
    //     Api.notify.success('Shift type created.');
    //   } catch (error) {
    //     Api.notify.alert(error);
    //     const index = state.shiftTypes.findIndex(s => s.name === shiftType.name);
    //     if (index >= 0) {
    //       commit('spliceShiftType', index);
    //     }
    //   }
    //   return shiftType;
    // },
    // async addExistingShiftType({ commit }, shiftType) {
    //   commit('pushShiftTypes', shiftType);
    // },
    // async postShiftPattern({ commit }, pattern) {
    //   try {
    //     const result = await Api.http.post('/api/ShiftPatterns', pattern);
    //     commit('updateCreatedShiftPattern', result.data);
    //     Api.notify.success('Shift pattern created!');
    //     return true;
    //   } catch (error) {
    //     Api.notify.alert(error);
    //     return false;
    //   }
    // },
    // async spliceShiftType({ state }, shiftType) {
    //   const index = state.shiftTypes.findIndex(s => s.name === shiftType.name);
    //   state.shiftTypes.splice(index, index + 1);
    //   // commit('updateShiftTypes', shiftType);
    // },
    // async existingShiftTypeAdded({ commit }, value) {
    //   commit('setShiftTypesAdded', value);
    // },
    // async resetForm({ commit }) {
    //   commit('updateShiftTypes', []);
    //   commit('updateCreatedShiftPattern', {});
    //   commit('resetShiftPattern');
    // },
  },
};
