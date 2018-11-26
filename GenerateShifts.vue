<template>
  <b-container  class="container-desktop">
    <h1>Shift Generator</h1>
    <br/>
    <b-card>
      <div>
        <h5>Select a Shift</h5>
        <b-input-group>
        <b-form-select required
          :options="shiftsMapped" v-model="selectedShift"/>
            <b-input-group-append>
        <b-btn variant="outline-secondary" @click="clearSelectedShift()">Clear</b-btn>
            </b-input-group-append>
        </b-input-group>
           <!-- @change="shiftConfirmed" -->
        <CreateShift v-if="!selectedShift"/>   
        <br/><br/>
        <h5 v-if="selectedShift">Shift Details</h5>
        <div v-if="selectedShift" class="selected-shift-info">
          <br/>
          <h5>Teams on Shift</h5>
          <b-card no-body style="max-width:500px; display:table; margin:0 auto;
             border: none;">
             <ul inline style="list-style:none; padding:0; text-align:left;">
               <li v-for="(team) in teamsOnShift" :key="team.id">{{team.name}}</li>
             </ul>
          <p style="color:red" v-if="teamsOnShift.length === 0 && selectedShift">
          <i>There is currently no Team with this Shift assigned, for these events to be used
            please assign this Shift to a Team.
          </i>
        </p>
           </b-card>
           <br/>
           <b> Current Shift Pattern: </b>
           <div>
            <br/>
            <b-card no-body style="max-width:500px; display:table; margin:0 auto;
              border: none;">
              <ul style="list-style:none; padding:0; text-align:left;">
                <li v-for="(day) in orderedShiftDays" :key="day.id">
                  <p><b>Week {{ day.weekNumber}} - Day {{ day.dayNumber }}</b>:
                  {{ day.shiftType.name }} <i>({{ day.shiftType.startTime }} -
                  {{ day.shiftType.endTime }})</i></p>
                </li>
              </ul>
            </b-card>
           </div>
          </div>
        <!-- </b-form> -->
        <b-btn inline class="btn-continue" variant="primary" v-if="selectedShift" @click="showModal">
              Generate</b-btn>
      </div>
    </b-card>

    <b-modal ref="generateModalRef" hide-footer title="Generate Options" v-if="selectedShift">
      <b-form-group>
        <b-input-group>
          <b-btn variant="cshare">
            Shifts to start on <date-picker v-model="datePicked" lang="en" :not-before="new Date()"
            format="DD-MM-YYYY"/> &nbsp;
            <b-form-checkbox v-model="repeatCheck" value="checked" unchecked-value="unchecked" @change="updateRepeatedTypeCount(0)">
              Repeat?
            </b-form-checkbox>
          </b-btn>
          <br/>
          <br/>
          <div style="padding-left:5px;" v-if="repeatCheck === 'checked'">
            Repeat for
            <b-dropdown :text="repeatedTypeCount" variant="cshare-alt" size="sm" class="m-2">
              <b-dropdown-item @click="updateRepeatedTypeCount(1)"> 1 </b-dropdown-item>
              <b-dropdown-item @click="updateRepeatedTypeCount(2)"> 2 </b-dropdown-item>
              <b-dropdown-item @click="updateRepeatedTypeCount(3)"> 3 </b-dropdown-item>
              <b-dropdown-item @click="updateRepeatedTypeCount(4)"> 4 </b-dropdown-item>
              <b-dropdown-item @click="updateRepeatedTypeCount(5)"> 5 </b-dropdown-item>
              <b-dropdown-item @click="updateRepeatedTypeCount(6)"> 6 </b-dropdown-item>
            </b-dropdown>
            <b-dropdown :text="repeatOption" variant="cshare-alt" size="sm" class="m-2">
              <b-dropdown-item @click="updateRepeatOption('weeks')">  weeks  </b-dropdown-item>
              <b-dropdown-item @click="updateRepeatOption('months')"> months </b-dropdown-item>
              <b-dropdown-item @click="updateRepeatOption('years')">  years  </b-dropdown-item>
            </b-dropdown>
          </div>
        </b-input-group>
      </b-form-group>
      <b-btn inline class="btn-continue" variant="primary" v-if="selectedShift"
        @click="generateEvents">
        Generate
      </b-btn>

    </b-modal>
  </b-container>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import { mapActions } from 'vuex';
import CreateShift from '@/components/shifts/CreateShift.vue';

export default {
  mounted() {
    this.getTeams();
    this.getShifts();
    this.getShiftTypes();
    this.getEventTypes();
  },
  components: {
    DatePicker,
    moment,
    CreateShift,
  },
  data() {
    return {
      tabIndex: 0,
      selectedTeam: null,
      selectedShift: null,
      datePicked: new Date(),
      repeatedTypeCount: '---',
      eventTypesList: [],
      eventsList: [],
      repeatCheck: 'checked',
      repeatOption: 'years',
    };
  },
  computed: {
    teams() {
      return this.$store.state.teams.teams;
    },
    teamsMapped() {
      const allTeamsFiltered = this.$store.state.teams.teams.filter(x => x.name !== 'NO TEAM');
      return allTeamsFiltered.map(t => ({ value: t.id, text: t.name }));
    },
    teamsOnShift() {
      if (this.selectedShift) {
        const filteredTeams = this.teams.filter(x => x.shift);
        const result = filteredTeams.filter(x => x.shift.id === this.selectedShift.id);
        return result;
      }
      return [];
    },
    shiftPatterns() {
      return this.$store.state.shiftPatterns.shiftPatterns;
    },
    shifts() {
      return this.$store.state.shifts.shifts;
    },
    shiftsMapped() {
      return this.shifts.map(s => ({ value: s, text: s.name }));
    },
    eventTypes() {
      return this.$store.state.eventTypes.eventTypes;
    },
    orderedShiftDays() { 
      return this.selectedShift.shiftPattern.shiftPatternDays.sort((a, b) => {
        if (a.weekNumber > b.weekNumber) {
          return 1;
        } else if (a.weekNumber < b.weekNumber) { 
          return -1;
        }
        if (a.dayNumber < b.dayNumber) { 
          return -1;
        } else if (a.dayNumber > b.dayNumber) {
          return 1
        } else {
          return 0;
        };
      })
    },
  },
  methods: {
    ...mapActions('teams', ['getTeams']),
    ...mapActions('shiftPatterns', ['getShiftPatterns']),
    ...mapActions('shiftTypes', ['getShiftTypes']),
    ...mapActions('shifts', ['getShifts']),
    ...mapActions('events', ['postEvents']),
    ...mapActions('events', ['postEventType']),
    ...mapActions('eventTypes', ['getEventTypes']),
    clearSelectedShift(){
      this.selectedShift = null;
    },
    updateRepeatedTypeCount(value) {
      this.repeatedTypeCount = String(value);
    },
    updateRepeatOption(value) {
      this.repeatOption = value;
    },
    updateShiftColour(value) {
      this.shiftColour = value;
    },
    orderShiftDays(a, b) {
      if (a.weekNumber > ob2.weekNumber) {
        return 1;
    } else if (a.weekNumber < b.weekNumber) { 
        return -1;
    }

    if (a.dayNumber < b.dayNumber) { 
        return -1;
    } else if (a.dayNumber > b.dayNumber) {
        return 1
    } else { 
        return 0;
    }
    },
    // shiftConfirmed() {
    //   debugger;
    //   this.shiftColour = this.selectedShift.colour;
    // },
    async generateEvents() {
      const patternDays = this.selectedShift.shiftPattern.shiftPatternDays;
      const shiftTypes = this.mapShiftTypes(patternDays);

      const start = moment(this.datePicked, 'L');
      const startOfWeek = start.day('Monday');
      const end = moment(start).add(this.repeatedTypeCount, this.repeatOption);//.format('L');

      await this.createEventsByDateRange(startOfWeek, end, shiftTypes);
      // this.hideModal();
    },
    getShiftDay(dayCount, weekCount) {
      return this.selectedShift.shiftPattern.shiftPatternDays.find(s => s.dayNumber === dayCount
        && s.weekNumber === weekCount);
    },
    async createEventsByDateRange(startDate, endDate, shiftTypes) {
      // eslint-disable-next-line
      const totalWeeks = this.selectedShift.shiftPattern.totalWeeks;
      const eventTypes = await this.createEventTypes(shiftTypes);

      let dayCount = 1;
      let weekCount = 1;
      const eventsList = [];
      console.log(startDate,endDate);
      for (let m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
        const shiftDay = this.getShiftDay(dayCount, weekCount);
        if (shiftDay) {
          const event = this.createEvent(m, shiftDay, eventTypes);
          eventsList.push(event);
        }
        if (dayCount === 7) {
          weekCount += 1;
          if (weekCount > totalWeeks) {
            weekCount = 1;
          }
          dayCount = 0;
        }
        dayCount += 1;
      }
      const success = await this.postEvents(eventsList);
      if (success) {
        this.$router.push({ name: 'shifts' });
      }
    },
    mapShiftTypes(shiftDays) {
      const shiftTypesList = [];
      shiftDays.forEach((o) => {
        Object.keys(o).forEach((k) => {
          if (o[k] && k === 'shiftType' && !shiftTypesList.find(t => t.id === o[k].id)) {
            shiftTypesList.push(o[k]);
          }
        });
      });
      return shiftTypesList;
    },
    async createEventTypes(shiftTypes) {
      const eventTypesList = [];
      for (let s = 0; s < shiftTypes.length; s += 1) {
        const existingEventType = this.eventTypes.find(et => et.type === shiftTypes[s].name);
        if (existingEventType) {
          eventTypesList.push(existingEventType);
        } else {
          const eventType = {
            type: shiftTypes[s].name, isShift: true,
          };
          /* eslint-disable no-await-in-loop */
          const newEventType = await this.postEventType(eventType);
          /* eslint-enable no-await-in-loop */
          eventTypesList.push(newEventType);
        }
      }
      return eventTypesList;
    },
    createEvent(startDate, shiftDay, eventTypesList) {
      const endDate = startDate.clone();
      const eventType = eventTypesList.find(e => e.type === shiftDay.shiftType.name);

      const startDateTime = this.createEventDateTime(
        moment(startDate, 'YYYY-MM-DD HH:mm:ss'),
        moment(shiftDay.shiftType.startTime, 'HH:mm'),
      );

      const endDateTime = this.createEventDateTime(
        moment(endDate, 'YYYY-MM-DD HH:mm:ss'),
        moment(shiftDay.shiftType.endTime, 'HH:mm'),
      );

      if (startDateTime.isAfter(endDateTime)) {
        endDateTime.add(1, 'days');
      }

      return {
        description: `${this.selectedShift.name} - ${eventType.type}`,
        startDateTime,
        endDateTime,
        eventType,
        colour: this.selectedShift.colour,
        shift: this.selectedShift.id,
      };
    },
    createEventDateTime(date, time) {
      return date.set({
        hour: time.get('hour'),
        minute: time.get('minute'),
        second: time.get('second'),
      });
    },
    showModal() {
      this.$refs.generateModalRef.show();
    },
    hideModal() {
      this.$refs.generateModalRef.hide();
    },
  },

};
</script>

<style>
  .selected-shift-info {
    max-height: 400px;
    overflow: auto;
  }
  .btn-cshare-alt{
    background-color: white;
    color: #752864;
    border-color:#752864;
  }
</style>
