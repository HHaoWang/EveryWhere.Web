<template>
    <div class="container">

      <!--  Picture on the left-->
      <img src="../assets/login.png" />

      <!--  QR code on the right-->
      <div style="width: 600px">
        <ScanLogin></ScanLogin>
        <router-link to="/merchants" >
          跳过登录
        </router-link>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import ScanLogin from "@/components/ScanLogin";

export default {
  name: 'Login',
  components: {
    ScanLogin
  },
}
</script>

<style scoped>
.container {
  display: flex;justify-content: center;align-items: center;
}
</style>