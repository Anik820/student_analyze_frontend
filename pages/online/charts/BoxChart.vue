<template>
  <div id="boxchart" style="width: 1200px;height:750px;"></div>
</template>
<script>
import online_api from "@/api/online_api";
import { mapGetters } from "vuex";
export default {
  name: "BoxChart",
  data() {
    return {
      name: "",
      accountnum: "",
      records: [],
      totaltime: [],
      topp: [],
      mid: 0,
      series: [],
      option: {}
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters(["studentid"])
  },
  methods: {
    init() {
      online_api.getstuonlinetime(this.studentid).then(res => {
        this.name = res["姓名"];
        this.accountnum = res["学号"];
        this.records = res["data"];
        for (let i = 0; i < this.records.length; i++) {
          this.totaltime.push(this.records[i]["总时间"]);
          this.topp[i] = 0;
        }
        for (let j = 0; j < res["max"]; j++) {
          let support = [];
          let cdata = [];
          for (let k = 0; k < this.records.length; k++) {
            if (j >= this.records[k]["record"].length) {
              support[k] = 0;
              cdata[k] = 0;
            } else {
              support.push(
                this.records[k]["record"][j]["开始时间"] - this.topp[k]
              );
              this.mid = this.records[k]["record"][j]["持续时间"] / 60;
              this.topp[k] =
                this.records[k]["record"][j]["开始时间"] + this.mid;
              cdata.push(this.mid.toFixed(2));
            }
          }
          this.series.push({
            name: "辅助" + j.toString(),
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)"
              },
              emphasis: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)"
              }
            },
            data: support
          });
          this.series.push({
            name: "记录" + j.toString(),
            type: "bar",
            stack: "总量",
            data: cdata
          });
        }
        let memo = [
          "8:00 上午上课",
          "12:00 上午下课",
          "13:30 下午上课",
          "17:00 下午下课"
        ];
        this.series[1]["markLine"] = {
          symbol: ["none", "none"],
          lineStyle: {
            color: "#CD6600",
          },
          animation: false,
          label: {
            show: true,
            position: "start",
            formatter: function(a) {
              return a.name;
            }
          },
          tooltip: {
            show: true,
            trigger: "item",
            formatter: function(a) {
              return memo[a.dataIndex];
            }
          },
          data: [
            { name: "上课", yAxis: 8 },
            { name: "下课", yAxis: 12 },
            { name: "上课", yAxis: 13.5 },
            { name: "下课", yAxis: 17 }
          ]
        };
        this.option = {
          title: {
            text: this.name,
            subtext: this.accountnum,
            x: "center"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: params => {
              return (
                params[1].name +
                "：" +
                this.totaltime[params[1].dataIndex] +
                "分钟"
              );
            }
          },
          color: ["#9BCD9B", "#A2CD5A", "#556B2F"], //#C1FFC1 #B4EEB4  #9AFF9A  #9BCD9B #7CCD7C  #A2CD5A  #838B83  #698B69   #698B22  #556B2F
          dataZoom: [
            {
              type: "slider",
              show: true,
              showDetail: false,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: "inside",
              realtime: true,
              start: 0,
              end: 100
            }
          ],
          /*
                    legend: {
                        data:['支出','收入']
                    },
                    */
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              axisLabel: { interval: 0 },
              data: [
                "2019-1-07",
                "2019-1-08",
                "2019-1-09",
                "2019-1-10",
                "2019-1-11",
                "2019-1-12",
                "2019-1-13",
                "2019-1-14",
                "2019-1-15",
                "2019-1-16",
                "2019-1-17",
                "2019-1-18",
                "2019-1-19",
                "2019-1-20",
                "2019-1-21",
                "2019-1-22",
                "2019-1-23",
                "2019-1-24",
                "2019-1-25",
                "2019-1-26",
                "2019-1-27",
                "2019-1-28",
                "2019-1-29",
                "2019-1-30",
                "2019-1-31",
                "2019-2-01",
                "2019-2-02",
                "2019-2-03",
                "2019-2-04",
                "2019-2-05",
                "2019-2-06",
                "2019-2-07",
                "2019-2-08",
                "2019-2-09",
                "2019-2-10",
                "2019-2-11",
                "2019-2-12",
                "2019-2-13",
                "2019-2-14",
                "2019-2-15",
                "2019-2-16",
                "2019-2-17",
                "2019-2-18",
                "2019-2-19",
                "2019-2-20",
                "2019-2-21",
                "2019-2-22",
                "2019-2-23",
                "2019-2-24",
                "2019-2-25",
                "2019-2-26",
                "2019-2-27",
                "2019-2-28",
                "2019-2-29",
                "2019-3-01",
                "2019-3-02",
                "2019-3-03",
                "2019-3-04",
                "2019-3-05",
                "2019-3-06",
                "2019-3-07",
                "2019-3-08",
                "2019-3-09",
              ]
            }
          ],
          yAxis: {
            type: "value",
            name: "时间",
            max: 24,
            maxInterval: 3
          },
          series: this.series
        };
        console.log(this.option);
        let chart = this.$echarts.init(document.getElementById("boxchart"));
        chart.setOption(this.option);
      });

      //console.log(this.totaltime)
    }
  }
};
</script>