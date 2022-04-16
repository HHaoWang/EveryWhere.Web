<template>
  <div class="container">

    <!--  Picture on the left-->
    <img src="../assets/login.png" />

    <!--  QR code on the right-->
    <div style="width: 600px">
      <QRCode></QRCode>
    </div>


  </div>

</template>

<script>

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