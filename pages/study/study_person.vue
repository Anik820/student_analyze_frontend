<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/studyindex">学业分析</BreadcrumbItem>
        <BreadcrumbItem to="/study_person">个人学业情况</BreadcrumbItem>
      </Breadcrumb>
  
      <Content :style="{padding: '0 60px'}">
        <div class="main">
              <div class="search">
                <i-input :value.sync="value" placeholder="请输入查询学号" style="width: 250px" v-model="stuid"></i-input>&nbsp;&nbsp;&nbsp;&nbsp;
                <i-button type="primary" shape="circle" icon="ios-search" @click="this.submit"></i-button>
              </div>
          
          <Card :bordered="false" style="height:600px;width:49%;float:left;margin-bottom:20px;margin:10px auto">
            <p slot="title">该生专业必修课成绩</p>
            <div align="center">
              <person_professional_compulsory></person_professional_compulsory>
            </div>
          </Card>

          <Card :bordered="false" style="height:600px;width:49%;float:right;margin-bottom:20px;margin:10px auto">
            <p slot="title">该生专业选修课成绩</p>
            <div align="center">
              <person_professional_elective></person_professional_elective>
            </div>
          </Card>
           <Card :bordered="false" style="height:500px;width:49%;float:left;">
            <p slot="title">该生通识课成绩</p>
            <div align="center">
              <person_common_course></person_common_course>
            </div>
          </Card>

          <Card :bordered="false" style="height:500px;width:49%;float:right;">
            <p slot="title">该生公选课成绩</p>
            <div align="center">
              <person_public_elective></person_public_elective>
            </div>
          </Card>
        </div>
      </Content>
  </Layout>
  </div>
</template>

<script>
import person_professional_compulsory from '@/components/study/person_professional_compulsory'
import person_professional_elective from '@/components/study/person_professional_elective'
import person_common_course from '@/components/study/person_common_course'
import person_public_elective from '@/components/study/person_public_elective'
import { METHODS } from 'http';
import Bus from '@/components/bus.js'

export default {
  components:{
    person_professional_compulsory,
    person_professional_elective,
    person_common_course,
    person_public_elective,
  },
  data () {
    return {
      value1: 0,
      param:[]
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
        //this.param = "201600101012";
    },
    submit(){
        this.param = this.stuid;
        Bus.$emit('val', this.param)
    },
  }
}
</script>


<style>
  .bread{
    margin: '24px 0';
    position:relative;
    left:40px;
    top:-33px;
  }
  .main {
    -ms-flex: 80%; /* IE10 */
    flex: 80%;   
    padding: 20px;
    height:1000px;
  }
  .search{
    -ms-flex: 100%; /* IE10 */
    flex: 100%;   
    padding: 0 0 5px 0;
  }
  .chart-content{
    -ms-flex: 100%; /* IE10 */
    flex: 100%;   
    padding: 20px;
  }
</style>