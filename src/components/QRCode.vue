<template>
  <div>
    <div id="qrcode"></div>
  </div>
</template>

<script>

import QRCode from 'qrcodejs2'
import {userRequest} from "@/network/request";
export default {
  name: 'QRCode',
  mounted() {
    this.refresh();
  },

  data:{
    QRCodeText:0
  },
  methods: {
    refresh:function (){
      window.setInterval(() => {
        setTimeout(()=>{
          userRequest({method:'get',url:'/api/Login/QRCode'})
              .then((response) => {
                this.QRCodeText = response.data.uuid

                let qrcode = new QRCode('qrcode', {
                  width: 300,
                  height: 300,
                  text: this.QRCodeText,
                  colorDark: "#000",
                  colorLight: "#fff",
                })
                this.$store.commit('freshQRCodeText',{text : response.data.uuid})
              })
        },0)
        document.getElementById("qrcode").innerHTML = ""
      }, 3000)
    },
    // qrcode() {
    //   let qrcode = new QRCode('qrcode', {
    //     width: 300,
    //     height: 300,
    //     text: this.QRCodeText,
    //     colorDark: "#000",
    //     colorLight: "#fff",
    //   })
    // },
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