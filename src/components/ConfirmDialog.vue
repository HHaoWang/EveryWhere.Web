<template>
  <v-dialog v-model="show" :width="width" persistent>
    <v-card>
      <v-card-title v-if="title !== ''">{{title}}</v-card-title>
      <v-card-text>{{text}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="confirmColor" text @click="submitAction">确认</v-btn>
        <v-btn text @click="cancelAction">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props:{
    width:{
      default: 500
    },
    confirmColor:{
      default: 'primary'
    }
  },
  data(){
    return {
      show:false,
      title:'',
      text:'',
      ok:null,
      cancel:null
    }
  },
  methods:{
    cancelAction(){
      this.$emit("cancel");
      this.show = false;
      this.cancel && this.cancel();
    },
    submitAction(){
      this.$emit("ok");
      this.show = false;
      this.ok && this.ok();
    },
    open(title,text){
      this.title = title;
      this.text = text;
      this.show = true;
      return new Promise((resolve, reject)=>{
        this.ok  = resolve;
        this.cancel = reject;
      })
    }
  }
}
</script>

<style scoped>

</style>