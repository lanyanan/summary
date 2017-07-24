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

// 数据过滤计时器
let dataFilterTimers = {
    switchStatus : 0,
    sceneMode : 0,
    lightness : 0,
    colorTemp : 0
};
let lightTimer=0; // 亮度计时器，防止操作过频繁
let colorTimer=0; // 色温计时器，防止操作过频繁

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

export const Store = Reflux.createStore({
    listenables: [Actions],
    onGetData(){
        let _this = this;
        let timestamp = +new Date();
        let url = `${path}/device/data/get?deviceId=${deviceId}`;
        het.get(url, {}, (res)=>{
            let json = JSON.parse(res);
            let data = json.data;
            if (json.code == 103005001) { // 未授权，跳转授权页面
                location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
            }
            if (data) {
                data.tips = '';
                data.tipsShow = false;
                if (data.onlineStatus && data.onlineStatus!=0) {
                    data.tips = '设备不在线';
                    data.tipsShow = true;
                }
                _this.trigger(dataFilter(data));
            } else if (json.msg) {
                _this.trigger({tips: json.msg, tipsShow: true});
            }
        });
    },
    onChangeSwitch(value){
        let url = `${path}/device/config/set`;
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                switchStatus: value,
                updateFlag: Math.pow(2, 0)
            })
        };
        setDataTimer('switchStatus');
        this.trigger({switchStatus:value});
        het.post(url, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('调节开关成功');
            }
        });
    },
    onChangeMode(value){
        let modes = { // 预设模式
            1 : {
                colorTemp:0, lightness:10, sceneMode:1,
                updateFlag: 26
            },
            2 : {
                colorTemp:2, lightness:8, sceneMode:2,
                updateFlag: Math.pow(2, 1) | Math.pow(2, 3) | Math.pow(2, 4)
            },
            3 : {
                colorTemp:1, lightness:2, sceneMode:3,
                updateFlag: Math.pow(2, 1) | Math.pow(2, 3) | Math.pow(2, 4)
            }
        };
        let url = `${path}/device/config/set`;
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify(modes[value])
        };
        setDataTimer('colorTemp', 'lightness', 'sceneMode');
        this.trigger(modes[value]);
        het.post(url, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                console.log('调节模式成功');
            }
        });
    },
    onChangeLight(value){
        let url = `${path}/device/config/set`;
        clearTimeout(lightTimer);
        lightTimer = setTimeout(()=>{
            let data = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    lightness: value,
                    updateFlag: Math.pow(2, 4)
                })
            };
            het.post(url, data, (res)=>{
                let d = JSON.parse(res);
                if (d.code===0) {
                    console.log('调节亮度成功');
                }
            });
        }, 600);
        setDataTimer('lightness');
        this.trigger({lightness:value});
    },
    onChangeColor(value){
        let url = `${path}/device/config/set`;
        clearTimeout(colorTimer);
        colorTimer = setTimeout(()=>{
            let data = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    colorTemp: value,
                    updateFlag: Math.pow(2, 3)
                })
            };
            het.post(url, data, (res)=>{
                let d = JSON.parse(res);
                if (d.code===0) {
                    console.log('调节色温成功');
                }
            });
        }, 600);
        setDataTimer('colorTemp');
        this.trigger({colorTemp:value});
    }
});