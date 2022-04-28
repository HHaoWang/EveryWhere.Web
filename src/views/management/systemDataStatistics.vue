<template>
  <div>
    <span class="text-h4 ml-2">数据统计</span>
    <v-row class="ml-0 mt-2">
      <v-col class="d-flex" cols="2" sm="2">
        <v-select :items="selections" label="选择日期查看统计数据" solo v-model="dateSelected"></v-select>
      </v-col>
      <v-col class="d-flex" cols="3" sm="2" v-if="dateSelected === '选择日期'">
        <v-menu offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs}">
            <v-text-field v-bind="attrs" v-on="on" v-model="dateSelectedSingle" readonly></v-text-field>
          </template>
          <v-date-picker @input="inputDate" v-model="dateSelectedSingle"
                         :first-day-of-week="1" locale="zh-cn" no-title>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="d-flex" cols="3" sm="2" v-if="dateSelected === '选择范围'">
        <v-menu offset-y transition="scale-transition"
                :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs}">
            <v-text-field v-bind="attrs" v-on="on" v-model="dateSelectedRange.join('~')" readonly></v-text-field>
          </template>
          <v-date-picker v-model="dateSelectedRange" :first-day-of-week="1" range
                         locale="zh-cn" no-title
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script>
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
  name: "systemDataStatistics",
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
          let sevenDaysAgo = today.minusDays(7).toString();
          this.dateSelectedRange = [sevenDaysAgo,today.toString()];
          break;
        case "近14天":
          let doubleSevenDaysAgo = today.minusDays(14).toString();
          this.dateSelectedRange = [doubleSevenDaysAgo,today.toString()];
          break;
        case "近一个月":
          let aMonthAgo = today.minusMonths(1).toString();
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
      let data = {
        days:[],
        data:[{
          name:'访问量',
          data:[],
        },{
          name:'订单量',
          data:[],
        },{
          name:'打印页数',
          data:[],
        },{
          name:'打印文档数',
          data:[],
        },{
          name:'交易额',
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
        //访问量 订单量 打印页数 打印文档数 总打印页数 交易额
        "2022-04-29":[562,124,501,135,294],
        "2022-04-28":[516,114,525,145,272],
        "2022-04-27":[564,214,662,265,284],
        "2022-04-26":[492,315,556,328,419],
        "2022-04-25":[426,251,622,301,307],
        "2022-04-24":[681,215,544,268,316],
        "2022-04-23":[536,265,535,294,327],
        "2022-04-22":[459,342,682,364,432],
        "2022-04-21":[486,364,521,402,498],
        "2022-04-20":[587,398,615,408,529],
        "2022-04-19":[632,364,664,394,599],
        "2022-04-18":[684,373,615,384,599],
        "2022-04-17":[626,345,621,362,594],
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