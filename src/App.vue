<template>
  <div id="app">
    <Navbar></Navbar>
    <main>
      <div class="container main-app-section-sm" v-if="rideRequest.newRide">
        <Card class="mx-auto mb-4">
          <div class="title text-center text-success">New Ride!!!!</div>
          <div class="d-flex justify-content-between main-app-section-sm">
            <div>Pickup Location:</div><strong><a :href="'https://plus.codes/' + rideRequest.pickupCode" target="_blank">{{ rideRequest.pickupLocation }}</a></strong>
          </div>
          <div class="d-flex justify-content-between main-app-section-sm">
            <div>Drop Location:</div><strong><a :href="'https://plus.codes/' + rideRequest.dropCode" target="_blank">{{ rideRequest.dropLocation }}</a></strong>
          </div>
          <div class="d-flex justify-content-between main-app-section-sm">
            <button class="btn btn-danger btn-request" id="rejectButton" @click="sendResponse(false)">Reject</button>
            <button class="btn btn-custom btn-request" @click="sendResponse(true)">Accept</button>
          </div>
        </Card>
      </div>
      <router-view></router-view>
    </main>
</div>
</template>

<script>
  import vuetable from 'vuetable-2';
  import Navbar from '@/components/Navbar';
  import Card from '@/components/Card';
  import VeeValidate from 'vee-validate';

  export default {
    name: 'app',
    components: {
      Navbar,
      vuetablePagination: vuetable.VuetablePagination,
      Card,
      VeeValidate,
    },
    data() {
      return {
        rideRequest: {
          newRide: false,
          rideId: '',
          pickupCode: '',
          pickupLocation: '',
          dropCode: '',
          dropLocation: '',
          riderId: '',
        },
      };
    },
    async created() {
      const token = localStorage.getItem('token');
      if (token) {
        await (this.axios.defaults.headers.common.Authorization = `Bearer ${token}`);
      }
      // this.handlePermission();
    },
    mounted() {
      if (this.getRole() === 'driver') {
        if (window.localStorage.getItem('status') === 'true') {
          this.$socket.emit('isOnline', true);
        } else {
          this.$socket.emit('isOnline', false);
        }
      }
    },
    methods: {
      // handlePermission() {
      //   navigator.geolocation.watchPosition(
      //     (success) => {
      //       // console.log(success.coords);
      //       const lat = success.coords.latitude;
      //       const long = success.coords.longitude;
      //       // eslint-disable-next-line
      //       this.$socket.emit('getLocation', OpenLocationCode.encode(lat,long));
      //       this.$socket.emit('isOnline', true);
      //     },
      //     (failure) => {
      //       console.log(failure);
      //       // window.location = 'https://google.com/';
      //     },
      //   );
      // },
      sendResponse(response) {
        if (response) {
          this.$socket.emit('getDriverResponse', true, this.rideRequest.rideId, this.rideRequest.riderId, sessionStorage.getItem('curLocation'));
          this.$socket.emit('isOnline', false);
          this.status = false;
          this.statusContent = 'You are currently Offline';
          window.localStorage.setItem('status', false);
        } else {
          this.$socket.emit('getDriverResponse', false, this.rideRequest.rideId, this.rideRequest.riderId);
        }
        this.rideRequest.newRide = false;
      },
    },
    sockets: {
      connect() {
        const token = localStorage.getItem('token');
        if (token) {
          this.$socket.emit('join', token);
          console.log('socket connected');
        }
      },
      rideConfirmation(data) {
        if (this.getRole() === 'driver') {
          this.rideRequest.newRide = true;
          this.rideRequest.rideId = data.id;
          this.rideRequest.pickupCode = data.ride_meta_data.approx_start_point_code;
          this.rideRequest.dropCode = data.ride_meta_data.approx_end_point_code;
          this.rideRequest.pickupLocation = data.ride_meta_data.approx_start_point_address;
          this.rideRequest.dropLocation = data.ride_meta_data.approx_end_point_address;
          this.rideRequest.riderId = data.rider_user_id;

          // Cancel ride after 15 seconds if not accepted.
          setTimeout(() => {
            if (this.rideRequest.newRide) {
              // this.sendResponse(false);
              document.getElementById('rejectButton').click();
            }
          }, 15000);

          navigator.vibrate =
            navigator.vibrate
            || navigator.webkitVibrate
            || navigator.mozVibrate
            || navigator.msVibrate;
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }

          this.playNotificationAudio();
        }
      },
      confirmRide(value) {
        if (this.getRole() === 'driver') {
          this.$router.push({ name: 'Ride', params: { id: value.id } });

          navigator.vibrate =
            navigator.vibrate
            || navigator.webkitVibrate
            || navigator.mozVibrate
            || navigator.msVibrate;
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }
          this.playNotificationAudio();
        }
      },
      async cancelRideListener(value) {
        await alert(value);
        if (this.getRole() === 'driver') {
          this.$socket.emit('isOnline', true);
          window.localStorage.setItem('status', true);
        }
        window.location.reload();
      },
    },
  };
</script>

<style lang="scss">
  @import "styles/main";

  .btn-request {
    width: 49%;
  }
</style>
