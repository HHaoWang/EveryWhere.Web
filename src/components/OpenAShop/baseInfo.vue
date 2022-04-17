<template>
  <div style="margin-right: 50px; margin-left: 50px; padding-top: 10px">
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


    </v-form>
  </div>

</template>

<script>

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

  },
}
</script>

<style scoped>

</style>