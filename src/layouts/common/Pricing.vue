<template>
    <div class="pricing container">
      <div class="row">
        <div class="col-md main-app-section-sm">
          <Card class="mx-auto">
            <div class="d-flex justify-content-center">
              <div class="car-logo">
                <img src="@/assets/sedan.png" />
              </div>
            </div>
            <div class="subtitle text-center text-secondary">Sedan</div>

            <div class="main-app-section-sm">
              <div class="d-flex justify-content-between car-details">
                <div>Available seats:</div>
                <div>1-{{sedan.max_seats}}</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Booking fees:</div>
                <div>${{sedan.vanbr_charges}}</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Service charge:</div>
                <div>${{sedan.service_charges}}</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Per kilometer:</div>
                <div>${{sedan.cost_per_kilometer}}</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Per minute:</div>
                <div>${{sedan.cost_per_minute}}</div>
              </div>
            </div>
            <div class="main-app-section-sm car-details">
              <router-link :to="Routes.Booking">
                <button id="submit" class="btn btn-custom btn-block">
                  Book Now
                </button>
              </router-link>
            </div>
          </Card>
        </div>
        <div class="col-md main-app-section-sm">
          <Card class="mx-auto">
            <div class="d-flex justify-content-center">
              <div class="car-logo">
                <img src="@/assets/van.png" />
              </div>
            </div>
            <div class="subtitle text-center text-secondary">Mini Van</div>

            <div class="main-app-section-sm">
              <div class="d-flex justify-content-between car-details">
                <div>Available seats:</div>
                <div>1-{{mini_van.max_seats}}</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Booking fees:</div>
                <div>${{mini_van.vanbr_charges}}</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Service charge:</div>
                <div>${{mini_van.service_charges}}</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Per kilometer:</div>
                <div>${{mini_van.cost_per_kilometer}}</div>
              </div>
              <div class="d-flex justify-content-between car-details">
                <div>Per minute:</div>
                <div>${{mini_van.cost_per_minute}}</div>
              </div>
              <div class="main-app-section-sm car-details">
                <router-link :to="Routes.Booking">
                  <button id="submit1" class="btn btn-custom btn-block">
                    Book Now
                  </button>
                </router-link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
</template>

<script>
  /* eslint-disable */
  import Routes from '@/router/routes';
  import Card from '@/components/Card';
  import { AppURL } from '@/constants';

  export default {
    name: 'Pricing',
    components: { Card },
    data() {
      return {
        AppURL,
        Routes,
        sedan: {},
        mini_van: {},
      };
    },
    mounted() {
      this.getCars();
    },
    methods: {
      async getCars() {
        try {
          document.querySelector("#submit").disabled = true;
          document.querySelector("#submit1").disabled = true;
          const response = await this.axios.get(`${this.AppURL}/get-cars`);
          
          const car_data = response.data.data;
          this.sedan = car_data[0];
          this.mini_van = car_data[1];
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        } finally {
          document.querySelector("#submit").disabled = false;
          document.querySelector("#submit1").disabled = false;
        }
      },
    }
  };
</script>

<style lang="scss" scoped>

  .car-logo {
    border-radius: 50%;
    box-shadow: 0 0px 8px 0 #ccc;
    padding: 8px;
    background-color: #F8F8F8;

    img {
      width: 52px;
    }
  }

  .car-details {
    font-size: 18px;
    padding: 4px 20px;
  }

</style>
