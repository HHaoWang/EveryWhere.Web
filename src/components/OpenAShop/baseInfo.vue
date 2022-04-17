<template>
  <div style="margin-right: 500px; margin-left: 500px; padding-top: 100px">
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="shopName"
          :counter="10"
          label="店铺名称"
          required
      ></v-text-field>

      <v-text-field
          v-model="tellNumber"
          label="联系电话"
          required
      ></v-text-field>

      <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="是否营业"
          required
      ></v-select>

<!--      <v-checkbox-->
<!--          v-model="checkbox"-->
<!--          :rules="[v => !!v || 'You must agree to continue!']"-->
<!--          label="Do you agree?"-->
<!--          required-->
<!--      ></v-checkbox>-->

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

    </v-form>
  </div>

</template>

<script>
import router from "@/router";

export default {
  name: "baseInfo",
  data: () => ({
    items: ['正常营业','未营业'],
    valid: true,
    shopName: '',
    tellNumber: '',
    select: null,
    // checkbox: false,
  }),
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    next () {
      router.replace('/openShop/setBH')
    }
  },
}
</script>

<style scoped>

</style>