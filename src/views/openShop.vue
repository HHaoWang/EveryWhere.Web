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
            <base-info :shopName.sync="shopName" :tellNumber.sync="tellNumber" :shopConditions.sync="shopConditions"></base-info>
          </v-card>

          <v-btn color="primary" @click="e1 = 2">
            继续
          </v-btn>

        </v-stepper-content>

<!--        第二步-->
        <v-stepper-content step="2"><v-card class="mb-12" height="50vh"
          >
            <set-b-h :openTime.sync="openTime" :closeTime.sync="closeTime"></set-b-h>
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
            <location :province.sync="province" :city.sync="city" :region.sync="region" :regionCode.sync="regionCode" :addressDetail.sync='addressDetail'></location>
          </v-card>

          <v-btn text @click="e1 = 2">
            上一步
          </v-btn>
          <v-btn color="primary" @click="e1 = 4">
            继续
          </v-btn>

        </v-stepper-content>

<!--        第四步-->
        <v-stepper-content step="4" height="50vh">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Calories
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>店铺名称</td>
                <td>{{ shopName }}</td>
              </tr>
              <tr>
                <td>联系电话</td>
                <td>{{ tellNumber }}</td>
              </tr>
              <tr>
                <td>营业状态</td>
                <td>{{ shopConditions }}</td>
              </tr>
              <tr>
                <td>营业时间</td>
                <td>{{ openTime }}-{{closeTime}}</td>
              </tr>
              <tr>
                <td>店铺地址</td>
                <td>{{ province }}-{{city}}-{{region}}</td>
              </tr>
              <tr>
                <td>详细地址</td>
                <td>{{ addressDetail }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-btn  text @click="e1 = 3">
            上一步
          </v-btn>
          <v-btn color="primary" @click="submitToOpen">
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
import submit from "@/components/OpenAShop/submit";
import Location from "@/components/OpenAShop/location";
import {userRequest} from "@/network/request";
import store from "@/store";

export default {
  name: "openShop",
  components: {Location, SetBH, BaseInfo,submit},
  data: () => ({
    e1: 1,
    //baseInfo
    shopName: '',
    tellNumber: '',
    shopConditions: null,
    //BH
    openTime: '',
    closeTime: '',
    //location
    province:'',
    city:'',
    region:'',
    regionCode:'',
    addressDetail:''
  }),
  methods:{
    submitToOpen(){
      const data ={}
      data.name = this.$data.shopName
      data.address = this.$data.addressDetail
      data.areaCode = this.$data.regionCode
      data.tel = this.$data.tellNumber
      data.isOpening = (this.shopConditions ==="未营业")?false:true
      data.closeTime = this.$data.closeTime + ":00"
      data.openTime = this.$data.openTime + ":00"
      data.location = "嗨嗨嗨"
      console.log(data);
      userRequest({
        method: 'post',
        url: '/api/Shop',
        data: data
      }).then((response) => {
        if(response.statusCode === 200){
          router.replace('/merchants')
        }else{
          console.log(response.message);
          console.log("zhixinglem.log");
        }
      }).catch(err => {
        console.error(err);
      })
    }
  },
  watch:{

  }
}
</script>
<style scoped>

</style>