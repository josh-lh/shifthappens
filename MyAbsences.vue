<template>
    <div>
        <br/>
        <AbsenceBalance />
        <br/>
        <AbsenceHistory />
    </div>
</template>


<script>
import AbsenceBalance from '@/components/absences/AbsenceBalance.vue';
import AbsenceHistory from '@/components/absences/AbsenceHistory.vue';

export default {
  components: {
    AbsenceBalance,
    AbsenceHistory,
  },
};
</script>

