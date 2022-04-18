<template>
  <div v-if="$store.state.isShopkeeper === true && $store.state.isManager === true">
    <v-navigation-drawer  app permanent >
      <v-list>         <!--店铺信息-->
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">

            </v-list-item-title>
            <v-list-item-subtitle> </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>  <!--account-->
        <v-list-item link @click="">
          <v-list-item-icon>
            <v-icon large color="teal darken-2">
              mdi-email
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>123</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>456</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="">
          <v-list-item-icon>
            <v-icon>mdi-font-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>678</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="goMerchants" v-if="$store.state.hasShop === true">
          <v-list-item-icon>
            <v-icon>mdi-font-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>进入商家</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view/>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "management",
  methods:{
    goMerchants:function (){
      router.replace({ path: '/merchants' })
    },
  }
}
</script>

<style scoped>

</style>