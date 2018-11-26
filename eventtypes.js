import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loading: true,
    eventTypes: [
    ],
  },
  mutations: {
    updateEventTypes(state, eventTypes) {
      state.eventTypes = eventTypes;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
  },
  actions:
  {
    async getEventTypes({ commit }) {
      try {
        const result = await Api.http.get('/api/eventtypes');
        commit('updateEventTypes', result.data);
      } catch (error) {
        Api.notify.alert(error.message);
      }
      commit('updateLoading', false);
    },
    async postEventType({ commit, state }, data) {
      try {
        const result = await Api.http.post('/api/eventtypes', data);
        const resultData = state.eventTypes.concat(result.data);
        commit('updateEventTypes', resultData);
        return resultData;
      } catch (error) {
        Api.notify.alert(error.message);
      }
      return null;
    },
  },
  getters: {
    allEventTypes(state) {
      return state.events;
    },
  },
};
