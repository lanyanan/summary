'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

var {Router, Route, hashHistory,Link,browserHistory} = ReactRouter;

let timer = 0;
const tipsShow = (_this,tips)=>{
	console.log("00")
	_this.trigger({
		tips:tips,
		toastShow:true
	})
	timer = setTimeout(()=>{
		console.log("00")
		_this.trigger({
		toastShow:false
	})
	},3000)
};

const deviceId = Funs.getUrlParam('deviceId');
//const deviceId = "2F52061F947B99A04EC7110855BEEA6E";
const path = location.host === 'weixin.clife.cn' || location.host === '127.0.0.1' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
    location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
    '/clife-wechat/wechat/hotel'; // 正式环境
const source = 8; // 来源
const postUrl = `${path}/device/config/set`;

const AppData = {
    alarmClock1Hour:'--',
    alarmClock1Minute:'--',
    alarmClock2Hour:'--',
    alarmClock2Minute:'--',
    alarmClock1LightMode:0,
    alarmClock2LightMode:0,
    alarmClock1Repeat:0,
    alarmClock2Repeat:0,
};

const isShutdown = ()=> AppData.light==0 && AppData.mist==3;

// 数据过滤计时器
let dataFilterTimers = {
    lightSwitch: 0,
    lightness : 0,
    lightingPatternNumber:0,
	lightColorR:0,
	lightColorB:0,
	lightColorG:0,
	colorIndex:0,
	deviceSettingsSmartLight:0,
	alarmClock1Switch:0,
	alarmClock2Switch:0,
    alarmClock1Hour:0,
    alarmClock2Hour:0,
    alarmClock1LightMode:0,
    alarmClock2LightMode:0,
    alarmClock1Repeat:0,
    alarmClock2Repeat:0,
    alarmClock1Minute:0,
    alarmClock2Minute:0,
    alarmClock1Nap:0,
    alarmClock2Nap:0
};
let lightTimer=0; // 亮度计时器，防止操作过频繁

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
    let time = (new Date).getTime() + 10e3; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}

function getRGBColorIndex(r='', g='', b='') {
    let colors = ['#ff7c7c', '#ffd376', '#a0e674', '#5be6bd', '#88a1fe'];
    let color = '#' + pad0(r.toString(16)) + pad0(g.toString(16)) + pad0(b.toString(16));
    function pad0(hex) {
        return hex.replace(/^\b(?=.$)/, '0');
    }
    return (colors.indexOf(color) || 0) ;
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onLogin() {
        /*setCookie('wechatUserId',10302,0.5,'/');
        let _this = this;
        let routerFirst =  path;
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
        console.log(window.location.href)
        let wechatId = getCookie(name);
            if (wechatId == "" || wechatId == null || wechatId == undefined) {
                console.log('-------------请求id--')
                //"http://weixin.clife.cn/clife-wechat-test" + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
                let url =  routerFirst + "/wechat/user/login?format=json&type=1&redirect=" + window.location.href;
                console.log(url)
                //console.log(url)
                window.location.href = url;
                //console.log(location.href)
            }else{
                console.log('设置WeChatUserId成功');
                let accessToken = getCookie('accessToken');
                $.ajax({
                type: 'GET',
                url: path+'/getToken',
                dataType: 'json',
                async:false,
                cache:true,
                timeout: 500,
                success: function(data){
	                if(data.code==0){
	                  let accessToken = data.data;
	                  setCookie('accessToken',accessToken,720000,'/');
	                  // Actions.getScene();
	                  } 
	                },
                error: function(xhr, type){
                	console.log(xhr)
                }
            })           
        }         
    };  
        hasCookie('wechatUserId');*/
    },
    onGetData(clockId){
        let _this = this;
        let timestamp = +new Date();
        let time = new Date();
        let url = `${path}/device/data/get?deviceId=${deviceId}&time=${time}`;
        het.get(url, {}, (res)=>{
            let json = JSON.parse(res);
            let data = json.data;
            if (json.code == 103005001) { // 未授权，跳转授权页面
                location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
            }
            if (data) {
                data.tips = '';
                data.toastShow = false;
                if (data.onlineStatus && data.onlineStatus!=0) {
                    tipsShow(_this,"设备不在线")
                }
                if(clockId==undefined){//这是处理来自闹铃设置的

                }else {
                  	data.repeat = clockId==1?(data.alarmClock1Repeat==192?"周末":"工作日"):data.alarmClock2Repeat==192?"周末":"工作日";
                  	data.light = clockId==1?(data.alarmClock1LightMode==1?"timing-setting-light-right-on":"timing-setting-light-right-off"):data.alarmClock2LightMode==1?"timing-setting-light-right-on":"timing-setting-light-right-off";
        			data.later = clockId==1?(data.alarmClock1Bell==1?"timing-remind-right-on":"timing-remind-right-off"):data.alarmClock1Bell==1?"timing-remind-right-on":"timing-remind-right-off";
        			data.work = clockId==1?(data.alarmClock1Repeat==192?"":"selected"):data.alarmClock2Repeat==192?"":"selected";
        			data.week = clockId==1?(data.alarmClock1Repeat==192?"selected":""):data.alarmClock2Repeat==192?"selected":"";
        			let hoursIndex = clockId==1?data.alarmClock1Hour:data.alarmClock2Hour;
                	hoursIndex = hoursIndex[0]==0?hoursIndex[1]:hoursIndex;
                	let minIndex = clockId==1?data.alarmClock1Minute:data.alarmClock2Minute;
                	minIndex = minIndex[0]==0?minIndex[1]:minIndex;
                	window.mySwiper0.slideTo(hoursIndex,1000,true);
                  	window.mySwiper1.slideTo(minIndex,1000,true);
                }
                let dataJson = dataFilter(data);
                if(dataJson.alarmClock1Hour==undefined||dataJson.alarmClock2Hour==undefined){
                	dataJson.alarmClock1Hour=AppData.alarmClock1Hour;
			        dataJson.alarmClock1Minute=AppData.alarmClock1Minute;
			        dataJson.alarmClock1LightMode=AppData.alarmClock1LightMode;
			        dataJson.alarmClock2LightMode=AppData.alarmClock2LightMode;
			        dataJson.alarmClock1Repeat=AppData.alarmClock1Repeat;
			        dataJson.alarmClock2Repeat=AppData.alarmClock2Repeat;
			        dataJson.alarmClock2Hour=AppData.alarmClock2Hour;
			        dataJson.alarmClock2Minute=AppData.alarmClock2Minute;
                }
                _this.trigger(dataJson);      
            } else if (json.msg) {
            	tipsShow(_this,json.msg)
            }
        },(err)=>{
        	tipsShow(_this,"网络出错！请稍后再试")
        });
    },
    onChangeSwitch(S,R,G,B,index,num,P){
    	let _this = this;
    	setDataTimer('lightSwitch','lightness','lightingPatternNumber','lightColorR','lightColorB','lightColorG');
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                lightSwitch: S,
			    lightness : num,
			    lightingPatternNumber:P,
				lightColorR:R,
				lightColorB:B,
				lightColorG:G,
                controlNumber:0x01,
            })
        };
        if(S==0){
        	$(".home-on").css("bottom","0")
    		$(".lamp-btn").css("height","30%");
        	_this.trigger({
        		lightSwitch:0
            	})
        }else{
        	$(".home-on").css("bottom","-70%")
    		$(".lamp-btn").css("height","9.9166666rem");
        	_this.trigger({
        		lightSwitch:1
        	})
        }
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('调节开关成功');  
            }else{
            	tipsShow(_this,d.msg)
            }
        },(err)=>{
			tipsShow(_this,"网络不好请稍后再试！")
        });
    },
    onChangeColor(S,R,G,B,index,num,P){
    	let _this=this;
    	setDataTimer('lightingPatternNumber','lightColorR','lightColorG','lightColorB','colorIndex');
    	let colorListShow = P==0?false:true;
    	_this.trigger({
                	lightColorR:parseInt(R),
                	lightColorG:parseInt(G),
                	lightColorB:parseInt(B),
                	colorListShow:colorListShow,
                	colorIndex:index,
                	lightingPatternNumber:P,
                })
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                lightingPatternNumber:P,
                lightSwitch:1,
                lightColorR:parseInt(R),
                lightColorB:parseInt(B),
                lightColorG:parseInt(G),
                lightness:num,
                controlNumber:0x01,
            })
        };
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('调节颜色成功');   
            }else{
            	tipsShow(_this,d.msg)
            }
        });
    },
    onChangeLight(R,G,B,num,index,p){
    	let _this = this;
        setDataTimer('lightness');
        this.trigger({
        	lightness:num
        })
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                lightSwitch:1,
                lightingPatternNumber:p,
                lightColorR:parseInt(R),
                lightColorB:parseInt(B),
                lightColorG:parseInt(G),
                lightness:num,
                controlNumber:0x01,
            })
        };
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
            	console.log('调节灯光成功')
            }else{
            	tipsShow(_this,d.msg)
            }
        });
        
    },
    onControlLight(num){
    	let _this=this;
    	let number = num==1?0:1
    	setDataTimer('deviceSettingsSmartLight');
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
            	deviceSettingsSmartLight:number,
            	controlNumber:0x07  
            })
        };
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('关闭智能灯成功');
                let music = num==1?"timing-setting-music-right-off":"timing-setting-music-right-on";
                _this.trigger({
                	music:music,
                	deviceSettingsSmartLight:number
                })
            }else{
            	tipsShow(_this,d.msg)
            }
        });
    },
    onResetFactory() {
    	let _this=this;
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
            	deviceSettingsReset:1,
            	controlNumber:0x07   
            })
        };
        _this.trigger({
                	resettingHidden:false
        })
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('恢复出厂设备成功');
            }else{
            	tipsShow(_this,"恢复出厂设备失败")
            }
        },(err)=>{
        	tipsShow(_this,"网络不好请稍后再试！")
        });
    },
    onChangeClock1Switch(dataJson) {
    	let _this=this;
    	setDataTimer('alarmClock1Switch');
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify(dataJson)
        };
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('闹铃1开关设置成功');
                _this.trigger({
                	alarmClock1Switch:dataJson.alarmClock1Switch,
                })
            }else{
            	tipsShow(_this,d.msg)
            }
        },(err)=>{
        	tipsShow(_this,"网络不好请稍后再试！")
        });
    },
    onChangeClock2Switch(dataJson) {
    	let _this=this;
    	setDataTimer('alarmClock2Switch');
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify(dataJson)
        };
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('闹铃2开关设置成功');
                _this.trigger({
                	alarmClock2Switch:dataJson.alarmClock2Switch,
                })
            }else{
            	tipsShow(_this,d.msg)
            }
        },(err)=>{
        	tipsShow(_this,"网络不好请稍后再试！")
        });
    },
    onSaveClock(dataJson) {
    	let _this=this;
    	if(dataJson.id==1){
    		setDataTimer('alarmClock1Hour','alarmClock1LightMode','alarmClock1Repeat','alarmClock1Minute')
    	}else{ 
    		setDataTimer('alarmClock2Hour','alarmClock2LightMode','alarmClock2Repeat','alarmClock2Minute')
    	}
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify(dataJson)
        };
        AppData.alarmClock1Hour = dataJson.alarmClock1Hour;
        AppData.alarmClock1Minute = dataJson.alarmClock1Minute;
        AppData.alarmClock1LightMode = dataJson.alarmClock1LightMode;
        AppData.alarmClock2LightMode = dataJson.alarmClock2LightMode;
        AppData.alarmClock1Repeat = dataJson.alarmClock1Repeat;
        AppData.alarmClock2Repeat = dataJson.alarmClock2Repeat;
        AppData.alarmClock2Hour = dataJson.alarmClock2Hour;
        AppData.alarmClock2Minute = dataJson.alarmClock2Minute;
        _this.trigger(AppData)
        console.log(AppData)
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
            	console.log('闹铃设置成功')
            	_this.trigger({
            		mark:1
            	})
            	tipsShow(_this,"闹铃设置成功")
            }else{
            	tipsShow(_this,"闹铃设置失败")
            }
        },(err)=>{
        	tipsShow(_this,"网络不好请稍后再试！")
        });
    },
    onShowData() {
    	this.trigger(AppData)
    }
});