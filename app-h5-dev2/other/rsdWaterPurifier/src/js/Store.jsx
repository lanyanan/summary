'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.jsx';


const AppData = {
    online:1,
    networkavailable:1
};

const isFault = () => {
    if(AppData.networkavailable==2){
        return '请检查网络';
    }
    if(AppData.online==2){
        return '设备与APP已断开连接!';
    }
    return false;
};

// 数据过滤计时器
const dataFilterTimers = {
    MachineOperationState : 0,
};

const domain = 'https://test.api.clife.cn';
const postCtrlUrl = domain + '/v1/device/config/set'; // 下发设备控制数据接口 -- 临时定义
const getRunUrl = domain + '/v1/device/data/get'; // 获取设备运行数据接口 -- 临时定义
const getWaterDataUrl = domain + '/v1/app/customization/waterPurifier/stat/getStatRunData';
const getFaultPath = domain + '/v1/device/data/getErrorData';
const deviceId = het.getDeviceId();

/**
 * json 转化为Querystring
 */
const jsonToQueryString = (json) => {
    return Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' +
            (json[key] != undefined ? encodeURIComponent(json[key]) : '');
    }).join('&');
}


// 返回过滤后的数据
function dataFilter(data) {
    let time = (new Date).getTime();
    let result = {};
    for (let k in data) {
        if (typeof dataFilterTimers[k] !== 'undefined' ) {
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
    onRepaint(datas){
        let data = dataFilter(datas);
        //console.log('data',data);
        //设备id
        if(data.deviceId) AppData.deviceId = data.deviceId;
        //断网离线
        if(data.networkavailable) AppData.networkavailable=data.networkavailable;
        if(data.online) AppData.online=data.online;
        //回退数据重渲缓存
        if(data.MachineOperationState) AppData.MachineOperationState = data.MachineOperationState;
        if(data.PureWaterTdsValue) AppData.PureWaterTdsValue = data.PureWaterTdsValue;
        if(data.SourceWaterTdsValue) AppData.SourceWaterTdsValue = data.SourceWaterTdsValue;
        if(data.PP1ClearControl) AppData.PP1ClearControl = data.PP1ClearControl;
        if(data.PP2ClearControl) AppData.PP2ClearControl = data.PP2ClearControl;
        if(data.CO1ClearControl) AppData.CO1ClearControl = data.CO1ClearControl;
        if(data.CO2ClearControl) AppData.CO2ClearControl = data.CO2ClearControl;
        if(data.ROClearControl) AppData.ROClearControl = data.ROClearControl;
        if(data.PP1Life) AppData.PP1Life = data.PP1Life;
        if(data.CO1Life) AppData.CO1Life = data.CO1Life;
        if(data.PP2Life) AppData.PP2Life = data.PP2Life;
        if(data.ROLife)  AppData.ROLife =  data.ROLife;
        if(data.PP2Life) AppData.PP2Life = data.PP2Life;
        if(data.CO2Life) AppData.CO2Life = data.CO2Life;
        if(data.PP1LifeRemain) AppData.PP1LifeRemain = data.PP1LifeRemain;
        if(data.CO1LifeRemain) AppData.CO1LifeRemain = data.CO1LifeRemain;
        if(data.ROLifeRemain)  AppData.ROLifeRemain  =  data.ROLifeRemain;
        if(data.PP2LifeRemain) AppData.PP2LifeRemain = data.PP2LifeRemain;
        if(data.CO2LifeRemain) AppData.CO2LifeRemain = data.CO2LifeRemain;

        data.renderWaterline =2;
        this.trigger(data);
    },
    onBack(){
        this.trigger(AppData);
    },
    onSlide(data){
        this.trigger(data);
    },
    onWaterLines(type) {
        if (isFault()) {
            het.toast(isFault());
            return false
        };
        let me = this;
        let sucCallBack = (successParse) => {
            if (successParse.code == 0) {
                me.trigger({
                    type: type,
                    codes: successParse.code,
                    renderWaterline: 1, //是否渲染开关，1开2关，方便调试打印，其实应该为true/fasle
                    waterlines: successParse.data
                });
            }
        };

        const fnGetParams = (token) => {
            return {
                "accessToken": token,
                "deviceId": deviceId,
                "type": (parseInt(type) + 1),
                "appId": '30590',
                "timestamp": + new Date()
            }
        }
        het.getToken(function(token) {
            const params = fnGetParams(token);
            $.ajax({
                'type': 'POST',
                'url': getWaterDataUrl,
                'data': params,
                'dataType': 'json',
                'success': function(response) {
                    response.code === 0 && sucCallBack(response)
                },
                'error': function(xhr, type) {
                    het.toast('请求失败~');
                }
            })
        }, function() {
            het.toast('请求失败~');
        });

    },
    onWashDevice(data) {
        if (isFault()) {
            het.toast(isFault());
            return false
        };
        let me = this;
        me.trigger(data);
        setDataTimer('MachineOperationState');
        data.updateFlag = het.hexUpFlag(10, 1, 6);
        this.onPostData(data);
    },
    onResetFilter(data) {
        if (isFault()) {
            het.toast(isFault());
            return false
        };
        let idx = data.updateFlagIdx;
        data.updateFlag = het.hexUpFlag(idx, 1, 6);
        delete data.updateFlagIdx;
        this.onPostData(data);
        this.trigger(data);
    },
    onIntervalData() {
        const _this = this;
        het.get(getRunUrl, '', function(response) {
            const result = JSON.parse(response);
            result.code === 0 && _this.onRepaint(result.data);
        });
    },
    onPostData(appData) {
        het.post(postCtrlUrl, appData, function(response) {
            const result = JSON.parse(response);
            if(result.code === 0) {
                het.toast('命令发送成功', '1');
            }
            else {
                het.toast(result.msg);
            }
        });
    },
    onGetFaultData() {
        var _this = this;
        const fnGetParams = (token) => {
            return {
                "accessToken": token,
                "deviceId": deviceId,
                "appId": '30590',
                "timestamp": + new Date()
            }
        };
        het.getToken(function(token) {
            const params = fnGetParams(token);
            $.ajax({
                type: 'GET',
                url: getFaultPath,
                data: params,
                dataType: 'json',
                success: function(response) {
                    if (response.code === 0) {
                        if (response.data.K1State == '01') {
                            _this.trigger({showTips: true, tipsMsg: 'K1电池阀故障'});
                        }
                        if (response.data.K2State == '01') {
                            _this.trigger({showTips: true, tipsMsg: 'K2电池阀故障'});
                        }
                        if (response.data.BoosterPumpState == '01') {
                            _this.trigger({showTips: true, tipsMsg: '增压泵故障'});
                        }

                        if (response.data.NTCState == '01') {
                            _this.trigger({showTips: true, tipsMsg: 'NTC故障'});
                        }
                        if (response.data.FlowMeter1State == '01') {
                            _this.trigger({showTips: true, tipsMsg: '流量计1故障'});
                        }
                        if (response.data.FlowMeter2State == '01') {
                            _this.trigger({showTips: true, tipsMsg: '流量计2故障'});
                        }
                        if (response.data.MakeWaterOverTime == '01') {
                            _this.trigger({showTips: true, tipsMsg: '制水超时故障'});
                        }
                        if (response.data.LackWater == '01') {
                            _this.trigger({showTips: true, tipsMsg: '缺水故障'});
                        }
                    }
                }
            })
        });
    }
});
