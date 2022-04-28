<template>
  <div class="login-container">
    <!--  Picture on the left-->
    <div class="left-box">
      <img alt="装饰图" class="left-img" src="../assets/login.png"/>
    </div>

    <!--  QR code on the right-->
    <div class="right-box">
      <img :src="QRCodeBase64"/>
      <div class="tip">打开EveryWhere小程序扫一扫登录</div>
    </div>

  </div>
</template>

<script>

import {request} from "@/network/request";
import QRCodeGenerator from "qrcode";
import router from "@/router";
import store from "@/store";

export default {
  name: 'Login',
  data: function () {
    return {
      uuid: '',
      QRCodeBase64: "",
      intervalIdQR: null
    }
  },
  mounted() {
    let that = this;
    request({
      method: 'get',
      url: '/api/Login/Valid/Shopkeeper',
      headers: {Authorization: 'bearer ' + store.state.token}
    }).then((response) => {
      if (response.statusCode === 200)
        this.$router.replace("/merchants")
    }).catch(err => {
      //先执行一次
      this.CreateQRCode();
      //检查登录
      this.CheckLogin();
      //刷新二维码
      this.refreshQRCode();
    })
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    this.clearQRCode();
    this.clearCheck()
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
      }).then((response) => {
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
          "data": {}
        };
        data.data.platform = 'web'
        data.data.uuid = response.data.uuid
        console.log(data);
        return QRCodeGenerator.toDataURL(JSON.stringify(data), opts);
      }).then(url => {
        this.QRCodeBase64 = url
      }).catch(err => {
        console.error(err);
      })
    },
    //检查二维码是否被使用成功登录
    checkLoginSuccess: function () {
      let that = this;
      request({method: 'get', url: '/api/Login/QRCode/' + this.uuid + '/Valid'})
          .then((response) => {
            if (response.statusCode === 200) {
              that.$store.commit('setToken', response.data.token)
              router.replace('/merchants')
            } else {
              console.log(response.message);
            }
          }).catch(err => {
        console.error(err);
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.left-box {

}

.left-img {
  height: 99vh;
}

.right-box {
  text-align: center;
}

.tip {
  margin-top: 8px;
}
</style>