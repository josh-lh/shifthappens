<template>
  <b-card style="border-color:#6D2244;" bg-variant="light" class="tab-container">
    <div class="text-justify">
      <b-card>
        <h5 class="fancy">1. General Details for '{{value.shiftPattern.name}}'</h5>
        <br/>
          <br/>
          The pattern repeats every <b>{{value.shiftPattern.totalWeeks}} weeks</b>.
          <br/>
      </b-card>
      <br/>
      <b-card>
        <h5 class="fancy">2. Shift Types for '{{value.shiftPattern.name}}'</h5>
        <br/>
          <ul style="list-style:none">
            <li v-for="(shiftType) in value.shiftTypes" :key="shiftType.id">
                <strong>{{shiftType.name}}</strong>
                <br/>
              <ul>
                <li>Start Time : {{shiftType.startTime}}</li>
                <li>End Time : {{shiftType.endTime}}</li>
              </ul>
              <br/>
            </li>
          </ul>
      </b-card>
      <br/>
      <b-card>
        <h5 class="fancy">3. Shift Pattern for '{{value.shiftPattern.name}}'</h5>
        <br/>
          <ul style="list-style:none">
            <li v-for="(pattern, index) in value.shiftPattern.shiftPatternDays" :key="index">
                <strong>Day {{index + 1}}</strong>
                <br/>
                <ul>
                <li class="text-capitalize">
                  Week {{pattern.weekNumber}} 
                  {{value.days.find(x => x.number === pattern.dayNumber).name}}
                  -
                  {{pattern.shiftType.name}}
                </li>
                </ul>
              <br/>
            </li>
          </ul>
      </b-card>
    </div>
  </b-card>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      shiftColourClass: {
        color: 'black',
      },
    };
  },
  props: ['value'],
  computed: {
  },
  methods: {
  },
};
</script>

<style>
.fancy {
  font-weight: bold;
  line-height: 40pt;
  border-width: 0 0 1px;
  border-style: solid;
  border-color: #752864;
  color: #752864;
}
</style>
