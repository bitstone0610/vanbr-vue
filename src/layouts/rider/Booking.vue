<template>
    <div class="booking container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Book a Ride</div>
        <div class="text-center">
          Current Location: {{ curLocation.formatted_address }}
        </div>
        <!-- <div class="text-center">
          <button @click="getAddress()">Get Location</button>
        </div> -->
        <form name="book">
          <div class="form-group main-app-section-xs">
            <label for="pickup">Pickup Location:</label>
            <gmap-autocomplete
              class="form-control"
              id="pickup"
              placeholder="Search Location"
              :componentRestrictions="{ country: 'CA' }"
              @place_changed="setPickup" />
          </div>
          <div class="form-group main-app-section-xs">
            <label for="drop">Drop Location:</label>
            <gmap-autocomplete
              class="form-control"
              id="drop"
              placeholder="Search Location"
              :componentRestrictions="{ country: 'CA' }"
              @place_changed="setDrop" />
          </div>
          <div class="form-group main-app-section-xs">
            <label for="select-member">Book for:</label>
            <select class="form-control" id="select-member" v-model="referenceId">
              <option value="0">Self</option>
              <option v-for="reference in references" :value="reference.id" :key="reference.id">{{ reference.name }}</option>
            </select>
            <div class="d-flex justify-content-end mt-1">
              <router-link :to="Routes.Reference">+ Add Reference</router-link>
            </div>
          </div>
          <div class="form-group">
            <label>Select Car:</label>
            <div class="section-container">
              <div>
                <label for="sedan" class="d-flex align-items-center car-type-label">
                  <div class="car-logo" :class="{ 'colored-image-div' : (carId == 1) }">
                    <img src="../../assets/sedan.png"/>
                  </div>
                  <div class="ml-4 car-selected-label" :class="{ 'text-secondary' : (carId != 1) }">
                    Sedan - 4 Seats
                  </div>
                </label>
                <input type="radio" id="sedan" name="car-type" value="1" class="car-radio" v-model="carId"/>
              </div>
              <hr class="hr-spacing"/>
              <div>
                <label for="mini-van" class="d-flex align-items-center car-type-label">
                  <div class="car-logo" :class="{ 'colored-image-div' : (carId == 2) }">
                    <img src="../../assets/van.png"/>
                  </div>
                  <div class="ml-4 car-selected-label" :class="{ 'text-secondary' : (carId != 2) }">
                    Mini Van - 6 Seats
                  </div>
                </label>
                <input type="radio" id="mini-van" name="car-type" value="2" class="car-radio" v-model="carId"/>
              </div>
            </div>
          </div>
          <div class="form-group main-app-section-sm section-container" v-if="showCalculation">
            <div>
              <label><strong>Distance:</strong> {{ approxDistance }} KM</label>
            </div>
            <div>
              <label><strong>Approx time:</strong> {{ approxTime }} Minutes</label>
            </div>
            <div>
              <label><strong>Approx Cost:</strong> {{ approxCost }} </label>
            </div>
          </div>
          <div class="row form-group main-app-section-md">
            <div class="col">
              <button class="btn btn-block btn-primary" @click="mapsAPICalculation">Estimate</button>
            </div>
            <div class="col">
              <button class="btn btn-custom btn-block" @click="book" id="book">Book</button>
            </div>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  /* eslint-disable */
  import Routes from '@/router/routes';
  import Card from '@/components/Card';
  import { AppURL } from '@/constants';
  import * as VueGoogleMaps from 'vue2-google-maps';

  export default {
    name: 'Booking',
    components: { Card },
    data() {
      return {
        AppURL,
        Routes,
        approx_start_point_code: '',
        approx_end_point_code: '',
        approx_start_point_address: '',
        approx_end_point_address: '',
        pickupCoOrdinates: [],
        dropCoOrdinates: [],
        carId: '1',
        car_data: {},
        referenceId: '0',
        showCalculation: false,
        approxDistance: '',
        approxTime: '',
        approxCost: '',
        references: '',
        curLocation: {
          latitude: '',
          longitude: '',
          formatted_address: 'Searching...',
        },
      };
    },
    mounted() {
      this.getReferences();
      this.getCars();
      VueGoogleMaps.loaded.then(() => {
        this.getLocation();
      });
    },
    methods: {
      async getReferences() {
        try {
          const response = await this.axios.get(`${this.AppURL}/rider/get-reference`);
          this.references = response.data.data;
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      async getCars() {
        try {
          const response = await this.axios.get(`${this.AppURL}/get-cars`);
          this.car_data = response.data.data;
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      async book(event) {
        event.preventDefault();
        if (!this.approx_start_point_code || !this.approx_end_point_code || !this.carId) {
          alert('Please enter valid details');
          return false;
        }
        try {
          document.querySelector("#book").disabled = true
          const data = {
            car_id: this.carId,
            approx_start_point_code: this.approx_start_point_code,
            approx_end_point_code: this.approx_end_point_code,
            approx_start_point_address: this.approx_start_point_address,
            approx_end_point_address: this.approx_end_point_address,
            reference_id: this.referenceId
          };
          const response = await this.axios.post(`${this.AppURL}/rider/book-ride`, data);
          this.$socket.emit('getRideRequest', response.data.data.id);
          this.$router.push({name: 'Ride', params: {id: response.data.data.id}});
        } catch (e) {
          if (e.response) {
            if (e.response) {
              if (e.response.status === 406) {
                alert('Please verify your email!');
              }
              else {
                this.checkError(e.response.status, e.response.data.message);
              }
            }
          }
        } finally {
          document.querySelector("#book").disabled = false
        }
      },
      setPickup(place) {
        this.approx_start_point_address = place.formatted_address;
        let lat = place.geometry.location.lat();
        let long = place.geometry.location.lng();
        this.pickupCoOrdinates[0] = lat;
        this.pickupCoOrdinates[1] = long;
        this.approx_start_point_code = OpenLocationCode.encode(lat, long);
      },
      setDrop(place) {
        this.approx_end_point_address = place.formatted_address;
        let lat = place.geometry.location.lat();
        let long = place.geometry.location.lng();
        this.dropCoOrdinates[0] = lat;
        this.dropCoOrdinates[1] = long;
        this.approx_end_point_code = OpenLocationCode.encode(lat, long);
      },
      mapsAPICalculation(event) {
        event.preventDefault();
        if (!this.approx_start_point_code || !this.approx_end_point_code || !this.carId) {
          alert('All fields are required');
          return false;
        }
        this.showCalculation = true;

        const url = "https://maps.googleapis.com/maps/api/distancematrix/json?";
        const params = `units=imperial&origins=${this.pickupCoOrdinates.lat},${this.pickupCoOrdinates.long}&destinations=${this.dropCoOrdinates.lat},${this.dropCoOrdinates.long}&key=AIzaSyCPXsZhEgbSDGOY2QVsJCBf3gq7D5Eggwk`;

        let service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [`${this.pickupCoOrdinates[0]},${this.pickupCoOrdinates[1]}`],
          destinations: [`${this.dropCoOrdinates[0]},${this.dropCoOrdinates[1]}`],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, async (response, status) => {
          this.approxDistance = (response.rows[0].elements[0].distance.value / 1000).toFixed(2);
          this.approxTime = (response.rows[0].elements[0].duration.value / 60).toFixed(2);

          const car = this.car_data.find(key => key.id == this.carId);

          const total_cost_per_kilometer = (Number(car.cost_per_kilometer) * parseFloat(this.approxDistance)).toFixed(2);
          const total_cost_per_minute = (Number(car.cost_per_minute) * parseFloat(this.approxTime)).toFixed(2);
          const total_cost = Number(total_cost_per_kilometer) + Number(total_cost_per_minute) + Number(car.service_charges) + Number(car.vanbr_charges);
          const total_tax = (Number(total_cost) * Number(car.tax) / 100).toFixed(2);
          this.approxCost = (Number(total_cost) + Number(total_tax)).toFixed(2);
        });
      },
      getLocation() {
        const vm = this;

        if (navigator.geolocation) {
          const locationTimeout = setTimeout(vm.geolocFail(), 10000);

          navigator.geolocation.getCurrentPosition(function(position) {
            clearTimeout(locationTimeout);

            vm.curLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              formatted_address: 'Searching...',
            };
            vm.getAddress(
              position.coords.latitude,
              position.coords.longitude
            );
          }, function(error) {
            clearTimeout(locationTimeout);
            console.log(error);
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
        const latlng = {lat, lng};
        geocoder.geocode({location: latlng}, (results, status) => {
          if (status == 'OK') {
            console.log(results[0].formatted_address);
            this.curLocation.formatted_address = results[0].formatted_address;
          }
        });
      },
    },
    sockets: {
      sendDriverResponse(value) {
        console.log(value);
      }
    },
  };
</script>

<style lang="scss" scoped>
  label {
    cursor: pointer;
  }
  .section-container {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 4px 10px;
  }
  .car-radio {
    display: none;
  }
  .car-logo {
    border-radius: 50%;
    box-shadow: 0 0px 8px 0 #CCC;
    padding: 8px;
    margin: 4px;
    background-color: #FFF;
    transition: 0.4s all ease;

    img {
      width: 32px;
      filter: grayscale(100%);
      transition: 0.4s all ease;
    }
  }
  .hr-spacing {
    margin: 4px 0;
  }
  .colored-image-div {
    // background-color: rgb(248, 248, 248);
    background-color: #9b9b9b;    
    img {
      filter: grayscale(0%);
    }
  }
  .car-type-label {
    margin-bottom: 0;
  }
  .car-selected-label {
    font-weight: 600;
  }
</style>
