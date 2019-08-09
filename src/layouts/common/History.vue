<template>
  <div class="main-app-section-sm container">
    <Card class="mx-auto">
      <div class="title">History</div>
      <div class="history-card" v-if="role === 'driver'">
        <div class="d-flex justify-content-between">
          <span>Total Unpaid Amount:</span>
          <strong><span class="history-card-detail">${{ driverCost }}</span></strong>
        </div>
      </div>
      <div v-for="history in historyItem" :key="history.id">
        <div class="history-card" >
          <!-- for 0 1 2 -->
          <router-link :to="{name: 'Ride', params: {id: history.id}}" v-if="history.ride_status === 0 || history.ride_status === 1 || history.ride_status === 2">
            <div class="d-flex justify-content-between ride-going">
              <div class="ride-going"><span>{{ moment.utc(history.ride_create_time).local().format('YYYY-MM-DD, HH:mm') }}</span></div>
              <div><span class="history-card-detail">${{ history.cost }}</span></div>
            </div>
            <div class="d-flex ride-going">
              <span class="history-card-detail">Ride Status:{{ getRideStatus(history.ride_status) }}</span>
              <!-- <span class="history-card-detail">Payment Status:{{ history.payment_status }}</span> -->
            </div>
          </router-link>
          <router-link :to="{name: 'HistoryDetail', params: {id: history.id}}" v-if="role === 'rider' && (history.ride_status === 3 || history.ride_status === 4 || history.ride_status === 5)">
            <div class="d-flex justify-content-between">
              <span>{{ moment.utc(history.ride_create_time).local().format('YYYY-MM-DD, HH:mm') }}</span>
              <span class="history-card-detail">${{ history.cost }}</span>
            </div>
            <div class="d-flex">
              <span class="history-card-detail">Ride Status:{{ getRideStatus(history.ride_status) }}</span>
            </div>
          </router-link>
          <router-link :to="{name: 'DriverHistoryDetail', params: {id: history.id}}" v-if="role === 'driver' && (history.ride_status === 3 || history.ride_status === 4 || history.ride_status === 5)">
            <div class="d-flex justify-content-between">
              <span>{{ moment.utc(history.ride_create_time).local().format('YYYY-MM-DD, HH:mm') }}</span>
              <span class="history-card-detail">${{ history.cost }}</span>
            </div>
            <div class="d-flex">
              <span class="history-card-detail">Ride Status:{{ getRideStatus(history.ride_status) }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import Routes from '@/router/routes';
  import Card from '@/components/Card';
  import { AppURL } from '@/constants';

  export default {
    name: 'History',
    components: {
      AppURL,
      Card,
    },
    data() {
      return {
        AppURL,
        Routes,
        historyItem: [],
        role: '',
        driverCost: '',
      };
    },
    beforeMount() {
      this.role = this.getRole();
      this.getHistory();
    },
    methods: {
      async getHistory() {
        try {
          if (this.role === 'driver') {
            const driverCost = await this.axios.get(`${this.AppURL}/${this.role}/get-driver-cost`);
            this.driverCost = driverCost.data.data.driver_cost;
          }
          const history = await this.axios.get(`${this.AppURL}/${this.role}/get-all-rides`);
          this.historyItem = history.data.data;
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
  .history-card {
    margin-top: 15px;
    border: 1px solid #eee;
    border-radius: 0.25rem;
    padding: 20px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
  }

  .history-card-detail {
    text-align: right;
  }

  a {
    color: black;
  }
  .status {
    margin-left: 10px;
  }
  .ride-going {
    color: #6D7ED8;
  }
</style>
