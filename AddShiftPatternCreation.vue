<template>
  <b-container>
    <div v-if="creating" class="spinner">
          <breeding-rhombus-spinner
            :animation-duration="2000"
            :size="150"
            color="#752864"
          />
      </div>
    <tick v-if="createdSuccess && !creating" :width="150" :text="'Shift Pattern Created!'"/>
    <cross v-if="!createdSuccess && !creating" :width="150" :text="'Error creating Shift Pattern'"/>
     <h5 v-if="createdSuccess && !creating"><i>Now that a shift pattern has been created, it can be linked
      to a shift and used to generate events for the calendar!
        </i></h5>
      <br/>
  </b-container>
</template>

<script>
import { BreedingRhombusSpinner } from 'epic-spinners';
import Tick from '@/components/shared/Tick.vue'
import Cross from '@/components/shared/Cross.vue'

export default {
  name: 'AddShiftPatternCreation',
  components: {
    BreedingRhombusSpinner,
    Tick,
    Cross,
  },
  computed: {
    creating() {
      return this.$store.state.shiftPatterns.creating;
    },
    createdSuccess() {
      return this.$store.state.shiftPatterns.createdSuccess;
    }
  }
};
</script>


<style scoped>
.spinner {
  margin: 0px auto;
  margin-top: 50px;
  width: 150px;
}
</style>