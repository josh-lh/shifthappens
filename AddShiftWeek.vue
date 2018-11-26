<template>
  <b-form>
    <br />
    <h4 text-center>Choose Shifts for Week {{weekCount}} </h4>
    <br />
    <b-input-group v-for="(day) in value.days" :key="day.number" v-if="weekCount > 0">
    <b-input-group-prepend>
        <b-btn class="btn-weekDay-adjust" variant="cshare-alt">{{day.name}}</b-btn>
      </b-input-group-prepend>
      <b-form-select inline :options="shiftTypesMapped"
        v-model="value.shiftPatternSelected[day.number-1 + ((weekCount - 1) * 7)]" />
    </b-input-group>
     <br/>
        <br/>
    </b-form>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    value: {      
    },
    weekCount: {
      type: Number,
    },
  },
  data() {
    return {
      days: [
        { name: 'Monday',
          number: 1
        },
        { name: 'Tuesday',
          number: 2
        },
        { name: 'Wednesday',
          number: 3
        },
        { name: 'Thursday',
          number: 4
        },
        { name: 'Friday',
          number: 5
        },
        { name: 'Saturday',
          number: 6
        },
        { name: 'Sunday',
          number: 7
        },
      ]
    };
  },
  computed: {
    shiftTypesMapped() {
      const shiftTypes = this.value.shiftTypes
        .map(x => ({ value: x, text: `${x.name} (${x.startTime} - ${x.endTime})` }));
      shiftTypes.push({ value: null, text: 'No Shift.' });
      return shiftTypes;
    },
  },
  methods: {  
  },
};
</script>

<style>
  .btn-weekDay-adjust{
    width:120px;
    text-align: justify;
  }
</style>
