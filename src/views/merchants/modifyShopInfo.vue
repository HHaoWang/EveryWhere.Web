<template>
  <div class="shop-info-body">
    <div class="text-h4 shop-info-title">飞跃打印</div>
    <div class="shop-info">
      <div class="shop-info-desc">店铺二维码</div>
      <span class="shop-info-value"><img :src="shopQrCode"/></span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">店铺名称</div>
      <span class="shop-info-value">{{ shop.name }}</span>
      <span class="shop-info-btn"><v-btn color="primary" text>修改</v-btn></span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">电话号</div>
      <span class="shop-info-value">{{ shop.tel }}</span>
      <span class="shop-info-btn"><v-btn color="primary" text>修改</v-btn></span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">营业状态</div>
      <span class="shop-info-value">
        <v-switch
            v-model="shop.isOpening"
            :label="shop.isOpening ? '正在营业':'暂停营业'"
        ></v-switch>
      </span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">营业时间</div>
      <span class="shop-info-value">{{ shop.openTime }} - {{ shop.openTime }}</span>
      <span class="shop-info-btn"><v-btn color="primary" text>修改</v-btn></span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">地区</div>
      <span class="shop-info-value">{{ areaName }}</span>
      <span class="shop-info-btn"><v-btn color="primary" text>修改</v-btn></span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">详细地址</div>
      <span class="shop-info-value">{{ shop.address }}</span>
      <span class="shop-info-btn"><v-btn color="primary" text>修改</v-btn></span>
    </div>
  </div>
</template>

<script>
import {userRequest} from "@/network/request";
import QRCodeGenerator from "qrcode";

export default {
  name: "modifyShopInfo",
  data() {
    return {
      shop: this.$store.state.shopInfo,
      areas: [],
      province: {},
      city: {},
      area: {},
      shopQrCode:""
    }
  },
  created() {
    this.getAreaData();
    this.generateQrCode();
  },
  computed: {
    areaName() {
      if (this.province.name === undefined ||
          this.city.name === undefined ||
          this.area.name === undefined)
        return "";
      return this.province.name + this.city.name + this.area.name;
    }
  },
  methods: {
    getAreaData() {
      userRequest({
        method: 'get',
        url: '/api/Area/Tree',
      }).then((response) => {
        if (response.statusCode === 200) {
          this.areas = response.areasTree
          let areaCode = this.shop.areaCode;
          this.province = this.areas.find(a => {
            return areaCode.substr(0, 2) + "0000" === a.areaCode;
          });
          this.city = this.province.subAreas.find(a => {
            return areaCode.substr(0, 4) + "00" === a.areaCode;
          });
          this.area = this.city.subAreas.find(a => {
            return areaCode === a.areaCode;
          });
        } else {
          console.log(response.message);
        }
      }).catch(err => {
        console.error(err);
      })
    },
    generateQrCode() {
      const opts = {
        errorCorrectionLevel: 'H',
        type: 'image/webp',  //Possible values are: image/png, image/jpeg, image/webp.
        quality: 1,
        margin: 0,
      };
      const data = {
        "operation": "openShop",
        "data": {
          "shopId": this.$store.state.shopInfo.id
        }
      };
      QRCodeGenerator.toDataURL(JSON.stringify(data), opts)
          .then(url => {
            this.shopQrCode = url
          }).catch(err => {
            console.error(err);
          })
    }
  }
}
</script>

<style scoped>
.shop-info-body {
  padding-top: 40px;
  padding-left: 40px;
}

.shop-info {
  line-height: 54px;
  vertical-align: center;
}

.shop-info + .shop-info {
}

.shop-info-title {
  margin-bottom: 64px;
}

.shop-info-desc {
  color: #9a9a9a;
  font-size: 16px;
  width: 12%;
  display: inline-block;
  margin-right: 10px;
}

.shop-info-value {
  color: #353535;
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
}

.shop-info-btn {
  transform: translateY(-2px);
  display: inline-block;
}
</style>