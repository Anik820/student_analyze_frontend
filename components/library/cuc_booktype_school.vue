<template>
 
  <div id="booktype" style="width:100%;height:500px"></div>
 
</template>

<script>
import api from "../../api/library_api"
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);
export default {
  data() {
    return {
      
      A1data:[],
      A2data:[],
      A3data:[],
      A4data:[],
      A5data:[],
      A6data:[],
      A7data:[],
      A8data:[],
      A9data:[],
      A10data:[],
      A11data:[],
      
    };
  },
  mounted() {
    
    this.init();
    //窗口自适应
    const that = this
		    window.onresize = () => {//  根据窗口大小调整曲线大小
		    let chart = this.$echarts.init(document.getElementById('borrow'));
		     chart.resize();
		    }
    
  },
  methods: {
    init() {
       //窗口自适应
        window.onresize = function(){
            chart.resize();
            //myChart1.resize();    //若有多个图表变动，可多写
        
        }
      api.getbooktype().then(res => {

        for(let i=0;i<res.A1.length;i++){
                        let obj=new Object();
                        obj.name=res.A1[i];
                        obj.value=res.A11[i];
                        this.A1data[i]=obj;
                    }
        
        for(var i=0;i<res.A2.length;i++){
                        var obj=new Object();
                        obj.name=res.A2[i];
                        obj.value=res.A22[i];
                        this.A2data[i]=obj;
                    }
        console.log(this.A2data)
        for(var i=0;i<res.A3.length;i++){
                        var obj=new Object();
                        obj.name=res.A3[i];
                        obj.value=res.A33[i];
                        this.A3data[i]=obj;
                    }
        for(var i=0;i<res.A4.length;i++){
                        var obj=new Object();
                        obj.name=res.A4[i];
                        obj.value=res.A44[i];
                        this.A4data[i]=obj;
                    }
        for(var i=0;i<res.A5.length;i++){
                        var obj=new Object();
                        obj.name=res.A5[i];
                        obj.value=res.A55[i];
                        this.A5data[i]=obj;
                    }
        for(var i=0;i<res.A6.length;i++){
                        var obj=new Object();
                        obj.name=res.A6[i];
                        obj.value=res.A66[i];
                        this.A6data[i]=obj;
                    }
        for(var i=0;i<res.A7.length;i++){
                        var obj=new Object();
                        obj.name=res.A7[i];
                        obj.value=res.A77[i];
                        this.A7data[i]=obj;
                    }
        for(var i=0;i<res.A8.length;i++){
                        var obj=new Object();
                        obj.name=res.A8[i];
                        obj.value=res.A88[i];
                        this.A8data[i]=obj;
                    }
        for(var i=0;i<res.A9.length;i++){
                        var obj=new Object();
                        obj.name=res.A9[i];
                        obj.value=res.A99[i];
                        this.A9data[i]=obj;
                    }
        for(var i=0;i<res.A10.length;i++){
                        var obj=new Object();
                        obj.name=res.A10[i];
                        obj.value=res.A100[i];
                        this.A10data[i]=obj;
                    }
        for(var i=0;i<res.A110.length;i++){
                        var obj=new Object();
                        obj.name=res.A110[i];
                        obj.value=res.A111[i];
                        this.A11data[i]=obj;
                    }
                    console.log(this.A11data)



         Highcharts.chart('booktype', {
           chart: {
        type: 'packedbubble',
        height: '500px'
    },
    
    title: {
        text: '全校学生借阅书籍偏好'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.y}'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.0000000001
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
                }
            }
        }
    },
    
    series: [{

        name:'A1',
        data:this.A1data

    },
    {

        name:'A2',
        data:this.A2data

    },
    {

        name:'A3',
        data:this.A3data

    },
     {

        name:'A4',
        data:this.A4data

    },
     {

        name:'A5',
        data:this.A5data

    },
    {

        name:'A6',
        data:this.A6data

    },
    {

        name:'A7',
        data:this.A7data

    },
    {

        name:'A8',
        data:this.A8data

    },
    {

        name:'A9',
        data:this.A9data

    },
    {

        name:'A10',
        data:this.A10data

    },
    {

        name:'A11',
        data:this.A11data

    }


    ]
});
      });
    },
    
    
  }
};
</script>