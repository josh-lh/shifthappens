import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loading: true,
    deleting: false,
    adding: false,
    updating: false,
    roles: [],
  },
  mutations: {
    updateRoles(state, roles) {
      state.roles = roles;
    },
    updateLoading(state, value) {
      state.loading = value;
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
    addRole(state, role) {
      state.roles.push(role);
    },
    updateRole(state, { index, role }) {
      state.roles[index] = role;
    },
    deleteRole(state, index) {
      state.roles.splice(index, 1);
    },
  },
  actions:
  {
    async getRoles({ commit }) {
      const result = await Api.http.get('/api/Roles');
      commit('updateRoles', result.data);
      commit('updateLoading', false);
    },
    async addRole({ commit }, role) {
      commit('updateAdding', true);
      try {
        const result = await Api.http.post('/api/roles', role);
        commit('addRole', result.data);
        commit('updateAdding', false);
        Api.notify.success('Role added!');
      } catch (error) {
        Api.notify.alert('Issue adding role');
        commit('updateAdding', false);
      }
    },
    async updateRole({ commit, state }, role) {
      commit('updateUpdating', true);
      const index = await state.roles.findIndex(r => r.id === role.id);
      try {
        await Api.http.put(`/api/roles/${role.id}`, role);
        Api.notify.success('Updated Role');
      } catch (error) {
        commit('updateUpdating', false);
        Api.notify.alert('Issue updating role');
      }
      commit('updateRole', { index, role });
      commit('updateUpdating', false);
    },
    async deleteRole({ commit, state }, id) {
      commit('updateDeleting', true);
      const index = await state.roles.findIndex(r => r.id === id);
      try {
        await Api.http.delete(`/api/roles/${id}`);
        Api.notify.success('Deleted Role');
      } catch (error) {
        commit('updateDeleting', false);
        Api.notify.alert('Issue deleting role');
      }
      commit('deleteRole', index);
      commit('updateDeleting', false);
    },
  },
  getters: {
  },
};
