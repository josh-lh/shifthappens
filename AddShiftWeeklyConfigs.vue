<template>
  <div class="tab-container">
        <div>
        <h4><strong>Configure the Shift Weeks </strong></h4>
        <h5><i>
          Here you can link the shift types to each day of the week for the pattern
          you selected in step 1!</i></h5>
        <br/>
      </div>
    <b-card class="cardContainer" no-body bg-variant="light">
    <b-tabs v-model="weekTabIndex">
        <b-tab v-for="n in value.shiftPattern.totalWeeks" :key="n"
          :title="`Week ${n}`"
        >
          <ShiftWeek v-model="value" :weekCount="n"/>
        </b-tab>  
    </b-tabs>         
    </b-card>
             
          <b-btn style="margin:5px; float:right" variant="success"  @click="completeShiftPattern()"
            :disabled="!shiftsSelected">
            <font-awesome-icon icon="save"/>
          </b-btn>
          <b-btn style="float:right ;margin:5px;" variant="success"  @click="weekTabIndex++"
            v-if="!finalPage">
            <font-awesome-icon icon="angle-double-right"/>
          </b-btn>
          <b-btn style="float:left;margin:5px;" variant="danger"  @click="weekTabIndex--"
          v-if="weekTabIndex > 0" >
            <font-awesome-icon icon="angle-double-left"/>
          </b-btn>
    </div>
</template>

<script>
import ShiftWeek from '@/components/shifts/AddShiftWeek.vue';

export default {
  components: {
    ShiftWeek,
  },
  props: ['value'],
  data() {
    return {
      weekTabIndex: 0,
    };
  },
  computed: {
    finalPage() {
      return this.weekTabIndex === (this.value.shiftPattern.totalWeeks - 1);
    }, 
    shiftsSelected() {
      return this.value.shiftPatternSelected.filter(x => x !== null).length > 0;
    },
  },
  methods: {
    completeShiftPattern()
    {
      this.value.shiftPattern.shiftPatternDays = 
        this.value.shiftPatternSelected.map((x, index) =>
          {
          let day = index + 1 > 7 ? (index + 1) % 7 : index + 1;
          let week = index + 1 > 7 ? Math.floor((index + 1)/7) + 1 : 1;
          if(index > 7 && day === 0)
          {
            day = 7;
            week = week - 1;
          }
          return {
          shiftType: x, 
          weekNumber: week,
          dayNumber: day,     
        }}).filter(x => x.shiftType != null);
    },
  }
};
</script>

<style scoped>
    .disabledWeeklyTab{
      pointer-events: none;
    }



</style>
