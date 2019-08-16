<template>
  <div id="double_degree2" style="height:350px;width:100%;">
    <!-- <chart :options="testoptions()" style="width:750px;height:600px"></chart> -->
  </div>
</template>

<script>
import api from "../../api/study_api";

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
      drilldata: []
    };
  },
  mounted() {
    this.init();
    console.log(this.echartdata);
    //窗口自适应
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let chart = this.$echarts.init(document.getElementById("double_degree2"));
      chart.resize();
    };
  },
  methods: {
    init() {
      this.charts();
    },
    charts() {
      let chart = this.$echarts.init(document.getElementById("double_degree2"));

      window.onresize = function() {
        chart.resize();
        //myChart1.resize();    //若有多个图表变动，可多写
      };
      api.getdouble_degree(1, 1).then(res => {
        let servicedata2 = [];
        for (var i = 0; i < res.zyname.length; i++) {
          var obj = new Object();
          obj.name = res.zyname[i];
          obj.value = res.stunum[i];
          servicedata2[i] = obj;
        }
        this.legend_data2 = res.zyname;
        this.series_data2 = servicedata2;
        this.xAxis_data = res.zyname;
        chart.setOption(this.testoptions2());
        chart.resize();
      });
    },

    testoptions2() {
      let chart = this.$echarts.init(document.getElementById("double_degree2"));
      window.onresize = function() {
        chart.resize();
        //myChart1.resize();    //若有多个图表变动，可多写
      };
      return {
        title: {
          text: "双学位课程选课人数",
          x: "center"
        },
        tooltip: {},
        legend: {
          x: "20px",
          y: "top",

          data: this.legend_data2
        },
        xAxis: {
          data: this.xAxis_data,

          axisLabel: {
            formatter: function(value) {
              return value.split("").join("\n");
            },
            inside: true,
            interval: 0,
            // rotate: 90,
            textStyle: {
              color: "#000"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#666"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            name: "专业辅修人数",
            type: "bar",
            data: this.series_data2,
            itemStyle: {
              normal: {
                //颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#569ae2"
                  },
                  {
                    offset: 1,
                    color: "#a5dff9" //"#a5dff9"
                  }
                ])
              }
            },
            barGap: 10,
            areaStyle: {}
          }
        ]
      };
    }
  }
};
</script>
