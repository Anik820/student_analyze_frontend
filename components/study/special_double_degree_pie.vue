<template>
  <div>
    <div id="double_degree" style="height:350px;width:100%;"></div>
  </div>
</template>

<script>
import api from "../../api/study_api"
import echarts from "echarts"

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
    };
    
  },
  mounted() {
    this.init();
    console.log(this.echartdata);
    //窗口自适应
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let chart2 = this.$echarts.init(document.getElementById("double_degree"),'study_16colors');
      chart2.resize();
    };
  },
  methods: {
    init() {
      this.charts();
    },
    charts() {
      let chart2 = this.$echarts.init(document.getElementById("double_degree"),'study_16colors');

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
          // text: "双学位学生专业分布情况",
          subtext:  "学院分布情况",
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