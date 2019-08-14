<template>
  <div>
    <Cascader
     :data="data" 
     id="xynjkc" 
     trigger="hover" 
     style="width: 350px"
     @on-change="changeData"></Cascader>
    <div id="tsc" style="width:100%;height:400px"></div>
  </div>
</template>

<script>
import api from "../../api/study_api"
import echarts from "echarts"

export default {
  data() {
    return {
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
      ],
      color:[
            '#7fbcfc',
          ],//设置图表颜色
    };
  },
  
  mounted() {
    this.init();
    const that = this;
    window.onresize = () => {
      //  根据窗口大小调整曲线大小
      let mychart1 = this.$echarts.init(document.getElementById("tsc"));
      mychart1.resize();
    };
  },
  methods: {
    init() {
      this.changeData(["电视学院", 16, "思想道德修养与法律基础"]);
    },
    changeData(value, selectedData) {
      let mychart1 = this.$echarts.init(document.getElementById("tsc"));
  
      let nj = value[1];
      let course = value[2];
      let col = value[0];
      api.gettongshicol_elective(nj, course, col).then(res => {
        
        mychart1.setOption({
          title: {
            text: "学院专业通识课成绩统计"
          },
          color:this.color,
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["学院"]
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: res.专业,
              axisLabel: {
                interval: 0, //横轴信息全部显示
                rotate: -15 //-15度角倾斜显示
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              
              name: "成绩",
              type: "bar",
              data: res.分数,
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              },
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            }
          ]
        });
        mychart1.resize();
      });
    }
  }
};
</script>