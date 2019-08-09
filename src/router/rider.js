import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/layouts/common/Home'; // Home Layout
import Login from '@/layouts/common/Login';
import ForgotPassword from '@/layouts/common/ForgotPassword';
import ResetPassword from '@/layouts/common/ResetPassword';
import ChangePassword from '@/layouts/common/ChangePassword';
import VerifyEmail from '@/layouts/common/VerifyEmail';
import Pricing from '@/layouts/common/Pricing';
import Feedback from '@/layouts/common/Feedback';
import History from '@/layouts/common/History';
import HistoryDetail from '@/layouts/common/HistoryDetail';

// Import all the Rider Layouts
import Register from '@/layouts/rider/Register';
import Booking from '@/layouts/rider/Booking';
import Ride from '@/layouts/rider/Ride';
import Profile from '@/layouts/rider/Profile';
import Payment from '@/layouts/rider/Payment';
import Reference from '@/layouts/rider/Reference';
import Routes from './routes';

Vue.use(Router);

const routes = [
  {
    path: Routes.Home,
    name: 'Home',
    component: Home,
  },
  {
    path: Routes.Pricing,
    name: 'Pricing',
    component: Pricing,
  },
  {
    path: Routes.Login,
    name: 'Login',
    component: Login,
  },
  {
    path: Routes.ForgotPassword,
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: Routes.ResetPassword,
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: Routes.VerifyEmail,
    name: 'VerifyEmail',
    component: VerifyEmail,
  },
  {
    path: Routes.ChangePassword,
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Register,
    name: 'Register',
    component: Register,
  },
  {
    path: Routes.Profile,
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Feedback,
    name: 'Feedback',
    component: Feedback,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Booking,
    name: 'Booking',
    component: Booking,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Reference,
    name: 'Reference',
    component: Reference,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Ride,
    name: 'Ride',
    component: Ride,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.Payment,
    name: 'Payment',
    component: Payment,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.History,
    name: 'History',
    component: History,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: Routes.HistoryDetail,
    name: 'HistoryDetail',
    component: HistoryDetail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    redirect: Routes.Booking,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (to.path === '/login' || to.path === '/') {
      next({ name: 'Booking' });
      return;
    }
    if (to.meta.requiresAuth) {
      next();
      return;
    }
    next();
    return;
  }
  if (!token && to.meta.requiresAuth) {
    next({ name: 'Login' });
    return;
  }
  // } else {
  //   next({ name: 'Login' });
  // }
  next();
});

export default router;
