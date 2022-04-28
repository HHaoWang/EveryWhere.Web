import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import admin from "@/views/admin";
import openShop from "@/views/merchants/openShop";
import orderList from "@/views/merchants/orderList";
import modifyShopInfo from "@/views/merchants/modifyShopInfo";
import dataStatistics from "@/views/merchants/dataStatistics";
import management from "@/views/management/shopList";
import Dashboard from "@/views/Dashboard";
import shopList from "@/views/management/shopList";
import printerList from "@/views/merchants/printerList";
import systemDataStatistics from "@/views/management/systemDataStatistics";

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
    },{
      path: 'printerList',
      name: 'printerList',
      component: printerList
    }]
  },
  {
    path: '/management',
    name: 'management',
    component: Dashboard,
    children: [
      {
        path: "shopList",
        name: "shopList",
        component: shopList
      },{
        path: 'systemDataStatistics',
        name: 'systemDataStatistics',
        component: systemDataStatistics
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
