<template>
  <div class="users container main-app-section-sm">
    <div class="row">
      <div class="col-md">
         <!-- <template>
          <div class="filter-bar ui basic segment grid main-app-section-sm search-box">
            <div class="ui form">
              <div class="inline field">
                <label>Search for:</label>
                <input type="text" v-model="search" class="three wide column" placeholder="Text to filter"> -->
                <!-- <button class="btn btn-primary" @click="setFilter(filterText)">Go</button> -->
                <!-- <button class="btn btn-secondary" @click="resetFilter(filterText)">Reset</button> -->
              <!-- </div>
            </div>
          </div>
        </template> -->

        <vuetable ref="vuetable"
          :api-mode="false"
          :css="css.table"
          :data="rideObj"
          :fields="fields"
          :sort-order="sortOrder"
          pagination-path=""
          :per-page="10"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:loading="onLoading"
          @vuetable:loaded="onLoaded">
          <template slot="actions" scope="props">
          <div class="table-button-container">
            <div class="d-flex justify-content-between">
              <div>Ride Status:</div><div><strong>{{ getRideStatus(props.rowData.ride_status) }}</strong></div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Payment Status:</div><div><strong>{{ getRideStatus(props.rowData.payment_status) }}</strong></div>
            </div>
          </div>
          </template>
        </vuetable>
        <vuetable-pagination-bootstrap ref="pagination"
          @vuetable-pagination:change-page="onChangePage">
        </vuetable-pagination-bootstrap>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import Card from '@/components/Card';
  import Vuetable from 'vuetable-2/src/components/Vuetable';
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
  import VuetablePaginationBootstrap from '@/components/VuetablePaginationBootstrap';
  import { AppURL } from '@/constants';

  export default {
    name: 'PaymentList',
    components: {
      Card,
      Vue,
      Vuetable,
      VuetablePagination,
      VuetablePaginationBootstrap,
    },
    computed: {
      filteredList() {
        return this.postList.filter(function () {
          return this.rideObj.driver.name.toLowerCase().includes(this.search.toLowerCase());
        });
      },
    },
    data() {
      return {
        AppURL,
        filterText: '',
        moreParams: {},
        rideStatus: '',
        paymentStatus: '',
        pickup: '',
        drop: '',
        rideObj: [],
        fields: [
          {
            name: 'id',
            title: '<span class="orange glyphicon glyphicon-user"></span>Ride Id',
            sortField: 'payment.ride_id',
          },
          {
            name: 'cost',
            title: '<span class="orange glyphicon glyphicon-user"></span>Ride Cost (in $)',
            sortField: 'payment.cost',
          },
          {
            name: 'payment.stripe_id',
            title: 'Stripe Id',
            sortField: 'payment.stripe_id',
          },
          // {
          //   name: 'payment_status',
          //   title: 'Payment Status',
          //   sortField: 'payment_status',
          // },
          // {
          //   name: 'ride_status',
          //   title: 'Ride Status',
          //   sortField: 'ride_status',
          // },
          '__slot:actions',
        ],
        sortOrder: [
          {
            field: 'rider.name',
            direction: 'asc',
          },
        ],
        css: {
          table: {
            tableClass: 'table table-striped table-bordered table-hovered',
            loadingClass: 'loading',
            ascendingIcon: 'glyphicon glyphicon-chevron-up',
            descendingIcon: 'glyphicon glyphicon-chevron-down',
            handleIcon: 'glyphicon glyphicon-menu-hamburger',
          },
          pagination: {
            infoClass: 'pull-left',
            wrapperClass: 'vuetable-pagination pull-right',
            activeClass: 'btn-primary',
            disabledClass: 'disabled',
            pageClass: 'btn btn-border',
            linkClass: 'btn btn-border',
            icons: {
              first: '',
              prev: '',
              next: '',
              last: '',
            },
          },
        },
      };
    },
    mounted() {
      this.getRides();
    },
    methods: {
      async getRides() {
        try {
          const ride = await this.axios.get(`${this.AppURL}/admin/rides/list`);
          
          this.rideObj = ride.data.data;

          this.paymentStatus = this.rideObj.payment_status;
          const pickupObj = OpenLocationCode.decode(this.rideObj.pick_up_point);
          this.pickup = await this.getLocation(pickupObj);
          this.rideObj.pick_up_point = this.pickup;

          const dropObj = OpenLocationCode.decode(this.rideObj.drop_point);
          this.drop = await this.getLocation(dropObj);
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      getLocation(locationObj) {
        return new Promise( ( resolve => {
          const geocoder = new google.maps.Geocoder;
          geocoder.geocode({ location: { lat: locationObj.latitudeCenter, lng: locationObj.longitudeCenter } }, function(results, status) {
            if (status === 'OK') {
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
      setFilter(filterText) {
        this.moreParams = {
          filter: filterText,
        };
        Vue.nextTick(() => this.$refs.vuetable.refresh());
      },
      resetFilter() {
        this.moreParams = {};
        Vue.nextTick(() => this.$refs.vuetable.refresh());
      },
      // onFilterSet(filterText) {
      //   this.moreParams = {
      //     filter: filterText,
      //   };
      //   console.log('fired');
      //   Vue.nextTick(() => this.$refs.vuetable.refresh());
      // },
      // onFilterReset() {
      //   this.moreParams = {};
      //   Vue.nextTick(() => this.$refs.vuetable.refresh());
      // },
      // doFilter() {
      //   console.log('doFilter:', this.filterText);
      //   this.$events.fire('filter-set', this.filterText);
      // },
      // resetFilter() {
      //   this.filterText = '';
      //   console.log('resetFilter');
      //   this.$events.fire('filter-reset');
      // },
      onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData);
      },
      onChangePage(page) {
        this.$refs.vuetable.changePage(page);
      },
      onLoading() {
        // console.log('loading... show your spinner here');
      },
      onLoaded() {
        // console.log('loaded! .. hide your spinner here');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .users {
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #ddd;
    padding: 20px;
  }
  .search-box {
    margin-bottom: 25px;
  }
  .orange.glyphicon {
    color: blue;
  }

  th.sortable {
    color: blue;
  }
</style>