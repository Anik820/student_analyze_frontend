<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/consumeindex">消费行为</BreadcrumbItem>
        <BreadcrumbItem to="/consume_group">学生群体消费情况</BreadcrumbItem>
        <BreadcrumbItem to="/consume_group_grade">年级消费分析</BreadcrumbItem>
      </Breadcrumb>
     <Content :style="{padding: '0 60px'}">
        
        <div class="main">
            <Card :bordered="false" style="width:36%;height:530px;float:left" >
                <div style="width:100%;height:500px;float:left" id="myPolarBar2Echarts"></div>  
            </Card>
            <Card :bordered="false" style="width:62%;height:530px;float:right">
              <div style="width:100%;height:500px;float:left" id="myRadarEcharts"></div>
            </Card>
            <Card :bordered="false" style="width:100%;height:700px;float:left;margin-top:30px;margin:30px auto">
             <div style="width:100%;height:670px;float:left" id="myEnrollmentLineEcharts"></div>
            </Card>
        </div>

      </Content>
  </Layout>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import axios from 'axios';
  import macarons from 'echarts/theme/macarons';
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
    };
  },
  components: {

  },
  methods: {
    // 各个餐厅的消费次数
    getConsumptionList() {
      const path = 'http://192.168.1.43:8001/group_consumption/mealTimes';
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
      const path = 'http://192.168.1.43:8001/group_consumption/windowTimes';
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
        this.initCloudChart();
      }).catch((error) => {
        console.log(error);
      });
    },
    // 各种类型的消费金额
    getConsumeType() {
      const path = 'http://192.168.1.43:8001/group_consumption/consumeType';
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
      const path = 'http://192.168.1.43:8001/group_consumption/typeEatingMoney';
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
        //```````this.initNestChart();
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取不同性别下每个月的各类消费金额
    getGenderMoney() {
      const path = 'http://192.168.1.43:8001/group_consumption/genderClassify';
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
      const path = 'http://192.168.1.43:8001/group_consumption/enrollmentClassify';
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
        this.initPolarBar2Chart(this.enrollmentEating,this.enrollmentShpping,this.enrollmentLife);
        // 获取每个年级的每月消费数据
        this.enrollmentMonth = res.data.enrollment_month;
        console.log(this.enrollmentMonth);
        this.initMonthRadarChart(this.enrollmentMonth);
        
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取每个年级下的不同月份的消费金额
    getEnrollmentMonth() {
      const path = 'http://192.168.1.43:8001/group_consumption/enrollmentMonthConsume';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log("0000");
        console.log(res.data);
        // 四个年级下的数组
        this.gradeMonth = res.data.grade_month;
        this.initMonthLineChart(this.gradeMonth);
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取每个学院下的群体不同类型的消费金额
    getAcademyType() {
      const path = 'http://192.168.1.43:8001/group_consumption/academyType';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data);
        // 获取学院列表、每个学院的不同类型的消费金额
        this.typeAcademy = res.data.academy_type;
        console.log(this.typeAcademy);
        //this.initZoomChart(this.typeAcademy);
        //this.initBubbleChart();
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取每个餐厅以及各个餐厅下的所有窗口的消费次数的情况
    getHallWindowTimes() {
      const path = 'http://192.168.1.43:8001/group_consumption/hall_window_times';
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
        //this.initBubbleChart();
        
      }).catch((error) => {
        console.error(error);
      });
    },
    // 堆叠柱状图
    initPolarBar2Chart(index1,index2,index3) {
      let chart = echarts.init(document.getElementById("myPolarBar2Echarts"));
      chart.setOption({
        title: {
            text: '各年级消费类型占比'
        },
        legend: {
          top: 10,
          show:true,
          data: ['餐饮', '购物', '生活']
        },
        angleAxis: {
          
        },
        tooltip:{
          show:true,
        },
        radiusAxis: {
          type: 'category',
          data: ['大四年级', '大三年级', '大二年级', '大一年级'],
          z: 10,
          axisLabel: {
              show: true
          }
        },
        polar: {
        },
        series: [{
          type: 'bar',
          data: index1,
          // data: [14965621.3, 14880762.78, 14643673.56, 14572517.67],
          coordinateSystem: 'polar',
          name: '餐饮',
          stack: 'a'
        },
        {
          type: 'bar',
          data: index2,
          // data: [323993.5, 325298.76, 315992.99, 319034.44],
          coordinateSystem: 'polar',
          name: '购物',
          stack: 'a'
        },
        {
          type: 'bar',
          data: index3,
          // data: [1146736.34,1138548.45, 1113376.55, 1100634.1],
          coordinateSystem: 'polar',
          name: '生活',
          stack: 'a'
        }
        ],
        
      });
      window.addEventListener("resize",function(){
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ;
    },
    // 每个年级在不同的月份下的消费金额的雷达图
    initMonthRadarChart(index) {
      let chart = echarts.init(document.getElementById("myRadarEcharts"));
      console.log(index['1月']);
      chart.setOption({
        title: {
            text: '各年级月消费雷达图'
        },
        tooltip: {
            // trigger: 'axis'
        },
        legend: {
            x: 'center',
            top: 20,
            data:['一月份','二月份','三月份','四月份']
        },
        radar: [
            {
                indicator: [
                    {text: '四年级',min:350},
                    {text: '三年级',min:350},
                    {text: '二年级',min:350},
                    {text: '一年级',min:350}
                ],
                center: ['25%','25%'],
                radius: 80
            },
            {
                indicator: [
                    {text: '四年级',min:350},
                    {text: '三年级',min:350},
                    {text: '二年级',min:350},
                    {text: '一年级',min:350}
                ],
                center: ['75%','25%'],
                radius: 80
            },
            {
                indicator: [
                    {text: '四年级',min:350},
                    {text: '三年级',min:350},
                    {text: '二年级',min:350},
                    {text: '一年级',min:350}
                ],
                center: ['25%','60%'],
                radius: 80
            },
            {
                indicator: [
                    {text: '四年级',min:50},
                    {text: '三年级',min:50},
                    {text: '二年级',min:50},
                    {text: '一年级',min:50}
                ],
                center: ['75%','60%'],
                radius: 80
            }
        ],
        series: [
            {
                type: 'radar',
                 tooltip: {
                    trigger: 'item'
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: [
                    {
                        value: index['1月'],
                        name: '一月份'
                    },
                ]
            },
            {
                type: 'radar',
                radarIndex: 1,
                 tooltip: {
                    trigger: 'item'
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: [
                    {
                        value: index['2月'],
                        name: '二月份'
                    }
                   
                ]
            },
            {
                type: 'radar',
                radarIndex: 2,
                 tooltip: {
                    trigger: 'item'
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: [
                    {
                        value: index['3月'],
                        name: '三月份'
                    },
                   
                ]
            },
            {
                type: 'radar',
                radarIndex: 3,
                 tooltip: {
                    trigger: 'item'
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: [
                    {
                        value: index['4月'],
                        name: '四月份'
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
    // 每个年级的每个月消费金额的折线图
    initMonthLineChart(index) {
      let chart = echarts.init(document.getElementById("myEnrollmentLineEcharts"));
      // 对数组数据进行处理
      var index1 = ["2016级"];
      var index2 = ["2017级"];
      var index3 = ["2018级"];
      var index4 = ["2019级"];
      console.log(index1.concat(index['2016']));
      // 指定图表的配置项和数据
      var option = {
        title: {
            text: '各年级消费金额'
        },
        legend: {},
        //color:["#FFDB5C","#FF9F7F","#37A2DA","#67E0E3"],
        tooltip: {
            //trigger: 'axis',
            showContent: false,
        },
        dataset: {
            source: [
                ['入学时间', '一月份', '二月份', '三月份', '四月份'],
                index1.concat(index['2016']),
                index2.concat(index['2017']),
                index3.concat(index['2018']),
                index4.concat(index['2019'])
            ]
        },
        xAxis: {
            type: 'category', 
              triggerEvent: true,
              // axisPointer: {show:true}
            },
        yAxis: {
          gridIndex: 0,
          name: '消费金额(万元)',
          type: 'value',
          min:380, // 设置y轴刻度的最小值
          max:560,  // 设置y轴刻度的最大值
          // splitNumber:9,  // 设置y轴刻度间隔个数
        
        },
        grid: {top: '50%'},
        series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 10},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 10},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 10},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', symbolSize: 10},
            {
                type: 'pie',
                id: 'pie',
                radius: '25%',
                center: ['50%', '25%'],
                label: {
                    formatter: '{b}: {@一月份} ({d}%)'
                },
                encode: {
                    itemName: '入学时间',
                    value: '一月份',
                    
                }
            }
        ]
      };
      setTimeout(function () {
          chart.on('mouseover',function(params){
            if(params.componentType == "xAxis"){
              var xAxisInfo = params.value;
              chart.setOption({
                series: {
                  id: 'pie',
                  label: {
                      formatter: '{b}:({d}%)'
                  },
                  encode: {
                      value: xAxisInfo,
                      
                  }
                }
              });
            }
            if(params.componentType == "series" && params.seriesType == 'line'){
              var xAxisInfo = params.value[0];
              chart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}:({d}%)'
                    },
                    encode: {
                        value: xAxisInfo,
                        
                    }
                }
              });
            }
            setTimeout(function(){
                chart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 4,
                    dataIndex: params.seriesIndex
                });
            },300);         
          });
          chart.on('mouseout',function(params){
            chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 4,
              dataIndex: params.seriesIndex
            });         
          });
      },0);
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
      window.addEventListener("resize",function(){
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ;
    },
  },
  created() {
    this.getConsumptionList();
    this.getWindowNum();
    this.getConsumeType();
    this.getTypeEatingMoney();
    this.getGenderMoney();
    this.getEnrollment();
    this.getEnrollmentMonth();
    this.getAcademyType();
    this.getHallWindowTimes();
  }
}
</script>


<style>
* {margin:0; padding:0;}
.main {
    -ms-flex: 80%; /* IE10 */
    flex: 80%;   
    padding: 20px;
    height:1080px;
}
.search{
  -ms-flex: 80%; /* IE10 */
  flex: 80%; 
  height:35px;
  padding:0px 0px 15px 80px;
}
.first{
  width:800px;
  height:800px;
}
.bread{
margin: '24px 0';
position:relative;
left:40px;
top:-33px;
}

</style>