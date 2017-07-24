import {Funs} from '../../../common/src/fun.es6';
'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

const AppData = {};

// 数据过滤计时器
let dataFilterTimers = {};

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

function myFormatDate(date) {
    return date.replace("年", "-").replace("月", "-").replace("日", "");
}
/**
 * 把UTC的"yyyy-MM-dd hh:mm:ss"转换成北京时间的"yyyy-MM-dd hh:mm:ss"
 * @param utcTime
 */
function transTimeFromUTC2Current(utcTime) {
    utcTime = utcTime.toString().replace(" ", "T");
    utcTime = utcTime + ".000+00:00";
    return Funs.dateFormat(utcTime, "yyyy-MM-dd hh:mm:ss", false);
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas, type){//type:0 控制数据;1: 运行数据

        let data = dataFilter(datas);
        //设备id
        if (!!data.deviceId) AppData.deviceId = data.deviceId;
        //断网离线
        if (!!data.online) {
            AppData.online = data.online;
            if (data.online == 1) {
                AppData.hasShowOffLineTip = false;
            }
            // het.toast("online--> : "+AppData.online);
            //console.log("Store-->online--> : "+AppData.online);
        }
        if (!!data.networkavailable) {
            // het.toast('networkavailable--> : '+data.networkavailable);
            // if (AppData.networkavailable != 2 && !data.networkavailable && data.networkavailable == 2) het.toast('当前网络不可用，请检查你的网络');
            AppData.networkavailable = data.networkavailable;
            //console.log("Store-->networkavailable--> : "+AppData.networkavailable);
        }
        //位置信息
        if (data.cityName != undefined) AppData.cityName = data.cityName;//城市位置

        //运行数据
        if (data.powerstatus != undefined) AppData.powerstatus = data.powerstatus;//开关机状态 0x01：开机;0x02：关机; 0x03：待机;

        if (data.airlevel != undefined) AppData.airlevel = data.airlevel;//空气质量指数状态
        if (data.pm25high != undefined) AppData.pm25high = data.pm25high;//PM25高字节
        if (data.pm25low != undefined) AppData.pm25low = data.pm25low;
        if (data.PM10high != undefined) AppData.PM10high = data.PM10high;//PM10高位
        if (data.PM10low != undefined) AppData.PM10low = data.PM10low;
        if (data.formaldehydehigh != undefined) AppData.formaldehydehigh = data.formaldehydehigh;//甲醛值高字节
        if (data.formaldehydelow != undefined) AppData.formaldehydelow = data.formaldehydelow;
        if (data.TVOChigh != undefined) AppData.TVOChigh = data.TVOChigh;//TVOChigh
        if (data.TVOClow != undefined) AppData.TVOClow = data.TVOClow;
        if (data.CO2high != undefined) AppData.CO2high = data.CO2high;//CO2high
        if (data.CO2low != undefined) AppData.CO2low = data.CO2low;
        if (data.temperature != undefined) AppData.temperature = data.temperature;//温度值
        if (data.humidity != undefined) AppData.humidity = data.humidity;//湿度值

        if (AppData.pm25high != undefined && AppData.pm25low != undefined) {
            AppData.pm25Value = AppData.pm25high * 256 + AppData.pm25low;
        }
        if (AppData.PM10high != undefined && AppData.PM10low != undefined) {
            AppData.pm10Value = AppData.PM10high * 256 + AppData.PM10low;
        }
        if (AppData.formaldehydehigh != undefined && AppData.formaldehydelow != undefined) {
            AppData.formaldehydeValue = AppData.formaldehydehigh * 256 + AppData.formaldehydelow;
        }
        if (AppData.TVOChigh != undefined && AppData.TVOClow != undefined) {
            AppData.tvocValue = AppData.TVOChigh * 256 + AppData.TVOClow;
        }
        if (AppData.CO2high != undefined && AppData.CO2low != undefined) {
            AppData.co2Value = AppData.CO2high * 256 + AppData.CO2low;
        }
        //控制数据
        if (data.power != undefined) AppData.power = data.power;//开关机设置
        // if (data.buzzer != undefined) AppData.buzzer = data.buzzer;//蜂鸣器设置
        // if (data.displaycycle != undefined) AppData.displaycycle = data.displaycycle;//显示屏切换周期设置
        if (data.updateFlag != undefined) AppData.updateFlag = data.updateFlag;//功能变更
        //故障数据
        if (data.lowvoltage != undefined) AppData.lowvoltage = data.lowvoltage;//低电量报警
        if (data.air != undefined) AppData.air = data.air;//空气质量指数超标
        if (data.PM25 != undefined) AppData.PM25 = data.PM25;//PM25指数状态
        if (data.PM10 != undefined) AppData.PM10 = data.PM10;//PM10指数状态
        if (data.formaldehyde != undefined) AppData.formaldehyde = data.formaldehyde;//甲醛指数状态
        if (data.TVOC != undefined) AppData.TVOC = data.TVOC;//TVOC指数状态
        if (data.CO2 != undefined) AppData.CO2 = data.CO2;//二氧化碳指数状态

        if (AppData.lowvoltage == 1 && (AppData.showDialogStatusLowVoltage == undefined || AppData.showDialogStatusLowVoltage == 0)) {//如果AppData.lowvoltage == 1(故障) 且 之前没有
            //显示弹窗
            AppData.showDialogStatusLowVoltage = 1;
            AppData.titleButtonOne = "电量提醒";
            AppData.contentButtonOne = "电量已少于25%, 请及时充电";
            AppData.isShowDialogButtonOne = true;
        } else if (AppData.lowvoltage == 0) {
            AppData.showDialogStatusLowVoltage = 0;
        }
        if (AppData.air == 1 && (AppData.showDialogStatusair == undefined || AppData.showDialogStatusair == 0)) {//
            //显示弹窗
            AppData.showDialogStatusair = 1;
            AppData.titleButtonOne = "告警";
            AppData.contentButtonOne = "空气质量指数超标";
            AppData.isShowDialogButtonOne = true;
        } else if (AppData.air == 0) {
            AppData.showDialogStatusair = 0;
        }
        if (AppData.PM25 == 1 && (AppData.showDialogStatusPM25 == undefined || AppData.showDialogStatusPM25 == 0)) {//
            //显示弹窗
            AppData.showDialogStatusPM25 = 1;
            AppData.titleButtonOne = "告警";
            AppData.contentButtonOne = "PM2.5指数超标";
            AppData.isShowDialogButtonOne = true;
        } else if (AppData.PM25 == 0) {
            AppData.showDialogStatusPM25 = 0;
        }
        if (AppData.PM10 == 1 && (AppData.showDialogStatusPM10 == undefined || AppData.showDialogStatusPM10 == 0)) {//
            //显示弹窗
            AppData.showDialogStatusPM10 = 1;
            AppData.titleButtonOne = "告警";
            AppData.contentButtonOne = "PM10指数超标";
            AppData.isShowDialogButtonOne = true;
        } else if (AppData.PM10 == 0) {
            AppData.showDialogStatusPM10 = 0;
        }
        if (AppData.formaldehyde == 1 && (AppData.showDialogStatusformaldehyde == undefined || AppData.showDialogStatusformaldehyde == 0)) {//
            //显示弹窗
            AppData.showDialogStatusformaldehyde = 1;
            AppData.titleButtonOne = "告警";
            AppData.contentButtonOne = "甲醛指数超标";
            AppData.isShowDialogButtonOne = true;
        } else if (AppData.formaldehyde == 0) {
            AppData.showDialogStatusformaldehyde = 0;
        }
        if (AppData.TVOC == 1 && (AppData.showDialogStatusTVOC == undefined || AppData.showDialogStatusTVOC == 0)) {//
            //显示弹窗
            AppData.showDialogStatusTVOC = 1;
            AppData.titleButtonOne = "告警";
            AppData.contentButtonOne = "TVOC指数超标";
            AppData.isShowDialogButtonOne = true;
        } else if (AppData.TVOC == 0) {
            AppData.showDialogStatusTVOC = 0;
        }
        if (AppData.CO2 == 1 && (AppData.showDialogStatusCO2 == undefined || AppData.showDialogStatusCO2 == 0)) {//
            //显示弹窗
            AppData.showDialogStatusCO2 = 1;
            AppData.titleButtonOne = "告警";
            AppData.contentButtonOne = "CO2指数超标";
            AppData.isShowDialogButtonOne = true;
        } else if (AppData.CO2 == 0) {
            AppData.showDialogStatusCO2 = 0;
        }

        if (data.aqiOuter != undefined) AppData.aqiOuter = data.aqiOuter;
        if (data.coOuter != undefined) AppData.coOuter = data.coOuter;
        if (data.no2Outer != undefined) AppData.no2Outer = data.no2Outer;
        if (data.o3Outer != undefined) AppData.o3Outer = data.o3Outer;
        if (data.pm10Outer != undefined) AppData.pm10Outer = data.pm10Outer;
        if (data.pm25Outer != undefined) AppData.pm25Outer = data.pm25Outer;
        if (data.so2Outer != undefined) AppData.so2Outer = data.so2Outer;
        if (data.tempOuter != undefined) AppData.tempOuter = data.tempOuter;
        if (data.updateTimeOuter != undefined) AppData.updateTimeOuter = data.updateTimeOuter;
        if (data.qualityOuter != undefined) AppData.qualityOuter = data.qualityOuter;

        if (data.createTime != undefined) AppData.createTime = data.createTime;//

        if (data.dataList != undefined) AppData.dataList = data.dataList;//
        if (data.loading != undefined) AppData.loading = data.loading;//
        this.trigger(AppData);
    },
    onCancelSelect(){
        AppData.showTimeSelectView = false;
        this.trigger(AppData);
    },
    onSubmitSelect(date){
        AppData.showTimeSelectView = false;
        AppData.currentDate = date;
        this.trigger(AppData);
    },
    onGetAllData(){
        // console.log("Store-->loading==> onGetAllData-->start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
        let _this = this;
        let date = AppData.currentDate;
        if (date === undefined) {
            let myDate = new Date();
            date = myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日";
        }
        AppData.currentDate = date;
        let dateStr = myFormatDate(date);
        let url = '/v1/app/customization/desay/airDetector/getDataList';

        if (!AppData.networkavailable && AppData.networkavailable == 2) {
            AppData.isLoadingGetAllData = 0;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            het.toast('获取数据失败~');
            AppData.loadAllDataSuccess = false;
            // console.log("Store-->loading==> onGetAllData-->networkavailable is 2|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            _this.trigger(AppData);
            return;
        }

        let params = {
            "deviceId": AppData.deviceId,
            "timeZone": '8',
            "date": dateStr
        };
        let time = undefined;
        let sucCallBack = (success) => {
            let successParse = JSON.parse(success);
            //console.log('data =' + JSON.stringify(successParse.data));
            if (successParse.code == 0) {
                AppData.isLoadingGetAllData = 0;
                AppData.dataList = successParse.data;
                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
                AppData.loadAllDataSuccess = true;
                //console.log("Store-->loading==> onGetAllData-->sucCallBack code == 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
                if (time) clearTimeout(time);
                _this.trigger(AppData);
            } else {
                AppData.isLoadingGetAllData = 0;
                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
                het.toast('请求异常');
                AppData.loadAllDataSuccess = false;
                //console.log("Store-->loading==> onGetAllData-->sucCallBack code != 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
                if (time) clearTimeout(time);
                _this.trigger(AppData);
            }
        };
        let errCallback = (fail) => {
            AppData.isLoadingGetAllData = 0;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            het.toast('获取数据失败~');
            AppData.loadAllDataSuccess = false;
            //console.log("Store-->loading==> onGetAllData-->errCallback|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            if (time) clearTimeout(time);
            _this.trigger(AppData);
        };
        if (AppData.deviceId == undefined) {
            AppData.isLoadingGetAllData = 0;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            //console.log("Store-->loading==> onGetAllData-->deviceId == undefined|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            if (time) clearTimeout(time);
            _this.trigger(AppData);
        } else {
            het.get(url, params, sucCallBack, errCallback);
            AppData.isLoadingGetAllData = 1;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            //console.log("Store-->loading==> onGetAllData-->het.get start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            time = setTimeout(function () {
                AppData.isLoadingGetAllData = 0;
                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
                //console.log("Store-->loading==> onGetAllData-->setTimeout|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
                // het.toast('请求历史数据超时~');
                if (AppData.loading === 2) het.toast('请求数据超时~');
                _this.trigger(AppData);
            }, 30 * 1000);
            _this.trigger(AppData);
        }
    },
    onGetLatestData(){
        if (AppData.airlevel !== undefined) {
            //console.log("==het.get== onGetLatestData start , there is have run data");
            return;
        }
        //console.log("Store-->loading==> onGetLatestData-->start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
        let _this = this;
        let time = undefined;

        if (!AppData.networkavailable && AppData.networkavailable == 2) {
            het.toast('获取最近的数据失败~');
            AppData.isLoadingLatestData = 0;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            //console.log("Store-->loading==> onGetLatestData-->networkavailable is 2|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            _this.trigger(AppData);
            return;
        }

        let url = '/v1/app/customization/desay/airDetector/getLatestData';
        let params = {
            "deviceId": AppData.deviceId,
        };
        let sucCallBack = (success) => {
            let successParse = JSON.parse(success);
            if (successParse.code == 0) {
                if (AppData.airlevel === undefined) {
                    AppData.pm25Value = successParse.data.pm25;
                    AppData.pm10Value = successParse.data.pm10;
                    AppData.formaldehydeValue = successParse.data.hcho;
                    AppData.tvocValue = successParse.data.tvoc;
                    AppData.co2Value = successParse.data.co2;
                    AppData.temperature = successParse.data.temp;
                    AppData.humidity = successParse.data.humidity;
                    AppData.airlevel = successParse.data.aqi;
                    AppData.createTime = transTimeFromUTC2Current(successParse.data.createTime);
                }
                AppData.isLoadingLatestData = 0;
                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
                //console.log("Store-->loading==> onGetLatestData-->sucCallBack code == 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
                if (time) clearTimeout(time);
                _this.trigger(AppData);
            } else {
                AppData.isLoadingLatestData = 0;
                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
                if (time) clearTimeout(time);
                _this.trigger(AppData);
                //console.log("Store-->loading==> onGetLatestData-->sucCallBack code != 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
                het.toast('请求异常');
            }
        };
        let errCallback = (fail) => {
            het.toast('获取最近的数据失败~');
            AppData.isLoadingLatestData = 0;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            //console.log("Store-->loading==> onGetLatestData-->errCallback|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            if (time) clearTimeout(time);
            _this.trigger(AppData);
        };
        if (AppData.deviceId == undefined) {
            AppData.isLoadingLatestData = 0;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            //console.log("Store-->loading==> onGetLatestData-->deviceId == undefined|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            if (time) clearTimeout(time);
            _this.trigger(AppData);
        } else if (AppData.airlevel == undefined) {
            het.get(url, params, sucCallBack, errCallback);
            AppData.isLoadingLatestData = 1;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            //console.log("Store-->loading==> onGetLatestData-->het.get start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            time = setTimeout(function () {
                AppData.isLoadingLatestData = 0;
                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
                //console.log("Store-->loading==> onGetLatestData-->setTimeout|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
                // het.toast('请求最新的数据超时~');
                if (AppData.loading === 2) het.toast('请求数据超时~');
                _this.trigger(AppData);
            }, 30 * 1000);
            _this.trigger(AppData);
        }
    },
    onGetWeather(){
        //console.log("Store-->loading==> onGetWeather-->start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
        let _this = this;

        if (!AppData.networkavailable && AppData.networkavailable == 2) {
            het.toast('获取城市空气信息失败');
            AppData.isLoadingGetWeather = 0;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            //console.log("Store-->loading==> onGetWeather-->networkavailable is 2|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            _this.trigger(AppData);
            return;
        }

        let cityName = AppData.cityName;
        let url = '/v1/web/env/weather/clife/now';
        let params = {
            "city": cityName,
        };
        let time = undefined;
        let sucCallBack = (success) => {
            let successParse = JSON.parse(success);
            if (successParse.code == 0) {
                AppData.aqiOuter = successParse.data.aqi;
                AppData.coOuter = successParse.data.co;
                AppData.no2Outer = successParse.data.no2;
                AppData.o3Outer = successParse.data.o3;
                AppData.pm10Outer = successParse.data.pm10;
                AppData.pm25Outer = successParse.data.pm25;
                AppData.so2Outer = successParse.data.so2;
                AppData.tempOuter = successParse.data.temp;
                AppData.updateTimeOuter = successParse.data.updateTime;
                AppData.qualityOuter = successParse.data.quality;
                AppData.isLoadingGetWeather = 0;
                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
                //console.log("Store-->loading==> onGetWeather-->sucCallBack code == 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
                if (time) clearTimeout(time);
                _this.trigger(AppData);
            } else {
                het.toast('请求异常');
                AppData.isLoadingGetWeather = 0;
                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
                //console.log("Store-->loading==> onGetWeather-->sucCallBack code != 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
                if (time) clearTimeout(time);
                _this.trigger(AppData);
            }
        };
        let errCallback = (fail) => {
            het.toast('获取城市空气信息失败');
            AppData.isLoadingGetWeather = 0;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            //console.log("Store-->loading==> onGetWeather-->errCallback|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            if (time) clearTimeout(time);
            _this.trigger(AppData);
        };
        if (AppData.cityName == undefined) {
            AppData.isLoadingGetWeather = 0;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            //console.log("Store-->loading==> onGetWeather-->cityName == undefined|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
            if (time) clearTimeout(time);
            _this.trigger(AppData);
        } else {
            het.get(url, params, sucCallBack, errCallback);
            AppData.isLoadingGetWeather = 1;
            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
            //console.log("Store-->loading==> onGetWeather-->het.get start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);

            time = setTimeout(function () {
                AppData.isLoadingGetWeather = 0;
                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
                //console.log("Store-->loading==> onGetWeather-->setTimeout|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
                // het.toast('请求天气数据超时~');
                if (AppData.loading === 2) het.toast('请求数据超时~');
                _this.trigger(AppData);
            }, 30 * 1000);
            _this.trigger(AppData);
        }
    },
    onShowTimeSelect(){
        AppData.showTimeSelectView = true;
        this.trigger(AppData);
    },
    onPowerDevice(powerData){//开关机
        // het.toast("onPowerDevice start");
        let _this = this;
        // console.log("set--> powerstatus : "+(AppData.powerstatus));
        // AppData.power = AppData.powerstatus == undefined || AppData.powerstatus == 2 ? 1 : 2;//
        powerData.updateFlag = het.hexUpFlag(0, 1, 2);
        het.send(powerData, (data) => {
            AppData.powerstatus = powerData.power == 1 ? 3 : 2;//直接修改运行数据, 渲染UI
            // console.log("set--> success powerstatus : "+(AppData.powerstatus));
            if (powerData.power == 2) {
                AppData.pm25high = 0;
                AppData.pm25low = 0;
                AppData.PM10high = 0;
                AppData.PM10low = 0;
                AppData.formaldehydehigh = 0;
                AppData.formaldehydelow = 0;
                AppData.TVOChigh = 0;
                AppData.TVOClow = 0;
                AppData.CO2high = 0;
                AppData.CO2low = 0;
                AppData.temperature = 0;
                AppData.humidity = 0;
                AppData.pm25Value = 0;
                AppData.pm10Value = 0;
                AppData.formaldehydeValue = 0;
                AppData.tvocValue = 0;
                AppData.co2Value = 0;
                setDataTimer('powerstatus','pm25high','pm25low','PM10high','PM10low',
                    'formaldehydehigh','formaldehydelow','TVOChigh','TVOClow','CO2high','CO2low','temperature','humidity');
            } else {
                setDataTimer('powerstatus');
            }

            _this.trigger(AppData);
        }, (AppData) => {
            het.toast("命令发送失败");
        });
    },
    onSwitchHistoryTab(where){
        if (where == AppData.currentHistoryTab) return;
        AppData.currentHistoryTab = where;
        this.trigger(AppData);
    },
    onRefreshCreateTime(createTime){
        AppData.createTime = createTime;
        AppData.online = 1;
        this.trigger(AppData);
    },
    onSubmitDialogButtonOne(){
        AppData.isShowDialogButtonOne = false;
        this.trigger(AppData);
    },
    onLocal(data){
        this.trigger(AppData);
    },
    onHintOffLineTip(){
        AppData.hasShowOffLineTip = true;
        this.trigger(AppData);
    }
});