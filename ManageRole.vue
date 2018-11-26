<template>
  <b-container>
    <br>
    <roleForm v-if="role" :role="role"/>
  </b-container>
</template>

<script>
import RoleForm from '@/components/manage/RoleForm.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ManageRole',
  created() {
    this.getRoles();
  },
  components: {
    RoleForm,
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  computed: {
    role() {
      return this.$store.state.roles.roles.find(x => x.id === +this.id);
    },
  },
  methods: {
    ...mapActions('roles', ['getRoles']),
  },
};
</script>
