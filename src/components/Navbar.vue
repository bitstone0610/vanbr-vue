<template>
    <nav class="d-flex">
      <div class="logo">
        <router-link :to="Routes.Home">
          <img src="@/assets/logo.svg" class="logo-image"/>
        </router-link>
      </div>
      <Desktop class="ml-auto">
        <div class="nav-menus d-flex" v-if="role === 'rider' || role === 'driver'">
          <router-link :to="Routes.Pricing" class="d-flex align-items-center justify-content-center">
            <div class="nav-menu p-2">Pricing</div>
          </router-link>
          <router-link :to="Routes.Booking" class="d-flex align-items-center justify-content-center" v-if="role === 'rider'">
            <div class="nav-menu p-2">Book</div>
          </router-link>
          <router-link :to="Routes.DriverStatus" class="d-flex align-items-center justify-content-center" v-if="role === 'driver'">
            <div class="nav-menu p-2">Status</div>
          </router-link>
          <router-link :to="Routes.History" class="d-flex align-items-center justify-content-center">
            <div class="nav-menu p-2">History</div>
          </router-link>
          <router-link :to="Routes.Profile" class="d-flex align-items-center justify-content-center">
            <div class="nav-menu p-2">Profile</div>
          </router-link>
          <router-link :to="Routes.Login" class="d-flex align-items-center justify-content-center" v-if="!auth">
            <div class="nav-menu p-2">Login</div>
          </router-link>
          <router-link :to="Routes.Register" class="d-flex align-items-center justify-content-center" v-if="!auth && role === 'rider'">
            <div class="nav-menu p-2">Register</div>
          </router-link>
          <a href="javascript:void(0);" class="d-flex align-items-center justify-content-center" @click="logout" v-if="auth">
            <div class="nav-menu p-2">Logout</div>
          </a>
        </div>
        <div class="nav-menus d-flex" v-if="role === 'admin'">
          <router-link :to="Routes.Login" class="d-flex align-items-center justify-content-center" v-if="!auth">
            <div class="nav-menu p-2">Login</div>
          </router-link>
          <a href="javascript:void(0);" class="d-flex align-items-center justify-content-center" @click="logout" v-if="auth">
            <div class="nav-menu p-2">Logout</div>
          </a>
        </div>
      </Desktop>
      <MobileTablet class="d-flex ml-auto align-items-center">
        <img src="@/assets/bars.svg" class="nav-bars" @click="toggleNav"/>
      </MobileTablet>

      <MobileTablet class="nav-slide" :class="{'active': isActive}">
        <div class="nav-slide-menus" v-if="role === 'rider' || role === 'driver'">
          <router-link :to="Routes.Pricing" class="d-flex align-items-center justify-content-left">
            <div class="nav-menu p-2" @click="toggleNav">Pricing</div>
          </router-link>
          <router-link :to="Routes.Booking" class="d-flex align-items-center justify-content-left" v-if="role === 'rider'">
            <div class="nav-menu p-2" @click="toggleNav">Book</div>
          </router-link>
          <router-link :to="Routes.DriverStatus" class="d-flex align-items-center justify-content-left" v-if="role === 'driver'">
            <div class="nav-menu p-2" @click="toggleNav">Status</div>
          </router-link>
          <router-link :to="Routes.History" class="d-flex align-items-center justify-content-left">
            <div class="nav-menu p-2" @click="toggleNav">History</div>
          </router-link>
          <router-link :to="Routes.Profile" class="d-flex align-items-center justify-content-left">
            <div class="nav-menu p-2" @click="toggleNav">Profile</div>
          </router-link>
          <router-link :to="Routes.Login" class="d-flex align-items-center justify-content-left" v-if="!auth">
            <div class="nav-menu p-2" @click="toggleNav">Login</div>
          </router-link>
          <router-link :to="Routes.Register" class="d-flex align-items-center justify-content-left" v-if="!auth && role === 'rider'">
            <div class="nav-menu p-2" @click="toggleNav">Register</div>
          </router-link>
          <a href="javascript:void(0);" class="d-flex align-items-center justify-content-left" @click="logout" v-if="auth">
            <div class="nav-menu p-2" @click="toggleNav">Logout</div>
          </a>
        </div>
        <div class="nav-slide-menus" v-if="role === 'admin'">
          <router-link :to="Routes.Login" class="d-flex align-items-center justify-content-left" v-if="!auth">
            <div class="nav-menu p-2" @click="toggleNav">Login</div>
          </router-link>
          <a href="javascript:void(0);" class="d-flex align-items-center justify-content-left" @click="logout" v-if="auth">
            <div class="nav-menu p-2" @click="toggleNav">Logout</div>
          </a>
        </div>
      </MobileTablet>

    </nav>
</template>

<script>
  import Routes from '@/router/routes';
  import MobileTablet from '@/components/MediaQuery/MobileTablet';
  import Desktop from '@/components/MediaQuery/Desktop';
  import { AppURL } from '@/constants';

  export default {
    name: 'Navbar',
    components: { Desktop, MobileTablet },
    data() {
      return {
        Routes,
        AppURL,
        isActive: false,
        role: '',
      };
    },
    mounted() {
      this.role = this.getRole();
      this.$root.$on('auth', () => { this.auth = this.authStatus(); });
    },
    methods: {
      toggleNav() {
        this.isActive = !this.isActive;
      },
      async logout() {
        try {
          await this.axios.post(`${this.AppURL}/logout`);
          await delete this.axios.defaults.headers.common.Authorization;
          await localStorage.clear();
          await this.$root.$emit('auth');
          this.$router.push(Routes.Login);
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        }
      },
      logoutHandler() {
        this.toggleNav();
        this.logout();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/constants';
  nav {
    position: sticky;
    top: 0;
    z-index: 10;
    height: 72px;
    width: 100%;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px 0 #ccc;
    padding: 0 32px;
  }
  .logo {
    .logo-image {
      height: 52px;
      width: auto;
      margin-top: 8px;
    }
  }
  .nav-menus a {
    font-size: 18px;
    height: 100%;
    width: 80px;

    &:hover {
      background: #F8F8F8;
      text-decoration: none;
    }

    &.active {
      background: #FAFAFA;
      text-decoration: none;
    }
  }

  .nav-bars {
    height: 32px;
    cursor: pointer;
  }

  .nav-slide {
    position: fixed;
    top: 73px;
    bottom: 0;
    width: 100%;
    right: -100%;
    padding: 4px 20px;
    background-color: $white_color;
    transition: 0.4s all ease;

    &.active {
      right: 0;
    }

    .nav-slide-menus a {
      font-size: 20px;
      color: $primary_color;
    }
  }

  @media (max-width: 768px) {
    nav {
      padding: 0 16px;
    }
  }
</style>
