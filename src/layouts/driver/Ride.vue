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
              <td class="text-right"><a :href="'https://www.google.com/maps/place/' + approx_start_point_coord + '/@' + approx_start_point_coord + ',17z'" target="_blank">{{ approx_start_point_address }}</a></td>
            </tr>
            <tr>
              <td><strong>Drop</strong>:</td>
              <td class="text-right"><a :href="'https://www.google.com/maps/place/' + approx_end_point_coord + '/@' + approx_end_point_coord + ',17z'" target="_blank">{{ approx_end_point_address }}</a></td>
            </tr>
            <tr>
              <td><strong>Rider</strong>:</td>
              <td class="text-right">{{ rider }}</td>
            </tr>
            <tr>
              <td><strong>Mobile No.</strong>:</td>
              <td class="text-right">
                <a :href="'tel:' + mobile_no">{{ mobile_no }}</a>
              </td>
              <!-- <td class="text-right">{{ mobile_no }}</td> -->
            </tr>
            <tr>
              <td><strong>Ride Status</strong>:</td>
              <td class="text-right">{{ rideStatus }}</td>
            </tr>
            </tbody>
          </table>
        </div>
          <div class="form-group main-app-section-md">
            <button id="cancel" class="btn btn-outline-danger btn-ride" @click="cancelRide">Cancel</button>
            <button id="endRide" class="btn btn-ride btn-custom" @click="endRide" v-if="is_start_ride">End Ride</button>
            <button id="startRide" class="btn btn-ride btn-custom" @click="startRide" v-else>Start Ride</button>
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
        rideStatus: '',
        carType: '',
        approx_start_point_address: '',
        approx_end_point_address: '',
        approx_start_point_code: '',
        approx_start_point_coord: '',
        approx_end_point_code: '',
        approx_end_point_coord: '',
        rider: '',
        mobile_no: '',
        is_start_ride: false,
      };
    },
    mounted() {
      this.getRide();
    },
    methods: {
      async getRide() {
        try {
          const response = await this.axios.get(`${this.AppURL}/driver/get-single-ride?ride_id=${this.$route.params.id}`);
          this.setData(response.data.data);
        } catch (e) {
          if(e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      setData(ride) {
        if (ride.ride_status === 1 || ride.ride_status === 2) {
          if (ride.ride_status === 2) {
            this.rideStatus = 'Ride Started';
            this.is_start_ride = true;
          }
          else {
            this.rideStatus = 'Ride Confirmed';
            this.is_start_ride = false;
          }
          this.carType = ride.car.type;
          this.approx_start_point_address = ride.ride_meta_data.final_start_point_address || ride.ride_meta_data.approx_start_point_address;
          this.approx_start_point_code = ride.ride_meta_data.final_start_point_code || ride.ride_meta_data.approx_start_point_code;
          this.approx_start_point_coord = OpenLocationCode.decode(this.approx_start_point_code).latitudeCenter + ',' + OpenLocationCode.decode(this.approx_start_point_code).longitudeCenter;

          this.approx_end_point_address = ride.ride_meta_data.approx_end_point_address;
          this.approx_end_point_code = ride.ride_meta_data.approx_end_point_code;
          this.approx_end_point_coord = OpenLocationCode.decode(this.approx_end_point_code).latitudeCenter + ',' + OpenLocationCode.decode(this.approx_end_point_code).longitudeCenter;

          this.rider = ride.rider.name;
          this.mobile_no = ride.rider.mobile_no;
        } else {
          this.$router.push(this.Routes.DriverStatus);
        }
      },
      async cancelRide() {
        try {
          // document.querySelector("#endRide").disabled = true;
          const data = {
              ride_id: this.$route.params.id
        }
          
          const response = await this.axios.post(`${this.AppURL}/driver/cancel-ride`, data);
          this.$socket.emit('cancelRide', response.data.data.rider_user_id);
          this.$socket.emit('isOnline', true);
          localStorage.setItem('status', true);
          this.$router.push(this.Routes.DriverStatus);
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        } finally {
          // document.querySelector("#cancel").disabled = false;
        }
      },
      getLocationPosition(options = { maximumAge: 10, timeout: 5000 }) {
        return new Promise( (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (success) => {
              resolve(success.coords);
            },
            (failure) => {
              reject(failure);
            },
            options,
          );
        });
      },
      getLocation(latitude, longitude) {
        return new Promise( ( resolve => {
          const geocoder = new google.maps.Geocoder;
          geocoder.geocode({ location: { lat: latitude, lng: longitude } }, function(results, status) {
            if (status === 'OK') {
              console.log(results);
              if (results[0]) {
                const address = `${results[0].formatted_address.split(',')[0]} , ${results[0].formatted_address.split(',')[1]}`;
                resolve(address);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
        }));
      },
      async startRide() {
        try {
          document.querySelector("#startRide").disabled = true;
          const data = {
            ride_id: this.$route.params.id,
            // final_start_point_code: this.approx_start_point_code,
            // final_start_point_address: this.approx_start_point_address
          };
          const coords = await this.getLocationPosition();
          const { latitude, longitude } = coords;
          data['final_start_point_code'] = OpenLocationCode.encode(latitude, longitude);
          data['final_start_point_address'] = await this.getLocation(latitude, longitude);

          const response = await this.axios.post(`${this.AppURL}/driver/start-ride`, data);

          this.$socket.emit('changeRideStatus', response.data.data.rider_user_id);

          this.is_start_ride = true;
          const ride = response.data.data;
          this.rideStatus = 'Ride Started';
          this.approx_start_point_address = ride.ride_meta_data.final_start_point_address || ride.ride_meta_data.approx_start_point_address;
          this.approx_start_point_code = ride.ride_meta_data.final_start_point_code || ride.ride_meta_data.approx_start_point_code;
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        } finally {
          document.querySelector("#startRide").disabled = false;
        }
      },
      async endRide() {
        try {
          document.querySelector("#endRide").disabled = true;
          const data = {
              ride_id: this.$route.params.id,
              // final_end_point_code: this.approx_end_point_code,
              // final_end_point_address: this.approx_end_point_address
          }
          const coords = await this.getLocationPosition();
          const { latitude, longitude } = coords;
          data['final_end_point_code'] = OpenLocationCode.encode(latitude, longitude);
          data['final_end_point_address'] = await this.getLocation(latitude, longitude);
          const response = await this.axios.post(`${this.AppURL}/driver/end-ride`, data);

          this.$socket.emit('changeRideStatus', response.data.data.rider_user_id);
          this.$socket.emit('isOnline', true);
          localStorage.setItem('status', true);

          this.$router.push({name: 'Feedback', params: {id: response.data.data.id}});
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        } finally {
          document.querySelector("#endRide").disabled = false;
        }
      },
    },
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
