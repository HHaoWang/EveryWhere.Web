import Vue from 'vue'
import VueRouter from 'vue-router'
import merchants from '../views/merchants.vue';
import Login from "@/views/Login";
import admin from "@/views/admin";
import openShop from "@/views/openShop";
import orderList from "@/components/ShopDataDisplay/orderList";
import modifyShopInfo from "@/components/ShopDataDisplay/modifyShopInfo";
import dataStatistics from "@/components/ShopDataDisplay/dataStatistics";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/merchants',
    name: 'merchants',
    component: merchants,
    children:[{
      path: '',
      name: 'orderList',
      component: orderList
    },{
      path: 'modifyShopInfo',
      name: 'modifyShopInfo',
      component: modifyShopInfo
    },{
      path: 'dataStatistics',
      name: 'dataStatistics',
      component: dataStatistics
    }]
  },{
    path: '/admin',
    name: 'admin',
    component: admin
  },{
    path: '/openShop',
    name: 'openShop',
    component: openShop,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
