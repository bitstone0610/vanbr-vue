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
          :data="driverObj"
          :fields="fields"
          :sort-order="sortOrder"
          pagination-path=""
          :per-page="10"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:loading="onLoading"
          @vuetable:loaded="onLoaded">
          <template slot="actions" scope="props">
          <div class="table-button-container">
              <button class="btn btn-secondary btn-sm" @click="editDriver(props.rowData.id)">
                <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
              <button class="btn btn-primary btn-sm" @click="deleteDriver(props.rowData.id)">
                <span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;&nbsp;
              <button class="btn btn-secondary btn-sm" @click="payDriver(props.rowData.id)">
                <span class="glyphicon glyphicon-pencil"></span>Pay Driver</button>&nbsp;&nbsp;
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
  // eslint-disable
  import vuetable from 'vuetable-2';
  import Card from '@/components/Card';
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
  import VuetablePaginationBootstrap from '@/components/VuetablePaginationBootstrap';
  import { AppURL } from '@/constants';

  export default {
    name: 'Drivers',
    components: { Card, vuetable, VuetablePagination, VuetablePaginationBootstrap },
    data() {
      return {
        AppURL,
        filterText: '',
        driverObj: [],
        fields: [
          {
            name: 'id',
            title: '<span class="orange glyphicon glyphicon-user"></span> Id',
            sortField: 'id',
          },
          {
            name: 'driver.name',
            title: '<span class="orange glyphicon glyphicon-user"></span> Name',
            sortField: 'driver.name',
          },
          {
            name: 'driver.mobile_no',
            title: 'Contact',
          },
          {
            name: 'email',
            title: 'Email',
          },
          {
            name: 'driver.gender',
            title: 'Gender',
          },
          {
            name: 'driver.dob',
            title: 'DoB',
          },
          {
            name: 'driver.remaining_amount',
            title: '<span class="orange glyphicon glyphicon-user"></span> Remaining Payment',
            sortField: 'driver.remaining_amount',
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
      this.getDrivers();
    },
    methods: {
      async getDrivers() {
        try {
          const driver = await this.axios.get(`${this.AppURL}/admin/users/Driver`);
          this.driverObj = driver.data.data;
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      async deleteDriver(id) {
        const choice = confirm('Are you sure you want to delete this driver?');
        if (choice === true) {
          try {
            await this.axios.delete(`${this.AppURL}/admin/driver/${id}/delete`);
            alert('Successfully Driver Deleted!');
            this.getDrivers();
          } catch (e) {
            if (e.response) {
              this.checkError(e.response.status, e.response.data.message);
            }
          }
        }
      },
      async payDriver(id) {
        try {
          const paymentObj = {
            month: 0,
            status: true,
          };
          await this.axios.put(`${this.AppURL}/admin/ride/driver/${id}/payment/update`, paymentObj);
          this.getDrivers();
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      async editDriver(driver) {
        this.$router.push({ name: 'EditDriver', params: { id: driver } });
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
      editRow(rowData) {
        alert(JSON.stringify(rowData));
      },
      deleteRow(rowData) {
        alert(JSON.stringify(rowData));
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