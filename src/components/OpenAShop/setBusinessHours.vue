<template>
  <div class="time-root">
    <h1 class="text-center" v-show="showTitle">设置店铺每天的营业时间</h1>
    <v-row justify="center" align="center" class="mt-2">
      <v-col class="d-flex" cols="3" sm="2">
        <v-menu offset-y transition="scale-transition"
                :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs}">
            <v-text-field v-bind="attrs" v-on="on" v-model="myOpenTime" solo readonly hide-details></v-text-field>
          </template>
          <v-time-picker v-model="myOpenTime" :max="myCloseTime"
                         locale="zh-cn" min="00:00:00" format="24hr"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col cols="1" sm="1" class="d-flex justify-center">
        ~
      </v-col>
      <v-col class="d-flex" cols="3" sm="2">
        <v-menu offset-y transition="scale-transition"
                :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs}">
            <v-text-field v-bind="attrs" v-on="on" v-model="myCloseTime" solo readonly hide-details></v-text-field>
          </template>
          <v-time-picker v-model="myCloseTime" :min="myOpenTime"
                         locale="zh-cn" format="24hr"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from "@/router";
import {userRequest} from "@/network/request";
import store from "@/store";
import {DateTimeFormatter, LocalTime} from "@js-joda/core";

export default {
  name: "setBusinessHours",
  props:{
    "openTime":String,
    "closeTime":String,
    "showTitle":{
      default:true
    },
    "initialValue":{
      default: ""
    }
  },
  data () {
    return {
      myOpenTime:'',
      myCloseTime:''
    }
  },
  created() {
    if (this.initialValue !== ""){
      this.myOpenTime = this.initialValue.openTime;
      this.myCloseTime = this.initialValue.closeTime;
    }else {
      this.$emit('update:openTime',this.myOpenTime);
      this.$emit('update:closeTime',this.myCloseTime);
    }
  },
  watch:{
    initialValue(newVal){
      if (newVal !== ""){
        this.myOpenTime = newVal.openTime;
        this.myCloseTime = newVal.closeTime;
      }
    },
    myOpenTime(newVal){
      this.$emit('update:openTime',LocalTime.parse(newVal).format(DateTimeFormatter.ofPattern("HH:mm:ss")));
    },
    myCloseTime(newVal){
      this.$emit('update:closeTime',LocalTime.parse(newVal).format(DateTimeFormatter.ofPattern("HH:mm:ss")));
    }
  }
}
</script>

<style scoped>
.time-root{
  padding-bottom: 40px;
}
</style>