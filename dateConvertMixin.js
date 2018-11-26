import moment from 'moment-timezone';

export default {
  methods: {
    timeToRegional(value) {
      try {
        const date = this.getTime(value);
        return date.format('HH:mm');
      } catch (error) {
        return '--:--';
      }
    },
    timeToLocal(value, region) {
      try {
        let zone = 'Europe/London';

        if (region === 'AU') {
          zone = 'Australia/Melbourne';
        } else if (region === 'NA') {
          zone = 'America/New_York';
        }
        const date = this.getTime(value).tz(zone);
        return date.format('HH:mm');
      } catch (error) {
        return '--.--';
      }
    },
    getTime(value) {
      const tD = new Date();
      const hour = value.split(':')[0];
      const minute = value.split(':')[1];
      const year = tD.getFullYear();
      const month = this.padNumber(tD.getMonth() + 1);
      const day = this.padNumber(tD.getDate());
      return moment(`${year}-${month}-${day}T${hour}:${minute}`);
    },

    padNumber(value) {
      return (value < 10 ? '0' : '') + value;
    },

    formattedDate(value) {
      return moment(value).format('MMM Do YYYY');
    },
    formattedTime(value) {
      return moment(value).format('HH:mm');
    },
    formattedDateTime(value) {
      return moment(value).format('MMM Do YYYY HH:mm');
    },
    getDateFromString(value) {
      return moment(value);
    }
  },
};
