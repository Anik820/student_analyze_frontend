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
            "#516b91",
            "#569ae2",
            "#a5dff9",
            "#94d8e1",
            "#82ddc1",
            "#afe39b",
            "#e5f39b",
            "#ffe88e",
            "#fbffb9",
            "rgba(255,175,175,0.43)",
            "rgba(255,175,175,0.76)",
            "rgba(240,124,158,0.73)",
            "#d29dd7",
            "rgba(189,183,240,0.86)",
            "rgba(131,121,207,0.82)",
            "#686eca"
          ],//设置图表颜色
          title: {
            // text: "各学院课程成绩比对"
            text:""
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