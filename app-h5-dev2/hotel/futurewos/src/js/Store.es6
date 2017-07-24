'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import Promise from 'Promise';
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

const path = '/clife-showroom/bedroom'; // 测试环境和正式环境
// const path = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-showroom/bedroom' : // 测试环境
//     location.host === 'weixin.hetyj.com' ? '/clife-showroom/bedroom' : // 预发布环境
//     '/clife-showroom/bedroom'; // 正式环境



let AppData = {
		pageBtn: false, //判断是显示第几个页面
		turnOverTimesNum: 0,
		heartRate:0,
		breathRate: 0,
		turnOverTimes: 0,
		chartHeartData: [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40],
		chartBreathData: [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
		chartBodiesData: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	},
	deviceId = null,
	dataFilterTimers = {};//数据过滤计时器

// 返回过滤后的数据
const dataFilter = (data) => {
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
const setDataTimer = (...keys) => {
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

export const Store = Reflux.createStore({
    listenables: [Actions],
    onGetData(fn){
    	let _this = this,
    		macAddress = Funs.getUrlParam('deviceId');

		_this.trigger(AppData);

		if(!macAddress){
    		console.log('设备id不正确');
    		return false;
    	}

		const getLastData = () => {
    		$.ajax({
	    		type: "POST",
	    		url: path + "/mattress/getLastData?mattressId=" + deviceId,
	    		dataType: 'json',
	    		success: function(data){
	    			try{
	    				let _data = JSON.parse(data);
	    				console.log(_data);
					    if(_data.code === 0){
					    	//console.log(_data.data);
					    	let now = (new Date()).getTime(),
	                        	str = _data.data.dataTime.replace(/-/g,"/"),
					    		resTime = (new Date(str)).getTime() + 8*60*60*1000;
				    		//判断是第几个页面
				    		if(!_data.data.heartRate && !_data.data.breathRate && !_data.data.turnOverTimes){
				    			AppData.pageBtn = false;
				    			return false;
				    		}else{
				    			AppData.pageBtn = true;
				    			
				    		}

					    	if(now-resTime < 2*60*1000){
					    		deepExtend(AppData, _data.data);
					    		let heartMax = 2*_data.data.heartRate,
						    		breathData = _data.data.breathRate,
						    		turnOverTimes = _data.data.turnOverTimes;

						    	//心率
						    	AppData.heartRate = _data.data.heartRate;
						    	AppData.chartHeartData = [40,40,40,40+6*heartMax/7,40-6*heartMax/7,40-heartMax/7,40-heartMax/7,40+1*heartMax/7,40-6*heartMax/7,40,40,40,40,40,40,40+6*heartMax/7,40-6*heartMax/7,40-heartMax/7,40-heartMax/7,40+1*heartMax/7,40-6*heartMax/7,40,40,40,40,40,40,40+6*heartMax/7,40-6*heartMax/7,40-heartMax/7,40-heartMax/7,40+1*heartMax/7,40-6*heartMax/7,40,40,40];
						    	//呼吸率
						    	AppData.breathRate = _data.data.breathRate;
						    	AppData.chartBreathData = [20,20+3*breathData/4,20+breathData,20+3*breathData/4,20,20-3*breathData/4,20-breathData,20-3*breathData/4,20,20+3*breathData/4,20+breathData,20+3*breathData/4,20,20-3*breathData/4,20-breathData,20-3*breathData/4,20,20+3*breathData/4,20+breathData,20+3*breathData/4,20,20-3*breathData/4,20-breathData,20-3*breathData/4,20];
						    	//翻身
						    	AppData.turnOverTimes = _data.data.turnOverTimes;
					    	}

					    }else{
					    	console.log(_data.msg);
					    }
					    
				        _this.trigger(AppData);
				        if(fn)fn();
	    			}catch(err){
	    				_this.trigger(AppData);
	    				console.log(err);
	    			}
				},
				error: function(xhr, type){
			        _this.trigger(AppData);
				    console.log('Ajax error!');
				}
	    	});
    	}

    	if(!deviceId){
    		$.ajax({
	    		type: "POST",
	    		url: path + "/mac/device/get?macAddress=" + macAddress,
	    		dataType: 'json',
	    		success: function(data){
				    let _data = JSON.parse(data);
				    if(_data.code === 0){
				    	//console.log(_data.data.deviceId);
				    	deviceId = _data.data.deviceId;
				    	getLastData(deviceId);
				    }else{
				    	_this.trigger(AppData);
				    	console.log(_data.msg);
				    }
				},
				error: function(xhr, type){
					_this.trigger(AppData);
				    console.log('Ajax error!');
				}
	    	});
    	}else{	
    		getLastData();
    	}
    	
    	
		
    }
});