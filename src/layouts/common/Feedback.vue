<template>
    <div class="booking container main-app-section-md">
      <Card class="mx-auto">
        <div class="title text-center">Give Feedback</div>
        <form name="book">
          <div class="form-group main-app-section-sm p-2">
            <div class="d-flex justify-content-between">
              <div><strong>Source</strong>:</div>
              <div>{{start_point_address}}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Destination</strong>:</div>
              <div>{{end_point_address}}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Rider</strong>:</div>
              <div>{{rider}}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Driver</strong>:</div>
              <div>{{driver}}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div><strong>Date</strong>:</div>
              <div>{{date}}</div>
            </div>
          </div>
          <div class="form-group main-app-section-sm">
            <label for="rating">Rating</label>
            <star-rating id="rating" :show-rating="false" v-model="rating"></star-rating>
          </div>
          <div class="form-group main-app-section-sm">
            <label for="feedback">Feedback</label>
            <textarea v-validate="'required'" row="4" class="form-control" name="feedback" id="feedback" v-model="comment">
            </textarea>
            <p class="error-msg">{{ errors.first('feedback') }}</p>
          </div>
          <div class="form-group main-app-section-md">
            <button class="btn btn-custom btn-block" id="submit" @click="feedback">Submit</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  /* eslint-disable */
  import Card from '@/components/Card';
  import StarRating from 'vue-star-rating';
  import { AppURL } from '@/constants';

  export default {
    name: 'Payment',
    components: { Card, StarRating },
    data() {
      return {
        AppURL,
        role: '',
        start_point_address: '',
        end_point_address: '',
        rider: '',
        driver: '',
        date: '',
        rating: null,
        comment: ''
      };
    },
    mounted() {
      this.role = this.getRole();
      this.getRide();
    },
    methods: {
      async getRide() {
        try {
          document.querySelector('#submit').disabled = true;
          const response = await this.axios.get(`${this.AppURL}/${this.role}/get-single-ride?ride_id=${this.$route.params.id}`);
          
          const ride = response.data.data;

          if (((this.role === 'rider' && ride.payment_status === 3) || this.role === 'driver') && ride.ride_status === 3) {

            const ride_meta_data = ride.ride_meta_data;
            
            this.start_point_address = ride_meta_data.final_start_point_address;
            this.end_point_address = ride_meta_data.final_end_point_address;
            
            this.rider = ride.rider.name;
            this.driver = ride.driver.name;
            
            this.date = this.moment.utc(ride.cost_meta_data.ride_end_time).local().format('YYYY-MM-DD, HH:mm');
          } else {
            this.$router.push('/');
          }
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        } finally {
          document.querySelector('#submit').disabled = false;
        }
      },
      async feedback(event) {
        event.preventDefault();
        if(!this.rating) {
          alert('Please Give Rating!!!');
          return false;
        }
        try {
          const data = {
            ride_id: this.$route.params.id,
            ratings: this.rating,
            comments: this.comment || undefined,
          };
          const response = await this.axios.post(`${this.AppURL}/${this.role}/feedback`, data);
          this.$router.push({name: 'Booking'});
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

</style>
