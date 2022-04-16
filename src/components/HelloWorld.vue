<template>
  <div class="container">

    <!--  Picture on the left-->
    <img src="../assets/login.png" />

    <!--  QR code on the right-->


  </div>

</template>

<script>

import {userRequest} from "@/network/request";

export default {
  name: "HelloWorld",
  components: {

  },
  data() {
    return {
      QRText: 'http://www.baidu.com',
    }
  },
  created() {
    this.refresh()
  },
  methods:{
    refresh:function (){
      window.setInterval(() => {
        setTimeout(()=>{
          userRequest({method:'get',url:'/api/Login/QRCode'})
              .then((response) => {
                data.QRText = response.data
              })
          console.log(this.$data.QRText)
        },0)
      }, 3000)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;justify-content: center;align-items: center;
}
</style>