<template>
    <div class="reference container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Add Reference</div>
        <form class="main-app-section-sm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input v-validate="'required|alpha_spaces'" name="name" type="text" class="form-control" placeholder="Name of reference" id="name" v-model="name"/>
            <p class="error-msg">{{ errors.first('name') }}</p>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-validate="'required|email'" name="email" type="text" class="form-control" placeholder="Email of reference" id="email" v-model="email"/>
            <p class="error-msg">{{ errors.first('email') }}</p>
          </div>
          <div class="form-group">
            <label for="contact">Contact Number:</label>
            <input v-validate="'required|length:10|numeric'" name="mobile" type="number" class="form-control" placeholder="Contact of reference" id="contact" v-model="mobile_no"/>
            <p class="error-msg">{{ errors.first('mobile') }}</p>          
          </div>
          <div class="form-group">
            <label for="relationship">Relationship:</label>
            <input v-validate="'alpha_spaces'" name="relation" type="text" class="form-control" placeholder="Relationship with reference" id="relationship" v-model="relationship"/>
            <p class="error-msg">{{ errors.first('relation') }}</p>            
          </div>
          <div class="row form-group main-app-section-md">
            <div class="col">
              <button class="btn btn-block btn-outline-danger btn-ride" @click="cancel">Cancel</button>
            </div>
            <div class="col">
              <button type="submit" class="btn btn-custom btn-block" @click="addReference">Add Reference</button>
            </div>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  /* eslint-disable */
  import Card from '@/components/Card';
  import { AppURL } from '@/constants';

  export default {
    name: 'Reference',
    components: { Card },
    data() {
      return {
        AppURL,
        name: '',
        email: '',
        mobile_no: '',
        relationship: '',
      };
    },
    methods: {
      async addReference(event) {
        event.preventDefault();
        try {
          const data = {
            name: this.name,
            email: this.email,
            mobile_no: this.mobile_no,
            relationship: this.relationship,
          };
          const response = await this.axios.post(`${this.AppURL}/rider/add-reference`, data);
          this.$router.push({name: 'Booking'});
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      cancel(event) {
        event.preventDefault();
        this.$router.push({name: 'Booking'});
      }
    },
  };
</script>

<style scoped>

</style>
