<template>
  <b-container>
    <br>
    <userForm :user="user"/>
  </b-container>
</template>

<script>
import UserForm from '@/components/manage/UserForm.vue';

export default {
  name: 'ManageUser',
  components: {
    UserForm,
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
    user() {
      return this.$store.state.users.users.find(x => x.id === +this.id);
    },
  },
};
</script>
