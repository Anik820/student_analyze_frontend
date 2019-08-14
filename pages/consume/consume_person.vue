<template>
  <div class="analyzeSystem">
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/consumeindex">消费行为</BreadcrumbItem>
        <BreadcrumbItem to="/consume_person">学生个人消费情况</BreadcrumbItem>
      </Breadcrumb>
      <div class="search">
          <Input prefix="ios-contact" v-model="value" clearable placeholder="请输入学号" style="width: 400px" />
          <Button shape="circle" icon="ios-search" number="true" search="true" style="width:150px" v-on:click="getStudentAnalyse">查询</Button>
      </div>
      <Content :style="{padding: '0 60px'}">
        
        <div class="main">
          
          <Card :bordered="false" style="width:32%;height:400px;float:left">
                <div style="width:100%;height:370px;float:left" id="myNestEcharts"></div>
          </Card>

          <Card :bordered="false" style="width:33%;height:400px;float:left;margin-left:1%;">
            
            
            <div style="width:100%;height:370px;float:left" id="myBarEcharts"></div>
            <!--  -->
              <!-- </font>
               -->
          </Card>
          <Card :bordered="false" style="width:33%;height:400px;float:left;margin-left:1%;">
              
              <div style="width:100%;height:370px;float:left" ref="myHeatEcharts"></div>
          </Card>
          

          <Card :bordered="false" style="width:49%;height:330px;float:right;margin-top:50px;margin:30px auto">
            <!-- <h3 slot="title">个人消费指数</h3> -->
              <div style="margin-right:50px;float:right">
              <font size="2" >一卡通交易总次数为</font><span style="color:rgb(173, 203, 62);font-size:22px">{{payNum}}</span><font size="2">次</font><br><br>
              <font size="2" >消费次数最多餐厅为</font><span style="color:rgb(203, 62, 185);font-size:22px">{{bestLikeCanteen}}</span><br><br>
              <font size="2" >个人最高消费月份为</font><span style="color:rgb(203, 126, 62);font-size:22px">{{mostMonth}}</span><br><br>
              <font size="2" >消费次数最多窗口为</font><span style="color:rgb(173, 203, 62);font-size:22px">{{bestLikeWin}}</span><br><br>
              <font size="2" >个人早餐率：</font><span style="color:rgb(173, 203, 62);font-size:22px">{{breRate|numFilter}}</span>
              <font size="2" >个人午餐率：</font><span style="color:rgb(203, 62, 185);font-size:22px">{{lunchRate|numFilter}}</span><br><br>
              <font size="2" >个人晚餐率：</font><span style="color:rgb(203, 126, 62);font-size:22px">{{dinnerRate|numFilter}}</span>
              <font size="2" >个人总就餐率：</font><span style="color:rgb(173, 203, 62);font-size:22px">{{totalRate|numFilter}}</span><br><br>
              </div>
              <div style="width:100%;height:400px;float:right;margin-right:200px;margin-top:-340px;" id="container2"></div>
              
          </Card>
          
          <Card :bordered="false" style="width:49%;height:860px;float:left;margin-top:50px;margin:30px auto">
              <div style="width:100%;height:830px;float:left" id="myCloudEcharts"></div>
          </Card>
          <Card :bordered="false" style="width:49%;height:500px;float:right;">
              <div style="width:100%;height:470px;float:right" id="myMixtureEcharts"></div>
          </Card>
        </div>
      </Content>
  </Layout>
  </div>
</template>
<script>

import echarts from "echarts";
import axios from 'axios';
import { METHODS } from "http";
import api from "@/api/consume_api";
import React from 'react';
import macarons from 'echarts/theme/macarons';
export default {
  name: "analyzeSystem",
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
      default: "800px"
    },
    margin: {
      type: String,
      default: "20px"
    }
  },
  data() {
    console.log("11111");
    return {
      consumptionData: [],
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
      monthLife: [],
      monthShopping: [],
      monthEating: [],
      monthTotal: [],
      value: null,
      my:null,
      bestLikeCanteen: '',
      bestLikeWin: '',
      consumeLevel: '',
      mostMonth: '',
      mostPay: 0,
      payNum: 0,
      totalMoney: 0,
      split1:0.5,
      breRate: 0,
      lunchRate: 0,
      dinnerRate: 0,
      totalRate: 0
    };
  },
  mounted() {
    // this.initChart();
    this.getMealTimes("201600101005");
    this.getConsumeType("201600101005");
    this.getTypeMoney("201600101005");
    this.getWindowNum("201600101005");
    this.getEatingHall("201600101005");
    this.getMonthTypeMoney("201600101005");
    this.getTotalData("201600101005");
    this.getTypeAcademyGender("201600101005");
    this.getDiningRate("201600101000");
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    // 获取个人统计总信息数据
    getTotalData(id) {
      const path = 'http://localhost:5000/student_consumption/totalTimesMoney';
      axios({
        url: path,
        method: 'post',
        data: {'student_id': id}
      }).then((res) => {
        console.log(res.data);
        this.initGaugeChart(res.data['total']['level']);
        this.bestLikeCanteen = res.data['total']['bestlike_canteen'];
        this.bestLikeWin = res.data['total']['bestlike_win'];
        this.consumeLevel = res.data['total']['level'];
        this.mostMonth = res.data['total']['most_month'];
        this.mostPay = res.data['total']['most_pay'];
        this.payNum = res.data['total']['pay_num'];
        this.totalMoney = res.data['total']['total_money'];
      }).catch((error) => {
        console.error(error);
      });
    },
    // 从数据库获取数据：
    getMealTimes(id) {
      const path = 'http://localhost:5000/student_consumption/mealTimes';
      console.log(id);
      axios({
        url: path,
        method: 'post',
        data: {'student_id':id}
      })
        .then((res) => {
          console.log(res.data.pay_time);
          // 学生在各个餐厅的消费次数字典
          this.consumptionData = res.data.pay_time;
          console.log(this.consumptionData['north_num']);
          // 对读取到的数据进行变量赋值
          this.northNum = this.consumptionData['north_num'];
          this.southNum = this.consumptionData['south_num'];
          this.qingzhenNum = this.consumptionData['qingzhen_num'];
          this.bangzijingNum = this.consumptionData['bangzijing_num'];
          this.zhonglanNum = this.consumptionData['zhonglan_num'];
          this.yixiangyuanNum = this.consumptionData['yixiangyuan_num'];

          // 调用函数实现可视化
          // this.initPieChart();
          this.initBarChart();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 从数据库中获取各个类型的消费数据
    getConsumeType(id) {
      const path = 'http://localhost:5000/student_consumption/consumeType';
      axios({
        url: path,
        method: 'post',
        data: {'student_id': id}
      })
      .then((res) => {
        console.log(res.data);
        // 对获取到的数据进行变量赋值
        this.shopping = res.data.consume_type['shopping'];
        this.eating = res.data.consume_type['eating'];
        this.life = res.data.consume_type['life'];
        console.log(this.shopping);
        // 调用可视化函数
        //this.initTypeChart();
      }).catch((error) => {
        console.error(error);
      });
    },
    // 从数据库获取三种的消费金额以及各个餐厅的消费情况
    getTypeMoney(id) {
      const path = 'http://localhost:5000/student_consumption/typeMoney';
      axios({
        url: path,
        method: 'post',
        data: {'student_id': id}
      }).then((res) => {
        console.log(res.data);
        // 对获取到的数据进行变量赋值
        // 各种类型的消费
        this.shopping = res.data.type_money['shopping'];
        this.eating = res.data.type_money['eating'];
        this.life = res.data.type_money['life'];
        // 各个餐厅消费金额统计
        this.bangzijingEating = res.data.eatingMoney.bangzijing_eating;
        this.beiyuanEating = res.data.eatingMoney.beiyuan_eating;
        this.nanyuanEating = res.data.eatingMoney.nanyuan_eating;
        this.qingzhenEating = res.data.eatingMoney.qingzhen_eating;
        this.yixiangyuanEating = res.data.eatingMoney.yixiangyuan_eating;
        this.zhonglanEating = res.data.eatingMoney.zhonglan_eating;
        // 调用可视化函数:嵌套饼状图
        this.initNestChart();
      }).catch((error) =>{
        console.error(error);
      });
    },
    // 从数据库中获取在各个窗口的消费次数的统计情况
    getWindowNum(id) {
      const path = 'http://localhost:5000/student_consumption/windowNum';
      axios({
        url: path,
        method: 'post',
        data: {'student_id': id}
      }).then((res) => {
        console.log(res.data);
        for(var i in res.data.eachWindow){
          this.eachWindowName.push({
            name: i.toString(),
            value: res.data.eachWindow[i]
          })
        }
        this.initCloudChart();
      }).catch((error) => {
        console.error(error);
      });
    },
    //从数据库中获取每个学生在各个餐厅的消费次数，以及各个餐厅的经纬度信息
    getEatingHall(id) {
      const path = 'http://localhost:5000/student_consumption/eatingHall';
      axios({
        url: path,
        method: 'post',
        data: {'student_id': id}
      }).then((res) => {
        console.log(res.data.eatingHall);
        // 将从数据库中获取到的各餐厅的经纬度信息和消费次数传递到函数中
        this.initHeatChart(res.data.eatingHall);
        //this.initScatterChart(res.data.eatingHall);
      }).catch((error) => {
        console.error(error);
      });
    },
    // 从数据库汇获取每个学生每个月的消费总额已经每个月各类型消费的金额
    getMonthTypeMoney(id) {
      const path = 'http://localhost:5000/student_consumption/monthTypeMoney';
      axios({
        url: path,
        method: 'post',
        data: {'student_id': id}
      }).then((res) => {
        console.log(res.data.monthTypeMoney);
        // 以月份为横坐标，统计每个月的各个类型的消费金额
        console.log(res.data.monthTypeMoney['生活']);
        this.monthLife = res.data.monthTypeMoney['生活'];
        this.monthShopping = res.data.monthTypeMoney['购物'];
        this.monthEating = res.data.monthTypeMoney['餐饮'];
        this.monthTotal = res.data.monthTypeMoney['总额'];
        this.initMixtureChart(this.monthTotal,this.monthLife,this.monthEating,this.monthShopping);
      }).catch((error) => {
        console.error(error);
      });
    },
    // 获取某学生的就餐率相关数据
    getDiningRate(id) {
      const path = 'http://localhost:5000/student_consumption/getDiningRate';
      axios({
        url: path,
        method: 'post',
        data: {'student_id': id}
      }).then((res) => {
          console.log(res.data);
          this.breRate = res.data['dining_rate']['bre_rate'];
          this.lunchRate = res.data['dining_rate']['lun_rate'];
          this.dinnerRate = res.data['dining_rate']['din_rate'];
          this.totalRate = res.data['dining_rate']['all_rate'];
      }).catch((error) => {
        console.log(error);
      });
    },
    // 条形图：基于各个餐厅消费次数的条形图
    initBarChart() {
      let chart = echarts.init(document.getElementById("myBarEcharts"));
      // 把配置和数据放这里
      chart.setOption({
        title: {
          top: 5,
          left: 15,
          text: '餐厅消费次数',
          // subtext: '数据源于个人记录'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top:20,
          left:370,
          data: ['消费记录']
        },
        grid: {
          left: '15%',
          right: '4%',
          bottom: '5%',
          containerLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['北苑餐厅', '南苑餐厅', '梆子井餐厅', '中蓝餐厅', '清真餐厅', '溢香苑餐厅']
        },
        series: [
          {
            name: '消费记录',
            type: 'bar',
            // color: 'lightred',
            data: [
              { value: this.northNum, name: "北苑餐厅" },
              { value: this.southNum, name: "南苑餐厅" },
              { value: this.bangzijingNum, name: "梆子井餐厅" },
              { value: this.zhonglanNum, name: "中蓝餐厅" },
              { value: this.qingzhenNum, name: "清真餐厅" },
              { value: this.yixiangyuanNum, name: "溢香苑餐厅"}
            ]
          }
          
        ]
      })
      window.addEventListener("resize",function(){
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ;
    },
    // 嵌套环形图：内层包括三种消费类型，外层包括详细的消费内容
    initNestChart() {
      let chart = echarts.init(document.getElementById("myNestEcharts"));
      chart.setOption({
        backgroundColor: "#ffffff",
        title: {
          text: "个人消费",
          left: "left",
          top: 5,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}:{c}({d}%)"
        },
        legend: {
          top:320,
          left:50,
          orient: "horizontal",
          data: ["生活消费", "就餐消费", "购物消费", "北苑餐厅", "南苑餐厅", "梆子井餐厅", "中蓝餐厅", "清真餐厅", "溢香苑餐厅"]
        },
        series: [
        {
          name: "消费类型",
          type: "pie",
          radius: [0,"30%"],
          center:["50%","45%"],
          avoidLabelOverlap: false,
          label: {
                normal: {
                    show: false,
                    position: 'inner'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        /* fontWeight: 'bold' */
                    }
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
          center:["50%","45%"],
          label: {
                normal: {
                    show: true,
                    
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            /* labelLine: {
                normal: {
                    show: true
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
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ;
    },
    // 学生在各个窗口的消费次数的统计结果，用来做词云图所需的数据
    initCloudChart(){
      let chart = echarts.init(document.getElementById("myCloudEcharts"));
      let maskImage = new Image();
			maskImage.src = "data:image/png;base64,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"
      let option = {
        backgroundColor: "#ffffff",
        //maskImage:maskImage,
        title: {
          top: 20,
          text: "各档口消费频数分析",
          x: "center",
          textStyle: {
            fontSize: 23,
            color: "#000000",
            
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} "
        },
        series:[{
          name: "各档口消费频数分析",
          type: "wordCloud",
          // gridSize: 1,
          // shape: 'smooth',
          sizeRange: [12, 25],
          rotationRange: [-90, 90],
          textPadding: 0,
          // autoSize: {9
          //   enable: true,
          //   minSize: 6
          // },
          textStyle: {
            normal: {
              color: function() {
                return 'rgb(' + [
                Math.round(Math.random()*160),
                Math.round(Math.random()*160),
                Math.round(Math.random()*160)
                ].join(',') + ')';
              }
            },
            emphasis: {
              shadowBlur: 6,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          data: this.eachWindowName
        }]
      };
      maskImage.onload = function(){
        chart.setOption(option);
      }
      window.addEventListener("resize",function(){
            chart.resize();
        }) ;
    },
    // 根据每个学生在各个餐厅的就餐次数，得出热力图
    initHeatChart(points) {
      this.chart = echarts.init(this.$refs.myHeatEcharts);
      console.log(points);
      this.chart.setOption(
        this.option={
        animation: false,
        bmap: {
            center: [116.562216, 39.917632],
            zoom: 17,
            roam: true
        },
        visualMap: {
            show: true,
            top: 'top',
            min: 0,
            max: 100,//数据源可能出现的最大值
            seriesIndex: 0,
            calculable: true,
            inRange: {
                color: ['blue', 'blue', 'green', 'yellow', 'red']
            }
        },
        series: [{
            type: 'heatmap',
            coordinateSystem: 'bmap',
            data: points,
            pointSize: 25,
            blurSize: 16
        }]
      });
      // if (!app.inNode) {
      //     // 添加百度地图插件
      //     console.log("123123123");
      //     var bmap = this.chart.getModel().getComponent('bmap').getBMap();
      //     bmap.addControl(new BMap.MapTypeControl());
      // }
      window.addEventListener("resize",function(){
            this.chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ;
    },
    // 根据每个学生的每个月消费金额、各种类型的消费金额
    initMixtureChart(index0,index1,index2,index3) {
      console.log(index1);
      let chart =  echarts.init(document.getElementById("myMixtureEcharts"));
      
      chart.setOption({
        title: {
          text: "每月各类型消费情况",
          left: "center",
          top: 2
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
          top:20,
          data: ['月总消费', '生活消费', '餐饮消费', '购物消费', '消费趋势']
        },
        xAxis: [{
          type: 'category',
          data:['2019年1月', '2019年2月', '2019年3月', '2019年4月'],
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',
          name: '金额（元）',
          min: 0,
          max: 2000,
          interval: 500,
          axisLable: {
            formatter: '{value} 元'
          }
        }],
        series: [
          {
            name: '月总消费',
            type: 'bar',
            barWidth: 15,
            data: index0
          },
          {
            name: '生活消费',
            type: 'bar',
            barWidth: 15,
            data: index1
          },
          {
            name: '餐饮消费',
            type: 'bar',
            barWidth: 15,
            data: index2
          },
          {
            name: '购物消费',
            type: 'bar',
            barWidth: 20,
            data: index3
          },
          {
            name: '消费趋势',
            type: 'line',
            symbol: 'pin',
            symbolSize: 20,
            lineStyle: {
              normal: {
                  // color: 'green',
                  width: 5,
                  type: 'dotted',
                  curveness: 0.5
              }
            },
            data: index0
          }
        ]
      })
     window.addEventListener("resize",function(){
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }) ;
    },
    // 根据输入的用户学号，查看该学号下的分析结果
    getStudentAnalyse() {
      console.log(this.value);
      this.getTotalData(this.value);
      this.getMealTimes(this.value);
      this.getConsumeType(this.value);
      this.getTypeMoney(this.value);
      this.getWindowNum(this.value);
      this.getEatingHall(this.value);
      this.getMonthTypeMoney(this.value);
    },
    getTypeAcademyGender() {
      const path ='http://localhost:5000/group_consumption/getTypeAcademyGender';
      axios({
        url: path,
        method: 'get'
      }).then((res) => {
        console.log(res.data['type_academy_gender']);
        this.typeAcademyGender = res.data['type_academy_gender'];
        // 对获取到的数据进行格式转化，转化为桑基图需要的格式
        let academyName = this.typeAcademyGender['academy_list'];
        console.log(academyName);
        // 各个类型、性别的消费金额
        let consume = res.data['gender_class_consume'];
        console.log(consume);
        // 定义桑基图各个名称：
        var allName = [
          {"name": "全校消费总额"},
          {"name": "男生消费总额"},
          {"name": "女生消费总额"},
          {"name": "生活消费金额"},
          {"name": "购物消费金额"},
          {"name": "餐饮消费金额"},
        ]
        // 将所有的学院名称保存在allName中
        for(var i in academyName){
          allName.push(
            {"name": academyName[i]}
            )
        }
        // console.log(allName);
        // 关联数据
        var links = [
          {"source": "全校消费总额", "target": "男生消费总额", "value": consume['boy_consume']},
          {"source": "全校消费总额", "target": "女生消费总额", "value": consume['girl_consume']},
          {"source": "男生消费总额", "target": "生活消费金额", "value": consume['boy_life']},
          {"source": "男生消费总额", "target": "餐饮消费金额", "value": consume['boy_eating']},
          {"source": "男生消费总额", "target": "购物消费金额", "value": consume['boy_shopping']},
          {"source": "女生消费总额", "target": "生活消费金额", "value": consume['girl_life']},
          {"source": "女生消费总额", "target": "餐饮消费金额", "value": consume['girl_eating']},
          {"source": "女生消费总额", "target": "购物消费金额", "value": consume['girl_shopping']},
        ]
        for(var i in this.typeAcademyGender['boyResult']['生活']){
          links.push(
            {"source": "生活消费金额", "target": academyName[i], "value": this.typeAcademyGender['boyResult']['生活'][i]},
            {"source": "餐饮消费金额", "target": academyName[i], "value": this.typeAcademyGender['boyResult']['餐饮'][i]},
            {"source": "购物消费金额", "target": academyName[i], "value": this.typeAcademyGender['boyResult']['购物'][i]},
            {"source": "生活消费金额", "target": academyName[i], "value": this.typeAcademyGender['girlResult']['生活'][i]},
            {"source": "餐饮消费金额", "target": academyName[i], "value": this.typeAcademyGender['girlResult']['餐饮'][i]},
            {"source": "购物消费金额", "target": academyName[i], "value": this.typeAcademyGender['girlResult']['购物'][i]}
          )
        }
        console.log(links)
        this.initGaugeChart();
      }).catch((error) => {
        console.error(error);
      });
    },
    initGaugeChart(index) {
      console.log(index);
     
      // 讲个人消费水平，转化为数值
      if(index =='低')
        this.consumeLevel = 10;
      else if(index =='较低')
        this.consumeLevel = 30;
      else if(index =='中')
        this.consumeLevel = 50;
      else if(index =='较高')
        this.consumeLevel = 70;
      else if(index =='高')
        this.consumeLevel = 90;
      else{
        console.log("无消费指数");
      }
      console.log(this.consumeLevel);
      var myChart = echarts.init(document.getElementById('container2'));
      var option = {
          legend: {
            data: ['低', '较低', '中', '较高', '高']
          },
          tooltip : {
              formatter: "{a} : {c}%"
          },
          title: {
            text: '个人消费指数',
            top: 10,
            left: 'center'
          },
          series : [
              {
                  name:'消费指数',
                  type:'gauge',
                  center : ['50%', '50%'],    // 默认全局居中
                  radius : 120,
                  detail: {formatter:'{value}%'},
                  axisLine: {            // 坐标轴线
                      lineStyle: {       // 属性lineStyle控制线条样式
                          width: 20,
                          color: [[0.2,'#c23531'],[0.4,'#2f4554'],[0.6,'#61a0a8'],[0.8,'#d48265'],[1,'#ca8622']], // 设置每个坐标间隔中的颜色
                      }
                  },
                  axisTick: {            // 坐标轴小标记
                      splitNumber: 1,   // 每份split细分多少段
                      // length :12,        // 属性length控制线长
                  },
                  axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                      formatter: function(v){
                          switch (v+''){
                              case '10': return '低';
                              case '30': return '较低';
                              case '50': return '中';
                              case '70': return '较高';
                              case '90': return '高';
                              // default: return '';
                          }
                      },
                      textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                          color: '#FF8C00',
                          fontSize: 15,
                          fontWeight: 'bolder'
                      }
                  },
                  pointer: {
                      width:7,
                      length: '70%',
                      // color: 'rgba(255, 255, 255, 0.8)'
                  },
                  title : {
                      show : true,
                      offsetCenter: [0, '50%'],       // x, y，单位px
                      textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                          fontSize: 30
                      }
                  },
                  data:[{value: this.consumeLevel}]
              }
          ]
      };
       myChart.setOption(option,true);
       window.addEventListener("resize",function(){
            myChart.resize();
        }) ;
    },
  },
  created() {
    // this.getMealTimes("201600101000");
    // this.getConsumeType("201600101000");
    // this.getTypeMoney("201600101000");
    // this.getWindowNum("201600101000");
    // this.getEatingHall("201600101000");
    // this.getMonthTypeMoney("201600101000");
  },
  filters:{
    numFilter(value){
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    }
  },
  destroyed(){
    window.removeEventListener('resize', this.initEchart, 20)
  }
};
</script>


<style>
#analyzeSystem{
  width: 100%
  height 800px
  box-sizing border-box
}
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
.demo-split{
        height: 400px;
        border: 1px solid #dcdee2;
    }
.demo-split-pane{
        padding: 10px;
    }
</style>