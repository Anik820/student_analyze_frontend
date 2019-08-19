<template>
<div>
  <div class="search">
    
      <i-input :value.sync="value" placeholder="请输入查询学号" style="width: 250px" v-model="stuid"></i-input>&nbsp;&nbsp;&nbsp;&nbsp;
      <i-button type="primary" shape="circle" icon="ios-search" @click="this.submit"></i-button>
  </div>
  <div id="personcompare" style="width:100%;height:400px"></div>
</div>
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
      params: [],
      yl : [],
      xyl :[],
      xxl : [],
      pb :[],
      color: ["#9fcdfd", "#c3eab4","#ffda43"]
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
      this.params = "201701204031";
      api.getperson_compareschool(this.params).then(res => {
            this.yl = res.data.years;
            this.xxl = res.data.school_borrownum;
            this.xyl = res.data.college_borrownum;
            this.pb = res.data.person_borrownum;
          mychart.setOption(this.option(this.yl,this.xxl,this.xyl,this.pb));
          mychart.resize();
      });

      this.submit();
    },
    submit() {
      this.params = this.stuid;
      console.log(this.params);
      let mychart = this.$echarts.init(document.getElementById("personcompare"));

      // }api.getperson_compareschool(this.params)
      api.getperson_compareschool(this.params).then(res => {
        if (Object.keys(res.data).length == 0) {
          alert("没有此学生");
        } else {
          this.yl = res.data.years;
          this.xxl = res.data.school_borrownum;
          this.xyl = res.data.college_borrownum;
          this.pb = res.data.person_borrownum;
          mychart.setOption(this.option(this.yl,this.xxl,this.xyl,this.pb));
          mychart.resize();
        }
      });
    },
    option(yl,xxl,xyl,pb){
      return {
            color: this.color,
            title: {
              // text: "阅读量对比图"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["学校平均阅读量", "学院平均阅读量", "个人平均阅读量"]
            },
            grid: {
              top:"10%",
              left: "3%",
              right: "4%",
              bottom: "2%",
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
                start: 0, //滚动条开始位置（共100等份）
                end: 100 //结束位置（共100等份）
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
          }
    },
  }
};
</script>

<style>
.search {
  -ms-flex: 100%; /* IE10 */
  flex: 100%;
  padding: 10px 0 50px 30px;
}
</style>