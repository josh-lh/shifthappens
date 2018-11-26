import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loading: true,
    deleting: false,
    adding: false,
    updating: false,
    teams: [
    ],
  },
  mutations: {
    updateTeams(state, teams) {
      state.teams = teams;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
    updateTeam(state, { index, team }) {
      state.teams[index] = team;
    },
    updateAdding(state, value) {
      state.adding = value;
    },
    updateUpdating(state, value) {
      state.updating = value;
    },
    updateDeleting(state, value) {
      state.deleting = value;
    },
    addTeam(state, team) {
      state.teams.push(team);
    },
    deleteTeam(state, index) {
      state.teams.splice(index, 1);
    },

  },
  actions:
  {
    async getTeams({ commit }) {
      const result = await Api.http.get('/api/teams');
      commit('updateTeams', result.data);
      commit('updateLoading', false);
    },
    async updateTeam({ commit, state }, team) {
      const index = await state.teams.findIndex(t => t.id === team.id);
      commit('updateUpdating', true);
      // let data = {};
      // if (team.teamLeader) {
      //   data = {
      //     id: team.id, name: team.teamName, teamLeaderId: team.teamLeader.id, shift: team.shift,
      //   };
      // } else {
      //   data = { id: team.id, name: team.teamName, shift: team.shift };
      // }
      try {
        const request = `/api/teams/${team.id}`;
        await Api.http.put(request, team);
        commit('updateUpdating', false);
        commit('updateTeam', { index, team });
        Api.notify.success('Updated Team');
      } catch (error) {
        commit('updateUpdating', false);
        Api.notify.alert('Issue updating team details, please try again.');
      }
    },
    async updateTeamMembers({ commit, state }, team) {
      const index = await state.teams.findIndex(t => t.id === team.id);
      commit('updateTeam', { index, team });
    },
    async addTeam({ commit }, team) {
      commit('updateAdding', true);
      try {
        const result = await Api.http.post('/api/teams', team);
        commit('addTeam', result.data);
        commit('updateAdding', false);
        Api.notify.success('Team added!');
      } catch (error) {
        Api.notify.alert('Issue adding team');
        commit('updateAdding', false);
      }
    },
    async deleteTeam({ commit, state }, id) {
      commit('updateDeleting', true);
      const index = await state.teams.findIndex(t => t.id === id);
      try {
        await Api.http.delete(`/api/teams/${id}`);
        Api.notify.success('Deleted Team');
      } catch (error) {
        commit('updateDeleting', false);
        Api.notify.alert('Issue deleting team');
      }
      commit('deleteTeam', index);
      commit('updateDeleting', false);
    },
  },
  getters: {
    allTeams(state) {
      return state.teams;
    },
  },
};
