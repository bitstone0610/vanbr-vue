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
            <button class="btn btn-secondary btn-sm" @click="getPickupPoint(props.rowData.pick_up_point)">
              <span class="glyphicon glyphicon-pencil"></span>Pickup Point</button>&nbsp;&nbsp;
            <button class="btn btn-secondary btn-sm" @click="getDropPoint(props.rowData.drop_point)">
              <span class="glyphicon glyphicon-trash"></span>Drop Point</button>&nbsp;&nbsp;
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
    name: 'Users',
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
        pickup: '',
        drop: '',
        rideObj: [],
        fields: [
          {
            name: 'rider.name',
            title: '<span class="orange glyphicon glyphicon-user"></span>Rider Name',
            sortField: 'rider_name',
          },
          {
            name: 'rider_user_id',
            title: 'Id',
            sortField: 'rider_user_id',
          },
          {
            name: 'driver.name',
            title: '<span class="orange glyphicon glyphicon-user"></span>Driver Name',
            sortField: 'driver_name',
          },
          {
            name: 'driver_user_id',
            title: 'Id',
            sortField: 'driver_user_id',
          },
          {
            name: 'driver_user_id',
            title: 'Id',
            sortField: 'driver_user_id',
          },
          'ride_create_time',
          'cost',
          // {
          //   name: 'ride_status',
          //   title: 'Status',
          //   sortField: 'Status',
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
      getPickupPoint(location) {
        window.open(`https://plus.codes/${location}`);
      },
      getDropPoint(location) {
        window.open(`https://plus.codes/${location}`);
      },
      async getRides() {
        try {
          const ride = await this.axios.get(`${this.AppURL}/admin/rides/list`);
          this.rideObj = ride.data.data;

          const pickupObj = OpenLocationCode.decode(this.rideObj.pick_up_point);
          this.pickup = await this.getLocation(pickupObj);
          this.rideObj.pick_up_point = this.pickup;

          const dropObj = OpenLocationCode.decode(this.rideObj.drop_point);
          this.drop = await this.getLocation(dropObj);
        } catch (e) {
          this.checkError(e.response.status, e.response.data.message);
        }
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