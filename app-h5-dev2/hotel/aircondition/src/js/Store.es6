'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

const deviceId = Funs.getUrlParam('deviceId');
const path = location.host === 'weixin.clife.cn' || location.host === '127.0.0.1' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
    location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
    '/clife-wechat/wechat/hotel'; // 正式环境
const source = 8; // 来源

/*const AppData = {
    temperature : 26,
    airMode : 0,
    windSpeed : 0,
    airPower : 0,
    windDirect : 1,
    sleepStatus : false,
    orderStatus : false,
    startTime : 0,
    shutTime : 0
};*/

const AppData = {
    updateFlag: 3,
    boxSwitch: 1,
    airKey: 0,
    airMode : 1,
    windSpeed : 1,
    windDirect : 3,
    airPower : 1,
    tmpAdd: 25,
    tmpMinus: 25,
    temperature: 25,
    windAutoDirect : 1
};

// 用于关机时渲染的数据
const shutdownUIData = {
    airMode : 0,
    windSpeed : 0,
    airPower : 1,
    windDirect : 3,
    windAutoDirect : 1,
    sleepStatus : false
};

// 空调模式
const airModes = {
    1 : {temperature: 25},
    2 : {},
    3 : {},
    4 : {},
    5 : {}
};

export const Store = Reflux.createStore({
    listenables: [Actions],
    onGetData(){
        let _this = this;
        let timestamp = +new Date();
        let data = JSON.parse(localStorage.getItem('AppData'));
        for (var k in AppData) {
            if (typeof data[k] != 'undefined') {
                AppData[k] = data[k];
            }
        }
        this.trigger(AppData);
        /*let url = `${path}/device/data/get?deviceId=${deviceId}`;
        het.get(url, {}, (data)=>{
            data = JSON.parse(data);
            // 测试数据
            // data = {code:0,data:{windSpeed:4, airMode:1, windDirect:2, temperature:27.7, sleepStatus: true, orderStatus: true, startTime: 1, shutTime: 0.5, airPower:0, onlineStatus:1}};
            if (data.data) {
                AppData.airPower = data.data.airPower; // 0-开， 1-关
                AppData.temperature = data.data.temperature;
                AppData.airMode = data.data.airMode;
                AppData.windSpeed = data.data.windSpeed;
                AppData.windDirect = data.data.windDirect;
                AppData.sleepStatus = data.data.sleepStatus;
                AppData.orderStatus = data.data.orderStatus;
                AppData.startTime = data.data.startTime;
                AppData.shutTime = data.data.shutTime;
                AppData.boxSwitch = data.data.boxSwitch;
                if (AppData.airPower==0) {
                    _this.trigger(Funs._extends({}, AppData, shutdownUIData));
                } else {
                    _this.trigger(AppData);
                }
            }
        });*/
    },
    onChangeSwitch() {
        AppData.airPower = AppData.airPower == 0 ? 1 : 0;
        let json = JSON.stringify({
            airPower: AppData.airPower,
            airKey: 49153,
            boxSwitch: AppData.boxSwitch,
            updateFlag: 3
        });
        localStorage.setItem('AppData', JSON.stringify(AppData));
        sendCode(json, (res)=>{
        });
        if (AppData.airPower==1) {
            this.trigger(shutdownUIData);
        } else {
            this.trigger(AppData);
        }
    },
    onChangeTemp(value) {
        let temp = (AppData.tmpAdd || AppData.tmpMinus) + value;
        let json;
        temp = temp < 15 ? 15 : temp;
        temp = temp > 30 ? 30 : temp;
        AppData.tmpAdd = AppData.tmpMinus = temp;
        if (value > 0) {
            json = JSON.stringify({
                tmpAdd: temp,
                airKey: 49163,
                boxSwitch: AppData.boxSwitch,
                updateFlag: 3
            });
        } else {
            json = JSON.stringify({
                tmpMinus: temp,
                airKey: 49165,
                boxSwitch: AppData.boxSwitch,
                updateFlag: 3
            });
        }
        AppData.temperature = temp;
        localStorage.setItem('AppData', JSON.stringify(AppData));
        sendCode(json, (res)=>{
        });
        this.trigger({temperature: temp});
    },
    onChangeMode(value) {
        AppData.airMode = value;
        AppData.temperature = airModes[value].temperature ? airModes[value].temperature : AppData.temperature;
        AppData.tmpAdd = AppData.tmpMinus = AppData.temperature;
        let json = JSON.stringify({
            airMode: value,
            airKey: 49155,
            boxSwitch: AppData.boxSwitch,
            updateFlag: 3
        });
        localStorage.setItem('AppData', JSON.stringify(AppData));
        sendCode(json, (res)=>{
        });
        this.trigger(Funs._extends({}, airModes[value], {airMode: value}));
    },
    onChangeSpeed() {
        AppData.windSpeed ++;
        AppData.windSpeed = AppData.windSpeed > 4 ? 1 : AppData.windSpeed;
        let windSpeed = AppData.windSpeed;
        let json = JSON.stringify({
            windSpeed: windSpeed,
            airKey: 49157,
            boxSwitch: AppData.boxSwitch,
            updateFlag: 3
        });
        localStorage.setItem('AppData', JSON.stringify(AppData));
        sendCode(json, (res)=>{
        });
        this.trigger({windSpeed: windSpeed});
    },
    onChangeWind() {
        AppData.windDirect ++;
        AppData.windDirect = AppData.windDirect > 3 ? 1 : AppData.windDirect;
        let windDirect = AppData.windDirect;
        let json = JSON.stringify({
            windDirect : windDirect,
            airKey : 49159,
            boxSwitch: AppData.boxSwitch,
            updateFlag: 3
        });
        localStorage.setItem('AppData', JSON.stringify(AppData));
        sendCode(json, (res)=>{
        });
        this.trigger({windDirect: windDirect});
    },
    onChangeAutoWind() {
        AppData.windAutoDirect = AppData.windAutoDirect == 1 ? 0 : 1;
        let windAutoDirect = AppData.windAutoDirect;
        let json = JSON.stringify({
            windAutoDirect: windAutoDirect,
            airKey: 49161,
            boxSwitch: AppData.boxSwitch,
            updateFlag: 3
        });
        localStorage.setItem('AppData', JSON.stringify(AppData));
        sendCode(json, (res)=>{
        });
        this.trigger({windAutoDirect: windAutoDirect});
    },
    onChangeSleep() {
        AppData.sleepStatus = AppData.sleepStatus ? false : true;
        let sleepStatus = AppData.sleepStatus;
        this.trigger({sleepStatus, sleepStatus});
    },
    onChangeOrder() {
        AppData.orderStatus = AppData.orderStatus ? false : true;
        let orderStatus = AppData.orderStatus;
        this.trigger({orderStatus: AppData.orderStatus});
    }
});

/**
 * 下发指令函数
 * @param    {json}     json  拼装的json
 * @param    {[type]}   sucCB 成功时的回调
 * @param    {[type]}   errCB 失败时的回调
 */
const sendCode = (json, sucCB, errCB) => {
    let url = `${path}/device/config/set`;
    // console.log('send', json);
    let data = {
        deviceId: deviceId,
        source: source,
        json: json
    };
    het.post(url, data, (res)=>{
        let d = JSON.parse(res);
        if (d.code===0) {
            console.log('操作成功');
        }
    });
};
