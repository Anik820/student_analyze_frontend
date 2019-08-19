<template>
  <div id="zhuanyebiScorePer" style="width:100%;height:500px"></div> 
</template>

<script>
import api from "../../api/study_api";
import echarts from "echarts";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
highchartsMore(Highcharts);
import Bus from '@/components/bus.js'

export default {
  data() {
    return {
      stuno:null,
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
      if(this.init_count==0){
        this.stuno = "201600101011";
        this.init_count=1;
      }
    if(this.stuno!==null){
        api.getzhuanyebiScore_per(this.stuno, 16).then(res => {
        Highcharts.chart("zhuanyebiScorePer", {
          chart: {
            type: "column"
          },
          credits: {
            enabled:false
          },//去掉水印
          colors:[
            '#516b91',
            '#9fcdfd',
            '#9afd',
            // '#a79feb',//'#9afd',
            // '#9fcdfd',
            // '#c3eab4',
          ],//设置图表颜色
          title: {
            // text: "学生必修课成绩对比"
            text:" "
          },

          xAxis: {
            categories: res.pername,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: "必修课"
            }
          },
          tooltip: {
            // head + 每个 point + footer 拼接成完整的 table
            headerFormat:
              '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
              '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} 分</b></td></tr>',
            footerFormat: "</table>",
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              borderWidth: 0
            }
          },
          series: [
            {
              name: "个人成绩",
              data: res.perscore
            },
            {
              name: "班级平均分",
              data: res.banjiscore
            },
            {
              name: "专业平均分",
              data: res.zonglist
            }
          ]
        });
	  });
    }
      
	  // mychart1.resize();
    }
  }
};
</script>