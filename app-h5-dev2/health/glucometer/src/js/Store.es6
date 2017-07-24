'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

const readyData = {
    'appId':0,
    'deviceId':'F',
    'memberId':0,
    'userType':3,
    'avatar':'../static/img/avatar.jpg'
};

let historyData = []; // 历史数据缓存
let historyPage = 1; // 历史数据页数
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
            return a[key] > b[key];
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
        readyData.appId = data.appId ? data.appId : readyData.appId;
        // readyData.deviceId = data.deviceId;
        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
        readyData.userType = data.userType ? data.userType : readyData.userType;
        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
        this.trigger(readyData);
    },
    onRepaint(data){
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
        het.get('/v1/app/chealth/bloodGlucoseMeter/getBloodGlucoseMeterData', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
            /*data.data = [
                {
                    'recordTime': '2016-07-29 12:11:12',
                    'personalStatusName':'空腹',
                    'bloodGlucoseValue':'12.8',
                    'resultName':'偏高'
                },
                {
                    'recordTime': '2016-07-28 12:12:12',
                    'personalStatusName':'餐后一小时',
                    'bloodGlucoseValue':'12.8',
                    'resultName':'偏高' 
                }
            ];*/
            _this.trigger({isInitialization: false});
            if (!data.data) return;
            // data.data.sort((a, b)=>a.recordTime<b.recordTime);
            _this.trigger({results: data.data});
        },()=>{
            _this.trigger({isInitialization: false});
        });
    },
    onGetHistoryData(beginDate, endDate, resultIds, personalStatusIds){
        let cfg = {
            appId: readyData.appId,
            // deviceId: readyData.deviceId,
            memberId: readyData.memberId,
            userType: readyData.userType,
            resultIds: resultIds,
            personalStatusIds: personalStatusIds,
            beginDate: ymd(beginDate),
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
        het.get('/v1/app/chealth/bloodGlucoseMeter/getBloodGlucoseDataList', cfg, (data)=>{
            data = typeof data==='string' ? JSON.parse(data) : data;
            // 模拟数据
            /*data.data = [
                {
                    'recordTime': '2016-07-27 12:11:12',
                    'personalStatusName':'空腹',
                    'bloodGlucoseValue':'12.8',
                    'resultName':'偏高'
                },
                {
                    'recordTime': '2016-07-28 12:11:12',
                    'personalStatusName':'餐后一小时',
                    'bloodGlucoseValue':'12.8',
                    'resultName':'偏高' 
                }
            ];*/
            if (!data.data) return;
            if (historyCond == cond) {
                historyData = historyData.concat(groupData(data.data, 'recordTime'));
                historyPage ++;
            } else {
                historyData = groupData(data.data, 'recordTime');
            }
            _this.trigger({results: historyData});
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
        het.get('/v1/app/chealth/bloodGlucoseMeter/getBloodGlucoseMeterDateByTime', cfg, (data)=>{
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