'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

import {CmdItem} from './CmdItem.jsx';
import {ErrItem} from './ErrItem.jsx';

const AppData = {
    'networkavailable':1,
    'online':1
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

function isoutData(data){
    return (data != undefined && parseInt(data) >=0 && parseInt(data) <= 100 );
}

function isErr(data){
    return  (data != undefined  && parseInt(data) == 1);
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas, type){//区分运行数据肯控制数据
        let data = dataFilter(datas);
        //console.log("onRepaint data====>"+JSON.stringify(data));
        //设备id
        if(!!data.deviceId) AppData.deviceId = data.deviceId;
        //断网离线
        if(!!data.online) {AppData.online = data.online;}
        if(!!data.networkavailable) {parseInt(data.networkavailable) == 2 ? het.toast('当前网络不可用，请检查你的网络'):'';
            AppData.networkavailable = data.networkavailable;}
        //运行数据
        if(data.MachineOperationState != undefined) AppData.MachineOperationState = data.MachineOperationState;//设备运行状态
        // 原水数据
        if(data.SourceWaterTds != undefined) AppData.SourceWaterTds = data.SourceWaterTds;//原水TDS值
        if(data.SourceWaterTotal != undefined) AppData.SourceWaterTotal = data.SourceWaterTotal;//源水总量
        if(data.SourceWaterTemprature != undefined) AppData.SourceWaterTemprature = data.SourceWaterTemprature;//源水水温
        if(data.SourceSpectrumTOC != undefined) AppData.SourceSpectrumTOC = data.SourceSpectrumTOC;//光谱源水TOC
        if(data.SourceSpectrumCOD != undefined) AppData.SourceSpectrumCOD = data.SourceSpectrumCOD;//光谱源水COD
        if(data.SourceSpectrumColor != undefined) AppData.SourceSpectrumColor = data.SourceSpectrumColor;//光谱源水色度
        if(data.SourceSpectrumTurbidity != undefined) AppData.SourceSpectrumTurbidity = data.SourceSpectrumTurbidity;//光谱源水浊度
        if(data.SourceSpectrumTemprature != undefined) AppData.SourceSpectrumTemprature = data.SourceSpectrumTemprature;//光谱源水温度
        // 纯水数据
        if(data.PureWaterTds != undefined) AppData.PureWaterTds = data.PureWaterTds;//纯水TDS值
        if(data.PureWaterTotal != undefined) AppData.PureWaterTotal = data.PureWaterTotal;//纯水总量
        if(data.PureSpectrumTOC != undefined) AppData.PureSpectrumTOC = data.PureSpectrumTOC;//光谱纯水TOC
        if(data.PureSpectrumCOD != undefined) AppData.PureSpectrumCOD = data.PureSpectrumCOD;//光谱纯水COD
        if(data.PureSpectrumColor != undefined) AppData.PureSpectrumColor = data.PureSpectrumColor;//光谱纯水色度
        if(data.PureSpectrumTurbidity != undefined) AppData.PureSpectrumTurbidity = data.PureSpectrumTurbidity;//光谱纯水浊度
        if(data.PureSpectrumTemprature != undefined) AppData.PureSpectrumTemprature = data.PureSpectrumTemprature;//光谱纯水温度
        //控制数据

        //滤芯
        let FilterItems = [];
        if(isoutData(data.UFFilterLife))FilterItems.push(new CmdItem(1,"中空纤维超滤膜滤芯","UF",data.UFFilterLife,10));
        if(isoutData(data.ROFilterLife)) FilterItems.push(new CmdItem(2,"反渗透膜滤芯","RO",data.ROFilterLife,10));
        if(isoutData(data.KLJXYKHXTFilterLife)) FilterItems.push(new CmdItem(3,"颗粒精洗椰壳活性炭滤芯","KLJXYKHXT",data.KLJXYKHXTFilterLife,10));
        if(isoutData(data.CTOFilterLife))FilterItems.push(new CmdItem(4,"块状烧结活性炭滤芯","CTO",data.CTOFilterLife,10));
        if(isoutData(data.PPFilterLife))FilterItems.push(new CmdItem(5,"PP棉滤芯","PP",data.PPFilterLife,10));
        if(isoutData(data.KDFFilterLife))FilterItems.push(new CmdItem(6,"KDF滤芯","KDF",data.KDFFilterLife,10));
        if(isoutData(data.MFSFilterLife))FilterItems.push(new CmdItem(7,"麦饭石滤芯","MFS",data.MFSFilterLife,10));
        if(isoutData(data.TCFilterLife)) FilterItems.push(new CmdItem(8,"陶瓷滤芯","TC",data.TCFilterLife,10));
        if(isoutData(data.YHWKHSFilterLife))FilterItems.push(new CmdItem(9,"远红外矿化球滤芯","YHWKHS",data.YHWKHSFilterLife,10));
        if(isoutData(data.HZHXTFilterLife))FilterItems.push(new CmdItem(10,"后置活性炭","HZHXT",data.HZHXTFilterLife,10));
        if(isoutData(data.FLZNLQFilterLife))FilterItems.push(new CmdItem(11,"负离子能量球滤芯","FLZNLQ",data.FLZNLQFilterLife,10));
        if(isoutData(data.RHFilterLife))FilterItems.push(new CmdItem(12,"软化滤芯","RH",data.RHFilterLife,10));
        if(isoutData(data.CHFilterLife))FilterItems.push(new CmdItem(13,"磁化滤芯","CH",data.CHFilterLife,10));
        if(isoutData(data.GLJFilterLife))FilterItems.push(new CmdItem(14,"硅磷精滤芯","GLJ",data.GLJFilterLife,10));
        if(isoutData(data.SYSFilterLife))FilterItems.push(new CmdItem(15,"石英砂滤芯","SYS",data.SYSFilterLife,10));
        if(isoutData(data.MSFilterLife)) FilterItems.push(new CmdItem(16,"锰沙滤芯","MS",data.MSFilterLife,10));
        if(data.UFFilterLife) AppData.FilterLists = FilterItems;

        //故障数据
        let ErrItems = [];
        if(isErr(data.RTCLowVoltage))  ErrItems.push(new ErrItem(1,"RTC电池低压"));
        if(isErr(data.FlowMeter1Fault))  ErrItems.push(new ErrItem(2,"流量计1异常"));
        if(isErr(data.FlowMeter2Fault))  ErrItems.push(new ErrItem(3,"流量计2异常"));
        if(isErr(data.LowWaterPressureFault))  ErrItems.push(new ErrItem(4,"低水压异常"));
        if(isErr(data.ForgetCloseWaterFault))  ErrItems.push(new ErrItem(5,"忘记关水"));
        if(isErr(data.HighPressureSwitchFault))  ErrItems.push(new ErrItem(6,"高压开关故障"));
        if(isErr(data.MachineLeakWaterFault))  ErrItems.push(new ErrItem(7,"机器漏水故障"));
        if(isErr(data.TapLeakWaterFault))  ErrItems.push(new ErrItem(8,"逆止阀漏水或水龙头漏水"));
        if(isErr(data.SolenoidValve1Fault))  ErrItems.push(new ErrItem(9,"电磁阀K1故障"));
        if(isErr(data.SolenoidValve2Fault))  ErrItems.push(new ErrItem(10,"电磁阀K2故障"));
        if(isErr(data.SolenoidValve3Fault))  ErrItems.push(new ErrItem(11,"电磁阀K3故障"));
        if(isErr(data.SolenoidValve4Fault))  ErrItems.push(new ErrItem(12,"电磁阀K4故障"));
        if(isErr(data.SolenoidValve5Fault))  ErrItems.push(new ErrItem(13,"电磁阀K5故障"));
        if(isErr(data.BoosterPumpFault))  ErrItems.push(new ErrItem(14,"增压泵故障"));
        if(isErr(data.MCUStorageFault))  ErrItems.push(new ErrItem(15,"MCU读写EEPROM或FLASH错误"));
        if(isErr(data.WifiStorageFault))  ErrItems.push(new ErrItem(16,"Wifi读写EEPROM或FLASH错误"));
        if(isErr(data.WifiMcuComFault))  ErrItems.push(new ErrItem(17,"WIFI与MCU通讯故障"));
        if(data.RTCLowVoltage != undefined) AppData.Errs = ErrItems;
        this.trigger(AppData);
    },
    onGetData(){
        //console.log("AppData="+JSON.stringify(AppData));
        this.trigger(AppData);
    },
    onSendRst(cmdRest){
        //console.log("cmdRest sendCmd="+JSON.stringify(cmdRest.sendCmd));
        het.send(cmdRest.sendCmd, (data)=>{
            //console.log('成功');
            het.toast('滤芯复位成功');
        },(data)=>{
            het.toast("命令发送失败");
        });
    },
    onGetWaterStat(){
        let url = '/v1/app/clife/hetWater/getWaterStat';
        let params = {
            "deviceId":AppData.deviceId,
            "statType": '1',
            "fields": 'SourceWaterTds,PureWaterTds,SourceWaterTotal,PureWaterTotal,CleanWaterTotal'
        };
        let sucCallBack=(success)=>{
            let successParse = JSON.parse(success);
            //console.log('data =' + JSON.stringify(successParse.data));
            if(successParse.code==0){
                this.trigger({
                    showLoad:1,
                    waterlines:successParse.data
                });
            }else{
                this.trigger({
                    showLoad:2
                });
                het.toast('请求异常');
            }
        };
        let errCallback=(fail)=>{
            this.trigger({
                showLoad:2
            });
            het.toast('请求失败~');
        };
        if(AppData.deviceId == undefined){
            this.trigger({
                showLoad:3,
            });
        }else {
            het.get(url, params, sucCallBack, errCallback);
        }
    }
});