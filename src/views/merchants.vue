<template>

  <div class="container">
    <div v-if="$store.state.isShopkeeper === true && $store.state.hasShop === true">
      23
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
  data: {},
  methods:{
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
    checkHasShop:function (){
      userRequest({
        method: 'get',
        url: '/api/Shop/Shopkeeper',
      }).then((response) => {
        if(response.statusCode === 404 && response.data.shop === null){
          store.state.hasShop = false
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
    openShop:function (){
      router.replace('/openShop')
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