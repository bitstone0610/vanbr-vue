<template>
    <div class="profile container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">My Profile</div>
        <form>
          <div class="d-flex justify-content-between pt-4">
            <div>Name:</div>
            {{driver.name}}
            <!-- <div v-bind="name"></div> -->
          </div>
          <div class="d-flex justify-content-between">
            <label for="dob">Date of Birth:</label>
            {{driver.dob}}
            <!-- <input type="date" v-model="dob" class="form-control" id="dob"/> -->
          </div>
          <div class="d-flex justify-content-between">
            <label for="mobile">Mobile Number:</label>
            {{driver.mobile_no}}
            <!-- <input v-model="mobile_no" type="number" class="form-control" placeholder="Mobile" id="mobile"/> -->
          </div>
          <div class="d-flex justify-content-between">
            <label for="gender">Gender:</label>
            {{driver.gender}}
            <!-- <select class="form-control" v-model="gender" id="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select> -->
          </div>
          <div class="d-flex justify-content-between">
            <label for="email">Email:</label>
            {{email}}
            <!-- <input type="text" v-model="email" class="form-control" placeholder="Email" id="email"/> -->
          </div>
          <div class="d-flex justify-content-between">
            <label>Car Model:</label>
            {{driver.car_model}}
          </div>
          <div class="d-flex justify-content-between">
            <label>Car Number:</label>
            {{driver.car_number}}
          </div>
          <div class="d-flex justify-content-between">
            <label>Address:</label>
            {{driver.address}}
          </div>
          <div class="d-flex justify-content-between">
            <label>Insurance Number:</label>
            {{driver.insurance_number}}
          </div>
          <div class="d-flex justify-content-between">
            <label>Insurance Expiry Date:</label>
            {{driver.insurance_expiry_date}}
          </div>
          <div class="d-flex justify-content-between">
            <label>License Number:</label>
            {{driver.license_number}}
          </div>
          <div class="d-flex justify-content-between">
            <label>License Expiry Date:</label>
            {{driver.license_expiry_date}}
          </div>
          <router-link :to="Routes.ChangePassword" class="d-flex align-items-center justify-content-left">
            Change Password
          </router-link>
        </form>
      </Card>
    </div>
</template>

<script>
  import Card from '@/components/Card';
  import Routes from '@/router/routes';
  import { AppURL } from '@/constants';

  export default {
    name: 'Profile',
    components: { Card },
    data() {
      return {
        AppURL,
        Routes,
        driver: {},
        email: '',
        id: '',
        role: '',
      };
    },
    mounted() {
      this.getProfile();
    },
    methods: {
      async getProfile() {
        try {
          const profile = await this.axios.get(`${this.AppURL}/driver/profile`);
          this.id = profile.data.data.user.id;
          this.email = profile.data.data.user.email;
          this.driver = profile.data.data;
          this.role = profile.data.data.user.role;
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
    },
  };
</script>

<style scoped>

</style>
