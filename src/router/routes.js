const Routes = {
  Home: '/',
  Terms: '/terms',
  Pricing: '/pricing',
  Login: '/login',
  ChangePassword: '/change-password',
  ForgotPassword: '/forgot-password',
  ResetPassword: '/reset-password/:token',
  VerifyEmail: '/verify-email/:token',
  Register: '/register',
  Profile: '/profile',
  Booking: '/booking',
  Reference: '/add-reference',
  History: '/history',
  HistoryDetail: '/history/:id',
  Ride: '/ride/:id',
  Feedback: '/feedback/:id',
  Payment: '/payment/:id',
  // Driver Routes
  // Login: '/driver/login',
  DriverStatus: '/status',
  // ProfileView: '/driver/profile',
  // DriverHistory: '/driver/history',
  // DriverHistoryDetail: '/driver/history/:id',
  // Admin Routes

  // Login: '/admin/login',
  Dashboard: '/dashboard',
  Users: '/users',
  AddDriver: '/add-driver',
  EditDriver: '/edit-driver/:id',
  Email: '/email',
  Feedbacks: '/feedbacks',
  Rides: '/rides',
  Riders: '/users/riders',
  Drivers: '/users/drivers',
  PaymentList: '/payment/list',
  ChangeCost: '/cost/change',

  // Error Routes
  Error404: '/404',
};

export default Routes;
