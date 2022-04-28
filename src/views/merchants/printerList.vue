<template>
  <div>
    <v-alert border="left" colored-border :type="alertType" dismissible :value="showAlert"
        elevation="2" style="position: absolute;right: 8px" transition="slide-x-reverse-transition"
    >{{message}}</v-alert>
    <v-data-table
        :headers="headers"
        :items="printers"
        class="elevation-1"
        height="70vh"
    >
      <template v-slot:item.state="{ item }">
        <span>
          <v-chip
              class="ma-2"
              color="red"
              text-color="white"
              v-if="item.state === 0"
          >未支付</v-chip>
          <v-chip
              class="ma-2"
              color="secondary"
              v-if="item.state === 1"
          >打印中</v-chip>
          <v-chip
              class="ma-2"
              color="green"
              text-color="white"
              v-if="item.state === 2"
          >已完成</v-chip>
        </span>
      </template>
      <template v-slot:item.supportDuplex="{item}">
        <span>{{item.supportDuplex?'支持':'不支持'}}</span>
      </template>
      <template v-slot:item.supportColor="{item}">
        <span>{{item.supportColor?'支持':'不支持'}}</span>
      </template>
      <template v-slot:item.isWork="{item}">
        <v-switch style="display: inline-block"
            v-model="item.isWork"
        ></v-switch>
      </template>
      <template v-slot:item.id="{ item }">
        <v-icon class="mr-5" @click="editItem(item)" color="primary">
          {{icons.pen}}
        </v-icon>
        <v-icon @click="deleteItem(item)" color="red">
          {{icons.del}}
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {userRequest} from "@/network/request";
import { mdiPencilOutline } from '@mdi/js';
import { mdiDelete } from '@mdi/js';

export default {
  name: "printerList",
  data () {
    return {
      search: '',
      printers:[],
      expandedRow:0,
      icons:{
        pen:mdiPencilOutline,
        del:mdiDelete
      },
      message:"",
      showAlert:false,
      alertType:"success"
    }
  },
  computed: {
    headers () {
      return [
        {
          text: '名称',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        {
          text: '设备名称',
          align: 'center',
          sortable: true,
          value: 'deviceName',
        },
        {
          text: '支持彩印',
          align: 'center',
          sortable: true,
          value: 'supportColor',
        },
        {
          text: '支持双面打印',
          align: 'center',
          sortable: true,
          value: 'supportDuplex'
        },{
          text: '是否接单',
          align: 'center',
          sortable: true,
          value: 'isWork',
        },
        {
          text: '添加时间',
          align: 'center',
          sortable: true,
          value: 'createTime',
        },
        {
          text: '操作',
          align: 'center',
          value: 'id',
        }
      ]
    },
  },
  created() {
    this.getPrinters();
  },
  methods:{
    getPrinters(){
      userRequest({
        url:"/api/Printer/Shop/"+this.$store.state.shopInfo.id,
        method:"GET"
      }).then(res=>{
        if (res.statusCode === 200){
          this.printers = res.data.printers
        }
      })
    },
    editItem(printer){

    },
    deleteItem(printer){
      userRequest({
        url:"/api/Printer/"+printer.id,
        method:"DELETE"
      }).then(res => {
        if (res.statusCode !== 200){
          this.alert("warning","删除打印机失败！");
          return;
        }
        this.alert("success","删除成功！");
        this.getPrinters();
      })
    },
    alert(type,message){
      this.showAlert = false;
      this.alertType = type;
      this.message = message;
      this.showAlert = true;
    }
  }
}
</script>

<style scoped>

</style>