<template>
    <div class="login container main-app-section-sm">
        <Card class="mx-auto">
            <div>Your email is {{ status }}!!!!</div>
        </Card>
    </div>
</template>

<script>
    /* eslint-disable */
    import Routes from '@/router/routes';
    import Card from '@/components/Card';
    import { AppURL } from '@/constants';
    
    export default {
        name: 'VerifyEmail',
        components: { Card },
        data() {
            return {
                Routes,
                AppURL,
                status: 'verifing'
            };
        },
        async mounted() {
            const token = this.$route.params.token;
            if (token) {
                this.token = token;
            } else {
                this.$router.push(Routes.Login);
            }
            const data = { token };
            try {
                await this.axios.post(`${this.AppURL}/verify-email`, data);
                this.status = 'verified';
                setTimeout(() =>{
                    this.$router.push(Routes.Login);
                }, 2000)
            } catch (e) {
                this.status = 'not verified';
                setTimeout(() =>{
                    this.$router.push(Routes.Login);
                }, 2000)
                console.warn(e);
            }
        },
    }
</script>