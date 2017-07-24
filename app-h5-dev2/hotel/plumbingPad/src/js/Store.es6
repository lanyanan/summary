'use strict';

import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';


const path = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
    location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
    '/clife-wechat/wechat/hotel'; // 正式环境

const source = 8; // 来源
const postUrl = `${path}/device/config/set`;

//定时器变量，用来控制连续下发控制
let _timer1,_timer2,_timer3; 

let deviceId,
    debug = true,  //测试标志
    AppData = {
        size:2, //二区，四区  暂时只有二区
        maxTotalTemperature: 55, //最大整机温度
        minTotalTemperature: 30, //最小整机温度
        maxPartitionTemperature: 55,    //分区最高温度
        minPartitionTemperature: 30,    //分区最低温度
        defaultPartitionTemperature: 40, //分区默认温度
        maxSleepTemperature: 45, //睡眠模式最大温度
        minSleepTemperature: 35, //睡眠模式最小温度
        defaultSleepTemperature: 38, //睡眠温度默认设置为38°
        startAppointmentBtn: false, //预约开机时间开关
        closeAppointmentBtn: false, //预约关机时间开关
        errorFlag: "", //设备是否在线
        allHeatTemp: 40,
        hint: 0,
        leftHeatTemp: 40,
        modeStatus: 1,
    };

// 数据过滤计时器
let dataFilterTimers = {
    
};

// 返回过滤后的数据
function dataFilter(data) {
    let time = (new Date).getTime();
    let result = {};
    for (let k in data) {
        if (typeof dataFilterTimers[k] !== 'undefined') {
            if (dataFilterTimers[k] < time) {
                dataFilterTimers[k] = 0;
                result[k] = data[k];
            }
        } else {
            result[k] = data[k];
        }
    }
    return result;
}

// 设置过滤器过期时间
function setDataTimer(...keys) {
    let time = (new Date).getTime() + 20e3; // 20秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}

var deepExtend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          out[key] = deepExtend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
};

//ajax
const ajax = (method,url,data,success) => {
    let xhr=null;

    try{
        xhr=new XMLHttpRequest();
    }catch(e){
        xhr=new ActiveXObject('Microsoft.XMLHTTP');
    }

    if(method=='get'&&data){
        url+='?'+data;
    }

    xhr.open(method,url,true);

    if(method=='get'){
        xhr.send();
    }else{
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status === 200){
                success && success(xhr.responseText);
            }else{
                console.log('出错了'+ xhr.status);
            }

        }
    }
}

const getDeviceId = (roomId,fn) =>{
    ajax('get',path + '/getRoomDevices?roomId=' + roomId,null,function(res){
        let resData = JSON.parse(res);
        if(resData.code==0){
            console.log(res);
            //console.log("deviceId:" + resData.data[0].deviceId);
            //deviceId = resData.data[0].deviceId;
            //固定设备id
            deviceId = resData.data.deviceId;
            fn?fn.call(this,deviceId):console.log('error callback');
        }else{
            console.log(res);
        }
    });
}

//微信授权
const setWechat = (wechatUserId,roomId,fn) => {

    //设置微信id
    Funs.setCookie('wechatUserId',wechatUserId);

    let wechatId = Funs.getCookie("wechatUserId");

    if (wechatId == "" || wechatId == null || wechatId == undefined) {
        let url =  path + "/user/login?format=json&type=1&redirect=" + location.href;
        window.location.href = url;
    }else{

        //设置微信Token
        ajax('get',path + '/getToken',null,function(res){
            let resData = JSON.parse(res);
            if(resData.code==0){
                let data = resData.data;
                console.log(data);
                if(!data){ het.toast('请重新扫码')}
                Funs.setCookie('accessToken',data);
                getDeviceId(roomId,fn);
            } 
        });
    }
    /**
     * [获取设备deviceId]
     * @param  {[type]} roomId [description]
     * @return {[type]}        [description]
     * 
     */
    
}
export const Store = Reflux.createStore({
    listenables: [Actions],
    //获取数据
    onGetData(bool,fn){
        let _this =this;

        const analysisData = (fn) => {
            deviceId = Funs.getUrlParam('deviceId');
            if(!deviceId){
                alert('没有设备id');
                return false;
            }
            //let url = `${path}/device/data/get?deviceId=${deviceId}`;
            
            het.get(path + "/device/data/get?deviceId=" + deviceId, {}, (res)=>{
                let data = JSON.parse(res);
                console.log(data);
                if(data.code === 0){
                    if(!data.data){
                        het.toast('没有设备');
                        return false;
                    }
                    // Object.assign(AppData,data.data);
                    deepExtend(AppData, data.data);
                    //初始变量控制
                    if(AppData.remainStartupHour === 0 && AppData.remainStartupMin === 0)
                        AppData.startAppointmentBtn = false; //无效时间
                    else
                        AppData.startAppointmentBtn = true;    //有效时间


                    if(AppData.remainShutdownHour === 0 && AppData.remainShutdownMin === 0)
                        AppData.closeAppointmentBtn = false;
                    else
                        AppData.closeAppointmentBtn = true;

                    AppData = dataFilter(AppData);


                    _this.trigger(AppData);
                    
                    //数据处理
                    if(fn) fn();
                }else{
                    AppData.errorFlag = data.msg;
                    AppData = dataFilter(AppData);
                    _this.trigger(AppData);
                    //数据处理
                    if(fn) fn();
                }
            });
        }

        if(debug){
            //测试
            //第一次初始化页面，设置一些初始变量
            if(bool){
               
                //wechatUserId，accessToken在设备列表页面设置
                let wechatId = Funs.getCookie("wechatUserId"),
                    accessToken = Funs.getCookie("accessToken");
                
                getDeviceId(wechatId,function(){
                    analysisData.call(this,fn);
                });

            }else{
                analysisData.call(this);
            }


            //analysisData.call(this,fn);
        }else{
            //开发
            //第一次初始化页面，设置一些初始变量
            if(bool){
                /**
                 * [微信授权]
                 * @param    10333 微信  18672 房间号                     
                 * @return {[type]}  
                 */
                setWechat(10333,18672,function(){
                   analysisData.call(this,fn);
                }); 

            }else{
                analysisData.call(this);
            }
            
        }

    },
    //开关机
    onChangeEquipment(i,bool){
        setDataTimer('switchStatus');
        
        let jsonData;
        if(bool){
            //开机时模式为1,设置温度为默认温度40
            setDataTimer('leftHeatTemp',"rightHeatTemp",'modeStatus');
            this.trigger({switchStatus: 1,modeStatus:2,leftHeatTemp: 40,rightHeatTemp: 40});
            jsonData = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    switchStatus: 1,
                    modeStatus:2,
                    leftHeatTemp: 40,
                    rightHeatTemp: 40,
                    updateFlag: "00000303"
                })
            };
        }else{
            this.trigger({switchStatus: i});
            jsonData = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    switchStatus: i,
                    updateFlag: "00000001"
                })
            };
        }
        

        het.post(postUrl, jsonData, (res)=>{
            let data = JSON.parse(res);
            if(parseInt(data.code) === 0){
            }else{
                dataFilterTimers['switchStatus'] = 0;
                if(bool){
                    dataFilterTimers['leftHeatTemp'] = 0;
                    dataFilterTimers['rightHeatTemp'] = 0;
                    dataFilterTimers['modeStatus'] = 0;
                }
                
            }
            
        });
    },
    //模式
    onChangeMode(i,obj){

        let json = {};
        switch(i){
            case 1:
                setDataTimer('modeStatus','allHeatTemp');
                json.modeStatus = i;
                json.allHeatTemp = obj.allHeatTemp;
                json.updateFlag = "00000002";
                this.trigger({"modeStatus": i,allHeatTemp:obj.allHeatTemp});
            break;
            case 2:
                setDataTimer('modeStatus','leftHeatTemp','rightHeatTemp');
                json.modeStatus = i;
                json.leftHeatTemp = obj.leftHeatTemp;
                json.rightHeatTemp = obj.rightHeatTemp;
                json.updateFlag = "00000302";
                this.trigger({"modeStatus": i,leftHeatTemp:obj.leftHeatTemp,rightHeatTemp:json.rightHeatTemp});
            break;
            case 3:
                setDataTimer('modeStatus','sleepModeUpTemp','sleepModeDownTemp');
                json.modeStatus = i;
                json.sleepModeUpTemp = obj.sleepModeUpTemp;
                json.sleepModeDownTemp = obj.sleepModeUpTemp;
                json.updateFlag = "00000C02";
                this.trigger({"modeStatus": i,sleepModeUpTemp:obj.sleepModeUpTemp,sleepModeDownTemp:obj.sleepModeUpTemp});

            break;
            case 4:
                setDataTimer('modeStatus','allHeatTemp');
                json.modeStatus = i;
                json.allHeatTemp = obj.allHeatTemp;
                json.updateFlag = "00000002";
                this.trigger({"modeStatus": i,allHeatTemp:obj.allHeatTemp});
            break;
        }

        let jsonData = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify(json)
        };

        het.post(postUrl, jsonData, (res)=>{
            let data = JSON.parse(res);
            if(parseInt(data.code) === 0){
            }else{
                dataFilterTimers['modeStatus'] = 0;
                dataFilterTimers['allHeatTemp'] = 0;
                dataFilterTimers['leftHeatTemp'] = 0;
                dataFilterTimers['rightHeatTemp'] = 0;
                dataFilterTimers['sleepModeUpTemp'] = 0;
                dataFilterTimers['sleepModeDownTemp'] = 0;
            }
        });
    },
    //改变整机温度
    onChangeTotalTemperature(temp){
        this.trigger({allHeatTemp:temp});
        clearTimeout(_timer1);
        _timer1 = setTimeout(function(){
            setDataTimer('allHeatTemp');
            let data = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    modeStatus: 1,
                    allHeatTemp: temp,
                    updateFlag: "00000002"
                })
            };

            het.post(postUrl, data, (res)=>{
                let data = JSON.parse(res);
                if(parseInt(data.code) === 0){
                }else{
                    dataFilterTimers['allHeatTemp'] = 0;
                }
            });
        },2000);

        
    },
    //改变睡眠温度
    onChangeSleepTemperature(temp){
        
        this.trigger({sleepModeUpTemp: temp,sleepModeDownTemp: temp});
        
        clearTimeout(_timer2);

        _timer2 = setTimeout(function(){
            let dataFilterArr = ['sleepModeUpTemp','sleepModeDownTemp'];
            setDataTimer('sleepModeUpTemp','sleepModeDownTemp');

            let data = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    modeStatus: 3,
                    sleepModeUpTemp: temp,
                    sleepModeDownTemp: temp,
                    updateFlag: "00000C02"
                })
            };

            het.post(postUrl, data, (res)=>{
                let data = JSON.parse(res);
                if(parseInt(data.code) === 0){
                }else{
                    dataFilterArr.forEach((item,index,arr)=>{
                        dataFilterTimers[item] = 0;
                    });
                }
            });
        },2000);
        
    },
    //改变分区温度
    onChangePartitionTemperature(temp,position){
        this.trigger({leftHeatTemp: temp.leftHeatTemp,rightHeatTemp:temp.rightHeatTemp});
        
        clearTimeout(_timer3);
        _timer3 = setTimeout(function(){
            let dataFilterArr = ['leftHeatTemp','rightHeatTemp'];
            setDataTimer('leftHeatTemp','rightHeatTemp');

            
            let jsonData;
            if(temp.leftHeatTemp === 0 && temp.rightHeatTemp === 0){
                jsonData = {
                    deviceId: deviceId,
                    source: source,
                    json: JSON.stringify({
                        modeStatus: 2,
                        leftHeatTemp: 0,
                        rightHeatTemp: 0,
                        updateFlag: "00000203"
                    })
                };
            }else if(position === "left"){
                //左边
                jsonData = {
                    deviceId: deviceId,
                    source: source,
                    json: JSON.stringify({
                        modeStatus: 2,
                        leftHeatTemp: temp.leftHeatTemp,
                        rightHeatTemp: temp.rightHeatTemp,
                        updateFlag: "00000102"
                    })
                };
            }else if(position === "right"){
                jsonData = {
                    deviceId: deviceId,
                    source: source,
                    json: JSON.stringify({
                        modeStatus: 2,
                        leftHeatTemp: temp.leftHeatTemp,
                        rightHeatTemp: temp.rightHeatTemp,
                        updateFlag: "00000202"
                    })
                };
            }

            het.post(postUrl, jsonData, (res)=>{
                let data = JSON.parse(res);
                if(parseInt(data.code) === 0){
                }else{
                    dataFilterArr.forEach((item,index,arr)=>{
                        dataFilterTimers[item] = 0;
                    });
                }
            });
        },2000);
        
    },
    //开启预约时间
    onChangeAppointment(bool){
        if(!bool){
            let dataFilterArr=['startAppointmentBtn','closeAppointmentBtn','startupHour','startupMin','shutdownHour','shutdownMin','remainStartupHour','remainStartupMin','remainShutdownHour','remainStartupMin']; 
           
            setDataTimer('startAppointmentBtn','closeAppointmentBtn','startupHour','startupMin','shutdownHour','shutdownMin','remainStartupHour','remainStartupMin','remainShutdownHour','remainStartupMin');
            
            this.trigger(
                {
                    startAppointmentBtn:false,
                    closeAppointmentBtn:false,
                    startupHour: 255,
                    startupMin: 255,
                    shutdownHour: 255,
                    shutdownMin: 255,
                    remainStartupHour:0,
                    remainStartupMin:0,
                    remainShutdownHour:0,
                    remainStartupMin:0
                }
            );
            let data = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    startupHour: 255,
                    startupMin: 255,
                    shutdownHour: 255,
                    shutdownMin: 255,
                    updateFlag: "000000C0"
                })
            };
            
            het.post(postUrl, data, (res)=>{
                let data = JSON.parse(res);
                if(parseInt(data.code) === 0){
                }else{
                    dataFilterArr.forEach((item,index,arr)=>{
                        dataFilterTimers[item] = 0;
                    });
                }
            });
        }else{
            setDataTimer('startAppointmentBtn','closeAppointmentBtn');
            this.trigger({startAppointmentBtn:false,closeAppointmentBtn:false});
        }
    },
    //关机状态下的启动时间
    bootAppointment(time,bool){
        let dataFilterArr = ['startupHour','startupMin','startAppointmentBtn','remainStartupHour','remainStartupMin'];
        setDataTimer('startupHour','startupMin','startAppointmentBtn','remainStartupHour','remainStartupMin');
        let jsonData;
        if(bool){
            //关
            this.trigger({startAppointmentBtn: false,startupHour: 255,startupMin: 255,remainStartupHour:0,remainStartupMin:0});
            jsonData = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    switchStatus:2,
                    startupHour: 255,
                    startupMin: 255,
                    updateFlag: "00000041"
                })
            };
        }else{
            //开
            this.trigger(
                {
                    startAppointmentBtn: true,
                    startupHour: time.startupHour,
                    startupMin: time.startupMin,
                    remainStartupHour:time.startupHour,
                    remainStartupMin:time.startupMin
                }
            );
            jsonData = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    switchStatus:2,
                    startupHour: time.startupHour,
                    startupMin: time.startupMin,
                    updateFlag: "00000041"
                })
            };
        }

        het.post(postUrl, jsonData, (res)=>{
            let data = JSON.parse(res);
            if(parseInt(data.code) === 0){
            }else{
                dataFilterArr.forEach((item,index,arr)=>{
                    dataFilterTimers[item] = 0;
                });
            }
        });
    },
    //预约启动时间
    onChangeStartUp(time){
        let dataFilterArr = ['startupHour','startupMin','startAppointmentBtn','remainStartupHour','remainStartupMin'];
        setDataTimer('startupHour','startupMin','startAppointmentBtn','remainStartupHour','remainStartupMin');
        this.trigger(
            {
                startAppointmentBtn: true,
                remainStartupHour: time.startupHour,
                remainStartupMin: time.startupMin,
                startupHour: time.startupHour,
                startupMin: time.startupMin,
            }
        );
        let jsonData = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                startupHour: time.startupHour,
                startupMin: time.startupMin,
                updateFlag: "00000040"
            })
        };

        het.post(postUrl, jsonData, (res)=>{
            let data = JSON.parse(res);
            if(parseInt(data.code) === 0){
            }else{
                dataFilterArr.forEach((item,index,arr)=>{
                    dataFilterTimers[item] = 0;
                });
            }
        });
        
    },
    //预约关闭时间
    onChangeClosing(time){
        let dataFilterArr = ['shutdownHour','shutdownMin','closeAppointmentBtn','remainShutdownHour','remainShutdownMin'];
        setDataTimer('shutdownHour','shutdownMin','closeAppointmentBtn','remainShutdownHour','remainShutdownMin');
        this.trigger(
            {
                closeAppointmentBtn: true,
                remainShutdownHour: time.shutdownHour,
                remainShutdownMin: time.shutdownMin,
                shutdownHour: time.shutdownHour,
                shutdownMin: time.shutdownMin
            }
        );
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                shutdownHour: time.shutdownHour,
                shutdownMin: time.shutdownMin,
                updateFlag: "00000080"
            })
        };

        het.post(postUrl, data, (res)=>{
            let data = JSON.parse(res);
            if(parseInt(data.code) === 0){
                
            }else{
                dataFilterArr.forEach((item,index,arr)=>{
                    dataFilterTimers[item] = 0;
                });
            }
        });
    }
});