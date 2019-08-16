<template>
  <div>
    <div id="publicelect" style="height:450px;width:100%;">
      <!-- <chart :options="testoptions()" style="width:750px;height:600px"></chart> -->
    </div>
    <i-button type="dashed" icon="ios-arrow-back" id="return-button" @click="charts()">Back</i-button>
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
      let chart = this.$echarts.init(document.getElementById("publicelect"));
      chart.resize();
    };
  },
  methods: {
    init() {
      this.charts();
    },
    charts() {
      let chart = this.$echarts.init(document.getElementById("publicelect"));
      api.getpublic_elective_drill(1, 1).then(res => {
        let servicedata = [];
        this.attribute = res.college;
        for (var i = 0; i < res.college.length; i++) {
          var obj = new Object();
          obj.name = res.college[i];
          obj.value = res.public_num[i];
          servicedata[i] = obj;
        }
        console.log(servicedata);

        this.legend_data = servicedata.name;
        this.xAxis_data = this.attribute;
        this.series_data = servicedata;
        chart.setOption(this.testoptions());
        chart.resize();

        chart.on("click", object => {
          chart.dispose(publicelect);
          chart = this.$echarts.init(document.getElementById("publicelect"));
          let data = object.name;

          api.getpublic_elective_drill(2, data).then(res => {
            let servicedata = [];

            for (var i = 0; i < res.coursename.length; i++) {
              var obj = new Object();
              obj.name = res.coursename[i];
              obj.value = res.stunum[i];
              servicedata[i] = obj;
            }

            this.drilldata[0] = servicedata.name;
            this.drilldata[1] = res.coursename;
            this.drilldata[2] = servicedata;
            chart.setOption(this.test2options(this.drilldata, data));
            chart.resize();
            console.log(this.drilldata[1]);
          });
        });
      });
    },
    testoptions() {
      return {
        grid: {
          bottom: "30px" //组件离容器下侧的距离,百分比字符串或整型数字
        },
        // color: ["#7fbcfc"],
        title: {
          text: "各学院开设公选课情况",
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
            formatter: function(value) {
              /* debugger  
                                var ret = "";//拼接加\n返回的类目项  
                                var maxLength = 2;//每项显示文字个数  
                                var valLength = value.length;//X轴类目项的文字个数  
                                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                                if (rowN > 1)//如果类目项的文字大于3,  
                                {  
                                    for (var i = 0; i < rowN; i++) {  
                                        var temp = "";//每次截取的字符串  
                                        var start = i * maxLength;//开始截取的位置  
                                        var end = start + maxLength;//结束截取的位置  
                                        //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                                        temp = value.substring(start, end) + "\n";  
                                        ret += temp; //凭借最终的字符串  
                                    }  
                                    return ret;  
                                }  
                                else {  
                                    return value;  
                                } */
              return value.split("").join("\n");
            },
            inside: true,
            // show:true,
            interval: 0,
            // rotate: 40,
            //                                                                   formatter:function(val){
            //
            // return val.split("").join("\n");

            // }  ,
            textStyle: {
              color: "#000"
            },
            grid: {
              bottom: "10%"
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
            name: "公选课开设数目",
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
    test2options(drilldata, data) {
      return {
        // color: ["#ffdb5c"],
        title: {
          text: data + "开设公选课选课人数",
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
            name: "图书借阅数",
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