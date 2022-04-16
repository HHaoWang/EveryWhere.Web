import Vue from 'vue'
import VueRouter from 'vue-router'
import merchants from '../views/merchants.vue';
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/merchants',
    name: 'merchants',
    component: merchants
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
