<template>
  <div style="margin-right: 50px; margin-left: 50px; padding-top: 10px">
    <v-form
        ref="form"
        lazy-validation
    >
      <v-text-field
          v-model="myShopName"
          :counter="10"
          label="店铺名称"
          :rules="[rules.required, rules.counter]"
          maxlength="120"
      ></v-text-field>

      <v-text-field
          v-model="myTellNumber"
          label="联系电话"
          :rules="[rules.required, rules.counter]"
          maxlength="11"
      ></v-text-field>
    </v-form>

    <div style="text-align: center">
      <v-btn color="primary" @click="submit">继续</v-btn>
    </div>
  </div>

</template>

<script>

export default {
  name: "baseInfo",
  props:["shopName","tellNumber","shopConditions"],
  data: () => ({
    myShopName: '',
    myTellNumber: '',
    rules: {
      required: value => !!value || '必填',
      counter: value => value.length <= 120 || '最多120个字',
    },
  }),
  methods: {
    submit(){
      if (this.$refs.form.validate()){
        this.$emit("on-complete");
      }
    }
  },
  watch:{
    myShopName(){
      this.$emit('update:shopName',this.$data.myShopName);
    },
    myTellNumber(){
      this.$emit('update:tellNumber',this.$data.myTellNumber);
    }
  }
}
</script>

<style scoped>

</style>