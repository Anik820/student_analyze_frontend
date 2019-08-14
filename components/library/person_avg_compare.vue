<template>
  <!-- <div ref="tt" style="height:700px" @click="changeColor2"> -->
  <div class="search">
    <form>
      <i-input :value.sync="value" placeholder="请输入查询学号" style="width: 250px" v-model="stuid"></i-input>&nbsp;&nbsp;&nbsp;&nbsp;
      <i-button type="primary" shape="circle" icon="ios-search" @click="this.sublit"></i-button>
      <div id="personcompare" style="width:100%;height:400px"></div>
    </form>
  </div>

  <!-- <chart ref="test" :options="testoptions()" style="width:800px;height:500px"></chart>
  </div>
   <div id="myChart" :style="{width: '1200px', height: '400px'}"></div> 
  <div ref="myChart" :style="{width: '500px', height: '400px'}">-->
</template>

<script>
import api from "../../api/library_api";
import echarts from "echarts";
import axios from "axios";
import "echarts-wordcloud/dist/echarts-wordcloud.js";
import "echarts-wordcloud/dist/echarts-wordcloud.min.js";
require("echarts-wordcloud");

export default {
  data() {
    return {
      params: []
    };
  },
  mounted() {
    this.init();
    //窗口自适应
    const that = this
		    window.onresize = () => {//  根据窗口大小调整曲线大小
            let mychart = this.$echarts.init(document.getElementById('personcompare'));
             mychart.resize();
		    }
  },
  methods: {
    init() {
      let mychart = this.$echarts.init(document.getElementById("personcompare"));
    },
    sublit() {
      this.params = this.stuid;
      console.log(this.params);
      let mychart = this.$echarts.init(document.getElementById("personcompare"));
      let yl = [];
      let xyl = [];
      let xxl = [];
      let pb = [];

      // }api.getperson_compareschool(this.params)
      api.getperson_compareschool(this.params).then(res => {
        if (Object.keys(res.data).length == 0) {
          alert("没有此学生");
        } else {
          console.log(res);
          yl = res.data.years;
          xxl = res.data.school_borrownum;
          xyl = res.data.college_borrownum;
          pb = res.data.person_borrownum;
          console.log(yl);

          mychart.setOption({
            title: {
              text: "阅读量对比图"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["学校平均阅读量", "学院平均阅读量", "个人平均阅读量"]
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
              data: yl
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
                name: "学校平均阅读量",
                type: "line",
                data: xxl
              },
              {
                name: "学院平均阅读量",
                type: "line",
                data: xyl
              },
              {
                name: "个人平均阅读量",
                type: "line",
                data: pb
              }
            ]
          });
          mychart.resize();
        }
      });
    }
  }
};
</script>

<style>
.search {
  -ms-flex: 100%; /* IE10 */
  flex: 100%;
  padding: 20px;
}
</style>