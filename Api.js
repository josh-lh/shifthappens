import axios from 'axios';
import AWN from 'awesome-notifications';

export default {
  http: axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }),
  notify: new AWN({
  }),
};

