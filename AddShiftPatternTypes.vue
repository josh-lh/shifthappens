<template>
  <div class="tab-container">
    <div>
      <h4><strong>Select Shift Types </strong></h4>
      <h5><i>Create new shift types or select one from the drop down list.
        Click add when you have finished adding each shift type!</i></h5>
      <br/>
      <br/>
    </div>
    <div style="padding-left:30px;">
        <h5><strong>Selected Shift Types</strong></h5>
        <p v-if="!value" style="color:red;"><i>No shift types added yet.</i>
        </p>
        <b-list-group >
        <b-list-group-item v-for="(shiftType) in value" :key="shiftType.id">
            <b-form inline >
                <b-input-group>
                  <b-input-group-prepend>
                    <b-btn disabled variant="cshare-alt">Shift Type</b-btn>
                  </b-input-group-prepend>
                  <b-form-input disabled required v-model="shiftType.name" style="width:200px;"/>
                  <b-input-group-prepend>
                    <b-btn disabled variant="cshare-alt">Start Time</b-btn>
                  </b-input-group-prepend>
                  <b-form-input disabled required style="width:98px;" v-model="shiftType.startTime"
                  type="time"/>
                  <b-input-group-prepend>
                    <b-btn disabled variant="cshare-alt">End Time</b-btn>
                  </b-input-group-prepend>
                  <b-form-input disabled required style="width:98px;" v-model="shiftType.endTime"
                  type="time" />
                  <b-input-group-append>
                    <b-btn disabled class='btn-icon' v-if="shiftType.icon" variant="cshare-alt">
                      <font-awesome-icon :icon="shiftType.icon"/>
                    </b-btn>
                    <b-btn inline variant="danger"
                      @click="removeShiftType(shiftType)">
                      <font-awesome-icon icon="minus-circle"/>
                    </b-btn>
                  </b-input-group-append>
                </b-input-group>
            </b-form>
          </b-list-group-item>
        </b-list-group>
        <br/>
        <br/>
        <br/>
        <b-card v-if="value.length < 5">
          <div >
            <b-form-group>
              <b-form-radio-group v-model="selectedOption"
                                  :options="options"
                                  name="radioInline">
              </b-form-radio-group>
            </b-form-group>
          </div>
          <div v-if="selectedOption==='existing' ">
            <h5><strong>Chose Existing Shift Type</strong></h5>
            <b-form-group >
              <b-form-select :options="existingShiftTypesMapped" v-model="selectedShiftType"/>
            </b-form-group>
            <b-button-group class="btn-add" >
               <b-btn :disabled="!selectedShiftType" inline variant="success" @click="existingShiftType"
               v-if="value.length < 5">
                 <font-awesome-icon icon="plus-circle"/>Add
               </b-btn>
          </b-button-group>
          </div>
          <div v-if="selectedOption==='new'">
            <h5><strong>Create a new Shift Type</strong></h5>
            <b-form inline>
              <b-input-group>
                <b-input-group-prepend>
                  <b-btn variant="cshare-alt" disabled>Shift Type</b-btn>
                </b-input-group-prepend>
                <b-form-input required v-model="newShiftType.name" style="width:150px;"
                  :disabled="newShiftTypeRequested"/>
              </b-input-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-btn variant="cshare-alt" disabled>Start Time</b-btn>
                </b-input-group-prepend>
                <b-form-input required style="width:100px;"
                v-model="newShiftType.startTime"  type="time" :disabled="newShiftTypeRequested" />
              </b-input-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-btn variant="cshare-alt" disabled>End Time</b-btn>
                </b-input-group-prepend>
                  <b-form-input required style="width:100px;"
                  v-model="newShiftType.endTime" type="time"  :disabled="newShiftTypeRequested" />
              </b-input-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-btn variant="cshare-alt" disabled>Icon</b-btn>
                </b-input-group-prepend>
                 <b-dropdown variant="cshare-alt" :disabled="newShiftTypeRequested">
                  <template slot="button-content">
                     <font-awesome-icon :icon="selectedIcon" v-if="selectedIcon"/>
                  </template>
                  <b-dropdown-item  v-for="(icon) in icons" :key="icon"
                    @click="updateSelectedIcon(icon)">
                    <font-awesome-icon :icon="icon"/>
                  </b-dropdown-item>
                 </b-dropdown>
              </b-input-group>
              <div v-if="!addButtonDisabled">
              <b-button-group class="btn-add">
                  <b-btn inline variant="success" @click="createNewShiftType"
                    v-if="value.length < 5">
                    <font-awesome-icon icon="plus-circle"/></b-btn>
              </b-button-group>
            </div>
            </b-form>
          </div>
        </b-card>
        <br/><br/>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  props: ['value'],
  data() {
    return {
      newShiftType: {
        name: '', startTime: '', endTime: '', icon: '',
      },
      newShiftTypeRequested: false,
      selectedShiftType: null,
      selectedIcon: '',
      selectedOption: 'existing',
      options: [
        { text: 'Choose an existing shift type.', value: 'existing' },
        { text: 'Create a new shift type', value: 'new' },
      ],
      icons: [
        'sun',
        'moon',
        'birthday-cake',
        'exclamation',
        'star',
        'mobile',
        'plane-departure',
        'plane-arrival',
      ],
    };
  },
  mounted() {
    this.getShiftTypes();
    this.getEventTypes();
  },
  computed: {
    existingShiftTypes() {
      return this.$store.state.shiftTypes.shiftTypes.filter(x => 
        !(this.value.map(v => v.id).indexOf(x.id) > -1));
    },
    existingShiftTypesMapped() {
      return this.existingShiftTypes.map(x => ({ value: x, text: `${x.name} (${x.startTime} - ${x.endTime})` }));
    },
    addButtonDisabled() {
      const isDisabled = this.newShiftType.name === '' || this.newShiftType.startTime === '' ||
        this.newShiftType.endTime === '';
      return isDisabled;
    },
    eventTypes() {
      return this.$store.state.eventTypes.eventTypes;
    },
  },
  methods: {
    ...mapActions('shiftTypes', ['getShiftTypes','addNewShiftType']),
    ...mapActions('eventTypes', ['postEventType', 'getEventTypes']),
    async createNewShiftType() {
      this.newShiftTypeRequested = true;
      const result = await this.addNewShiftType(this.newShiftType);
      if (result) {
        const shiftType = this.existingShiftTypes.find(s => s.id === result.data.id);
        if(shiftType) {
        this.value.push(shiftType);
        }
      }
      this.newShiftType = { name: '', startTime: '', endTime: '', icon: '' };
      this.selectedIcon = '';
      this.newShiftTypeRequested = false;
    },
    existingShiftType() {
      const selected = this.existingShiftTypes.find(s => s.id === this.selectedShiftType.id);
      this.value.push(selected);
      this.selectedShiftType = null;
    },
    removeShiftType(shiftType) {
      const index = this.value.findIndex(s => s.id === shiftType.id);
      this.value.splice(index, 1);
    },
    updateSelectedIcon(icon) {
      this.selectedIcon = icon;
      this.newShiftType.icon = icon;
    },
  },
};
</script>

<style>
  .btn-add{
    margin-top: 5px;
    margin-right:50px;
    float:right;
  }
  .btn-icon {
    min-width:42px;
  }
  .fa-select {
    font-family: FontAwesome, sans-serif;
  }
</style>
