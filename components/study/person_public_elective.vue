<template>
  <div style="width:100%,height:300px">
    <div id="per_pubelect" style="width:100%"></div>
  </div>
</template>

<script>
import api from "../../api/study_api";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import Bus from '@/components/bus.js'
highchartsMore(Highcharts);

export default {
  data() {
    return {
      datalist: [],
      xAxislist: [],
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
      if(this.stuno!=null){
        this.chartproduce();
      }
      
    },
    chartproduce() {
      if(this.init_count==0){
        this.stuno = "201600101011";
        this.init_count=1;
      }
      api.getperson_publicelective(this.stuno).then(res => {
        for (var i = 0; i < res.courselist.length; i++) {
          this.xAxislist[i] = res.courselist[i];
          this.datalist[i] = res.scorelist[i];
        }
        Highcharts.chart("per_pubelect", this.option());
      });
      
    },

    option() {
      return {
        chart: {
          type: "bar"
        },
        credits: {
          enabled: false
        }, //去掉水印
        colors: ["#9fcdfd"], //设置图表颜色
        title: {
          // text: "公选课成绩情况"
          text:""
        },
        subtitle: {
          text: ""
        },
        xAxis: {
          categories: this.xAxislist,
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: "分数",
            align: "high"
          },
          labels: {
            overflow: "justify"
          }
        },
        tooltip: {
          valueSuffix: " 分"
        },
        plotOptions: {
          column: {
            colorByPoint: true
          },
          bar: {
            dataLabels: {
              enabled: true,
              allowOverlap: true // 允许数据标签重叠
            }
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -40,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
            "#FFFFFF",
          shadow: true
        },
        series: [
          {
            name: "成绩",
            data: this.datalist,
            // colors: ["#27a1ea", "#7fbcfc", "#9afd"] //设置图表颜色
            /* itemStyle: {
              normal: {
                color: function(params) {
                  //首先定义一个数组
                  var colorList = [
                    
                    "#64BD3D",
                    "#EE9201",
                    "#29AAE3",
                    "#B74AE5",
                    "#0AAF9F",
                    "#E89589"
                  ];
                  return colorList[params.dataIndex];
                }, //以下为是否显示
            
              }
        }, */
          }
        ]
      };
    }
  }
};
</script>