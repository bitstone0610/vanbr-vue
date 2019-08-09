<template>
  <div class="home main-app-section-sm home-page">
    <!-- <div class="d-flex justify-content-between main-app-section-sm">
      <router-link :to='Routes.Login'>Go to Login</router-link>
      <router-link :to='Routes.Register'>Go to Register</router-link>
      <router-link :to='Routes.Feedback'>Give Feedback</router-link>
      <router-link :to='Routes.Ride'>View Ride Info</router-link>
      <router-link :to='Routes.Payment'>Pay a Ride</router-link>
    </div> -->
   <div class="card text-white hero-card">
        <img class="card-img" src="@/assets/hero-image.png" alt="Card image">
        <div class="card-img-overlay">
            <div class="container">
                <h1 class="display-3">Welcome to Vanbr</h1>
                <h2 class="mt-4">
                    The new generation of Ride Sharing.
                </h2>
                <p class="mt-2">
                    We are there to serve Barrie, Orillia and the surrounding Simcoe area.
                </p>
                <div class="mt-4">
                    <a href="/login" class="btn btn-outline-primary">Login</a>
                    <a href="/register" class="btn btn-primary  ml-2">Register</a>
                </div>
            </div>
        </div>
    </div>

    <div class="container margin-top-100px">
        <div class="row">
            <div class="col-md-12">
                <h2 class="display-5 margin-bottom-24px">Why Vanbr?</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="card border-0">
                    <h2 class="display-4 text-primary-custom">
                        <i class="fas fa-shield-alt"></i>
                    </h2>
                    <div class="card-body pl-0 pr-0">
                        <h5 class="card-title">Safety</h5>
                        <p class="card-text">
                            We do the background check of our drivers so that your safety cannot compromise.
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-0">
                    <h2 class="display-4 text-primary-custom">
                        <i class="fas fa-money-bill-wave"></i> </h2>
                    <div class="card-body pl-0 pr-0">
                        <h5 class="card-title">Afordable</h5>
                        <p class="card-text">
                            We do care of our customers, and that's why our charges are very generous for what we are
                            offering to you.
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-0">
                    <h2 class="display-4 text-primary-custom">
                        <i class="far fa-clock"></i>
                    </h2>
                    <div class="card-body pl-0 pr-0">
                        <h5 class="card-title">On Demand</h5>
                        <p class="card-text">
                            We serve 24 hours and seven days a week. We will be there whenever you book your ride.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-light margin-top-100px">
        <div class="container">
            <div class="row d-flex align-items-center">
                <div class="col-md-6 custom-padding">
                    <h2 class="display-5 margin-bottom-24px">Vanbr Riders</h2>
                    <p>
                        If you are looking to save money on a ride, or a fast way to get around by car without the
                        expense of buying your vehicle, or paying for auto insurance and gasoline, dealing with
                        mechanics for repairs and doing regular oil changes or changing to snow tires every winter,
                        then VanBr is an easy solution.
                    </p>
                    <a href="/login" class="btn btn-primary">Login</a>
                </div>
                <div class="col-md-6 custom-padding">
                    <img class="img-fluid" src="@/assets/rider-car.jpg" alt="Vanbr Rider">
                </div>
            </div>
        </div>
    </div>
    <div class="margin-top-100px">
        <div class="container">
            <div class="row d-flex align-items-center">
                <div class="col-md-6 align-custom-item">
                    <img class="rounded-circle" src="@/assets/benefits-icon.png" alt="Vanbr Rider">
                </div>
                <div class="col-md-6">
                    <h2 class="display-5 margin-bottom-24px">Rider's Benefits</h2>
                    <div class="mt-4">
                        <p>
                            <i class="far fa-hand-point-right mr-2 text-primary-custom"></i>
                            You can book multiple rides at the same time.
                        </p>
                        <p>
                            <i class="far fa-hand-point-right mr-2 text-primary-custom"></i>
                            Avoid carrying cash and pay to buy your Debit/Credit card.
                        </p>
                        <p>
                            <i class="far fa-hand-point-right mr-2 text-primary-custom"></i>
                            Affordable and safe ride with our experienced driver.
                        </p>
                        <p>
                            <i class="far fa-hand-point-right mr-2 text-primary-custom"></i>
                            Customer support at your fingertips.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-light margin-top-100px">
        <div class="container">
            <div class="row d-flex align-items-center">
                <div class="col-md-6 custom-padding">
                    <h2 class="display-5 margin-bottom-24px">Vanbr Drivers</h2>
                    <p>
                        Vanbr created for people who desire extra income while having the flexibility to reserve and
                        book your time off with loved ones. We provide on-time payments, and we do listen to your
                        drivers as well. Come and join our immerging team and earn fast money.
                    </p>
                    <p>
                      Contact us to register as a driver at 
                      <a href="mailto:info@vanbr.ca">info@vanbr.ca</a>
                    </p>

                </div>
                <div class="col-md-6 custom-padding">
                    <img class="img-fluid" src="@/assets/driver-car.jpg" alt="Vanbr Rider">
                </div>
            </div>
        </div>
    </div>
    <div class="margin-top-100px">
        <div class="container">
            <div class="row d-flex align-items-center">
                <div class="col-md-6 align-custom-item">
                    <img class="rounded-circle" src="@/assets/driver-benefits-icon.jpg" alt="Vanbr Rider">
                </div>
                <div class="col-md-6">
                    <h2 class="display-5 margin-bottom-24px">Driver's Benefits</h2>
                    <div class="mt-4">
                        <p>
                            <i class="far fa-hand-point-right mr-2 text-primary-custom"></i>
                            Get paid on time.
                        </p>
                        <p>
                            <i class="far fa-hand-point-right mr-2 text-primary-custom"></i>
                            Avoid carrying change.
                        </p>
                        <p>
                            <i class="far fa-hand-point-right mr-2 text-primary-custom"></i>
                            Get support on your fingertip.
                        </p>
                        <p>
                            <i class="far fa-hand-point-right mr-2 text-primary-custom"></i>
                            Earn more because we take very less commission.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-light margin-top-100px">
        <div class="container">
            <div class="row">
                <div class="col-md-12 pt-4 pb-4">
                    <h2 class="display-5 margin-bottom-24px mt-4">About Vanbr</h2>
                    <p>
                        Vanbr is the new immerging ride-sharing service provider who cares for drivers and riders. Our
                        goal is to provide reliable and affordable ride-sharing service at any cost. We listen to our
                        customers and our drivers as well so that we can improve together and be the better
                        ride-sharing service for the future generation. The idea behind vanbr is to provide a solution
                        for a person who needs two or more rides at the same time. We just started from our Simcoe
                        community because we believe in helping people who needed transportation.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="container ">

        <div class="row margin-top-100px">
            <div class="col-md-12">
                <h2 class="display-5 margin-bottom-24px">Contact us</h2>
                <p>
                    Yes, We are happy to help you. Get in touch with us and know more about vanbr. Register as a driver
                    by emailing us. Are you looking to earn money we are here to help you? We are a Canadian company
                    located in the Barrie city of Simcoe County.
                </p>
                <p>
                    <a href="mailto:info@vanbr.ca" class="">
                        <i class="fas fa-envelope text-primary-custom mr-2"></i>info@vanbr.ca
                    </a>
                    <!-- <a href="#" class="ml-4">
                        <i class="fas fa-phone text-primary-custom mr-2"></i>+1 (705)-123-456
                    </a> -->
                </p>
            </div>
        </div>
    </div>
    
    <!-- Footer -->
    <footer class="py-3 bg-dark mt-5">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Vanbr 2018</p>
      </div>
      <!-- /.container -->
    </footer>

  </div>
</template>

<script>
import Routes from '@/router/routes';

export default {
  name: 'home',
  data() {
    return {
      Routes,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
