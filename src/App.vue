<template>
  <v-app id="app">
    <Navbar/>
    <v-container class="my-3">
      <router-view/>
    </v-container>    
    <Toast />
  </v-app>
</template>
<script>
import Navbar from './components/shared/Navbar'
import Toast from './components/Toast'
export default {
  components: {
    Navbar,
    Toast
  }  
}
</script>
