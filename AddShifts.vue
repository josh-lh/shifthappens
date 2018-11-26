<template>
    <b-container>
        <br/>
            <b-card class="centered">
            <b-tabs nav-class="steps" v-model="tabIndex">
                <b-tab title="1. Pattern" title-item-class="disabledTab shiftNavItems">
                     <br />
                    <BasicSettings v-model="shiftPatternCreator" />
                    <br />
                    <b-btn variant="outline-success" class="btn-continue"
                    @click="tabIndex++" :disabled="basicDetailsDisabled">
                        <font-awesome-icon icon="angle-double-right" />
                    </b-btn>
                    <br/>
                </b-tab>
                <b-tab title="2. Types" title-item-class="disabledTab shiftNavItems">
                     <br />
                     <ShiftTypes v-model="shiftPatternCreator.shiftTypes"/>
                     <br/>
                     <b-btn inline variant="outline-danger" class="btn-previous"
                     @click="tabIndex--">
                         <font-awesome-icon icon="angle-double-left" />
                     </b-btn>
                     <b-btn inline variant="outline-success" class="btn-continue"
                     @click="tabIndex++" :disabled="shiftTypeExists">
                         <font-awesome-icon icon="angle-double-right"/>
                     </b-btn>
                     <br/>
                </b-tab>
                <b-tab title="3. Configure"  title-item-class="disabledTab shiftNavItems">
                     <br />
                     <WeeklyConfigs v-model="shiftPatternCreator"/>
                     <br/>
                     <b-btn inline variant="outline-danger" class="btn-previous"
                     @click="tabIndex--">
                         <font-awesome-icon icon="angle-double-left" />
                     </b-btn>
                     <b-btn inline variant="outline-success" class="btn-continue"
                        @click="tabIndex++"
                        :disabled="configureShiftDisabled">
                         <font-awesome-icon icon="angle-double-right"/>
                     </b-btn>
                     <br/>
                </b-tab>
                <b-tab title="4. Summary" title-item-class="disabledTab shiftNavItems">
                    <br />
                     <ShiftSummary v-model="shiftPatternCreator" />
                     <br/>
                     <b-btn inline variant="outline-danger" class="btn-previous"
                     @click="tabIndex--">
                         <font-awesome-icon icon="angle-double-left" />
                     </b-btn>
                     <b-btn inline variant="outline-success" class="btn-continue"
                     @click="createShiftPattern()">
                        Create Pattern!
                     </b-btn>
                     <br/>
                </b-tab>
                <b-tab title="5. Created"  title-item-class="disabledTab shiftNavItems">
                     <br />
                     <AddShiftPatternCreation />
                     <br/>
                     <b-btn v inline variant="primary" class="btn-continue"
                       to="/manage/shifts/generate"
                        v-if="created">
                         Go to Generate!
                     </b-btn>
                     <br/>
                </b-tab>
            </b-tabs>
        </b-card>
    </b-container>
</template>


<script>
import BasicSettings from '@/components/shifts/AddShiftsSettings.vue';
import ShiftTypes from '@/components/shifts/AddShiftPatternTypes.vue';
import WeeklyConfigs from '@/components/shifts/AddShiftWeeklyConfigs.vue';
import ShiftSummary from '@/components/shifts/AddShiftsSummary.vue';
import AddShiftPatternCreation from '@/components/shifts/AddShiftPatternCreation';
import { mapActions } from 'vuex';

export default {
  components: {
    BasicSettings,
    ShiftTypes,
    WeeklyConfigs,
    ShiftSummary,
    AddShiftPatternCreation,
  },
  data() {
    return {
      tabIndex: 0,
      shiftPatternCreator: {
        shiftPattern: {
          name: '',
          totalWeeks: 0,
          shiftPatternDays: [],
        },
        shiftTypes: [],
        shiftPatternSelected: [],
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
      }
    };
  },
  computed: {
    configureShiftDisabled() {
      return this.shiftPatternCreator.shiftPattern.shiftPatternDays.length === 0;
    },
    basicDetailsDisabled() {
      return (this.shiftPatternCreator.shiftPattern.totalWeeks === 0 ||
      this.shiftPatternCreator.shiftPattern.name.length < 5);
    },
    shiftTypeExists() {
      return this.shiftPatternCreator.shiftTypes.length === 0;
    },
    creating() {
      return this.$store.state.shiftPatterns.creating;
    },
    createdSuccess() {
      return this.$store.state.shiftPatterns.createdSuccess;
    },
    created() {
      return !this.creating && this.createdSuccess;
    },
  },
  methods: {
    ...mapActions('shiftPatterns', ['addShiftPattern']),
    createShiftPattern() {
      this.tabIndex += 1;
      this.addShiftPattern(this.shiftPatternCreator.shiftPattern);
    },
  },
};
</script>

<style>
  .steps {
    margin: 0;
    padding: 0;
    background-color: white;
    text-align: center;
  }
.btn-continue{
    float:right;
}
.btn-previous{
    float:left;
}
.btn-cshare-light{
    background-color:#F9E49D;
}
.disabledTab{
    pointer-events: none;
}
.card-header {
    padding-top: 5px;
    padding-bottom: 5px;
    background: #fafafa;

}
.card-header-pills {
    background: #fafafa;
    padding: 0px;
}
 .shiftNavItems {
    margin: 2px 0px 0px 0px;
    padding: 0px 15px 0px 15px;
    font-size:17px;
    font-weight: 600;
    margin-right: 1px;
    height: 50px;
    transition: all 0.3s ease 0s;
    color: black;
}

  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: white;
    background-color: #6D2244;
    border: 2px solid #6D2244;
  }

 .nav-tabs .nav-link {
         color: grey;
 }

.btn-cshare-light {
    color: white;
    background-color: #D7A2C6;

}
.tab-content{
    color:#757575;
}
.tab-container{
    height: 605px;
    overflow: auto;
}


  @media screen and (min-width: 1025px){
    .input-width-adjust{
      width:600px;
    }
    .form-width-adjust{
      padding-left: 150px;
      padding-bottom:20px;
      /*border-color:#752864;*/
    }
    .btn-width-adjust{
      width:600px;
    }
    .vertical-align{
        display: block;
        vertical-align: middle;
        text-align:center;
        position:absolute;
        padding-top:100px;
    }
  }
</style>
