<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      id="hove"
      dark
      bordered
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section class="text-h6">
        User ID is : {{ user.userId }}
      </q-card-section>
      <q-card-section> ID is : {{ user.id }} </q-card-section>
      <q-card-section> Title is : {{ user.title }} </q-card-section>
      <q-card-section>
        Body is : {{ user.body.substring(0, 30) + "..." }}
      </q-card-section>
    </q-card>
  </div>
</template>


<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
};
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 256px;
}
button {
  position: absolute;
  bottom: 0%;
  background-color: rgb(229, 255, 0);
}
#hove:hover {
  border: 4px solid rgb(193, 243, 10);
}
</style>
