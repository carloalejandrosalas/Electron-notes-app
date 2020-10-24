<template>
    <v-snackbar :timeout="getToast.timeout" v-model="getToast.active" :color="getToast.color" >
      <v-icon left>
        {{ getToast.icon }}
      </v-icon>
      <span v-if="getToast.html" v-html="getToast.html"></span>
      <span v-else>
        {{ getToast.message }}
      </span>
    </v-snackbar>
</template>
<script>
export default {
  name: 'Toast',
  computed: {
    getToast () {
      return this.$store.getters.getObj
    }
  }
}
</script>
