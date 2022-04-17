<template>
  <div>
    <h1>设置您的营业时间</h1>
    <v-row
        justify="space-around"
        align="center"
    >
      <v-col style="width: 350px; flex: 0 1 auto;">
        <h2>Start:</h2>
        <v-time-picker
            v-model="myOpenTime"
            :max="myCloseTime"
            format="24hr"
        ></v-time-picker>
      </v-col>
      <v-col style="width: 350px; flex: 0 1 auto;">
        <h2>End:</h2>
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
      myOpenTime:'',
      myCloseTime:''
    }
  },
  methods: {

  },
  watch:{
    myOpenTime(){
      this.$emit('update:openTime',this.$data.myOpenTime)
    },
    myCloseTime(){
      this.$emit('update:closeTime',this.$data.myCloseTime)
    }
  }
}
</script>

<style scoped>

</style>