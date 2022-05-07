<template>
  <div class="shop-info-body">
    <div class="text-h4 shop-info-title">{{ shop.name }}</div>
    <div class="shop-info">
      <div class="shop-info-desc">店铺二维码</div>
      <span class="shop-info-value"><img :src="shopQrCode"/></span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">店铺名称</div>
      <span class="shop-info-value">{{ shop.name }}</span>
      <span class="shop-info-btn">
        <v-btn color="primary" text :disabled="!canEdit" @click="edit('店铺名称','name')">修改</v-btn>
      </span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">电话号</div>
      <span class="shop-info-value">{{ shop.tel }}</span>
      <span class="shop-info-btn">
        <v-btn color="primary" text :disabled="!canEdit" @click="edit('电话号','tel')">修改</v-btn>
      </span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">营业状态</div>
      <span class="shop-info-value">
        <v-switch
            :disabled="!canEdit"
            v-model="shop.isOpening"
            :label="shop.isOpening ? '正在营业':'暂停营业'"
        ></v-switch>
      </span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">营业时间</div>
      <span class="shop-info-value">{{ shop.openTime }} - {{ shop.closeTime }}</span>
      <span class="shop-info-btn">
        <v-btn color="primary" text :disabled="!canEdit" @click="openBusinessHour">修改</v-btn>
      </span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">地区</div>
      <span class="shop-info-value">{{ areaName }}</span>
      <span class="shop-info-btn">
        <v-btn color="primary" text :disabled="!canEdit" @click="openLocation">修改</v-btn>
      </span>
    </div>
    <div class="shop-info">
      <div class="shop-info-desc">详细地址</div>
      <span class="shop-info-value">{{ shop.address }}</span>
    </div>

    <input-dialog ref="editDialog" :initial-value="editingValue"
                  :input-key="editingKey" :input-name="editingName"
                  :input-rules="shopRules[editingKey]" width="500"
                  @confirmInput="onUpdateShop"
    >
    </input-dialog>

    <v-dialog v-model="showLocation" width="500">
      <v-card>
        <v-card-title>修改地区</v-card-title>
        <v-card-text>
          <location ref="addressForm" :address-detail.sync="locationInfo.newAddress"
                    :initial-value="locationInfo"
                    :regionCode.sync="locationInfo.newRegion"></location>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showLocation = false">取消</v-btn>
          <v-btn color="primary" text @click="submitLocation">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showBusinessHour" :width="700">
      <v-card>
        <v-card-title>修改营业时间</v-card-title>
        <v-card-text>
          <set-business-hours :show-title="false" :initial-value="businessHoursInfo"
                              :open-time.sync="businessHoursInfo.newOpenTime"
                              :close-time.sync="businessHoursInfo.newCloseTime"></set-business-hours>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showBusinessHour = false">取消</v-btn>
          <v-btn color="primary" text @click="submitBusinessHour">确认</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
import {userRequest} from "@/network/request";
import QRCodeGenerator from "qrcode";
import InputDialog from "@/components/InputDialog";
import Location from "@/components/OpenAShop/location";
import SetBusinessHours from "@/components/OpenAShop/setBusinessHours";

export default {
  name: "modifyShopInfo",
  components: {SetBusinessHours, Location, InputDialog},
  data() {
    return {
      shop: this.$store.state.shopInfo,
      areas: [],
      province: {},
      city: {},
      area: {},
      locationInfo: {
        province: {},
        city: {},
        region: {},
        addressDetail: "",
        newAddress: "",
        newRegion: ""
      },
      businessHoursInfo:{
        openTime:"",
        closeTime:"",
        newOpenTime:"",
        newCloseTime:"",
      },
      shopQrCode: "",
      editingValue: "",
      editingName: "",
      editingKey: "",
      shopRules: {
        name: [
          v => !!v || "店铺名称不能为空！",
        ],
        tel: [
          v => !!v || "电话号不能为空！",
          v => {
            let pattern = /\d{11}/;
            return pattern.test(v) ? true : '电话号格式不正确！';
          }
        ],
        address: [
          v => !!v || "店铺名称不能为空！",
        ],
      },
      showLocation: false,
      showBusinessHour: false,
      canEdit:false
    }
  },
  watch: {
    shop: {
      deep: true,
      handler(newShop, oldShop) {
        this.findArea(newShop.areaCode);
        userRequest({
          url: "/api/shop",
          method: "PATCH",
          data: newShop
        }).then(res => {
          this.$emit("update-shop");
        }).catch(err => {
          console.log(err);
        });
      }
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
    /**
     * 获取地区数据（树形）
     */
    getAreaData() {
      userRequest({
        method: 'get',
        url: '/api/Area/Tree',
      }).then((response) => {
        if (response.statusCode === 200) {
          this.areas = response.areasTree
          let areaCode = this.shop.areaCode;
          this.findArea(areaCode);
          this.canEdit = true;
        } else {
          console.log(response.message);
        }
      }).catch(err => {
        console.error(err);
      })
    },
    /**
     * 根据区划编码查找对应的省市区
     * @param areaCode 区划编码
     */
    findArea(areaCode){
      this.province = this.areas.find(a => {
        return areaCode.substr(0, 2) + "0000" === a.areaCode;
      });

      this.city = this.province.subAreas.find(a => {
        return areaCode.substr(0, 4) + "00" === a.areaCode;
      });

      this.area = this.city.subAreas.find(a => {
        return areaCode === a.areaCode;
      });
    },
    /**
     * 生成店铺二维码
     */
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
    },
    /**
     * 打开inputDialog的通用方法
     * @param name 要编辑的属性的提示名称
     * @param key 要编辑的属性的键
     */
    edit(name, key) {
      this.editingName = name;
      this.editingValue = this.shop[key];
      this.editingKey = key;
      this.$refs.editDialog.open();
    },
    /**
     * inputDialog提交的数据更新
     * @param data inputDialog更新的数据
     */
    onUpdateShop(data) {
      for (let key of Object.keys(data)) {
        this.shop[key] = data[key];
      }
    },
    /**
     * 打开地区设置时准备好初始数据
     */
    openLocation() {
      this.locationInfo = {
        province: this.province,
        city: this.city,
        region: this.area,
        addressDetail: this.shop.address,
        newAddress: "",
        newRegion: ""
      };
      this.showLocation = true;
    },
    /**
     * 提交地区时校验
     */
    submitLocation(){
      if (this.$refs.addressForm.validate()){
        this.shop.areaCode = this.locationInfo.newRegion;
        this.shop.address = this.locationInfo.newAddress;
        this.showLocation = false;
      }
    },
    /**
     * 打开营业时间设置
     */
    openBusinessHour(){
      this.showBusinessHour = true;
      this.businessHoursInfo = {
        openTime:this.shop.openTime,
        closeTime:this.shop.closeTime,
        newOpenTime:"",
        newCloseTime:"",
      };
    },
    /**
     * 提交营业时间
     */
    submitBusinessHour(){
      this.shop.openTime = this.businessHoursInfo.newOpenTime;
      this.shop.closeTime = this.businessHoursInfo.newCloseTime;
      this.showBusinessHour = false;
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