<template>
  <div>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
    <v-select
        v-model="myProvince"
        :items="area"
        item-text="name"
        label="省"
        return-object
        :rules="[v => !!v || '请选择省或直辖市']"
    ></v-select>
    <v-select
        v-model="myCity"
        :items="myProvince.subAreas"
        item-text="name"
        label="市"
        no-data-text="请先选择省或直辖市"
        return-object
        :rules="[v => !!v || '请选择市']"
    ></v-select>
    <v-select
        v-model="myRegion"
        :items="myCity.subAreas"
        item-text="name"
        label="区"
        no-data-text="请先选择市"
        return-object
        :rules="[v => !!v || '请选择区']"
    ></v-select>
    <v-text-field
        v-model="myAddressDetail"
        label="详细地址"
        :rules="addressDetailRules"
    ></v-text-field>
    </v-form>
  </div>

</template>

<script>
import {userRequest} from "@/network/request";

export default {
  name: "location",
  created() {
    this.getArea();
    if (this.initialValue !== ""){
      this.myProvince = this.initialValue.province;
      this.myCity = this.initialValue.city;
      this.myRegion = this.initialValue.region;
      this.myAddressDetail = this.initialValue.addressDetail
    }
  },
  props:{
    "province":String,
    "city":String,
    "region":String,
    "regionCode":String,
    "addressDetail":String,
    "initialValue":{
      default:""
    }
  },
  data() {
    return {
      area: [],
      myProvince: "",
      myCity: "",
      myRegion: "",
      myAddressDetail: '',
      addressDetailRules:[
          v => !!v || '请填写详细地址！',
          v => (v && v.length <= 30) || '详细地址最长为30个字！',
      ],
      valid:true
    }
  },
  methods: {
    getArea() {
      const that = this;
      userRequest({
        method: 'get',
        url: '/api/Area/Tree',
      }).then((response) => {
        if (response.statusCode === 200) {
          that.area = response.areasTree
        } else {
          console.log(response.message);
        }
      }).catch(err => {
        console.error(err);
      })
    },
    validate(){
      return this.$refs.form.validate();
    }
  },
  watch: {
    initialValue(newVal){
      if (newVal !== undefined){
        this.$data.myProvince = newVal.province;
        this.$data.myCity = newVal.city;
        this.$data.myRegion = newVal.region;
        this.$data.myAddressDetail = newVal.addressDetail
      }
    },
    myProvince() {
      this.$emit('update:province', this.$data.myProvince.name)
    },
    myCity() {
      this.$emit('update:city', this.$data.myCity.name)
    },
    myRegion() {
      this.$emit('update:region', this.$data.myRegion.name)
      this.$emit('update:regionCode', this.$data.myRegion.areaCode)
    },
    myAddressDetail() {
      this.$emit('update:addressDetail', this.$data.myAddressDetail)
    }
  }
}
</script>

<style scoped>

</style>