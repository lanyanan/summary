'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

const deviceId = Funs.getUrlParam('deviceId');
const path = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
    location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
    '/clife-wechat/wechat/hotel'; // 正式环境
const source = 8; // 来源
const postUrl = `${path}/device/config/set`;
const AppData = {
    light: 3,
    mist: 2,
    level:1
};
const isShutdown = ()=> AppData.light==3 && AppData.mist==2;
// 数据过滤计时器
let dataFilterTimers = {
    color : 0,
    light : 0,
    mist : 0,
    timerPresetTime : 0
};

// 返回过滤后的数据
function dataFilter(data) {
    // console.log("dataFilterTimers===========",dataFilterTimers);
    let time = (new Date).getTime();
    let result = {};
    for (let k in data) {
        // console.log("####",data);
        if (typeof dataFilterTimers[k] !== 'undefined') {
            if (dataFilterTimers[k] < time) {
                dataFilterTimers[k] = 0;
                result[k] = data[k];
                // console.log('$$$$$',result[k] );
            }
        } else {
            result[k] = data[k];
        }
    }
     // console.log('123',result);
    return result;
}

// 设置过滤器过期时间
function setDataTimer(...keys) {
    // console.log("dataFilterTimers",dataFilterTimers,keys);
    let time = (new Date).getTime() + 20e3; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onGetData(type){
        let _this = this;
        let timestamp = +new Date();
        let url = `${path}/device/data/get?deviceId=${deviceId}`;
        het.get(url, {}, (data)=>{
            data = JSON.parse(data);
            if (data.code == 103005001) { // 未授权，跳转授权页面
                location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
            }
             // console.log("1",data);
            if (data) {
                data.tips = '';
                data.tipsShow = false;
                if (data.code==100022006 && data.msg) {
                    data.tips = '设备不在线';
                    data.tipsShow = true;
                }
                _this.trigger(dataFilter(data));
            } else if (data.msg) {
                _this.trigger({tips: data.msg, tipsShow: true});
            }


            if (data.data) {
            
                // console.log("@@@@@2222",data.data);
                data.data = dataFilter(data.data);
                 // console.log("@@@@@",data.data);
                if(data.data.remainingTime !== undefined && data.data.remainingTime !== null) data.data.timeValue = data.data.remainingTime;
                AppData.light = data.data.light;
                AppData.level = data.data.level;
                AppData.mist = data.data.mist;
                if(data.data.mist==2)  data.data.mist=3;
                if(data.data.mist==1&&data.data.level==2) data.data.mist=2;
                _this.trigger(data.data);
                if(!_this.getClock){
                    _this.getClock = setInterval(function(){
                        _this.onGetData();
                    },6000);
                }


                if(data.data.light==3&&data.data.mist==3&&type=='open'){
                    AppData.light = 1;
                    AppData.mist = 1;
                    let data = {
                        deviceId: deviceId,
                        source: source,
                        json: JSON.stringify({
                            level:1,
                            light: 1,
                            mist: 1,
                            updateFlag: 7
                        })
                    };
                    het.post(postUrl, data, (res)=>{
                        let d = JSON.parse(res);
                        if (d.code===0) {
                            setDataTimer('light', 'mist');
                            _this.trigger({light:1,mist:1});
                            console.log('调节开关成功');
                        }
                    });
                }
            }
        });
    },
    onChangeSwitch(){
      

        if(this.getClock) clearInterval(this.getClock);
        if (isShutdown()) { // 关机

            // AppData.light = 1;
            // AppData.mist = 1;
            // AppData.level = 1;
            // let _this = this;
            // _this.getClock = setInterval(function(){
            //     _this.onGetData();
            // },6000);
            // this.onGetData('open');
            // return;
            AppData.light = 1;
            AppData.mist = 1;
            let data = {
                deviceId: deviceId,
                source: source,
                json: JSON.stringify({
                    level:1,
                    light: 1,
                    mist: 1,
                    updateFlag: 7
                })
            };
            setDataTimer('light', 'mist');
            this.trigger({light:1,mist:1});
            let _this = this;
            _this.getClock = setInterval(function(){
                _this.onGetData();
            },6000);
            het.post(postUrl, data, (res)=>{
                let d = JSON.parse(res);
                if (d.code===0) {
                    console.log('调节开关成功');
                }
            });
            return;
        } else {
            AppData.light = 3;
            AppData.mist = 2;
        }
        let mist;
        if(AppData.mist==1&&AppData.level==1) mist=1;
        if(AppData.mist==1&&AppData.level==2) mist=2;
        if(AppData.mist==2)  mist=3;
        setDataTimer('light', 'mist');
        this.trigger({light:AppData.light,mist:mist});
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                level:1,
                light: AppData.light,
                mist: AppData.mist,
                updateFlag: isShutdown()? 7:3
            })
        };
        let _this = this;
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                _this.getClock = setInterval(function(){
                    _this.onGetData();
                },6000);
                console.log('调节开关成功');
            }
        });
    },
    onChangeLight(value){
    	if(isShutdown()) return;
        if(this.getClock) clearInterval(this.getClock);
        setDataTimer('light');
        this.trigger({
            light: parseInt(value)
        });
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                light: parseInt(value),
                updateFlag: 0x02
            })
        };
        AppData.light = parseInt(value);
        let _this = this;
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                _this.getClock = setInterval(function(){
                    _this.onGetData();
                },6000);
                console.log('调节亮度成功');
            }
        });

    },
    onChangeMist(value){
    	if(isShutdown()) return;
        if(this.getClock) clearInterval(this.getClock);
        setDataTimer('mist');
    	this.trigger({
            mist: parseInt(value)
        });
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                level:parseInt(value)==1?1:2,
                mist: parseInt(value)==3?2:1,
                updateFlag: parseInt(value)==3?1:5
            })
        };
        AppData.mist = parseInt(value)==3?2:1;
        let _this = this;
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            console.log("res",d);
            if (d.code===0) {
                _this.getClock = setInterval(function(){
                    _this.onGetData();
                },6000);
                console.log('调节喷雾成功');
            }
            //加湿器下发命令失败，应刷回原有的状态
            if(d.code===100022800){
                _this.onGetData();
            }

        });
    },
    onChangeColor(value){   
        if(isShutdown()) return;
        if(this.getClock) clearInterval(this.getClock);
        setDataTimer('color');
        this.trigger({
            color: parseInt(value)
        });
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                color: parseInt(value),
                updateFlag: 8
            })
        };
        let _this = this;
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                _this.getClock = setInterval(function(){
                    _this.onGetData();
                },6000);
                console.log('调节颜色成功');
            }
        });
    },
    onChangeTime(value){
        console.log(value);
    	if(isShutdown()) return;
        if(this.getClock) clearInterval(this.getClock);
        setDataTimer('timerPresetTime','remainingTime');
    	this.trigger({
            timeValue: parseInt(value)
        });
        let data = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify({
                timerPresetTime: parseInt(value),
                updateFlag: 16
            })
        };
        let _this = this;
        het.post(postUrl, data, (res)=>{
            let d = JSON.parse(res);
            if (d.code===0) {
                _this.getClock = setInterval(function(){
                    _this.onGetData();
                },6000);
                console.log('调节时间成功');
            }
        });
    },
});