<template>
  <div>
    <div id="double_degree" style="height:350px;width:100%;"></div>
  </div>
</template>

<script>
import api from "../../api/study_api"
import echarts from "echarts"
import macarons from 'echarts/theme/macarons'

export default {
  data() {
    return {
      echartdata: [],
      xAxis_data: [],
      legend_data: [],
      legend_data2: [],
      series_data: [],
      series_data2: [],
      attribute: [],
      drilldata: [],
      color:[
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
    };
    
  },
  mounted() {
    this.init();
    console.log(this.echartdata);
    //窗口自适应
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let chart2 = this.$echarts.init(document.getElementById("double_degree"),'macarons');
      chart2.resize();
    };
  },
  methods: {
    init() {
      this.charts();
    },
    charts() {
      let chart2 = this.$echarts.init(document.getElementById("double_degree"),'macarons');

      api.getdouble_degree(2, "新闻学").then(res => {
        let servicedata = [];
        for (var i = 0; i < res.stucol.length; i++) {
          var obj = new Object();
          obj.name = res.stucol[i];
          obj.value = res.stunum[i];
          servicedata[i] = obj;
        }
        this.legend_data = res.zyname;
        this.series_data = servicedata;
        chart2.setOption(this.testoptions());
        chart2.resize();
      });
    },

    testoptions() {
      return {
        color:this.color,
        title: {
          text: "双学位学生专业分布情况",
          //subtext:  "选课",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "",
          x: "center",
          y: "top",
          data: this.legend_data
        },
        series: [
          {
            name: "选课学生专业分布",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.series_data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    }
  }
};
</script>