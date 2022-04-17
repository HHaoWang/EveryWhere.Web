import Vue from 'vue'
import VueRouter from 'vue-router'
import merchants from '../views/merchants.vue';
import Login from "@/views/Login";
import admin from "@/views/admin";
import openShop from "@/views/openShop";
import baseInfo from "@/components/OpenAShop/baseInfo";
import setBH from "@/components/OpenAShop/setBH";
import submit from "@/components/OpenAShop/submit";
import location from "@/components/OpenAShop/location";

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
    path: '/openShop',
    name: 'openShop',
    component: openShop,
    children: [
      {
        path: '',
        name: 'baseInfo',
        component: baseInfo,
      }, {
        path: 'baseInfo',
        name: 'baseInfo',
        component: baseInfo,
      },{
        path: 'setBH',
        name: 'setBH',
        component: setBH,
      },{
        path: 'location',
        name: 'location',
        component: location,
      },{
        path: 'submit',
        name: 'submit',
        component: submit,
      },]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
