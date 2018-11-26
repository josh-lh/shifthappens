import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loading: true,
    events: [
    ],
    eventTypes: [
    ],
  },
  mutations: {
    updateEvents(state, events) {
      state.events = events;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
    updateEventTypes(state, eventType) {
      state.eventTypes.push(eventType);
    },
  },
  actions:
  {
    async getEvents({ commit }) {
      try {
        const result = await Api.http.get('/api/events');
        commit('updateEvents', result.data);
      } catch (error) {
        Api.notify.alert(error.message);
      }
      commit('updateLoading', false);
    },
    async postEvents({ commit, state }, data) {
      try {
        const result = await Api.http.post('/api/events', data);
        Api.notify.success('Events have been created.');

        if (result.data instanceof Array) {
          const newEvents = state.events.concat(result.data);
          commit('updateEvents', newEvents);
        } else {
          commit('updateEvents', state.events.push(result.data));
        }
        return true;
      } catch (error) {
        Api.notify.alert(error.message);
      }
      return false;
    },
    async postEventType({ commit }, data) {
      try {
        const result = await Api.http.post('/api/eventtypes', data);
        commit('updateEventTypes', result.data);
        return result.data;
      } catch (error) {
        Api.notify.alert(error.message);
      }
      return null;
    },
  },
  getters: {
    allEvents(state) {
      return state.events;
    },
  },
};
