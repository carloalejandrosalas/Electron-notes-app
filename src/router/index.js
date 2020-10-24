import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'
import Tags from '../views/Tags.vue'
import Wizard from '../views/Wizard.vue'

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
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/wizard',
    name: 'Wizard',
    component: Wizard
  }
]

const router = new VueRouter({
  routes
})

export default router
