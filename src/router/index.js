import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Form
  },
  {
    path: '/note/:id',
    name: 'View',
    component: Form
  }
]

const router = new VueRouter({
  routes
})

export default router
