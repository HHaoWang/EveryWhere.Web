import Vue from 'vue'
import VueRouter from 'vue-router'
import merchants from '../views/merchants.vue';
import Login from "@/views/Login";
import admin from "@/views/admin";
import openaShop from "@/views/openaShop";

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
  },{
    path: '/admin',
    name: 'admin',
    component: admin
  },{
    path: '/openaShop',
    name: 'openaShop',
    component: openaShop
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
