<template>
  <div class="users container main-app-section-sm">
    <div class="row">
      <div class="col-md">
        <!-- <template>
          <div class="filter-bar ui basic segment grid main-app-section-sm search-box">
            <div class="ui form">
              <div class="inline field">
                <label>Search for:</label>
                <input type="text" v-model="filterText" class="three wide column" @keyup.enter="doFilter" placeholder="Text to filter">
                <button class="btn btn-primary" @click="doFilter">Go</button>
                <button class="btn btn-secondary" @click="resetFilter">Reset</button>
              </div>
            </div>
          </div>
        </template> -->
        <vuetable ref="vuetable"
          :api-mode="false"
          :css="css.table"
          :data="riderObj"
          :fields="fields"
          :sort-order="sortOrder"
          pagination-path=""
          :per-page="10"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:loading="onLoading"
          @vuetable:loaded="onLoaded">
        </vuetable>
        <vuetable-pagination-bootstrap ref="pagination"
          @vuetable-pagination:change-page="onChangePage">
        </vuetable-pagination-bootstrap>
      </div>
    </div>
  </div>
</template>

<script>
  // eslint-disable
  import vuetable from 'vuetable-2';
  import Card from '@/components/Card';
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
  import VuetablePaginationBootstrap from '@/components/VuetablePaginationBootstrap';
  import { AppURL } from '@/constants';

  export default {
    name: 'Riders',
    components: { Card, vuetable, VuetablePagination, VuetablePaginationBootstrap },
    data() {
      return {
        AppURL,
        filterText: '',
        riderObj: [],
        fields: [
          {
            name: 'id',
            title: '<span class="orange glyphicon glyphicon-user"></span> Id',
            sortField: 'id',
          },
          {
            name: 'rider.name',
            title: '<span class="orange glyphicon glyphicon-user"></span> Name',
            sortField: 'rider.name',
          },
          {
            name: 'rider.mobile_no',
            title: 'Contact',
          },
          {
            name: 'email',
            title: 'Email',
          },
          {
            name: 'rider.gender',
            title: 'Gender',
          },
          {
            name: 'rider.dob',
            title: 'DoB',
          },
          '__slot:actions',
        ],
        sortOrder: [
          {
            field: 'name',
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
      this.getRiders();
    },
    methods: {
      async getRiders() {
        try {
          const rider = await this.axios.get(`${this.AppURL}/admin/users/Rider`);
          this.riderObj = rider.data.data;
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      doFilter() {
        this.$events.fire('filter-set', this.filterText);
      },
      resetFilter() {
        this.filterText = '';
        this.$events.fire('filter-reset');
      },
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
  .orange.glyphicon {
    color: blue;
  }
  .search-box {
    margin-bottom: 25px;
  }
  th.sortable {
    color: blue;
  }
</style>