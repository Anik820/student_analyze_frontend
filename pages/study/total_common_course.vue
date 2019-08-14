<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/studyindex">学业分析</BreadcrumbItem>
        <BreadcrumbItem to="/study_total">整体学业情况</BreadcrumbItem>
        <BreadcrumbItem to="/total_common_course">通识课情况</BreadcrumbItem>
      </Breadcrumb>

      <Content :style="{padding: '0 50px'}">
        <div class="main">
          <Card :bordered="false" style="height:600px;width:49%;float:left;">
            <p slot="title">课程学生专业分布情况</p>
            <div>
              <common_course_bar></common_course_bar>
            </div>
          </Card>

          <Card :bordered="false" style="height:600px;width:49%;float:right;">
            <p slot="title">各学院开设专业情况</p>
            <div>
              <common_course_rose></common_course_rose>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  </div>
</template>


<script>
import { METHODS } from "http";
import api from "@/api/study_api";
import echarts from "echarts";
import common_course_rose from "@/components/study/common_course_rose";
import common_course_bar from "@/components/study/common_course_bar";
export default {
  components: {
    common_course_rose,
    common_course_bar
  },
  data() {
    return {
      value: [],
      va: [],
      echartsdata: [],
      title_data: [],
      legend_data: [],
      series_data: [],
      chart: "",
      data: [
        {
          value: "电视学院",
          label: "电视学院",
          children: [
            {
              value: "16",
              label: "2016级",
              children: [
                {
                  value: "思想道德修养与法律基础",
                  label: "思想道德修养与法律基础"
                },
                {
                  value: "马克思主义基本原理概论",
                  label: "马克思主义基本原理概论"
                },
                {
                  value: "中国近现代史纲要",
                  label: "中国近现代史纲要"
                }
              ]
            },
            {
              value: "17",
              label: "2017级",
              children: [
                {
                  value: "思想道德修养与法律基础",
                  label: "思想道德修养与法律基础"
                },
                {
                  value: "马克思主义基本原理概论",
                  label: "马克思主义基本原理概论"
                },
                {
                  value: "中国近现代史纲要",
                  label: "中国近现代史纲要"
                }
              ]
            },
            {
              value: "18",
              label: "2018级",
              children: [
                {
                  value: "思想道德修养与法律基础",
                  label: "思想道德修养与法律基础"
                },
                {
                  value: "马克思主义基本原理概论",
                  label: "马克思主义基本原理概论"
                },
                {
                  value: "中国近现代史纲要",
                  label: "中国近现代史纲要"
                }
              ]
            },
            {
              value: "19",
              label: "2019级",
              children: [
                {
                  value: "思想道德修养与法律基础",
                  label: "思想道德修养与法律基础"
                },
                {
                  value: "马克思主义基本原理概论",
                  label: "马克思主义基本原理概论"
                },
                {
                  value: "中国近现代史纲要",
                  label: "中国近现代史纲要"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //窗口自适应
      const that = this;
      window.onresize = () => {
        //  根据窗口大小调整曲线大小
        let mychart2 = this.$echarts.init(document.getElementById("tsk"));
        let mychart1 = this.$echarts.init(document.getElementById("tsc"));
        mychart1.resize();
        mychart2.resize();
      };
    },
    changeData(value, selectedData) {
      let xy = value[0];
      let nj = value[1];
      let kc = value[2];
      // thischart = this.$echarts.init(document.getElementById("main"));
      api.getprofessional_elective(xy, nj, kc).then(res => {
        // this.echartsdata = res;
        console.log(this.echartsdata);
        let coursename = res.class;
        let servicedata = [];
        for (let i = 0; i < res.class.length; i++) {
          let obj = new Object();
          obj.name = res.class[i];
          obj.value = res.stunum[i];
          servicedata[i] = obj;
        }
        this.title_data = coursename;
        this.legend_data = res.name;
        this.series_data = servicedata;
        this.chart.setOption({
          title: {
            text: "课程学生专业分布情况",
            subtext: "选课",
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "",
            x: "center",
            y: "top",
            data: this.legend_data
          },
          series: [
            {
              name: "选课学生专业分布",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: this.series_data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
        chart.resize();
      });
    }
  }
};
</script>


<style>
.main {
  -ms-flex: 80%; /* IE10 */
  flex: 80%;
  padding: 20px;
  height: 1080px;
}
.search {
  width: 1000px;
  height: 35px;
}
.bread {
  margin: "24px 0";
  position: relative;
  left: 40px;
  top: -33px;
}
</style>