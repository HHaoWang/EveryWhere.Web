<template>
  <div>
    <v-img :src="QRCodeBase64"
     style="width:250px; height:250px" >
    </v-img>
  </div>
</template>

<script>

import {userRequest} from "@/network/request";
import QRCodeGenerator from "qrcode"

export default {
  name: 'QRCode',
  mounted() {
    //先执行一次
    this.CreateQRCode();
    //刷新二维码
    this.refresh()
  },
  destroyed(){
    // 在页面销毁后，清除计时器
    this.clear();
  },

  data:function() {
    return {
      QRCodeBase64: "",
      intervalId:null
    }
  },

  methods: {
    //定时器定时刷新
    refresh: function () {
      if (this.intervalId != null) {
        return;
      }
      this.intervalId = setInterval(() => {
        this.CreateQRCode();
      }, 2000);
    },
    //清除计时器
    clear() {
      clearInterval(this.intervalId); //
      this.intervalId = null; //设置为null
    },
    //uuid生成二维码的base64
    CreateQRCode: function () {
      let that = this;
      userRequest({method: 'get', url: '/api/Login/QRCode'})
          .then((response) => {
            const opts = {
              errorCorrectionLevel: 'H',
              type: 'image/webp',  //Possible values are: image/png, image/jpeg, image/webp.
              quality: 1,
              margin: 0,
            };
            return QRCodeGenerator.toDataURL(response.data.uuid,opts);
          }).then(url => {
            console.log(url);
            this.QRCodeBase64 = url
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