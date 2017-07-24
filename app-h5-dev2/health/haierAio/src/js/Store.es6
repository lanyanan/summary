'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';


let yValueArr = [],glucoseStatus,days;

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        this.trigger(data);
    },
    //获取最新血氧脉率数据
    onLastXyml(ajaxData){
		let _this = this ,
    	  	url ='/v1/app/chealth/haieraio/getLatestOxygenPulse';
		function sucCallback(d){
			//console.log(d);
			let data = (JSON.parse(d)).data;
			if(data!='' && data != undefined){
				_this.trigger({noData:false,latestOxygen:data.oxygen,latestPulse:data.pulse,latestdataTime:data.dataTime});
			}	
		}
		het.get(url,ajaxData,sucCallback,function(e){alert(e)});	
    },
    //获取最新血糖数据
    onLastBloodGlucose(ajaxData){
    	let _this = this ,
        url ='/v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucose';
        //console.log('dddddddddd',ajaxData);
		function sucCallback(d){
			console.log(d);
			let data = (JSON.parse(d)).data;
			if(data!='' && data != undefined){
				_this.trigger({noData:false,showNext:true,latestBloodGlucose:data.bloodGlucose,latestdataTime:data.dataTime,lastStatus:data.personalStatus});
			}	
		}
		het.get(url,ajaxData,sucCallback,function(e){alert(e)});	
    },
    onLastBloodPressure(ajaxData){
    	let _this = this ,
        url ='/v1/app/chealth/haieraio/getLatestBloodPressure';
		function sucCallback(d){
			//console.log(d);
			let data = (JSON.parse(d)).data;
			if(data!='' && data != undefined){
				_this.trigger({noData:false,latestSystolicPressure:data.systolicPressure,latestdataTime:data.dataTime,lastDiastolicPressure:data.diastolicPressure});
			}	
		}
		het.get(url,ajaxData,sucCallback,function(e){alert(e)});	
    },
    onLastTemp(ajaxData){
    	let _this = this ,
        url ='/v1/app/chealth/thermometer/getLatestThermometer';
		function sucCallback(d){
			//console.log('99999999',d);
			let data = (JSON.parse(d)).data;
			if(data!='' && data != undefined){
				_this.trigger({noData:false,latestTemp:data[0].value,latestdataTime:data[0].key});
			}	
		}
		het.get(url,ajaxData,sucCallback,function(e){alert(e)});	
    }, 
	//获取最新心率心电数据
    onLastECG(ajaxData){
    	let _this = this ,
        url ='/v1/app/chealth/haieraio/getLatestHeartRate';
		function sucCallback(d){
			//console.log('99999999',d);
			let data = (JSON.parse(d)).data;
			if(data!='' && !data){
				_this.trigger({noData:false,latestHeartRate:data.heartRate,latestHeartEcg:data.heartEcg,latestdataTime:data.dataTime});
			}	
		}
		het.get(url,ajaxData,sucCallback,function(e){alert(e)});	
    },


    /* /v1/device/data/raw/upload  app代理 上传服务器*/
  //   onUploadData(data,status){
  //   	console.log('hahahahaaha',data);
  //   	let ajaxData = {
  //   		'appId':data.appId,
  //   		'timestamp':new Date().getTime(),
  //   		'deviceId':data.deviceId,
  //   		"data":{
		// 	    "userType": data.userType,  //用户身份（1：医生  3：患者）
		// 	    "memberId": data.memberId,  //用户编号（切换用户用）
		// 	   /* "status": "",   //个人状态（1：空腹，2：餐后一小时，3：餐后二小时）,如果没有，默认为空*/
		// 	    "dataType": "1",    //数据类型（1：血氧脉率，2：血压，3：血糖，4：心电，5：体温）
		// 	    "dataString": "",    //多个值请用,隔开。比如：(血氧,脉率)(收缩压,舒张压)
		// 	    "dataTime": "",  //测量时间（UTC时间）
		// 	    "timeZone": "600"   // 时区 (10*60 统一传分钟)
		// 	}
  //   	},
  //   	url = '/v1/device/data/raw/upload';
		// if(data){
		// 	let xymlData = data.xymlData,
	 //    		tempData = data.tempData,
	 //    		bloodGlucoseData = data.bloodGlucoseData,
	 //    		bloodPressureData = data.bloodPressureData,
	 //    		ecgData = data.ecgData;
		// 	if(xymlData!=''&& xymlData != undefined){
		// 		ajaxData.data.dataTime = Funs.timestampToUtc(xymlData.dataTime,'-');
		// 		ajaxData.data.dataString = xymlData.oxygen + ',' + xymlData.pulse;
		// 		het.post(url,JSON.stringify(ajaxData),function(d){console.log(d)},function(d){console.log(d)})
		// 	}
		// 	if(bloodPressureData!=''&& bloodPressureData != undefined){
		// 		ajaxData.data.dataTime = Funs.timestampToUtc(bloodPressureData.dataTime,'-');
		// 		ajaxData.data.dataString = bloodPressureData.systolicPressure + ','+ bloodPressureData.diastolicPressure ;
		// 		ajaxData.data.dataType = "2" ;
		// 		het.post(url,JSON.stringify(ajaxData),function(d){console.log(d)},function(d){console.log(d)})
		// 	}
		// 	if(bloodGlucoseData!=''&& bloodGlucoseData != undefined){
		// 		ajaxData.data.dataTime = Funs.timestampToUtc(bloodGlucoseData.dataTime,'-');
		// 		ajaxData.data.dataString = bloodGlucoseData.bloodGlucose ;
		// 		ajaxData.data.dataType = "3" ;
		// 		if(status) ajaxData.data.status = status;
		// 		het.post(url,JSON.stringify(ajaxData),function(d){console.log(d)},function(d){console.log(d)})
		// 	}
		// 	if(tempData!=''&& tempData != undefined){
		// 		ajaxData.data.dataTime = Funs.timestampToUtc(tempData.dataTime,'-');
		// 		ajaxData.data.dataString = tempData.temp ;
		// 		ajaxData.data.dataType = "5" ;
		// 		het.post(url,JSON.stringify(ajaxData),function(d){console.log(d)},function(d){console.log(d)})
		// 	}
		// }
  //   },
    /*
    *血氧脉率:/v1/app/chealth/haieraio/getLatestOxygenPulseDataList
    *血压：/v1/app/chealth/haieraio/getLatestBloodPressureDataList
    *血糖：/v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucose
    *体温：/v1/app/chealth/thermometer/getThermometerDataByTime
    */
    onUpdateEchart(date,type,ajaxData){
    	let _this = this;
    	let url='/v1/app/chealth/haieraio/getLatestOxygenPulseDataList';
    	if(type == 'temp'){
    		ajaxData.day=date;
    	}else{
    		ajaxData.days=date;
    	}
    	//console.log(date,type,ajaxData);
    	this.trigger({num:date});
    	switch(type){
    	 	case 'xyml':
	    	 	url='/v1/app/chealth/haieraio/getLatestOxygenPulseDataList';
	    	 	_this.onXymlAjax(url,ajaxData);
	    	 	break;
    	 	case 'bp':
	    	 	url='/v1/app/chealth/haieraio/getLatestBloodPressureDataList';
	    	 	_this.onBloodPressureAjax(url,ajaxData);
	    	 	break;
    	 	case 'bg':
    	 		days = date ;
	    	 	_this.onBloodGlucoseAjax(ajaxData);
	    	 	break;
    	 	case 'temp':
	    	 	url='/v1/app/chealth/thermometer/getThermometerDataByTime';
	    	 	_this.onTempAjax(url,ajaxData);
	    	 	break;
    	}
    },
    /*血氧脉率历史数据*/
    onXymlAjax(url,ajaxData){
		let _this = this,
		oxygenXValue = [],oxygenYValue = [],pulseYValue = [];
		het.get(url,ajaxData,sucCallback,function(e){alert(e)})
	    function sucCallback(result){
	    	let data = JSON.parse(result).data;
	   //  	let data = [
    //     {   
    //         "oxygen": "93",   //血氧
    //         "pulse": "37",  //脉率
    //         "dataTime": "2016-06-06 12:12:12", //测量时间（求最近一天详情为UTC时间，多天为本地日期）
    //     },
    //     {   
    //         "oxygen": "97",   //血氧
    //         "pulse": "116",  //脉率
    //         "dataTime": "2016-06-06 14:12:12", //测量时间
    //     },
    //     {
    //         "oxygen": "90",   //血氧
    //         "pulse": "199",  //脉率
    //         "dataTime": "2016-06-06 14:13:12", //测量时间
    //     },
    //     {
    //         "oxygen": "88",   //血氧
    //         "pulse": "83",  //脉率
    //         "dataTime": "2016-06-06 14:25:12", //测量时间
    //     }
    // ];
	    	//console.log(data);
		    //求最近一天详情为UTC时间，多天为本地日期）
		    if(data != '' && data != undefined){
		    	if(ajaxData.days==1){
		    		for (var i in data)
		            {
		            	let localtime =  Funs.utcToLocal(data[i].dataTime,1);
		                oxygenXValue.push(localtime);
		                oxygenYValue.push(data[i].oxygen);
		                pulseYValue.push(data[i].pulse);

		            }
		    	}else{
		    		for (var i in data)
		            {
		            	let localtime = (data[i].dataTime).substring(5,11);
		                oxygenXValue.push(localtime);
		                oxygenYValue.push(data[i].oxygen);
		                pulseYValue.push(data[i].pulse);
		            }
		    	}
		    }
		    _this.trigger({oxygenXValue:oxygenXValue,oxygenYValue:oxygenYValue,pulseXValue:oxygenXValue,pulseYValue:pulseYValue});	

	    }
	},
	//血压历史数据
	onBloodPressureAjax(url,ajaxData){
		let _this = this,
		yValue = [],
		xValue = [];
		het.get(url,ajaxData,sucCallback,function(e){alert(e)})
	    function sucCallback(result){
	    	//console.log(result);
	    	let data = JSON.parse(result).data;
		    //求最近一天详情为UTC时间，多天为本地日期）
		    if(data!='' && data != undefined){
	    		let sPressureStr = data[0].systolicPressure, pPressureStr = data[0].diastolicPressure;
		    	if(ajaxData.days==1){
		    		for (var i in data)
		            {
		            	let localtime =  Funs.utcToLocal(data[i].dataTime,1);
		                xValue.push(localtime);
		                if(i>0){
		            		sPressureStr += ','+ data[i].systolicPressure ;
	                    	pPressureStr += ','+ data[i].diastolicPressure;
		            	}
		            }
		    	}else{
		    		for (var i in data)
		            {
		            	let localtime = (data[i].dataTime).substring(5,11);
		                xValue.push(localtime);
		                if(i>0){
		            		sPressureStr += ','+ data[i].systolicPressure ;
	                    	pPressureStr += ','+ data[i].diastolicPressure;
		            	}
		            }
		    	}
		    	yValue.push(sPressureStr);
		        yValue.push(pPressureStr);
			    	
		    }
		    _this.trigger({xValue:xValue,yValue:yValue});
	    }

	},
	//体温历史数据
	onTempAjax(url,ajaxData){
		let _this = this,
		yValue = [],
		xValue = [];
		het.get(url,ajaxData,sucCallback,function(e){alert(e)})
	    function sucCallback(result){
	    	let data = JSON.parse(result).data;
	 
		    //求最近一天详情为UTC时间，多天为本地日期）
		    if(data!='' && data != undefined){
	    		let tempStr = data[0].value;
		    	if(ajaxData.day==1){
		    		for (var i in data)
		            {
		            	let localtime =  Funs.utcToLocal(data[i].key,1);
		                xValue.push(localtime);
		                if(i>0){
		            		tempStr += ','+ (data[i].value >42? "42":(data[i].value<35?'35':data[i].value));
		            	}
   		            }
		    	}else{
		    		for (var i in data)
		            {
		            	let localtime = (data[i].key).substring(5,11);
		                xValue.push(localtime);
		                if(i>0){
		            		tempStr += ','+ (data[i].value >42? "42":(data[i].value<35?'35':data[i].value));
		            	}
		            }
		    	}
		    	yValue.push(tempStr);
		    }
		    _this.trigger({xValue:xValue,yValue:yValue});	

	    }
	},
	//血糖历史数据
	onBloodGlucoseAjax(ajaxData,personalStatus){
		this.onResetGlucoseStatus(ajaxData,'1');
	
	},
	onResetGlucoseStatus(ajaxData,glucoseStatus){
		let _this = this,
    	 	url='/v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucoseDataList',
			yValue = [],
			xValue = [];
		this.trigger({glucoseStatus:glucoseStatus});
		ajaxData.days = days ;
		ajaxData.personalStatus = glucoseStatus ;
		het.get(url,ajaxData,sucCallback,function(e){alert(e)})
	    function sucCallback(result){
	    	//console.log(result);
	    	let data = JSON.parse(result).data;
		    yValueArr = data;
		        //求最近一天详情为UTC时间，多天为本地日期）
		    if(yValueArr!='' && yValueArr != undefined){
	    		let glucoseStr = '';
		    	if(days==1){
		    		for (var i in yValueArr)
		            {
						let localtime =  Funs.utcToLocal(yValueArr[i].dataTime,1);
						glucoseStr += ','+ yValueArr[i].bloodGlucose ;
		                xValue.push(localtime);
		            }
		    	}else{
		    		for (var i in yValueArr)
		            {
						let localtime =  (yValueArr[i].dataTime).substring(5,11);
						glucoseStr += ','+ yValueArr[i].bloodGlucose;
		                xValue.push(localtime);
		            }
		    	}
		    	yValue.push(glucoseStr.substring(1,glucoseStr.length));
		    }
		     _this.trigger({xValue:xValue,yValue:yValue});	
	    }
	},
	// 获取心电历史数据
	onGetECGHistoryData(data){
        let _this = this;
        het.get('/v1/app/chealth/haieraio/getHeartRateDataList', data, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            if (!data.data) return;
            data = groupECGData(data.data, 'dataTime');
            _this.trigger({history: data});
        },()=>{
        });
	},
	// 获取心电详情
	onGetHeartRateDetail(data){
        let _this = this;
        het.get('/v1/app/chealth/haieraio/getHeartRateByDataId', data, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            if (!data.data) return;
            //data = groupECGData(data.data, 'dataTime');
            _this.trigger({detail: data.data});
        },()=>{
        });
	}
});

// 心跳数据分组排序
function groupECGData(data, key){
    var monData = {};
    var monArr = [];
    var dayData = {};
    var dayArr = [];
    // 按月分组
    for (var i in data) {
        var mk = Funs.dateFormat(data[i][key], 'yyyy-MM', true);
        var dk = Funs.dateFormat(data[i][key], 'yyyy-MM-dd', true);
        if (!monData[mk]) {
            monData[mk] = {};
        }
        if (!dayData[dk]) {
        	dayData[dk] = [];
        }
        dayData[dk].push(data[i]);
        monData[mk][dk] = dayData[dk];
    }
    // 排序并组织成数组形式
    for (var j in monData) {
    	dayArr = [];
    	for (var k in monData[j]) {
    		monData[j][k].sort((a,b)=>a[key]<b[key]);
    		dayArr.push({day:k, data: monData[j][k]});
    	}
    	dayArr.sort((a,b)=>a.day<b.day);
    	monArr.push({month: j, data: dayArr});
    }
    monArr.sort((a,b)=>a.month<b.month);
    return monArr;
}