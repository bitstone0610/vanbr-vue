<template>
  <div class="status container main-app-section-sm">
    <Card class="mx-auto">
      <div class="title text-center">Current Status</div>
      <div class="d-flex justify-content-between main-app-section-sm">
        <div class="lead" :class="[status ? 'text-success' : 'text-danger']">{{ statusContent }}</div>
        <div>
          <label class="switch">
            <input name="status" type="checkbox" @change="changeStatus" :checked="status">
            <span class="slider round"></span>
            <p class="error-msg">{{ errors.first('status') }}</p>
          </label>
        </div>
      </div>

      <div class="main-app-section-xs">
        <div class="d-flex justify-content-between p-2">
          <div><strong>Name</strong>:</div>
          <div>{{ name }}</div>
        </div>
        <div class="d-flex justify-content-between p-2">
          <div><strong>Car Number</strong>:</div>
          <div>{{ carNumber }}</div>
        </div>
        <div class="d-flex justify-content-between p-2">
          <div><strong>Car Type</strong>:</div>
          <div>{{ carType }}</div>
        </div>
        <div class="d-flex justify-content-between p-2">
          <div><strong>Current Location</strong>:</div>
          <div>{{ curLocation.formatted_address }}</div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  /* global google */
  import Card from '@/components/Card';
  import { AppURL } from '@/constants';
  import * as VueGoogleMaps from 'vue2-google-maps';

  export default {
    name: 'DriverStatus',
    data() {
      return {
        status: false,
        statusContent: 'You are currently Offline',
        AppURL,
        name: '',
        carNumber: '',
        carType: '',
        carId: '',
        rideRequest: {
          newRide: false,
          rideId: '',
          pickupCode: '',
          pickupLocation: '',
          dropCode: '',
          dropLocation: '',
          riderId: '',
        },
        curLocation: {
          latitude: '',
          longitude: '',
          formatted_address: 'Searching...',
        },
      };
    },
    components: { Card },
    async mounted() {
      await this.getDriverProfile();
      if (window.localStorage.getItem('status') === 'true') {
        this.status = true;
        this.statusContent = 'You are now Online';
        this.$socket.emit('isOnline', true, this.carId);
        VueGoogleMaps.loaded.then(() => {
          console.log('loaded');
          this.getLocation();
        });
      } else {
        this.status = false;
        this.statusContent = 'You are currently Offline';
        this.$socket.emit('isOnline', false);
      }
    },
    methods: {
      changeStatus() {
        this.status = !this.status;
        this.$socket.emit('isOnline', this.status);
        if (this.status) {
          this.statusContent = 'You are now Online';
          window.localStorage.setItem('status', true);
          this.getLocation();
        } else {
          this.statusContent = 'You are currently Offline';
          window.localStorage.setItem('status', false);
        }
      },
      async getDriverProfile() {
        try {
          const response = await this.axios.get(`${this.AppURL}/driver/profile`);
          this.name = response.data.data.name;
          this.carNumber = response.data.data.car_number;
          this.carType = response.data.data.car_model;
          this.carId = response.data.data.car_id;
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      getLocation() {
        const vm = this;
        if (navigator.geolocation) {
          const locationTimeout = setTimeout(vm.geolocFail(), 10000);

          navigator.geolocation.getCurrentPosition((position) => {
            clearTimeout(locationTimeout);

            vm.curLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              formatted_address: 'Got it',
            };
            vm.getAddress(position.coords.latitude, position.coords.longitude);
          }, () => {
            clearTimeout(locationTimeout);
            vm.geolocFail();
          });
        } else {
          // Fallback for no geolocation
          vm.geolocFail();
        }
      },
      geolocFail() {
        this.curLocation.formatted_address = 'Unknown';
      },
      getAddress(lat, lng) {
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat, lng };
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === 'OK') {
            this.curLocation.formatted_address = results[0].formatted_address;
            sessionStorage.setItem('curLocation', results[0].formatted_address);
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/constants";

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    input {
      display: none;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ddd;
    -webkit-transition: .4s;
    transition: .4s;
    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
  }

  input {
    &:checked + .slider {
      background-color: $primary_color;
    }
    &:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    &:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }

  /* Rounded sliders */

  .slider.round {
    border-radius: 34px;
    &:before {
      border-radius: 50%;
    }
  }

  button {
    width: 49%;
  }
  a {
    color: black;
    text-decoration: underline;
  }
  .error-msg {
    color: #a30015;
    font-size: 12px;
    margin-top: 5px;
  }
</style>
