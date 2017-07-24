//import {Store} from './Store.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Link} from 'react-router';
import Path from './ApiPath.es6';
// import Actions from './Actions.es6';
// import Store from './Store.es6';
const App = React.createClass({
    // mixins: [Reflux.connect(Store,'status')],
    componentDidMount: function(){    
        //解决重定向
        let url = localStorage.getItem("locationUrl");
        window.location.href = url;
    },
    closeApp: function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#appdownload').css({display: 'none'});
        $('#m-tabselect').css({bottom: 0});     
    },
    render: function(){
        var children = this.props.children;
        return (
                <div className="app">
                    {children}
                </div>             
        );
    }
});

export default App;


/*
onGetDayReportData(deviceId,queryFlag,date,id) {
      console.log(date)
        let url = "../mock/sleepType.json?time="+new Date();
        let _this = this;
        //let url =Path.wPath+"/wechat/hotel/mattress/summary/getDayReportData?relateDeviceIds="+deviceId+"&queryFlag="+queryFlag+"&dataTime="+date+'&appId='+id//微信通用参数请求地址
        het.get(url,{},(res)=>{
            let data = JSON.parse(res);
            if(data.code ==0){
              function Chart(x,y,state,data,color){
                let dom = document.getElementById("reportSleepChart");
                let myChart = echarts.init(dom);
                let app = {};
                let option = null;                
                option = {
                    title:{
                        show:false,
                        text:'lanyanan'
                    },
                    animation:true,
                    tooltip: {},
                    legend: {
                    },
                    dataZoom: {
                            show: false,
                            start: 0,
                            end: 100
                        },
                    xAxis: 
                        {   
                            type: 'category',
                            boundaryGap:false,
                            axisTick:{
                                show:true,
                                alignWithLabel:true,
                                inside:true,
                                lineStyle:{
                                    color:'#3f316c'
                                },
                                interval:0
                            },
                            axisLine:{
                                show:true,
                                onZero:false,
                                lineStyle:{
                                    color:'#3f316c'
                                }
                            },
                            axisLabel:{
                                formatter: '{value}',
                                textStyle:{
                                    fontSize:'12px',
                                    color:'#726791'
                                },

                            },
                            data:x
                        }
                    ,
                    yAxis: 
                        {   type:'value',
                            nameTextStyle:{
                                color:'#fff',
                                fontSize:'14',
                            },
                            max:4,
                            splitNumber:'4',
                            boundaryGap:[0,'20%'],
                            axisTick:{
                                show:false,
                                alignWithLabel:false,
                                inside:true,
                                interval:5
                            },
                            splitLine:{
                                show:true,
                                interval:true,
                                lineStyle:{
                                    color:'#3f316c'
                                }

                            },
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color:'#3f316c'
                                }
                            },
                            data:[0,20,30,40],
                            axisLabel:{
                                formatter:  function (value, index) {
                                    var texts = []
                                    if(index===0){
                                        texts=''
                                    }else if(index===1){
                                        texts='深睡'
                                    }else if(index===2){
                                        texts='浅睡'
                                    }else if(index===3){
                                        texts='清醒'
                                    }
                                    return texts
                                },
                                textStyle:{
                                    fontSize:'12',
                                    color:'#726791'
                                },
                            },
                        }
                    ,
                    series: 
                        {   show:false,
                            name:['清醒'],
                            symbol:"none",
                            type:'line',
                            smooth:true,
                            data:y,
                            lineStyle:{
                                    normal:{
                                        width:'5',
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,color, false),
                                        smoothMonotone:'y'
                                    }
                                },
                            lable:{
                                show:true
                            },
                        }
                };
                myChart.setOption(option);
              }
              let color = [{ color: '#30d2ba' // 0% 处的颜色
                            }]
              if(data.data.sleepDuration==null||data.data.sleepDuration==0||data.data.sleepDuration==""){
                let timeString = date.replace(/-/g,"/") + " 12:12:12";
                let dateString = formatDateTime(new Date(timeString));
                console.log(dateString)
                alert("暂时没有数据");
                _this.trigger({
                  sleepQuality: "--",
                  sleepTypeName: "  --",
                  sleepTypeTips: "",
                  sleepScope:"--",
                  fallSleepDuration:"--时--分",
                  lightSleepDuration:"--时--分",
                  deepSleepDuration:"--时--分",
                  sleepStatusList:"",
                  sleepCount:"--",
                  datestr:dateString,
                })
                Chart(["22:00","23:00","00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00"],[10,10,10,10,10,10,10,10,10,10,10,10,10,10],[],false,[])
              }else{
                //处理x y数据
                let sleepState = [];
                data.data.sleepStatusList.map((items,index)=>{
                    sleepState.push(items.status)
                })
               
                let arr = changeData(data.data.sleepStatusList);
                let arrData = [];
                sleepState.map((item)=>{
                  arrData.push(label(item))
                })
                
                let arrTime = [];
                let arrTimeString = [];
                arr.map((items,index)=>{
                  
                  let timeStr = items.time.split(" ");
                  let timeSt = items.time;
                  let utcTime = (new Date(timeSt.replace(/-/g,"/"))).getTime()+8*60*60*1000
                  let x = toHour(utcTime);
                  arrTime.push(x);
                  arrTimeString.push(timeSt);
                });
                let n=1;
                console.log(sleepState)
                sleepState.map((item,index)=>{
                  if(sleepState[index]==7&&sleepState[index+1]==1){
                    sleepState.splice(index+n,0,"-")
                    arrTime.splice(index+n,0,"")
                    n++;
                  }
                })
                arrData = sleepState.map((item,index)=>{
                    return label(item)
                })
                //处理颜色的变化
                pickerColor(sleepState)
                //处理时间数据
                let arrTimeStr = data.data.sleepScope.split("~");
                let startTime = (new Date(arrTimeStr[0].replace(/-/g,"/"))).getTime()+8*60*60*1000;
                let endTime = (new Date(arrTimeStr[1].replace(/-/g,"/"))).getTime()+8*60*60*1000;
                console.log(startTime.toString())
                //时段
                let sleepScopeTime = toHours(startTime)+" "+toString(startTime)+"-"+toHours(endTime)+" "+toString(endTime);
                console.log(sleepScopeTime)
                 //深睡、浅睡、清醒
                let lightSleepDuration = sleepHours(data.data.wakeDuration);
                let fallSleepDuration = sleepHours(data.data.lightSleepDuration);
                let deepSleepDuration = sleepHours(data.data.deepSleepDuration);
                console.log(fallSleepDuration)
                //时长
                let timeCount = parseInt(data.data.deepSleepDuration)+parseInt(data.data.lightSleepDuration);
                let count = toHoursString(timeCount*60*1000);
                //处理数据的时间
                let timeStr = formatDateTime(new Date(data.data.dataTime));
                console.log(timeStr)
                _this.trigger({
                  sleepQuality: data.data.sleepQuality,
                  sleepTypeName: data.data.sleepTypeList[0].sleepTypeName,
                  sleepTypeTips: data.data.sleepTypeList[0].sleepTypeTips,
                  sleepScope:data.data.sleepQuality,
                  fallSleepDuration:fallSleepDuration,
                  lightSleepDuration:lightSleepDuration,
                  deepSleepDuration:deepSleepDuration,
                  sleepStatusList:arrData,
                  sleepScope:sleepScopeTime,
                  sleepCount:count,
                  datestr:timeStr,
                });
                Chart(arrTime,arrData,sleepState,true,pickerColor(sleepState))
              }
            }else{
              alert("设备异常")
            }       
        },(err)=>{
            console.log(err)
        });
        function changeData(data){
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
                            y: 3,
                            time: data[i].startTime
                      });
                      break;
                    case 2:
                      tempData.push({
                            y: 2,
                            time: data[i].startTime
                      });
                      break;
                    case 3:
                      tempData.push({
                            y: 1.5,
                            time: data[i].startTime
                      });
                      break;
                    case 4:
                      tempData.push({
                            y: 0.5,
                            time: data[i].startTime
                      });
                      break;
                    case 5:
                      tempData.push({
                            y: 3,
                            time: data[i].startTime
                      });
                      break;
                    case 6:
                      tempData.push({
                            y: 3,
                            time: data[i].startTime
                      });
                      break;
                    case 7:
                      tempData.push({
                            y: 3,
                            time: data[i].startTime
                      });
                      break;
                    case 8:
                      tempData.push({
                            y: 3,
                            time: data[i].startTime
                      });
                      break;
                    default:
                      tempData.push({
                            y: 3,
                            time: data[i].startTime
                      });
                }
            }
        }
        return tempData;
    };
    function toString(string) {
      let data = new Date(string);
      let time = data.getHours();
      console.log(parseInt(time))
      if(parseInt(time)<12){
        return "am"
      }else{
        return "pm"
      }
    };
    function toHoursString(time) {
      let h = parseInt(time/3600000);
      h = h < 10 ? "0" + h : h;
      let m = parseInt(time%3600000/60000);
      m = m < 10 ? "0" + m : m;
      return h+"小时"+m+"分"
    };
    function toHours(time) {
      let h = (new Date(time)).getHours();
      if(h>12){h=h-12;}
      h = h < 10 ? "0" + h : h;
      let m = (new Date(time)).getMinutes();
      m = m < 10 ? "0" + m : m;
      return h+":"+m
    };
    function toHour(time) {
      let h = (new Date(time)).getHours();
      h = h < 10 ? "0" + h : h;
      let m = (new Date(time)).getMinutes();
      m = m < 10 ? "0" + m : m;
      return h+":"+m
    };
    function sleepHours(time) {
      let h = parseInt(time / 60);
      let m = parseInt(time % 60 );
      return h+"小时"+m+"分"
    };
    function formatDateTime (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let index = date.getDay();
            function getweek(index){
                switch(index){
                    case 0: 
                        return "星期天"
                        break;
                    case 1: 
                        return "星期一"
                        break;
                    case 2: 
                        return "星期二"
                        break;
                    case 3: 
                        return "星期三"
                        break;
                    case 4: 
                        return "星期四"
                        break;
                    case 5: 
                        return "星期五"
                        break;
                    case 6: 
                        return "星期六"
                        break;  
                }
            }
        return y + '-' + m + '-' + d+' '+getweek(index);
    }
    function pickerColor(arr){
      let color = [{ offset: 1, color: '#30d2ba' // 0% 处的颜色
                            }]
      for (let i = 0;i<arr.length;i++){
        if(arr[i]==2||arr[i]==3){
           color = [{ offset: 0, color: '#30d2ba' // 0% 处的颜色
                            },{offset: 1, color: '#6175fc' // 0% 处的颜色
                            }]
        }
      }
      for (let i = 0;i<arr.length;i++){
        if(arr[i]==4){
          color = [{ offset: 0, color: '#30d2ba' // 0% 处的颜色
                            },{offset: 0.6, color: '#6175fc' // 0% 处的颜色
                            }, {offset: 1, color: '#cf3cfc' // 100% 处的颜色
                          }]
        }
      };
      return color;
    };
    function label(index){
         switch(index){
              case 1: 
                  return 3
                  break;
              case 2: 
                  return 2
                  break;
              case 3: 
                  return 1.5
                  break;
              case 4: 
                  return 0.5
                  break;
              case 5: 
                  return 3
                  break;
              case 6: 
                  return 3
                  break;
              case 7: 
                  return 3
                  break;
              case 8: 
                  return 3
                  break;
              case 9: 
                  return 3
                  break; 
              case "-": 
                  return "-"
                  break; 
                }
    }
    },*/