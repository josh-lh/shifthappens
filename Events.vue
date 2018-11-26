<template>
  <div>
    <h1> Events </h1>
    <div style="padding:5px;">
      <AddEventsModal />
    </div>
    <b-container class="test-container">
      <div role="tablist">
        <b-card no body>
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-btn block href="#" v-b-toggle.accordion1 variant="cshare">Filter Options</b-btn>
          </b-card-header>
          <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-button-group class="groupFilter" variant="cshare">
              <b-button variant="cshare" @click="showShiftToggle"
                v-bind:class="{disabled: showShift}">Shift</b-button>
              <b-button variant="cshare" @click="showTeamToggle"
                v-bind:class="{disabled: showTeam}">Team</b-button>
            </b-button-group>
            |
            <b-button-group class="otherFilter" variant="cshare">
              <b-button variant="outline-cshare"
                :pressed.sync="showPersonal">Personal</b-button>
              <b-button variant="outline-cshare"
                :pressed.sync="showGlobal">Global</b-button>
            </b-button-group>
            <br/>
            <div v-if="showTeam" class="teamOptions">
              <div class="selectAllBox">
                <b-checkbox  v-model="allTeamsSelected" @change="toggleAllTeams">
                  {{ allTeamsSelected ? 'Un-select All' : 'Select All' }}
                </b-checkbox>
              </div>
              <b-check-group :options="teamOptions" v-model="selectedTeams"/>
              </div>
              <div v-if="showShift" class="shiftOptions">
                <div class="selectAllBox">
                  <b-checkbox  v-model="allShiftsSelected" @change="toggleAllShifts">
                    {{ allShiftsSelected ? 'Un-select All' : 'Select All' }}
                  </b-checkbox>
                </div>
              <b-check-group  :options="shiftOptions" v-model="selectedShifts" />
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <br/>
    <div class="calendar-container"  v-if="!loading">
      <v-calendar :attributes="mappedEvents" is-expanded @dayclick="openEventModal"
        :themeStyles="themeStyles" >
        <template slot="day-content" slot-scope="day">
          <div v-for="(event) in day.attributes" :key="event.customData.id"
            :style="`color:${event.customData.colour}`">
            <font-awesome-icon :icon="event.customData.eventType.icon" />
          </div>
          <div class="day-number" style="color:black">
            <b>{{day.day.label}}</b>
          </div>
        </template>
      </v-calendar>
    </div>
  </b-container>
    <b-modal ref="eventModalRef" hide-footer v-if="currentDay"
      :title="formattedDate(currentDay.date)"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
    >
      <b-carousel id="carousel1" controls indicators :interval="0">
        <b-carousel-slide v-for="(attribute,idx) in currentDay.attributes" :key="idx"
          style="background-color:#212529; height:300px;`">
          <div :style="`border:1px solid ${attribute.customData.colour}; color:white;
            border-radius: .25rem; height:250px; overflow:auto; background-color:#6c757d;`">
            <br/>
            <div :style="`border-bottom: 1px solid ${attribute.customData.colour};border-radius:
              calc(.25rem - 1px) calc(.25rem - 1px) 0 0; padding-bottom:5px;`">
              <h5>{{ attribute.customData.eventType.type }}
                <font-awesome-icon :icon="attribute.customData.eventType.icon" />
              </h5>
              <i style="color:dark-grey;">
                {{ formattedDateTime(attribute.customData.startDateTime) }} -
                {{ formattedDateTime(attribute.customData.endDateTime) }}
              </i>
            </div>
            <div style="padding-top:5px;">
              <div v-if="attribute.customData.absences.length > 0">
                <h6>Absences</h6>
                <b-badge class="badge" variant="cshare"
                  v-for="(absence, index) in attribute.customData.absences" style="margin:2px;"
                  :key="index">
                  {{ absence.user.displayName }}
                </b-badge>
              </div>
              <div v-if="attribute.customData.absences.length === 0">
                {{ attribute.customData.description }}
              </div>
            </div>
          </div>
        </b-carousel-slide>
      </b-carousel>
    </b-modal>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Loader from '@/components/shared/Loader.vue';
import AddEventsModal from '@/components/events/AddEventsModal.vue';
import dateConvertMixin from '@/mixins/dateConvertMixin';

export default {
  mounted() {
    this.getEvents();
    this.getAbsences();
    this.getTeams();
    this.getShifts();
    this.setCurrentShift();
  },
  components: {
    Loader,
    AddEventsModal,
  },
  mixins: [dateConvertMixin],
  data() {
    return {
      currentDay: {},
      addEvent: false,
      slide: 0,
      sliding: null,
      selectedTeams: [],
      selectedShifts: [],
      indeterminateTeam: false,
      indeterminateShift: false,
      allTeamsSelected: false,
      allShiftsSelected: true,
      colour: '#00ff00',
      showShift: true,
      showTeam: false,
      showAll: false,
      showNone: false,
      showGlobal: true,
      showPersonal: true,
      themeStyles: {
        dayCell: {
          height: '75px',
          border: '1px solid #9A656C',
          'border-radius': '1em',
        },
        wrapper: {
          background: 'linear-gradient(to bottom right, #eceded, #AFAFAF)',
          border: '3px solid #752864',
          'border-radius': 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
        },
        headerArrows: {
          color: '#752864',
        },
        headerTitle: {
          color: '#752864',
          'font-weight': 'bold',
        },
        weekdays: {
          color: '#752864',
          'font-weight': 'bold',
        },
      },
      headerBgVariant: 'cshare',
      headerTextVariant: 'light',
      bodyBgVariant: 'cshare',
    };
  },
  computed: {
    events() {
      return this.$store.state.events.events;
    },
    currentUser() {
      return this.$store.state.users.currentUser;
    },
    mappedEvents() {
      return this.filteredEvents.map(x =>
        ({
          customData: {
            ...x,
            absences: this.getAbsencesForShift(x),
          },
          bar: {
            backgroundColor: x.colour,
          },
          dates: {
            start: this.getDateFromString(x.startDateTime),
            end: this.getDateFromString(x.endDateTime),
          },
        }));
    },
    filteredEvents() {
      const filtered = [];
      if (this.showPersonal) {
        const personal = this.events.filter(x => x.eventType.isPersonal
          && x.user === this.currentUser.id);
        filtered.push(...personal);
      }
      if (this.showGlobal) {
        const global = this.events.filter(x => x.eventType.isGlobal);
        filtered.push(...global);
      }
      if (this.showTeam) {
        const teamShifts = this.teams.filter(x => this.selectedTeams.indexOf(x.id) > -1
          && x.shift).map(t => t.shift.id);
        const team = this.events.filter(x => (x.eventType.isTeam
          && this.selectedTeams.indexOf(x.team) > -1)
          || (x.eventType.isShift && teamShifts.indexOf(x.shift) > -1));
        filtered.push(...team);
      }
      if (this.showShift) {
        const shift = this.events.filter(x => x.eventType.isShift
          && this.selectedShifts.indexOf(x.shift) > -1);
        filtered.push(...shift);
      }
      return filtered;
    },
    users() {
      return this.$store.state.users.users;
    },
    teams() {
      return this.$store.state.teams.teams;
    },
    shifts() {
      return this.$store.state.shifts.shifts;
    },
    loading() {
      return this.$store.state.events.loading;
    },
    absences() {
      return this.$store.state.absences.absences;
    },
    teamOptions() {
      return this.teams.map(x => ({ value: x.id, text: x.name }));
    },
    shiftOptions() {
      return this.shifts.map(x => ({ value: x.id, text: x.name }));
    },
  },
  watch: {
    selectedTeams(newVal) {
      if (newVal.length === 0) {
        this.indeterminateTeam = false;
        this.allTeamsSelected = false;
      } else if (newVal.length === this.teamOptions.length) {
        this.indeterminateTeam = false;
        this.allTeamsSelected = true;
      } else {
        this.indeterminateTeam = true;
        this.allTeamsSelected = false;
      }
    },
    selectedshifts(newVal) {
      if (newVal.length === 0) {
        this.indeterminateShift = false;
        this.allShiftsSelected = false;
      } else if (newVal.length === this.shiftOptions.length) {
        this.indeterminateShift = false;
        this.allShiftsSelected = true;
      } else {
        this.indeterminateShift = true;
        this.allShiftsSelected = false;
      }
    },
  },
  methods: {
    ...mapActions('events', ['getEvents']),
    ...mapActions('absences', ['getAbsences']),
    ...mapActions('teams', ['getTeams']),
    ...mapActions('shifts', ['getShifts']),
    getAbsencesForShift(event) {
      if (event.isShift) {
        return this.absences.filter(a =>
          (new Date(a.beginDate) >= new Date(event.startDateTime) &&
            new Date(a.beginDate) <= new Date(event.endDateTime)));
      }
      return [];
    },
    getPopoverHeaderLabel(day) {
      const options = {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      };
      return day.date.toLocaleDateString(window.navigator.userLanguage ||
        window.navigator.language, options);
    },
    openEventModal(day) {
      this.currentDay = day;

      this.showModal();
    },
    showAddEventModal() {
      this.addEvent = !this.addEvent;
    },
    showModal() {
      this.$refs.eventModalRef.show();
    },
    hideModal() {
      this.$refs.eventModalRef.hide();
    },
    showTeamToggle() {
      this.showTeam = true;
      this.showAll = false;
      this.showShift = false;
      this.showNone = false;
    },
    showAllToggle() {
      this.showAll = true;
      this.showTeam = false;
      this.showShift = false;
      this.showNone = false;
    },
    showNoneToggle() {
      this.showAll = false;
      this.showTeam = false;
      this.showShift = false;
      this.showNone = true;
    },
    showShiftToggle() {
      this.showShift = true;
      this.showTeam = false;
      this.showAll = false;
      this.showNone = false;
    },
    toggleAllTeams(checked) {
      this.selectedTeams = checked ? this.teamOptions.slice().map(x => x.value) : [];
    },
    toggleAllShifts(checked) {
      this.selectedShifts = checked ? this.shiftOptions.slice().map(x => x.value) : [];
    },
    setCurrentShift() {
      if (this.currentUser && this.currentUser.team && this.currentUser.team.shift) {
        this.selectedShifts.push(this.currentUser.team.shift.id);
      }
    },
    getUsersOnShift(shiftId) {
      return this.users.filter(x => x.team && x.team.shift && x.team.shift.id === shiftId);
    },
  },
};

</script>

<style scoped>
  .calendar-container {
    top: 15%;
    margin: 0px auto;
    max-width: 600px;
  }
  .popover-header {
    text-align: center;
    padding-bottom: 3px;
    border-bottom: 1px solid #dadada;
    margin: 0 0 3px 0;
    opacity: 0.7;
  }

  .test-container{
    justify-content: center;
  }
  .event-content {
    flex-grow: 1;
    flex-basis: 0;
    margin-right: 10px;
    min-width: 80px;
  }
  .event-description {
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    margin-left: 3px;
  }

  .event-description:hover {
    opacity: 0.5;
  }

  .groupFilter{
    margin: 5px;
  }
  .otherFilter {
    margin: 5px;
  }

  .teamOptions {
    max-width: 900px;
    margin: 5px auto;
    overflow: auto;
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 5px;
    border-radius: .25em;
  }
   .shiftOptions {
    max-width: 900px;
    min-width: 300px;
    margin: 5px auto;
    overflow: auto;
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 5px;
    border-radius: .25em;
  }

  .selectAllBox {
    border: 1px solid rgba(0, 0, 0, 0.125);
    background-color:  rgba(158, 149, 149, 0.125);
    padding: 5px;
    margin: 5px auto;
    width: 150px;
  }

  .day-number{
    height:75px;
  }

</style>
