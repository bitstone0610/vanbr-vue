<template>
  <div class="login container main-app-section-sm">
    <Card class="mx-auto">
      <div class="title text-center">Reset Password</div>
      <form>
        <div class="form-group main-app-section-xs">
          <label for="newPassword">New Password:</label>
          <input v-validate="'required|confirmed:confirmation'" name="password" type="password" id="newPassword" class="form-control" placeholder="New Password" v-model="newPassword"/>
          <p class="error-msg">{{ errors.first('password') }}</p>
        </div>
        <div class="form-group main-app-section-xs">
          <label for="confirmPassword">Confirm Password:</label>
          <input v-validate="'required'" name="passwordConfirmation" ref="confirmation" type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password" v-model="confirmPassword"/>
          <p class="error-msg">{{ errors.first('passwordConfirmation') }}</p>
        </div>
        <div class="form-group main-app-section-md">
          <button type="submit" id="submit" class="btn btn-custom btn-block" @click="resetpassword">Reset Password</button>
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
  import VeeValidate from 'vee-validate';

  export default {
    name: 'ResetPassword',
    components: { Card, VeeValidate },
    data() {
      return {
        Routes,
        AppURL,
        role: '',
        newPassword: '',
        confirmPassword: '',
        token: '',
      };
    },
    mounted() {
      this.role = this.getRole();
      const token = this.$route.params.token;
      if (token) {
        this.token = token;
      } else {
        this.$router.push(Routes.ForgotPassword);
      }
    },
    methods: {
      async resetpassword(event) {
        event.preventDefault();
        try {
          document.querySelector("#submit").disabled = true;
          const data = {
            new_password: this.newPassword,
            confirm_password: this.confirmPassword,
            token: this.token,
          };
          await this.axios.post(`${this.AppURL}/${this.role}/reset-password`, data);
          this.$router.push(Routes.Login);
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