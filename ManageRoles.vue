<template>
    <div>
      <br/>
      <AddRole />
      <br>
      <RolesTable />
    </div>
</template>

<script>
import RolesTable from '@/components/manage/RolesTable.vue';
import AddRole from '@/components/manage/AddRole.vue';

export default {
  components: {
    RolesTable,
    AddRole,
  },
};
</script>
