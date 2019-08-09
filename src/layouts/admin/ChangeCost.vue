<template>
    <div class="register container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Change Costs</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">Tax (For all types)</label>
            <input v-validate="'required'" name="tax" type="number" class="form-control" placeholder="Tax" v-model="tax" id="tax"/>
            <p class="error-msg">{{ errors.first('tax') }}</p>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="service">Service Charge (For all types)</label>
            <input v-validate="'required'" name="serviceCharge" type="number" class="form-control" placeholder="Service charge" v-model="serviceCharge" id="serviceCharge"/>
            <p class="error-msg">{{ errors.first('serviceCharge') }}</p>          
          </div>
          <div class="form-group main-app-section-xs">
            <label for="vanbrcharge">Vanbr Charges (For all types)</label>
            <input v-validate="'required'" name="vanbrCharge" type="number" class="form-control" placeholder="Vanbr Charge" v-model="vanbrCharges" id="vanbrCharges"/>
            <p class="error-msg">{{ errors.first('vanbrCharge') }}</p>                    
          </div>
          <div class="form-group main-app-section-xs">
            <label for="commission">Vanbr Commission (For all types)</label>
            <input v-validate="'required'" name="commission" type="number" class="form-control" placeholder="Cost Per Km" v-model="vanbrCommision" id="vanbrCommision"/>
            <p class="error-msg">{{ errors.first('commission') }}</p>                              
          </div>

          <div class="main-app-section-sm"><strong>Sedan:</strong></div>
          <div class="form-group main-app-section-xs">
            <label for="name">Per Kilometer (in $)</label>
            <input type="number" class="form-control" placeholder="Cost Per Km" v-model="sedanKm" id="sedanKm"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="smin">Per Minute (in $)</label>
            <input type="number" class="form-control" placeholder="Cost Per Min" id="smin" v-model="sedanMin"/>
          </div>
          <div class="form-group main-app-section-sm">
            <button type="submit" id="sedanSubmit" class="btn btn-custom btn-block" @click="changeCostSedan">Set For Sedan</button>
          </div>
          <div class="main-app-section-sm"><strong>Mini Van:</strong></div>
          <div class="form-group main-app-section-xs">
            <label for="perkm">Per Kilometer (in $)</label>
            <input type="number" class="form-control" placeholder="Cost Per Km" v-model="vanKm" id="vanKm"/>
          </div>
          <div class="form-group main-app-section-xs">
            <label for="vanmin">Per Minute (in $)</label>
            <input type="number" class="form-control" placeholder="Cost Per Min" id="vanmin" v-model="vanMin"/>
          </div>
          <div class="form-group main-app-section-sm">
            <button type="submit" id="vanSubmit" class="btn btn-custom btn-block" @click="changeCostVan">Set For Mini Van</button>
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
    name: 'AddDriver',
    components: { Card },
    data() {
      return {
        AppURL,
        Routes,
        tax: '',
        serviceCharge: '',
        vanbrCharges: '',
        vanbrCommision: '',
        sedanKm: '',
        sedanMin: '',
        vanKm: '',
        vanMin: '',
      };
    },
    beforeMount() {
      this.getCost();
    },
    methods: {
      async getCost() {
        try {
          const costResponse = await this.axios.get(`${this.AppURL}/get-cars`);
          this.tax = costResponse.data.data[0].tax;
          this.serviceCharge = costResponse.data.data[0].service_charges;
          this.vanbrCharges = costResponse.data.data[0].vanbr_charges;
          this.vanbrCommision = costResponse.data.data[0].vanbr_commission;
          this.sedanKm = costResponse.data.data[0].cost_per_kilometer;
          this.sedanMin = costResponse.data.data[0].cost_per_minute;
          this.vanKm = costResponse.data.data[1].cost_per_kilometer;
          this.vanMin = costResponse.data.data[1].cost_per_minute;
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }       
        }
      },
      async changeCostSedan(event) {
        event.preventDefault();
        try {
          document.querySelector("#sedanSubmit").disabled = true
          document.querySelector("#vanSubmit").disabled = true
          const data = {
            tax: this.tax,
            cost_per_kilometer: this.sedanKm,
            cost_per_minute: this.sedanMin,
            service_charges: this.serviceCharge,
            vanbr_charges: this.vanbrCharges,
            vanbr_commission: this.vanbrCommision,
          };
          const response = await this.axios.put(`${this.AppURL}/admin/price/1/update`, data);
          alert('Cost updated successfully!');       
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }      
        } finally {
          document.querySelector("#sedanSubmit").disabled = false
          document.querySelector("#vanSubmit").disabled = false          
        }
      },
      async changeCostVan(event) {
        event.preventDefault();
        try {
          const data = {
            tax: this.tax,
            cost_per_kilometer: this.vanKm,
            cost_per_minute: this.vanMin,
            service_charges: this.serviceCharge,
            vanbr_charges: this.vanbrCharges,
            vanbr_commission: this.vanbrCommision,
          };
          const response = await this.axios.put(`${this.AppURL}/admin/price/2/update`, data);
          alert('Cost updated successfully!');
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }   
        }
      },
    },
  };
</script>

<style scoped>

</style>
