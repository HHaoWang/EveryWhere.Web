<template>


<div>
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
  name: "location",
  methods: {
    before () {
      router.replace('/openShop/setBH')
    },
    reset () {

    },
    next () {
      router.replace('/openShop/submit')
    }
  },
}
</script>

<style scoped>

</style>