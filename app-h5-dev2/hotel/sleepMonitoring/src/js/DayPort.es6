import Highcharts from 'highcharts';
import {CalendarControl1} from './CalendarControl1.es6';
import {Store} from './Store.es6';
import {Actions} from './Actions.es6';
import Path from './ApiPath.es6';
const DayPort = React.createClass({
    showNoData:function(id){
        var str = '暂无数据!';
        $('#'+id).html(str);
    },
    loadDayReportDataFromServer:function(date,flag){
        var _this=this,_data=_this.state.comData;
        $.ajax({
              url:Path.aPath+"/v1/app/csleep/summary/getDayReportData?accessToken="+_data.accessToken+"&appId="+_data.appId+"&relateDeviceIds="+_data.deviceId+"&timestamp="+new Date().getTime()+"&queryFlag="+flag+"&dataTime="+date,
              dataType: 'json',
              cache:true,
              async:true,
              success:function(r){
                if(r.code==0){
                    if(r.data.dataTime){
                        _this.setState({
                            date: new Date(r.data.dataTime.replace(/-/g, '/')),
                            sleepScope:r.data.sleepScope,
                            asleepDuration:r.data.asleepDuration,
                            fallSleepDuration:r.data.fallSleepDuration,
                            lightSleepDuration:r.data.lightSleepDuration,
                            wakeDuration:r.data.wakeDuration,
                            deepSleepDuration:r.data.deepSleepDuration,
                            wakePercent:r.data.wakePercent,
                            lightSleepPercent:r.data.lightSleepPercent,
                            deepSleepPercent:r.data.deepSleepPercent,
                        });
                        var h=r.data.sleepStatusList;
                        //睡眠状态
                        if(h.length<=0){
                            _this.showNoData('sleepState-chart');
                        }else{
                            let ary = [];
                            for(let i in h){
                                let value = parseInt(h[i].status);
                                let timeStr=h[i].startTime;
                                timeStr = new Date(timeStr.replace(/\-/g,'/')).getTime() + 8*3600*1000;
                                ary[i] = [];
                                ary[i][0] = timeStr;
                                ary[i][1] = value;
                            }

                            let timeStart = new Date((h[0].startTime.substr(0,15)).replace(/\-/g,'/')+'0:00').getTime()+8*3600*1000;
                            let len = ary.length;
                            let timeEnd = ary[len-1][0]-ary[0][0];
                            timeEnd = timeEnd/60000;
                            timeEnd = _this.getTimeSection(timeEnd);
                            if(timeEnd>15&&timeEnd<30) timeEnd = 30;
                            if(timeEnd>60&&timeEnd<120) timeEnd = 120;
                            let data = [];
                            for(let i = 0;i<ary.length;i++){
                                data[i] = {};
                                data[i].marker = ary[i][1];
                                switch(ary[i][1]){
                                    case 1:
                                        data[i].x = ary[i][0];
                                        data[i].y = 9;
                                        break;
                                    case 2:
                                        data[i].x = ary[i][0];
                                        data[i].y = 6;
                                      break;
                                    case 3:
                                        data[i].x = ary[i][0];
                                        data[i].y = 4.5;
                                      break;
                                    case 4:
                                        data[i].x = ary[i][0];
                                        data[i].y = 1.5;
                                      break;
                                    case 5:
                                        data[i].x = ary[i][0];
                                        data[i].y = 9;
                                      break;
                                    case 6:
                                        data[i].x = ary[i][0];
                                        data[i].y = 9;
                                      break;
                                    case 7:
                                        data[i].x = ary[i][0];
                                        data[i].y = 9;
                                      break;
                                    case 8:
                                        data[i].x = ary[i][0];
                                        data[i].y = 9;
                                      break;
                                    default:
                                        data[i].x = ary[i][0];
                                        data[i].y = 9;
                                }
                            }
                            Highcharts.chart('sleepState-chart',{
                                credits: {
                                    text: '',
                                    href: '',
                                },
                                chart: {
                                    spacing:[8,12,8,4],
                                    reflow: true,
                                },
                                title: {
                                    text: '睡眠状态'
                                },
                                xAxis: {
                                    labels: {
                                        enabled:true,
                                        endOnTick: false,
                                        formatter: function(){
                                            return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                        }
                                    },
                                    type: 'datetime',
                                    minRange: timeEnd*6*60*1000,
                                    tickInterval: timeEnd*60*1000,
                                    minTickInterval: 5*60*1000,
                                    maxPadding: 0.05,
                                    tickLength: 0,
                                    startOnTick: true,
                                    minPadding: 0,
                                    min: timeStart, 
                                },
                                yAxis: {
                                    title: '',
                                    startOnTick: true,
                                    minPadding: 0,
                                    min: 0,
                                    minRange: 9,
                                    tickAmount: 5,
                                    tickInterval: 1,
                                    minTickInterval: 3, 
                                    tickPositioner: function () {
                                                    var positions = [0,3,6,9,12];
                                                    return positions;
                                    },
                                    labels: {
                                        align: 'center',
                                        x: -10,
                                        y: 4,
                                        step: 1,
                                        formatter: function(){
                                            if(this.value==0){
                                                return ''
                                            }
                                            if(this.value>0&&this.value<=3){
                                                return '深睡'
                                            }
                                            if(this.value>3&&this.value<=6){
                                                return '浅睡'
                                            }
                                            if(this.value>6&&this.value<=9){
                                                return '清醒'
                                            }
                                            if(this.value>9&&this.value<=12){
                                                return ''
                                            }

                                        }
                                    }
                                },
                                tooltip:{
                                    enabled:false
                                },
                                plotOptions: {
                                    areaspline: {
                                        fillColor: {
                                            linearGradient: {
                                                x1: 0,
                                                y1: 0,
                                                x2: 1,
                                                y2: 1
                                            },
                                            stops: [
                                                [0, Highcharts.getOptions().colors[9]],
                                                [1, Highcharts.Color(Highcharts.getOptions().colors[7]).setOpacity(0).get('rgba')]
                                            ]
                                        },
                                        lineColor: '#1dccb1',
                                        lineWidth:1,
                                    },
                                    series:{
                                        dataLabels: {
                                            enabled: true,
                                            borderRadius: 0,
                                            allowOverlap: true,
                                            shape: 'callout',   
                                            crop: false,
                                            verticalAlign: 'bottom',
                                            overflow: 'none',
                                            color:'#ffffff',
                                            shadow:'#ffffff',
                                            backgroundColor: 'rgba(29, 204, 177,0.8)',
                                            style:{"textShadow": "#ffffff","fontWeight": "normal","fontSize":"8px",'width':'8px','height':'8px'},
                                            formatter:function () {
                                                var _y=this.point.marker, _yStr="";
                                                   switch (_y){
                                                     case 1:_yStr="上床";
                                                     break;
                                                     case 2:_yStr="入睡";
                                                     break;
                                                     case 3:_yStr="浅睡";
                                                     break;
                                                     case 4:_yStr="深睡";
                                                     break;
                                                     case 5:_yStr="觉醒";
                                                     break;
                                                     case 6:_yStr="懒床";
                                                     break;
                                                     case 7:_yStr="起床";
                                                     break;
                                                     case 8:_yStr="上床";
                                                     break;
                                                     default:_yStr="离床";
                                                   }
                                                return _yStr;
                                            },
                                            y: -12
                                        },
                                        marker: {
                                            lineWidth: 1,
                                            lineColor: '#1dccb1',
                                            fillColor:'#ffffff',
                                            radius:1
                                        }
                                    }
                                },
                                legend: {
                                    enabled: false
                                },
                                series: [{
                                    name:'睡眠状态',
                                    type: 'areaspline',
                                    data:  data,  //_this.changeData(r.data.sleepStatusList)
                                }]
                            });
                            //console.log(data);
                            _this.loadDayReportTotalFromServer(date,flag,_this,_data,timeEnd);
                        }

                    }else{
                        $('#dataTip').css({display: 'block'});
                        _this.showTip = setTimeout(function(){
                            $('#dataTip').css({display: 'none'});
                        },1000);
                        // _this.showNoData('sleepState-chart');
                    }
                    
                }
              },
        });     
    },
    loadDayReportTotalFromServer:function(date,flag,th,dt,endTime){//TODO：获取日报告心率、呼吸率、翻身、打鼾、咳嗽、呼吸暂停统计数据
        let _this=th;
        let data=dt;
        var url = Path.aPath+"/v1/app/csleep/summary/getDayReportTotal?accessToken="+data.accessToken+"&appId="+data.appId+"&relateDeviceIds="+data.deviceId+"&timestamp="+new Date().getTime()+"&queryFlag="+flag+"&dataTime="+date;
        $.ajax({
          url: url,
          //url: _url2,
          dataType: 'json',
          cache:true,
          async:true,
          success:function(r){
            if(r.code==0){

                //心率  

                if(r.data.heartRateList.length<=0){
                    //_this.showNoData('heartRate-chart');
                }else{
                    let ary = [];
                    let heartRateList = r.data.heartRateList;
                    for(let i in heartRateList){
                        let value = parseInt(heartRateList[i].value);
                        let timeStr=heartRateList[i].key;
                        //timeStr = _this.getTime(timeStr);
                        timeStr = new Date(timeStr.replace(/\-/g,'/')).getTime() + 8*3600*1000;
                        ary[i] = [];
                        ary[i][0] = timeStr;
                        ary[i][1] = value;
                    }
                    let timeStart = new Date((r.data.heartRateList[0].key.substr(0,15)).replace(/\-/g,'/')+'0:00').getTime()+8*3600*1000;
                    let len = ary.length;
                    let timeEnd = ary[len-1][0]-ary[0][0];
                    //console.log(timeStart)
                    Highcharts.chart('heartRate-chart',{
                        credits: {
                            text: '',
                            href: ''
                        },
                        chart: {
                            type: 'area',
                            spacing:[8,12,8,-6],
                            reflow: true,
                            zoomType:'x',
                            resetZoomButton: {
                                theme: {
                                    display: 'none'
                                }
                            }
                        },
                        title:{
                            text:'心率',
                            fontWeight:'bold',
                            y: 25
                        },
                        tooltip:{
                            enabled:false
                        },
                        xAxis: {
                             labels: {
                                 enabled:true,
                                 endOnTick: false,
                                 formatter: function(){
                                     return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                 },
                                 
                             },
                             type: 'datetime',
                             minRange: endTime*6*60*1000,
                             tickInterval: endTime*60*1000,
                             minTickInterval: 5*60*1000,
                             maxPadding: 0.05,
                             tickLength: 0,
                             startOnTick: true,
                             min: timeStart,
                             minPadding: 0,
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
                            }
                        },
                        plotOptions: {
                            area: {
                                fillColor: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 1,
                                        y2: 1
                                    },
                                    stops: [
                                        [0, Highcharts.getOptions().colors[3]],
                                        [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0).get('rgba')]
                                    ]
                                },
                                lineColor: '#ffe26e',
                                lineWidth:1,
                            },
                            series:{
                                marker: {
                                    lineWidth: 1,
                                    lineColor: '#ffe26e',
                                    fillColor:'#ffffff',
                                    radius:1
                                }
                            }
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
                            data: ary,                        //_this.changeData(r.data.heartRateList)
                        }]
                    });
                }

                //呼吸率

                if(r.data.heartRateList.length<=0){
                    //_this.showNoData('breathRate-chart');
                }else{
                    let ary = [];
                    let breathRateList = r.data.breathRateList;
                    for(let i in breathRateList){
                        let value = parseInt(breathRateList[i].value);
                        let timeStr=breathRateList[i].key;
                        //timeStr = _this.getTime(timeStr);
                        timeStr = new Date(timeStr.replace(/\-/g,'/')).getTime() + 8*3600*1000;
                        ary[i] = [];
                        ary[i][0] = timeStr;
                        ary[i][1] = value;
                    }
                    let timeStart = new Date((r.data.breathRateList[0].key.substr(0,15)).replace(/\-/g,'/')+'0:00').getTime()+8*3600*1000;
                    let len = ary.length;
                    let timeEnd = ary[len-1][0]-ary[0][0];
                    //console.log(timeEnd)
                    Highcharts.chart('breathRate-chart',{
                                credits: {
                                    text: '',
                                    href: ''
                                },
                                chart: {
                                    type: 'area',
                                    spacing:[8,12,8,0],
                                    reflow: true,
                                    zoomType:'x',
                                    resetZoomButton: {
                                        theme: {
                                            display: 'none'
                                        }
                                    }
                                },
                                title:{
                                    text:'呼吸率',
                                    fontWeight:'bold',
                                    y: 25
                                },
                                tooltip:{
                                    enabled:false
                                },

                                xAxis: {
                                    labels: {
                                        enabled:true,
                                        endOnTick: false,
                                        //align: 'center',
                                        //step: 1,
                                        formatter: function(){
                                            return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                        },
                                        
                                    },
                                    type: 'datetime',
                                    minRange: endTime*6*60*1000,
                                    tickInterval: endTime*60*1000,
                                    minTickInterval: 5*60*1000,
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
                                    }
                                },
                                plotOptions: {
                                    area: {
                                        fillColor: {
                                            linearGradient: {
                                                x1: 0,
                                                y1: 0,
                                                x2: 1,
                                                y2: 1
                                            },
                                            stops: [
                                                [0, Highcharts.getOptions().colors[3]],
                                                [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0).get('rgba')]
                                            ]
                                        },
                                        lineColor: '#ffe26e',
                                        lineWidth:1,
                                    },
                                    series:{
                                        marker: {
                                            lineWidth: 1,
                                            lineColor: '#ffe26e',
                                            fillColor:'#ffffff',
                                            radius:1
                                        }
                                    }
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
                                    data: ary,    //_this.changeData(r.data.breathRateList)
                                }]
                    });
                }

                //翻身

                if(r.data.heartRateList.length<=0){
                    //_this.showNoData('turnOver-chart');
                }else{
                    let ary = [];
                    let turnOverList = r.data.turnOverList;
                    for(let i in turnOverList){
                        let value = parseInt(turnOverList[i].value);
                        let timeStr=turnOverList[i].key;
                        //timeStr = _this.getTime(timeStr);
                        timeStr = new Date(timeStr.replace(/\-/g,'/')).getTime() + 8*3600*1000;
                        ary[i] = [];
                        ary[i][0] = timeStr;
                        ary[i][1] = value;
                    }
                    let timeStart = new Date((r.data.turnOverList[0].key.substr(0,15)).replace(/\-/g,'/')+'0:00').getTime()+8*3600*1000;
                    let len = ary.length;
                    let timeEnd = ary[len-1][0]-ary[0][0];
                    //console.log(timeEnd)
                    
                    Highcharts.chart('turnOver-chart',{
                                credits: {
                                    text: '',
                                    href: ''
                                },
                                chart: {
                                    type: 'area',
                                    spacing:[8,12,8,0],
                                    reflow: true,
                                    zoomType:'x',
                                    resetZoomButton: {
                                        theme: {
                                            display: 'none'
                                        }
                                    }
                                },
                                title:{
                                    text:'翻身',
                                    fontWeight:'bold',
                                    y: 25
                                },
                                tooltip:{
                                    enabled:false
                                },
                                xAxis: {
                                    labels: {
                                        enabled:true,
                                        endOnTick: false,
                                        //align: 'center',
                                        //step: 1,
                                        formatter: function(){
                                            return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                        },
                                        
                                    },
                                    type: 'datetime',
                                    minRange: endTime*6*60*1000,
                                    tickInterval: endTime*60*1000,
                                    minTickInterval: 5*60*1000,
                                    maxPadding: 0.05,
                                    tickLength: 0,
                                    startOnTick: true,
                                    minPadding: 0,
                                    min: timeStart,
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
                                    }
                                },
                                plotOptions: {
                                    area: {
                                        fillColor: {
                                            linearGradient: {
                                                x1: 0,
                                                y1: 0,
                                                x2: 1,
                                                y2: 1
                                            },
                                            stops: [
                                                [0, Highcharts.getOptions().colors[3]],
                                                [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0).get('rgba')]
                                            ]
                                        },
                                        lineColor: '#ffe26e',
                                        lineWidth:1,
                                    },
                                    series:{
                                        marker: {
                                            lineWidth: 1,
                                            lineColor: '#ffe26e',
                                            fillColor:'#ffffff',
                                            radius:1
                                        }
                                    }
                                },
                                legend: {
                                    enabled: false
                                },
                                series: [
                                {
                                    name:'翻身',
                                    type: 'area',
                                    states: {
                                        hover: {
                                            enabled: false
                                        }
                                    },
                                    data: ary,    //_this.changeData(r.data.turnOverList)
                                }]
                    });
                }
            }
          },
        });
    },
    getTimeSection: function(num){
        let a = Math.ceil(num/60)*10;
        return a
    },
    componentDidMount: function() {
        if(this.isMounted()){
            //隐藏浮层
            if($('#appdownload')){
               $('#appdownload').css({display: 'none'});
               $('#m-tabselect').css({bottom: 0});
            }
            //Actions.getParam();
            Highcharts.setOptions({global:{useUTC:false}});
            var url = Path.wPath + '/wechat/hotel/getParam';
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
                            deviceNamesShow = res.data.deviceNamesShow.split('_')[0]||res.data.deviceNamesShow,
                            deviceId = res.data.deviceId.split('_')[0]||res.data.deviceId;
                        //console.log([accessToken,appId,deviceNames,deviceId]);
                        var comData = {
                            accessToken:accessToken,
                            appId:appId,
                            deviceNamesShow:deviceNamesShow,
                            deviceId:deviceId
                        };
                        _this.setState({comData:comData});
                        //console.log(comData)
                        var end=_this.state.date,
                            endYear=end.getFullYear() ,
                            endMonth=end.getMonth()+1 ,
                            endDay=end.getDate(),
                            datestr=endYear+"-"+_this.format(endMonth)+"-"+_this.format(endDay);
                            let _url1 = Path.aPath+"/v1/app/csleep/summary/getDayReportData?accessToken="+accessToken+"&appId="+appId+"&relateDeviceIds="+deviceId+"&timestamp="+new Date().getTime()+"&queryFlag=1&dataTime="+datestr;
                            $.ajax({
                                  url: _url1,
                                  //url: '../static/js/data2.txt',
                                  dataType: 'json',
                                  cache:true,
                                  async:true,
                                  success:function(r){
                                    if(r.code==0){
                                        if(r.data.dataTime){
                                            _this.setState({
                                                date: new Date(r.data.dataTime.replace(/-/g, '/')),
                                                sleepScope:r.data.sleepScope,
                                                asleepDuration:r.data.asleepDuration,
                                                fallSleepDuration:r.data.fallSleepDuration,
                                                lightSleepDuration:r.data.lightSleepDuration,
                                                wakeDuration:r.data.wakeDuration,
                                                deepSleepDuration:r.data.deepSleepDuration,
                                                wakePercent:r.data.wakePercent,
                                                lightSleepPercent:r.data.lightSleepPercent,
                                                deepSleepPercent:r.data.deepSleepPercent,
                                            });

                                            var h=r.data.sleepStatusList,_ary=[];
                                            //睡眠状态
                                            if(h.length<=0){
                                                _this.showNoData('sleepState-chart');
                                                _this.showNoData('heartRate-chart');
                                                _this.showNoData('breathRate-chart');
                                                _this.showNoData('turnOver-chart');
                                            }else{
                                                let _ary = [];
                                                for(let i in h){
                                                    let _value = parseInt(h[i].status);
                                                    let _timeStr=h[i].startTime;
                                                    //timeStr = _this.getTime(timeStr);
                                                    _timeStr = new Date(_timeStr.replace(/\-/g,'/')).getTime() + 8*3600*1000;
                                                    _ary[i] = [];
                                                    _ary[i][0] = _timeStr;
                                                    _ary[i][1] = _value;
                                                }

                                                let _timeStart = new Date((h[0].startTime.substr(0,15)).replace(/\-/g,'/')+'0:00').getTime()+8*3600*1000;
                                                let _len = _ary.length;
                                                let _timeEnd = _ary[_len-1][0]-_ary[0][0];
                                                _timeEnd = _timeEnd/60000;
                                                _timeEnd = _this.getTimeSection(_timeEnd);
                                                if(_timeEnd>15&&_timeEnd<30) _timeEnd = 30;
                                                if(_timeEnd>60&&_timeEnd<120) _timeEnd = 120;
                                                //console.log(_timeStart,_timeEnd);
                                                let data = [];
                                                for(let i = 0;i<_ary.length;i++){
                                                    data[i] = {};
                                                    data[i].marker = _ary[i][1];
                                                    switch(_ary[i][1]){
                                                        case 1:
                                                            data[i].x = _ary[i][0];
                                                            data[i].y = 9;
                                                            break;
                                                        case 2:
                                                            data[i].x = _ary[i][0];
                                                            data[i].y = 6;
                                                          break;
                                                        case 3:
                                                            data[i].x = _ary[i][0];
                                                            data[i].y = 4.5;
                                                          break;
                                                        case 4:
                                                            data[i].x = _ary[i][0];
                                                            data[i].y = 1.5;
                                                          break;
                                                        case 5:
                                                            data[i].x = _ary[i][0];
                                                            data[i].y = 9;
                                                          break;
                                                        case 6:
                                                            data[i].x = _ary[i][0];
                                                            data[i].y = 9;
                                                          break;
                                                        case 7:
                                                            data[i].x = _ary[i][0];
                                                            data[i].y = 9;
                                                          break;
                                                        case 8:
                                                            data[i].x = _ary[i][0];
                                                            data[i].y = 9;
                                                          break;
                                                        default:
                                                            data[i].x = _ary[i][0];
                                                            data[i].y = 9;
                                                    }
                                                }
                                                Highcharts.chart('sleepState-chart',{
                                                    credits: {
                                                        text: '',
                                                        href: '',
                                                    },
                                                    chart: {
                                                        spacing:[8,12,8,4],
                                                        reflow: true,
                                                    },
                                                    title: {
                                                        text: '睡眠状态',
                                                        fontWeight: 'bold',
                                                        y: 20
                                                    },
                                                    xAxis: {
                                                        labels: {
                                                            enabled:true,
                                                            endOnTick: false,
                                                            //align: 'center',
                                                            //step: 1,
                                                            formatter: function(){
                                                                return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                                            }
                                                        },
                                                        type: 'datetime',
                                                        minRange: _timeEnd*6*60*1000,
                                                        tickInterval: _timeEnd*60*1000,
                                                        minTickInterval: 5*60*1000,
                                                        maxPadding: 0.05,
                                                        tickLength: 0,
                                                        startOnTick: true,
                                                        minPadding: 0,
                                                        min: _timeStart, 
                                                    },
                                                    yAxis: {
                                                        title: '',
                                                        startOnTick: true,
                                                        minPadding: 0,
                                                        min: 0,
                                                        minRange: 9,
                                                        tickAmount: 5,
                                                        tickInterval: 1,
                                                        minTickInterval: 3, 
                                                        tickPositioner: function () {
                                                                        var positions = [0,3,6,9,12];
                                                                        return positions;
                                                        },
                                                        labels: {
                                                            align: 'center',
                                                            x: -10,
                                                            y: 4,
                                                            step: 1,
                                                            formatter: function(){
                                                                if(this.value==0){
                                                                    return ''
                                                                }
                                                                if(this.value>0&&this.value<=3){
                                                                    return '深睡'
                                                                }
                                                                if(this.value>3&&this.value<=6){
                                                                    return '浅睡'
                                                                }
                                                                if(this.value>6&&this.value<=9){
                                                                    return '清醒'
                                                                }
                                                                if(this.value>9&&this.value<=12){
                                                                    return ''
                                                                }

                                                            }
                                                        }
                                                    },
                                                    tooltip:{
                                                        enabled:false
                                                    },
                                                    plotOptions: {
                                                        areaspline: {
                                                            fillColor: {
                                                                linearGradient: {
                                                                    x1: 0,
                                                                    y1: 0,
                                                                    x2: 1,
                                                                    y2: 1
                                                                },
                                                                stops: [
                                                                    [0, Highcharts.getOptions().colors[9]],
                                                                    [1, Highcharts.Color(Highcharts.getOptions().colors[7]).setOpacity(0).get('rgba')]
                                                                ]
                                                            },
                                                            lineColor: '#1dccb1',
                                                            lineWidth:1,
                                                        },
                                                        series:{
                                                            dataLabels: {
                                                                enabled: true,
                                                                borderRadius: 0,
                                                                allowOverlap: true,
                                                                shape: 'callout',   
                                                                crop: false,
                                                                verticalAlign: 'bottom',
                                                                overflow: 'none',
                                                                color:'#ffffff',
                                                                shadow:'#ffffff',
                                                                backgroundColor: 'rgba(29, 204, 177,0.8)',
                                                                style:{"textShadow": "#ffffff","fontWeight": "normal","fontSize":"8px",'width':'8px','height':'8px'},
                                                                formatter:function () {
                                                                    var _y=this.point.marker, _yStr="";
                                                                       switch (_y){
                                                                         case 1:_yStr="上床";
                                                                         break;
                                                                         case 2:_yStr="入睡";
                                                                         break;
                                                                         case 3:_yStr="浅睡";
                                                                         break;
                                                                         case 4:_yStr="深睡";
                                                                         break;
                                                                         case 5:_yStr="觉醒";
                                                                         break;
                                                                         case 6:_yStr="懒床";
                                                                         break;
                                                                         case 7:_yStr="起床";
                                                                         break;
                                                                         case 8:_yStr="上床";
                                                                         break;
                                                                         default:_yStr="离床";
                                                                       }
                                                                    return _yStr;
                                                                },
                                                                y: -12
                                                            },
                                                            marker: {
                                                                lineWidth: 1,
                                                                lineColor: '#1dccb1',
                                                                fillColor:'#ffffff',
                                                                radius:1
                                                            }
                                                        }
                                                    },
                                                    legend: {
                                                        enabled: false
                                                    },
                                                    series: [{
                                                        name:'睡眠状态',
                                                        type: 'areaspline',
                                                        data:  data,  //_this.changeData(r.data.sleepStatusList)
                                                    }]
                                                });

                                                let _url2 = Path.aPath+"/v1/app/csleep/summary/getDayReportTotal?accessToken="+accessToken+"&appId="+appId+"&relateDeviceIds="+deviceId+"&timestamp="+new Date().getTime()+"&queryFlag=1&dataTime="+datestr;
                                                $.ajax({
                                                  //url: '../static/js/data.txt',
                                                  url: _url2,
                                                  dataType: 'json',
                                                  cache:true,
                                                  async:true,
                                                  success:function(r){
                                                    if(r.code==0){

                                                        //心率  

                                                        if(r.data.heartRateList.length<=0){
                                                            
                                                        }else{
                                                            let ary = [];
                                                            let heartRateList = r.data.heartRateList;
                                                            for(let i in heartRateList){
                                                                let value = parseInt(heartRateList[i].value);
                                                                let timeStr=heartRateList[i].key;
                                                                //timeStr = _this.getTime(timeStr);
                                                                timeStr = new Date(timeStr.replace(/\-/g,'/')).getTime() + 8*3600*1000;
                                                                ary[i] = [];
                                                                ary[i][0] = timeStr;
                                                                ary[i][1] = value;
                                                            }
                                                            let timeStart = new Date((r.data.heartRateList[0].key.substr(0,15)).replace(/\-/g,'/')+'0:00').getTime()+8*3600*1000;
                                                            let len = ary.length;
                                                            let timeEnd = _timeEnd;
                                                            Highcharts.chart('heartRate-chart',{
                                                                    credits: {
                                                                        text: '',
                                                                        href: ''
                                                                    },
                                                                    chart: {
                                                                        spacing:[8,12,8,-6],
                                                                        reflow: true,
                                                                    },
                                                                    title:{
                                                                        text:'心率',
                                                                        fontWeight:'bold',
                                                                        y: 25
                                                                    },
                                                                    tooltip:{
                                                                        enabled:false
                                                                    },
                                                                    xAxis: {
                                                                         labels: {
                                                                             enabled:true,
                                                                             endOnTick: false,
                                                                             //align: 'center',
                                                                             //step: 1,
                                                                             formatter: function(){
                                                                                 return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                                                             },
                                                                             
                                                                         },
                                                                         type: 'datetime',
                                                                         minRange: timeEnd*6*60*1000,
                                                                         tickInterval: timeEnd*60*1000,
                                                                         minTickInterval: 5*60*1000,
                                                                         maxPadding: 0.05,
                                                                         tickLength: 0,
                                                                         startOnTick: true,
                                                                         min: timeStart,
                                                                         minPadding: 0,
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
                                                                        }
                                                                    },
                                                                    plotOptions: {
                                                                        area: {
                                                                            fillColor: {
                                                                                linearGradient: {
                                                                                    x1: 0,
                                                                                    y1: 0,
                                                                                    x2: 1,
                                                                                    y2: 1
                                                                                },
                                                                                stops: [
                                                                                    [0, Highcharts.getOptions().colors[3]],
                                                                                    [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0).get('rgba')]
                                                                                ]
                                                                            },
                                                                            lineColor: '#ffe26e',
                                                                            lineWidth:1,
                                                                        },
                                                                        series:{
                                                                            marker: {
                                                                                lineWidth: 1,
                                                                                lineColor: '#ffe26e',
                                                                                fillColor:'#ffffff',
                                                                                radius:1
                                                                            }
                                                                        }
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
                                                                        data: ary,                        //_this.changeData(r.data.heartRateList)
                                                                    }]
                                                                });
                                                        }

                                                        //呼吸率

                                                        if(r.data.heartRateList.length<=0){
                                                            
                                                        }else{
                                                            let ary = [];
                                                            let breathRateList = r.data.breathRateList;
                                                            for(let i in breathRateList){
                                                                let value = parseInt(breathRateList[i].value);
                                                                let timeStr=breathRateList[i].key;
                                                                //timeStr = _this.getTime(timeStr);
                                                                timeStr = new Date(timeStr.replace(/\-/g,'/')).getTime() + 8*3600*1000;
                                                                ary[i] = [];
                                                                ary[i][0] = timeStr;
                                                                ary[i][1] = value;
                                                            }
                                                            let timeStart = new Date((r.data.breathRateList[0].key.substr(0,15)).replace(/\-/g,'/')+'0:00').getTime()+8*3600*1000;
                                                            let len = ary.length;
                                                            let timeEnd = _timeEnd;
                                                            //let timeEnd = ary[len-1][0]-ary[0][0];
                                                            //console.log(timeEnd)
                                                            Highcharts.chart('breathRate-chart',{
                                                                        credits: {
                                                                            text: '',
                                                                            href: ''
                                                                        },
                                                                        chart: {
                                                                            spacing:[8,12,8,0],
                                                                            reflow: true,
                                                                        },
                                                                        title:{
                                                                            text:'呼吸率',
                                                                            fontWeight:'bold',
                                                                            y: 25
                                                                        },
                                                                        tooltip:{
                                                                            enabled:false
                                                                        },

                                                                        xAxis: {
                                                                            labels: {
                                                                                enabled:true,
                                                                                endOnTick: false,
                                                                                //align: 'center',
                                                                                //step: 1,
                                                                                formatter: function(){
                                                                                    return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                                                                },
                                                                                
                                                                            },
                                                                            type: 'datetime',
                                                                            minRange: timeEnd*6*60*1000,
                                                                            tickInterval: timeEnd*60*1000,
                                                                            minTickInterval: 5*60*1000,
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
                                                                            }
                                                                        },
                                                                        plotOptions: {
                                                                            area: {
                                                                                fillColor: {
                                                                                    linearGradient: {
                                                                                        x1: 0,
                                                                                        y1: 0,
                                                                                        x2: 1,
                                                                                        y2: 1
                                                                                    },
                                                                                    stops: [
                                                                                        [0, Highcharts.getOptions().colors[3]],
                                                                                        [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0).get('rgba')]
                                                                                    ]
                                                                                },
                                                                                lineColor: '#ffe26e',
                                                                                lineWidth:1,
                                                                            },
                                                                            series:{
                                                                                marker: {
                                                                                    lineWidth: 1,
                                                                                    lineColor: '#ffe26e',
                                                                                    fillColor:'#ffffff',
                                                                                    radius:1
                                                                                }
                                                                            }
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
                                                                            data: ary,    //_this.changeData(r.data.breathRateList)
                                                                        }]
                                                            });
                                                        }

                                                        //翻身

                                                        if(r.data.heartRateList.length<=0){
                                                            
                                                        }else{
                                                            let ary = [];
                                                            let turnOverList = r.data.turnOverList;
                                                            for(let i in turnOverList){
                                                                let value = parseInt(turnOverList[i].value);
                                                                let timeStr=turnOverList[i].key;
                                                                //timeStr = _this.getTime(timeStr);
                                                                timeStr = new Date(timeStr.replace(/\-/g,'/')).getTime() + 8*3600*1000;
                                                                ary[i] = [];
                                                                ary[i][0] = timeStr;
                                                                ary[i][1] = value;
                                                            }
                                                            let timeStart = new Date((r.data.turnOverList[0].key.substr(0,15)).replace(/\-/g,'/')+'0:00').getTime()+8*3600*1000;
                                                            let len = ary.length;
                                                            let timeEnd = _timeEnd;
                                                            //let timeEnd = ary[len-1][0]-ary[0][0];
                                                            //console.log(timeEnd)
                                                            
                                                            Highcharts.chart('turnOver-chart',{
                                                                        credits: {
                                                                            text: '',
                                                                            href: ''
                                                                        },
                                                                        chart: {
                                                                            spacing:[8,12,8,0],
                                                                            reflow: true,
                                                                        },
                                                                        title:{
                                                                            text:'翻身',
                                                                            fontWeight:'bold',
                                                                            y: 25
                                                                        },
                                                                        tooltip:{
                                                                            enabled:false
                                                                        },
                                                                        xAxis: {
                                                                            labels: {
                                                                                enabled:true,
                                                                                endOnTick: false,
                                                                                //align: 'center',
                                                                                //step: 1,
                                                                                formatter: function(){
                                                                                    return (_this.format(new Date(this.value).getHours())+':'+_this.format(new Date(this.value).getMinutes()))
                                                                                },
                                                                                
                                                                            },
                                                                            type: 'datetime',
                                                                            minRange: timeEnd*6*60*1000,
                                                                            tickInterval: timeEnd*60*1000,
                                                                            minTickInterval: 5*60*1000,
                                                                            maxPadding: 0.05,
                                                                            tickLength: 0,
                                                                            startOnTick: true,
                                                                            minPadding: 0,
                                                                            min: timeStart,
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
                                                                            }
                                                                        },
                                                                        plotOptions: {
                                                                            area: {
                                                                                fillColor: {
                                                                                    linearGradient: {
                                                                                        x1: 0,
                                                                                        y1: 0,
                                                                                        x2: 1,
                                                                                        y2: 1
                                                                                    },
                                                                                    stops: [
                                                                                        [0, Highcharts.getOptions().colors[3]],
                                                                                        [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0).get('rgba')]
                                                                                    ]
                                                                                },
                                                                                lineColor: '#ffe26e',
                                                                                lineWidth:1,
                                                                            },
                                                                            series:{
                                                                                marker: {
                                                                                    lineWidth: 1,
                                                                                    lineColor: '#ffe26e',
                                                                                    fillColor:'#ffffff',
                                                                                    radius:1
                                                                                }
                                                                            }
                                                                        },
                                                                        legend: {
                                                                            enabled: false
                                                                        },
                                                                        series: [
                                                                        {
                                                                            name:'翻身',
                                                                            type: 'area',
                                                                            states: {
                                                                                hover: {
                                                                                    enabled: false
                                                                                }
                                                                            },
                                                                            data: ary,    //_this.changeData(r.data.turnOverList)
                                                                        }]
                                                            });
                                                        }
                                                    }
                                                  },
                                                });
                                            }
                                        }else{
                                            _this.showNoData('sleepState-chart');
                                            _this.showNoData('heartRate-chart');
                                            _this.showNoData('breathRate-chart');
                                            _this.showNoData('turnOver-chart');
                                            $('#dataTip').css({display: 'block'});
                                            _this.showTip = setTimeout(function(){
                                                $('#dataTip').css({display: 'none'});
                                            },1000);
                                        }
                                    }
                                  },
                            });  

                    }
                }
            }); 
            
        }
    },
    changeData:function(data){
        var _this=this,tempData=[];
           for(var i in data){
             if(Number(data[i].value)>=0&&data[i].value!=null){
                tempData.push([Number(data[i].value)]);
             }else if(Number(data[i].key)&&data[i].key!=null){
                tempData.push(Number(data[i].key));
             }else{//睡眠状态（1-上床，2-入睡，3-浅睡，4-深睡，5-觉醒，6-懒床，7-起床，8-再次上床，9-中途起床)
                switch (Number(data[i].status)){
                    case 1:
                      tempData.push({
                            y: 2,
                            marker: 1
                      });
                      break;
                    case 2:
                      tempData.push({
                            y: 2,
                            marker: 2
                      });
                      break;
                    case 3:
                      tempData.push({
                            y: 1,
                            marker: 3
                      });
                      break;
                    case 4:
                      tempData.push({
                            y: 0,
                            marker: 4
                      });
                      break;
                    case 5:
                      tempData.push({
                            y: 2,
                            marker: 5
                      });
                      break;
                    case 6:
                      tempData.push({
                            y: 2,
                            marker: 6
                      });
                      break;
                    case 7:
                      tempData.push({
                            y: 2,
                            marker: 7
                      });
                      break;
                    case 8:
                      tempData.push({
                            y: 2,
                            marker: 8
                      });
                      break;
                    default:
                      tempData.push({
                            y: 2,
                            marker: 0
                      });

                }
            }
        }
        return tempData;
    },
    endDay:function(e){
        var end=this.state.date,
        aDay=1*24*60*60*1000,
        type = e.target.getAttribute('data-type');
        // endYear=end.getFullYear(),
        // endMonth=end.getMonth()+1;
        var newDay,newMonth,newYear,datestr;
        if(type=="next"){  
            end=new Date(end.valueOf() + aDay);
            // this.setState({date:end});
            newDay=end.getDate();
            newMonth=end.getMonth()+1;
            newYear=end.getFullYear();
            datestr=newYear+"-"+this.format(newMonth)+"-"+this.format(newDay);
            this.loadDayReportDataFromServer(datestr,2);
            //this.loadDayReportTotalFromServer(datestr,2);
        }else if(type=="pre"){
            end=new Date(end.valueOf() - aDay);
            //this.setState({date:end});
            newDay=end.getDate();
            newMonth=end.getMonth()+1;
            newYear=end.getFullYear();
            datestr=newYear+"-"+this.format(newMonth)+"-"+this.format(newDay);
            this.loadDayReportDataFromServer(datestr,1);
            //this.loadDayReportTotalFromServer(datestr,1); 
        } 
    },
    format: function(d) {
        return d >= 10 ? d : ("0"+d);
    },
    getTime:function(dateStr){
        dateStr=new Date(new Date(dateStr.replace(/-/g, '/')).getTime()+8*3600*1000);
        return this.format(new Date(dateStr).getHours())+":"+this.format(new Date(dateStr).getMinutes());
    },
    getInitialState: function(){

        var now=new Date(),aDay=1*24*60*60*1000;
        return {
            date:new Date(now.valueOf() - aDay),
            sleepScope:"0~0",
            asleepDuration:0,
            fallSleepDuration:0,
            lightSleepDuration:0,
            wakeDuration:0,
            deepSleepDuration:0,
            wakePercent:0,
            lightSleepPercent:0,
            deepSleepPercent:0,
            comData:''
        };
    },
    showCalendar:function(e){
        var carlendarBody=document.getElementsByClassName("calendarBorder1")[0],
        _display=carlendarBody.style.display;
        if(_display=="none"||_display==""){
            carlendarBody.style.display="block";
        }else{
            carlendarBody.style.display='none';
        }
    },
    onChildChanged:function(curDate){
        var _date= new Date(curDate);
        //this.setState({date:_date})
        this.loadDayReportDataFromServer(curDate,0);
        this.loadDayReportTotalFromServer(curDate,0);
    },
    render: function() {
        var end=this.state.date,
            endYear=end.getFullYear(),
            endMonth=end.getMonth()+1,
            endDay=end.getDate(),
            datestr=endYear+"-"+this.format(endMonth)+"-"+this.format(endDay),
            sleepScope=this.state.sleepScope.split("~"),
            asleepDuration=this.state.asleepDuration,
            fallSleepDuration=this.state.fallSleepDuration,
            lightSleepDuration=this.state.lightSleepDuration,
            wakeDuration=this.state.wakeDuration,
            deepSleepDuration=this.state.deepSleepDuration,
            wakePercent=this.state.wakePercent,
            lightSleepPercent=this.state.lightSleepPercent,            
            deepSleepPercent=this.state.deepSleepPercent;
        return (
            <div className="wrap">
                {/*日期选择*/}
                <div className="dateSelectBar">
                    <div className="selectWrap">
                        <button className="preDay" data-type="pre" onTouchEnd={this.endDay}></button>
                        <span id="dateIpt" onTouchEnd={this.showCalendar}>{datestr}</span>
                        <span className="calendarIco" onTouchEnd={this.showCalendar}></span>
                        <button className="nextDay" data-type="next" onTouchEnd={this.endDay}></button>
                        <CalendarControl1 callbackParent={this.onChildChanged}/>
                    </div>
                </div>
                {/*睡眠状态数据*/}
                <div id="sleepState-chart"></div>
                {/*睡眠时间数据*/}
                <div id="sleepTime" className="sleepTime flex">
                        <div className="sleepTimeBlock flex">
                            <div className="sleepTime-con flex">
                                <h3>睡眠区间</h3>
                                <p>{this.getTime(sleepScope[0])} - {this.getTime(sleepScope[1])}</p>
                            </div>
                        </div>
                        <div className="sleepTimeBlock flex">
                            <div className="sleepTime-con flex">
                                <h3>入睡耗时</h3>
                                <p>{parseInt(fallSleepDuration/60)}h {parseInt(fallSleepDuration%60)}min</p>
                            </div>  
                        </div>
                        <div className="sleepTimeBlock flex">
                            <div className="sleepTime-con flex sleepTime3">
                                <h3>睡眠时长</h3>
                                <p>{parseInt(asleepDuration/60)}h {parseInt(asleepDuration%60)}min</p>
                            </div> 
                        </div>
                </div>
                {/*睡眠状态百分比数据*/}
                <div id="sleepPercent" className="">
                    <div className="sleepPercentBar">
                        <div className="wakePercent" style={{width:wakePercent*100+'%'}}></div>
                        <div className="lightSleepPercent"style={{width:lightSleepPercent*100+'%'}}></div>
                        <div className="deepSleepPercent"style={{width:deepSleepPercent*100+'%'}}></div>
                    </div>
                    <div className="sleepPercentNumber flex">
                        <div className="spNumber flex">
                            <div className="spNumber-con flex">
                                <div className="sp-top flex">
                                    <span className="colorBlock wp"></span>
                                    <span className="statusName">清醒</span>
                                </div>
                                <p>{parseInt(wakeDuration/60)}h {parseInt(wakeDuration%60)}min</p>
                            </div>
                        </div>
                        <div className="spNumber flex">
                            <div className="spNumber-con flex">
                                <div className="sp-top flex">
                                    <span className="colorBlock lp"></span>
                                    <span className="statusName">浅睡</span>
                                </div>
                                <p>{parseInt(lightSleepDuration/60)}h {parseInt(lightSleepDuration%60)}min</p>
                            </div>
                        </div>
                        <div className="spNumber flex spNumber3">
                            <div className="spNumber-con flex">
                                <div className="sp-top flex">
                                    <span  className="colorBlock dp"></span>
                                    <span className="statusName">深睡</span>
                                </div>                         
                                <p>{parseInt(deepSleepDuration/60)}h {parseInt(deepSleepDuration%60)}min</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*睡眠心率图表*/}
                <div id="heartRate-chart" className="chartStye"></div>
                {/*呼吸率图表*/}
                <div id="breathRate-chart" className="chartStye"></div>
                {/*翻身数据图表*/}
                <div id="turnOver-chart" className="chartStye"></div>
                {/*打鼾数据图表
                <div id="snore-chart" className="chartStye"></div>
                {/*咳嗽数据图表*
                <div id="cough-chart" className="chartStye"></div>
                {/*呼吸暂停数据图表
                <div id="apnea-chart" className="chartStye"></div>
                {/*<div className="bottomButton">编辑</div>*/}

                <div className="m-dataTip" id="dataTip" style={{display: 'none'}}>
                    暂无数据！
                </div>
            </div>
        );
    }
});

export default DayPort;