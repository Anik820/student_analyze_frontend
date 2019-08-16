<template>
  <div>
    <div id="trans_pro" style="height:250px,weight:100%"></div>
  </div>
</template>


<script>
import api from "../../api/study_api";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import snakey from "highcharts/modules/sankey.js";
import dependencywheel from "highcharts/modules/dependency-wheel.js";

highchartsMore(Highcharts);
snakey(Highcharts);
dependencywheel(Highcharts);

export default {
  data() {
    return {
      datalist: []
    };
  
  },
  mounted() {
    this.init();
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart2 = this.$echarts.init(document.getElementById("trans_pro"));
      mychart2.resize();
    };
    
    
  },
  methods: {
    init() {
      this.chartproduce();
    
    },
    chartproduce() {
      window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart2 = this.$echarts.init(document.getElementById("trans_pro"));
      mychart2.resize();
      
    };

      api.gettrans_profession().then(res => {
        for (var i = 0; i < res.raw_partlist.length; i++) {
          let reslist = [];
          reslist[0] = res.raw_partlist[i];
          reslist[1] = res.trans_partlist[i];
          reslist[2] = res.trans_stunumlist[i];

          this.datalist[i] = reslist;
        }
        console.log(this.datalist);
        Highcharts.chart("trans_pro", {
          credits: {
            enabled:false
          },//去掉水印
          colors:[
            '#a5dff9',
            '#afe39b',
            '#ffe88e',
            'rgba(255,175,175,0.76)',
            'rgba(189,183,240,0.86)',
          ],//设置图表颜色
          title: {
            text: ""
          },
          series: [
            {
              keys: ["from", "to", "weight"],
              data: this.datalist,
              type: "dependencywheel",
              name: "Dependency wheel series",
              dataLabels: {
                color: "#333",
                textPath: {
                  enabled: true,
                  attributes: {
                    dy: 5
                  }
                },
                distance: 10
              },
              size: "95%"
            }
          ]
        });
      });
    }
  }
};
</script>