<template>
  <div class="pricing container main-app-section-sm">
    <div class="row">
      <div class="col-md">
        <Card class="mx-auto">
          <div class="title text-center">Ride History</div>

          <div class="main-app-section-sm">
            <div class="d-flex justify-content-between">
              <div>Ride Pickup:</div><div><strong>{{ start_point_address }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Ride Drop:</div><div><strong>{{ end_point_address }}</strong></div>
            </div>
            <div v-if="ride.ride_status === 3">
              <div class="d-flex justify-content-between">
                <div>Ride Start Time:</div><div><strong>{{ start_time }}</strong></div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Ride End Time:</div><div><strong>{{ end_time }}</strong></div>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div>Rider:</div><div><strong>{{ this.idx(ride, _ => _.rider.name) || '-' }}</strong></div>
            </div>
            <!-- <div>Ride Booked for: <strong v-bind="ride.rider."></strong></div> -->
            <div class="d-flex justify-content-between">
              <div>Gender:</div><div><strong>{{ this.idx(ride, _ => _.rider.gender) || '-' }}</strong></div>
            </div>
            <div v-if="ride.ride_status === 0 || ride.ride_status === 1 || ride.ride_status === 2" class="d-flex justify-content-between">
              <div>Rider Contact:</div>
                <a :href="'tel' + this.idx(ride, _ => _.rider.mobile_no) || '-'">Call 
                  <img class="contact-icon" src="../../assets/phone.svg"/>
                </a>          
              <!-- <div><strong>{{ this.idx(ride, _ => _.rider.mobile_no) || '-' }}</strong></div> -->
            </div>
            <div v-if="ride.ride_status === 3 && role === 'rider'">
              <div class="d-flex justify-content-between">
                <div>Rider Rating:</div><div><strong>{{ this.idx(ride, _ => _.feedback.rider_ratings) || '-' }}</strong></div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Rider Feedback:</div><div><strong>{{ this.idx(ride, _ => _.feedback.rider_comments) || '-' }}</strong></div>
              </div>
            </div>
            <!-- <div>Rider Email: <strong v-bind="ride.rider."></strong></div> -->

            <hr />

            <div class="d-flex justify-content-between">
              <div>Car Type:</div><div><strong>{{ this.idx(ride, _ => _.car.type) || '-' }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Driver:</div><div><strong>{{ this.idx(ride, _ => _.driver.name) || '-' }}</strong></div>
            </div>
            <div v-if="ride.ride_status === 0 || ride.ride_status === 1 || ride.ride_status === 2" class="d-flex justify-content-between">
              <div>Driver Contact:</div>
                <a :href="'tel' + this.idx(ride, _ => _.driver.mobile_no) || '-'">Call 
                  <img class="contact-icon" src="../../assets/phone.svg"/>
                </a>
              <!-- <div><strong>{{ this.idx(ride, _ => _.driver.mobile_no) || '-' }}</strong></div> -->
            </div>
            <div v-if="ride.ride_status === 3 && role === 'driver'">
              <div class="d-flex justify-content-between">
                <div>Driver Rating:</div><div><strong>{{ this.idx(ride, _ => _.feedback.driver_ratings) || '-' }}</strong></div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Driver Feedback:</div><div><strong>{{ this.idx(ride, _ => _.feedback.driver_comments) || '-' }}</strong></div>
              </div>
            </div>
            <hr />
            <div v-if="ride.ride_status === 3">
              <div class="d-flex justify-content-between">
                <div>Per Kilometers:</div>
                <div>{{cost_meta_data.cost_per_kilometer}} * {{final_distance}} = <strong>${{total_cost_per_kilometer}}</strong></div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Per Minute:</div>
                <div>{{cost_meta_data.cost_per_minute}} * {{final_time}} = <strong>${{total_cost_per_minute}}</strong></div>
              </div>
            </div>
            <div v-if="total_cost > 0">
              <div class="d-flex justify-content-between">
                <div>Vanbr charge:</div>
                <div><strong>${{cost_meta_data.vanbr_charges}}</strong></div>
              </div>
            </div>
            <div v-if="total_cost > 0">
              <div class="d-flex justify-content-between">
                <div>Service charge:</div>
                <div><strong>${{cost_meta_data.service_charges}}</strong></div>
              </div>
              <div class="d-flex justify-content-between">
                <div>{{cost_meta_data.tax}}% tax:</div>
                <div><strong>${{total_tax}}</strong></div>
              </div>
            </div>
            <div v-if="total_cost > 0">
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Total charge</strong></div>
                <div><strong>${{ (Number(total_cost) + Number(total_tax)).toFixed(2) }}</strong></div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Driver Cost</strong></div>
                <div><strong>${{ride.driver_cost}}</strong></div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Vanbr Cost</strong></div>
                <div><strong>${{ (((Number(total_cost) + Number(total_tax)).toFixed(2)) - ride.driver_cost).toFixed(2)}}</strong></div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Driver Paid</strong></div>
                <div><strong>{{driverPayment}}</strong></div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Payment status</strong></div>
                <div><strong>{{ getRideStatus(this.ride.payment_status) }}</strong></div>                           
                <!-- <div><strong>{{ this.idx(ride, _ => _.payment_status) || '-' }}</strong></div> -->
              </div>
            </div>
            <div class="d-flex main-app-section-sm justify-content-between car-details">
              <div><strong>Ride status</strong></div>
              <div><strong>{{ getRideStatus(this.ride.ride_status) }}</strong></div>                                
              <!-- <div><strong>{{ this.idx(ride, _ => _.ride_status) || '-' }}</strong></div> -->
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Card from '@/components/Card';
  import Routes from '@/router/routes';
  import { AppURL } from '@/constants';

  export default {
    name: 'DriverHistoryDetail',
    components: {
      Card,
    },
    data() {
      return {
        AppURL,
        Routes,
        ride: {},
        role: '',
        start_point_address: '',
        end_point_address: '',
        start_time: '',
        end_time: '',
        final_distance: 0,
        final_time: '',
        cost_meta_data: {},
        total_cost_per_kilometer: '',
        total_cost_per_minute: '',
        total_tax: '',
        total_cost: '',
        isDriverPaid: false,
        driverPayment: '',
      };
    },
    async mounted() {
      this.role = this.getRole();
      await this.getHistoryDetail();
    },
    methods: {
      async getHistoryDetail() {
        try {
          const response = await this.axios.get(`${this.AppURL}/${this.role}/get-single-ride?ride_id=${this.$route.params.id}`);
          this.ride = response.data.data;
          this.cost_meta_data = this.ride.cost_meta_data;          
          const ride_meta_data = this.ride.ride_meta_data;
          this.start_point_address = ride_meta_data.final_start_point_address || ride_meta_data.approx_start_point_address;
          this.end_point_address = ride_meta_data.final_end_point_address || ride_meta_data.approx_end_point_address;
          
          if(this.ride && this.ride.is_driver_paid) {
              this.driverPayment = 'Yes';
          } else {
              this.driverPayment = 'No';              
          }

          if (this.ride.ride_status === 3) {
            this.start_time = this.moment.utc(this.ride.ride_start_time).local().format('YYYY-MM-DD, HH:mm');
            this.end_time = this.moment.utc(this.ride.ride_end_time).local().format('YYYY-MM-DD, HH:mm');
            this.final_time = ride_meta_data.final_time;
            this.final_distance = ride_meta_data.final_distance;
            
            this.total_cost_per_kilometer = (Number(this.cost_meta_data.cost_per_kilometer) * Number(this.final_distance)).toFixed(2);
            this.total_cost_per_minute = (Number(this.cost_meta_data.cost_per_minute) * Number(this.final_time)).toFixed(2);
            this.total_cost = Number(this.total_cost_per_kilometer) + Number(this.total_cost_per_minute) + Number(this.cost_meta_data.service_charges) + Number(this.cost_meta_data.vanbr_charges);
            this.total_tax = (Number(this.total_cost) * Number(this.cost_meta_data.tax) / 100).toFixed(2);
          } else if (this.ride.cost == 0) {
            this.total_cost = 0;
            this.total_tax = 0;
          } else {
            this.total_cost =  Number(this.cost_meta_data.service_charges) + Number(this.cost_meta_data.vanbr_charges);  
            this.total_tax = (((Number(this.cost_meta_data.service_charges) + Number(this.cost_meta_data.vanbr_charges)) * Number(this.cost_meta_data.tax)) / 100).toFixed(2);
          }
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .car-details {
    font-size: 18px;
  }
  .contact-icon {
    width: 20px;
    height: 20px;
    margin-top: 3px;
  }
</style>
