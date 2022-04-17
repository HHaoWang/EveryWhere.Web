<template>


<div>
  <v-select
      v-model="myProvince"
      :items="this.$data.area"
      item-text="name"
      label="省"
      return-object
  ></v-select>
  <v-select
      v-model="myCity"
      :items="this.$data.myProvince.subAreas"
      item-text="name"
      label="市"
      return-object
      no-data-text="请先选择省"
  ></v-select>
  <v-select
      v-model="myRegion"
      :items="this.$data.myCity.subAreas"
      item-text="name"
      label="区"
      return-object
      no-data-text="请先选择省(市)"
  ></v-select>
  <v-text-field
      label="详细地址"
      v-model="myAdressDetail"
  ></v-text-field>
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
  props:["province", "city", "region", "regionCode","addressDetail"],
  data () {
    return {
      area:[],
      myProvince:[],
      myCity:[],
      myRegion:[],
      myAdressDetail:''
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
        }else{
          console.log(response.message);
        }
      }).catch(err => {
        console.error(err);
      })
    }
  },
  watch:{
    myProvince(){
      this.$emit('update:province',this.$data.myProvince.name)
    },
    myCity(){
      this.$emit('update:city',this.$data.myCity.name)
    },
    myRegion(){
      this.$emit('update:region',this.$data.myRegion.name)
      this.$emit('update:regionCode',this.$data.myRegion.areaCode)
    },
    myAdressDetail(){
      this.$emit('update:addressDetail',this.$data.myAdressDetail)
    }
  }
}
</script>

<style scoped>

</style>