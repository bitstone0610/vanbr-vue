<template>
  <div class="login container main-app-section-sm">
    <Card class="mx-auto">
      <div class="title text-center">Forgot Password</div>
      <form>
        <div class="form-group main-app-section-xs">
          <label for="email">Email:</label>
          <input v-validate="'required|email'" name="email" type="email" id="email" class="form-control" placeholder="Email" v-model="email"/>
          <p class="error-msg">{{ errors.first('email') }}</p>
        </div>
        <div class="form-group main-app-section-md">
          <button type="submit" id="submit" class="btn btn-custom btn-block" @click="forgotpassword">Forgot Password</button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script>
  /* eslint-disable */
  import Routes from '@/router/routes';
  import Card from '@/components/Card';
  import { AppURL } from '@/constants';

  export default {
    name: 'ForgotPassword',
    components: { Card },
    data() {
      return {
        Routes,
        AppURL,
        role: '',
        email: '',
      };
    },
    mounted() {
      this.role = this.getRole();
    },
    methods: {
      async forgotpassword(event) {
        event.preventDefault();
        try {
          document.querySelector("#submit").disabled = true;
          const data = {
            email: this.email,
          };
          const response = await this.axios.post(`${this.AppURL}/${this.role}/forgot-password`, data);
          alert('Reset-Password email sent!')
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        } finally {
          document.querySelector("#submit").disabled = false;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>