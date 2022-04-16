<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-sheet
          color="grey lighten-4"
          class="pa-4"
      >
        <v-avatar
            class="mb-4"
            color="grey darken-1"
            size="64"

        ></v-avatar>

        <div>john@vuetifyjs.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
            v-for="[icon, text] in links"
            :key="icon"
            link

        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>

    </v-main>
  </v-app>
</template>

<script>

import {userRequest} from "@/network/request";

export default {
  name: 'merchants',
  components: {
  },
  created() {
    this.ValidShopkeeper()
  },
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam'],
    ],
  }),
  methods:{
    ValidShopkeeper : function(){
      console.log("zhixinglema");
      userRequest({
        method: 'get',
        url: '/api/Login/Valid/Shopkeeper',
      }).then((response) => {
        // if(response.statusCode === 200){
        //
        // }else{
        //   console.log(response.message);
        // }
      }).catch(err => {
          console.error(err);
        })
      console.log("zhixinglema");
    }
  },
}
</script>