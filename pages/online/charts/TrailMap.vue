<template>
  <div>
    <div id="trailmap" style="width: 1600px;height:950px;"></div>
  </div>
</template>
<script>
import online_api from "@/api/online_api";
import { mapGetters } from "vuex";
export default {
  name: "TrailMap",
  data() {
    return {
      name: "",
      accountnum: "",
      buildingcoord: {},
      //tdata:{},
      trails: [],
      scatterinfo: [],
      linedata: [],
      option: {}
    };
  },
  mounted() {
    online_api.getbuildingcoord().then(res => {
      this.buildingcoord = res.data;
    });
    this.init();
  },
  computed: {
    ...mapGetters(["studentid"])
  },
  methods: {
    converttrails(data) {
      let res = [];
      for (let i = 0; i < this.trails.length - 1; i++) {
        let fromcoord = this.buildingcoord[data[i]["地点"]];
        let tocoord = this.buildingcoord[data[i + 1]["地点"]];
        res.push([{ coord: fromcoord }, { coord: tocoord }]);
      }
      return res;
    },
    init() {
      let chart = this.$echarts.init(document.getElementById("trailmap"));
      online_api.getsturoute(this.studentid).then(res => {
        this.name = res.data["姓名"];
        this.accountnum = res.data["学号"];
        this.trails = res.data["data"];
        for (let j = 0; j < this.trails.length; j++) {
          this.scatterinfo[j] = {
            name: this.trails[j]["地点"],
            value: this.buildingcoord[this.trails[j]["地点"]].concat(100)
          };
        }
        this.linedata = this.converttrails(this.trails);
        console.log(this.name);
        const slength = this.scatterinfo.length;
        const trails = this.trails;
        this.option = {
          title: {
            text: "学生轨迹展示",
            subtext: this.accountnum + " " + this.name,
            x: "center"
          },
          bmap: {
            center: [116.564383, 39.91856],
            zoom: 18,
            roam: false
          },
          tooltip: {},
          series: [
            {
              name: "路线",
              type: "lines",
              coordinateSystem: "bmap",
              data: this.linedata,
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: "arrow",
                symbolSize: 12
              },
              tooltip: {
                show: false
              },
              lineStyle: {
                normal: {
                  color: new this.$Echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#EEB4B4" // 出发
                      },
                      {
                        offset: 1,
                        color: "#CD5555" // 结束 颜色
                      }
                    ],
                    false
                  ),
                  width: 3,
                  opacity: 0.8,
                  curveness: 0.2
                }
              }
            },
            {
              // 目的地信息
              name: "地点",
              type: "effectScatter",
              coordinateSystem: "bmap",
              zlevel: 2,
              rippleEffect: {
                brushType: "stroke"
              },
              tooltip: {
                show: true,
                trigger: "item",
                formatter: function(a) {
                  //console.log(trails[a.dataIndex]["时间"])
                  return trails[a.dataIndex]["时间"];
                }
              },
              label: {
                normal: {
                  show: false,
                  position: "right",
                  formatter: "{b}"
                }
              },
              symbolSize: 16,
              itemStyle: {
                normal: {
                  color: function(a) {
                    if (a.dataIndex == 0) {
                      return "#CD9B9B";
                    } else if (a.dataIndex == slength - 1) {
                      return "#8B6969";
                    } else {
                      return "#CD5555";
                    }
                  }
                }
              },
              data: this.scatterinfo
            }
          ]
        }
        chart.setOption(this.option)
      });
    }
  }
};
</script>