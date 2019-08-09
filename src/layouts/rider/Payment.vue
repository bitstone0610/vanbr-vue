<template>
    <div class="pricing container main-app-section-sm">
      <div class="row">
        <div class="col-md">
          <Card class="mx-auto">
            <div class="title text-center">Invoice</div>

            <div class="main-app-section-sm">
              <div class="d-flex justify-content-between">
                <div>Source:</div>
                <div><strong>{{start_point_address}}</strong></div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Destination:</div>
                <div><strong>{{end_point_address}}</strong></div>
              </div>
              <div v-if="is_ride_end">
                <div class="d-flex justify-content-between">
                  <div>Kilometers:</div>
                  <div><strong>{{final_distance}}</strong></div>
                </div>
                <div class="d-flex justify-content-between">
                  <div>Time:</div>
                  <div><strong>{{final_time}} minute</strong></div>
                </div>
              </div>
              <hr />
              <div v-if="is_ride_end">
                <div class="d-flex justify-content-between">
                  <div>Per Kilometers:</div>
                  <div>{{cost_meta_data.cost_per_kilometer}} * {{final_distance}} = <strong>${{total_cost_per_kilometer}}</strong></div>
                </div>
                <div class="d-flex justify-content-between">
                  <div>Per Minute:</div>
                  <div>{{cost_meta_data.cost_per_minute}} * {{final_time}} = <strong>${{total_cost_per_minute}}</strong></div>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <div>Vanbr charge:</div>
                <div><strong>${{cost_meta_data.vanbr_charges}}</strong></div>
              </div>
              <div>
                <div class="d-flex justify-content-between">
                  <div>Service charge:</div>
                  <div><strong>${{cost_meta_data.service_charges}}</strong></div>
                </div>
                <div class="d-flex justify-content-between">
                  <div>{{cost_meta_data.tax}}% tax:</div>
                  <div><strong>${{total_tax}}</strong></div>
                </div>
              </div>
              <div class="d-flex main-app-section-sm justify-content-between car-details">
                <div><strong>Total</strong></div>
                <div><strong>${{(Number(total_cost) + Number(total_tax)).toFixed(2)}}</strong></div>
              </div>
              <hr />
              <div class="form-group main-app-section-md">
                <button class='btn btn-custom btn-block' v-if="is_ride_end" @click='giveFeedback'>Give Feedback</button>
                <button class='btn btn-custom btn-block' v-else @click='bookRide'>Book Ride</button>
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
  import { AppURL } from '@/constants';

  export default {
    name: 'Payment',
    components: { Card },
    data() {
      return {
        AppURL,
        role: '',
        is_ride_end: '',
        start_point_address: '',
        end_point_address: '',
        final_distance: 0,
        final_time: '',
        cost_meta_data: {},
        total_cost_per_kilometer: '',
        total_cost_per_minute: '',
        total_tax: '',
        total_cost: '',
      };
    },
    beforeMount() {
      this.role = this.getRole();
      this.getRide();
    },
    methods: {
      async getRide() {
        try {
          const response = await this.axios.get(`${this.AppURL}/${this.role}/get-single-ride?ride_id=${this.$route.params.id}`);

          const ride = response.data.data;
          const ride_meta_data = ride.ride_meta_data;

          this.start_point_address = ride_meta_data.final_start_point_address || ride_meta_data.approx_start_point_address;
          this.end_point_address = ride_meta_data.final_end_point_address || ride_meta_data.approx_end_point_address;
          
          this.cost_meta_data = ride.cost_meta_data;

          if (ride.ride_status === 3) {
            this.is_ride_end = true;
            this.final_time = ride_meta_data.final_time;
            this.final_distance = ride_meta_data.final_distance;
            
            this.total_cost_per_kilometer = (Number(this.cost_meta_data.cost_per_kilometer) * Number(this.final_distance)).toFixed(2);
            this.total_cost_per_minute = (Number(this.cost_meta_data.cost_per_minute) * Number(this.final_time)).toFixed(2);
            this.total_cost = Number(this.total_cost_per_kilometer) + Number(this.total_cost_per_minute) + Number(this.cost_meta_data.service_charges) + Number(this.cost_meta_data.vanbr_charges);
            this.total_tax = (Number(this.total_cost) * Number(this.cost_meta_data.tax) / 100).toFixed(2);
          } else {
            this.is_ride_end = false;
            this.total_cost = Number(this.cost_meta_data.vanbr_charges) + Number(this.cost_meta_data.service_charges);
            this.total_tax = (Number(this.total_cost) * Number(this.cost_meta_data.tax) / 100).toFixed(2);
          }
        } catch (e) {
          this.checkError(e);
        }
      },
      async giveFeedback() {
        this.$router.push({name: 'Feedback', params: {id: this.$route.params.id}});
      },
      async bookRide() {
        this.$router.push({name: 'Booking'});
      },
    },
  };
</script>

<style lang="scss" scoped>

  .car-details {
    font-size: 18px;
  }
</style>
