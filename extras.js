import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loading: true,
    adding: false,
    extras: [
      // {
      //   id: 1,
      //   title: 'Test Title',
      //   // eslint-disable-next-line
      //   img: 'https://images.unsplash.com/photo-1534844624972-72af3082566e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0d231b116fd868277d1e13e6cc55da2c&auto=format&fit=crop&w=1951&q=80',
      //   text: 'Test block of text to fill the space in a card',
      //   buttonText: 'Click here',
      //   buttonLink: 'https://cpu.taleo.net/careersection/in/jobsearch.ftl',
      // },
      // {
      //   id: 2,
      //   // title: 'Test Title',
      //   // eslint-disable-next-line
      //   img: 'https://i.gifer.com/J4o.gif',
      //   // text: 'Test block of text to fill the space in a card',
      //   // buttonText: 'Click here',
      //   // buttonLink: 'https://cpu.taleo.net/careersection/in/jobsearch.ftl'
      // },
      // {
      //   id: 3,
      //   title: 'Test Title',
      //   // eslint-disable-next-line
      //   // img: 'https://i.gifer.com/J4o.gif',
      //   text: 'Test block of text to fill the space in a card',
      //   buttonText: 'Click here',
      //   buttonLink: 'https://cpu.taleo.net/careersection/in/jobsearch.ftl',
      // },
      // {
      //   id: 4,
      //   title: 'Test Title',
      //   // eslint-disable-next-line
      //   img: 'https://i.gifer.com/J4o.gif',
      //   text: 'Test block of text to fill the space in a card',
      //   buttonText: 'Click here',
      //   buttonLink: 'https://cpu.taleo.net/careersection/in/jobsearch.ftl',
      // },
      // {
      //   id: 5,
      //   title: 'Test Title',
      //   // eslint-disable-next-line
      //   img: 'https://i.gifer.com/J4o.gif',
      //   text: 'Test block of text to fill the space in a card',
      //   buttonText: 'Click here',
      //   buttonLink: 'https://cpu.taleo.net/careersection/in/jobsearch.ftl',
      // },
      // {
      //   id: 6,
      //   title: 'Test Title',
      //   // eslint-disable-next-line
      //   img: 'https://i.gifer.com/J4o.gif',
      //   text: 'Test block of text to fill the space in a card',
      //   buttonText: 'Click here',
      //   buttonLink: 'https://cpu.taleo.net/careersection/in/jobsearch.ftl',
      // },
      // {
      //   id: 7,
      //   title: 'Test Title',
      //   // eslint-disable-next-line
      //   img: 'https://i.gifer.com/J4o.gif',
      //   text: 'Test block of text to fill the space in a card',
      //   buttonText: 'Click here',
      //   buttonLink: 'https://cpu.taleo.net/careersection/in/jobsearch.ftl',
      // },
      // {
      //   id: 8,
      //   title: 'Test Title',
      //   // eslint-disable-next-line
      //   img: 'https://i.gifer.com/J4o.gif',
      //   text: 'Test block of text to fill the space in a card',
      //   buttonText: 'Click here',
      //   buttonLink: 'https://cpu.taleo.net/careersection/in/jobsearch.ftl',
      // },
      // {
      //   id: 9,
      //   title: 'Test Title',
      //   // eslint-disable-next-line
      //   img: 'https://i.gifer.com/J4o.gif',
      //   text: 'Test block of text to fill the space in a card',
      //   buttonText: 'Click here',
      //   buttonLink: 'https://cpu.taleo.net/careersection/in/jobsearch.ftl',
      // },
    ],
  },
  mutations: {
    updateExtras(state, extras) {
      state.extras = extras;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
    updateAdding(state, value) {
      state.adding = value;
    },
    addExtra(state, extra) {
      state.extras.push(extra);
    },
    deleteExtra(state, index) {
      state.extras.splice(index, 1);
    },
  },
  actions:
  {
    async getExtras({ commit }) {
      const result = await Api.http.get('/api/extras');
      commit('updateExtras', result.data);
      commit('updateLoading', false);
    },
    async deleteExtra({ commit, state }, id) {
      const index = await state.extras.findIndex(e => e.id === id);
      try {
        await Api.http.delete(`/api/extras/${id}`);
      } catch (error) {
        Api.notify.alert('Error deleting extra post');
      }
      commit('deleteExtra', index);
    },
    async addExtra({ commit }, extra) {
      commit('updateAdding', true);
      try {
        const result = await Api.http.post('/api/extras', extra);
        commit('addExtra', result.data);
        commit('updateAdding', false);
      } catch (error) {
        Api.notify.alert('Error adding extra post');
        commit('updateAdding', false);
      }
    },
  },
  getters: {
  },
};
