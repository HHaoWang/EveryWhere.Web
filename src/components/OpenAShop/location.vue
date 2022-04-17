<template>


<div>
  <v-select
      v-model="myProvince"
      :items="this.$data.area"
      item-text="name"
      label="Standard"
      return-object
  ></v-select>
  <v-select
      v-model="myCity"
      :items="this.$data.myProvince.subAreas"
      item-text="name"
      label="Standard"
      return-object
  ></v-select>
  <v-select
      v-model="myRegion "
      :items="this.$data.myCity.subAreas"
      item-text="name"
      label="Standard"
      return-object
  ></v-select>
</div>

</template>

<script>
import router from "@/router";
import {userRequest} from "@/network/request";
import store from "@/store";

export default {
  name: "location",
  created() {
    this.getArea()
  },
  data () {
    return {
      area:'',
      myProvince:'',
      myCity:'',
      myRegion:''
    }
  },
  methods: {
    getArea(){
      const that = this;
      userRequest({
        method: 'get',
        url: '/api/Area/Tree',
      }).then((response) => {
        if(response.statusCode === 200){
          that.$data.area = response.areasTree
          console.log(that.$data.area);
        }else{
          console.log(response.message);
        }
      }).catch(err => {
        console.error(err);
      })
    }
  },
  watch:{
    myCity(){
      console.log(this.$data.mySubAreas);
    }
  }
}
</script>

<style scoped>

</style>