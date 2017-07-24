'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import Path from './ApiPath.es6';
 
//为设备添加链接

function addLink(arr) {
  arr.map((item,index)=>{
    switch(item.deviceSubTypeId){
      case 6001:
        item.url = '../../sleepBand/page/index.html?deviceId='+item.deviceId+'&deviceName='+item.deviceName;
        break;
      case 6002:
        item.url = '../../sleepBand/page/index.html?deviceId='+item.deviceId+'&deviceName='+item.deviceName;
        break;
      case 28001:
        item.url = '../../wisdomBox/page/index.html?deviceId='+item.deviceId+'&deviceName='+item.deviceName;
        break;
      case 14003:
        item.url = '../../sleepLamp/page/index.html?deviceId='+item.deviceId+'&deviceName='+item.deviceName;
        break;
      case 43001:
        item.url = '../../aircondition/page/index.html?deviceId='+item.deviceId+'&deviceName='+item.deviceName;
        break;
      case 11001:
        item.url = '../../colorfulAromaDiffuser/page/index.html?deviceId='+item.deviceId+'&deviceName='+item.deviceName;
        break;
      case 5003:
        item.url = '../../squareHumidifier/page/index.html?deviceId='+item.deviceId+'&deviceName='+item.deviceName;
        break;
      case 6006:
        item.url = '../../plumbingPad/page/index.html?deviceId='+item.deviceId+'&deviceName='+item.deviceName;
        break;
      case 21001://窗帘
        item.url = '../../technologyCurtain/page/index.html?deviceId='+item.deviceId+'&deviceName='+item.deviceName;
        break;
      case 14006://星月灯
        item.url = '../../musicLight/page/index.html?deviceId='+item.deviceId+'&deviceName='+item.deviceName;
        break;
    }
  })
  return arr;
}


/*
*没有数据时的表格
*/
window.NO_DATA_CHART = (id,title,max,lable) => {
    let dom = document.getElementById(id);
    let myChart = echarts.init(dom);
    let option = {
        tooltip: {},
        xAxis: {
            type:"time",
            min:(new Date('2017/01/03 22:00:00')).getTime(),
            max:(new Date('2017/01/04 10:00:00')).getTime(),
            interval:7200000,
            splitLine:{
                  show:false
            },
            axisTick:{
                show:true,
                alignWithLabel:true,
                inside:true,
                lineStyle:{
                    color:'#3f316c'
                },
                interval:1
            },
            axisLine:{
                show:true,
                onZero:true,
                lineStyle:{
                    color:'#3f316c'
                }
            },
            axisLabel:{
                formatter:function(value,index){
                  let time = new Date(value);
                  let timeStr = (time.getHours()<10?("0"+time.getHours()):time.getHours())+":"+(time.getMinutes()<10?("0"+time.getMinutes()):time.getMinutes())
                  return timeStr
                },
                textStyle:{
                    fontSize:'12px',
                    color:'#726791'
                }
            },
            data: []
        },
        yAxis: {
            type:'value',
            name:title,
            nameTextStyle:{
                color:'#fff',
                fontSize:'14',
            },
            min:0,
            max:3.5,
            splitNumber:4,
            data:[0,1,2,3],
            interval:1,
            axisTick:{
                show:false,
                alignWithLabel:false,
                inside:true,
                interval:1
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
            axisLabel:{
                formatter:  function (value, index) {
                    var texts = []
                    if(index===0){
                        texts=''
                    }else if(index===1){
                        texts= lable[0]
                    }else if(index===2){
                        texts= lable[1]
                    }else if(index===3){
                        texts= lable[2]
                    }
                    return texts
                },
                textStyle:{
                    fontSize:'12',
                    color:'#726791'
                },
            },
        },
        series: [{
            name: '销量',
            type: 'line',
            data: []
        }]
  };
  myChart.setOption(option)
}

/*提示
*/
window.tipsShow = (_this,text)=>{
        _this.trigger({
          tips:text,
          tipsClassName:"toast-show",
        });
        setTimeout(function(){
          _this.trigger({
            tips:"",
            tipsClassName:"toast-hide",
          });
        },3000)
      }

export const Store = Reflux.createStore({
    listenables: [Actions],
    onLogin(num) {
      //setCookie('wechatUserId',10302,0.5,'/');
      let _this = this;
      let routerFirst =  Path.wPath;
      function setCookie(c_name,value,expiredays,path) {
            var exdate=new Date();
            exdate.setTime(exdate.getTime()+expiredays * 24 * 60 * 60 * 1000);
            document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
        };
      function getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                   if (arr = document.cookie.match(reg)) {
                       return unescape(arr[2]);
                   } else {
                       return null;
                   }
      };
      function hasCookie(name) {
        let wechatId = getCookie(name);
          if (wechatId == "" || wechatId == null || wechatId == undefined) {
            //"http://weixin.clife.cn/clife-wechat-test" + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
            ///wechat/hotel/user/login
            const loginPath = location.host === 'weixin.clife.cn' || location.host === '127.0.0.1' ? '/wechat/user/login' : '/wechat/hotel/user/login';
            let url =  routerFirst + loginPath +"?format=json&type=1&redirect=" + window.location.href;
            //console.log(url)
            window.location.href = url;
            //console.log(location.href)
          }else{
            let accessToken = getCookie('accessToken');
              $.ajax({
              type: 'GET',
              url: Path.wPath+'/wechat/hotel/getToken',
              dataType: 'json',
              async:false,
              cache:true,
              timeout: 500,
              success: function(data){
                if(data.code==0){
                  let accessToken = data.data;
                  setCookie('accessToken',accessToken,720000,'/');
                  // Actions.getScene();
                  if(num==1){
                    _this.onGetAuthAccess(); 
                  }
                }

              },
              error: function(xhr, type){
              }
            })           
        }         
      };  
      hasCookie('wechatUserId');
    },
    onRepaint(data){
      this.trigger(data);
    },
    onGetData(data){//场景详情请求数据
      let _this = this;
      let time = new Date();
      //let url = '../mock/scene.json'
      let url =Path.wPath+"/wechat/hotel/scene/getUserSceneInfo?sceneName="+data+"&time="+time;
      //提示隐藏
      _this.trigger({
          tips:"",
          tipsClassName:"toast-hide",
        });
      //请求数据函数
      het.get(url,{},(res)=>{
        let data = JSON.parse(res);
          if(data.code===0){
            let runTxt = "开启场景",
                operate="on"
            if(data.data.runStatus==0){//根据状态显示开启
                _this.onSwitchUserScene(data.data.sceneId, 'on');  
            }else{
                runTxt = "关闭场景";
                operate = "off"
            }
            _this.trigger({
                sceneId:data.data.sceneId,
                sceneName:data.data.sceneName,
                pictureUrl:data.data.pictureUrl,
                summary:data.data.summary,
                runStatus:data.data.runStatus,
                validity:data.data.validity,
                deviceList:addLink(data.data.deviceList),
                btnTxt:runTxt,
                operate:operate
            })
          }else{
            window.tipsShow(_this,"缺少必须的设备")
          }
      },(err)=>{
        window.tipsShow(_this,"网络不好！请稍后再试！")
      })
    }, 
    onGetAuthAccess() {
      let _this = this;
      wx.ready(function(){ 
          $.ajax({
          type: 'GET',
          url: Path.wPath+'/wechat/hotel/authAccess',
          dataType: 'json',
          async:false,
          cache:true,
          timeout: 500,
          success: function(data){
            if(data.code===0){
            }else{
                let or = confirm('请先扫描二维码！')
                if(or){
                  wx.closeWindow();
                }else{
                  wx.closeWindow();
                }
            }

          },
          error: function(xhr, type){
             window.tipsShow(_this,"网络不好！请稍后再试!")  
          }
        })   
      });
 
    },
    onGetSceneList() {
      let _this = this
      let url = Path.wPath+'/wechat/hotel/scene/sceneList'
      het.get(url,{},(res)=>{
          let data = JSON.parse(res)
          if(data.code===0){
              let sceneName = '';
              let k = -1;
              data.data.list.map((item, index)=>{
                if(item.runStatus==1) {
                  k = index;
                }else{
                }
              })
              if(k = -1){
                _this.onGetData('舒适情景');
                _this.onSwitchUserScene(7009,'on')
              }else{
                _this.onGetData(data.data.list[k].sceneName)
              }
          }else{
            window.tipsShow(_this,"请求出错,请稍后再试!")
          }
      },(err)=>{
          window.tipsShow(_this,"请求出错,请稍后再试!")
      }) 
    },
    onGetSceneLog(id) {
      let _this = this
      let url = Path.wPath+'/wechat/hotel/scene/getExecutionLog?userSceneId=' + id + '&offsetTimestamp=86400&paged=true'
      het.get(url,{},(res)=>{
          let data = JSON.parse(res)
          if(data.code===0){
              let list = data.data.list;
              this.trigger({
                list:list,
                id:id,
                date:new Date()
              })
          }else{
            window.tipsShow(_this,"请求出错,请稍后再试！")
          }
      },(err)=>{
          window.tipsShow(_this,"请求出错,请稍后再试！")
      }) 
    },
    onSwitchUserScene(id,operate){
      let _this = this;
      let url =Path.wPath+"/wechat/hotel/scene/switchUserScene?userSceneId="+id+"&operate="+operate;
      het.get(url,{},(res)=>{
        let data = JSON.parse(res);
          if(data.code==0){
            _this.trigger({
              topTipShow:false
            })
          }else{
            _this.trigger({
              topTipShow:true
            }) 
          }
          
    },(err)=>{
      window.tipsShow(_this,data.msg)
    })
  },
  onSubmitTime(ledMode,date,state,status){
      let _this = this;
      let time = new Date();
      let urltime =Path.wPath+"/wechat/hotel/scene/getUserClock?remindTime="+formatDateTime(new Date());
      het.get(urltime,{},(res)=>{
          let data = JSON.parse(res);
          if(data.code==0){
              let hoursIndex = 0;
              let minIndex = 0;
              //这是判断是不是首次进来state=0不是 1是
              if(data.data.length==0||data.data.length==null){
                _this.trigger({
                    clockShow:"hidden",
                    divShow:"none",
                    openImg:'../static/img/open.png',
                    openTitle:'开启闹铃',
                    color:"#4ead57",
                    status:1,
                    timingId:""
                })
              }else{
                  let timingId = (data.data)[data.data.length-1].id;
                  if((data.data)[data.data.length-1].status==0){
                        _this.trigger({
                            clockShow:"visible",
                            divShow:"block",
                            openImg:'../static/img/open.png',
                            openTitle:'开启闹铃',
                            color:"#4ead57",
                            status:1,
                            timingId:timingId,
                            btnCont:"修改"
                        })
                  }else{
                        _this.trigger({
                            clockShow:"visible",
                            divShow:"none",
                            openImg:'../static/img/close.png',
                            openTitle:'关闭闹铃',
                            color:"#000",
                            status:0,
                            timingId:timingId,
                            btnCont:"修改"
                        })    
                  }
                  let string =(data.data)[data.data.length-1].remindTime;
                  let time = string.split(" ");
                  let listString = time[1].split(":");
                  hoursIndex = listString[0];
                  minIndex = listString[1];
                  hoursIndex = hoursIndex[0]==0?hoursIndex[1]:hoursIndex;
                  minIndex = minIndex[0]==0?minIndex[1]:minIndex;
                  if((data.data)[data.data.length-1].ledMode==0){
                      _this.trigger({
                        timingBtnIsOn:0,
                        timingBtnBgClassName:"trunOffBgColor",
                        timingBtnClassName:"timing-awaken-off",
                      }) 
                  }else{
                      _this.trigger({
                        timingBtnIsOn:1,
                        timingBtnBgClassName:"trunOnBgColor",
                        timingBtnClassName:"timing-awaken-on",
                      }) 
                  }
                  window.mySwiper0.slideTo(hoursIndex,1000,true);
                  window.mySwiper1.slideTo(minIndex,1000,true);
              }
             
          }else{
            window.tipsShow(_this,data.msg)
          }
                            
      },(err)=>{

      })
      function formatDateTime (date) {
        let y = date.getFullYear();
        let M = date.getMonth() + 1;
        M = M < 10 ? ('0' + M) : M;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y+"-"+M+"-"+d+" "+h+":"+m+":"+s   
      }
    },
    onSaveClock(id,ledMode,date,state,status) {
      let _this = this;
      if(state==0){
          let url = Path.wPath+"/wechat/hotel/scene/saveClock?remindTime="+date+"&ledMode="+ledMode+"&status="+1;
          setTiming(_this,url,"设置",state)
      }else if(state==1){
          let url = Path.wPath+"/wechat/hotel/scene/saveClock?id="+id+"&remindTime="+date+"&ledMode="+ledMode+"&status=1";
          _this.trigger({
              btnCont:"修改"
          })
          setTiming(_this,url,"修改",state)
      }else{
          let url = Path.wPath+"/wechat/hotel/scene/saveClock?id="+id+"&remindTime="+date+"&ledMode="+ledMode+"&status="+status;
          het.get(url,{},(res)=>{
              let data = JSON.parse(res);
              if(data.code==0){
                   if(status==0) {
                      _this.trigger({
                          clockShow:"visible",
                          divShow:"block",
                          openImg:'../static/img/open.png',
                          openTitle:'开启闹铃',
                          color:"#4ead57",
                          status:1,
                      })
                    }else{
                      _this.trigger({
                          clockShow:"visible",
                          divShow:"none",
                          openImg:'../static/img/close.png',
                          openTitle:'关闭闹铃',
                          color:"#000",
                          status:0,
                      })
                    }
              }else{
                if(status==0){
                  window.tipsShow(_this,"关闭失败,请稍后重试")
                }else{
                  window.tipsShow(_this,"开启失败,请稍后重试")
                }
                
              }
          },(err)=>{
              window.tipsShow(_this,"网络不好！请稍后再试！")
          });
      }  
      function setTiming(_this,url,tips,state) {
          het.get(url,{},(res)=>{
            let data = JSON.parse(res);
            if(data.code==0){
              window.tipsShow(_this,tips+"成功");
              if(state==0){
                _this.trigger({
                timingId:data.data.id,
                clockShow:"visible",
                divShow:"none",
                openImg:'../static/img/close.png',
                openTitle:'关闭闹铃',
                color:"#000",
                status:0,
                btnCont:"修改"
                })
              }
              
            }else{
              window.tipsShow(_this,tips+"失败,请稍后重试")
            }
          },(err)=>{
            window.tipsShow(_this,"网络不好！请稍后再试！")
          });
      } 
    },
    onGetDayReportData(queryFlag,date,index) {
        //let url = "../mock/sleepType.json?time="+new Date();
        let _this = this;
        let url =Path.wPath+"/wechat/hotel/mattress/summary/getHotelDayReportData?queryFlag="+queryFlag+"&dataTime="+date+"&time="+new Date();//微信通用参数请求地址
        $.ajax({
          type: 'GET',
          url: url,
          async:false,
          dataType: 'json',
          timeout: 1000,
          success: function(res){
            let data = res;
            if(data.code === 0){ //判断返回是否成功
              let color = [{ color: '#30d2ba' // 0% 处的颜色
                            }]
              if(data.data == null || data.data[index].sleepDuration == null || data.data[index].sleepDuration == 0 || data.data[index].sleepDuration == ""){
                let timeString = date.replace(/-/g,"/") + " 12:12:12";
                let dateString = formatDateTime(new Date(timeString));
                alert("暂时没有数据");
              }else{
                let sleepState = [];
                data.data[index].sleepStatusList.map((items,index)=>{
                    sleepState.push(items.status)
                }) 
                let arr = changeData(data.data[index].sleepStatusList);
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
                  arrTime.push(utcTime);
                  arrTimeString.push(timeSt);
                });
                let n=1;
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
                let arrTimeStr = data.data[index].sleepScope.split("~");
                let startTime = (new Date(arrTimeStr[0].replace(/-/g,"/"))).getTime()+8*60*60*1000;
                let endTime = (new Date(arrTimeStr[1].replace(/-/g,"/"))).getTime()+8*60*60*1000;
                //时段
                let sleepScopeTime = toHours(startTime)+" "+toString(startTime)+"-"+toHours(endTime)+" "+toString(endTime);
                 //深睡、浅睡、清醒
                let lightSleepDuration = sleepHours(data.data[index].wakeDuration);
                let fallSleepDuration = sleepHours(data.data[index].lightSleepDuration);
                let deepSleepDuration = sleepHours(data.data[index].deepSleepDuration);
                //时长
                let timeCount = parseInt(data.data[index].deepSleepDuration)+parseInt(data.data[index].lightSleepDuration);
                let count = toHoursString(timeCount*60*1000);
                //处理数据的时间
                let timeStr = formatDateTime(new Date(data.data[index].dataTime));
                _this.trigger({
                  sleepQuality: data.data[index].sleepQuality,
                  sleepTypeName: data.data[index].sleepTypeList[0].sleepTypeName,
                  sleepTypeTips: data.data[index].sleepTypeList[0].sleepTypeTips,
                  sleepScope:data.data[index].sleepQuality,
                  fallSleepDuration:fallSleepDuration,
                  lightSleepDuration:lightSleepDuration,
                  deepSleepDuration:deepSleepDuration,
                  sleepStatusList:arrData,
                  sleepScope:sleepScopeTime,
                  sleepCount:count,
                  datestr:timeStr,
                  date:data.data[index].dataTime,
                  dataLenght:data.data,
                });
                window.userSwiper.update()
                window.userSwiper.lockSwipes();
                if(data.data.length > 1){
                  if(window.userSwiper){
                     window.userSwiper.unlockSwipes()
                  }
                  _this.onGetDayReportTotal(data.data[index].relateDeviceIds, queryFlag, date, index)
                }else{
                  _this.onGetDayReportTotal(data.data[index].relateDeviceIds, queryFlag, date, index)
                }
                Chart(arrTime,arrData,sleepState,true,pickerColor(sleepState), index)
              }
            }else{
              alert("设备异常")
              _this.trigger({
                    sleepQuality:"--",
                    sleepScope:"--",
                    sleepCount:"--",
                    sleepTypeName:"--",
                    deepSleepDuration:"--:--",
                    fallSleepDuration:"--:--",
                    lightSleepDuration:"--:--",
                    heartAllAverage:"--",
                    breathAllAverage:"--",
                    trunOverAllAverage:"--",
                    heartReferRange:"--",
                    breathReferRange:"--",
                })
              window.NO_DATA_CHART('reportSleepChart' + index,'',150,["深睡","浅睡","清醒"])
              window.NO_DATA_CHART('reportHeartChart' + index,'心率',150,[50,100,150])
              window.NO_DATA_CHART('reportBreathingChart' + index,'呼吸',150,[10,20,30])
              window.NO_DATA_CHART('reportOverChart' + index,'体动',150,[20,40,60])
            }       
          },
          error: function(xhr, type){
            _this.trigger({
                    sleepQuality:"--",
                    sleepScope:"--",
                    sleepCount:"--",
                    sleepTypeName:"--",
                    deepSleepDuration:"--:--",
                    fallSleepDuration:"--:--",
                    lightSleepDuration:"--:--",
                    heartAllAverage:"--",
                    breathAllAverage:"--",
                    trunOverAllAverage:"--",
                    heartReferRange:"--",
                    breathReferRange:"--",
                })
            window.NO_DATA_CHART('reportSleepChart' + index,'',150,["深睡","浅睡","清醒"])
            window.NO_DATA_CHART('reportHeartChart' + index,'心率',150,[50,100,150])
            window.NO_DATA_CHART('reportBreathingChart' + index,'呼吸',150,[10,20,30])
            window.NO_DATA_CHART('reportOverChart' + index,'体动',150,[20,40,60])
          }
        })
        function Chart(x, y, state, data, color, index){
          let dataArr = [];
          x.map((item,index)=>{//为了追求断点容易吗
            if(item==""){
              x[index]=(x[index-1]+x[index+1])/2
            } 
          })
          let minDate = new Date(x[0]);
          let minString = minDate.getMinutes();
          let count = minString < 10 ? minString : (minString - parseInt((minString.toString())[0]+"0"));
          window.min = x[0] - count*60*1000;
          let maxDate = new Date(x[(x.length-1)]);
          let maxString = maxDate.getMinutes();
          let countMax =minString > 50 ? (60-maxString) : (maxString < 10 ? (10-maxString):(parseInt((maxString.toString())[0]+"0")+10-maxString));
          window.max = x[(x.length-1)]+countMax*60*1000;
          window.interval = ((max-min)/5);
          y.map((item,index)=>{
            let list = [x[index],item];
            dataArr.push(list) 
          })
          let dom = document.getElementById("reportSleepChart" + index);
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
                      type: 'time',
                      min:window.min,
                      max:window.max,
                      splitNumber:5,
                      interval:window.interval,
                      splitLine: {
                          show: false
                      },
                      axisTick:{
                          show:true,
                          alignWithLabel:true,
                          inside:true,
                          lineStyle:{
                              color:'#3f316c'
                          },
                          interval:1
                      },
                      axisLine:{
                          show:true,
                          onZero:true,
                          lineStyle:{
                              color:'#3f316c'
                          }
                      },
                      axisLabel:{
                          formatter:function(value,index){
                            let time = new Date(value);
                            let timeStr = (time.getHours()<10?("0"+time.getHours()):time.getHours())+":"+(time.getMinutes()<10?("0"+time.getMinutes()):time.getMinutes())
                            return timeStr
                          },
                          textStyle:{
                              fontSize:'12px',
                              color:'#726791'
                          }

                      }
                  }
              ,
              yAxis: 
                  {   type:'value',
                      nameTextStyle:{
                          color:'#fff',
                          fontSize:'14',
                      },
                      min:0,
                      max:3.5,
                      splitNumber:'4',
                      interval:1,
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
                      data:dataArr,
                      lineStyle:{
                              normal:{
                                  width:'2',
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
    },
    onGetDayReportTotal(deviceId,queryFlag,date,index) {
      let _this = this;
      //let url = '../mock/sleepReport.json?time='+new Date()
      let url =Path.wPath+"/wechat/hotel/mattress/summary/getHotelDayReportTotal?relateDeviceIds="+deviceId+"&queryFlag="+queryFlag+"&dataTime="+date//微信通用参数请求地址
        het.get(url,{},(res)=>{
            let data = JSON.parse(res);
            if(data.code == 0){
                //心跳
                let heartData = data.data.heartRateList;
                let breathData = data.data.breathRateList;
                let turnOverData = data.data.turnOverList;
                //正常范围
                let heartReferRange = data.data.heartRateAnalysis?data.data.heartRateAnalysis.referRange:"--" ;
                let breathReferRange = data.data.breathRateAnalysis?data.data.breathRateAnalysis.referRange:"--" ;
                //平均值
                let heartAllAverage = data.data.heartRateAnalysis?data.data.heartRateAnalysis.statisticalData:"--" ;
                let breathAllAverage = data.data.breathRateAnalysis?data.data.breathRateAnalysis.statisticalData:"--" ;
                let trunOverAllAverage = data.data.turnOverAnalysis?data.data.turnOverAnalysis.statisticalData:"--" ;
                //截取x轴坐标
                let heartXTime = [];//用来比较时间
                let heartX = heartData.map((items,index)=>{
                  let time = items.key;
                  let timeString = (new Date(time.replace(/-/g,"/"))).getTime()+8*60*60*1000;
                  heartXTime.push(timeString);
                    return timeString;
                });
                //这是y轴坐标
                let heartY = heartData.map((items,index)=>{
                    return items.value
                });
                let heartYMin = heartData.map((items,index)=>{
                    return items.value
                });
                let breathY = breathData.map((items,index)=>{
                    return items.value
                });
                let breathYMin = breathData.map((items,index)=>{
                    return items.value
                });
                let trunOverY = turnOverData.map((items,index)=>{
                    return items.value
                });
                //这是处理xy轴数据时差大于15min时断点显示
                let k = 1
                let m = 1
                for(let i = 0;i<heartXTime.length;i++){//处理大于15min断点蛋都碎了
                  if(parseInt(heartXTime[i+1]-heartXTime[i])>15*60*1000){
                    heartYMin.splice(i+m, 0, "-");
                    breathYMin.splice(i+m, 0, "-");
                    heartY.splice(i+k, 0, "0");
                    heartY.splice(i+k+1, 0, "-");
                    heartY.splice(i+k+2, 0, "0");
                    breathY.splice(i+k, 0, "0");
                    breathY.splice(i+k+1, 0, "-");
                    breathY.splice(i+k+2, 0, "0");
                    trunOverY.splice(i+k, 0, "0");
                    trunOverY.splice(i+k+1, 0, "-");
                    trunOverY.splice(i+k+2, 0, "0");
                    heartX.splice(i+m, 0, "-");
                    k = k+3;
                    m = m+1;
                  }
                }
                //这是取得x的index数组
                let heartXX =[];
                for(let i = 0;i<heartX.length;i++){
                  heartXX[i]=heartX[i];
                }
                //这是为了获得x轴下标数组
                let j=0;
                for(let i = 0;i<heartX.length;i++){
                  if(heartX[i]=="-"){
                    heartXX.splice(i+j, 0, heartX[i-1]);
                    heartXX.splice(i+j+2, 0, heartX[i+1]);
                    j=j+2;
                  }
                }
                //这是要获得心跳的数据二维数组
                let heartXY =[];
                for(let i = 0;i<heartY.length;i++){
                      heartXY[i] = [heartXX[i],heartY[i]]
                }
                let breathXY =[];
                for(let i = 0;i<heartY.length;i++){
                      breathXY[i] = [heartXX[i],breathY[i]]
                }
                let trunOverXY =[];
                for(let i = 0;i<heartY.length;i++){
                      trunOverXY[i] = [heartXX[i],trunOverY[i]]
                }
                //找出二维数组的y最小 并获得心跳的最小值
                let heartMinString = min(heartY);
                let heartMinIndex = heartX[heartYMin.indexOf(heartMinString)];
                let heartMin = [heartMinIndex,heartMinString]
                let isHeartMin = heartData.map((items,index)=>{
                    return items.value
                });
                isHeartMin.map((item,index)=>{
                    if(item==0){
                      heartMin=[];
                    }
                })
                let breathMinString = min(breathY);
                let breathMinIndex = heartX[breathYMin.indexOf(breathMinString)];
                let breathMin = [breathMinIndex,breathMinString];
                let isBreathMin = breathData.map((items,index)=>{
                    return items.value
                });
                isBreathMin.map((item,index)=>{
                    if(item==0){
                      breathMin=[];
                    }
                })
                //计算平均值
                _this.trigger({
                    heartAllAverage:heartAllAverage,
                    breathAllAverage:breathAllAverage,
                    trunOverAllAverage:trunOverAllAverage,
                    heartReferRange:heartReferRange,
                    breathReferRange:breathReferRange,
                })
                function Chart(id,X,Y,max,title,lable,mark,interval){
                  let dom1 = document.getElementById(id);
                  let myChart1 = echarts.init(dom1);
                  let app1 = {};
                  let option1 = null;
                  Y.map((item,index)=>{
                      if(item[0]=="-"){
                        Y[index][0]=((Y[index-1])[0]+(Y[index+1])[0])/2;
                      }
                  })
                  option1 = {
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
                      calculable : true,
                      xAxis: 
                          {  
                            type:"time",
                            min:window.min,
                            max:window.max,
                            splitNumber:5,
                            interval:window.interval,
                            splitLine: {
                                show: false
                            },
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
                                  formatter:function(value,index){
                                    let time = new Date(value);
                                    let timeStr = (time.getHours()<10?("0"+time.getHours()):time.getHours())+":"+(time.getMinutes()<10?("0"+time.getMinutes()):time.getMinutes())
                                    return timeStr
                                  },
                                  textStyle:{
                                      fontSize:'12',
                                      color:'#726791'
                                  },
                              }
                          }
                      ,
                      yAxis: 
                          {   type:'value',
                              name:title,
                              nameTextStyle:{
                                  color:'#fff',
                                  fontSize:'14',
                              },
                              min:0,
                              max:max,
                              splitNumber:4,
                              interval:interval,
                              boundaryGap:[0,'20%'],
                              axisTick:{
                                  show:false,
                                  alignWithLabel:false,
                                  inside:true,
                                  interval:0
                              },
                              splitLine:{
                                  show:true,
                                  interval:3,
                                  lineStyle:{
                                      color:'#3f316c'
                                  }
                              },
                              axisLine:{
                                  show:true,
                                  lineStyle:{
                                      color:'#3f316c',
                                      fontSize:'12'
                                  }
                              },
                              data:[0,50,100,150],
                              axisLabel:{
                                  formatter:  function (value, index) {
                                      var texts = []
                                      if(index===0){
                                          texts=''
                                      }else if(index===1){
                                          texts=lable[0]
                                      }else if(index===2){
                                          texts=lable[1]
                                      }else if(index===3){
                                          texts=lable[2]
                                      }else {
                                          texts=''
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
                          {   name:['清醒'],
                              symbol:"none",
                              type:'line',
                              data:Y,
                              lineStyle:{
                                      normal:{
                                          width:'1',
                                          color: '#3ac4a3'
                                      }
                                  },
                              lable:{
                                  show:true
                              },
                              markPoint : {
                                data : mark,
                                symbolRotate:-30,
                                symbolSize:[40,40],
                                symbolOffset:[2,0],
                                itemStyle:{
                                  normal:{
                                    color:"#14c6ae"
                                  }
                                }
                            },    
                          }
                  };
                  myChart1.setOption(option1);
                  }
              let mark = function(arr){
                return [  {type : 'max', name: '最大值'},
                          {coord: arr}
                       ];
              }
              if(data.data.heartRateList.length<=0){
                _this.trigger({
                    sleepQuality:"--",
                    sleepScope:"--",
                    sleepCount:"--",
                    sleepTypeName:"--",
                    deepSleepDuration:"--:--",
                    fallSleepDuration:"--:--",
                    lightSleepDuration:"--:--",
                    heartAllAverage:"--",
                    breathAllAverage:"--",
                    trunOverAllAverage:"--",
                    heartReferRange:"--",
                    breathReferRange:"--",
                })
                window.NO_DATA_CHART('reportSleepChart' + index,'',150,["深睡","浅睡","清醒"])
                window.NO_DATA_CHART('reportHeartChart' + index,'心率',150,[50,100,150])
                window.NO_DATA_CHART('reportBreathingChart' + index,'呼吸',150,[10,20,30])
                window.NO_DATA_CHART('reportOverChart' + index,'体动',150,[20,40,60])
              }else{
                Chart("reportHeartChart" + index,heartX,heartXY,180,"心率",["50","100","150"],mark(heartMin),50);
                Chart("reportBreathingChart" + index,heartX,breathXY,35,"呼吸率",["10","20","30"],mark(breathMin),10);
                Chart("reportOverChart" + index,heartX,trunOverXY,70,"体动",["20","40","60"],[],20);
              }
            }else{
              _this.trigger({
                    sleepQuality:"--",
                    sleepScope:"--",
                    sleepCount:"--",
                    sleepTypeName:"--",
                    deepSleepDuration:"--:--",
                    fallSleepDuration:"--:--",
                    lightSleepDuration:"--:--",
                    heartAllAverage:"--",
                    breathAllAverage:"--",
                    trunOverAllAverage:"--",
                    heartReferRange:"--",
                    breathReferRange:"--",
                })
              window.NO_DATA_CHART('reportSleepChart' + index,'',150,["深睡","浅睡","清醒"])
              window.NO_DATA_CHART('reportHeartChart' + index,'心率',150,[50,100,150])
              window.NO_DATA_CHART('reportBreathingChart' + index,'呼吸',150,[10,20,30])
              window.NO_DATA_CHART('reportOverChart' + index,'体动',150,[20,40,60]) 
            }          
        },(err)=>{
          _this.trigger({
                    sleepQuality:"--",
                    sleepScope:"--",
                    sleepCount:"--",
                    sleepTypeName:"--",
                    deepSleepDuration:"--:--",
                    fallSleepDuration:"--:--",
                    lightSleepDuration:"--:--",
                    heartAllAverage:"--",
                    breathAllAverage:"--",
                    trunOverAllAverage:"--",
                    heartReferRange:"--",
                    breathReferRange:"--",
          })
          window.NO_DATA_CHART('reportSleepChart' + index,'',150,["深睡","浅睡","清醒"])
          window.NO_DATA_CHART('reportHeartChart' + index,'心率',150,[50,100,150])
          window.NO_DATA_CHART('reportBreathingChart' + index,'呼吸',150,[10,20,30])
          window.NO_DATA_CHART('reportOverChart' + index,'体动',150,[20,40,60])
        });

      function toHours(time) {
      let h = (new Date(time)).getHours();
      h = h < 10 ? "0" + h : h;
      let m = (new Date(time)).getMinutes();
      m = m < 10 ? "0" + m : m;
      return h+":"+m
      };
      function min(heart){
        for(let i = 0;i<heart.length;i++){
            if(heart[i]==0||heart[i]=="-"){
                heart[i]=1000;
                  }
            }
        for(let i = 0;i<heart.length;i++){
            for(let j= 0;j<heart.length;j++){
                if(parseInt(heart[i])<parseInt(heart[j])){
                    let temp = heart[i];
                      heart[i] = heart[j];
                      heart[j] = temp;
                  }
                }
            }
        return heart[0]
      }
      
    },
    onGetMonthDateList(dataTime){
        let _this = this;
        let url = Path.wPath+'/wechat/hotel/mattress/getHotelMonthDateList?&dataTime='+dataTime;
        het.get(url,{},(res)=>{
            let data = JSON.parse(res);
            if(data.code==0){
              let list = data.data;
              let timeList = list.map((items,index)=>{
                  return items.dataTime;
              })
              let days = timeList.map((item,index)=>{
                return parseInt((item.split("-"))[2]);
              })
              _this.trigger({
                days:days
              })
            }
        },(err)=>{
            alert("网络不好,请稍后再试！")
             _this.trigger({
              days:[]
            })
        })
    },
    onGetDeviceList() {
      let _this = this;
      let url = Path.wPath + '/wechat/hotel/getRoomDevices?roomId=10000';
      //let url = '../mock/list.json';
      $.ajax({
            url: url,
            dataType:'json',
            cache:true,
            async:true,
            success: function(r){
                var dataList=[];
                if(r.code==0){
                    dataList = r.data;
                    _this.trigger({dataList:addLink(dataList)});
                }
            }
        });
    }
});