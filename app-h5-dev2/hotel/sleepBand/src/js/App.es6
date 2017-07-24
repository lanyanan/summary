// import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
// import {Store} from './Store.es6';
import Highcharts from 'highcharts';
import CalendarControl from './CalendarControl.es6';
import SleepLive2 from './sleepLive2.es6';
import {Link} from 'react-router';
import Path from './ApiPath.es6';
// import {PropTypes} from 'react';
// contextTypes: {
//     router: PropTypes.object.isRequired
// },
const App = React.createClass({
    getInitialState: function(){
                var now=new Date();
                return {
                    date:new Date(now.valueOf()),
                    connect: 0,
                    battery: '',
                    detectTime: 0,
                    calendarStatus: false,
                    dateList: []
                }
            },
    GetQueryString: function(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    },
    endDay: function(e){
        var end=this.state.date;
        var aDay=1*24*60*60*1000;
        var newDay,newYear,newMonth,datestr;
        var type = e.target.getAttribute('data-type');
        this.setState({isLoad: true});
        if(type=="next"){  
            end=new Date(end.valueOf() + aDay);
            newDay=end.getDate(),
            newYear=end.getFullYear(),
            newMonth=end.getMonth()+1;
            datestr=newYear+"-"+this.format(newMonth)+"-"+this.format(newDay);
            this.getDayReport(datestr,2);
        }else if(type = "pre"){
            end=new Date(end.valueOf() - aDay);
            newDay=end.getDate(),
            newYear=end.getFullYear(),
            newMonth=end.getMonth()+1;
            datestr=newYear+"-"+this.format(newMonth)+"-"+this.format(newDay);
            this.getDayReport(datestr,1);
        }
        
    },
    showCalendar: function(e){
        e.preventDefault();
        e.stopPropagation();
        var calendarStatus = this.state.calendarStatus;
        this.setState({calendarStatus: !calendarStatus});
    },
    hideCalendar: function(e){
        e.preventDefault();
        e.stopPropagation();
        if(e.target.className =='calendar-ctrl'){
            var calendarStatus = this.state.calendarStatus;
            this.setState({calendarStatus: !calendarStatus})
        }    
    },
    getDayReport: function(date,flag,bl){
        var devId = this.GetQueryString('deviceId');
        //console.log(this.getCookie('accessToken'))
        //console.log(accessToken,devId);
        var _this = this;
        var url = Path.wPath+'/wechat/hotel/mattress/getMattressDetailData?deviceId='+devId+'&queryFlag='+flag+'&paramId=0'+'&date='+date;
        $.ajax({
            //url: '../static/js/data1.json',
            url: url,
            dataType: 'json',
            cache: true,
            async: true,
            success: function(r){
                _this.setState({isLoad: false});
                //console.log(r)
                if(r.code==0){
                    if(r.data.heartRate.list.length>0&&r.data.breathRate.list.length>0&&r.data.turnOverTimes.list.length>0){

                        var detectTime = r.data.detectionDuration;
                        var dateTime = r.data.dateTime;
                        _this.setState({
                            detectTime: detectTime,
                            date: _this.stringToDate(dateTime)
                        });
                        //Todo提取公共函数
                        //心率
                        if(r.data.heartRate.list<=0){

                        }else{
                            var suggestMax1 = r.data.heartRate.sleepAnalysisVO.maxValue;
                            var suggestMin1 = r.data.heartRate.sleepAnalysisVO.minValue;
                            var aveValue1 = r.data.heartRate.avgValue;
                            var timeList1 = [],valueList1 = [];
                            //得到起始时间
                            var len=r.data.heartRate.list.length;
                            var timeStart = new Date((r.data.heartRate.list[0].key.substr(0,14)).replace(/\-/g,'/')+'00:00').getTime()+8*3600*1000;
                            //console.log(888888888,timeStart)
                            var timeEnd = (r.data.heartRate.list[len-1].key.substr(14)=='00:00')?(new Date(r.data.heartRate.list[len-1].key.replace(/\-/g,'/')).getTime()+8*3600*1000):(new Date(r.data.heartRate.list[len-1].key.substr(0,14).replace(/\-/g,'/')+'00:00').getTime()+9*3600*1000);
                            //console.log(timeStart,timeEnd)
                            //计算区间大小及间隔
                            var sectionTime = (timeEnd - timeStart)/3600000;
                            var tick=1;
                            //console.log(sectionTime);
                            if(sectionTime<=6){
                                tick=1;
                            }else{
                                if(sectionTime%6==0){
                                    tick = sectionTime/6;
                                }else{
                                    tick = sectionTime/6+1;
                                }
                            }
                            //计算数据列表
                            for(var i=0;i<len;i++){
                                timeList1.push((new Date(r.data.heartRate.list[i].key.replace(/\-/g,'/')).getTime()+8*3600*1000));
                                valueList1.push(parseInt(r.data.heartRate.list[i].value));
                            };
                            //console.log(timeList1,valueList1);
                            var dataList = [];
                            for(var i=0;i<timeList1.length;i++){
                                dataList[i]=new Array();
                            }
                            for(var i=0;i<timeList1.length;i++){
                                dataList[i][0]=timeList1[i];
                                dataList[i][1]=valueList1[i];
                            }
                            var arr1 = [];
                            for(var i=0;i<dataList.length;i++){
                                arr1.push(dataList[i]);
                                if(i<dataList.length-1){
                                    var m = dataList[i+1][0]-dataList[i][0];
                                    if(m>15*60*1000){
                                        arr1.push([dataList[i][0]+1,null])
                                    }
                                }  
                            }
                            var heartFlag1 = true,heartFlag2 = true;
                            for(var i=0;i<arr1.length;i++){
                                if(r.data.heartRate.maxValue>0&&arr1[i][1]==r.data.heartRate.maxValue&&heartFlag1){
                                    arr1[i] = {
                                                x:arr1[i][0],
                                                y:r.data.heartRate.maxValue,
                                                marker: {
                                                    enabled: true,
                                                    fillColor:'transparent',
                                                    lineColor:'green',
                                                    lineWidth: 1,
                                                    symbol:'circle',
                                                    radius: 2
                                                },
                                                dataLabels: {
                                                    enabled: true,
                                                    color: 'green',
                                                    style: {'fontSize': '12px',"fontWeight": "normal",}
                                                },
                                            };
                                    heartFlag1 = false;
                                };
                                if(r.data.heartRate.minValue>0&&r.data.heartRate.minValue!=r.data.heartRate.maxValue&&arr1[i][1]==r.data.heartRate.minValue&&heartFlag2){
                                    arr1[i] = {
                                                x:arr1[i][0],
                                                y:r.data.heartRate.minValue,
                                                marker: {
                                                    enabled: true,
                                                    fillColor:'transparent',
                                                    lineColor:'green',
                                                    lineWidth: 1,
                                                    symbol:'circle',
                                                    radius: 2
                                                },
                                                dataLabels: {
                                                    enabled: true,
                                                    color: 'green',
                                                    style: {'fontSize': '12px',"fontWeight": "normal",}
                                                },
                                            };
                                    heartFlag2 = false;
                                };
                            }
                            //console.log(arr1)
                            Highcharts.chart('heart-chart',{
                                        credits: {
                                            text: '成人的正常心率范围为:'+suggestMin1+'-'+suggestMax1,
                                            href: '',
                                            position: {
                                                align: 'left',
                                                x: 2 ,
                                                verticalAlign: 'bottom',
                                                y: -8
                                            },
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }
                                        },
                                        chart: {
                                            spacing:[38,12,30,-6],
                                            reflow: true
                                        },
                                        title:{
                                            text:'心率',
                                            // margin: 0,
                                            align: 'left',
                                            floating: true,
                                            y: -16,
                                            x: 8,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }     
                                        },
                                        subtitle:{
                                            text:aveValue1+'次/分',
                                            // margin: 0,
                                            align: 'right',
                                            floating: true,
                                            y: -16,
                                            x: 9,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }
                                        },
                                        tooltip:{
                                            enabled:false
                                        },
                                        xAxis: {
                                            type: 'datetime',
                                            minRange: sectionTime*3600*1000,
                                            tickInterval: tick*3600*1000,
                                            minTickInterval: 1*3600*1000,
                                            // dateTimeLabelFormats: {
                                            //     hour: '%H:%M',
                                            // },
                                            
                                            //categories: timeList1,
                                            lineColor: '#D8D8D8',
                                            labels: {
                                                enabled:true,
                                                endOnTick: false,
                                                //align: 'center',
                                                //step: 1,
                                                formatter: function(){
                                                    return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                                },
                                                
                                            },
                                            maxPadding: 0.05,
                                            tickLength: 0,
                                            startOnTick: true,
                                            minPadding: 0,
                                            min: timeStart,
                                        },
                                        yAxis:{
                                            title: '',
                                            startOnTick: false,
                                            minPadding: 0,
                                            min: 0,
                                            minRange: 40,
                                            tickAmount: 4,
                                            tickInterval: 40,
                                            labels: {
                                                align: 'center',
                                                x:-16,
                                                y:2,
                                                step: 1,
                                                formatter: function(){
                                                    if(this.value==0){
                                                        return 0
                                                    }
                                                    if(this.value>0&&this.value<=40){
                                                        return 40
                                                    }
                                                    if(this.value>40&&this.value<=80){
                                                        return 80
                                                    }
                                                    if(this.value>80&&this.value<=120){
                                                        return 120
                                                    }
                                                    if(this.value>120&&this.value<=140){
                                                        return 140
                                                    }
                                                    if(this.value>140&&this.value<=160){
                                                        return 160
                                                    }
                                                    if(this.value>160&&this.value<=180){
                                                        return 180
                                                    }
                                                    if(this.value>180&&this.value<=200){
                                                        return 200
                                                    }
                                                    if(this.value>200&&this.value<=220){
                                                        return 220
                                                    }
                                                    if(this.value>220&&this.value<=240){
                                                        return 240
                                                    }

                                                }
                                            },

                                            plotLines: [{
                                                color: '#49BA83',
                                                dashStyle: 'solid',
                                                value: suggestMin1,
                                                width: 1,
                                                zIndex: 1000
                                            },{
                                                color: '#49BA83',
                                                dashStyle: 'solid',
                                                value: suggestMax1,
                                                width: 1,
                                                zIndex: 1000
                                            }]
                                        },
                                        plotOptions: {
                                            area: {
                                                fillColor: {
                                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                                    stops: [
                                                        [0, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.9).get('rgba')],
                                                        [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.1).get('rgba')]
                                                    ]
                                                },
                                                lineColor: '#ffe26e',
                                                lineWidth:1,
                                                // pointStart: dataList[0][0],//Date.UTC(2016, 8, 9,10,30),
                                                // pointInterval: 3* 3600 * 1000, 
                                            },
                                            marker: {
                                                radius: 2
                                            },
                                            lineWidth: 1,
                                            series: {
                                                marker: {
                                                    enabled: false,
                                                    fillColor:'transparent',
                                                    lineColor:'green',
                                                    lineWidth: 0,
                                                    symbol:'circle',
                                                    radius: 0
                                                },
                                                // pointStart: dataList[0][0],//Date.UTC(2016, 8, 9,10,30),
                                                // pointInterval: 1* 3600 * 1000, 
                                            },
                                            //threshold: null
                                        },
                                        legend: {
                                            enabled: false
                                        },
                                        series: [
                                        {
                                            name:'心率',
                                            type: 'area',
                                            states: {
                                                hover: {
                                                    enabled: false
                                                }
                                            },
                                            data: arr1,
                                            
                                        }]
                                    });
                        }

                        //呼吸率
                        if(r.data.breathRate.list<=0){

                        }else{

                            var suggestMax2 = r.data.breathRate.sleepAnalysisVO.maxValue;
                            var suggestMin2 = r.data.breathRate.sleepAnalysisVO.minValue;
                            var aveValue2 = r.data.breathRate.avgValue;
                            var timeList2 = [],valueList2 = [];
                            //得到起始时间
                            var len2=r.data.breathRate.list.length;
                            var timeStart2 = new Date(r.data.breathRate.list[0].key.substr(0,14).replace(/\-/g,'/')+'00:00').getTime()+8*3600*1000;
                            var timeEnd2 = r.data.breathRate.list[len2-1].key.substr(14)=='00:00'?new Date(r.data.breathRate.list[len2-1].key.replace(/\-/g,'/')).getTime()+8*3600*1000:new Date(r.data.breathRate.list[len2-1].key.substr(0,14).replace(/\-/g,'/')+'00:00').getTime()+1*3600*1000+8*3600*1000;
                            //console.log(timeStart,timeEnd)
                            //计算区间大小及间隔
                            var sectionTime2 = (timeEnd2 - timeStart2)/3600000;
                            var tick2=1;
                            //console.log(sectionTime2);
                            if(sectionTime2<=6){
                                tick2=1;
                            }else{
                                if(sectionTime2%6==0){
                                    tick2 = sectionTime2/6;
                                }else{
                                    tick2 = sectionTime2/6+1;
                                }
                            }
                            //计算数据列表
                            for(var i=0;i<len2;i++){
                                timeList2.push(new Date(r.data.breathRate.list[i].key.replace(/\-/g,'/')).getTime()+8*3600*1000);
                                valueList2.push(parseInt(r.data.breathRate.list[i].value));
                            };
                            //console.log(timeList2,valueList2);
                            var dataList2 = [];
                            for(var i=0;i<timeList2.length;i++){
                                dataList2[i]=new Array();
                            }
                            for(var i=0;i<timeList2.length;i++){
                                dataList2[i][0]=timeList2[i];
                                dataList2[i][1]=valueList2[i];
                            }
                            var arr2 = [];
                            for(var i=0;i<dataList2.length;i++){
                                arr2.push(dataList2[i]);
                                if(i<dataList2.length-1){
                                    var m2 = dataList2[i+1][0]-dataList2[i][0];
                                    if(m2>15*60*1000){
                                        arr2.push([dataList2[i][0]+1,null])
                                    }
                                }  
                            }
                            var breathFlag1 = true,breathFlag2 = true;
                            for(var i=0;i<arr2.length;i++){
                                if(r.data.breathRate.maxValue>0&&arr2[i][1]==r.data.breathRate.maxValue&&breathFlag1){
                                    arr2[i] = {
                                                x:arr2[i][0],
                                                y:r.data.breathRate.maxValue,
                                                marker: {
                                                    enabled: true,
                                                    fillColor:'transparent',
                                                    lineColor:'green',
                                                    lineWidth: 1,
                                                    symbol:'circle',
                                                    radius: 2
                                                },
                                                dataLabels: {
                                                    enabled: true,
                                                    color: 'green',
                                                    style: {'fontSize': '12px',"fontWeight": "normal",}
                                                },
                                            };
                                    breathFlag1 = false;
                                };
                                if(r.data.breathRate.minValue>0&&r.data.breathRate.minValue!=r.data.breathRate.maxValue&&arr2[i][1]==r.data.breathRate.minValue&&breathFlag2){
                                    arr2[i] = {
                                                x:arr2[i][0],
                                                y:r.data.breathRate.minValue,
                                                marker: {
                                                    enabled: true,
                                                    fillColor:'transparent',
                                                    lineColor:'green',
                                                    lineWidth: 1,
                                                    symbol:'circle',
                                                    radius: 2
                                                },
                                                dataLabels: {
                                                    enabled: true,
                                                    color: 'green',
                                                    style: {'fontSize': '12px',"fontWeight": "normal",}
                                                },
                                            };
                                    breathFlag2 = false;
                                };
                            }
                            // console.log(arr1)
                            // console.log(dataList);
                            Highcharts.chart('breath-chart',{
                                        credits: {
                                            text: '成人的正常呼吸率范围为:'+suggestMin2+'-'+suggestMax2,
                                            href: '',
                                            position: {
                                                align: 'left',
                                                x: 2 ,
                                                verticalAlign: 'bottom',
                                                y: -8
                                            },
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }
                                        },
                                        chart: {
                                            spacing:[38,12,30,0],
                                            reflow: true
                                        },
                                        title:{
                                            text:'呼吸率',
                                            // margin: 0,
                                            align: 'left',
                                            floating: true,
                                            y: -16,
                                            x: 2,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }     
                                        },
                                        subtitle:{
                                            text:aveValue2+'次/分',
                                            // margin: 0,
                                            align: 'right',
                                            floating: true,
                                            y: -16,
                                            x: 9,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }
                                        },
                                        tooltip:{
                                            enabled:false
                                        },
                                        xAxis: {
                                            type: 'datetime',
                                            minRange: sectionTime2*3600*1000,
                                            tickInterval: tick2*3600*1000,
                                            minTickInterval: 1*3600*1000,
                                            // dateTimeLabelFormats: {
                                            //     hour: '%H:%M',
                                            // },
                                            
                                            //categories: timeList1,
                                            lineColor: '#D8D8D8',
                                            labels: {
                                                enabled:true,
                                                //align: 'left',
                                                //step: 1,
                                                formatter: function(){
                                                    return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                                },
                                                
                                            },
                                            maxPadding: 0.05,
                                            tickLength: 0,
                                            startOnTick: true,
                                            minPadding: 0,
                                            min: timeStart2,
                                        },
                                        yAxis:{
                                            title: '',
                                            startOnTick: false,
                                            minPadding: 0,
                                            min: 0,
                                            minRange: 10,
                                            tickAmount: 4,
                                            tickInterval: 10,
                                            labels: {
                                                align: 'center',
                                                x:-16,
                                                y:2,
                                                step: 1,
                                                formatter: function(){
                                                    if(this.value==0){
                                                        return 0
                                                    }
                                                    if(this.value>0&&this.value<=10){
                                                        return 10
                                                    }
                                                    if(this.value>10&&this.value<=20){
                                                        return 20
                                                    }
                                                    if(this.value>20&&this.value<=30){
                                                        return 30
                                                    }
                                                    if(this.value>30&&this.value<=40){
                                                        return 40
                                                    }
                                                    if(this.value>40&&this.value<=50){
                                                        return 50
                                                    }
                                                    if(this.value>50&&this.value<=60){
                                                        return 60
                                                    }
                                                    if(this.value>60&&this.value<=70){
                                                        return 70
                                                    }
                                                    if(this.value>70&&this.value<=80){
                                                        return 80
                                                    }
                                                    if(this.value>80&&this.value<=90){
                                                        return 90
                                                    }

                                                }
                                            },

                                            plotLines: [{
                                                color: '#49BA83',
                                                dashStyle: 'solid',
                                                value: suggestMin2,
                                                width: 1,
                                                zIndex: 1000
                                            },{
                                                color: '#49BA83',
                                                dashStyle: 'solid',
                                                value: suggestMax2,
                                                width: 1,
                                                zIndex: 1000
                                            }]
                                        },
                                        plotOptions: {
                                            area: {
                                                fillColor: {
                                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                                    stops: [
                                                        [0, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.9).get('rgba')],
                                                        [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.1).get('rgba')]
                                                    ]
                                                },
                                                lineColor: '#ffe26e',
                                                lineWidth:1,
                                                // pointStart: dataList[0][0],//Date.UTC(2016, 8, 9,10,30),
                                                // pointInterval: 3* 3600 * 1000, 
                                            },
                                            marker: {
                                                radius: 2
                                            },
                                            lineWidth: 1,
                                            series: {
                                                marker: {
                                                    enabled: false,
                                                    fillColor:'transparent',
                                                    lineColor:'green',
                                                    lineWidth: 0,
                                                    symbol:'circle',
                                                    radius: 0
                                                },
                                                // pointStart: dataList[0][0],//Date.UTC(2016, 8, 9,10,30),
                                                // pointInterval: 1* 3600 * 1000, 
                                            },
                                            threshold: null
                                        },
                                        legend: {
                                            enabled: false
                                        },
                                        series: [
                                        {
                                            name:'呼吸率',
                                            type: 'area',
                                            states: {
                                                hover: {
                                                    enabled: false
                                                }
                                            },
                                            data: arr2,  
                                        }]
                                    });
                        }

                        //体动
                        if(r.data.turnOverTimes.list<=0){

                        }else{


                            var suggestMax3 = r.data.turnOverTimes.sleepAnalysisVO.maxValue;
                            var suggestMin3 = r.data.turnOverTimes.sleepAnalysisVO.minValue;
                            var aveValue3 = r.data.turnOverTimes.avgValue;
                            var timeList3 = [],valueList3 = [];
                            //得到起始时间
                            var len3=r.data.turnOverTimes.list.length;
                            var timeStart3 = new Date(r.data.turnOverTimes.list[0].key.substr(0,14).replace(/\-/g,'/')+'00:00').getTime()+8*3600*1000;
                            var timeEnd3 = r.data.turnOverTimes.list[len3-1].key.substr(14)=='00:00'?new Date(r.data.turnOverTimes.list[len3-1].key.replace(/\-/g,'/')).getTime()+8*3600*1000:new Date(r.data.turnOverTimes.list[len3-1].key.substr(0,14).replace(/\-/g,'/')+'00:00').getTime()+1*3600*1000+8*3600*1000;
                            //console.log(timeStart,timeEnd)
                            //计算区间大小及间隔
                            var sectionTime3 = (timeEnd3 - timeStart3)/3600000;
                            var tick3=1;
                            //console.log(sectionTime3);
                            if(sectionTime3<=6){
                                tick3=1;
                            }else{
                                if(sectionTime3%6==0){
                                    tick3 = sectionTime3/6;
                                }else{
                                    tick3 = sectionTime3/6+1;
                                }
                            }
                            //计算数据列表
                            for(var i=0;i<len3;i++){
                                timeList3.push(new Date(r.data.turnOverTimes.list[i].key.replace(/\-/g,'/')).getTime()+8*3600*1000);
                                valueList3.push(parseInt(r.data.turnOverTimes.list[i].value));
                            };
                            //console.log(timeList3,valueList3);
                            var dataList3 = [];
                            for(var i=0;i<timeList3.length;i++){
                                dataList3[i]=new Array();
                            }
                            for(var i=0;i<timeList3.length;i++){
                                dataList3[i][0]=timeList3[i];
                                dataList3[i][1]=valueList3[i];
                            }
                            var arr3 = [];
                            for(var i=0;i<dataList3.length;i++){
                                arr3.push(dataList3[i]);
                                if(i<dataList3.length-1){
                                    var m3 = dataList3[i+1][0]-dataList3[i][0];
                                    if(m3>15*60*1000){
                                        arr3.push([dataList3[i][0]+1,null])
                                    }
                                }  
                            };
                            // var turnFlag1 = true,turnFlag2 = true;
                            // for(var i=0;i<arr3.length;i++){
                            //     if(r.data.turnOverTimes.maxValue>0&&arr3[i][1]==r.data.turnOverTimes.maxValue&&turnFlag1){
                            //         arr3[i] = {
                            //                     x:arr3[i][0],
                            //                     y:r.data.turnOverTimes.maxValue,
                            //                     marker: {
                            //                         enabled: true,
                            //                         fillColor:'transparent',
                            //                         lineColor:'green',
                            //                         lineWidth: 1,
                            //                         symbol:'circle',
                            //                         radius: 2
                            //                     },
                            //                     dataLabels: {
                            //                         enabled: true,
                            //                         color: 'green',
                            //                         style: {'fontSize': '12px',"fontWeight": "normal",}
                            //                     },
                            //                 };
                            //         turnFlag1 = false;
                            //     };
                            //     if(r.data.turnOverTimes.minValue>0&&r.data.turnOverTimes.minValue!=r.data.turnOverTimes.maxValue&&arr3[i][1]==r.data.turnOverTimes.minValue&&turnFlag2){
                            //         arr3[i] = {
                            //                     x:arr3[i][0],
                            //                     y:r.data.turnOverTimes.minValue,
                            //                     marker: {
                            //                         enabled: true,
                            //                         fillColor:'transparent',
                            //                         lineColor:'green',
                            //                         lineWidth: 1,
                            //                         symbol:'circle',
                            //                         radius: 2
                            //                     },
                            //                     dataLabels: {
                            //                         enabled: true,
                            //                         color: 'green',
                            //                         style: {'fontSize': '12px',"fontWeight": "normal",}
                            //                     },
                            //                 };
                            //         turnFlag2 = false;
                            //     };
                            // }
                            Highcharts.chart('turnover-chart',{
                                        credits: {
                                            text:''
                                            //text: '成人的正常体动范围为:'+suggestMin3+'-'+suggestMax3,
                                            //href: '',
                                            // position: {
                                            //     align: 'left',
                                            //     x: 2 ,
                                            //     verticalAlign: 'bottom',
                                            //     y: -8
                                            // },
                                            // style: {
                                            //     color: '#000',
                                            //     fontSize: '12px'
                                            // }
                                        },
                                        chart: {
                                            spacing:[38,12,30,0],
                                            reflow: true
                                        },
                                        title:{
                                            text:'体动',
                                            // margin: 0,
                                            align: 'left',
                                            floating: true,
                                            y: -16,
                                            x: 2,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }     
                                        },
                                        subtitle:{
                                            text:aveValue3+'次',
                                            // margin: 0,
                                            align: 'right',
                                            floating: true,
                                            y: -16,
                                            x: 9,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }
                                        },
                                        tooltip:{
                                            enabled:false
                                        },
                                        xAxis: {
                                            type: 'datetime',
                                            minRange: sectionTime3*3600*1000,
                                            tickInterval: tick3*3600*1000,
                                            minTickInterval: 1*3600*1000,
                                            // dateTimeLabelFormats: {
                                            //     hour: '%H:%M',
                                            // },
                                            
                                            //categories: timeList1,
                                            lineColor: '#D8D8D8',
                                            labels: {
                                                enabled:true,
                                                //align: 'left',
                                                //step: 1,
                                                formatter: function(){
                                                    return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                                },
                                                
                                            },
                                            maxPadding: 0.05,
                                            tickLength: 0,
                                            startOnTick: true,
                                            minPadding: 0,
                                            min: timeStart3,
                                        },
                                        yAxis:{
                                            title:null,
                                            startOnTick: false,
                                            minPadding: 0,
                                            min: 0,
                                            minRange: 10,
                                            tickAmount: 4,
                                            tickInterval: 10,
                                            labels: {
                                                align: 'center',
                                                x:-16,
                                                y:2,
                                                step: 1,
                                                formatter: function(){
                                                    if(this.value==0){
                                                        return 0
                                                    }
                                                    if(this.value>0&&this.value<=10){
                                                        return 10
                                                    }
                                                    if(this.value>10&&this.value<=20){
                                                        return 20
                                                    }
                                                    if(this.value>20&&this.value<=30){
                                                        return 30
                                                    }
                                                    if(this.value>30&&this.value<=40){
                                                        return 40
                                                    }
                                                    if(this.value>40&&this.value<=50){
                                                        return 50
                                                    }
                                                    if(this.value>50&&this.value<=60){
                                                        return 60
                                                    }
                                                    if(this.value>60&&this.value<=70){
                                                        return 70
                                                    }
                                                    if(this.value>70&&this.value<=80){
                                                        return 80
                                                    }
                                                    if(this.value>80&&this.value<=90){
                                                        return 90
                                                    }

                                                }
                                            },

                                        //     plotLines: [{
                                        //         color: '#49BA83',
                                        //         dashStyle: 'solid',
                                        //         value: suggestMin3,
                                        //         width: 1,
                                        //         zIndex: 1000
                                        //     },{
                                        //         color: '#49BA83',
                                        //         dashStyle: 'solid',
                                        //         value: suggestMax3,
                                        //         width: 1,
                                        //         zIndex: 1000
                                        //     }]
                                        },
                                        plotOptions: {
                                            area: {
                                                fillColor: {
                                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                                    stops: [
                                                        [0, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.9).get('rgba')],
                                                        [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.1).get('rgba')]
                                                    ]
                                                },
                                                lineColor: '#ffe26e',
                                                lineWidth:1,
                                            },
                                            marker: {
                                                radius: 2
                                            },
                                            lineWidth: 1,
                                            series: {
                                                marker: {
                                                    enabled: false,
                                                    fillColor:'transparent',
                                                    lineColor:'green',
                                                    lineWidth: 0,
                                                    symbol:'circle',
                                                    radius: 0
                                                },
                                                // pointStart: dataList[0][0],//Date.UTC(2016, 8, 9,10,30),
                                                // pointInterval: 1* 3600 * 1000, 
                                            },
                                            threshold: null
                                        },
                                        legend: {
                                            enabled: false
                                        },
                                        series: [
                                        {
                                            name:'体动',
                                            type: 'area',
                                            states: {
                                                hover: {
                                                    enabled: false
                                                }
                                            },
                                            data: arr3,
                                        }]
                                    });
                        }
                        
                    }else{
                        if(bl){
                            //_this.context.router.replace({ pathname: '/nodata'});
                            // $('#dataTip').css({display: 'block'});
                            // _this.showTip = setTimeout(function(){
                            //     $('#dataTip').css({display: 'none'});
                            // },1000);
                            Highcharts.chart('heart-chart',{
                                        credits: {
                                            text: '成人的正常心率范围为:50-100',
                                            href: '',
                                            position: {
                                                align: 'left',
                                                x: 2 ,
                                                verticalAlign: 'bottom',
                                                y: -8
                                            },
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }
                                        },
                                        chart: {
                                            spacing:[38,12,30,-6],
                                            reflow: true
                                        },
                                        title:{
                                            text:'心率',
                                            // margin: 0,
                                            align: 'left',
                                            floating: true,
                                            y: -16,
                                            x: 8,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }     
                                        },
                                        subtitle:{
                                            text:'--次/分',
                                            // margin: 0,
                                            align: 'right',
                                            floating: true,
                                            y: -16,
                                            x: 9,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }
                                        },
                                        tooltip:{
                                            enabled:false
                                        },
                                        xAxis: {
                                            type: 'datetime',
                                            minRange: 10*3600*1000,
                                            tickInterval: 2*3600*1000,
                                            minTickInterval: 1*3600*1000,
                                            // dateTimeLabelFormats: {
                                            //     hour: '%H:%M',
                                            // },
                                            
                                            //categories: timeList1,
                                            lineColor: '#D8D8D8',
                                            labels: {
                                                enabled:true,
                                                //align: 'left',
                                                //step: 1,
                                                formatter: function(){
                                                    return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                                },
                                                
                                            },
                                            maxPadding: 0.05,
                                            tickLength: 0,
                                            startOnTick: true,
                                            minPadding: 0,
                                            min: 1451656800000,
                                        },
                                        yAxis:{
                                            title: '',
                                            startOnTick: false,
                                            minPadding: 0,
                                            min: 0,
                                            minRange: 40,
                                            tickAmount: 4,
                                            tickInterval: 40,
                                            labels: {
                                                align: 'center',
                                                x:-16,
                                                y:2,
                                                step: 1,
                                                formatter: function(){
                                                    if(this.value==0){
                                                        return 0
                                                    }
                                                    if(this.value>0&&this.value<=40){
                                                        return 40
                                                    }
                                                    if(this.value>40&&this.value<=80){
                                                        return 80
                                                    }
                                                    if(this.value>80&&this.value<=120){
                                                        return 120
                                                    }
                                                    if(this.value>120&&this.value<=140){
                                                        return 140
                                                    }
                                                    if(this.value>140&&this.value<=160){
                                                        return 160
                                                    }
                                                    if(this.value>160&&this.value<=180){
                                                        return 180
                                                    }
                                                    if(this.value>180&&this.value<=200){
                                                        return 200
                                                    }
                                                    if(this.value>200&&this.value<=220){
                                                        return 220
                                                    }
                                                    if(this.value>220&&this.value<=240){
                                                        return 240
                                                    }

                                                }
                                            },

                                            plotLines: [{
                                                color: '#49BA83',
                                                dashStyle: 'solid',
                                                value: 50,
                                                width: 1,
                                                zIndex: 1000
                                            },{
                                                color: '#49BA83',
                                                dashStyle: 'solid',
                                                value: 100,
                                                width: 1,
                                                zIndex: 1000
                                            }]
                                        },
                                        plotOptions: {
                                            area: {
                                                fillColor: {
                                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                                    stops: [
                                                        [0, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.9).get('rgba')],
                                                        [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.1).get('rgba')]
                                                    ]
                                                },
                                                lineColor: '#ffe26e',
                                                lineWidth:1,
                                                // pointStart: dataList[0][0],//Date.UTC(2016, 8, 9,10,30),
                                                // pointInterval: 3* 3600 * 1000, 
                                            },
                                            marker: {
                                                radius: 2
                                            },
                                            lineWidth: 1,
                                            series: {
                                                marker: {
                                                    enabled: false,
                                                    fillColor:'transparent',
                                                    lineColor:'green',
                                                    lineWidth: 0,
                                                    symbol:'circle',
                                                    radius: 0
                                                },
                                                // pointStart: dataList[0][0],//Date.UTC(2016, 8, 9,10,30),
                                                // pointInterval: 1* 3600 * 1000, 
                                            },
                                            //threshold: null
                                        },
                                        legend: {
                                            enabled: false
                                        },
                                        series: [
                                        {
                                            name:'心率',
                                            type: 'area',
                                            states: {
                                                hover: {
                                                    enabled: false
                                                }
                                            },
                                            data: [[1451656800000,0],[1451656898750,0]],
                                            
                                        }]
                                    });
                            Highcharts.chart('breath-chart',{
                                        credits: {
                                            text: '成人的正常呼吸率范围为:12-20',
                                            href: '',
                                            position: {
                                                align: 'left',
                                                x: 2 ,
                                                verticalAlign: 'bottom',
                                                y: -8
                                            },
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }
                                        },
                                        chart: {
                                            spacing:[38,12,30,0],
                                            reflow: true
                                        },
                                        title:{
                                            text:'呼吸率',
                                            // margin: 0,
                                            align: 'left',
                                            floating: true,
                                            y: -16,
                                            x: 2,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }     
                                        },
                                        subtitle:{
                                            text:'--次/分',
                                            // margin: 0,
                                            align: 'right',
                                            floating: true,
                                            y: -16,
                                            x: 9,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }
                                        },
                                        tooltip:{
                                            enabled:false
                                        },
                                        xAxis: {
                                            type: 'datetime',
                                            minRange: 10*3600*1000,
                                            tickInterval: 2*3600*1000,
                                            minTickInterval: 1*3600*1000,
                                            // dateTimeLabelFormats: {
                                            //     hour: '%H:%M',
                                            // },
                                            
                                            //categories: timeList1,
                                            lineColor: '#D8D8D8',
                                            labels: {
                                                enabled:true,
                                                //align: 'left',
                                                //step: 1,
                                                formatter: function(){
                                                    return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                                },
                                                
                                            },
                                            maxPadding: 0.05,
                                            tickLength: 0,
                                            startOnTick: true,
                                            minPadding: 0,
                                            min: 1451656800000,
                                        },
                                        yAxis:{
                                            title: '',
                                            startOnTick: false,
                                            minPadding: 0,
                                            min: 0,
                                            minRange: 10,
                                            tickAmount: 4,
                                            tickInterval: 10,
                                            labels: {
                                                align: 'center',
                                                x:-16,
                                                y:2,
                                                step: 1,
                                                formatter: function(){
                                                    if(this.value==0){
                                                        return 0
                                                    }
                                                    if(this.value>0&&this.value<=10){
                                                        return 10
                                                    }
                                                    if(this.value>10&&this.value<=20){
                                                        return 20
                                                    }
                                                    if(this.value>20&&this.value<=30){
                                                        return 30
                                                    }
                                                    if(this.value>30&&this.value<=40){
                                                        return 40
                                                    }
                                                    if(this.value>40&&this.value<=50){
                                                        return 50
                                                    }
                                                    if(this.value>50&&this.value<=60){
                                                        return 60
                                                    }
                                                    if(this.value>60&&this.value<=70){
                                                        return 70
                                                    }
                                                    if(this.value>70&&this.value<=80){
                                                        return 80
                                                    }
                                                    if(this.value>80&&this.value<=90){
                                                        return 90
                                                    }

                                                }
                                            },

                                            plotLines: [{
                                                color: '#49BA83',
                                                dashStyle: 'solid',
                                                value: 12,
                                                width: 1,
                                                zIndex: 1000
                                            },{
                                                color: '#49BA83',
                                                dashStyle: 'solid',
                                                value: 20,
                                                width: 1,
                                                zIndex: 1000
                                            }]
                                        },
                                        plotOptions: {
                                            area: {
                                                fillColor: {
                                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                                    stops: [
                                                        [0, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.9).get('rgba')],
                                                        [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.1).get('rgba')]
                                                    ]
                                                },
                                                lineColor: '#ffe26e',
                                                lineWidth:1,
                                                // pointStart: dataList[0][0],//Date.UTC(2016, 8, 9,10,30),
                                                // pointInterval: 3* 3600 * 1000, 
                                            },
                                            marker: {
                                                radius: 2
                                            },
                                            lineWidth: 1,
                                            series: {
                                                marker: {
                                                    enabled: false,
                                                    fillColor:'transparent',
                                                    lineColor:'green',
                                                    lineWidth: 0,
                                                    symbol:'circle',
                                                    radius: 0
                                                },
                                                // pointStart: dataList[0][0],//Date.UTC(2016, 8, 9,10,30),
                                                // pointInterval: 1* 3600 * 1000, 
                                            },
                                            threshold: null
                                        },
                                        legend: {
                                            enabled: false
                                        },
                                        series: [
                                        {
                                            name:'呼吸率',
                                            type: 'area',
                                            states: {
                                                hover: {
                                                    enabled: false
                                                }
                                            },
                                            data: [[1451656800000,0],[1451656898750,0]],  
                                        }]
                                    });
                            Highcharts.chart('turnover-chart',{
                                        credits: {
                                            text:''
                                            //text: '成人的正常体动范围为:'+suggestMin3+'-'+suggestMax3,
                                            //href: '',
                                            // position: {
                                            //     align: 'left',
                                            //     x: 2 ,
                                            //     verticalAlign: 'bottom',
                                            //     y: -8
                                            // },
                                            // style: {
                                            //     color: '#000',
                                            //     fontSize: '12px'
                                            // }
                                        },
                                        chart: {
                                            spacing:[38,12,30,0],
                                            reflow: true
                                        },
                                        title:{
                                            text:'体动',
                                            // margin: 0,
                                            align: 'left',
                                            floating: true,
                                            y: -16,
                                            x: 2,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }     
                                        },
                                        subtitle:{
                                            text:'--次',
                                            // margin: 0,
                                            align: 'right',
                                            floating: true,
                                            y: -16,
                                            x: 9,
                                            style: {
                                                color: '#000',
                                                fontSize: '14px'
                                            }
                                        },
                                        tooltip:{
                                            enabled:false
                                        },
                                        xAxis: {
                                            type: 'datetime',
                                            minRange: 10*3600*1000,
                                            tickInterval: 2*3600*1000,
                                            minTickInterval: 1*3600*1000,
                                            // dateTimeLabelFormats: {
                                            //     hour: '%H:%M',
                                            // },
                                            
                                            //categories: timeList1,
                                            lineColor: '#D8D8D8',
                                            labels: {
                                                enabled:true,
                                                //align: 'left',
                                                //step: 1,
                                                formatter: function(){
                                                    return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                                },
                                                
                                            },
                                            maxPadding: 0.05,
                                            tickLength: 0,
                                            startOnTick: true,
                                            minPadding: 0,
                                            min: 1451656800000,
                                        },
                                        yAxis:{
                                            title:null,
                                            startOnTick: false,
                                            minPadding: 0,
                                            min: 0,
                                            minRange: 10,
                                            tickAmount: 4,
                                            tickInterval: 10,
                                            labels: {
                                                align: 'center',
                                                x:-16,
                                                y:2,
                                                step: 1,
                                                formatter: function(){
                                                    if(this.value==0){
                                                        return 0
                                                    }
                                                    if(this.value>0&&this.value<=10){
                                                        return 10
                                                    }
                                                    if(this.value>10&&this.value<=20){
                                                        return 20
                                                    }
                                                    if(this.value>20&&this.value<=30){
                                                        return 30
                                                    }
                                                    if(this.value>30&&this.value<=40){
                                                        return 40
                                                    }
                                                    if(this.value>40&&this.value<=50){
                                                        return 50
                                                    }
                                                    if(this.value>50&&this.value<=60){
                                                        return 60
                                                    }
                                                    if(this.value>60&&this.value<=70){
                                                        return 70
                                                    }
                                                    if(this.value>70&&this.value<=80){
                                                        return 80
                                                    }
                                                    if(this.value>80&&this.value<=90){
                                                        return 90
                                                    }

                                                }
                                            },

                                        //     plotLines: [{
                                        //         color: '#49BA83',
                                        //         dashStyle: 'solid',
                                        //         value: suggestMin3,
                                        //         width: 1,
                                        //         zIndex: 1000
                                        //     },{
                                        //         color: '#49BA83',
                                        //         dashStyle: 'solid',
                                        //         value: suggestMax3,
                                        //         width: 1,
                                        //         zIndex: 1000
                                        //     }]
                                        },
                                        plotOptions: {
                                            area: {
                                                fillColor: {
                                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                                    stops: [
                                                        [0, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.9).get('rgba')],
                                                        [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.1).get('rgba')]
                                                    ]
                                                },
                                                lineColor: '#ffe26e',
                                                lineWidth:1,
                                            },
                                            marker: {
                                                radius: 2
                                            },
                                            lineWidth: 1,
                                            series: {
                                                marker: {
                                                    enabled: false,
                                                    fillColor:'transparent',
                                                    lineColor:'green',
                                                    lineWidth: 0,
                                                    symbol:'circle',
                                                    radius: 0
                                                },
                                                // pointStart: dataList[0][0],//Date.UTC(2016, 8, 9,10,30),
                                                // pointInterval: 1* 3600 * 1000, 
                                            },
                                            threshold: null
                                        },
                                        legend: {
                                            enabled: false
                                        },
                                        series: [
                                        {
                                            name:'体动',
                                            type: 'area',
                                            states: {
                                                hover: {
                                                    enabled: false
                                                }
                                            },
                                            data: [[1451656800000,0],[1451656898750,0]],
                                        }]
                                    });
                        }else{
                            $('#dataTip').css({display: 'block'});
                            _this.showTip = setTimeout(function(){
                                $('#dataTip').css({display: 'none'});
                            },1000);
                        } 
                    }
                    
                }
            }
        })
    },
    componentDidMount: function(){
        if(this.isMounted()){
            //加载中
            this.setState({isLoad: true});
            //获取连接状态
            var url = Path.wPath+'/wechat/hotel/getParam';
            // let url1 = Path.wPath+'/clife-wechat/wechat/hotel/device/checkOnline?deviceId='+this.GetQueryString('deviceId');
            var _this = this;
            $.ajax({
                url: url,
                dataType: 'json',
                cache:true,
                async:true,
                success: function(res){
                    //console.log(res)
                    if(res.code == 0){
                        var accessToken = res.data.accessToken,
                            appId = res.data.appId,
                            deviceNames = res.data.deviceNames.split('_')[0]||res.data.deviceNames,
                            deviceId = res.data.deviceId.split('_')[0]||res.data.deviceId;
                        var timestamp = new Date().getTime();
                        //console.log([accessToken,appId,deviceNames,deviceId]);
                        var comData = {
                            accessToken:accessToken,
                            appId:appId,
                            deviceNames:deviceNames,
                            deviceId:deviceId
                        };
                        var url1 = Path.aPath+'/v1/device/data/getRaw?accessToken='+accessToken+'&appId='+appId
                +'&deviceId='+deviceId+'&timestamp='+timestamp;
                        $.ajax({
                            url: url1,
                            dataType: 'json',
                            cache:true,
                            async:true,
                            success: function(r){
                                if(r.code==0){
                                    var con = r.data.online;
                                    var batteryPower = r.data.batteryPower;
                                    _this.setState({connect: con,battery: batteryPower})
                                }
                                
                            }
                        })
                    }
                }
            }); 
            //配置hightcharts图形
            Highcharts.setOptions({global:{useUTC:false}});
            Highcharts.getOptions().colors[3] = '#F1ECCE';
            //console.log(this.state.date)
            var end = new Date(this.state.date.valueOf()-1*24*3600*1000),
                endYear=end.getFullYear() ,
                endMonth=end.getMonth()+1 ,
                endDay=end.getDate(),
                datestr=endYear+"-"+this.format(endMonth)+"-"+this.format(endDay);
            _this.getDayReport(datestr,1,true);
        }         
    },
    componentWillUnmount: function(){
        clearTimeout(this.showTip);
    },
    stringToDate: function(str){
        var arr = str.split('-');
        var date = new Date(parseInt(arr[0]),parseInt(arr[1])-1,parseInt(arr[2]));
        date = new Date(date.getTime()+8*3600*1000);
        //console.log(date)
        return date;
    },
    formatSecond: function(a){
        var hh = parseInt(a/3600);  
          if(hh<10){hh = "0" + hh;}   
          var mm = parseInt((a-hh*3600)/60);  
          if(mm<10) {mm = "0" + mm;}  
          var ss = parseInt((a-hh*3600)%60);  
          if(ss<10) {ss = "0" + ss;}  
          var result = hh + ":" + mm + ":" + ss;  
          if(a>=0){  
            return result;  
          }else{  
            return "NaN";  
          }  
    },
    format: function(d) {
        return d >= 10 ? d : ("0"+d);
    },
    stopScroll: function(e){
        e.preventDefault();
        e.stopPropagation();
    },
    onChildChanged:function(curDate){
        // var _date= new Date(curDate);
        // this.setState({date:_date});
        this.setState({isLoad: true});
        this.getDayReport(curDate,0);
    },
    onChildChangeCal: function(status){
        this.setState({calendarStatus:status});
    },
    render: function(){
        var devId = this.GetQueryString('deviceId'),
            devN = this.GetQueryString('deviceName');
        //监测时长
        var detectTime = this.state.detectTime;
        //连接状态
        var connect = this.state.connect;
        let conStatus='';
        if(connect==1){
            conStatus = '已连接智慧盒子'
        }else if(connect==2||connect==null){
            conStatus = '未连接'
        }else if(connect==0){
            conStatus = ''
        }
        //电量显示
        var battery = this.state.battery;
        var batColor = {};
        var batContent = null;
        if(battery!==''&&battery!==undefined&&battery!==null){
            if(battery == 255){
                batColor = {color: '#87D151'};
                batContent = (
                        <span className='battery-cn' style={batColor}>充电中</span>
                    );
            }else{
                var wid = 6.5*battery/100+'rem';
                // var batteryStyle = {width: wid};
                // $('#battery-bar').css('width',(6.5*battery/100)+'rem');
                var barstyle = parseFloat(battery)/100 < 0.2 ? {background: '#F6571E',width: wid}:{background: '#9178C2',width: wid};
                batContent = (
                                <span className='battery-cn'><i><em style={barstyle} id="battery-bar"></em></i>&nbsp;{battery+'%'}</span>
                            );
            }
        }else{
            battery = 0;
            barstyle = {};
            batContent = (
                                <span className='battery-cn'><i><em style={barstyle} id="battery-bar"></em></i>&nbsp;{battery+'%'}</span>
                            );
        }

        if(conStatus == '未连接'){
            batContent = '未获取到电量'
        }
        //日期显示
        var end=this.state.date,
            endYear=end.getFullYear(),
            endMonth=end.getMonth()+1,
            endDay=end.getDate();
        var datestr=endYear+"-"+this.format(endMonth)+"-"+this.format(endDay);
        //日历的显示和隐藏
        var calendarStatus = this.state.calendarStatus;
        var cItem = null;
        if(calendarStatus){
            var cItem = (
                <div className="calendar-ctrl" id="calendar-ctrl" onTouchEnd={this.hideCalendar} onTouchStart={this.stopScroll}>
                    <CalendarControl callbackParent={this.onChildChanged} deviceId={devId} date={end} callback={this.onChildChangeCal}/>
                </div>
                )
        };
        return (
                <div className='main'>

                    <div className='m-connect'>
                        <div className='container flex'>
                            <div className='light-logo'>
                                <img src='../static/img/light-logo.png' className='logo1'/>
                                <img src='../static/img/logo2.png' className='logo2' style={{display: 'none'}}/>
                            </div>
                            <div className='showstate'>
                                <h2 className='name'>设备名称&nbsp;&nbsp;&nbsp;<span className='name-cn'>{devN}</span></h2>
                                <h2 className='battery'>仪器电量&nbsp;&nbsp;&nbsp;{batContent}</h2>
                                <h2 className='state'>连接情况&nbsp;&nbsp;&nbsp;<span>{conStatus}</span></h2>
                            </div>
                        </div>
                    </div>

                    <div className='m-calendar'>
                        <div className='container'>
                            <div className='m-calendar-bd flex'>
                                <div className="showcalendar flex">
                                    <div className="showcalendar-contain flex" onTouchEnd={this.showCalendar}>
                                        <p id="standard-date">{datestr}</p>
                                        <img src="../static/img/calendar.png"/>
                                    </div>
                                </div>

                                <div className="left-arrow arrow flex" data-type="pre" onTouchEnd={this.endDay}>
                                    <em data-type="pre"></em>
                                </div>

                                <div className="right-arrow arrow flex" data-type="next" onTouchEnd={this.endDay}>
                                    <em data-type="next"></em>
                                </div>
                            </div>
                        </div>
                        {cItem}
                    </div>

                    <div className='m-timewatch'>
                        <div className='container flex'> 
                            <h2>监测时长:&nbsp;<span className='w-time'>{this.formatSecond(detectTime*60)}</span></h2>
                        </div>   
                    </div>
                    
                    {/* 心率、呼吸、翻身 */}
                    <div className="m-charts">
                        
                        <div className="heart-chart singlechart" id="heart-chart"></div>
                        <div className="breath-chart singlechart" id="breath-chart"></div>
                        <div className="turnover-chart singlechart" id="turnover-chart"></div>

                    </div>

                    <div className="m-dataTip" id="dataTip" style={{display: 'none'}}>
                        暂无数据！
                    </div>
                    <div className="m-statusTip" id="statusTip" style={{display: 'none'}}>
                        设备离线！
                    </div>
                    <div className="m-loading" id="loading" style={this.state.isLoad?{}:{display: 'none'}}>
                        加载中...
                    </div>

                    <div className='m-btn flex'>                        
                        <div className="m-btn-mn flex" >
                            <Link to="/live" style={{color: '#7748D6'}}>查看实时数据</Link>
                        </div>                   
                    </div>             
                </div>
            )
    }    
});

export default App;