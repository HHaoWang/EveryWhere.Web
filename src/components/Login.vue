<template>
  <div class="container">

    <!--  Picture on the left-->
    <img src="../assets/login.png" />

    <!--  QR code on the right-->
    <div style="height: 300px; width: 800px">
      <QRCode ></QRCode>
      <div>{{this.$store.state.QRCodeText}}</div>
    </div>

  </div>

</template>

<script>

import {userRequest} from "@/network/request";
import QRCode from '@/components/QRCode'


export default {
  name: "Login",
  components: {
    QRCode
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods:{

  }
}
</script>

<style scoped>
.container {
  display: flex;justify-content: center;align-items: center;
}
</style>