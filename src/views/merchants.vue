<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer app>

    </v-navigation-drawer>

    <v-app-bar app>
      <!-- --><v-btn elevation="2">管理员登录</v-btn>
    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main>

      <!-- 给应用提供合适的间距 -->
      <v-container fluid>

        <!-- 如果使用 vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

import {userRequest} from "@/network/request";
import router from "@/router";

export default {
  name: 'merchants',
  components: {
  },
  beforeCreate() {

  }
}
</script>