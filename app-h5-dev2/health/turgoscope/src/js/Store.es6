'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

const readyData = { // ready数据缓存
    'appId':0,
    'deviceId':'F',
    'memberId':0,
    'userType':3,
    'avatar':'../static/img/avatar.jpg'
};

let historyData = []; // 历史数据缓存
let historyPage = 0; // 历史数据页数
let historyCond = ''; // 保存搜索条件，用于比较

// 数据分组排序
function groupData(data, key){
    var newData = {};
    var arrData = [];
    // 分组
    for (var i in data) {
        var k = data[i][key].replace(/\s.+$/, '');
        if (!newData[k]) {
            newData[k] = [];
        }
        newData[k].push(data[i]);
    }
    // 排序
    for (var j in newData) {
        /*newData[j].sort(function(a, b){
            return a[key] < b[key];
        });*/
        arrData.push({key:j, data:newData[j]});
    }
    arrData.sort(function(a, b){
        return a.data[0][key] < b.data[0][key];
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
        data = typeof data === 'string' ? JSON.parse(data) : data;
        readyData.appId = data.appId ? data.appId : readyData.appId;
        // readyData.deviceId = data.deviceId;
        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
        readyData.userType = data.userType ? data.userType : readyData.userType;
        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
        this.trigger(readyData);
    },
    onRepaint(data){
        data = typeof data === 'string' ? JSON.parse(data) : data;
        readyData.appId = data.appId ? data.appId : readyData.appId;
        // readyData.deviceId = data.deviceId;
        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
        readyData.userType = data.userType ? data.userType : readyData.userType;
        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
        this.trigger(data);
    },
    onGetData(){
        let cfg = {
            appId: readyData.appId,
            // deviceId: readyData.deviceId,
            memberId: readyData.memberId,
            userType: readyData.userType,
            timestamp: +new Date()
        };
        let _this = this;
        het.get('/v1/app/chealth/sphygmomanometer/getLatestDataList', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
            /*data.data = [
                {   
                    'systolicPressure': '142',  //收缩压
                    'diastolicPressure': '83',  //舒张压
                    'heartRate': '--',  //心率
                    'dataTime': '2016-06-06 12:12:12', //测量时间
                },
                {   
                    'systolicPressure': '132',  //收缩压
                    'diastolicPressure': '83',  //舒张压
                    'heartRate': '56',  //心率
                    'dataTime': '2016-06-06 14:12:12', //测量时间
                }
            ];*/
            _this.trigger({isInitialization: false});
            if (!data.data) return;
            // data.data.sort((a, b)=>a.dataTime<b.dataTime);
            _this.trigger({results: data.data});
        },()=>{
            _this.trigger({isInitialization: false});
        });
    },
    onGetHistoryData(beginDate, endDate){
        let cfg = {
            appId: readyData.appId,
            // deviceId: readyData.deviceId,
            memberId: readyData.memberId,
            userType: readyData.userType,
            startDate: ymd(beginDate),
            endDate: ymd(endDate),
            timestamp: +new Date(),
            pageIndex: historyPage,
            pageRows: 20
        };
        let _this = this;
        let cond = cfg.beginDate + cfg.endDate;
        if (historyCond != cond) {
            cfg.pageIndex = historyPage = 1; // 重置page
        }
        het.get('/v1/app/chealth/sphygmomanometer/getDataList', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
            /*data.data = [
                {
                    'systolicPressure': '142',  //收缩压
                    'diastolicPressure': '83',  //舒张压
                    'heartRate': '--',  //心率
                    'dataTime': '2016-06-07 14:13:12', //测量时间
                },
                {
                    'systolicPressure': '142',  //收缩压
                    'diastolicPressure': '83',  //舒张压
                    'heartRate': '86',  //心率
                    'dataTime': '2016-06-07 14:13:12', //测量时间
                },
                {
                    'systolicPressure': '142',  //收缩压
                    'diastolicPressure': '83',  //舒张压
                    'heartRate': '86',  //心率
                    'dataTime': '2016-06-07 14:13:12', //测量时间
                },
                {
                    'systolicPressure': '142',  //收缩压
                    'diastolicPressure': '83',  //舒张压
                    'heartRate': '86',  //心率
                    'dataTime': '2016-06-07 14:13:12', //测量时间
                },
                {
                    'systolicPressure': '142',  //收缩压
                    'diastolicPressure': '83',  //舒张压
                    'heartRate': '86',  //心率
                    'dataTime': '2016-06-09 14:13:12', //测量时间
                },
                {
                    'systolicPressure': '132',  //收缩压
                    'diastolicPressure': '83',  //舒张压
                    'heartRate': '186',  //心率
                    'dataTime': '2016-06-07 14:12:12', //测量时间
                }
            ];*/
            if (!data.data) return;
            if (historyCond == cond) {
                historyData = historyData.concat(groupData(data.data, 'dataTime'));
                historyPage ++;
            } else {
                historyData = groupData(data.data, 'dataTime');
            }
            _this.trigger({results: historyData});
        },()=>{
        });
        this.onGetDataCount(beginDate, endDate); // 同时获取统计数据
    },
    onGetDataCount(beginDate, endDate){
        let cfg = {
            appId: readyData.appId,
            // deviceId: readyData.deviceId,
            memberId: readyData.memberId,
            userType: readyData.userType,
            startDate: ymd(beginDate),
            endDate: ymd(endDate),
            timestamp: +new Date()
        };
        let _this = this;
        het.get('/v1/app/chealth/sphygmomanometer/getDataCount', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
            /*data.data = {
                'highTimes': 1,//血压偏高次数
                'highBloodPressure': '83,156',  //血压最高数据（收缩压,舒张压）
                'lowTimes': 4,//血压偏低次数
                'lowBloodPressure': '62,96',    //血压最低数据（收缩压,舒张压）
                'fastTimes': 1,//心率偏快次数
                'fastHeartRate': '183', //心率最快数据(心率)
                'slowTimes': 2,   //心率偏慢次数
                'slowHeartRate': '63'  //心率最慢数据(心率)
            };*/
            if (!data.data) return;
            _this.trigger({countResult: data.data});
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
            // deviceId: readyData.deviceId,
            memberId: readyData.memberId,
            userType: readyData.userType,
            startMonth: ym(d1),
            endMonth: ym(d2),
            timestamp: +new Date()
        };
        let _this = this;
        het.get('/v1/app/chealth/sphygmomanometer/getMonthDataListByTime', cfg, (data)=>{
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
    }
});