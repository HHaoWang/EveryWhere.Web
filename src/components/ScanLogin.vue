<template>
  <div>
    <v-img :src="QRCodeBase64"
     style="width:250px; height:250px" >
    </v-img>
  </div>
</template>

<script>

import {request, userRequest} from "@/network/request";
import QRCodeGenerator from "qrcode"
import router from "@/router";

export default {
  name: 'ScanLogin',
  mounted() {
    //先执行一次
    this.CreateQRCode();
    //检查登录
    this.CheckLogin()
    //刷新二维码
    this.refreshQRCode()
  },
  destroyed(){
    // 在页面销毁后，清除计时器
    this.clearQRCode();
    this.clearCheck()
  },

  data:function() {
    return {
      uuid:'',
      QRCodeBase64: "",
      intervalIdQR:null
    }
  },

  methods: {
    //定时器定时刷新二维码
    refreshQRCode: function () {
      if (this.intervalIdQR != null) {
        return;
      }
      this.intervalIdQR = setInterval(() => {
        this.CreateQRCode();
      }, 15000);
    },
    clearQRCode() {
      clearInterval(this.intervalIdQR); //
      this.intervalIdQR = null; //设置为null
    },

    //定时器定时检查是否扫码
    CheckLogin: function () {
      if (this.intervalIdCheck != null) {
        return;
      }
      this.intervalIdCheck = setInterval(() => {
        this.checkLoginSuccess();
      }, 3000);
    },
    clearCheck() {
      clearInterval(this.intervalIdCheck); //
      this.intervalIdCheck = null; //设置为null
    },

    //uuid生成二维码的base64
    CreateQRCode: function () {
      let that = this;
      request({
        method: 'get',
        url: '/api/Login/QRCode'
      })
          .then((response) => {
            that.uuid = response.data.uuid
            const opts = {
              errorCorrectionLevel: 'H',
              type: 'image/webp',  //Possible values are: image/png, image/jpeg, image/webp.
              quality: 1,
              margin: 0,
            };
            // const str = '[{"operation":"login","data":["uuid":"","platform":"web"]}]'
            const data = {
              "operation": "login",
              "data":{}
            };
            data.data.platform = 'web'
            data.data.uuid = response.data.uuid
            console.log(data);
            return QRCodeGenerator.toDataURL(JSON.stringify(data),opts);
          }).then(url => {
            console.log(url);
            this.QRCodeBase64 = url
          })
          .catch(err => {
            console.error(err);
          })
    },
    //检查二维码是否被使用成功登录
    checkLoginSuccess:function (){
      let that = this;
      request({method: 'get', url: '/api/Login/QRCode/'+this.uuid+'/Valid'})
          .then((response) => {
            console.log(response);
            if(response.statusCode === 200){
              that.$store.commit('setToken', response.data.token)
              router.replace('/merchants')
            }else{
              console.log(response.message);
            }
          })
          .catch(err => {
            console.error(err);
          })
    }
  }
}
</script>
<style scoped>
#qrcode {
  display: inline-block;
}

#qrcode img {
  width: 132px;
  height: 132px;
  background-color: #fff;
  padding: 6px;
}
</style>