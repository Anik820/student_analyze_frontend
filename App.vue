<template>
  <div id="app">
    <Layout>
      <Header>
        <div class="layout-logo">
          <img src="./assets/logo.png" width="250px" style="margin:0 auto">
        </div>
      </Header>
      <Layout>
        <Sider mode="vertical"
               brealpoint="md" 
               ref="side1" 
               hide-trigger 
               collapsible :collapsed-width="0" 
               v-model="isCollapsed">
          <NavBar></NavBar>
        </Sider>
        <Layout>
          <Icon @click.native="collapsedSider" :style="{margin: '10px 20px',color:'#000',display:'inline-block',cursor: 'pointer'}" type="md-menu" size="24"></Icon>
            <Content class="main-content-con" >
                <router-view></router-view>
            </Content>
            <Footer>
              <div class="footer">
                <hr />
                <h3>中国传媒大学</h3>
                <p>
                  Powered by
                  <a href="/">Big Data Center</a>
                  <span>&nbsp; &nbsp; Version: 1.0</span>
                </p>
              </div>
            </Footer>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>


<script>
import NavBar from './components/common/NavBar'
import index from './pages/index'
import studyindex from './pages/study/studyindex'
import study_total from './pages/study/study_total'
import total_common_course from './pages/study/total_common_course'
import total_professional_compulsory from './pages/study/total_professional_compulsory'
import total_professional_elective from './pages/study/total_professional_elective'
import total_public_elective from './pages/study/total_public_elective'
import study_person from './pages/study/study_person'
import study_special from './pages/study/study_special'//学业分析
import onlineindex from './pages/online/onlineindex'
import online_person from './pages/online/online_person'
import online_group from './pages/online/online_group'
import online_network from './pages/online/online_network'//上网行为
import consumeindex from './pages/consume/consumeindex'
import consume_total from './pages/consume/consume_total'
import consume_person from './pages/consume/consume_person'
import consume_group from './pages/consume/consume_group'
import consume_group_grade from './pages/consume/consume_group_grade'
import consume_group_trend from './pages/consume/consume_group_trend'//消费行为
import bookindex from './pages/book/bookindex'
import book_cuc from './pages/book/book_cuc'
import book_college from './pages/book/book_college'
import book_person from './pages/book/book_person'//图书借阅行为
//  import professional_elective from '@/components/study/professional_elective'
// import professional from '@/components/study/professional'
import cuc_borrow_result from '@/components/library/cuc_borrow_result'
import cuc_hotbook_school from '@/components/library/cuc_hotbook_school'
import cuc_booktype_school from '@/components/library/cuc_booktype_school'
import college_department_result from '@/components/library/college_department_result'
import person_top_borrow from '@/components/library/person_top_borrow'
import person_avg_compare from '@/components/library/person_avg_compare'
import college_avg_compare from '@/components/library/college_avg_compare'
import college_borrow_drill from '@/components/library/college_borrow_drill'
import common_course_bar from '@/components/study/common_course_bar'
import common_course_rose from '@/components/study/common_course_rose'
import public_elective_drill from '@/components/study/public_elective_drill'
import professional_compulsory_charts from '@/components/study/professional_compulsory_charts'
import special_double_degree_pie from '@/components/study/special_double_degree_pie'
import person_professional_compulsory from '@/components/study/person_professional_compulsory'
import person_common_course from '@/components/study/person_common_course'
import person_professional_elective from '@/components/study/person_professional_elective'
import special_transfer_chord from '@/components/study/special_transfer_chord'
import special_double_degree_bar from '@/components/study/special_double_degree_bar'
import person_public_elective from '@/components/study/person_public_elective'

export default {
  name: 'App',
  components: {

    NavBar,//导航条
    index,//首页
    studyindex,
    study_total,
    total_common_course,
    total_professional_compulsory,
    total_professional_elective,
    total_public_elective,
    study_person,
    study_special,
    common_course_bar,
    common_course_rose,
    public_elective_drill,
    professional_compulsory_charts,
    special_double_degree_pie,
    person_professional_compulsory,
    person_common_course,
    person_professional_elective,
    special_transfer_chord,
    special_double_degree_bar,
    person_public_elective,
    //学业分析
    onlineindex,
    online_person,
    online_group,
    online_network,//上网行为
    consumeindex,
    consume_total,
    consume_person,
    consume_group,
    consume_group_grade,
    consume_group_trend,//消费行为
    bookindex,
    book_cuc,
    book_college,
    book_person,
    cuc_borrow_result,
    cuc_hotbook_school,
    cuc_booktype_school,
    college_department_result,
    person_top_borrow,
    person_avg_compare,
    college_avg_compare,
    college_borrow_drill,
    //图书借阅行为
    
    
  },
  data () {
        return {
            isCollapsed: false
        }
    },
    computed: {
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    methods: {
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
        }
    }
}
</script>


<style>
html,body{width: 100%;height: 100%}
#app{width: 100%;height: 100%}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header{
  height: 60px;
  background: #fff;
}
.rotate-icon{
    transform: rotate(-90deg);
}
.footer {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: small;
}
.ivu-layout{height: 100%}
.ivu-layout-header,.ivu-layout-header>.ivu-menu-dark{background: #fff}
.layout-logo{line-height: 30px;text-align: center;font-weight: bold;background: #fff}
</style>