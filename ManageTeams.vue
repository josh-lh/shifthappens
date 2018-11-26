<template>
     <div>
      <br/>
      <AddTeam />
      <br>
      <TeamsTable />
    </div>
</template>

<script>
import TeamsTable from '@/components/manage/TeamsTable.vue';
import AddTeam from '@/components/manage/AddTeam.vue';

export default {
  name: 'ManageTeams',
  components: {
    TeamsTable,
    AddTeam,
  },
};
</script>
