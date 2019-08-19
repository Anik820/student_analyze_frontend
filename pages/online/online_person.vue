<template>
  <div>
    <Layout :style="{padding: '0 24px 24px'}" id="bg">
      <Breadcrumb class="bread">
        <BreadcrumbItem to="/onlineindex">上网行为</BreadcrumbItem>
        <BreadcrumbItem to="/selectstudent">学生个人上网行为分析</BreadcrumbItem>
        <BreadcrumbItem>{{this.studentid}}</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{padding: '0 0 0 0'}">
        <Col span="4">
            <div v-if="this.currentchart!=2">
              <h2>当前：{{this.term}}</h2>
              <el-select v-model="term"
                         placeholder="请选择学期"
                         class="select_person">
                <el-option v-for="item in options_term"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div v-if="this.currentchart==2">
               <h2>当前：{{this.date.toLocaleDateString()}}</h2>
               <DatePicker type="date" :options="options_date" v-model="date" placeholder="Select date" size="large" style="width: 125px"></DatePicker>
            </div>
        </Col>
        <Col span="20">
        <div class="normal">
            <el-carousel :interval="4000"
                         :autoplay="false"
                         height="750px"
                         class="carousel-person"
                         indicator-position="outside"
                         @change="setcurrent">
              <el-carousel-item>
                  <BarChart></BarChart>
              </el-carousel-item>
              <el-carousel-item>
                  <BoxChart></BoxChart>
              </el-carousel-item>
              <el-carousel-item>
                  <TrailMap></TrailMap>
              </el-carousel-item>>
            </el-carousel>
        </div>
        </Col>

      </Content>
    </Layout>
  </div>
</template>


<script>
import BarChart from '@/pages/online/charts/BarChart'
import BoxChart from '@/pages/online/charts/BoxChart'
import TrailMap from '@/pages/online/charts/TrailMap'
import online_api from '@/api/online_api'
import {mapGetters} from 'vuex'
const colormap={
  '正常':'#99cc99',
  '轻度':'#cccc66',
  '重度':' '
}
export default {
  components: {
    BarChart,
    BoxChart,
    TrailMap
  },
  data () {
    return {
      currentchart:0,
      options_term:[
        {
          value: '2016年春季',
          label: '2016年春季'
        },
        {
          value: '2016年秋季',
          label: '2016年秋季'
        },
        {
          value: '2017年春季',
          label: '2017年春季'
        },
        {
          value: '2017年秋季',
          label: '2017年秋季'
        },
        {
          value: '2018年春季',
          label: '2018年春季'
        },
        {
          value: '2018年秋季',
          label: '2018年秋季'
        },
        {
          value: '2019年春季',
          label: '2019年春季'
        },
      ],
      term: '2019年春季',
      bgcolor:'',
      options_date: {
          shortcuts: [
              {
                  text: '今天',
                  value () {
                      return new Date();
                  },
              },
              {
                  text: '昨天',
                  value () {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      return date;
                  },
              },
              {
                  text: '一星期前',
                  value () {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                      return date;
                  },
              }
          ]
      },
      date: new Date()
    }
  },
  computed: {
    ...mapGetters(['studentid'])
  },
  mounted() {
    this.init()  
  },
  methods: {
    init(){
      online_api.getstudentstatus(this.studentid).then(res => {
        document.getElementById("bg").style.background=colormap[res["级别"]]
      })
    },
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    },
    setcurrent(index){
      this.currentchart=index
    }
  }
}
</script>


<style lang="less" scoped>
.bread {
  margin: "24px 0";
  position: relative;
  left: 40px;
  top: -33px;
}
.normal {
  position: absolute;
  display: block;
  width: 1200;
  height: 900;
  float:right;
  margin:auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 25px;
  opacity: 0.75;
  line-height: 450px;
  margin: 0 0px 0px 0px;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.p-test {
  padding: 2px 0px 0px 5px;
}
.p-test2 {
  padding: 2px 0px 0px 20px;
}
.el-row{
  position:absolute;
}
.input-test {
  width: 150px;
}
.carousel-person {
  width: 1200px;
  margin: -17px 0px 0px -45px;
  left:0%;
  position:absolute;
  float:right;
}
.invisible-card {
  opacity: 0;
}
.select_person {
  width: 120px;
}
</style>