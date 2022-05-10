<template>
  <div>
    <span class="text-h4 ml-2">数据统计</span>
    <v-row class="ml-0 mt-2">
      <v-col class="d-flex" cols="2" sm="2">
        <v-select :items="selections" label="选择日期查看统计数据" solo v-model="dateSelected"></v-select>
      </v-col>
      <v-col class="d-flex" cols="3" sm="2" v-if="dateSelected === '选择日期'">
        <v-menu offset-y transition="scale-transition" :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs}">
            <v-text-field v-bind="attrs" v-on="on" v-model="dateSelectedSingle" readonly></v-text-field>
          </template>
          <v-date-picker @input="inputDate" v-model="dateSelectedSingle"
                         :first-day-of-week="1" locale="zh-cn">
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="d-flex" cols="3" sm="2" v-if="dateSelected === '选择范围'">
        <v-menu offset-y transition="scale-transition"
                :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs}">
            <v-text-field v-bind="attrs" v-on="on" v-model="dateSelectedRange.join('~')" readonly></v-text-field>
          </template>
          <v-date-picker v-model="dateSelectedRange" :first-day-of-week="1"
                         range locale="zh-cn"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-chart class="chart" :option="option" :loading="loading"/>
  </div>
</template>

<script>
import {userRequest} from "@/network/request";

const LocalDate = require('@js-joda/core').LocalDate;
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent
]);

export default {
  name: "dataStatistics",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  data() {
    return {
      selections:[
          '今天','昨天','近7天','近14天','近一个月','选择日期','选择范围'
      ],
      dateSelected:'',
      dateSelectedSingle:'',
      dateSelectedRange:[],
      showDatePickerSingle:false,
      loading:false,
      data:{
        days:[],
        views:[],
        orders:[],
        blackPages:[],
        colorPages:[],
        totalPages:[],
        incomes:[]
      },
      option: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      }
    };
  },
  watch:{
    dateSelected(newValue,oldValue){
      let today = LocalDate.now();
      switch (newValue){
        case "今天":
          this.dateSelectedSingle = LocalDate.now().toString();
          this.inputDate(LocalDate.now().toString());
          break;
        case "昨天":
          let yesterday = today.minusDays(1).toString();
          this.dateSelectedSingle = yesterday;
          this.inputDate(yesterday);
          break;
        case "近7天":
          let sevenDaysAgo = today.minusDays(6).toString();
          this.dateSelectedRange = [sevenDaysAgo,today.toString()];
          break;
        case "近14天":
          let doubleSevenDaysAgo = today.minusDays(13).toString();
          this.dateSelectedRange = [doubleSevenDaysAgo,today.toString()];
          break;
        case "近一个月":
          let aMonthAgo = today.minusMonths(1).plusDays(1).toString();
          this.dateSelectedRange = [aMonthAgo,today.toString()];
          break;
      }
    },
    dateSelectedRange(newValue,oldValue){
      this.getData(newValue[0],newValue[1]);
    }
  },
  created() {
    this.dateSelected = '今天';
  },
  methods:{
    inputDate(newDate){
      this.dateSelectedRange = [newDate,newDate];
    },
    getData(from,to){
      this.loading = true;
      userRequest({
        url:"/api/Statistics/Shop/From/"+from+"/To/"+to,
        method:"GET"
      }).then(res=>{
        console.log(res);
        let data = res.data;
        this.data = JSON.parse(JSON.stringify(res.data));
        this.option.series = [];
        this.option.xAxis.data = [];
        this.option.legend.data = [];

        this.option.xAxis.data.push(...data["days"]);
        for (let item of data.data) {
          this.option.legend.data.push(item.name);
          this.option.series.push({
            name: item.name,
            type: 'line',
            data: item.data
          })
        }
        this.loading = false;
      }).catch(err=>{
        console.log(err);
      })
    },
    mock(from,to){
      let data = {
        days:[],
        data:[{
          name:'访问量',
          data:[],
        },{
          name:'订单量',
          data:[],
        },{
          name:'黑白打印页数',
          data:[],
        },{
          name:'彩色打印页数',
          data:[],
        },{
          name:'总打印页数',
          data:[],
        },{
          name:'总收入',
          data:[],
        },]
      };

      let table = this.getTable();
      if (from == null || to == null){
        return;
      }
      let startDate = LocalDate.parse(from);
      let endDate = LocalDate.parse(to);

      for (let i = startDate; i.compareTo(endDate) <= 0; i = i.plusDays(1)) {
        let index = i.toString();
        if (table[index] !== undefined){
          data.days.push(index);
          for (let j in table[index]) {
            data.data[j].data.push(table[index][j]);
          }
        }
      }

      this.data = data;
      this.option.series = [];
      this.option.xAxis.data = [];
      this.option.legend.data = [];

      this.option.xAxis.data.push(...data["days"]);
      for (let item of data.data) {
        this.option.legend.data.push(item.name);
        this.option.series.push({
          name: item.name,
          type: 'line',
          data: item.data
        })
      }
    },
    getTable(){
      return {
        //访问量 订单量 黑白打印页数 彩色打印页数 总打印页数 总收入
        "2022-04-29":[64,32,49,41,90,42],
        "2022-04-28":[24,14,32,45,77,34],
        "2022-04-27":[30,24,66,12,78,26],
        "2022-04-26":[68,35,55,64,119,43],
        "2022-04-25":[34,51,62,45,107,46],
        "2022-04-24":[65,21,54,62,116,56],
        "2022-04-23":[48,25,35,12,47,14],
        "2022-04-22":[98,42,68,34,102,45],
        "2022-04-21":[38,64,21,81,102,64],
        "2022-04-20":[64,98,61,48,109,55],
        "2022-04-19":[82,64,64,35,99,40],
        "2022-04-18":[74,73,15,84,99,62.5],
        "2022-04-17":[65,45,62,32,94,43.5],
      }
    }
  }
}
</script>

<style scoped>
.chart{
  height: 600px;
  width: 960px;
}
</style>