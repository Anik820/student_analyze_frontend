<template>
<div id="collegefreq" style="width:1600px;height:700px;"></div>
</template>
<script>
import online_api from '@/api/online_api'

export default{
    name:"CollegeFreq",
    data() {
        return {
            dataset:[],
            current:0,
            piedata:[],
            yaxis:[],
            cnum:0,
            ynum:0, 
            option: {},
            series:[],
            grades:[],           
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            online_api.getcollegefreq().then(res =>{
                let data=res
                this.dataset[0]=['college']
                this.cnum=data[0].data.length
                this.ynum=data[0].data[0]["年级频次"].length
                this.dnum=data.length
                for(let i=0;i<data[0].data.length;i++){
                    this.dataset[i+1]=[]
                    this.dataset[i+1][0]=data[0].data[i]['学院名称']
                    this.yaxis.push(data[0].data[i]['学院名称'])
                }
                for(let i=0;i<data.length;i++){
                    this.piedata.push([])
                    this.dataset[0].push(data[i]['日期'])
                    for (let k=0;k<this.ynum;k++){
                        this.piedata[i].push([])
                    }
                }
                for(let i=0;i<data.length;i++){
                    for(let j=0;j<this.cnum;j++){
                        this.dataset[j+1][i+1]=data[i].data[j]['总频次']
                        for(let k=0;k<this.ynum;k++){
                            this.piedata[i][k][j]=data[i].data[j]['年级频次'][k]
                        }
                    }
                }
                for(let i=0;i<this.cnum;i++){
                    this.series.push({
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        coordinateSystem: 'cartesian2d',
                        tooltip: {
                            show: true,
                        }
                    })
                }
                this.grades=['大一','大二','大三','大四']
                for(var i=0;i<this.ynum;i++){
                    this.series.push({
                        type:'bar',
                        data:this.piedata[0][i],
                        name:this.grades[i],
                        coordinateSystem: 'polar',
                        stack: 'a',
                        tooltip: {
                            show: false
                        }
                    })
                }
                this.option={
                    title:{
                        text:this.dataset[0][1]
                    },
                    axisPointer:{
                        show:true,
                        z:100
                    },
                    legend:{
                        show:true,
                        data:this.grades,
                        left: '13%'
                    },
                    tooltip:{
                        trigger: 'axis',
                        position: ['90%','7.5%'],
                    },
                    dataset:{
                        source: this.dataset
                    },
                    grid:[
                        {
                            left: '50%',
                            top: '8%'
                        },
                    ],
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            showDetail: false,
                            realtime: true,
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 0,
                            end: 100
                        }
                    ],
                    xAxis:{
                        type: 'category',
                        name: '日期',
                        axisPointer:{
                            show:true,
                        },
                        gridIndex:0
                    },
                    yAxis: {
                        axisPointer:{
                            show:true
                        },
                        name: '访问频次',
                        gridIndex:0
                    },
                    angleAxis: {
                        type:'category',
                        data: this.yaxis,
                        girdIndex:1
                    },
                    radiusAxis:{
                        gridIndex: 1
                    },
                    polar: {
                        center: ['24%','51%']
                        },
                    series: this.series
                }
                let chart = this.$echarts.init(document.getElementById('collegefreq')) 
                chart.setOption(this.option)
                chart.on('updateAxisPointer',event => {
                    if(event.dataIndex){
                        if(event.dataIndex && event.dataIndex!=this.current){
                            this.current=event.dataIndex
                            this.option.title.text=this.dataset[0][this.current+1]
                            for(let i=0;i<this.dnum;i++){
                                this.option.series[this.cnum+i].data=this.piedata[this.current][i]
                            }
                            chart.setOption(this.option,true)
                        }
                    }
                })
            })
        }
    }
}
</script>