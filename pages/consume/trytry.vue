<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/consumeindex">消费行为</BreadcrumbItem>
        <BreadcrumbItem to="/consume_total">总体情况</BreadcrumbItem>
      </Breadcrumb>
    <Content :style="{padding: '0 50px'}">

      <div class="main">
            <Card :bordered="false" style="width:32%;height:400px;float:left" >
              <p slot="title">全校群体消费情况</p>
                <div style="width:100%">
                    <Timeline>
                     <TimelineItem color="green" ><font size="2">全校学生账户总数量为</font><span class="number" ><countTo :startVal='startVal' :endVal='totalStudents' :duration='duration'></countTo></span><font size="2">人</font></TimelineItem>
                      <TimelineItem color="green"><font size="2">一卡通交易总次数为</font><span style="color:rgb(62, 203, 176);font-size:22px"><countTo :startVal='startVal' :endVal='totalTimes' :duration='duration'></countTo></span><font size="2">次</font></TimelineItem>
                      <TimelineItem color="red"><font size="2">一卡通交易总金额为</font><span style="color:rgb(203, 62, 185);font-size:22px"><countTo :startVal='startVal' :endVal='totalMoney' :duration='duration'></countTo></span><font size="2">元</font></TimelineItem>
                      <TimelineItem color="red"><font size="2">全校热门消费餐厅为</font><span style="color:rgb(173, 203, 62);font-size:22px">{{hotHall}}</span></TimelineItem>
                      <TimelineItem color="blue"><font size="2">全校热门消费窗口为</font><span style="color:rgb(203, 126, 62);font-size:22px">{{hotWindow}}</span></TimelineItem>
                      <TimelineItem color="blue"><font size="2">全校消费最高学院为</font><span style="color:rgb(0, 255, 0);font-size:22px">{{highAcademy}}</span></TimelineItem>
                    </Timeline>
                </div>
            </Card>
            <Card style=" width:33%; height:400px;float:left; margin-left:1%;">
              <p slot="title">全校各个食堂消费情况</p>
              <div style="width:100%;height:500px;float:left" id="myBubbleEcharts"></div>
            </Card>
            <Card style=" width:33%; height:400px;float:left; margin-left:1%;"> 
              <p slot="title">群体消费</p> 
              <div style="width:100%;height:320px;float:left" id="myNestEcharts"></div>
            </Card>
            <Card :bordered="false" style="width:49%;height:410px;float:left;margin:0 auto;margin-top:50px;">
              <p slot="title">全校各个餐厅及其窗口的营业次数下钻图</p>
              <div style="width:100%;height:340px;float:left" id="mydrilldownEcharts"></div>
          </Card>
          <Card :bordered="false" style="width:49%;height:410px;float:right;margin:0 auto;margin-top:50px;">
            <p slot="title">全校各个餐厅消费次数雷达图</p>
             <div style="width:100%;height:340px;float:left" id="myTimesRadarEcharts"></div>
          </Card>
            <Card :bordered="false" style="width:100%;height:510px;float:left;margin-top:90px;margin:30px auto">
             <div style="width:100%;height:480px;float:left" id="myLineEcharts"></div>
            </Card>
            
        </div>
    </Content>
  </Layout>
  </div>
</template>


<script>
  import echarts from 'echarts';
  import axios from 'axios';
  import highcharts from 'highcharts';
  import VueHighCharts from 'vue-highcharts';
  import highcharts3d from 'highcharts/highcharts-3d'
  import highchartsMore from 'highcharts/highcharts-more';
  import drilldown from 'highcharts-drilldown';
  import macarons from 'echarts/theme/macarons';
  import countTo from 'vue-count-to';
  // drilldown(highcharts);
  if (!highcharts.Chart.prototype.addSeriesAsDrilldown) {
      drilldown(highcharts);
  }
  highchartsMore(highcharts);
  highcharts3d(highcharts);
export default {
  name: 'student2',
  props: {
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "1000px"
    },
    margin: {
      type: String,
      default: "20px"
    },
    myBubbleEcharts: {
      type: String
    },
  },
  data() {
    return {
      northNum: 0,
      southNum: 0,
      qingzhenNum: 0,
      zhonglanNum: 0,
      bangzijingNum: 0,
      yixiangyuanNum: 0,
      shopping : 0,
      eating : 0,
      life : 0,
      bangzijingEating: 0,
      beiyuanEating: 0,
      nanyuanEating: 0,
      qingzhenEating: 0,
      yixiangyuanEating: 0,
      zhonglanEating: 0,
      maxType : 0,
      eachWindowName: [],
      chart: null,
      eatingHall: [],
      option: [],
      monthlLife: [],
      monthShopping: [],
      monthEating: [],
      monthTotal: [],
      enrollmentShopping: [],
      enrollmentEating: [],
      enrollmentLife: [],
      enrollmentMonth:{},
      data: [],
      gradeMonth: {},
      typeAcademy: {},
      hallWindowTimes: {},
      hallName: [],
      series: [],
      hotHall: '',
      highAcademy: '',
      hotWindow: '',
      totalMoney: 0,
      totalTimes: 0,
      totalStudents: 0,
      split1: 0.5,
      // 需要滚动的时间
      duration: 2000,
      // 初始值
      startVal: 0,
    };
  },
  components: {

  },
  methods: {
    // 从数据库获取总体统计数据
    getTotalData() {
      const path ='http://192.168.1.43:8001/student/consume/group_consumption/total_data';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data['hallName']);
        console.log(res.data['totalData']);
        // 对获取到的全校消费信息进行统计
        this.hotHall = res.data['hallName'];
        this.highAcademy = res.data['totalData']['high_academy'];
        this.hotWindow = res.data['totalData']['hot_window'];
        this.totalMoney = res.data['totalData']['totalMoney'];
        this.totalTimes = res.data['totalData']['totalTimes'];
        this.totalStudents = res.data['totalData']['total_students'];

      }).catch((error) => {
        console.error(error);
      });
    },
    getTimesArray() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/hallTimes';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data['times_array']);
        this.timesArray = res.data['times_array'];
        this.initRadarChart(this.timesArray);
      }).catch((error) => {
        console.error(error);
      });
    },
    getHallWindowDrill() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/hallWindowDrill';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data['hall_window_times']);
        this.hallWindowDrill = res.data['hall_window_times'];
        this.initDrilldownBar(this.hallWindowDrill);
      }).catch((error) => {
        console.error(error);
      });
    },
    // 各个餐厅的消费次数
    getConsumptionList() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/mealTimes';
      axios({
        url: path,
        method: 'get'
      })
        .then((res) => {
          // console.log(res.data);
          this.bindData = res.data;
          console.log(res.data.meal_times);
          // 餐厅就餐次数统计
          this.northNum = res.data.meal_times.north_num;
          this.southNum = res.data.meal_times.south_num;
          this.bangzijingNum = res.data.meal_times.bangzijing_num;
          this.zhonglanNum = res.data.meal_times.zhonglan_num;
          this.yixiangyuanNum = res.data.meal_times.yixiangyuan_num;
          this.qingzhenNum = res.data.meal_times.qingzhen_num;
          console.log(this.northNum);
          // 获取包括经纬度信息的餐厅就餐次数的数据情况
          // 每个餐厅的经纬度信息和学生的就餐次数
          this.eatingHall = res.data.eatingHall;
          // 调用可视化函数
          //this.initPieChart();
          //this.initBarChart();
          //this.initHeatChart(this.eatingHall);
          //this.initScatterChart(this.eatingHall);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    // 每个窗口的消费次数
    getWindowNum() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/windowTimes';
      axios({
        url:path,
        method: 'get'
      }).then((res) => {
        console.log(res.data);
        // 由于词云图中所需要的数据格式为数组，所以需要把传递过来的字典类型的数据转化为数组
        for(var i in res.data.eachWindow){
          this.eachWindowName.push({
            name: i.toString(),
            value: res.data.eachWindow[i]
          })
        }
        //this.initCloudChart();
      }).catch((error) => {
        console.log(error);
      });
    },
    // 各种类型的消费金额
    getConsumeType() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/consumeType';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data);
        // 各个类型消费金额统计
        this.shopping = res.data.money.shopping;
        this.eating = res.data.money.eating;
        this.life = res.data.money.life;
        //this.initTypeChart();
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取各类型的消费金额以及各个类型下的消费数据
    getTypeEatingMoney() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/typeEatingMoney';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data);
        // 各个类型消费金额统计
        this.shopping = res.data.money.shopping;
        this.eating = res.data.money.eating;
        this.life = res.data.money.life;
        // 各个餐厅消费金额统计
        this.bangzijingEating = res.data.eatingMoney.bangzijing_eating;
        this.beiyuanEating = res.data.eatingMoney.beiyuan_eating;
        this.nanyuanEating = res.data.eatingMoney.nanyuan_eating;
        this.qingzhenEating = res.data.eatingMoney.qingzhen_eating;
        this.yixiangyuanEating = res.data.eatingMoney.yixiangyuan_eating;
        this.zhonglanEating = res.data.eatingMoney.zhonglan_eating;
        this.initNestChart();
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取不同性别下每个月的各类消费金额
    getGenderMoney() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/genderClassify';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data);
        console.log(res.data.girlResult);
        var girl = res.data.girlResult;
        var boy = res.data.boyResult;
        console.log(girl['生活']);
        // 女生消费情况
        this.monthLifeGirl = res.data.girlResult['生活'];
        this.monthShoppingGirl = res.data.girlResult['购物'];
        this.monthEatingGirl = res.data.girlResult['餐饮'];
        this.monthTotalGirl = res.data.girlResult['总额'];
        // 男生消费情况
        this.monthLifeBoy = res.data.boyResult['生活'];
        this.monthShoppingBoy = res.data.boyResult['购物'];
        this.monthEatingBoy = res.data.boyResult['餐饮'];
        this.monthTotalBoy = res.data.boyResult['总额'];
        //this.initMixtureChart(this.monthTotalBoy,this.monthLifeBoy,this.monthShoppingBoy,this.monthEatingBoy,this.monthTotalGirl,this.monthLifeGirl,this.monthShoppingGirl,this.monthEatingGirl);
        
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取各个年级下的不同类型的消费金额
    getEnrollment() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/enrollmentClassify';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data);

        console.log(res.data.enrollment_type['餐饮']);
        this.enrollmentEating = res.data.enrollment_type["餐饮"];
        this.enrollmentShpping = res.data.enrollment_type["购物"];
        this.enrollmentLife = res.data.enrollment_type["生活"];
        //this.initPolarBarChart(this.enrollmentEating,this.enrollmentShpping,this.enrollmentLife);
        //this.initPolarBar2Chart(this.enrollmentEating,this.enrollmentShpping,this.enrollmentLife);
        // 获取每个年级的每月消费数据
        this.enrollmentMonth = res.data.enrollment_month;
        console.log(this.enrollmentMonth);
        //this.initMonthRadarChart(this.enrollmentMonth);
        
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取每个年级下的不同月份的消费金额
    getEnrollmentMonth() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/enrollmentMonthConsume';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log("0000");
        console.log(res.data);
        // 四个年级下的数组
        this.gradeMonth = res.data.grade_month;
        //this.initMonthLineChart(this.gradeMonth);
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取每个学院下的群体不同类型的消费金额
    getAcademyType() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/academyType';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data);
        // 获取学院列表、每个学院的不同类型的消费金额
        this.typeAcademy = res.data.academy_type;
        console.log(this.typeAcademy);
        //this.initZoomChart(this.typeAcademy);
        this.initBubbleChart();
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取每个餐厅以及各个餐厅下的所有窗口的消费次数的情况
    getHallWindowTimes() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/hall_window_times';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data);
        this.hallWindowTimes = res.data.hall_window_times;
        console.log(this.hallWindowTimes);
        for(var i in this.hallWindowTimes){
          console.log(this.hallWindowTimes[i]['data']);
          this.series.push({"name":i,'data':this.hallWindowTimes[i]['data']})
        }
        console.log(this.series);
        this.initBubbleChart();
        
      }).catch((error) => {
        console.error(error);
      });
    },
    getAcademyGender() {
      const path = 'http://192.168.1.43:8001/student/consume/group_consumption/academyGender';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data);
        this.academyGenderData = res.data['academy_gender'];
        console.log(this.academyGenderData);
        this.initLineChart(this.academyGenderData);
      }).catch((error) => {
        console.error(error);
      });
    },
    initLineChart(index) {
      let chart = echarts.init(document.getElementById("myLineEcharts"));
      let rotation = 0;
      chart.setOption({
        title: {
          text: '全校各个学院消费情况',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['总额', '男生', '女生']
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: index['academy_list'],
            axisLabel: {
              interval: 0,
              rotate: -30
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} 万元'
            }
        },
        
        series: [
            {
                name:'总额',
                type:'line',
                smooth: true,
                data:index['Result']['总额'],
                color:'#55bb8a'
            },
            {
                name:'男生',
                type:'line',
                smooth: true,
                data:index['boyResult']['总额'],
                color:'#058DC7'
            },
            {
                name:'女生',
                type:'line',
                smooth: true,
                data:index['girlResult']['总额'],
                color:'#FF93A2'
            },
            // {
            //     name:'购物',
            //     type:'line',
            //     smooth: true,
            //     data:index['Result']['购物'],
            // }
        ],
      });
      window.addEventListener("resize",function(){
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ;
    },
    initNestChart() {
      let chart = echarts.init(document.getElementById("myNestEcharts"));
      chart.setOption({
        backgroundColor: "#ffffff",
        /* title: {
          text: "群体消费",
          left: "center",
          top: 20,
        }, */
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}:{c}({d}%)"
        },
        //color:["#ADE1DF","#FFDB5C","#FF93A2","#67E0E3","#7AC1F6","#71B1CC","#FFAFAF","#DFE488"],
        color:["#ADE1DF","#FFDB5C","#FF9F7F","#67E0E3","#afe39b","#BDB7F0","#FFAFAF","#DFE488"],
        legend: {
          top:260,
          left:4,
          orient: "horizontal",
          data: ["生活消费", "就餐消费", "购物消费", "北苑餐厅", "南苑餐厅","溢香苑餐厅","梆子井餐厅", "中蓝餐厅", "清真餐厅"]
        },
        series: [
        {
          name: "消费类型",
          type: "pie",
          selectedMode: "single",
          radius: [0,"30%"],
          label: {
            normal: {
              position: "inner"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: this.life, name: "生活消费", selected: true},
            { value: this.shopping, name: "购物消费"},
            { value: this.eating, name: "就餐消费"}
          ]
        },
        {
          name: "",
          type: "pie",
          radius: ["40%", "55%"],
          /* label: {
            normal: {
              formatter: "{a|{a}}{abg|}\n {b|{b}: }{c}",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth:1,
              boerderRadius: 4,
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize:16,
                  lineHeight: 33
                },
              }
            }
          }, */
          data:[
            { value: this.life, name: "生活消费"},
            { value: this.shopping, name: "购物消费"},
            { value: this.beiyuanEating, name: "北苑餐厅" },
            { value: this.nanyuanEating, name: "南苑餐厅" },
            { value: this.bangzijingEating, name: "梆子井餐厅" },
            { value: this.zhonglanEating, name: "中蓝餐厅" },
            { value: this.qingzhenEating, name: "清真餐厅" },
            { value: this.yixiangyuanEating, name: "溢香苑餐厅"}
          ]
        }]
      })
      window.addEventListener("resize",function(){
            chart.resize();
        }) ;
    },
    //气泡图
    initBubbleChart() {
      let chart = highcharts.chart('myBubbleEcharts', {
      chart: {
          type: 'packedbubble',
          height: '70%'
      },
      title: {
        text: '全校各个食堂消费情况',
        color:'red'
      },
      //colors:["#74cbe7","#FFDB5C","#FF9F7F","#67E0E3",],
      colors: ['#ED561B', '#FF9655', '#80699B','#4572A7', '#AA4643', '#009394', ],
      tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.y}次'
      },
      credits:{
        enabled:false
      },
      plotOptions: {
        packedbubble: {
            minSize: '10%',
            maxSize: '40%',
            zMin: 0,
            zMax:600,
            layoutAlgorithm: {
                gravitationalConstant: 0.05,
                splitSeries: true,
                seriesInteraction: true,
                dragBetweenSeries: false,
                parentNodeLimit: true 
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
      },
     series: this.series
      });
      /* window.addEventListener("resize",function(){
            let chart = highcharts.init(document.getElementById("myBubbleEcharts"))
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ; */
    },
    //雷达图
    initRadarChart(index) {
      let chart = echarts.init(document.getElementById("myTimesRadarEcharts"),'macarons');
      chart.setOption({
        title: {
          text: ""
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 0,
          data: ['全校消费次数', '男生消费次数', '女生消费次数']
          // 餐厅的顺序必须与从数据库中读出的数据顺序保持一致
          // ["北苑餐厅", "南苑餐厅", "清真餐厅", "中蓝餐厅", "溢香苑餐厅", "梆子井餐厅"]
        },
        radar: [
          {
            indicator: 
            [
              {text: '北苑餐厅', max: 1000000},
              {text: '南苑餐厅', max: 1000000},
              {text: '清真餐厅', max: 1000000},
              {text: '中蓝餐厅', max: 1000000},
              {text: '溢香苑餐厅', max: 1000000},
              {text: '梆子井餐厅', max: 1000000},
            ],
            center: ['25%', '50%'],
            radius: 100
          },
          {
            indicator: 
            [
              {text: '北苑餐厅', max: 500000},
              {text: '南苑餐厅', max: 500000},
              {text: '清真餐厅', max: 500000},
              {text: '中蓝餐厅', max: 500000},
              {text: '溢香苑餐厅', max: 500000},
              {text: '梆子井餐厅', max: 500000},
            ],
            center: ['70%', '28%'],
            radius: 40
          },
          {
            indicator: 
            [
              {text: '北苑餐厅', max: 500000},
              {text: '南苑餐厅', max: 500000},
              {text: '清真餐厅', max: 500000},
              {text: '中蓝餐厅', max: 500000},
              {text: '溢香苑餐厅', max: 500000},
              {text: '梆子井餐厅', max: 500000},
            ],
            center: ['70%', '75%'],
            radius: 40
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                }
              }
            },
            data: [
              {
                value: index['all_canteen_num'],
                name: '全校消费次数',
                label: {
                  normal: {
                      show: true,
                      formatter:function(params) {
                          return params.value+ '次';
                      }
                  }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.5,
                    }
                }
              }
            ]
          },
          {
            type: 'radar',
            radarIndex: 1,
            tooltip: {
              trigger: 'item'
            },
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                }
              }
            },
            data: [
              {
                value: index['boy_canteen_num'],
                name: '男生消费次数',
                // label: {
                //   normal: {
                //       show: true,
                //       formatter:function(params) {
                //           return params.value+ '次';
                //       }
                //   }
                // },
                areaStyle: {
                    normal: {
                        opacity: 0.5,
                    }
                }
              }
            ]
          },
          {
            type: 'radar',
            radarIndex: 2,
            tooltip: {
              trigger: 'item'
            },
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                }
              }
            },
            data: [
              {
                value: index['girl_canteen_num'],
                name: '女生消费次数',
                areaStyle: {
                    normal: {
                        opacity: 0.5,
                    }
                }
              }
            ]
          }
        ]
      });
      window.addEventListener("resize",function(){

            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ;
    },
    //下钻图
    initDrilldownBar(index) {
      console.log(index['北苑']['data']);
      let chart = highcharts.chart('mydrilldownEcharts', {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        }, 
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: '营业次数'
          }
        },
        legend: {
          enabled: false
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },
        credits:{
        enabled:false
      },
        series: [{
          name: '餐厅营业情况',
          colorByPoint: true,
          data: [{
            name: '北苑餐厅',
            y: index['北苑']['总频数'],
            drilldown: '北苑餐厅',
            color: '#C0E9EB'
          }, {
            name: '南苑餐厅',
            y: index['南苑']['总频数'],
            drilldown: '南苑餐厅',
            color: '#71B1CC'
          }, {
            name: '清真餐厅',
            y: index['清真']['总频数'],
            drilldown: '清真餐厅',
            color: '#DF6AA1'
          }, {
            name: '中蓝餐厅',
            y:index['中蓝']['总频数'],
            drilldown: '中蓝餐厅',
            color: '#FF93A2'
          }, {
            name: '梆子井餐厅',
            y: index['梆子井']['总频数'],
            drilldown: '梆子井餐厅',
            color: '#7AC1F6'
          }, {
            name: '溢香苑餐厅',
            y: index['溢香苑']['总频数'],
            drilldown: '溢香苑餐厅',
            color: '#cbc5ea'
          }]
        }],
        drilldown: {
          series: [{
            name: '北苑餐厅',
            id: '北苑餐厅',
            data: index['北苑']['data']
          }, {
            name: '南苑餐厅',
            id: '南苑餐厅',
            data: index['南苑']['data']
          }, {
            name: '清真餐厅',
            id: '清真餐厅',
            data: index['清真']['data']
          }, {
            name: '中蓝餐厅',
            id: '中蓝餐厅',
            data: index['中蓝']['data']
          }, {
            name: '梆子井餐厅',
            id: '梆子井餐厅',
            data: index['梆子井']['data']
          }, {
            name: '溢香苑餐厅',
            id: '溢香苑餐厅',
            data: index['溢香苑']['data']
          }]
        }
      })
      window.addEventListener("resize",function(){
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        }) ;
    },
  },
  created() {
    this.getTotalData();
    this.getConsumptionList();
    this.getWindowNum();
    this.getConsumeType();
    this.getTypeEatingMoney();
    this.getGenderMoney();
    this.getEnrollment();
    this.getEnrollmentMonth();
    this.getAcademyType();
    this.getHallWindowTimes();
    this.getAcademyGender();
    this.getTimesArray();
    this.getHallWindowDrill();
  },
};
</script>


<style>
.main {
    -ms-flex: 80%; /* IE10 */
    flex: 80%;   
    padding: 20px;
    height:1080px;
}
.bread{
margin: '24px 0';
position:relative;
left:40px;
top:-33px;
}
.demo-split{
        height: 335px;
        border: 1px solid #dcdee2;
    }
.demo-split-pane{
        padding: 10px;
    }
</style>