import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loading: true,
    users: [
    ],
    currentUser: null,
    updating: false,
    adding: false,
    deleting: false,
  },
  mutations: {
    updateCurrentUser(state, user) {
      state.currentUser = user;
    },
    updateUsers(state, users) {
      state.users = users;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
    updateUpdating(state, value) {
      state.updating = value;
    },
    updateAdding(state, value) {
      state.adding = value;
    },
    updateDeleting(state, value) {
      state.deleting = value;
    },
    updateUser(state, { index, user }) {
      state.users[index] = user;
    },
    addUser(state, user) {
      state.users.push(user);
    },
    deleteUser(state, index) {
      state.users.splice(index, 1);
    },
    addScore(state, { index, score }) {
      state.users[index].qaScores.push(score);
    },
    deleteScore(state, { index, sindex }) {
      state.users[index].qaScores.splice(sindex, 1);
    },
  },
  actions:
  {
    async signIn({ commit, state, dispatch }, user) {
      await dispatch('getUsers');
      const newUser = state.users.find(x => x.adId.toLowerCase()
       === user.unique_name.toLowerCase());
      if (newUser) {
        commit('updateCurrentUser', newUser);
      }
    },
    async getUsers({ commit }) {
      try {
        const result = await Api.http.get('/api/users');
        const users = result.data.map(x => (x.team ? x : { ...x, team: {} }));
        commit('updateUsers', users);
        commit('updateLoading', false);
      } catch (error) {
        Api.notify.alert('Issue getting users');
        commit('updateLoading', false);
      }
    },
    async addUser({ commit }, user) {
      commit('updateAdding', true);
      try {
        const result = await Api.http.post('/api/users', user);
        commit('addUser', { ...user, id: result.id });
        commit('updateAdding', false);
        Api.notify.success('User added!');
      } catch (error) {
        Api.notify.alert('Issue adding users');
        commit('updateAdding', false);
      }
    },
    async updateUser({ commit, state }, user) {
      commit('updateUpdating', true);
      const index = await state.users.findIndex(u => u.id === user.id);
      try {
        await Api.http.put(`/api/users/${user.id}`, user);
        Api.notify.success('Updated User');
      } catch (error) {
        commit('updateUpdating', false);
        Api.notify.alert('Issue updating user');
      }
      commit('updateUser', { index, user });
      commit('updateUpdating', false);
    },
    async deleteUser({ commit, state }, id) {
      commit('updateDeleting', true);
      const index = await state.users.findIndex(u => u.id === id);
      try {
        await Api.http.delete(`/api/users/${id}`);
        Api.notify.success('Deleted User');
      } catch (error) {
        commit('updateDeleting', false);
        Api.notify.alert('Issue deleting user');
      }
      commit('deleteUser', index);
      commit('updateDeleting', false);
    },
    async updateUserDetails({ commit, state }, user) {
      commit('updateUpdating', true);
      const index = await state.users.findIndex(u => u.id === user.id);
      try {
        await Api.http.put(`/api/userDetails/${user.userDetails.id}`, user.userDetails);
        Api.notify.success('Updated User Details');
      } catch (error) {
        commit('updateUpdating', false);
        Api.notify.alert('Issue updating user details');
      }
      commit('updateUser', { index, user });
      commit('updateUpdating', false);
    },
    async addQAScore({ commit, state }, score) {
      commit('updateUpdating', true);
      const index = await state.users.findIndex(u => u.id === score.userId);
      try {
        await Api.http.post('/api/QAScores/', score);
        Api.notify.success('Added Score');
      } catch (error) {
        commit('updateUpdating', false);
        Api.notify.alert('Issue adding new score');
      }
      commit('addScore', { index, score });
      commit('updateUpdating', false);
    },
    async deleteQAScore({ commit, state }, score) {
      const index = await state.users.findIndex(u => u.id === score.userId);
      const sindex = await state.users[index].qaScores.findIndex(s => s.id === score.id);
      try {
        await Api.http.delete(`/api/QAScores/${score.id}`);
        Api.notify.success('Deleted Score');
      } catch (error) {
        Api.notify.alert('Issue deleting score');
      }
      commit('deleteScore', { index, sindex });
    },
  },
  getters: {
    teamMembers(state) {
      if (state.currentUser && state.currentUser.team) {
        return state.users.filter(item => item.team
          && item.team.name === state.currentUser.team.name);
      }
      return [];
    },
    allMembers(state) {
      return state.users;
    },
    getUserById: state => id => state.users.find(user => user.id === id),
    currentUser(state) {
      return state.users.currentUser;
    },
  },
};
