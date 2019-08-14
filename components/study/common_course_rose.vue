<template>
  <div>
    <Cascader
     :data="data"
     id="xynjkc" 
     trigger="hover" 
     style="width: 350px"
     @on-change="changeData"></Cascader>
    <div id="tsk" style="width:100%;height:400px"></div>
  </div>
</template>

<script>
import api from "../../api/study_api";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
highchartsMore(Highcharts);
export default {
  data() {
    return {
      data: [
        {
          value: "16",
          label: "2016级",
          children: [
            {
              value: "思想道德修养与法律基础",
              label: "思想道德修养与法律基础"
            },
            {
              value: "马克思主义基本原理概论",
              label: "马克思主义基本原理概论"
            },
            {
              value: "中国近现代史纲要",
              label: "中国近现代史纲要"
            }
          ]
        }
      ],
    };
  },
  mounted() {
   this.init();
   const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart2 = this.$echarts.init(document.getElementById("tsk"));
      mychart2.resize();
    };
  },
  methods: {
    init(){
        this.changeData([19,'思想道德修养与法律基础'],1)
    },
    changeData(value, selectedData) {
      let mychart2 = this.$echarts.init(document.getElementById("tsk"));

      let nj = value[0];
      let course = value[1];
      api.gettongshi_elective(nj, course).then(res => {
        Highcharts.chart("tsk", {
          chart: {
            inverted: false,
            polar: true
          },
          credits: {
            enabled: false
          }, //去掉highcharts水印
          colors:[
            '#60acfc',
            '#32d3eb',
            '#a79feb',
            '#d4ec59',
            '#63d5b2',
            '#c37cca',
            '#9cdc82',
            '#ffdb5c',
            '#fb6e6c',
            '#fca8a6',
            '#abafed',
            '#9fcdfd',
            '#9fe6b8',
            '#ff9f7f',
            '#fb7293',
            '#747be1',
            '#e7bcf3',
          ],//设置图表颜色
          title: {
            text: "各学院课程成绩比对"
          },
          subtitle: {
            text: ""
          },
          xAxis: {
            categories: res.学院
          },
          series: [
            {
              type: "column",
              colorByPoint: true,
              data: res.分数,
              showInLegend: false
            }
          ]
        });
      });
    }
  }
};
</script>

<style>
.search {
  width: 1000px;
  height: 35px;
  padding: 0%
}
</style>