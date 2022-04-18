<template>
  <v-app>
    <!--左侧导航栏-->
    <v-navigation-drawer clipped app>
      <v-list dense nav rounded>
        <v-list-item
            v-for="item in links"
            :key="item.title"
            link :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--上方应用栏-->
    <v-app-bar app clipped-left color="primary">
      <span style="color: white">EveryWhere云打印</span>
      <v-spacer></v-spacer>
      <span style="color: white">{{$store.state.shopInfo.name}}</span>
      <v-btn icon @click="onLogout">
        <v-icon color="white">{{icons.mdiExitToApp}}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main>

      <!-- 给应用提供合适的间距 -->
      <v-container fluid>

        <!-- 如果使用 vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {userRequest} from "@/network/request";
import { mdiStoreEditOutline } from '@mdi/js';
import { mdiExitToApp } from '@mdi/js';
import { mdiViewDashboardEdit } from '@mdi/js';
import { mdiStoreCogOutline } from '@mdi/js';
import { mdiContentPaste } from '@mdi/js';

export default {
  name: "Dashboard",
  data:()=>({
    icons:{
      mdiExitToApp
    }
  }),
  computed:{
    links(){
      let links = [];
      if (this.$store.state.hasShop){
        links.push({
          title:"店铺管理",
          icon:mdiStoreCogOutline,
          path:"/merchants/modifyShopInfo"
        },{
          title:"历史订单",
          icon:mdiContentPaste,
          path:"/merchants/orderList"
        })
      }else {
        links.push({
          title:"开设店铺",
          icon:mdiStoreEditOutline,
          path:"/merchants/openShop"
        })
      }
      if (this.$store.state.isManager){
        links.push({
          title:"平台管理",
          icon:mdiViewDashboardEdit,
          path:"/management"
        })
      }
      return links;
    }
  },
  created() {
    console.log("created");
    this.checkManager();
    this.checkHasShop();
  },
  methods:{
    checkManager:function (){
      userRequest({
        method: 'get',
        url: '/api/Login/Valid/Manager',
      }).then((response) => {
        if(response !== undefined && response.statusCode === 200){
          this.$store.commit("setIsManager",true);
        }else{
          this.$store.commit("setIsManager",false);
        }
      }).catch(err => {
        console.log(111111111111)
        this.$store.commit("setIsManager",false);
      })
    },
    checkHasShop(){
      userRequest({
        method: 'get',
        url: '/api/Shop/Shopkeeper',
      }).then((response) => {
        console.log(response)
        if(response.statusCode === 200 && response.data.shop !== null){
          this.$store.commit("setHasShop",true);
          this.$store.commit("setShopInfo",response.data.shop);
        }else {
          this.$store.commit("setHasShop",false);
          this.$router.replace("/merchants/openShop",()=>{},()=>{});
        }
      }).catch(err => {

      })
    },
    onLogout(){
      this.$store.commit("resetState");
      this.$router.replace("/");
    }
  }
}
</script>

<style scoped>

</style>