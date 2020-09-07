<template>
  <v-app id="app">
    <v-container class="my-3">
      <router-view/>
    </v-container>    
    <Toast />
  </v-app>
</template>
<script>
import Toast from './components/Toast'
export default {
  components: {
    Toast
  }  
}
</script>
