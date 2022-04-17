<template>
  <div style="margin-right: 50px; margin-left: 50px; padding-top: 10px">
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="myShopName"
          :counter="10"
          label="店铺名称"
          required
      ></v-text-field>

      <v-text-field
          v-model="myTellNumber"
          label="联系电话"
          required
      ></v-text-field>

      <v-select
          v-model="myShopConditions"
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
  props:["shopName","tellNumber","shopConditions"],
  data: () => ({
    items: ['正常营业','未营业'],
    valid: true,
    myShopName: '',
    myTellNumber: '',
    myShopConditions: null,
  }),
  methods: {
    updateData(){

    }
  },
  watch:{
    myShopName(){
      this.$emit('update:shopName',this.$data.myShopName)
    },
    myTellNumber(){
      this.$emit('update:tellNumber',this.$data.myTellNumber)
    },
    myShopConditions(){
      this.$emit('update:shopConditions',this.$data.myShopConditions)
    },
  }
}
</script>

<style scoped>

</style>