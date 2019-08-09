<template>
    <div class="booking container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Your Ride Info</div>
          <div class="d-flex main-app-section-sm align-items-center justify-content-center">
              <div class="logo">
                <img src="@/assets/sedan.png" v-if="carType == 'Sedan'" />
                <img src="@/assets/van.png" v-else-if="carType == 'Mini Van'" />
              </div>
          </div>
        <div class="main-app-section-sm">
          <table class="table table-borderless">
            <tbody>
            <tr>
              <td><strong>Car type</strong>:</td>
              <td class="text-right">{{ carType }}</td>
            </tr>
            <tr>
              <td><strong>Pickup</strong>:</td>
              <td class="text-right">{{ start_point_address }}</td>
            </tr>
            <tr>
              <td><strong>Drop</strong>:</td>
              <td class="text-right">{{ end_point_address }}</td>
            </tr>
            <tr v-if="rideStatus !== 0">
              <td><strong>Driver</strong>:</td>
              <td class="text-right">{{ driver }}</td>
            </tr>
            <tr v-if="rideStatus !== 0">
              <td><strong>Mobile No.</strong>:</td>
              <td class="text-right">
                <a :href="'tel:' + mobile_no">{{ mobile_no }}</a>
              </td>
              <!-- <td class="text-right">{{ mobile_no }}</td> -->
            </tr>
            <tr v-if="rideStatus !== 0">
              <td><strong>Car Detail</strong>:</td>
              <td class="text-right">{{ carDetail }}</td>
            </tr>
            <tr>
              <td><strong>Ride Status</strong>:</td>
              <td class="text-right">{{ rideStatusText }}</td>
            </tr>
            <!-- <tr>
              <td><strong>Estimated Wait</strong>:</td>
              <td class="text-right">{{ estimatedWait }}</td>
            </tr> -->
            </tbody>
          </table>
        </div>
          <div class="form-group main-app-section-md">
            <button id="cancel" class="btn btn-outline-danger btn-ride" v-if="rideStatus !== 2" @click="cancelRide">Cancel</button>
            <router-link :to="Routes.Booking" class="btn btn-ride btn-custom">Book Another</router-link>
          </div>
      </Card>
    </div>
</template>

<script>
  /* eslint-disable */
  import Card from '@/components/Card';
  import { AppURL } from '@/constants';

  export default {
    name: 'Ride',
    components: { Card },
    data() {
      return {
        AppURL,
        carType: '',
        start_point_address: '',
        end_point_address: '',
        driver: '',
        carDetail: '',
        rideStatus: '',
        mobile_no: '',
        rideStatusText: '',
        estimatedWait: ''
      };
    },
    mounted() {
      this.getRide();
    },
    methods: {
      async getRide() {
        try {
          const response = await this.axios.get(`${this.AppURL}/rider/get-single-ride?ride_id=${this.$route.params.id}`);

          const ride = response.data.data;
          console.log(ride);
          if (ride.ride_status === 0 || ride.ride_status === 1 || ride.ride_status === 2) {

            switch (ride.ride_status) {
              case 1:
                this.rideStatusText = 'Driver is coming...';
                // Estimated wait calculation goes here
                this.estimatedWait = '';
                break;
              case 2:
                this.rideStatusText = 'You are riding...';
                this.estimatedWait = 'N/A';
                break;
              default:
                this.rideStatusText = 'Searching Driver...';
                this.estimatedWait = 'Calculating...';
                break;
            }
            this.rideStatus = ride.ride_status;
            this.carType = ride.car.type;
            const { approx_start_point_address, approx_end_point_address, final_start_point_address, final_end_point_address  } = ride.ride_meta_data;
            this.start_point_address = final_start_point_address || approx_start_point_address;
            this.end_point_address = final_end_point_address || approx_end_point_address;

            if (ride.driver.name) {
              this.driver = ride.driver.name;
              this.carDetail = ride.driver.car_number;
              this.mobile_no = ride.driver.mobile_no;
            }
          } else if (ride.ride_status === 3) {
            this.$router.push({name: 'Payment', params: {id: ride.id}});
          }
          else {
            this.$router.push(this.Routes.Booking);
          }
        } catch (e) {
          if(e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      async cancelRide() {
        try {
          document.querySelector("#cancel").disabled = true;
          const data = {
            ride_id: this.$route.params.id,
          };
          const response = await this.axios.post(`${this.AppURL}/rider/cancel-ride`, data);
          if(response.data.data.cost > 0) {
            this.$router.push({name: 'Payment', params: {id: response.data.data.id}});
          }
          else {
            this.$router.push(this.Routes.Booking);
          }
          this.$socket.emit('cancelRide', response.data.data.driver_user_id);
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        } finally {
          document.querySelector("#cancel").disabled = false;
        }
      },
    },
    sockets: {
      noDriverFound(value) {
        alert(value);
        this.cancelRide();
        
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
        this.playNotificationAudio();
      },
      confirmRide(locationInfo) {
        console.log("Driver is coming from ", locationInfo);
        this.getRide();
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
        this.playNotificationAudio();
      },
    }
  };
</script>

<style lang="scss" scoped>
  .ride-info {
    margin: 0 30px;
    width: 100%
  }
  .logo {
    border-radius: 50%;
    box-shadow: 0 0px 8px 0 #ccc;
    padding: 8px;
    background-color: #F8F8F8;
    height: 70px;
    width: 70px;
    img {
      width: 52px;
    }
  }
  .btn-ride {
    width: 49%;
  }
  .table th, .table td {
    padding: 0.25rem 1rem;
  }
  .btn-custom {
    &:hover {
      color: #FFFFFF;
      background-color: #4D5EB8;
    }
  }
</style>
