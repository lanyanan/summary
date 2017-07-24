'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 *
 
 * 1.获取最新血氧脉率数据
 * https://api.clife.cn/v1/app/chealth/haieraio/getLatestOxygenPulse
 * 2.查询血氧仪参数（预警值）   
 *  "oxygenAlert": 2,  //血氧报警值
 *  "pulseAlert": "60,100",  //脉率报警值（最低值，最高值）
 * http(s)://api.clife.cn/v1/app/chealth/OxygenPulse/getParameter
 * 3、查询单日血氧报告（单日总结报告+单日数据明细）
 * http(s)://api.clife.cn/v1/app/chealth/OxygenPulse/getOxygenPulseReport
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';
const readyData = {
    'appId':0,
    'memberId':0,
    'userType':3
};
let curr_date=Funs.dateFormat(new Date().getTime(),'yyyy-MM-dd');//当前日期

export const Store = Reflux.createStore({
    listenables: [Actions],
    onReady(data){
        readyData.appId = data.appId ? data.appId : readyData.appId;
        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
        readyData.userType = data.userType ? data.userType : readyData.userType;
        readyData.img = data.img ? data.img : readyData.img;
        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
        this.trigger(readyData);
    },
    onRepaint(data, type){
        data.showLastTime = false;
        this.trigger(data);
    },
    onSelectDate(flag,date){
    	if(date){
	    	this.onGetOneDayData(date);
    	}
 		this.trigger({showClndr:flag});
    },
    onChartClick(seArr,peArr,nofresh){
        this.trigger({seArr:seArr,peArr:peArr,nofresh:nofresh});
        
    },
    onGetValidDate(month,dateObj){
		let cfg = {
            appId: readyData.appId,
            memberId: readyData.memberId,
            userType: readyData.userType,
            timestamp: +new Date(),
            date:month
        };
        let _this = this,tagDates=[];
                    // console.log("111111",dateObj);

        het.get('/v1/app/chealth/OxygenPulse/getOxygenPulseDateList', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
   //          data.data = [
			//     {
			//         "date": "2016-04-02"
			//     },
			//     {
			//         "date": "2016-04-04"
			//     },
			//     {
			//         "date": "2016-04-16"
			//     },
			//     {
			//         "date": "2016-04-19"
			//     }
			// ];
            // if (!data.data) return;
            if(data.data){
            	data.data.map(it=>{
                    let date = parseInt(Funs.dateFormat(it.date,"dd"));
	                tagDates.push(date);
	            });
            }
            if(dateObj){
            	dateObj.tag(tagDates);
            }
            _this.trigger({tagDates:tagDates});
        },()=>{
        });   	
    },
    onGetOneDayData(date){
    	let cfg = {
            appId: readyData.appId,
            memberId: readyData.memberId,
            userType: readyData.userType,
            date:date,
            timestamp: +new Date()
        };
        let _this = this,noHistory=false;
        het.get('/v1/app/chealth/OxygenPulse/getOxygenPulseReport', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            if(!data.data){
            	data.data = {recordTime:curr_date};
                noHistory = true;
            }
            _this.trigger({historyResult:data.data,noHistory:noHistory});
        },()=>{
        });

    },
    onChangeDay(param,day){
    	let dt = new Date(day);
    	curr_date = Funs.dateFormat(dt.setDate(dt.getDate(dt)+param),'yyyy-MM-dd') ;
    	this.onGetOneDayData(curr_date);
    },
    onGetLastestData(){
        let cfg = {
            appId: readyData.appId,
            memberId: readyData.memberId,
            userType: readyData.userType,
            timestamp: +new Date()
        };
        let _this = this;
        het.get('/v1/app/chealth/haieraio/getLatestOxygenPulse', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
           //  data.data = {
	          //       "oxygen": "97",   //血氧
			        // "pulse": "83",  //脉率
			        // "oxygenStandard": "正常", //血氧标准状态
			        // "oxygenStandardFlag": "0",  //血氧标准状态标识
			        // "pulseStandard": "正常",  //脉率标准状态
			        // "pulseStandardFlag": "0",   //脉率标准状态标识
			        // "dataTime": "2016-06-06 12:12:12", //测量时间（UTC时间）
           //      };
            // if (!data.data) return;
            console.log(data);
            if(data.data){
                 _this.trigger({oxygen: data.data.oxygen,pulse:data.data.pulse,lastTime:data.data.dataTime,showLastTime:true});
            }
            
        },()=>{
        });   	
    },
    onGetLastestHistoryData(){
        let cfg = {
            appId: readyData.appId,
            memberId: readyData.memberId,
            userType: readyData.userType,
            timestamp: +new Date()
        };
        let _this = this,noHistory=false;
        het.get('/v1/app/chealth/OxygenPulse/getLatestOxygenPulseReport', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
             // data.data = {"recordNum":295,"oxygenAbnormalNum":0,"pulseAbnormalNum":46,"oxygenAbnormal85Num":0,"oxygenAbnormal90Num":0,"oxygenAbnormal80Num":0,"oxygenAbnormal70Num":0,"pulseMaxValue":120,"pulseMinValue":76,"pulseAvgValue":94,"recordTime":"2017-02-28","seList":[],"peList":[{"peTime":"2017-02-28 02:06:00","peContentTime":"02:06:33-02:06:49","peContent":"脉率从105bpm下降到99bpm，持续了16秒","peTitle":"脉率异常事件"}],"oxygenPulse":[{"oxygen":97.0,"dataTime":"2017-02-28 02:04:00","pulse":94},{"oxygen":97.23,"dataTime":"2017-02-28 02:05:00","pulse":90},{"oxygen":97.0,"dataTime":"2017-02-28 02:06:00","pulse":93},{"oxygen":97.1,"dataTime":"2017-02-28 02:07:00","pulse":97},{"oxygen":96.57,"dataTime":"2017-02-28 02:08:00","pulse":89},{"oxygen":97.0,"dataTime":"2017-02-28 02:09:00","pulse":103}]};
            // if (!data.data) return;
           // console.log('success',data);
            if(data.data){
                let dataTime = data.data.recordTime;
                curr_date = Funs.dateFormat(dataTime,'yyyy-MM-dd',true);
            }
            if(!data.data){
                data.data = {recordTime:curr_date};
                noHistory = true;
            }
            _this.trigger({historyResult:data.data,noHistory:noHistory}); 

        },(data)=>{         
            let isAndroid = !!(navigator.userAgent.indexOf('Android')+1),
            msg = isAndroid ? data :JSON.parse(data).msg;
           // console.log('error',typeof data==='string',data);

            het.toast(msg?'toast:'+msg:'toast:数据统计中');
            _this.trigger({historyResult:{recordTime:curr_date},noHistory:true}); 
        });   	
    }
});