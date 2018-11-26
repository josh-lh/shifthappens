<template>
  <div class="tab-container">
    <div>
    <h4><strong>Basic Details</strong></h4>
    <h5><i>Please provide the basic details for the new shift pattern.</i></h5>
    <br/>
    </div>
    <div class="vertical-align">
      <b-form class="form-width-adjust">
        <b-form-group :invalid-feedback="nameError"
                :valid-feedback="nameValid"
                :state="nameState"  >
          <b-input-group class="input-width-adjust">
            <b-input-group-prepend>
              <b-btn  variant="cshare-alt">Name</b-btn>
            </b-input-group-prepend>
            <b-form-input required
                :state="nameState"
                v-model="value.shiftPattern.name"
                />
          </b-input-group>
        </b-form-group>
        <br/>
        <b-form-group :invalid-feedback="numbersError"
                :valid-feedback="numbersValid"
                :state="numbersState"  >
          <b-input-group v-if="!mobileView">
            <b-btn variant="cshare" class="btn-width-adjust" :state="numbersState" >Repeat every
              <b-dropdown :text="weeksDropDownText" variant="cshare-alt" size="sm" class="m-2">
                <b-dropdown-item v-for="n in 4" @click="updateWeeksDropDownText(n)" :key="n">{{n}}     
                </b-dropdown-item>
              </b-dropdown>weeks.
            </b-btn>
          </b-input-group>
        </b-form-group>
        <br/>
      </b-form>
      </div>
  </div>
</template>


<script>
import DatePicker from 'vue2-datepicker';
import moment from 'moment';

export default {
  components: {
    DatePicker,
    moment,
  },
  props: ['value'],
  data() {
    return {
      weeksDropDownText: '...',
      startDatePicked: null,
      shiftPattern: {
        name: '',
        totalWeeks: '',
      }
    };
  },
  computed: {
    nameError() {
      return 'Enter a shift pattern name (minimum 5 characters)';
    },
    nameValid() {
      return '';
    },
    nameState() {
      return this.value.shiftPattern.name.length > 4;
    },
    numbersError() {
      if (this.weeksDropDownText === '...') {
        return 'Number of weeks is required. ';
      }
      return '';
    },
    numbersValid() {
      return '';
    },
    numbersState() {
      return this.weeksDropDownText !== '...';
    },
    mobileView() {
      return screen.width < 600;
    },
  },
  methods: {
    updateWeeksDropDownText(value) {
      this.weeksDropDownText = String(value);
      this.value.shiftPattern.totalWeeks = value;
      while(this.value.shiftPatternSelected.length !== value * 7){
        if(this.value.shiftPatternSelected.length < (value * 7))
        {
          this.value.shiftPatternSelected.push(null);
        }
        else {
          this.value.shiftPatternSelected.pop();
        }
      }
      
    },
  },
};
</script>

<style>


  .btn-height-adjust{
    height: 60px !important;
  }
  .mx-input{
    height: 60px !important;
  }
  .btn-cshare-alt{
    background-color: white;
    border-color:#752864;
  }
  .form-control{
        border: 1px solid #752864;
  }

  </style>
