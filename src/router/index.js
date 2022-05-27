import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PrestationView from '../views/PrestationView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/prestation',
    name: 'prestation',
    component: PrestationView
  }
]

const router = new VueRouter({
  routes
})

export default router
