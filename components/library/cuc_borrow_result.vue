<template>
  <div>
    <div id="borrowresult" style="height:290px;width:100%;"></div>
    <i-button type="dashed" icon="ios-arrow-back" id="return-button" @click="charts()">Back</i-button>
  </div>
</template>

<script>
import api from "../../api/library_api";

export default {
  data() {
    return {
      echartdata: [],
      xAxis_data: [],
      legend_data: [],
      series_data: [],
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
      let mychart = this.$echarts.init(document.getElementById("hotbook"));
      let chart = this.$echarts.init(document.getElementById("borrowresult"));
      chart.resize();
      mychart.resize();
    };
  },
  methods: {
    init() {
      this.charts();
    },
    charts() {
      let chart = this.$echarts.init(document.getElementById("borrowresult"));
      /* window.onresize = function(){
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        } */

      api.getcuc_borrow_result().then(res => {
        let servicedata = [];
        let year = [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019"
        ];
        this.attribute = year;
        for (var i = 0; i < res.borrownum.length; i++) {
          var obj = new Object();
          obj.name = year[i];
          obj.value = res.borrownum[i];
          servicedata[i] = obj;
        }
        console.log(servicedata);

        this.legend_data = servicedata.name;
        this.xAxis_data = this.attribute;
        this.series_data = servicedata;
        chart.setOption(this.testoptions());
        chart.resize();

        chart.on("click", object => {
          chart.dispose(borrowresult);
          chart = this.$echarts.init(document.getElementById("borrowresult"));
          let data = object.name;

          api.getcuc_borrow_result(data).then(res => {
            let n = "borrow" + data;
            let attribute2 = res.n;

            let servicedata = [];
            let month = [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ];
            let r = res[n];
            for (var i = 0; i < r.length; i++) {
              var obj = new Object();
              obj.name = month[i];

              obj.value = r[i];
              servicedata[i] = obj;
            }

            this.drilldata[0] = servicedata.name;
            this.drilldata[1] = month;
            this.drilldata[2] = servicedata;
            chart.setOption(this.test2options(this.drilldata,data));
            chart.resize();
            console.log(this.drilldata[1]);
          });
        });
      });
    },
    testoptions() {
      return {
        // color: ["#7fbcfc"],
        grid:{
          bottom:"30px",//组件离容器下侧的距离,百分比字符串或整型数字
        },
        title: {
          text: "各年度借阅总数",
          x: "center"
        },
        tooltip: {},
        legend: {
          x: "20px",
          y: "top",

          data: this.legend_data
        },
        xAxis: {
          data: this.xAxis_data,

          axisLabel: {
            // formatter:function(value){
            //     return value.split("").join("\n");
            // },
            inside: true,
            interval: 0,
            // rotate: 90,
            //                                                                   formatter:function(val){
            //
            // return val.split("").join("\n");

            // }  ,
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
            name: "图书借阅数目",
            type: "bar",
            data: this.series_data,
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
    },
    test2options(drilldata,data) {
      return {
        // color: ["#ffdb5c"],
        grid:{
          bottom:"30px",//组件离容器下侧的距离,百分比字符串或整型数字
        },
        title: {
          text: data+"年各月借阅数目",
          x: "center"
        },
        tooltip: {},
        legend: {
          x: "20px",
          y: "top",

          data: drilldata[0]
        },
        xAxis: {
          data: drilldata[1],

          axisLabel: {
            formatter: function(value) {
              return value.split("").join("\n");
            },
            inside: true,
            interval: 0,
            // rotate: 90,
            //                                                                   formatter:function(val){
            //
            // return val.split("").join("\n");

            // }  ,
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
            name: "借阅数目",
            type: "bar",
            data: drilldata[2],
            itemStyle: {
              normal: {
                //颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#ffdb5c"
                  },
                  {
                    offset: 1,
                    color: "#fbffb9" //"#a5dff9"
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