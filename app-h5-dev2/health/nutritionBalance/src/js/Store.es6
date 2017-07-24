'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

const readyData = {
    'appId':0,
    'deviceId':'F',
    'memberId':0,
    'userType':3,
    'avatar':'../static/img/avatar.jpg'
};

let detailData = []; // 明细数据缓存（用于分页）

/**
 * 数据分组排序
 * @param    {json}     data     目标数据
 * @param    {string}   groupKey 分组依据字段
 * @param    {string}   orderKey 可选，排序依据字段。若省略，将以groupKey做排序依据
 * @return   {json}              分组排序后的数据
 */
function groupData(data, groupKey, orderKey){
    var newData = {};
    var arrData = [];
    orderKey = orderKey ? orderKey : groupKey;
    // 分组
    for (var i in data) {
        var k = data[i][groupKey].replace(/\s.+$/, '');
        if (!newData[k]) {
            newData[k] = [];
        }
        newData[k].push(data[i]);
    }
    // 排序
    for (var j in newData) {
        newData[j].sort(function(a, b){
            return a[orderKey] < b[orderKey];
        });
        arrData.push({key:j, data:newData[j]});
    }
    arrData.sort(function(a, b){
        return a.key < b.key;
    });
    return arrData;
}

// 格式化日期为 yyyy-MM-dd的形式
function ymd(d) {
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`.replace(/(?=\b\d\b)/g, '0');
}
// 格式化日期为 yyyy-MM的形式
function ym(d) {
    return `${d.getFullYear()}-${d.getMonth()+1}`.replace(/(?=\b\d\b)/g, '0');
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onReady(data){
        readyData.appId = data.appId ? data.appId : readyData.appId;
        readyData.deviceId = data.deviceId ? data.deviceId : readyData.deviceId;
        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
        this.trigger(readyData);
    },
    onRepaint(data){
        readyData.appId = data.appId ? data.appId : readyData.appId;
        readyData.deviceId = data.deviceId ? data.deviceId : readyData.deviceId;
        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
        this.trigger(data);
    },
    onGetData(pageIndex){
        let cfg = {
            appId: readyData.appId,
            deviceId: readyData.deviceId,
            memberId: readyData.memberId,
            // userType: readyData.userType,
            timestamp: +new Date(),
            pageIndex: pageIndex || 0,
            pageRows: 20
        };
        let _this = this;
        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceDataList', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
            /*data.data = {};
            data.data.list = [
                {            
                    'recordTime': '2016-06-18 10:21:14', // 测量时间
                    'foodClassId':'2',          // 食材类别ID
                    'foodClassName':'鸡蛋',     // 食材类别名称
                    'foodWeight': '46.4'        // 摄入总量(g)    
                },
                {            
                    'recordTime': '2016-06-08 10:23:14', // 测量时间
                    'foodClassId':'3',          // 食材类别ID
                    'foodClassName':'鸡蛋',     // 食材类别名称
                    'foodWeight': '56.4'        // 摄入总量(g)       
                },
                {            
                    'recordTime': '2016-06-08 10:20:14', // 测量时间
                    'foodClassId':'4',          // 食材类别ID
                    'foodClassName':'鸡蛋',     // 食材类别名称
                    'foodWeight': '66.4'        // 摄入总量(g)          
                }     
            ];*/
            if (!data.data) return;
            data = groupData(data.data.list, 'recordTime');
            detailData = cfg.pageIndex===0 ? data : detailData.concat(data);
            _this.trigger({results: detailData});
        },()=>{
        });
    },
    onGetTotals(){
        let cfg = {
            appId: readyData.appId,
            deviceId: readyData.deviceId,
            // userType: readyData.userType,
            timestamp: +new Date(),
            memberId: readyData.memberId
        };
        let _this = this;
        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceDataToDay', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
            /*data.data = [
                {                      
                    'foodClassId':'1',          // 食材类别ID
                    'foodClassName':'谷类',     // 食材类别名称 
                    'foodWeight': '30'        // 食材重量（g）
                },
                {                      
                    'foodClassId':'2',          // 食材类别ID
                    'foodClassName':'鸡蛋',      // 食材类别名称    
                    'foodWeight': '33'         // 食材重量（g）       
                },
                {                      
                    'foodClassId':'3',          // 食材类别ID
                    'foodClassName':'奶类',      // 食材类别名称 
                    'foodWeight': '31'        // 食材重量（g）        
                }
            ];*/
            if (!data.data) return;
            _this.trigger({totals: data.data});
        },()=>{
        });
    },
    onGetHistoryData(beginDate, endDate, foodClassIds){
        let cfg = {
            appId: readyData.appId,
            deviceId: readyData.deviceId,
            // userType: readyData.userType,
            timestamp: +new Date(),
            memberId: readyData.memberId,
            foodClassIds: foodClassIds,
            beginDate: ymd(beginDate),
            endDate: ymd(endDate)
        };
        let _this = this;
        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceMonthData', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
            /*data.data = [
                {            
                    'recordTime': '2016-06-15 10:20:14', // 测量时间
                    'foodClassId':'2',          // 食材类别ID
                    'foodClassName':'鸡蛋',     // 食材类别名称
                    'foodWeight': '46.4'        // 摄入总量(g)    
                },
                 {            
                    'recordTime': '2016-06-18 10:20:14', // 测量时间
                    'foodClassId':'2',          // 食材类别ID
                    'foodClassName':'鸡蛋',     // 食材类别名称
                    'foodWeight': '56.4'        // 摄入总量(g)       
                },
                {            
                    'recordTime': '2016-06-09 10:20:14', // 测量时间
                    'foodClassId':'3',          // 食材类别ID
                    'foodClassName':'鸡蛋',     // 食材类别名称
                    'foodWeight': '66.4'        // 摄入总量(g)          
                }
            ];*/
            data = groupData(data.data, 'foodClassId', 'recordTime');
            _this.trigger({results: data});
        },()=>{
        });
    },
    onSelectedDate(dates){
        dates.slidedCalendarShow = false;
        this.trigger(dates);
    },
    getCalendarData(){
        let d1 = new Date();
        let d2 = new Date();
        d1.setMonth(d2.getMonth()-11);
        let cfg = {
            appId: readyData.appId,
            deviceId: readyData.deviceId,
            memberId: readyData.memberId,
            userType: readyData.userType,
            startMonth: ym(d1),
            endMonth: ym(d2),
            timestamp: +new Date()
        };
        let _this = this;
        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceDate', cfg, (data)=>{
            let d = [];
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
            /*data.data = [
                {
                    'date': '2016-06-12'
                },
                {
                    'date': '2016-04-14'
                },
                {
                    'date': '2016-04-16'
                },
                {
                    'date': '2016-04-19'
                }
            ];*/
            if (!data.data) return;
            data.data.map(v=>d.push(v.date));
            _this.trigger({validDates: d});
        },()=>{
        });
    },
    onSubmitResult(weight, foodName, foodClassId){
        let now = new Date();
        let cfg = {
            appId: readyData.appId,
            deviceId: readyData.deviceId,
            // memberId: readyData.memberId,
            timestamp: +now
        };
        let data = {
            'userType': readyData.userType,  //用户身份（1：医生  3：患者）
            'memberId': readyData.memberId,  //用户编号（切换用户用）
            'foodClassId': foodClassId,  // 食材类别ID
            'foodName': foodName,  // 食材名称
            'foodWeight': weight,  // 食材重量（g）
            'recordTime': Funs.dateFormat(now, 'yyyy-MM-dd hh:mm:ss'), //测量时间
            'timeZone': -now.getTimezoneOffset() // 时区 (10*60 统一传分钟)
        };
        cfg.data = JSON.stringify(data);
        het.post('/v1/device/data/raw/upload', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            location.href = 'health://skip_url/index.html';
        },()=>{
        });
    }
});