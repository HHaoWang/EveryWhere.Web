<template>
  <div>
    <div style="padding-left: 40px;padding-top: 20px;margin-bottom: 20px">
      <v-row>
        <v-col>
          <span class="text-h4">商家管理</span>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="search" append-icon="mdi-magnify"
              label="搜索" clearable solo hide-details
          ></v-text-field>
        </v-col>
      </v-row>

    </div>
    <v-data-table
        :headers="headers" :items="shops" :search="search"
        class="elevation-1"
        height="70vh">
      <template v-slot:item.isOpening="{ item }">
        <span>
          <v-chip
              class="ma-2"
              color="secondary"
              v-if="item.isOpening === false"
          >关闭中</v-chip>
          <v-chip
              class="ma-2"
              color="green"
              text-color="white"
              v-if="item.isOpening === true"
          >营业中</v-chip>
        </span>
      </template>
      <template v-slot:item.openTime="{ item }">
        <span>{{item.openTime}}~{{item.closeTime}}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import router from "@/router";
import {userRequest} from "@/network/request";

export default {
  name: "shopList",
  data(){
    return {
      shops:[],
      search:""
    }
  },
  created() {
    this.getShops();
  },
  computed: {
    headers () {
      return [
        {
          text: '商家号',
          align: 'center',
          sortable: true,
          value: 'id',
        },
        {
          text: '店铺名称',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        {
          text: '开店时间',
          align: 'center',
          sortable: true,
          value: 'createTime',
        },
        {
          text: '营业时间',
          align: 'center',
          sortable: true,
          value: 'openTime',
        },
        { text: '店铺状态',
          align: 'center',
          value: 'isOpening'
        },
        {
          text: '省市区',
          align: 'center',
          sortable: true,
          value: 'area.name',
        },
        {
          text: '详细地址',
          align: 'center',
          sortable: true,
          value: 'address',
        },
        {
          text: '联系电话',
          align: 'center',
          sortable: true,
          value: 'tel',
        }
      ]
    },
  },
  methods:{
    goMerchants:function (){
      router.replace({ path: '/merchants' })
    },
    getShops(){
      userRequest({
        url:'/api/Shop',
        method:'GET'
      }).then(res=>{
        if (res.statusCode === 200){
          this.shops = res.data.shops;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>