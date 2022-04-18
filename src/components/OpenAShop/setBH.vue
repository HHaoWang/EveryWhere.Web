<template>
  <div class="time-root">
    <h1>设置店铺每天的营业时间</h1>
    <v-row
        justify="space-around"
        align="center"
    >
      <v-col style="width: 350px; flex: 0 1 auto;">
        <h2>开始营业:</h2>
        <v-time-picker
            v-model="myOpenTime"
            :max="myCloseTime"
            min="00:00:00"
            format="24hr"
        ></v-time-picker>
      </v-col>
      <v-col style="width: 350px; flex: 0 1 auto;">
        <h2>结束营业:</h2>
        <v-time-picker
            v-model="myCloseTime"
            :min="myOpenTime"
            format="24hr"
        ></v-time-picker>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from "@/router";
import {userRequest} from "@/network/request";
import store from "@/store";

export default {
  name: "setBH",
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