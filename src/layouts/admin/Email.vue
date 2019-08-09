<template>
    <div class="profile container main-app-section-sm">
      <Card class="mx-auto">
        <div class="title text-center">Send Email</div>
        <form>
          <div class="form-group main-app-section-xs">
            <label for="name">Mail Id:</label>
            <input v-validate="'required|email'" name="email" v-model="email" type="email" class="form-control" placeholder="Email Id" id="email"/>
            <p class="error-msg">{{ errors.first('email') }}</p>                 
          </div>
          <div class="form-group main-app-section-xs">
            <label for="name">Mail Subject:</label>
            <input v-validate="'required'" name="sub" v-model="subject" type="text" class="form-control" placeholder="Subject Name" id="Subject"/>
            <p class="error-msg">{{ errors.first('sub') }}</p>                    
          </div>
          <div class="form-group main-app-section-sm">
            <label for="feedback">Mail Body</label>
            <textarea v-model="body" row="4" class="form-control" name="body" id="body">
            </textarea>
          </div>
          <div class="form-group main-app-section-sm">
            <button type="submit" id="submit" class="btn btn-custom btn-block" @click="emailSend">Send</button>
          </div>
        </form>
      </Card>
    </div>
</template>

<script>
  /* eslint-disable */
  import Card from '@/components/Card';
  // import Routes from '@/router/routes';
  import { AppURL } from '@/constants';

  export default {
    name: 'Email',
    components: { Card },
    data() {
      return {
        AppURL,
        email: '',
        subject: '',
        body: '',
      };
    },
    methods: {
      async emailSend(event) {
        event.preventDefault();
        try {
          document.querySelector("#submit").disabled = true;
          const data = {
            to: this.email,
            subject: this.subject,
            body: this.body,
          };
          const responseData = await this.axios.post(`${this.AppURL}/admin/send/email`, data);
        } catch (e) {
          if (e.response) {
            this.checkError(e.response.status, e.response.data.message);
          }
        } finally {
          this.email = '';
          this.subject = '';
          this.body = '';
          e.preventDefault();
          document.querySelector("#submit").disabled = false;
        }
      },
    },
  };
</script>

<style scoped>

</style>
