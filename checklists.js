import Api from '@/services/Api';

export default {
  namespaced: true,
  state: {
    loading: false,
    checklists: [],
    checks: [],
    addingCheck: false,
    newCheck: {
      name: '',
      description: '',
      startTime: '',
      endTime: '',
      region: '',
    },
  },
  mutations: {
    updateChecklists(state, checklists) {
      state.checklists = checklists;
    },
    updateChecks(state, checks) {
      state.checks = checks;
    },
    updateLoading(state, value) {
      state.loading = value;
    },
    updateAddingCheck(state, value) {
      state.addingCheck = value;
    },
    updateCheck(state, { index, check }) {
      state.checks[index] = check;
    },
    addCheck(state, check) {
      state.checks.push(check);
    },
    addChecklist(state, checklist) {
      state.checklists.push(checklist);
    },
    updateChecklist(state, { index, checklist }) {
      state.checklists[index] = checklist;
    },
    deleteCheck(state, index) {
      state.checks.splice(index, 1);
    },
  },
  actions:
  {
    async getChecklists({ commit }) {
      try {
        const result = await Api.http.get('/api/checklists');
        commit('updateChecklists', result.data);
        commit('updateLoading', false);
      } catch (error) {
        Api.notify.alert('Issue getting checklists');
        commit('updateLoading', false);
      }
    },
    async getChecks({ commit }) {
      try {
        const result = await Api.http.get('/api/checks');
        commit('updateChecks', result.data);
        commit('updateLoading', false);
      } catch (error) {
        Api.notify.alert('Issue getting checks');
        commit('updateLoading', false);
      }
    },
    async updateCheck({ commit, state }, check) {
      const index = state.checks.findIndex(u => u.id === check.id);
      const prevCheck = state.checks[index];
      try {
        commit('updateCheck', { index, check });
        await Api.http.put(`/api/checks/${check.id}`, check);
        Api.notify.success('Updated Check');
        return check;
      } catch (error) {
        Api.notify.alert('Issue updating check');
      }
      check = prevCheck;
      commit('updateCheck', { index, check });
      return check;
    },
    async addCheck({ commit }, check) {
      commit('updateAddingCheck', true);
      try {
        await Api.http.post('/api/checks', check);
        commit('addCheck', check);
        commit('updateAddingCheck', false);
        Api.notify.success('Added Check');
      } catch (error) {
        Api.notify.alert(error);
        commit('updateAddingCheck', false);
      }
    },
    async deleteCheck({ commit, state }, check) {
      const i = state.checks.map(c => c.id).indexOf(check.id);
      try {
        await Api.http.delete(`/api/checks/${check.id}`);
        commit('deleteCheck', i);
        Api.notify.success('Deleted Check');
      } catch (error) {
        Api.notify.alert(error);
      }
    },
    async addChecklist({ commit }, name) {
      const checklist = {
        shiftPeriod: name,
        date: new Date(),
        completed: false,
      };
      try {
        const result = await Api.http.post('/api/checklists', checklist);
        commit('addChecklist', result.data);
        Api.notify.success('Added Checklist');
      } catch (error) {
        Api.notify.alert('Issue adding new checklist');
      }
    },
    async updateChecklist({ commit }, { checklist, index }) {
      try {
        await Api.http.put(`/api/checklists/${checklist.id}`, checklist);
        commit('updateChecklist', { index, checklist });
      } catch (error) {
        Api.notify.alert('Issue updating checklist');
      }
    },
    async updateChecklistCheck({ commit, state, dispatch }, { checklistCheck, checklist }) {
      const clindex = await state.checklists.findIndex(c => c.id === checklist.id);
      const cindex = checklist.checks.findIndex(ch => ch.id === checklistCheck.id);
      checklist.checks[cindex] = checklistCheck;
      try {
        commit('updateChecklist', { clindex, checklist });
        await Api.http.put(`/api/checklistchecks/${checklistCheck.id}`, checklistCheck);
        const unchecked = checklist.checks.filter(x => !x.completed);
        if (!unchecked.length) {
          checklist.completed = true;
          await dispatch('updateChecklist', { checklist, clindex });
        }
      } catch (error) {
        Api.notify.alert('Issue updating check');
      }
    },
  },
  getters: {
    orderedCheckLists(state) {
      return state.checklists.sort((a, b) => {
        if (a.date < b.date) { return -1; }
        if (a.date > b.date) { return 1; }
        return 0;
      });
    },
  },
};
