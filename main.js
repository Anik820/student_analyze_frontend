// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css' // 使用 CSS
//import VueAwesomeSwiper from 'vue-awesome-swiper'
//import 'swiper/dist/css/swiper.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ECharts from 'vue-echarts/components/ECharts.vue'
import bmap from 'echarts-bmap'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/radiusAxis'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/chart/line'
require('echarts-wordcloud')
require('echarts/extension/bmap/bmap')
import echarts from 'echarts'
import liquidfill from 'echarts-liquidfill'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(ElementUI);
//Vue.use(VueAwesomeSwiper, /* { default global options } */ )
/* eslint-disable no-new */
Vue.component('chart',ECharts)
Vue.prototype.$Echarts = ECharts
Vue.prototype.$echarts = echarts
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})