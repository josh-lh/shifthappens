<template>
    <div>
      <br/>
      <AddUser />
      <br>
      <UsersTable />
    </div>
</template>

<script>
import UsersTable from '@/components/manage/UsersTable.vue';
import AddUser from '@/components/manage/AddUser.vue';

export default {
  components: {
    UsersTable,
    AddUser,
  },
};
</script>
