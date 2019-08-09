import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/layouts/common/Login';
import ForgotPassword from '@/layouts/common/ForgotPassword';
import ResetPassword from '@/layouts/common/ResetPassword';
import ChangePassword from '@/layouts/common/ChangePassword';
import Pricing from '@/layouts/common/Pricing';
import Feedback from '@/layouts/common/Feedback';
import History from '@/layouts/common/History';
// Import all Driver Layouts
import DriverStatus from '@/layouts/driver/DriverStatus';
import Ride from '@/layouts/driver/Ride';
import Profile from '@/layouts/driver/Profile';
import DriverHistoryDetail from '@/layouts/driver/DriverHistoryDetail';

import Routes from './routes';

Vue.use(Router);

const routes = [
  {
    path: Routes.Pricing,
    name: 'Pricing',
    component: Pricing,
  },
  // Driver Routes
  {
    path: Routes.DriverStatus,
    name: 'DriverStatus',
    component: DriverStatus,
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
    path: Routes.ChangePassword,
    name: 'ChangePassword',
    component: ChangePassword,
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
  // {
  //   path: Routes.HistoryDetail,
  //   name: 'HistoryDetail',
  //   component: HistoryDetail,
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  {
    path: Routes.HistoryDetail,
    name: 'DriverHistoryDetail',
    component: DriverHistoryDetail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    redirect: Routes.DriverStatus,
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
      next({ name: 'DriverStatus' });
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
  next();
});

export default router;
