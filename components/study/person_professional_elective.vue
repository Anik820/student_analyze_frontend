<template>
  <div id="xuanxiuScore" style="width:100%;height:500px"></div>
</template>

<script>
import api from "../../api/study_api";
import echarts from "echarts";
import Bus from '@/components/bus.js'
export default {
  data() {
    return {
      stuno:[],
      count:0,
      sign:null,
      c:0,
      init_count:0,
    };
  },
  mounted() {
    this.init();
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart1 = this.$echarts.init(document.getElementById("xuanxiuScore"));
      mychart1.resize();
    };
    

    // 用$on事件来接收参数
    Bus.$on('val', (data) => {
      
      this.stuno = data
      if(this.sign==null){
        this.sign == this.stuno;
        console.log(1)
      }
      if(this.sign!=data){
        this.count = 0;
        console.log(2)
      }
      if(this.count==0){
        //this.count=1;
        // this.sign =0;
        this.init(); 
        console.log(3)
      }
      
    })
    
  },
  methods: {
    init() {
      if(this.init_count==0){
        this.stuno = "201600101011";
        this.init_count=1;
      }
      this.sign = this.stuno;
      //var _self = this;
      let mychart1 = this.$echarts.init(document.getElementById("xuanxiuScore"));
      

      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "选修课成绩",
            type: "gauge",
            detail: { formatter: "{value}" },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[0.2, "#9afd"], [0.8, "#9fcdfd"], [1, "#516b91"]]
              }
            },
            data: [{ value: 50, name: "平均分数" }],
          }
        ]
      };
      console.log(this.count)
      if(this.stuno!=null&&this.count==0){
        
          api.getxuanxiu_Score(this.stuno).then(res => {
        var i = 1;
        option.series[0].data[0].value = res.xuanScore[i - 1];
        option.series[0].data[0].name = res.xuanName[i - 1];
        
        mychart1.setOption(option, true);
        mychart1.resize();
        setInterval(function() {
          //console.log(i, res.xuanScore[i], res.xuanName[i]);
          option.series[0].data[0].value = res.xuanScore[i];
          option.series[0].data[0].name = res.xuanName[i];
          mychart1.setOption(option, true);

          if (i < res.xuanScore.length - 1) {
            i++;
          } else {
            i = 0;
          }
        }, 3000);
      });
      this.count = 1;
      
      }
      mychart1.resize();
    }
  }
};
</script>