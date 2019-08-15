<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/consumeindex">消费行为</BreadcrumbItem>
        <BreadcrumbItem to="/consume_group">学生群体消费情况</BreadcrumbItem>
      </Breadcrumb>
    <Content :style="{padding: '0 50px'}">

      <div class="main">
            <Card :bordered="false" style="width:100%;height:800px;float:left" >
                  <!-- 基于全校消费情况关系的桑基图 -->
                  <div style="width:100%;height:650px;float:left" id="container1"></div>
                  <!-- <Button type="default" long>年级消费分析</Button>
                  <br><br>
                  <Button type="default" long>消费趋势分析</Button> -->
                  <el-button-group style="margin-left:350px;margin-top:25px">
                    <el-button type="warning" icon="el-icon-d-arrow-left" style="width:400px" @click="addRoutes1">年级消费趋势</el-button>
                    <el-button type="success" style="width:400px" @click="addRoutes2">消费趋势分析<i class="el-icon-d-arrow-right"></i></el-button>
                  </el-button-group>
            </Card>
      </div>
    </Content>
  </Layout>
  </div>
</template>


<script>
import axios from 'axios';
import echarts from 'echarts';
import macarons from 'echarts/theme/macarons';
import highcharts from 'highcharts';
import HighchartsSankey from "highcharts/modules/sankey.js";
HighchartsSankey(highcharts);
export default {
  // name: 'student1',
  data() {
    return {
      typeAcademyGender: {}
    };
  },
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
  },
  created() {
    this.getTypeAcademyGender();
  },
  methods: {
    addRoutes1 () {
      this.$router.push('/consume_group_grade')
    },
    addRoutes2 () {
      this.$router.push('/consume_group_trend')
    },
    // 获取全校、男生、女生、各个学院的消费金额
    getTypeAcademyGender() {
      const path ='http://192.168.1.43:8001/group_consumption/getTypeAcademyGender';
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
        this.initSankeyChart(allName,links);
      }).catch((error) => {
        console.error(error);
      });
    },
    initSankeyChart(index1,index2) {
      console.log("11111");
      var myChart = echarts.init(document.getElementById('container1'),'macarons');
      var option = {
          title: {
              text: '群体消费情况——桑基图',
              top: 'top',
              color:'black',
              // left: '35%'
          },
          tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
          },
          /* colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4',  '#4572A7', 
                    '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92','5f9f9f','70db93'], */
          series: [
              {
                  type: 'sankey',
                  data: index1,
                  links: index2,
                  // focusNodeAdjacency: 'allEdges',
                  itemStyle: {
                      borderWidth: 1,
                      // color:'#1b6199',
                      borderColor: '#fff'
                  },
                  lineStyle: {
                      normal: {
                        color: 'source',
                        curveness: 0.5
                    }
                  }
              }
          ]
      }
      myChart.setOption(option);
      window.addEventListener("resize",function(){
            myChart.resize();
        }) ;
    },
  }
}
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
.demo-carouse3 {
  height: 600px;
  line-height: 530px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #9e508d;
}
</style>