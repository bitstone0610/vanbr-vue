<template>
  <div class="admin container">
    <div class="row">
        <div class="col-md main-app-section-sm">
          <router-link :to="Routes.Riders">
            <Card class="card">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <img src="@/assets/users.svg" class="icons"/>
                </div>
                <div>
                  <div class="subtitle text-secondary">Riders</div>
                </div>
              </div>
            </Card>
          </router-link>
        </div>

      <div class="col-md main-app-section-sm">
        <router-link :to="Routes.Drivers">
          <Card class="card">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <img src="@/assets/users.svg" class="icons-sm"/>
              </div>
              <div>
                <div class="subtitle text-secondary">Drivers</div>
              </div>
            </div>
          </Card>
        </router-link>
      </div>
    </div>  
  </div>
</template>


<script>
  import Card from '@/components/Card';
  import Routes from '@/router/routes';

  export default {
    name: 'Users',
    components: { Card },
    data() {
      return {
        Routes,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .users {
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #ddd;
    padding: 20px;
  }
  a {
    &:hover {
      text-decoration: none;
    }
  }
  .card {
    width: 280px;
    height: 120px;
    margin: 0 auto;
  }

  .icons {
    height: 80px;
    width: 80px;
  }

  .icons-sm {
    height: 60px;
    width: 60px;
    margin-top: 12px;
  }

  @media (max-width: 576px) {
    .card {
      width: 100%;
    }
  }
</style>
