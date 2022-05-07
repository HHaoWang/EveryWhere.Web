<template>
  <v-dialog v-model="show" :width="width">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>{{inputName}}修改</v-card-title>
        <v-card-text>
          <v-text-field :label="inputName" :rules="inputRules" v-model="formData.input"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="show = false" text>取消</v-btn>
          <v-btn color="primary" @click="confirmInput" text>确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: "InputDialog",
  props:{
    'width':String,
    'inputName':String,
    'initialValue':{
      required:true,
      default:''
    },
    'inputKey':{
      required: true
    },
    'inputRules':{
      required:true
    }
  },
  data(){
    return {
      valid:true,
      formData:{
        input:''
      },
      show:false
    }
  },
  watch:{
    show(newVal,oldVal){
      if (!newVal){
        this.valid = true;
        this.formData = {
          input:''
        };
        this.show = false;
      }
    },
    initialValue(newVal){
      this.formData.input = newVal;
    }
  },
  methods:{
    confirmInput(){
      if (this.$refs.form.validate()){
        let data = {};
        data[this.inputKey] = this.formData.input;
        this.$emit("confirmInput",data);
        this.show = false;
      }
    },
    open(){
      this.show = true;
      this.formData.input = this.initialValue;
    }
  }
}
</script>

<style scoped>

</style>