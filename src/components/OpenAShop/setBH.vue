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
            v-model="start"
            :max="end"
            format="24hr"
        ></v-time-picker>
      </v-col>
      <v-col style="width: 350px; flex: 0 1 auto;">
        <h2>End:</h2>
        <v-time-picker
            v-model="end"
            :min="start"
            format="24hr"
        ></v-time-picker>
      </v-col>
    </v-row>
    <v-btn
        color="error"
        class="mr-4"
        @click="before"
    >
      上一项
    </v-btn>
    <v-btn
        color="error"
        class="mr-4"
        @click="reset"
    >
      重置表单
    </v-btn>
    <v-btn
        color="error"
        class="mr-4"
        @click="next"
    >
      下一项
    </v-btn>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "setBH",
  data () {
    return {
      start: null,
      end: null,
    }
  },
  methods: {
    before () {
      router.replace('/openShop/baseInfo')
    },
    reset () {

    },
    next () {
      router.replace('/openShop/location')
    }
  },
}
</script>

<style scoped>

</style>