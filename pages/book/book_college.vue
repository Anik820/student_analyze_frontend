<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/bookjieyuexinwei">图书借阅行为</BreadcrumbItem>
        <BreadcrumbItem to="/book_college">学院借阅情况</BreadcrumbItem>
      </Breadcrumb>

      <Content :style="{padding: '0 60px'}">
        <div class="main-page">
          <Card :bordered="false" style="height:400px;width:49%;float:left;">
            <p slot="title">各学部、学院借阅量</p>
            <div>
              <college_department_result></college_department_result>
            </div>
          </Card>
          <div>
            <Card :bordered="false" style="height:400px;width:49%;float:right;">
              <p slot="title">学院热门书籍</p>
              <Cascader
                :data="data"
                id="xynjkc"
                trigger="hover"
                style="width: 250px"
                @on-change="changeData"
              ></Cascader>
              <div id="hotbookcollege" style="height:280px;width:100%;"></div>
            </Card>
          </div>

          <Card :bordered="false" style="width:100%;height:480px;float:left;margin-top:30px;margin:30px auto">
            <p slot="title">各学院借阅量</p>
            <div align="center">
              <college_borrow_drill></college_borrow_drill>
            </div>
          </Card>
          <Card :bordered="false" style="width:100%;height:600px;float:left;margin-top:10px;margin:0 auto">
            <p slot="title">学院借阅量与校平均借阅量</p>
            <div align="center">
              <college_avg_compare></college_avg_compare>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  </div>
</template>


<script>
import api from "@/api/library_api";
import echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud.js";
import "echarts-wordcloud/dist/echarts-wordcloud.min.js";
require("echarts-wordcloud");
import college_department_result from "@/components/library/college_department_result";
import college_avg_compare from "@/components/library/college_avg_compare";
import college_borrow_drill from "@/components/library/college_borrow_drill";

export default {
  components: {
    college_department_result,
    college_avg_compare,
    college_borrow_drill
  },
  data() {
    return {
      echartdata: [],
      data: [
        {
          value: "电视学院",
          label: "电视学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "新闻学院",
          label: "新闻学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "戏剧影视学院",
          label: "戏剧影视学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "播音主持艺术学院",
          label: "播音主持艺术学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "动画与数字艺术学院",
          label: "动画与数字艺术学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "音乐与录音艺术学院",
          label: "音乐与录音艺术学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "信息与通信工程学院",
          label: "信息与通信工程学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "计算机与网络空间安全学院",
          label: "计算机与网络空间安全学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "数据科学与智能媒体学院",
          label: "数据科学与智能媒体学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "人文学院",
          label: "人文学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "政法学院",
          label: "政法学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "外国语言文化学院",
          label: "外国语言文化学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "经济与管理学院",
          label: "经济与管理学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "广告学院",
          label: "广告学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "文化产业管理学院",
          label: "文化产业管理学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        },
        {
          value: "国际传媒教育学院",
          label: "国际传媒教育学院",
          children: [
            {
              value: "2016",
              label: "2016级"
            },
            {
              value: "2017",
              label: "2017级"
            },
            {
              value: "2018",
              label: "2018级"
            },
            {
              value: "2019",
              label: "2019级"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.init();
    //窗口自适应
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart1 = this.$echarts.init(document.getElementById("hotbookcollege"));
      let chart = this.$echarts.init(document.getElementById("collegedrill"));
      let mychart2 = this.$echarts.init(document.getElementById("avgcom"));
      mychart2.resize();
      chart.resize();
      mychart1.resize();
    };
  },
  methods: {
    changeData(value, selectedData) {
      let xy = value[0];
      let nj = value[1];
      console.log(xy);

      let mychart1 = this.$echarts.init(document.getElementById("hotbookcollege"));
      /* const that = this
		    window.onresize = () => {//  根据窗口大小调整曲线大小
		    let mychart1 = this.$echarts.init(document.getElementById('hotbookcollege'));
		     mychart1.resize();
		    } */
      api.gethotbook_college(xy, nj).then(res => {
        for (let i = 0; i < res["图书名称"].length; i++) {
          let obj = new Object();
          obj.name = res["图书名称"][i];
          obj.value = res["图书总数"][i];
          this.echartdata[i] = obj;
        }
        console.log(this.echartdata);
        this.aa();
      });
    },
    init() {},
    aa() {
      let mychart1 = this.$echarts.init(document.getElementById("hotbookcollege"));
      let chart = this.$echarts.init(document.getElementById("collegedrill"));
      let mychart2 = this.$echarts.init(document.getElementById("avgcom"));
      mychart2.resize();
      chart.resize();
      mychart1.resize();

      mychart1.setOption({
        show: true,
        colors:[
          '#60acfc',
          '#32d3eb',
          '#a79feb',
          '#d4ec59',
          '#c37cca',
          '#9cdc82',
          '#ffdb5c',
          '#fb6e6c',
          '#fca8a6',
          '#abafed',
          '#9fe6b8',
          '#ff9f7f',
          '#fb7293',
          '#747be1',
          '#e7bcf3',
        ],
        title: {
          text: "",
          subtext: "",
          x: "center"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        backgroundColor: "#fff",
        tooltip: {
          show: false
        },
        series: [
          {
            type: "wordCloud",
            gridSize: 1,
            sizeRange: [2, 25],
            rotationRange: [-45, 0, 45, 90],

            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                  );
                }
              }
            },
            left: "center",
            top: "center",

            right: null,
            bottom: null,

            data: this.echartdata
          }
        ]
      });
    }
  }
};
</script>


<style>
.main-page {
  -ms-flex: 80%; /* IE10 */
  flex: 80%;
  padding: 20px;
  height: 1080px;
}
.bread {
  margin: "24px 0";
  position: relative;
  left: 40px;
  top: -33px;
}
</style>