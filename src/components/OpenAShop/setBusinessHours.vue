<template>
  <div class="time-root">
    <h1 class="text-center">设置店铺每天的营业时间</h1>
    <v-row justify="center" align="center" class="mt-2">
      <v-col class="d-flex" cols="3" sm="2">
        <v-menu offset-y transition="scale-transition"
                :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs}">
            <v-text-field v-bind="attrs" v-on="on" v-model="myOpenTime" solo readonly hide-details></v-text-field>
          </template>
          <v-time-picker v-model="myOpenTime" :max="myCloseTime"
                         locale="zh-cn" no-title min="00:00:00" format="24hr"
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
                         locale="zh-cn" no-title format="24hr"
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

export default {
  name: "setBusinessHours",
  props:["openTime","closeTime"],
  data () {
    return {
      myOpenTime:'00:00:00',
      myCloseTime:'00:00:00'
    }
  },
  created() {
    this.$emit('update:openTime',this.myOpenTime);
    this.$emit('update:closeTime',this.myCloseTime);
  },
  watch:{
    myOpenTime(){
      this.$emit('update:openTime',this.myOpenTime)
    },
    myCloseTime(){
      this.$emit('update:closeTime',this.myCloseTime)
    }
  }
}
</script>

<style scoped>
.time-root{
  padding-bottom: 40px;
}
</style>