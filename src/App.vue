<template>
  <v-app id="app">
    <v-container class="my-3">
      <router-view/>
    </v-container>

    <v-snackbar v-model="getToast.active" :color="getToast.color" >
      <v-icon>
        {{ getToast.icon }}
      </v-icon>
      {{ getToast.message }}
    </v-snackbar>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      snackbar: false,
      color: '',
      message: ''
    }
  },
  computed: {
    getToast () {
      return this.$store.getters.getObj
    }
  }
}
</script>
