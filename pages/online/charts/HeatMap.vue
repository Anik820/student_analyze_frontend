<template>
<div>
<col>
<div id="bubble1" style="width:32%;height:700px;float:left"></div>
</col>
<col>
<div id="heatmap" style="width:33%;height:700px;float:left;"></div>
</col>
<col>
<div id="bubble2" style="width:33%;height:700px;float:left"></div>
</col>
</div>
</template>
<script>
import api from '@/api/api'

export default{
    name:"HeatMap",
    data() {
        return {
            buildingpath:[],
            building:[],
            buildingname:[],
            showbuilding:[],
            data:[],
            maxs:[],
            sums:[],
            limit:20000,
            currentindex:0,
            option:{},
            bubble1option:{},
            bubble2option:{},
            data1:[],
            data2: [],
            data3:[],
            data4:[],
            data5:[],
            data6:[],
            data7:[]
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        mapwavecolor(data){
            let wavecolor=['#cbdd9e','#EE7942','#8B0000']
            if(data<0.4){
			    return wavecolor[0]
		    }
	        else if(data>0.8){
			    return wavecolor[2]
		    }
	        else{
			    return wavecolor[1]
		    }
        },
        mapbgcolor(data){
            let bgcolor=['#ffffff','#ffffff','#ffffff']
            if(data<0.4){
                    return bgcolor[0]
            }
            else if(data>0.8){
                    return bgcolor[2]
            }
            else{
                    return bgcolor[1]
            }            
        },
        init(){
            api.getbuildingcoord().then(res => {                
                this.buildingcoord=res.data
                for (let b in this.buildingcoord){
                    this.buildingname.push(b)
                }                            
            })
            api.getheatmap('2019-01-07').then(res => {
                let rawdata=res
                this.data=[[],[],[],[],[]]
                let count=0
                for (let j=0;j<5;j++){
                    let max=0
                    let sum=0
                    for (let i in rawdata.data[j]){
                        if(max<rawdata.data[j][i]){
                            max=rawdata.data[j][i]
                        }

                        if(count%2==0){
                            this.data[j].push([
                                this.buildingcoord[i][0],
                                this.buildingcoord[i][1],
                                rawdata.data[j][i]
                            ])
                            sum+=rawdata.data[j][i]
                        }
                        else{
                            this.data[j].push([
                                this.buildingcoord[i][0],
                                this.buildingcoord[i][1],
                                rawdata.data[j][i]/10
                            ])
                            sum+=rawdata.data[j][i]/10
                        }
                        count++
                    }
                    this.maxs.push(max)
                    count++
                    this.sums.push(sum)
                }     
                this.data1=[rawdata.data[0]["图书馆"],rawdata.data[1]["图书馆"],rawdata.data[2]["图书馆"],rawdata.data[3]["图书馆"],rawdata.data[4]["图书馆"]]
                this.data2=[rawdata.data[0]["北苑餐厅"],rawdata.data[1]["北苑餐厅"],rawdata.data[2]["北苑餐厅"],rawdata.data[3]["北苑餐厅"],rawdata.data[4]["北苑餐厅"]]
                this.data3=[rawdata.data[0]["立德楼"],rawdata.data[1]["立德楼"],rawdata.data[2]["立德楼"],rawdata.data[3]["立德楼"],rawdata.data[4]["立德楼"]]
                this.data4=[rawdata.data[0]["明德楼"],rawdata.data[1]["明德楼"],rawdata.data[2]["明德楼"],rawdata.data[3]["明德楼"],rawdata.data[4]["明德楼"]]
                this.data5=[rawdata.data[0]["主楼"],rawdata.data[1]["主楼"],rawdata.data[2]["主楼"],rawdata.data[3]["主楼"],rawdata.data[4]["主楼"]]
                this.data6=[rawdata.data[0]["22号综合实验楼"],rawdata.data[1]["22号综合实验楼"],rawdata.data[2]["22号综合实验楼"],rawdata.data[3]["22号综合实验楼"],rawdata.data[4]["22号综合实验楼"]]
                this.data7=[rawdata.data[0]["博学楼"],rawdata.data[1]["博学楼"],rawdata.data[2]["博学楼"],rawdata.data[3]["博学楼"],rawdata.data[4]["博学楼"]]           
                this.buildingpath={
                    '图书馆': 'M167.239,380.469l-89.333-12l-31.333,15.334v61.333l124.667,4v-16.279 l72-3.055l-4.667,13.334l8.667,0.666v5.334h155.333c0,0,0.667-7.334-19.333-11.334s-10.667-4.945-10.667-4.945l2-7.055l213.334-4 l-14-116l-211.334-34.667l3.334,8l1.333,3.333l-119.333,14l-10-3.333l-6,6.667l-48,4L167.239,380.469z',
                    '北苑餐厅':'M560.29,459l-6.5-47.5l5-6l-5-2.5l-6-36l3-1.5l-1-4.5l-4-2l-1.5-17h3l-2.5-6h-15.5l-10.5-66.5l20.5-17.5l-0.5-11l-16.5-15.5H286.03c-0.63,0.31-1.38,0.5-2.25,0.5c-0.87,0-1.62-0.19-2.25-0.5H89.79l-17,16.5v10l19.5,17.5L82.54,336H66.79v7h3l-3,17h-5.5v5l4,2.5l-6.5,35l-6,3.5l5,5.5l-5,47h-6l-3.07,16.25c0.35,0.69,0.51,1.45,0.52,2.25h524.05v-17L560.29,459z',
                    '立德楼':'M-63.5,227l10,9h57l6-4.5l10,10.5h218l-7-27l7-8l7,5l9.99,0.09L352.5,213l4-6l9,8l-6,27h215l11-11l7,6l54-1l14-11.5V246l-5,7l17,235h-745l15-236l-6-8V227z',
                    '明德楼':'M78,637.5h38v-531h35v-21h33v8h199v-8h30v21l38,1v530h39v69H78V637.5z',
                    '主楼': 'M-223,104H74c0,0-4-71,271-71v-180h6V33c0,0,249,4,249,71h314v665H-223V104z',
                    '22号综合实验楼':'M135,1160h54v-82h-27v-21h494v22l-23,1v81l52-1v684H135C135,1160,135,1160,135,1160z',
                    '博学楼':'M-278,1133h39v-15h354c0,0-1-22,10-22v-35h5v36c0.13,0.11,11.15-4.87,11,19h154c0,0,3.5-27.5,12-19v-36h5v36c0,0,11-1,12,19l339,1v16h35v53h-13v836h-945v-837h-18V1133z',
                    '吉祥物':'M486.26,344c-0.62-0.1-0.98-0.24-1.33-0.2c-1.24,0.15-2.47,0.32-3.69,0.56c-11.78,2.38-22.48,0.68-30.86-8.7c-3.4-3.8-6.76-7.77-9.36-12.13c-6.57-11.05-12.6-22.42-19.06-33.53c-1.87-3.21-1.34-5.84-0.19-9.11c3.2-9.16,6.82-18.33,8.59-27.8c4.28-22.84-0.45-44.87-9.05-65.96c-13.12-32.16-33.56-58.92-61.83-79.32c-14.4-10.39-29.42-19.7-46.8-24.7c-8.24-2.37-16.1-6.06-24.13-9.16c-3.03-1.17-3.75-2.99-1.7-5.72c0.82-1.09,1.69-2.25,2.1-3.52c0.3-0.93,0.22-2.33-0.31-3.08c-0.34-0.48-1.89-0.4-2.76-0.12c-1.03,0.33-2.04,1.01-2.83,1.77c-1.91,1.82-3.82,2.08-6.44,1.35c-3.57-0.99-7.29-1.39-10.51,1.6c-1.16,1.07-2.97,1.44-4.48,2.13c-0.08-0.16-0.17-0.32-0.25-0.48c1.45-1.72,2.89-3.43,4.34-5.15c-0.19-0.29-0.39-0.57-0.58-0.86c-2.86,0.72-5.8,1.22-8.58,2.19c-15.8,5.51-31.57,11.1-47.32,16.74c-6.58,2.36-12.95,5.38-19.65,7.33c-24.63,7.16-46.78,18.68-65.56,36.3c-16.55,15.53-30.89,32.96-44.2,51.28c-10.3,14.18-19.71,28.87-26.93,44.88c-9.95,22.05-13.25,45.45-13.55,69.39c-0.17,12.99-0.37,26.07,3.55,38.65c1.4,4.5,1.54,8.62,0.6,13.16c-1.16,5.6-1.71,11.34-2.43,17.03c-0.37,2.9-0.13,5.93-0.86,8.72c-3.38,12.99-5.73,26.1-5.51,39.58c0.17,10.74,2.59,20.79,8.95,29.64c2.92,4.06,3.04,5.02-1.01,7.82c-11.61,8.04-24.41,11.09-38.39,8.26c-2.59-0.52-5.19-1.22-6.22,2.05c-1.07,3.4,1.69,4.26,4.09,5.07c4.49,1.51,9.03,2.91,13.53,4.4c13.29,4.4,26.5,5.13,39.3-1.5c4.97-2.57,9.82-5.49,14.35-8.78c2.66-1.92,3.85-1.71,5.47,0.97c4.63,7.66,10.6,14.19,17.6,19.76c2.09,1.66,2.97,3.66,2.19,6.25c-0.57,1.9-1.04,3.88-1.9,5.65c-3.8,7.82-9.95,13.27-17.54,17.33c-1.21,0.65-2.4,2.3-2.55,3.6c-0.09,0.81,1.73,2.49,2.85,2.66c14.97,2.17,29.89,3.23,43.9-4.38c3.68-2,7.33-4.05,11.47-6.34c1.54,7.58,6.9,13.56,5.41,21.54c-0.2,1.07,1.44,2.49,2.23,3.74c1.19-0.87,2.53-1.59,3.52-2.65c1.08-1.15,1.84-2.61,2.73-3.94c3.32-4.96,6.64-9.92,9.94-14.89c0.58-0.88,1.05-1.83,1.73-3.01c5.36,4.17,7.05,9.68,8.34,15.47c0.36,1.63,1.3,3.13,2.08,4.95c4.85-3.9,9.41-6.85,10.79-12.62c0.12-0.52,2.09-1.04,3.08-0.86c18.88,3.38,37.94,4.52,57.07,4.88c2.04,0.04,4.07,0.32,6.37,0.51c-0.3,1.19-0.42,1.79-0.6,2.36c-3.94,12.22-8.29,24.32-11.75,36.67c-5.66,20.21-10.57,40.62-10.89,61.79c-0.16,10.61-1.86,20.88-6.92,30.3c-5.01,9.31-10.25,18.5-15.55,27.65c-3.74,6.46-7.76,12.76-11.64,19.14c-1.45,2.38-0.88,4.21,1.51,5.61c11.53,6.74,22.92,13.71,34.6,20.18c12.26,6.79,25.73,10.14,39.41,12.74c1.88,0.36,3.71,0.94,6.76,1.73c-9.34,7.16-17.71,13.56-26.07,19.98c-2.46,1.88-4.46,1.32-6.53-0.83c-8.55-8.88-17.18-17.7-25.85-26.47c-0.81-0.81-2.34-1.69-3.27-1.46c-3.86,0.94-8.31,0.66-10.95,4.6c-1.18,1.76-2.56,3.38-3.7,5.16c-4.99,7.76-8.33,16.2-9.97,25.27 c-0.52,2.87,0.24,6.1,3.49,5.75c4.09-0.43,8.89-0.49,11.46-4.89c2.52-4.31,5.01-8.63,7.38-13.02c1.87-3.46,3.53-7.03,5.5-10.99 c1.45,1.19,2.56,1.95,3.49,2.9c5.57,5.72,11.17,11.42,16.63,17.25c5.89,6.27,10.07,6.91,16.89,1.71 c8.43-6.43,16.83-12.93,24.88-19.83c3.71-3.18,7.25-3.73,11.95-3.25c16.13,1.68,32.32,3.86,48.49,3.91 c25.23,0.08,49.91-4.89,74.2-11.59c1.74-0.48,3.51-0.87,5.77-1.44c-0.11,1.83-0.08,3.04-0.26,4.22 c-3.07,19.98-8.93,39.19-16.46,57.89c-1.57,3.91-4.7,7.19-7.25,10.97c-1.6-1.37-2.59-2.29-3.66-3.12c-3.6-2.77-7.42-2.33-9.46,1.69 c-1.15,2.26-1.95,5.44-1.3,7.75c2.25,8.04,5,15.96,8.02,23.75c0.98,2.53,3.03,4.99,5.24,6.58c1.78,1.27,5.13,2.25,6.71,1.39 c1.78-0.98,3.48-4.28,3.25-6.35c-0.77-7.14-2.42-14.18-3.68-21.26c-0.22-1.25-0.81-3.23-0.23-3.72 c5.47-4.71,8.02-11.13,10.43-17.53c7.52-19.92,13.89-40.14,14.86-61.64c0.1-2.2,0.87-3.3,2.96-4.08c5.02-1.88,9.92-4.11,14.9-6.1 c5.29-2.11,10.59-4.19,15.95-6.11c6.1-2.19,12.31-4.07,18.39-6.3c4.67-1.72,9.17-3.91,13.84-5.65c4.55-1.7,7.31-5.17,9.38-9.21 c0.51-1-0.01-2.95-0.7-4.07c-2.22-3.58-4.89-6.87-7.07-10.47c-0.9-1.49-1.21-3.46-1.38-5.26c-0.29-2.97,0.02-6-0.39-8.94 c-2.02-14.3-6.23-27.99-11.31-41.48c-2.04-5.41-2.24-11.55-4.52-16.81c-3.66-8.45-8.04-16.64-12.67-24.62 c-8.8-15.16-18.77-29.58-31.8-41.46c-17.13-15.63-36.06-28.8-57.38-38.1c-8.96-3.91-18.41-6.72-27.64-10 c-1.83-0.65-3.7-1.16-6.15-1.91c1.05-1.25,1.59-2.02,2.25-2.67c7.2-7.09,14.57-14,21.53-21.3c2.46-2.58,4.11-3.47,6.79-0.64 c1.08,1.15,2.68,1.81,4.03,2.7c9.42,6.23,19.84,6.13,30.38,4.51c4.23-0.65,5.15-4.12,2.4-7.51c-1.1-1.36-2.46-2.54-3.37-4.01 c-1.98-3.18-3.75-6.49-5.6-9.75c0.49-0.34,0.99-0.68,1.48-1.03c2.05,2.37,4.1,4.75,6.47,7.5c0.41-1.34,1.05-2.55,1.09-3.77 c0.25-6.73,0.47-13.47,0.46-20.21c0-2.39,0.72-3.48,3.06-4.27c3.4-1.13,6.9-2.45,9.84-4.45c17.06-11.64,27.66-27.42,29.74-48.3 c0.29-2.92,1.1-3.56,3.93-2.92c5.65,1.27,11.18,0.37,16.47-1.94C474.31,361.32,480.44,353.1,486.26,344z'
                }
                this.showbuilding=['图书馆','北苑餐厅','立德楼','明德楼','主楼','22号综合实验楼','博学楼']

                this.option={
                    baseOption:{
                        title:{
                            textStyle:{
                                fontWeight:'bold',
                                fontSize: 18,				
                            }
                        },
                        animation: false,
                        tooltip:{
                            trigger: 'item'
                        },
                        timeline: {
                            buttom:0,
                            right:0,
                            // y: 0,
                            axisType: 'category',
                            // realtime: false,
                            // loop: false,
                            autoPlay: true,
                            // currentIndex: 2,
                            playInterval: 3000,
                            padding:[0,0,5,5],
                            // controlStyle: {
                            //     position: 'left'
                            // },
                            data: [
                                '8:00','12:00','14:00','17:00','19:00'
                            ],
                            label: {
                                show:false,
                                formatter : function(s) {
                                    return s
                                }
                            }
                        },
                        bmap: {
                            center: [116.564383,39.91856],
                            zoom: 17.5,
                            roam: true,	
                            top:30			
                        },
                        visualMap: {
                            type:'continuous',
                            show: false,
                            top: 'top',
                            min: 0,
                            max: 250,
                            seriesIndex: 0,
                            calculable: true,
                            inRange: {
                                color: ['purple', 'blue', '#cbdd9e', '#ffe800', '#cc3300']
                            }
                        },
                        series: [{
                            type: 'heatmap',
                            coordinateSystem: 'bmap',
                            pointSize: 25,
                            blurSize: 8,
                        }]
                    },
                    options: [
                        {
                            title:{text: '8:00-12:00'},
                            visualMap:{
                                max: this.maxs[0]
                            },
                            series:[{
                                data: this.data[0]
                            }]
                        },
                        {
                            title:{text: '12:00-14:00'},
                            visualMap:{
                                max: this.maxs[1]
                            },
                            series:[{
                                data: this.data[1]
                            }]
                        },
                        {
                            title:{text: '14:00-17:00'},
                            visualMap:{
                                max: this.maxs[2]
                            },
                            series:[{
                                data: this.data[2]
                            }]
                        },
                        {
                            title:{text: '17:00-19:00'},
                            visualMap:{
                                max: this.maxs[3]
                            },
                            series:[{
                                data: this.data[3]
                            }]
                        },
                        {
                            title:{text: '19:00-23:00'},
                            visualMap:{
                                max: this.maxs[4]
                            },
                            series:[{
                                data: this.data[4]
                            }]
                        }
                    ]
                }
                this.bubble1option={
                    title:[
                    {
                        text:'中国传媒大学',
                    },
                    {
                        text:"校园",
                        top:'8%',
                        left:'20%',
                    },
                    {
                        text:'图书馆',
                        top:'8%',
                        left:'65%',
                    },   
                    {
                        text:"明德楼",
                        top:'43%',
                        left:'19%',
                    },
                    {
                        text:'主楼',
                        top:'43%',
                        left:'66%',
                    },                     
                    ],
                    series:[
                    {
                        title:{
                            text:"校园"
                        },
                        type: 'liquidFill',
                        data: [{
                            value: this.sums[0]/this.limit,
                            itemStyle: {
                                shadowblur:0,
                                shadowColor: '#ffffff',
                                color: this.mapwavecolor(this.sums[this.currentindex]/this.limit),
                                opacity:0.6
                            }
                        }],
                        radius: '35%',
                        amplitude: '3%',
                        center:['23%','25%'],
                        //animationEasing: 'none',
                        animationDuration: 0,
                        animationDurationUpdate: 50,
                        shape:'path://'+this.buildingpath['吉祥物'],
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#8B6969',
                            color: this.mapbgcolor(this.sums[this.currentindex]/this.limit),
                            opacity:0.6
                        },
                        outline: {
                            show: false
                        },
                        label: {
                            color:'#2F4F4F',
                            fontSize: 20
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value:this.data1[0]/500,
                            itemStyle: {
                                shadowblur:0,
                                shadowColor: '#ffffff',
                                color: this.mapwavecolor(this.data1[this.currentindex]/500),
                                opacity: 0.6
                            }
                        }],
                        radius: '50%',
                        amplitude: '3%',
                        center:['70%','25%'],
                        //animationEasing: 'none',
                        animationDuration: 0,
                        animationDurationUpdate: 50,
                        shape:'path://'+this.buildingpath['图书馆'],
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#8B3E2F',
                            color: this.mapbgcolor(this.data1[this.currentindex]/500),
                            opacity:0.6
                        },
                        outline: {
                            show: false
                        },
                        label: {
                            color:'#2F4F4F',
                            fontSize: 20
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value:this.data4[0]/500,
                            itemStyle:{
                                shadowblur:0,
                                shadowColor: '#ffffff',
                                color: this.mapwavecolor(this.data4[this.currentindex]/500),
                                opacity: 0.6
                            }
                        }],
                        radius: '40%',
                        amplitude: '3%',
                        center:['26%','65%'],
                        //animationEasing: 'none',
                        animationDuration: 0,
                        animationDurationUpdate: 50,
                        shape:'path://'+this.buildingpath['明德楼'],
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#8B3E2F',
                            color: this.mapbgcolor(this.data4[this.currentindex]/500),
                            opacity:0.6
                        },
                        outline: {
                            show: false
                        },
                        label: {
                            color:'#2F4F4F',
                            fontSize: 20
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value:this.data5[0]/500,
                            itemStyle: {
                                shadowblur:0,
                                shadowColor: '#ffffff',
                                color: this.mapwavecolor(this.data5[this.currentindex]/500),
                                opacity: 0.6
                            }
                        }],
                        radius: '40%',
                        amplitude: '3%',
                        center:['71%','68%'],
                        //animationEasing: 'none',
                        animationDuration: 0,
                        animationDurationUpdate: 50,
                        shape:'path://'+this.buildingpath['主楼'],
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#8B3E2F',
                            color: this.mapbgcolor(this.data5[this.currentindex]/500),
                            opacity:0.6
                        },
                        outline: {
                            show: false
                        },
                        label: {
                            color:'#2F4F4F',
                            fontSize: 20
                        }
                    },                    
                    ]
                }
                this.bubble2option={
                    title:[
                    {
                        text:'北苑餐厅',
                        top:'8%',
                        left:'12%',
                    },
                        {
                        text:'立德楼',
                        top:'8%',
                        left:'65%',
                    },
                    {
                        text:'综合楼',
                        top:'43%',
                        left:'16%',
                    },
                        {
                        text:'博学楼',
                        top:'43%',
                        left:'65%',
                    },
                        ],
                    series: [
                    {		
                        type: 'liquidFill',
                        data: [{
                            value: this.data2[0]/500,
                            itemStyle: {
                                shadowblur:0,
                                shadowColor: '#ffffff',
                                color: this.mapwavecolor(this.data2[this.currentindex]/500),
                                opacity:0.6
                            }
                        }],
                        radius: '40%',
                        amplitude: '3%',
                        center:['22%','25.5%'],
                        //animationEasing: 'none',
                        animationDuration: 0,
                        animationDurationUpdate: 50,
                        shape:'path://'+this.buildingpath['北苑餐厅'],
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#8B3E2F',
                            color: this.mapbgcolor(this.data2[this.currentindex]/500),
                            opacity:0.6
                        },
                        outline: {
                            show: false
                        },
                        label: {
                            color:'#2F4F4F',
                            fontSize: 20
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value: this.data3[0]/500,
                            itemStyle: {
                                shadowblur:0,
                                shadowColor: '#ffffff',
                                color: this.mapwavecolor(this.data3[this.currentindex]/500),
                                opacity: 0.6
                            }
                        }],
                        radius: '55%',
                        amplitude: '3%',
                        center:['72%','25%'],
                        //animationEasing: 'none',
                        animationDuration: 0,
                        animationDurationUpdate: 50,
                        shape:'path://'+this.buildingpath['立德楼'],
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#8B3E2F',
                            color: this.mapbgcolor(this.data3[this.currentindex]/500),
                            opacity:0.6
                        },
                        outline: {
                            show: false
                        },
                        label: {
                            color:'#2F4F4F',
                            fontSize: 20
                        }
                    },
                    {	
                        type: 'liquidFill',
                        data: [{
                            value:this.data6[0]/500,
                            itemStyle: {
                                shadowblur:0,
                                shadowColor: '#ffffff',
                                color: this.mapwavecolor(this.data6[this.currentindex]/500),
                                opacity: 0.6
                            }
                        }],
                        radius: '40%',
                        amplitude: '3%',
                        center:['23%','65%'],
                        //animationEasing: 'none',
                        animationDuration: 0,
                        animationDurationUpdate: 50,
                        shape:'path://'+this.buildingpath['22号综合实验楼'],
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#8B3E2F',
                            color: this.mapbgcolor(this.data6[this.currentindex]/500),
                            opacity:0.6
                        },
                        outline: {
                            show: false
                        },
                        label: {
                            color:'#2F4F4F',
                            fontSize: 20
                        }
                    },
                    {
                        type: 'liquidFill',
                        data: [{
                            value:this.data7[0]/500,
                            itemStyle: {
                                shadowblur:0,
                                shadowColor: '#ffffff',
                                color: this.mapwavecolor(this.data7[this.currentindex]/500),
                                opacity: 0.6
                            }
                        }],
                        radius: '40%',
                        amplitude: '3%',
                        center:['72%','65%'],
                        //animationEasing: 'none',
                        animationDuration: 0,
                        animationDurationUpdate: 50,
                        shape:'path://'+this.buildingpath['博学楼'],
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#8B3E2F',
                            color: this.mapbgcolor(this.data7[this.currentindex]/500),
                            opacity:0.6
                        },
                        outline: {
                            show: false
                        },
                        label: {
                            color:'#2F4F4F',
                            fontSize: 20
                        }
                    },
                    ]
                }
                let chart = this.$echarts.init(document.getElementById('heatmap'))
                let bubble1chart = this.$echarts.init(document.getElementById('bubble1'))
                let bubble2chart = this.$echarts.init(document.getElementById('bubble2'))
                console.log(this.option)
                chart.setOption(this.option)	

                chart.on('timelinechanged',index =>{
                    this.currentindex=index.currentIndex
                    this.bubble1option.series[0].data[0].value=this.sums[this.currentindex]/this.limit
                    this.bubble1option.series[0].data[0].itemStyle.color=this.mapwavecolor(this.sums[this.currentindex]/this.limit)
                    this.bubble1option.series[0].backgroundStyle.color=this.mapbgcolor(this.sums[this.currentindex]/this.limit)
                    this.bubble1option.series[1].data[0].value=this.data1[this.currentindex]/500
                    this.bubble1option.series[1].data[0].itemStyle.color=this.mapwavecolor(this.data1[this.currentindex]/500)
                    this.bubble1option.series[1].backgroundStyle.color=this.mapbgcolor(this.data1[this.currentindex]/500)
                    this.bubble2option.series[0].data[0].value=this.data2[this.currentindex]/500
                    this.bubble2option.series[0].data[0].itemStyle.color=this.mapwavecolor(this.data2[this.currentindex]/500)
                    this.bubble2option.series[0].backgroundStyle.color=this.mapbgcolor(this.data2[this.currentindex]/500)
                    this.bubble2option.series[1].data[0].value=this.data3[this.currentindex]/500
                    this.bubble2option.series[1].data[0].itemStyle.color=this.mapwavecolor(this.data3[this.currentindex]/500)
                    this.bubble2option.series[1].backgroundStyle.color=this.mapbgcolor(this.data3[this.currentindex]/500)
                    this.bubble1option.series[2].data[0].value=this.data4[this.currentindex]/500
                    this.bubble1option.series[2].data[0].itemStyle.color=this.mapwavecolor(this.data4[this.currentindex]/500)
                    this.bubble1option.series[2].backgroundStyle.color=this.mapbgcolor(this.data4[this.currentindex]/500)
                    this.bubble1option.series[3].data[0].value=this.data5[this.currentindex]/500
                    this.bubble1option.series[3].data[0].itemStyle.color=this.mapwavecolor(this.data5[this.currentindex]/500)
                    this.bubble1option.series[3].backgroundStyle.color=this.mapbgcolor(this.data5[this.currentindex]/500)
                    this.bubble2option.series[2].data[0].value=this.data6[this.currentindex]/500
                    this.bubble2option.series[2].data[0].itemStyle.color=this.mapwavecolor(this.data6[this.currentindex]/500)
                    this.bubble2option.series[2].backgroundStyle.color=this.mapbgcolor(this.data6[this.currentindex]/500)
                    this.bubble2option.series[3].data[0].value=this.data7[this.currentindex]/500
                    this.bubble2option.series[3].data[0].itemStyle.color=this.mapwavecolor(this.data7[this.currentindex]/500)
                    this.bubble2option.series[3].backgroundStyle.color=this.mapbgcolor(this.data7[this.currentindex]/500)
                    bubble2chart.setOption(this.bubble2option,true)
                    bubble1chart.setOption(this.bubble1option,true)
                })
                bubble1chart.setOption(this.bubble1option)     
                bubble2chart.setOption(this.bubble2option)       
            })           
        }
    }
}

</script>