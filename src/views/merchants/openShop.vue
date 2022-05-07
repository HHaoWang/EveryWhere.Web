<template>
  <div class="root">
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

      <v-stepper-items class="open-shop-stepper-content">
        <!--第一步-->
        <v-stepper-content step="1">
          <base-info class="" :shopName.sync="shopName" :tellNumber.sync="tellNumber" @on-complete="e1 = 2"></base-info>
        </v-stepper-content>

        <!--第二步-->
        <v-stepper-content step="2">
          <set-business-hours :closeTime.sync="closeTime" :openTime.sync="openTime"></set-business-hours>
          <div style="text-align: center">
            <v-btn text @click="e1 = 1">上一步</v-btn>
            <v-btn color="primary" @click="e1 = 3" class="open-shop-continue-btn">继续</v-btn>
          </div>
        </v-stepper-content>

        <!--第三步-->
        <v-stepper-content step="3">
          <location :addressDetail.sync='addressDetail' :city.sync="city" :province.sync="province" :region.sync="region"
                    :regionCode.sync="regionCode" ref="addressForm"></location>

          <div style="text-align: center">
            <v-btn text @click="e1 = 2">上一步</v-btn>
            <v-btn color="primary" @click="confirmRegion" class="open-shop-continue-btn">继续</v-btn>
          </div>
        </v-stepper-content>

        <!--第四步-->
        <v-stepper-content height="50vh" step="4">
          <v-simple-table>
            <template v-slot:default>
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
                <td>营业时间</td>
                <td>{{ openTime }}-{{ closeTime }}</td>
              </tr>
              <tr>
                <td>店铺地址</td>
                <td>{{ province }}-{{ city }}-{{ region }}</td>
              </tr>
              <tr>
                <td>详细地址</td>
                <td>{{ addressDetail }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>

          <div style="text-align: center">
            <v-btn text @click="e1 = 3">上一步</v-btn>
            <v-btn color="primary" @click="submitToOpen">提交</v-btn>
          </div>

        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import router from "@/router";
import BaseInfo from "@/components/OpenAShop/baseInfo";
import setBusinessHours from "@/components/OpenAShop/setBusinessHours";
import submit from "@/components/OpenAShop/submit";
import Location from "@/components/OpenAShop/location";
import {userRequest} from "@/network/request";

export default {
  name: "openShop",
  components: {Location, setBusinessHours, BaseInfo, submit},
  inject:['reload'],
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
    province: '',
    city: '',
    region: '',
    regionCode: '',
    addressDetail: '',
    initialBusinessHours:{
      openTime:"09:00:00",
      closeTime:"18:00:00"
    }
  }),
  methods: {
    confirmRegion(){
      let valid = this.$refs.addressForm.validate();
      if (valid){
        this.e1 = 4;
      }
    },
    submitToOpen() {

      let data = {
        name : this.shopName,
        address : this.addressDetail,
        areaCode :this.regionCode,
        tel : this.tellNumber,
        closeTime : this.closeTime,
        openTime : this.openTime,
        location : "0,0"
      }

      userRequest({
        method: 'post',
        url: '/api/Shop',
        data: data
      }).then((response) => {
        if (response.statusCode === 200) {
          this.$emit("update-shop");
          router.replace('/merchants');
        } else {
          this.reload();
        }
      }).catch(err => {
        console.error(err);
      })
    }
  },
  watch: {}
}
</script>
<style scoped>
.root{
  height: 90vh;
  width: 40vw;
  margin: auto;
  padding-top: 5vh;
}
.open-shop-stepper-content{
  height: 50vh;
}
.open-shop-continue-btn{
  margin-left: 10px
}
</style>