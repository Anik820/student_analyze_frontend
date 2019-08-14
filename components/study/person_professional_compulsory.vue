<template>
  <!-- <div ref="tt" style="height:700px" @click="changeColor2"> -->
  <div id="zhuanyebiScorePer" style="width:100%;height:500px"></div>
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
        document.getElementById("zhuanyebiScorePer")
      );
      mychart1.resize();
    };
  },
  methods: {
    init() {
      api.getzhuanyebiScore_per("201600101002", 16).then(res => {
        Highcharts.chart("zhuanyebiScorePer", {
          chart: {
            type: "column"
          },
          credits: {
            enabled:false
          },//去掉水印
          colors:[
            '#a79feb',//'#9afd',
            '#9fcdfd',
            '#c3eab4',
          ],//设置图表颜色
          title: {
            text: "学生必修课成绩对比"
          },

          xAxis: {
            categories: res.pername,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: "必修课"
            }
          },
          tooltip: {
            // head + 每个 point + footer 拼接成完整的 table
            headerFormat:
              '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
              '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} 分</b></td></tr>',
            footerFormat: "</table>",
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              borderWidth: 0
            }
          },
          series: [
            {
              name: "个人成绩",
              data: res.perscore
            },
            {
              name: "班级平均分",
              data: res.banjiscore
            },
            {
              name: "专业平均分",
              data: res.zonglist
            }
          ]
        });
	  });
	  mychart1.resize();
    }
  }
};
</script>