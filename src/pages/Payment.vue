<template>
  <q-page class="q-px-sm">
    <div class="q-px-xs q-pt-md" v-if="paymentsList.length != 1">
      <div class="row justify-center">
        <q-card class="my-card q-pb-sm col-md-7 col-12" bordered v-if="paymentsList.length>0">
          <q-card-section>
            <div class="q-pl-md q-pb-sm text-h6">Payment Method</div>
            <div class="row ">
              <div class="col-md-4 col-sm-6 col-12 row justify-around q-pa-xs" v-for="item in paymentsList" :key="item.paymentProfileId">
                <q-card @click="getUrlPayment(item)" class="col-12 cardPayment" bordered style="height:70px">
                  <q-card-section class="no-padding">
                    <h5 class="text-center text-h6 row justify-around">
                      <span class="q-mr-xl">
                        <q-img :src="getPicture(item)" :style="item.provider == 'JpMorgan'? 'width:145px;height:40px': 'width:90px'"/>
                      </span>
                      <q-icon name="arrow_forward" class="q-ml-xl q-pt-sm" color="grey-6"  :style="item.provider != 'JpMorgan'? 'padding-left:50px': 'padding-left:0px'" />
                    </h5>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="InvalidAlert" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-grey-1" style="width: 300px">
        <q-card-section>
          <div class="text-h6"> <q-icon name="warning" color="warning" size="2rem" class="q-pr-xs" />Invalid Payment</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from 'axios'
import {Loading,QSpinnerFacebook} from 'quasar'
export default {
  name: "Payment",
  data() {
    return {
      paymentsList: [],
      InvalidAlert: false,
      redirectUrl: null,
      srcPic: require('../assets/pictures/PayTabs-Logo-New.png'),
      token: {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiJENThGMkI1MC04RkNDLTRGMUItOTY1RS0xNDBCRkFERDcwMzciLCJqdGkiOiJjNmJmODJkZi0zMjNlLTRlYzYtODhkMy1kNmRkMGMwZjlkNGQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBcHBVc2VyIiwiZXhwIjoxOTY5NTE3NTM2LCJpc3MiOiJwYXltZW50LXNlcnZlciIsImF1ZCI6InBheW1lbnQtc2VydmVyIn0.C-Nuij5ronRKeFC2kPmrPQWqHnqEs6Cj1mLyOeH_FR4` }
      }
    };
  },
  computed: {
    baseUrl: {
      get() {
        return this.$store.state.env.setting.baseUrl;
      },
    },
  },
  async created(){
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'blue'
    })
    if(this.$route.query.appId){
      await this.getPaymentServices()
      if(this.paymentsList.length == 1){
        await this.getUrlPayment(this.paymentsList[0])
      }
    }else{
      this.InvalidAlert = true
    }
    Loading.hide()
  },
  methods: {
    async getPaymentServices() {
      let response = await axios.get(`${this.baseUrl}/api/apps/${this.$route.query.appId}/payments/${this.$route.query.paymentId}`,
      {
        params: {
          paymentKey: this.$route.query.paymentKey
        }
      });
      this.paymentsList = response.data.acceptedPaymentProfiles;
      Loading.hide()
    },
    async getUrlPayment(item) {
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'blue'
      })
      let response = await axios.post(`${this.baseUrl}/api/apps/${this.$route.query.appId}/payments/${this.$route.query.paymentId}/provider-hosted-page`,{
        paymentKey: this.$route.query.paymentKey,
        PaymentProfileId: item.paymentProfileId
      });
      this.redirectUrl = response.data.redirectUrl;
      window.location.replace(`${this.redirectUrl}`);
      Loading.hide()
    },
    getPicture(item) {
      if(item.provider === "PayTabs"){
        return require('../assets/pictures/PayTabs (2).png')
      }
      if(item.provider === "PayPal"){
        return require('../assets/pictures/paypal(2).png')
      }else {
        return require('../assets/pictures/Jp_morgan_logo.jpg')
      }
    }
  },
  components: {
   
  },
  
};
</script>
<style>
  .cardPayment:hover{
    border: 1px solid rgb(13, 140, 243);
  }
  h5{
    margin: auto;
    padding-top: 16px;
  }
</style>
