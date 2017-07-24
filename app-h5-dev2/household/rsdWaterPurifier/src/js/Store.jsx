'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.jsx';
const AppData = {
    online:1,
    networkavailable:1,
};
const isFault = () => {
    if(AppData.networkavailable==2){
        console.log('请检查网络,调试');
        return '请检查网络';
    }
    if(AppData.online==2){
        console.log('设备与APP已断开连接!,调试');
        return '设备与APP已断开连接!';
    }
    return false;
};
// 数据过滤计时器
let dataFilterTimers = {
    MachineOperationState : 0,
};
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
    onRepaint(datas){
        //协议定义为16进制，这里未作统一转换，在views里面使用时再做转换，但缓存给全局变量AppData,给回退按钮时不能触发repaint方法请求渲染数据使用
        //数据延时过滤准备
        let data = dataFilter(datas);
        //console.log('data',data);

        //设备id
        if(data.deviceId) AppData.deviceId = data.deviceId;
        //断网离线
        if(data.networkavailable) AppData.networkavailable=data.networkavailable;
        if(data.online) AppData.online=data.online;
        //设备故障 >>> 网络，离线，电磁阀K1状态，电磁阀K2状态，增压泵状态，NTC状态，流量计1状态，流量计2状态，机器工作状态，缺水或者流量计故障
        if(data.networkavailable) AppData.networkavailable=data.networkavailable;
        if(data.online) AppData.online=data.online;
        if(data.K1State) AppData.K1State=data.K1State;
        if(data.K2State) AppData.K2State=data.K2State;
        if(data.BoosterPumpState) AppData.BoosterPumpState=data.BoosterPumpState;
        if(data.NTCState) AppData.NTCState=data.NTCState;
        if(data.FlowMeter1State) AppData.FlowMeter1State=data.FlowMeter1State;
        if(data.FlowMeter2State) AppData.FlowMeter2State=data.FlowMeter2State;
        if(data.MachineOperationState) AppData.MachineOperationState=data.MachineOperationState;
        if(data.LackWater) AppData.LackWater=data.LackWater;

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
        this.trigger(AppData)
    },
    onSlide(data){
        this.trigger(data);
    },
    onWaterLines(type){
        if(isFault()){het.toast(isFault());return false};
        let me = this;

        //https://dp.clife.net 测试  https://test.cms.clife.cn 预发布  https://cms.clife.cn  正式
        let domain = (window.location.host =='cms.clife.cn') ? ('https://cms.clife.cn') : (window.location.host=='test.cms.clife.cn'?'https://test.cms.clife.cn':'https://dp.clife.net');
        //真实环境 相对路径即可
        let url = '/v1/app/customization/waterPurifier/stat/getStatRunData' || domain+'/v1/app/customization/waterPurifier/stat/getStatRunData';
        let params = {
            "deviceId": AppData.deviceId,//此处不能写死，以后必改)
            "type": (parseInt(type)+1)
        };
        let sucCallBack=(success)=>{
            let successParse = JSON.parse(success);
            let successStringify= JSON.stringify(success);
            if(successParse.code==0){
                me.trigger({
                    type:type,
                    codes:successParse.code,
                    renderWaterline: 1,//是否渲染开关，1开2关，方便调试打印，其实应该为true/fasle
                    waterlines:successParse.data
                });
            }else{
                het.toast('请求异常');
            }
        };
        let errCallback=(fail)=>{
            het.toast('请求失败~');
        };
        het.post(url, params, sucCallBack, errCallback);
        //本地调试环境
        //let urls =
        //    'http://200.200.200.50/v1/app/customization/waterPurifier/stat/getStatRunData?accessToken=' +
        //    'fec8722d1df64caf94c63253a975c358' +
        //    '&appId=10120&appType=1&deviceId=E10A5226860FDC0517F00CDBEC20759B&timestamp='+ new Date().getTime()+
        //    '&type='+(parseInt(type)+1);
        //$.ajax({
        //    async: true,
        //    type: 'POST',okk
        //    url:urls,
        //    dataType: 'json',
        //    success: function(xhr){
        //        //het.toast('请求成功'+xhr.code);
        //        if(xhr.code==0){
        //            //console.log('post请求到的数据',xhr.msg);
        //            let data =JSON.stringify(xhr.data);
        //            me.trigger({
        //                type:type,
        //                renderWaterline: 1,
        //                waterlines: xhr.data,
        //            })
        //        }else{
        //            het.toast(xhr.code)
        //        }
        //    },
        //    error: function (xhr) {
        //        het.toast('请求失败错误码'+xhr.code)
        //    }
        //});
    },
    onWashDevice(data){
        if(isFault()){het.toast(isFault());return false};
        let me= this;
        me.trigger(data);
        setDataTimer('MachineOperationState');
        data.updateFlag = het.hexUpFlag(10, 1, 6);
        //console.log('data',data)
        het.send(data, function(data){
            //het.toast("发送成功")
        },function(data){
            het.toast("命令发送失败");
        });

        console.log('冲洗',data);
    },
    onResetFilter(data){
        if(isFault()){het.toast(isFault());return false};
        let idx = data.updateFlagIdx;
        data.updateFlag = het.hexUpFlag(idx, 1, 6);
        delete data.updateFlagIdx;
        //console.log('data',data)
        het.send(data, function(data){
        },function(data){
            het.toast("命令发送失败");
        });
        this.trigger(data);
    },
});
























