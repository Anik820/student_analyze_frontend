<template>
  <!-- <div ref="tt" style="height:700px" @click="changeColor2"> -->
  <div id="avgcom" style="width:100%;height:500px"></div>
  <!-- </div> -->
  <!-- <div id="myChart" :style="{width: '1200px', height: '400px'}"></div> -->
  <!-- <div ref="myChart" :style="{width: '500px', height: '400px'}"> -->
</template>

<script>
import api from "../../api/library_api";
import echarts from "echarts";

export default {
  data() {
    return {
      echartdata: [],
      color: ["#60acfc", "#afe39b"] //'#9fcdfd'
    };
  },
  mounted() {
    this.init();
    //窗口自适应
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart2 = this.$echarts.init(document.getElementById("avgcom"));
      mychart2.resize();
    };
  },
  methods: {
    init() {
      let mychart2 = this.$echarts.init(document.getElementById("avgcom"));
      api.getavgbook_college("新闻学院").then(res => {
        mychart2.setOption({
          color: this.color,
          title: {
            text: "阅读量对比图"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["学校平均阅读量", "学院平均阅读量"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: res.yearlist
          },
          yAxis: {
            type: "value"
          },
          dataZoom: [
          {
            type: "slider",
            realtime: true, //拖动滚动条时是否动态的更新图表数据
            height: 25, //滚动条高度
            start: 40, //滚动条开始位置（共100等份）
            end: 65 //结束位置（共100等份）
            }
          ],
          series: [
            {
              name: "学院平均阅读量",
              type: "line",
              data: res.学院历年数目
            },
            {
              name: "学校平均阅读量",
              type: "line",
              data: res.学校历年数目
            }
          ]
        });
        mychart2.resize();
      });
    }
  }
};
</script>