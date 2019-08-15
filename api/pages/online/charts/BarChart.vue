<template>
  <div id="barchart" style="width: 1600px;height:950px;"></div>
</template>
<script>
import online_api from "@/api/online_api";
import {mapGetters} from 'vuex'
export default {
  name: "BarChart",
  data() {
    return {
      miny: 0,
      plist: [],
      weeklist: [],
      currenttime: 0,
      weekdata: [],
      weekwebdata: [],
      option: {}
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters(['studentid'])
  },
  methods: {
    weekdataFormatter(data) {
      let weekdata = {};
      for (let week = 0; week < data.length; week++) {
        let kinddata = [];
        for (let kind = 0; kind < data[week]["类别"].length; kind++) {
          kinddata[kind] = {
            name: this.plist[kind],
            value: data[week]["类别"][kind]["频次"]
          };
          if (this.miny < data[week]["类别"][kind]["频次"]) {
            this.miny = data[week]["类别"][kind]["频次"];
          }
        }
        weekdata[this.weeklist[week]] = kinddata;
      }
      return weekdata;
    },
    websitedataFormatter(data) {
      let websitedata = {};
      for (let week = 0; week < data.length; week++) {
        let weekwebdata = {};
        for (let kind = 0; kind < data[week]["类别"].length; kind++) {
          let webdata = new Array();
          for (let website in data[week]["类别"][kind]["具体网站"]) {
            if (data[week]["类别"][kind]["具体网站"][website] != 0) {
              webdata.push({
                name: website,
                value: data[week]["类别"][kind]["具体网站"][website]
              });
            }
          }
          weekwebdata[this.plist[kind]] = webdata;
        }
        websitedata[this.weeklist[week]] = weekwebdata;
      }
      return websitedata;
    },
    init() {
      let chart = this.$echarts.init(document.getElementById("barchart"));
      this.plist = [
        "新闻",
        "视频",
        "论坛",
        "游戏",
        "搜索引擎",
        "网络邮件",
        "社交",
        "教育学习",
        "娱乐",
        "银行",
        "出行",
        "生活",
        "招聘",
        "购物消费",
        "体育",
        "音乐"
      ];
      this.weeklist = [
        "第1周",
        "第2周",
        "第3周",
        "第4周",
        "第5周",
        "第6周",
        "第7周",
        "第8周",
        "第9周",
        "第10周",
        "第11周",
        "第12周",
        "第13周",
        "第14周",
        "第15周",
        "第16周",
        "第17周",
        "第18周"
      ];
      online_api.getstuonlinesort(this.studentid).then(res => {
        this.weekdata = this.weekdataFormatter(res);
        this.weekwebdata = this.websitedataFormatter(res);
        this.option = {
          baseOption: {
            timeline: {
              // y: 0,
              axisType: "category",
              // realtime: false,
              // loop: false,
              autoPlay: true,
              // currentIndex: 2,
              playInterval: 1000,
              // controlStyle: {
              //     position: 'left'
              // },
              data: [
                "第1周",
                "第2周",
                "第3周",
                "第4周",
                "第5周",
                "第6周",
                "第7周",
                "第8周",
                "第9周",
                "第10周",
                "第11周",
                "第12周",
                "第13周",
                "第14周",
                "第15周",
                "第16周",
                {
                  value: "第17周",
                  tooltip: {
                    formatter: function(params) {
                      return params.name + "  考试周开始";
                    }
                  },
                  symbol: "diamond",
                  symbolSize: 18
                },
                "第18周"
              ],
              label: {
                formatter: function(s) {
                  return s;
                }
              }
            },
            title: {
              subtext: "个人上网记录"
            },
            tooltip: {},
            calculable: true,
            grid: {
              top: 80,
              bottom: 100,
              tooltip: {
                trigger: "item",
                axisPointer: {
                  type: "shadow",
                  label: {
                    show: true,
                    formatter: function(params) {
                      return params.value.replace("\n", "");
                    }
                  }
                }
              },
              pie: {
                x: "right",
                y: "top"
              }
            },
            xAxis: [
              {
                type: "category",
                axisLabel: { interval: 0 },
                data: [
                  "新闻",
                  "视频",
                  "论坛",
                  "游戏",
                  "搜索引擎",
                  "网络邮件",
                  "社交",
                  "教育学习",
                  "娱乐",
                  "银行",
                  "出行",
                  "生活",
                  "招聘",
                  "购物消费",
                  "体育",
                  "音乐"
                ],
                splitLine: { show: false }
              }
            ],
            yAxis: [
              {
                type: "value",
                name: "频次"
              }
            ],
            series: [
              {
                name: "频次",
                type: "bar",
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#749f83" // 出发
                    },
                    {
                      offset: 1,
                      color: "#91c7ae" // 结束 颜色
                    }
                  ],
                  false
                ),
                min: this.miny * 1.5,
                max: this.miny * 2
              },

              {
                name: "网站频次",
                type: "pie",
                radius: [20, 90],
                center: ["75%", "15%"],
                roseType: "area",
                z: 100,
                lableLine: {
                  normal: {
                    show: true,
                    length: 2,
                    length2: 4
                  },
                  emphasis: {
                    show: true,
                    length: 2,
                    length2: 4
                  }
                }
              }
            ]
          },
          options: [
            {
              title: { text: "第一周" },
              series: [
                { data: this.weekdata["第1周"] },
                { data: this.weekwebdata["第1周"]["新闻"] }
              ]
            },
            {
              title: { text: "第二周" },
              series: [
                { data: this.weekdata["第2周"] },
                { data: this.weekwebdata["第2周"]["新闻"] }
              ]
            },
            {
              title: { text: "第三周" },
              series: [
                { data: this.weekdata["第3周"] },
                { data: this.weekwebdata["第3周"]["新闻"] }
              ]
            },
            {
              title: { text: "第四周" },
              series: [
                { data: this.weekdata["第4周"] },
                { data: this.weekwebdata["第4周"]["新闻"] }
              ]
            },
            {
              title: { text: "第五周" },
              series: [
                { data: this.weekdata["第5周"] },
                { data: this.weekwebdata["第5周"]["新闻"] }
              ]
            },
            {
              title: { text: "第六周" },
              series: [
                { data: this.weekdata["第6周"] },
                { data: this.weekwebdata["第6周"]["新闻"] }
              ]
            },
            {
              title: { text: "第七周" },
              series: [
                { data: this.weekdata["第7周"] },
                { data: this.weekwebdata["第7周"]["新闻"] }
              ]
            },
            {
              title: { text: "第八周" },
              series: [
                { data: this.weekdata["第8周"] },
                { data: this.weekwebdata["第8周"]["新闻"] }
              ]
            },
            {
              title: { text: "第九周" },
              series: [
                { data: this.weekdata["第9周"] },
                { data: this.weekwebdata["第9周"]["新闻"] }
              ]
            },
            {
              title: { text: "第十周" },
              series: [
                { data: this.weekdata["第10周"] },
                { data: this.weekwebdata["第10周"]["新闻"] }
              ]
            },
            {
              title: { text: "第十一周" },
              series: [
                { data: this.weekdata["第11周"] },
                { data: this.weekwebdata["第11周"]["新闻"] }
              ]
            },
            {
              title: { text: "第十二周" },
              series: [
                { data: this.weekdata["第12周"] },
                { data: this.weekwebdata["第12周"]["新闻"] }
              ]
            },
            {
              title: { text: "第十三周" },
              series: [
                { data: this.weekdata["第13周"] },
                { data: this.weekwebdata["第13周"]["新闻"] }
              ]
            },
            {
              title: { text: "第十四周" },
              series: [
                { data: this.weekdata["第14周"] },
                { data: this.weekwebdata["第14周"]["新闻"] }
              ]
            },
            {
              title: { text: "第十五周" },
              series: [
                { data: this.weekdata["第15周"] },
                { data: this.weekwebdata["第15周"]["新闻"] }
              ]
            },
            {
              title: { text: "第十六周" },
              series: [
                { data: this.weekdata["第16周"] },
                { data: this.weekwebdata["第16周"]["新闻"] }
              ]
            },
            {
              title: { text: "第十七周" },
              series: [
                { data: this.weekdata["第17周"] },
                { data: this.weekwebdata["第17周"]["新闻"] }
              ]
            },
            {
              title: { text: "第十八周" },
              series: [
                { data: this.weekdata["第18周"] },
                { data: this.weekwebdata["第18周"]["新闻"] }
              ]
            }
          ]
        };
        chart.setOption(this.option);
        chart.on("mouseover", (a) => {
          if (a.componentSubType == "bar") {
            this.option.baseOption.timeline["currentIndex"] = this.currenttime;
            this.option.options[this.currenttime].series[1][
              "data"
            ] = this.weekwebdata[this.weeklist[this.currenttime]][a.name];
            chart.setOption(this.option, true);
          }
          chart.dispatchAction({
            type: "timelinePlayChange",
            playState: false
          });
        });
        chart.on("mouseout", (a) => {
          chart.dispatchAction({
            type: "timelinePlayChange",
            playState: true
          });
        });
        chart.on("timelinechanged", (index) => {
          this.currenttime = index.currentIndex;
        });
      });
    }
  }
};
</script>