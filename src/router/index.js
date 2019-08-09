import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/layouts/Home'; // Home Layout
import Terms from '@/layouts/common/Terms';
import Login from '@/layouts/Login';
import Pricing from '@/layouts/Pricing';
import Feedback from '@/layouts/Feedback';
import Profile from '@/layouts/Profile';
import History from '@/layouts/History';
import HistoryDetail from '@/layouts/HistoryDetail';

// Import all the Rider Layouts
import Register from '@/layouts/rider/Register';
import Booking from '@/layouts/rider/Booking';
import Ride from '@/layouts/rider/Ride';
import Payment from '@/layouts/rider/Payment';
import Reference from '@/layouts/rider/Reference';

// Import all Driver Layouts
import Status from '@/layouts/driver/Status';
import ProfileView from '@/layouts/driver/ProfileView';
import DriverHistoryDetail from '@/layouts/driver/DriverHistoryDetail';

// Import all Admin Layouts
import Admin from '@/layouts/admin/Admin';
import Users from '@/layouts/admin/Users';
import Riders from '@/layouts/admin/Riders';
import Drivers from '@/layouts/admin/Drivers';
import AddDriver from '@/layouts/admin/AddDriver';
import Email from '@/layouts/admin/Email';
import Feedbacks from '@/layouts/admin/Feedbacks';
import Rides from '@/layouts/admin/Rides';
import PaymentList from '@/layouts/admin/PaymentList';
import ChangeCost from '@/layouts/admin/ChangeCost';
import EditDriver from '@/layouts/admin/EditDriver';

import Routes from './routes';

Vue.use(Router);

const routes = [
  {
    path: Routes.Home,
    name: 'Home',
    component: Home,
  },
  {
    path: Routes.Terms,
    name: 'Terms',
    component: Terms,
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
      type: 'Rider',
    },
  },
  {
    path: Routes.Feedback,
    name: 'Feedback',
    component: Feedback,
    meta: {
      requiresAuth: true,
      type: 'Rider',
    },
  },
  {
    path: Routes.Booking,
    name: 'Booking',
    component: Booking,
    meta: {
      requiresAuth: true,
      type: 'Rider',
    },
  },
  {
    path: Routes.Reference,
    name: 'Reference',
    component: Reference,
    meta: {
      requiresAuth: true,
      type: 'Rider',
    },
  },
  {
    path: Routes.Ride,
    name: 'Ride',
    component: Ride,
    meta: {
      requiresAuth: true,
      type: 'Rider',
    },
  },
  {
    path: Routes.Payment,
    name: 'Payment',
    component: Payment,
    meta: {
      requiresAuth: true,
      type: 'Rider',
    },
  },
  {
    path: Routes.History,
    name: 'History',
    component: History,
    meta: {
      requiresAuth: true,
      type: 'Rider',
    },
  },
  {
    path: Routes.HistoryDetail,
    name: 'HistoryDetail',
    component: HistoryDetail,
    meta: {
      requiresAuth: true,
      type: 'Rider',
    },
  },
  // Driver Routes
  {
    path: Routes.DriverStatus,
    name: 'DriverStatus',
    component: Status,
    meta: {
      requiresAuth: true,
      type: 'Driver',
    },
  },
  {
    path: Routes.ProfileView,
    name: 'ProfileView',
    component: ProfileView,
    meta: {
      requiresAuth: true,
      type: 'Driver',
    },
  },
  {
    path: Routes.Login,
    name: 'Login',
    component: Login,
  },
  {
    path: Routes.DriverHistory,
    name: 'DriverHistory',
    component: History,
    meta: {
      requiresAuth: true,
      type: 'Driver',
    },
  },
  {
    path: Routes.DriverHistoryDetail,
    name: 'DriverHistoryDetail',
    component: HistoryDetail,
    meta: {
      requiresAuth: true,
      type: 'Driver',
    },
  },
  // Admin Routes
  {
    path: Routes.Login,
    name: 'Login',
    component: Login,
  },
  {
    path: Routes.Dashboard,
    name: 'Dashboard',
    component: Admin,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.Users,
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.Riders,
    name: 'Riders',
    component: Riders,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.Drivers,
    name: 'Drivers',
    component: Drivers,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.AddDriver,
    name: 'AddDriver',
    component: AddDriver,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.EditDriver,
    name: 'EditDriver',
    component: EditDriver,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.Email,
    name: 'Email',
    component: Email,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.Feedbacks,
    name: 'Feedbacks',
    component: Feedbacks,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.Rides,
    name: 'Rides',
    component: Rides,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.PaymentList,
    name: 'PaymentList',
    component: PaymentList,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
  {
    path: Routes.ChangeCost,
    name: 'ChangeCost',
    component: ChangeCost,
    meta: {
      requiresAuth: true,
      type: 'Admin',
    },
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');

    if (!token) {
      if (to.meta.type === 'Rider') {
        next({ name: 'Login' });
      } else if (to.meta.type === 'Driver') {
        next({ name: 'Login' });
      } else if (to.meta.type === 'Admin') {
        next({ name: 'Login' });
      } else {
        next({ name: 'Home' });
      }
      return;
    }

    const decodedToken = JSON.parse(window.atob(token.split('.')[1].replace('-', '+').replace('_', '/')));

    if (decodedToken.type === to.meta.type) {
      next();
    } else if (to.meta.type === 'Driver') {
      next({ name: 'Login' });
    } else if (to.meta.type === 'Admin') {
      next({ name: 'Login' });
    } else {
      next({ name: 'Login' });
    }
  }
  next();
});

export default router;
