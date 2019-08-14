import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '@/components/common/NavBar'
import index from '@/pages/index'
import studyindex from '@/pages/study/studyindex'
import study_total from '@/pages/study/study_total'
import total_common_course from '@/pages/study/total_common_course'
import total_professional_compulsory from '@/pages/study/total_professional_compulsory'
import total_professional_elective from '@/pages/study/total_professional_elective'
import total_public_elective from '@/pages/study/total_public_elective'
import study_person from '@/pages/study/study_person'
import study_special from '@/pages/study/study_special'
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
//学业分析
import onlineindex from '@/pages/online/onlineindex'
import online_person from '@/pages/online/online_person'
import online_group from '@/pages/online/online_group'
import online_network from '@/pages/online/online_network'
import selectstudent from '@/pages/online/selectstudent'
import BarChart from '@/pages/online/charts/BarChart'
import BoxChart from '@/pages/online/charts/BoxChart'
import CollegeFreq from '@/pages/online/charts/CollegeFreq'
import HeatMap from '@/pages/online/charts/HeatMap'
import TrailMap from '@/pages/online/charts/TrailMap'
//上网行为
import consumeindex from '@/pages/consume/consumeindex'
import consume_total from '@/pages/consume/consume_total'
import consume_person from '@/pages/consume/consume_person'
import consume_group from '@/pages/consume/consume_group'
import consume_group_grade from '@/pages/consume/consume_group_grade'
import consume_group_trend from '@/pages/consume/consume_group_trend'//消费行为
import bookindex from '@/pages/book/bookindex'
import book_cuc from '@/pages/book/book_cuc'
import book_college from '@/pages/book/book_college'
import book_person from '@/pages/book/book_person'
import cuc_borrow_result from '@/components/library/cuc_borrow_result'
import cuc_hotbook_school from '@/components/library/cuc_hotbook_school'
import cuc_booktype_school from '@/components/library/cuc_booktype_school'
import college_department_result from '@/components/library/college_department_result'
import person_top_borrow from '@/components/library/person_top_borrow'
import person_avg_compare from '@/components/library/person_avg_compare'
import college_avg_compare from '@/components/library/college_avg_compare'
import college_borrow_drill from '@/components/library/college_borrow_drill'
//图书借阅行为



Vue.use(VueRouter)

export default new VueRouter({
    routes: [
    /*{
        path: '/',
        name: 'NavBar',
        component: NavBar
    },*/

    {
        path: '/',
        name: 'index',
        component: index
    },//
    {
        path: '/studyindex',
        name: 'studyindex',
        component: studyindex
    },
    {
        path: '/study_total',
        name: 'study_total',
        component: study_total
    },
    {
        path: '/total_common_course',
        name: 'total_common_course',
        component: total_common_course
    },
    {
        path: '/total_professional_compulsory',
        name: 'total_professional_compulsory',
        component: total_professional_compulsory
    },
    {
        path: '/total_professional_elective',
        name: 'total_professional_elective',
        component: total_professional_elective
    },
    {
        path: '/total_public_elective',
        name: 'total_public_elective',
        component: total_public_elective
    },
    {
        path: '/study_person',
        name: 'study_person',
        component: study_person
    },
    {
        path: '/study_special',
        name: 'study_special',
        component: study_special
    },
    /* {
        path: '/professional_elective',
        name: 'professional_elective',
        component: professional_elective
    }, */
    {
        path: '/professional_compulsory_charts',
        name: 'professional_compulsory_charts',
        component: professional_compulsory_charts
    }, 
    {
        path: '/common_course_bar',
        name: 'common_course_bar',
        component: common_course_bar
    },
    {
        path: '/common_course_rose',
        name: 'common_course_rose',
        component: common_course_rose
    },
    {
        path: '/public_elective_drill',
        name: 'public_elective_drill',
        component: public_elective_drill
    },
    {
        path: '/special_double_degree_pie',
        name: 'special_double_degree_pie',
        component: special_double_degree_pie
    },
    {
        path: '/person_professional_compulsory',
        name: 'person_professional_compulsory',
        component: person_professional_compulsory
    },
    {
        path: '/person_common_course',
        name: 'person_common_course',
        component: person_common_course
    },
    {
        path: '/person_professional_elective',
        name: 'person_professional_elective',
        component: person_professional_elective
    },
    {
        path: '/special_transfer_chord',
        name: 'special_transfer_chord',
        component: special_transfer_chord
    },
    {
        path: '/special_double_degree_bar',
        name: 'special_double_degree_bar',
        component: special_double_degree_bar
    },
    {
        path: '/person_public_elective',
        name: 'person_public_elective',
        component: person_public_elective
    },
    //学业分析
    {
        path: '/onlineindex',
        name: 'onlineindex',
        component: onlineindex
    },
    {
        path: '/online_person',
        name: 'online_person',
        component: online_person
    },
    {
        path: '/online_group',
        name: 'online_group',
        component: online_group
    },
    {
        path: '/online_network',
        name: 'online_network',
        component: online_network
    },
    {
        path: '/selectstudent',
        name: 'selectstudent',
        component: selectstudent
    },//上网行为
    {
        path: '/consumeindex',
        name: 'consumeindex',
        component: consumeindex
    },
    {
        path: '/consume_total',
        name: 'consume_total',
        component: consume_total
    },
    {
        path: '/consume_person',
        name: 'consume_person',
        component: consume_person
    },
    {
        path: '/consume_group',
        name: 'consume_group',
        component: consume_group
    },
    {
        path: '/consume_group_grade',
        name: 'consume_group_grade',
        component: consume_group_grade
    },
    {
        path: '/consume_group_trend',
        name: 'consume_group_trend',
        component: consume_group_trend
    },//消费行为
    {
        path: '/bookindex',
        name: 'bookindex',
        component: bookindex
    },
    {
        path: '/book_cuc',
        name: 'book_cuc',
        component: book_cuc
    },
    {
        path: '/book_college',
        name: 'book_college',
        component: book_college
    },
    {
        path: '/book_person',
        name: 'book_person',
        component: book_person
    },
    {
        path:'/cuc_borrow_result',
        name:'cuc_borrow_result',
        component:cuc_borrow_result
    },
    {
        path:'/cuc_hotbook_school',
        name:'cuc_hotbook_school',
        component:cuc_hotbook_school
    },
    {
        path:'/cuc_booktype_school',
        name:'cuc_booktype_school',
        component:cuc_booktype_school
    },
    {
        path:'/college_department_result',
        name:'college_department_result',
        component:college_department_result
    },
    {
        path:'/person_top_borrow',
        name:'person_top_borrow',
        component:person_top_borrow
    },
    {
        path:'/person_avg_compare',
        name:'person_avg_compare',
        component:person_avg_compare
    },
    {
        path:'/college_avg_compare',
        name:'college_avg_compare',
        component:college_avg_compare
    },
    {
        path:'/college_borrow_drill',
        name:'college_borrow_drill',
        component:college_borrow_drill
    },
    //图书借阅行为

    
    

    ]
})