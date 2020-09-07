import Vue from 'vue'
import App from './App.vue'

// Routes
import router from './router'

// Vuetify
import vuetify from './plugins/vuetify';

// Store
import { store } from './store'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
