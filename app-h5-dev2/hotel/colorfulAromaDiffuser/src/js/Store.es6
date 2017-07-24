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
const postUrl = `${path}/device/config/set`;

const AppData = {
    light: 0,
    mist: 3
};

const isShutdown = ()=> AppData.light==0 && AppData.mist==3;

// 数据过滤计时器
let dataFilterTimers = {
    colorR : 0,
    colorG : 0,
    colorB : 0,
    light : 0,
    mist : 0,
    timeCloseH : 0,
    timeCloseM : 0
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
    let time = (new Date).getTime() + 20e3; // 20秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}

function getRGBColorIndex(r='', g='', b='') {
    let colors = ['#ff7b7c', '#ffffff', '#fcaa6b', '#fcda6f', '#a0e674', '#59bdef', '--'];
    let color = '#' + pad0(r.toString(16)) + pad0(g.toString(16)) + pad0(b.toString(16));
    function pad0(hex) {
        return hex.replace(/^\b(?=.$)/, '0');
    }
    return (colors.indexOf(color) || 0) + 1;
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onGetData(){
        let _this = this;
        let timestamp = +new Date();
        let url = `${path}/device/data/get?deviceId=${deviceId}`;
        het.get(url, {}, (res)=>{
            // res = '{"code":0,"data":{"cumulativeWorkTimes1":2,"downFlag":255,"version":1,"colorG":189,"presetStartupTimeM":0,"_bindUserId":19166,"remainingTimeM":0,"cumulativeTime4":2,"colorR":89,"presetShutdownTimeLeftH":0,"cumulativeTime1":2,"light":100,"remainingTimeH":0,"cumulativeWorkTimes2":1,"cumulativeTime2":1,"cumulativeWorkTimes3":72,"cumulativeTime3":72,"workMode":0,"outputLoad1":255,"outputLoad2":255,"colorB":239,"presetStartupTimeH":0,"presetShutdownTimeLeftM":0,"presetShutdownTimeH":0,"color":255,"presetStartupTimeLeftH":0,"warningStatus2":0,"presetShutdownTimeM":0,"presetStartupTimeLeftM":0,"setTimeM":0,"workStatus":2,"setTimeH":0,"mist":1,"warningStatus1":0}}';
            let json = JSON.parse(res);
            let data = json.data;
            if (json.code == 103005001) { // 未授权，跳转授权页面
                location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
            }
            if (data) {
                data.tips = '';
                data.tipsShow = false;
                if (data.warningStatus1 && data.warningStatus1==1) {
                    data.tips = '设备已经因缺水暂停，注意加水不能超过最高刻度线';
                    data.tipsShow = true;
                }
                if (data.onlineStatus && data.onlineStatus!=1) {
                    data.tips = '设备不在线';
                    data.tipsShow = true;
                }
                data.timeCloseH = data.remainingTimeH;
                data.timeCloseM = data.remainingTimeM;
                let fData = dataFilter(data);
                if (fData.colorR && fData.colorG && fData.colorB) { // 处理颜色指针跳变问题
                    fData.colorIndex = getRGBColorIndex(fData.colorR, fData.colorG, fData.colorB);
                }
                _this.trigger(fData);
            } else if (json.msg) {
                _this.trigger({tips: json.msg, tipsShow: true});
            }
        });
    },
    onChangeSwitch(){
        if (isShutdown()) { // 关机
            AppData.light = 100;
            AppData.mist = 1;
        } else {
            AppData.light = 0;
            AppData.mist = 3;
        }
        setDataTimer('light', 'mist');
        this.trigger(AppData);
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                light: AppData.light,
                mist: AppData.mist,
                updateFlag: 0x01 | 0x02
            })
        };
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('调节开关成功');
            } else {
                dataFilterTimers['light'] = 0;
                dataFilterTimers['mist'] = 0;
            }
        });
    },
    onChangeColor(color, index){
        setDataTimer('colorR', 'colorG', 'colorB');
        this.trigger({
            colorR: color.r,
            colorG: color.g,
            colorB: color.b,
            colorIndex: index
        });
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                colorR: color.r,
                colorG: color.g,
                colorB: color.b,
                updateFlag: 0x08
            })
        };
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('调节颜色成功');
            } else {
                // dataFilterTimers['colorR'] = 0;
                // dataFilterTimers['colorG'] = 0;
                // dataFilterTimers['colorB'] = 0;
            }
        });
    },
    onChangeLight(value){
        AppData.light = parseInt(value);
        this.trigger({light: AppData.light});
        clearTimeout(lightTimer);
        lightTimer = setTimeout(()=>{
            let data = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    light: AppData.light,
                    updateFlag: 0x02
                })
            };
            setDataTimer('light');
            het.post(postUrl, data, (res)=>{
                let d = JSON.parse(res);
                if (d.code===0) {
                    console.log('调节亮度成功');
                } else {
                    dataFilterTimers['light'] = 0;
                }
            });
        }, 600);
    },
    onChangeMist(value){
        AppData.mist = parseInt(value);
        this.trigger({
            mist: AppData.mist,
            mistSelectShow: false
        });
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                mist: AppData.mist,
                updateFlag: 0x01
            })
        };
        setDataTimer('mist');
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('调节喷雾成功');
            } else {
                dataFilterTimers['mist'] = 0;
            }
        });
    },
    onChangeClock(value){
        let minutes = parseInt(value, 10);
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;
        let obJson = {};
        /*if (isShutdown()) {
            this.trigger({
                presetStartupTime : m
            });
            obJson.presetStartupTime = m;
            obJson.updateFlag = 0x20;
        } else {*/
            this.trigger({
                timeCloseH : h,
                timeCloseM : m
            });
            obJson.timeCloseH = h;
            obJson.timeCloseM = m;
            obJson.updateFlag = 0x10;
        // }
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify(obJson)
        };
        setDataTimer('timeCloseH', 'timeCloseM');
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('调节时间成功');
            } else {
                dataFilterTimers['timeCloseH'] = 0;
                dataFilterTimers['timeCloseM'] = 0;
            }
        });
    }
});