<template>
  <!-- <div ref="tt" style="height:700px" @click="changeColor2"> -->
  <div id="tongshiScorePer" align="center" style="width:100%;height:400px"></div>
  <!-- <chart ref="test" :options="testoptions()" style="width:800px;height:500px"></chart>  -->
  <!-- </div> -->
  <!-- <div id="myChart" :style="{width: '1200px', height: '400px'}"></div> -->
  <!-- <div ref="myChart" :style="{width: '500px', height: '400px'}"> -->
</template>

<script>
import api from "../../api/study_api";
import echarts from "echarts";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import Bus from '@/components/bus.js'
highchartsMore(Highcharts);

export default {
  data() {
    return {
      stuno:[],
      init_count:0,
    };
  },
  mounted() {
    this.init();
    const that = this;
    // 用$on事件来接收参数
    Bus.$on('val', (data) => {
      this.stuno = data
      this.init()
    })
  },
  methods: {
    init() {
      if(this.init_count==0){
        this.stuno = "201600101011";
        this.init_count=1;
      }
      
          api.gettongshiScore_per(this.stuno).then(res => {
        Highcharts.chart("tongshiScorePer", {
          chart: {
            polar: true,
            type: "line"
          },
          credits: {
            enabled:false
          },//去掉水印
          colors:[
            '#9fcdfd',
          ],//设置图表颜色
          title: {
            // text: "通识课成绩",
            text:"",
            x: -80
          },
          pane: {
            size: "80%"
          },
          xAxis: {
            categories: res.dengjiming,
            tickmarkPlacement: "on",
            lineWidth: 0
          },
          yAxis: {
            gridLineInterpolation: "polygon",
            lineWidth: 0,
            min: 0
          },
          tooltip: {
            shared: true,
            pointFormat:
              '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
          },
          legend: {
            align: "right",
            verticalAlign: "top",
            y: 70,
            layout: "vertical"
          },
          series: [
            {
              name: "成绩分布",
              data: res.dengjinum,
              pointPlacement: "on"
            }
          ]
        });
      });
      
      
    }
  }
};
</script>