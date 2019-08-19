<template>
  <div id="partmentresult" style="width:100%;height:350px"></div>
</template>

<script>
import api from "../../api/library_api";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
highchartsMore(Highcharts);
export default {
  data() {
    return {
      A1data: [],
      A2data: [],
      A3data: [],
      A4data: [],
      A5data: []
    };
  },
  mounted() {
    this.init();
    //窗口自适应
    window.onresize = chart.resize;
  },
  methods: {
    init() {
      api.getpartment().then(res => {
        for (let i = 0; i < res.A1.length; i++) {
          let obj = new Object();
          obj.name = res.A1[i];
          obj.value = res.A11[i];
          this.A1data[i] = obj;
        }

        for (var i = 0; i < res.A2.length; i++) {
          var obj = new Object();
          obj.name = res.A2[i];
          obj.value = res.A22[i];
          this.A2data[i] = obj;
        }
        console.log(this.A2data);
        for (var i = 0; i < res.A3.length; i++) {
          var obj = new Object();
          obj.name = res.A3[i];
          obj.value = res.A33[i];
          this.A3data[i] = obj;
        }
        for (var i = 0; i < res.A4.length; i++) {
          var obj = new Object();
          obj.name = res.A4[i];
          obj.value = res.A44[i];
          this.A4data[i] = obj;
        }
        for (var i = 0; i < res.A5.length; i++) {
          var obj = new Object();
          obj.name = res.A5[i];
          obj.value = res.A55[i];
          this.A5data[i] = obj;
        }

        Highcharts.chart("partmentresult", {
          chart: {
            type: "packedbubble",
            height: "35%"
          },
          credits: {
            enabled: false
          }, //去掉highcharts水印
          title: {
            text: "借阅量对比"
           
          },
          tooltip: {
            useHTML: true,
            pointFormat: "<b>{point.name}阅读量是：{point.y}</b> "
          },
          plotOptions: {
            packedbubble: {
              minSize: "30%",
              maxSize: "120%",
              zMin: 0,
              zMax: 1000,
              layoutAlgorithm: {
                gravitationalConstant: 0.05,
                splitSeries: true,
                seriesInteraction: false,
                dragBetweenSeries: true,
                parentNodeLimit: true
              },
              dataLabels: {
                enabled: true,
                format: "{point.name}",
                filter: {
                  property: "y",
                  operator: ">",
                  value: 250
                },
                style: {
                  color: "black",
                  textOutline: "none",
                  fontWeight: "normal"
                }
              }
            }
          },
          series: [
            {
              name: "新闻传播学院",
              data: this.A1data
            },
            {
              name: "人文社科学院",
              data: this.A2data
            },
            {
              name: "信息科学与技术学部",
              data: this.A3data
            },
            {
              name: "广告与经管学部",
              data: this.A4data
            },
            {
              name: "艺术学部",
              data: this.A5data
            }
          ]
        });
      });
    }
  }
};
</script>

<style>

</style>
