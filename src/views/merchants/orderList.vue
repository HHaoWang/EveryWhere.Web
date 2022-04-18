<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="orders"
        class="elevation-1"
        height="70vh"
        show-expand
        single-expand="single-expand"
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
              v-if="item.state === 3"
          >已完成</v-chip>
        </span>
      </template>
      <template v-slot:item.payTime="{ item }">
        <span v-if="item.payTime == null">暂未支付</span>
        <span v-else>{{item.payTime}}</span>
      </template>
      <template v-slot:item.completeTime="{ item }">
        <span v-if="item.completeTime == null">尚未完成</span>
        <span v-else>{{item.completeTime}}</span>
      </template>
      <template v-slot:item.price="{ item }">
        <span style="color: red">￥{{item.price}}</span>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" style="padding: 10px 0">
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-center">#</th>
                <th class="text-center">纸张</th>
                <th class="text-center">页数</th>
                <th class="text-center">份数</th>
                <th class="text-center">单双页</th>
                <th class="text-center">彩印</th>
                <th class="text-center">价格</th>
                <th class="text-center">状态</th>
                <th class="text-center">取件码</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(job,index) in item.printJobs" :key="job.id">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">{{ job.pageSize }}</td>
                <td class="text-center">{{ job.pageEnd - job.pageStart + 1 }}</td>
                <td class="text-center">{{ job.count }}</td>
                <td class="text-center">{{ job.duplex ? "双面打印":"单面打印" }}</td>
                <td class="text-center">{{ job.color ? "彩印":"黑白" }}</td>
                <td class="text-center">{{ job.price }}</td>
                <td class="text-center">{{ job.isFinished ? "打印完成":"正在打印" }}</td>
                <td class="text-center">{{ job.fetchCode == null ?"未打印完成":job.fetchCode }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </td>
      </template>
    </v-data-table>
  </div>

</template>

<script>
import {userRequest} from "@/network/request";

export default {
  name:"orderList",
  data () {
    return {
      search: '',
      calories: '',
      orders:[],
      expandedRow:0
    }
  },
  created() {
    this.getOrders();
  },
  computed: {
    headers () {
      return [
        {
          text: '订单号',
          align: 'center',
          sortable: true,
          value: 'id',
        },
        {
          text: '文档数量',
          align: 'center',
          sortable: true,
          value: 'printJobs.length',
        },
        {
          text: '下单时间',
          align: 'center',
          sortable: true,
          value: 'createTime',
        },
        { text: '订单状态',
          align: 'center',
          value: 'state'
        },{
          text: '支付时间',
          align: 'center',
          sortable: true,
          value: 'payTime',
        },
        {
          text: '完成时间',
          align: 'center',
          sortable: true,
          value: 'completeTime',
        },
        {
          text: '总价',
          align: 'center',
          sortable: true,
          value: 'price',
        }
      ]
    },
  },
  methods: {
    filterOnlyCapsText (value, search, item) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    getOrders(){
      userRequest({
        url:"/api/Order/Shop/"+this.$store.state.shopInfo.id,
        method:"GET"
      }).then(res=>{
        console.log(res)
        this.orders = res.data.orders;
      })
    }
  },
}
</script>

<style>
.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content{
  box-shadow: none;
}
</style>