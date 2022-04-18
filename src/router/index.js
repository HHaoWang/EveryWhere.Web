import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import admin from "@/views/admin";
import openShop from "@/views/merchants/openShop";
import orderList from "@/views/merchants/orderList";
import modifyShopInfo from "@/views/merchants/modifyShopInfo";
import dataStatistics from "@/views/merchants/dataStatistics";
import management from "@/views/management";
import Dashboard from "@/views/Dashboard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/merchants',
    name: 'merchants',
    component: Dashboard,
    children:[{
      path: 'openShop',
      name: 'openShop',
      component: openShop,
    },{
      path: 'orderList',
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
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin
  },{
    path: '/management',
    name: 'management',
    component: management,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
