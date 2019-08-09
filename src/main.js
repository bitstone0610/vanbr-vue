// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import idx from 'idx';
import moment from 'moment';
import VueAxios from 'vue-axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueSocketio from 'vue-socket.io';
import VeeValidate from 'vee-validate';
// import Vuetable from 'vuetable-2/src/components/Vuetable';
import VueEvents from 'vue-events';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';

import App from './App';
import rider from './router/rider';
import driver from './router/driver';
import admin from './router/admin';
import Routes from './router/routes';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCPXsZhEgbSDGOY2QVsJCBf3gq7D5Eggwk',
    libraries: 'places',
  },
});
// Vue.use(VueSocketio, 'https://vanbr.ca:3001');
Vue.use(VueSocketio, 'http://localhost:3000');
// Vue.use(Vuetable);
Vue.use(VueEvents);
Vue.use(VuetablePagination);
Vue.use(VuetablePaginationInfo);
Vue.use(VeeValidate);

const host = window.location.host;
const parts = host.split('.');
let router;
if (parts.length === 2 || parts[0] === 'www') {
  router = rider;
} else if (parts[0] === 'driver') {
  router = driver;
} else if (parts[0] === 'admin') {
  router = admin;
} else {
  router = rider;
}

Vue.mixin({
  data() {
    return {
      Routes,
      moment,
      idx,
      auth: false,
    };
  },
  mounted() {
    this.auth = this.authStatus();
  },
  methods: {
    getRole() {
      const host1 = window.location.host;
      const parts1 = host1.split('.');
      let role;
      if (parts[0] === 'rider' || parts1[0] === 'www') {
        role = 'rider';
      } else if (parts[0] === 'driver') {
        role = 'driver';
      } else if (parts[0] === 'admin') {
        role = 'admin';
      } else {
        role = 'rider';
      }
      return role;
    },
    getRideStatus(status) {
      this.rideStatus = '';
      if (status === 0) {
        this.rideStatus = 'Created';
      } else if (status === 1) {
        this.rideStatus = 'Confirmed';
      } else if (status === 2) {
        this.rideStatus = 'Riding';
      } else if (status === 3) {
        this.rideStatus = 'Ended';
      } else if (status === 4) {
        this.rideStatus = 'Canceled by Driver';
      } else if (status === 5) {
        this.rideStatus = 'Canceled by Rider';
      }
      return this.rideStatus;
    },
    authStatus() {
      if (localStorage.getItem('token')) {
        return true;
      }
      return false;
    },
    async checkError(status, error) {
      if (status === 401) {
        await delete axios.defaults.headers.common.Authorization;
        await localStorage.clear();
        await this.$root.$emit('auth');
        this.$router.push(Routes.Login);
      } else if (status === 404) {
        this.$router.push(Routes.Booking);
      } else {
        alert(error);
      }
    },
    playNotificationAudio() {
      document.querySelector('#notification').play();
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
