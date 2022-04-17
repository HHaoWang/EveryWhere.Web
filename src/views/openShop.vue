<template>
  <v-app id="inspire" style="margin-right: 500px; margin-left: 500px; padding-top: 100px">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          基本信息
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          营业时间
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">
          店铺位置
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">
          提交
        </v-stepper-step>

      </v-stepper-header>

      <v-stepper-items>
<!--        第一步-->
        <v-stepper-content step="1">
          <v-card class="mb-12" height="50vh">
            <base-info></base-info>
          </v-card>

          <v-btn color="primary" @click="e1 = 2">
            继续
          </v-btn>

        </v-stepper-content>

<!--        第二步-->
        <v-stepper-content step="2"><v-card class="mb-12" height="50vh"
          >
            <set-b-h></set-b-h>
          </v-card>

          <v-btn text @click="e1 = 1">
            上一步
          </v-btn>
          <v-btn color="primary" @click="e1 = 3">
            继续
          </v-btn>

        </v-stepper-content>

<!--        第三步-->
        <v-stepper-content step="3">
          <v-card class="mb-12" height="50vh">
            <location></location>
          </v-card>

          <v-btn text @click="e1 = 2">
            上一步
          </v-btn>
          <v-btn color="primary" @click="e1 = 4">
            继续
          </v-btn>

        </v-stepper-content>

<!--        第四步-->
        <v-stepper-content step="4">
          <v-card class="mb-12" height="50vh">
            <location></location>
          </v-card>

          <v-btn  text @click="e1 = 3">
            上一步
          </v-btn>
          <v-btn color="primary">
            提交
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-app>
</template>

<script>

import router from "@/router";
import BaseInfo from "@/components/OpenAShop/baseInfo";
import SetBH from "@/components/OpenAShop/setBH";
import Location from "@/components/OpenAShop/location";

export default {
  name: "openShop",
  components: {Location, SetBH, BaseInfo},
  data: () => ({
    e1: 1,
  }),
}
</script>
<style scoped>

</style>