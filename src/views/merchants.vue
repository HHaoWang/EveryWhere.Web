<template>

  <div class="container">
    <div v-if="$store.state.isShopkeeper === true && $store.state.hasShop === true">

      <v-navigation-drawer v-model="drawer" app permanent >
        <v-list>         <!--店铺信息-->
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ shopInfo.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ shopInfo.openTime }} - {{ shopInfo.closeTime }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>  <!--account-->
          <v-list-item link>
            <v-list-item-icon>
              <v-icon large color="teal darken-2">
                mdi-email
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>订单列表</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="goDataStatistics">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>修改信息数据统计</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>修改信息</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>


      <v-main>
        <v-container class="py-8 px-6" fluid>
          <router-view/>
        </v-container>
      </v-main>
    </div>



    <div v-else="$store.state.isShopkeeper === true && $store.state.hasShop === false" class="container">
      <v-btn x-large color="success" dark v-on:click="openShop">
        开设店铺
      </v-btn>
      <div v-if="$store.state.isManager === true">
        <v-btn x-large color="success" dark> 管理后台</v-btn>
      </div>
    </div>
  </div>

</template>

<script>

import {userRequest} from "@/network/request";
import store from '../../src/store/index'
import router from "@/router";

export default {
  name: 'merchants',
  components: {
  },
  created() {
    this.ValidShopkeeper()
    this.checkHasShop()
    this.checkManager()
  },
  data() {
    return{
      drawer:'',
      shopInfo:''    //店铺的注册信息
    }
  },
  methods:{
    getOrderByShopId:function (){
      userRequest({
        method: 'get',
        url: '/api/Order/Shop/'+ this.$data.shopInfo.id,
      }).then((response) => {
        if(response.statusCode === 200){

        }else{
          console.log(response.message);
        }
      }).catch(err => {
        console.error(err);
      })
    },
    getShopInfoById:function (){
      userRequest({
        method: 'get',
        url: '/api/Shop/'+ this.$data.shopInfo.id,
      }).then((response) => {
        if(response.statusCode === 200){

        }else{
          console.log(response.message);
        }
      }).catch(err => {
        console.error(err);
      })
    },
    checkHasShop:function (){
      userRequest({
        method: 'get',
        url: '/api/Shop/Shopkeeper',
      }).then((response) => {
        if(response.statusCode === 404 && response.data.shop === null){
          store.state.hasShop = false
        }else if(response.statusCode === 200){
          store.state.hasShop = true
          this.$data.shopInfo = response.data.shop
          this.getShopInfoById()
          this.getOrderByShopId()
        }else{
          console.log(response.message);
        }
      }).catch(err => {
        console.error(err);
      })
    },
    checkManager:function (){
      userRequest({
        method: 'get',
        url: '/api/Login/Valid/Manager',
      }).then((response) => {
        if(response.statusCode === 200){
          store.state.isManager = true
        }else{
          console.log(response.message);

        }
      }).catch(err => {
        console.error(err);
      })
    },
    ValidShopkeeper : function(){
      userRequest({
        method: 'get',
        url: '/api/Login/Valid/Shopkeeper',
      }).then((response) => {
        if(response.statusCode === 200){
          store.state.isShopkeeper = true
        }else{
          console.log(response.message);
          // store.state.isShopkeeper = false
        }
      }).catch(err => {
        console.error(err);
        router.replace('/')
      })
    },
    openShop:function (){
      router.replace('/openShop')
    },
    goDataStatistics:function (){
      router.replace({ path: '/merchants/dataStatistics' })
    }

  },
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height:100vh;
}
</style>