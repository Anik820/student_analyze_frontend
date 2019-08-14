<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/consumeindex">消费行为</BreadcrumbItem>
        <BreadcrumbItem to="/consume_group">学生群体消费情况</BreadcrumbItem>
        <BreadcrumbItem to="/consume_group_trend">消费趋势分析</BreadcrumbItem>
      </Breadcrumb>
     <Content :style="{padding: '0 60px'}">
         <div class="main">
          
            <Card :bordered="false" style="width:74%;height:680px;float:left">
                <div style="width:100%;height:600px;float:left" id="myAcademyEcharts"></div>
            </Card>
          <Card :bordered="false" style="width:25%;height:680px;float:right;margin-left:1%;">
            <br><br>
            <font size="2">全校消费总金额</font><span style="color:rgb(173, 203, 62);font-size:22px">{{genderAcademyCalculate['academyStudents']['Result']['总额']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">全校生活类型消费金额</font><span style="color:rgb(62, 203, 176);font-size:22px">{{genderAcademyCalculate['academyStudents']['Result']['生活']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">全校购物类型消费金额</font><span style="color:rgb(203, 62, 185);font-size:22px">{{genderAcademyCalculate['academyStudents']['Result']['购物']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">全校餐饮类型消费金额</font><span style="color:rgb(203, 126, 62);font-size:22px">{{genderAcademyCalculate['academyStudents']['Result']['餐饮']|numFilter}}</span><font size="2">万</font><br><br><br>
            <font size="2">全校消费金额最多学院</font><span style="color:rgb(173, 203, 62);font-size:22px">{{genderAcademyCalculate['totalMaxName']}}</span><br><br>
            <font size="2">其消费金额为</font><span style="color:rgb(203, 62, 185);font-size:22px">{{genderAcademyCalculate['totalMaxMoney']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">人均消费最多的学院</font><span style="color:rgb(173, 203, 62);font-size:22px">{{genderAcademyCalculate['totalMaxAverageName']}}</span><br><br>
            <font size="2">其消费金额为</font><span style="color:rgb(203, 62, 185);font-size:22px">{{genderAcademyCalculate['totalMaxAverageMoney']|numFilter}}</span><font size="2">元</font><br><br>
            <font size="2">人均消费最少的学院</font><span style="color:rgb(173, 203, 62);font-size:22px">{{genderAcademyCalculate['totalMinAverageName']}}</span><br><br>
            <font size="2">其消费金额为</font><span style="color:rgb(203, 62, 185);font-size:22px">{{genderAcademyCalculate['totalMinAverageMoney']|numFilter}}</span><font size="2">元</font><br><br>
          </Card>
          <Card :bordered="false" style="width:25%;height:680px;float:left;margin-top:50px;">
            <br><br>
            <font size="2">全校男生消费总金额</font><span style="color:rgb(173, 203, 62);font-size:22px">{{genderAcademyCalculate['totalStudents']['boyResult']['总额']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">全校男生生活类型消费金额</font><span style="color:rgb(62, 203, 176);font-size:22px">{{genderAcademyCalculate['totalStudents']['boyResult']['生活']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">全校男生购物类型消费金额</font><span style="color:rgb(203, 62, 185);font-size:22px">{{genderAcademyCalculate['totalStudents']['boyResult']['购物']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">全校男生餐饮类型消费金额</font><span style="color:rgb(203, 126, 62);font-size:22px">{{genderAcademyCalculate['totalStudents']['boyResult']['餐饮']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">全校男生人均消费金额</font><span style="color:rgb(173, 203, 62);font-size:22px">{{genderAcademyCalculate['academyStudents']['boyResult']['总额']|numFilter}}</span><font size="2">元</font><br><br><br>   
            
            <font size="2">全校女生消费总金额</font><span style="color:rgb(173, 203, 62);font-size:22px">{{genderAcademyCalculate['totalStudents']['girlResult']['总额']|numFilter}}</span><font size="2">万</font><br><br> 
            <font size="2">全校女生生活类型消费金额</font><span style="color:rgb(62, 203, 176);font-size:22px">{{genderAcademyCalculate['totalStudents']['girlResult']['生活']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">全校女生购物类型消费金额</font><span style="color:rgb(203, 62, 185);font-size:22px">{{genderAcademyCalculate['totalStudents']['girlResult']['购物']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">全校女生餐饮类型消费金额</font><span style="color:rgb(203, 126, 62);font-size:22px">{{genderAcademyCalculate['totalStudents']['girlResult']['餐饮']|numFilter}}</span><font size="2">万</font><br><br>
            <font size="2">全校女生人均消费金额</font><span style="color:rgb(173, 203, 62);font-size:22px">{{genderAcademyCalculate['academyStudents']['girlResult']['总额']|numFilter}}</span><font size="2">元</font><br><br><br>
          </Card>   
          <Card :bordered="false" style="width:74%;height:680px;float:right;margin-left:1%;margin-top:50px;" >
            <div style="width:100%;height:650px;float:right" id="myMixtureEcharts"></div>
          </Card>
            
        </div>
      </Content>
  </Layout>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import axios from 'axios';
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
      genderAcademyCalculate: {}
    };
  },
  components: {

  },
  methods: {
    // 获取各个学院、性别、各个类型下的消费总额及均值等数据
    getGenderAcademyCalculate() {
      const path ='http://localhost:5000/group_consumption/getGenderAcademyCalculate';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data['gender_academy_calculate']);
        this.genderAcademyCalculate = res.data['gender_academy_calculate'];
      }).catch((error) => {
        console.error(error);
      });
    },
    // 各个餐厅的消费次数
    getConsumptionList() {
      const path = 'http://localhost:5000/group_consumption/mealTimes';
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
      const path = 'http://localhost:5000/group_consumption/windowTimes';
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
      const path = 'http://localhost:5000/group_consumption/consumeType';
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
      const path = 'http://localhost:5000/group_consumption/typeEatingMoney';
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
      const path = 'http://localhost:5000/group_consumption/genderClassify';
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
        this.initMixtureChart(this.monthTotalBoy,this.monthLifeBoy,this.monthShoppingBoy,this.monthEatingBoy,this.monthTotalGirl,this.monthLifeGirl,this.monthShoppingGirl,this.monthEatingGirl);
        
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取各个年级下的不同类型的消费金额
    getEnrollment() {
      const path = 'http://localhost:5000/group_consumption/enrollmentClassify';
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
      const path = 'http://localhost:5000/group_consumption/enrollmentMonthConsume';
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
      const path = 'http://localhost:5000/group_consumption/academyType';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data);
        // 获取学院列表、每个学院的不同类型的消费金额
        this.typeAcademy = res.data.academy_type;
        console.log(this.typeAcademy);
        this.initZoomChart(this.typeAcademy);
        //this.initBubbleChart();
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取每个餐厅以及各个餐厅下的所有窗口的消费次数的情况
    getHallWindowTimes() {
      const path = 'http://localhost:5000/group_consumption/hall_window_times';
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
    initMixtureChart(index0,index1,index2,index3,index00,index11,index22,index33) {
      console.log(index1);
      let chart = echarts.init(document.getElementById("myMixtureEcharts"));
      chart.setOption({
        title: {
          text: "群体每个月各类型消情况",
          left: "center",
          // top: 20
        },
        tooltip: {
          trigger:'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }             
          }
        },
        legend: {
          top:25,
          data: ['月总消费(男)', '生活消费(男)', '餐饮消费(男)', '购物消费(男)', '消费趋势(男)', '月总消费(女)', '生活消费(女)', '餐饮消费(女)', '购物消费(女)', '消费趋势(女)']
        },
        grid: {
          top: '3%',
          left: '0%',
          right: '0%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data:['2019年1月', '2019年2月', '2019年3月', '2019年4月'],
          axisPointer: {
            type: 'shadow'
          },
          axisLine: {
            lineStyle: {
              type: 'arrow'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          name: '金额（万元）',
          min: 0,
          max: 1200,
          interval: 100,
          axisLable: {
            formatter: '{value}'
          },
          axisLine: {
            lineStyle: {
              type: 'arrow'
            }
            
          }
        }],
        series: [
          {
            name: '月总消费(男)',
            type: 'bar',
            // barWidth: 3,
            data: index0,
            // color: '#c23531'
            label: {
              normal: {
                position: 'top',
                show: true,
                rotate: 90
              }
            }
          },
          {
            name: '月总消费(女)',
            type: 'bar',
            // barWidth: 3,
            data: index00,
            // color: '#546570'
            label: {
              normal: {
                position: 'top',
                show: true,
                rotate: 90
              }
            }
          },
          {
            name: '生活消费(男)',
            type: 'bar',
            // barWidth: 3,
            data: index1,
            // color: '#c23531'
            label: {
              normal: {
                position: 'top',
                show: true,
                rotate: 90
              }
            }
          },
          {
            name: '生活消费(女)',
            type: 'bar',
            // barWidth: 3,
            data: index11,
            // color: '#546570'
            label: {
              normal: {
                position: 'top',
                show: true,
                rotate: 90
              }
            }
          },
          {
            name: '餐饮消费(男)',
            type: 'bar',
            // barWidth: 3,
            data: index2,
            // color: '#c23531'
            label: {
              normal: {
                position: 'top',
                show: true,
                rotate: 90
              }
            }
          },
          {
            name: '餐饮消费(女)',
            type: 'bar',
            // barWidth: 3,
            data: index22,
            // color: '#546570'
            label: {
              normal: {
                position: 'top',
                show: true,
                rotate: 90
              }
            }
          },
          {
            name: '购物消费(男)',
            type: 'bar',
            // barWidth: 3,
            data: index3,
            // color: '#c23531'
            label: {
              normal: {
                position: 'top',
                show: true,
                rotate: 90
              }
            }
          },
          {
            name: '购物消费(女)',
            type: 'bar',
            // barWidth: 3,
            data: index33,
            // color: '#546570'
            label: {
              normal: {
                position: 'top',
                show: true,
                rotate: 90
              }
            }
          },
          {
            name: '消费趋势(男)',
            type: 'line',
            symbol: 'pin',
            symbolSize: 15,
            lineStyle: {
              normal: {
                  color: '#c23531',
                  // width: 3,
                  type: 'dotted',
                  curveness: 0.5
              }
            },
            data: index0
          },
          {
            name: '消费趋势(女)',
            type: 'line',
            symbol: 'pin',
            symbolSize: 15,
            lineStyle: {
              normal: {
                  color: '#546570',
                  // width: 3,
                  type: 'dotted',
                  curveness: 0.5
              }
            },
            data: index00
          }
        ]
      });
      window.addEventListener("resize",function(){
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ;
    },
    initZoomChart(index){
      let chart = echarts.init(document.getElementById("myAcademyEcharts"));
      console.log(index);
      chart.setOption({
        title : {
            text: '全校各学院消费情况',
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['餐饮', '生活', '购物']
        },
        grid: {
          bottom: '100px'
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : index['academy_list'],//每个学院的名称
                axisLabel: {
                  interval: 0,
                  rotate: -20
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                name: "金额（万元）"
            }
        ],
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end: 20
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 20
            },
            
        ],
        series : [
            {
                name:'餐饮',
                type:'bar',
                data:index['Result']['餐饮'],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ],
                    symbolSize: 25
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'生活',
                type:'bar',
                data:index['Result']['生活'],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ],
                    symbolSize: 25
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            },
            {
                name:'购物',
                type:'bar',
                data:index['Result']['购物'],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ],
                    symbolSize: 25
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            },
            {
                name:'总额',
                type:'line',
                data:index['Result']['总额'],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ],
                    symbolSize: 25
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
        ]
      });
      window.addEventListener("resize",function(){
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ;
    },
  },
  created() {
    this.getGenderAcademyCalculate();
    this.getConsumptionList();
    this.getWindowNum();
    this.getConsumeType();
    this.getTypeEatingMoney();
    this.getGenderMoney();
    this.getEnrollment();
    this.getEnrollmentMonth();
    this.getAcademyType();
    this.getHallWindowTimes();
  },
  filters:{
    numFilter(value){
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    }
  }
}
</script>


<style>
.main {
    -ms-flex: 80%; /* IE10 */
    flex: 80%;   
    padding: 20px;
    height:1380px;
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
.demo-split{
        height: 680px;
        border: 1px solid #dcdee2;
    }
.demo-split-pane{
        padding: 10px;
    }
.demo-split-pane.no-padding{
        height: 340px;
        padding: 0;
    }
</style>