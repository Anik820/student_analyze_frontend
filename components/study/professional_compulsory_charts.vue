<template>
<div>
    <Card :bordered="false" style="width:100%;height:500px;float:left;margin-bottom:10px;margin:10px auto">
              <p slot="title">专业必修课情况</p>
              <div align="center">
              <div align="center" id="compulsory" style="width:100%;height:380px">
              </div>
                <i-button type="dashed" icon="ios-arrow-back" id="return-button" @click="re()">Back</i-button>
              </div>
          </Card>
          <Card :bordered="false" style="width:100%;height:500px;float:left;margin-bottom:10px;margin:10px auto">
              <p slot="title">各班级成绩情况</p>
              <div align="center" id="tes" style="width:100%;height:380px">
              </div>
          </Card>
</div>
</template>

<script>
import api from "../../api/study_api"
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);
export default {
  data() {
    return {    
      level :[],
      servicedata1: [],
      servicedata_name: [],
      servicedata2: [],
        a1:[],
        a2:[],
        q:[],
        b:[],
    };
  },
  mounted() {
    this.init();
    window.onresize = chart.resize;
  },
  methods: {
      init(){
        this.q = '19'
        this.chart1();
      },

    //   1
    chart1(){
        var _self = this;
        _self.level = 1;
        
        api.getxueyuan().then(res => {
            
              for(var i=0;i<res.valueqq.length;i++){
                    var obj = new Object();
                    let j ={}
                    let j2 = []
                    let j3 = {}
                
                    j3['name'] = '';
                    j3['value'] = res.valueqq[i];
                    j2[0] = j3;
                    j['name'] = res.namelist[i];
                    j['data'] = j2;
                    this.servicedata1[i] = j
              }
             
         Highcharts.chart('compulsory', 
         this.setOp());
      });
    },
    // 1图
    setOp(){
        var _self = this;
        return{
            
    chart: {
        type: 'packedbubble',
        height: '26%'
    },
    credits: {
        enabled: false
    }, //去掉highcharts水印
    grid:{
          bottom:"30px",//组件离容器下侧的距离,百分比字符串或整型数字
    },
    title: {
        text: '学生必修课成绩'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>必修课数目：{point.name}:</b> {point.y}'
    },
    legend:{
        name:'aaa'
    },
    plotOptions: {
        packedbubble: {
            minSize: '70%',
            maxSize: '20%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
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
                },
                
            }
        },
          series:{point:{
                    events:{
                        click:function(e){
                            
                            _self.a1 = e.point.series.name
                            _self.level = 2;
                            _self.chart2();
                        }
                    }
                }},
    },
    
    series: _self.servicedata1
    
}
    },
    // 图2
    chart2(){
        var _self = this;
        console.log(_self.q)
       api.getkecheng(_self.a1,_self.q).then(res => {
                                
                                for(var i=0;i<res.zhuanyelist.length;i++){
                                let j ={}
                                let j2 = []
                                let j3 = {}
                
                                j3['name'] = res.zhuanyelist[i];
                                j3['value'] = res.claznum[i];
                                j2[0] = j3;
                                j['name'] = res.zhuanyelist[i];
                                j['data'] = j2;


                                _self.servicedata2[i] = j
                                console.log( _self.servicedata2)
                            }    
                            Highcharts.chart('compulsory', _self.setOp2())
                                
                            });
    },

    // tu 2
    setOp2(){
        var _self = this;
        _self.b = _self.a1;
        console.log(this.level)
        return{
           chart: {
        type: 'packedbubble',
        height: '26%'
    },
    credits: {
        enabled: false
    }, //去掉highcharts水印
    grid:{
          bottom:"30px",//组件离容器下侧的距离,百分比字符串或整型数字
    },
    title: {
        text: '学生必修课成绩'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>必修课数目：{point.name}:</b> {point.y}'
    },
    plotOptions: {
        packedbubble: {
            minSize: '80%',
            maxSize: '20%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
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
                },
                
            }
        },
          series:{point:{
                    events:{
                        click:function(e){
                            console.log(e.point.options.name,_self.b,_self.q)
                            _self.a2 = e.point.options.name
                            _self.level = 3; 
                            _self.chart3();
                        }
                    }
                }},
    },
    
    series: _self.servicedata2,
        
    
}
    },
    // 图 3
    chart3(){
        var _self = this
        console.log('图3',_self.a2,_self.b,_self.q)
        api.getScore(_self.a2,_self.b,_self.q).then(res => {
                                let banjilist = [];
                                let scorelist = [];
                                let top_scorelist = [];
                                banjilist = res.banji;
                                scorelist = res.fenshu;
                                top_scorelist = res.top_scorelist;
                                
                                Highcharts.chart('tes',_self.Score(banjilist,scorelist,top_scorelist))
                            });
    },
    // t 3
    Score(banjilist,scorelist,top_scorelist){
        return{
    chart: {
		type: 'column'
    },
    credits: {
        enabled: false
    }, //去掉highcharts水印
    colors:[
        '#60acfc',
        '#516b91',
    ],
	title: {
		text: '各班级分数列表'
	},
	
	xAxis: {
		categories: banjilist
	},
	yAxis: {
		labels: {
			x: -15
		},
		title: {
			text: '项目'
		}
	},
	series: [{
		name: '平均分',
		data: scorelist
    },
    {
		name: '最高分',
		data: top_scorelist
	}],
        }

    },

    // 返回
    re(){
        var _self = this;
        if(_self.level == 2){
            _self.level -= 1
            _self.chart1()
            
        };
        if(_self.level == 3){
            _self.level -= 1
            _self.chart2()
        };
    },
  },
}
</script>