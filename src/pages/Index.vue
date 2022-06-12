<template>
  <q-page class="q-px-sm">
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
export default {
  name: "PageIndex",
  data() {
    return {
      InvalidAlert: false
    };
  },
  computed: {
    
  },
  async created(){
    this.InvalidAlert = true
  },
  methods: {
    
  },
  components: {
   
  },
  
};
</script>
<style>
</style>
