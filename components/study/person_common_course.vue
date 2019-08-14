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
highchartsMore(Highcharts);

export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart1 = this.$echarts.init(
        document.getElementById("tongshiScorePer")
      );
      mychart1.resize();
    };
  },
  methods: {
    init() {
      api.gettongshiScore_per("201600101002").then(res => {
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
            text: "通识课成绩",
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
      mychart1.resize();
    }
  }
};
</script>