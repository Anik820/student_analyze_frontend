<template>
    <div>
        <div id='collegedrill' style="height:350px;width:100%;">
            <!-- <chart :options="testoptions()" style="width:750px;height:600px"></chart> -->
        </div>
        <i-button type="dashed" icon="ios-arrow-back" id="return-button" @click="charts()">Back</i-button>
    </div>
</template>

<script>
import api from "../../api/library_api"

export default {
  data() {
    return {
      echartdata: [],
      xAxis_data: [],
      legend_data: [],
      series_data: [],
      attribute: [],
      drilldata: []
    };
  },
  mounted() {
    this.init();
    console.log(this.echartdata);
    //窗口自适应
    const that = this
		    window.onresize = () => {//  根据窗口大小调整曲线大小
		    let chart = this.$echarts.init(document.getElementById('collegedrill'));
		     chart.resize();
		    }

  },
  methods: {
    init(){
        this.charts()
    },
    charts() {
        let chart =  this.$echarts.init(document.getElementById("collegedrill"));
        api.getcollege_borrow_drill(2016, 1).then(res => {
        
            let servicedata =[];
            this.attribute = res.college;
            for (var i = 0; i < res.college.length; i++) {
                var obj = new Object();
                obj.name = res.college[i];
                obj.value = res.borrownum[i];
                servicedata[i] = obj;
            }
            console.log(servicedata)

            this.legend_data = servicedata.name;
            this.xAxis_data = this.attribute;
            this.series_data = servicedata;
            chart.setOption(this.testoptions());
            chart.resize();
            
            chart.on('click', (object) => {
                chart.dispose(collegedrill);
                chart =  this.$echarts.init(document.getElementById("collegedrill"));
                let data = object.name;
                
                api.getcollege_borrow_drill(2016,data).then(res =>{
            
                    let servicedata =[];
                    
                    for (var i = 0; i < res.major.length; i++) {
                        
                        var obj = new Object();
                        obj.name = res.major[i];
                        
                        obj.value = res.borrownum[i];
                        servicedata[i] = obj;
                }
  
                
                this.drilldata[0] = servicedata.name
                this.drilldata[1] = res.major
                this.drilldata[2] = servicedata
                chart.setOption(this.test2options(this.drilldata))
                chart.resize();
                console.log(this.drilldata[1])
                })
                
            });
      });
      
    },
    testoptions() {
      return {
                color: ['#7fbcfc'],
                title: {
                    text: '各学院图书借阅数',
                    x: 'center'
                },
                tooltip: {},
                legend: {
                    x:'20px',
                    y: 'top',
                    data: this.legend_data
                },
                xAxis: {
                    data: this.xAxis_data,
                    
                    axisLabel: {
                        formatter:function(value){
                            return value.split("").join("\n");
                        },
                        inside:true,
                        interval: 0,
                        // rotate: 45,
                        //                                                                   formatter:function(val){
                        //
                        // return val.split("").join("\n");

                        // }  ,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#666'
                        }
                    }

                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [{
                    name: '图书借阅数',
                    type: 'bar',
                    data: this.series_data,
                    barGap: 10,
                    areaStyle: {}
                }]
            };
    },
    test2options(drilldata) {
      return {
                color: ['#ffdb5c'],
                title: {
                    text: '各专业图书借阅数',
                    x: 'center'
                },
                tooltip: {},
                legend: {
                    x:'20px',
                    y: 'top',

                    data: drilldata[0]
                },
                xAxis: {
                    data: drilldata[1],
                    
                    axisLabel: {
                        formatter:function(value){
                            return value.split("").join("\n");
                        },
                        inside:true,
                        interval: 0,
                        // rotate: 90,
                        //                                                                   formatter:function(val){
                        //
                        // return val.split("").join("\n");

                        // }  ,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#666'
                        }
                    }

                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [{
                    name: '图书借阅数',
                    type: 'bar',
                    data: drilldata[2],
                    barGap: 10,
                    areaStyle: {}
                }]
      };

      
    }
  },
};
</script>