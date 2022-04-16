<template>
  <div>
    <v-img :src="QRCodeBase64"></v-img>
  </div>
</template>

<script>

//import QRCode from 'qrcodejs2'
import {userRequest} from "@/network/request";
import QRCodeGenerator from "qrcode"

export default {
  name: 'QRCode',
  mounted() {
    this.CreateQRCode();
  },

  data:function() {
    return {
      QRCodeText: 0,
      QRCodeBase64: ""
    }
  },

  methods: {
    refresh: function () {

    },
    CreateQRCode: function () {
      let that = this;
      userRequest({method: 'get', url: '/api/Login/QRCode'})
          .then((response) => {
            this.QRCodeText = response.data.uuid;
            console.log(response.data.uuid);
            return QRCodeGenerator.toDataURL(response.data.uuid);
          }).then(url => {
            console.log(url);
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