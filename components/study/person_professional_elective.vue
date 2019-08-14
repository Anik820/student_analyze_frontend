<template>
  <div id="xuanxiuScore" style="width:100%;height:500px"></div>
</template>

<script>
import api from "../../api/study_api";
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart1 = this.$echarts.init(
        document.getElementById("xuanxiuScore")
      );
      mychart1.resize();
    };
  },
  methods: {
    init() {
      var _self = this;
      let mychart1 = this.$echarts.init(
        document.getElementById("xuanxiuScore")
      );

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
                color: [[0.2, "#9afd"], [0.8, "#9fcdfd"], [1, "#c3eab4"]]
              }
            },
            data: [{ value: 50, name: "平均分数" }],
          }
        ]
      };

      api.getxuanxiu_Score("201600101000").then(res => {
        var i = 1;
        option.series[0].data[0].value = res.xuanScore[i - 1];
        option.series[0].data[0].name = res.xuanName[i - 1];
        mychart1.setOption(option, true);
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
        }, 2500);
      });
      mychart1.resize();
    }
  }
};
</script>