<template>
  <div>
    <q-dialog v-model="InvalidAlert" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-grey-1" style="width: 300px">
        <q-card-section>
          <div class="text-h6"> <q-icon name="warning" color="warning" size="2rem" class="q-pr-xs" />Invalid Payment</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import {Loading,QSpinnerFacebook} from 'quasar'
export default {
  data() {
    return {
      InvalidAlert: false,
      returnUrl: null,
      token: {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiJENThGMkI1MC04RkNDLTRGMUItOTY1RS0xNDBCRkFERDcwMzciLCJqdGkiOiJjNmJmODJkZi0zMjNlLTRlYzYtODhkMy1kNmRkMGMwZjlkNGQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBcHBVc2VyIiwiZXhwIjoxOTY5NTE3NTM2LCJpc3MiOiJwYXltZW50LXNlcnZlciIsImF1ZCI6InBheW1lbnQtc2VydmVyIn0.C-Nuij5ronRKeFC2kPmrPQWqHnqEs6Cj1mLyOeH_FR4` }
      }
    }
  },
  computed: {
    baseUrl: {
      get() {
        return this.$store.state.env.setting.baseUrl;
      },
    },
  },
  async created() {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'blue'
    })
    if(this.$route.query.appId){
      let response = await axios.post(`${this.baseUrl}/api/apps/${this.$route.query.appId}/payments/${this.$route.query.paymentId}/provider-hosted-page-result`,{
      paymentKey: this.$route.query.paymentKey,
      });
      let response1 = await axios.get(`${this.baseUrl}/api/apps/${this.$route.query.appId}/payments/${this.$route.query.paymentId}`);
      this.returnUrl = response1.data.returnUrl
      window.location.replace(`${ this.returnUrl}`);
    }else{
      this.InvalidAlert = true
    }
    
    Loading.hide();
  }
};
</script>

<style lang="scss" scoped>
</style>