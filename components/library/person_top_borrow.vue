<template>
  <!-- <div ref="tt" style="height:700px" @click="changeColor2"> -->
  <div id="top" style="width:100%;height:700px"></div>
  <!-- <chart ref="test" :options="testoptions()" style="width:800px;height:500px"></chart>  -->
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
      color: ["#9fcdfd"]
    };
  },
  mounted() {
    this.init();
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart1 = this.$echarts.init(document.getElementById("top"));
      mychart1.resize();
    };
  },
  methods: {
    init() {
      let mychart1 = this.$echarts.init(document.getElementById("top"));
      let years = "2012";
      api.getperson_top_borrow(2012).then(res => {
        mychart1.setOption({
          color: this.color,
          title: {
            text: "全校借阅Top10",
            subtext: "全校数据来源"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            data: ["借阅数量"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: "category",
            data: res.stuno
          },
          series: [
            {
              name: years + "年",
              type: "bar",
              data: res.stu_borrow
            }
          ]
        });
        mychart1.resize();
      });
    }
  }
};
</script>