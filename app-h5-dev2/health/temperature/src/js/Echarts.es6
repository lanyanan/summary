'use strict';
/**
 * 图表组件
 * @prop {array} timelist  x轴时间值
 * @prop {array} templist  y轴温度值
 * @prop {number} tabIndex (0,1,2) 1小时 6小时 24小时
 * 
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

export const Echarts = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function() {
        return (
            <section className=' chart-container' id='chart' ref="chart"></section>
        );
    },
    componentDidMount:function () {
        var _this=this;
        setTimeout(function () {
            var getdata=this.props?this.props.getdata:false;
            if(getdata){
                var data=this.props.getdata;
                //console.log(data);
                let today=Funs.dateFormatFull(new Date().getTime()/1000,'-');
                Actions.changeDate(today,data);
            }        
        },1000)
        
    },

    componentWillUpdate:function(nextProps,nextState){
        let now = +new Date();
        let end = 100;
        let start = 0;
        if(this.startTime && nextProps.shield){
            if(now<(this.startTime+60000)){
                return;
            }
        }

        //console.log('start',now,this.startTime,nextProps.shield);
        if(nextProps.timelist instanceof Array && nextProps.timelist.length>0){
            let timelist=nextProps.timelist,
                templist=nextProps.templist,
                thermometerAlert = Number(nextProps.thermometerAlert) || 37.5,
                chartDom =ReactDOM.findDOMNode(this.refs.chart); // dom节点
                //console.log(nextProps,templist);
       
            for(var i=0;i<templist.length;i++){
                if(templist[i] > 42){
                    templist[i] = '42';
                }
            }
            let hourArr = nextProps.timeArray[0].split(':');
            let dataHour = Number(hourArr[0]);
            if(typeof nextProps.tabIndex !== 'undefined'){
                switch(nextProps.tabIndex.toString()){ //1小时 6小时 24小时切换
                    case "0":
                    start = (dataHour/24)*100;
                    end = ((dataHour+1)/24)*100;
                    break;
                    case "1":
                    start = 0;
                    end = 6/24*100;
                    break;
                    case "2":
                    start = 0;
                    end = 100;
                    break;
                }
            }
           
            //setOption设置时间
            setTimeout(function(){
             // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(chartDom);
                var lineoption = {
                    grid:{
                        top:22,
                        left:40,
                        bottom:48,
                        right:30,
                        height:150

                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: true,
                        splitLine: {
                            show:false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#e1e2ea',
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#969696',
                                fontSize:'1.0rem'
                            },
                        },
                        data: timelist 
                    },
                    yAxis: {
                        type: 'value',
                        name:"℃/分",
                        nameLocation:"end",
                        nameGap:8,
                        nameTextStyle:{
                            color:'#9d9d9d'
                        },
                        min:34,
                        max:42,
                        axisLabel: {
                            formatter: function(value,index){
                                return value;
                            },
                            textStyle:{
                                color:'#969696',
                                fontSize:'1.0rem'
                            }
                        }, 
                        splitLine: {
                            show:true,
                            lineStyle:{
                                color:"#696f96",
                                opacity:0.35
                            }
                        },
                        axisLine:{
                            show:false,
                        },
                        axisTick:{
                            show:false
                        },

                    },
                    visualMap: {
                        top: 10,
                        right: 10,
                        show:false,
                        pieces: [{
                            gt: 0,
                            lte: thermometerAlert,
                            color: '#3cc6d1'
                        }, {
                            gt: thermometerAlert,
                            lte: 42,
                            color: '#eb6e4a'
                        }],
                        outOfRange: {
                            color: '#999'
                        }
                    },
                    dataZoom:[{type:'inside',start:start,end:end,zoomLock:true}],
                    series: [{
                        type: 'line',
                        label:{
                            normal:{
                                show:true,
                                position:'top',
                                textStyle:{
                                    color:'#eb6e4a'
                                }
                            }
                        },
                        markLine: {
                            data: [
                                {
                                    name: 'Y 轴值为 100 的水平线',
                                    yAxis: thermometerAlert
                                }
                            ],
                            symbolSize:0,
                            lineStyle:{
                                normal :{type:'solid',color:'#eb6e4a'}
                                
                            },
                        },
                        symbol:'circle',
                        symbolSize:6,
                        itemStyle: {
                            normal: {
                                color:'#eb6e4a'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color:'#3cc6d1',
                                width:3
                            }
                        },
                        data: templist
                    }]
                };
                myChart.setOption(lineoption);


                var startX = 0,startY = 0;
                this.canvasdom = document.querySelector('#chart').querySelector('canvas') || document.querySelector('#chart');
                this.canvasdom.addEventListener('touchstart',(e)=>{
                    startX = Number(e.touches[0].pageX); //页面触点X坐标
                    startY = Number(e.touches[0].pageY); //页面触点Y坐标
                    this.initY = e.touches[0].clientY;
                    this.oriPos= document.body.scrollTop;
                    this.inittime = +new Date();
                })
                this.canvasdom.addEventListener('touchmove',(e)=>{
                    let touch = e.touches[0],
                        moveY = touch.clientY - this.initY,
                        totalY = Math.abs(Number(touch.pageY) - startY),//
                        totalX = Math.abs(Number(touch.pageX) - startX);//
                    let now = +new Date();
                     //判断滑动方向
                    if ( totalY > totalX && now <(this.inittime+100)) {
                        e.stopPropagation();
                        document.body.scrollTop = this.oriPos - moveY;
                    }
                })
            },180);
           
                // console.log('ps',myChart);
        // 绘制图表
         this.startTime = +new Date();
    }
       
    
    }

});