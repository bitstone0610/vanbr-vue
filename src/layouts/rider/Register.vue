<template>
    <div class="register container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Register</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">Name:</label>
            <input v-validate="'required|alpha_spaces'" name="name" type="text" class="form-control" placeholder="Name" v-model="name" id="name"/>
            <p class="error-msg">{{ errors.first('name') }}</p>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Date of Birth:</label>
            <input v-validate="'required'" name="dob" type="date" class="form-control" id="dob" v-model="dob"/>
            <p class="error-msg">{{ errors.first('dob') }}</p>            
          </div>
          <div class="form-group main-app-section-xs">
            <label for="dob">Mobile Number:</label>
            <input type="number" v-validate="'required|numeric'" name="mobile" class="form-control" id="mobile" v-model="mobile_no"/>
            <p class="error-msg">{{ errors.first('mobile') }}</p>            
          </div>
          <div class="form-group main-app-section-xs">
            <label>Gender:</label>
            <select v-validate="'required'" name="gender" v-model="gender" class="form-control">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <p class="error-msg">{{ errors.first('gender') }}</p>            
          </div>
          <div class="form-group main-app-section-xs">
            <label for="email">Email:</label>
            <input v-validate="'required|email'" name="email" type="text" class="form-control" placeholder="Email" id="email" v-model="email"/>
            <p class="error-msg">{{ errors.first('email') }}</p>            
          </div>
          <div class="form-group main-app-section-xs">
            <label for="password">Password:</label>
            <input v-if="!passwordFlag" v-validate="'required'" name="password" type="password" class="form-control" v-model="password" placeholder="Password" id="password"/>
            <input v-if="passwordFlag" v-validate="'required'" name="password" type="text" class="form-control" v-model="password" placeholder="Password" id="password"/>
            <p class="error-msg">{{ errors.first('password') }}</p>            
            <input v-model="passwordFlag" type="checkbox" id="password-check" class="main-app-section-xs"/>
            <label for="password-check">Show/Hide Password</label>
          </div>
          <div class="form-group main-app-section-sm">
            <label><strong>Enter Card details:</strong></label>
            <StripeCard class='stripe-card'
              :class='{ complete }'
              :stripe='STRIPE_PUBLISHABLE_KEY'
              :options='stripeOptions'
              @change='complete = $event.complete'
            />
          </div>
          <div class="form-group main-app-section-sm">
            <button type="submit" id="submit" class="btn btn-custom btn-block" @click="signup" :disabled='!complete'>Submit</button>
          </div>
          <div class="main-app-section-xs">
            <router-link :to="Routes.Login">Already have an account?</router-link>
          </div>
        </form>
      </Card>
    </div>
</template>complete: false,

<script>
  /* eslint-disable */
  import Routes from '@/router/routes';
  import { Card as StripeCard, createToken } from 'vue-stripe-elements-plus';
  import Card from '@/components/Card';
  import { AppURL, STRIPE_PUBLISHABLE_KEY } from '@/constants';

  export default {
    name: 'Register',
    components: { Card, StripeCard },
    data() {
      return {
        AppURL,
        STRIPE_PUBLISHABLE_KEY,
        Routes,
        name: '',
        dob: '',
        gender: '',
        mobile_no: '',
        email: '',
        password: '',
        passwordFlag: false,
        complete: false,
        stripeOptions: {
          name: '',
          currency: 'cad',
        },
      };
    },
    methods: {
      async signup(event) {
        event.preventDefault();
        const stripeToken = await createToken();
        if (!stripeToken) {
          alert('Enter Valid Card Details');
        }
        if (stripeToken.error) {
          alert(stripeToken.error.message);
        }
        try {
          document.querySelector("#submit").disabled = true;
          const data = {
            email: this.email,
            password: this.password,
            name: this.name,
            mobile_no: this.mobile_no,
            dob: this.dob,
            gender: this.gender,
            token: stripeToken.token,
          };
          const response = await this.axios.post(`${this.AppURL}/rider/signup`, data);
          await localStorage.setItem('token', response.data.token);
          this.$socket.emit('join', response.data.token);
          this.$root.$emit('auth');
          this.axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
          this.$router.push(Routes.Booking);
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

<style scoped>
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
  .error-msg {
    color: #a30015;
    font-size: 12px;
    margin-top: 5px;
  }
</style>
