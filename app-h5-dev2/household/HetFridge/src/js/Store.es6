'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {HexToFloat} from './HexToFloat.jsx';

let hexToFloat = new HexToFloat;


const appData = {
};
/*
 5.1.1.	“常规”模式：冷藏室、冷冻室设定温度可调。
 5.1.2.	“速冷”模式：冷藏室固定2度
 5.1.3.	“速冻”模式: 冷冻室固定按Tfs=-24℃控制
 5.1.4.	 “节能”模式：冷藏室设定温度按Trs=8℃运行，冷冻室设定温度按Tfs=-18℃运行。
 5.1.5.	“智能”模式：冷藏室设定温度按Trs=5℃运行，冷冻室设定温度按Tfs=-18℃运行。
 */
let modeArray = [
    {id:0,name:'空'},
    {id:1,name:'常规'},
    {id:2,name:'速冷',setTempStorage:'40000000'},//冷藏 2
    {id:3,name:'速冻',setTempcolorromm:'c1c00000'},//冷冻 -24
    {id:4,name:'智能',setTempStorage:'40a00000',setTempcolorromm:'c1900000'},//冷冻 -18 冷藏 5
    {id:5,name:'节能',setTempStorage:'41000000',setTempcolorromm:'c1900000'},//冷冻 -18 冷藏 8
];


const isFault = () => {
    if(appData.networkavailable == 2){
        return '请检查网络';
    }
    if(appData.online == 2){
        return '设备已离线';
    }
    return false;
};
// 数据过滤计时器setDataTimer('setstoreTemp','coolroomsettemp');
let dataFilterTimers = {
    setstoreTemp : 0,
    coolroomsettemp:0,
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
    onRepaint(datas, type){
        //console.log("onRepaint data====>"+JSON.stringify(data));
        let data = dataFilter(datas);
        appData.modeArray = modeArray;
//Html网络请求
        if(data.accessToken!=undefined) appData.accessToken = data.accessToken;
        if(data.appId!=undefined) appData.appId = data.appId;
        //if(data.deviceId!=undefined) appData.deviceId = data.deviceId;
        if(data.deviceId!=undefined){
            appData.deviceId = data.deviceId;
        }

//运行数据
        //冷藏室设置温度
        if(data.setstoreTemp!=undefined) appData.setstoreTemp = hexToFloat.toFloat(data.setstoreTemp);
        //冷藏室实际温度
        if(data.storageroomTemp!=undefined) appData.storageroomTemp = hexToFloat.toFloat(data.storageroomTemp);
        //冷冻室设置温度
        if(data.coolroomsettemp!=undefined) appData.coolroomsettemp = hexToFloat.toFloat(data.coolroomsettemp);
        //冷冻室实际温度
        if(data.coleroomtemp!=undefined) appData.coleroomtemp = hexToFloat.toFloat(data.coleroomtemp);
        //变温室设置温度
        if(data.changeroomsettemp!=undefined) appData.changeroomsettemp = hexToFloat.toFloat(data.changeroomsettemp);
        //变温室实际温度
        if(data.changroomtemp!=undefined) appData.changroomtemp = hexToFloat.toFloat(data.changroomtemp);
        //工作状态
        if(data.workStatus!=undefined) appData.workStatus = data.workStatus;
        //console.log("onRepaint data====>",appData);
        //累计通电时间
        if(data.TotalPowerTime!=undefined) appData.TotalPowerTime = data.TotalPowerTime;
        //累计耗电量parseInt(x,16)
        if(data.TotalPowerConsumption!=undefined) appData.TotalPowerConsumption = parseInt(parseInt(data.TotalPowerConsumption,16)*0.01);
        //console.log('累计耗电量',appData.TotalPowerConsumption);
        //实时功率
        if(data.supplyVoltage!=undefined&&data.WholeCurrent!=undefined){
            //console.log('电压和电流',data.supplyVoltage,data.WholeCurrent);
            appData.PowerCurrent = parseInt(data.supplyVoltage*data.WholeCurrent/1000);
            //console.log('功率',appData.PowerCurrent);
        }

//控制数据
        //冷藏室温度
        if(data.setTempStorage!=undefined) appData.setTempStorage = hexToFloat.toFloat(data.setTempStorage);
        //冷冻室
        if(data.setTempcolorromm!=undefined) appData.setTempcolorromm = hexToFloat.toFloat(data.setTempcolorromm);
        //变温室
        if(data.setchangroom!=undefined) appData.setchangroom = hexToFloat.toFloat(data.setchangroom);
        //工作模式 1正常 2速冷 3速冻 4智能  5节能
        if(data.workmode!=undefined) appData.workmode = data.workmode, appData.modeName = modeArray[data.workmode].name;;
        //童锁 1 无童锁，2 有童锁
        if(data.VChip!=undefined) appData.VChip = data.VChip;

//离线&故障
        if(data.online!=undefined)                             appData.online = data.online;  //1在线 2 离线
        if(data.networkavailable!=undefined)                   appData.networkavailable = data.networkavailable; //1可用 2不可用
        //传感器故障

        let errorArr = [];

        if(data.SensorFailureInRefrigeratedRoom!=undefined&&data.SensorFailureInRefrigeratedRoom!=0)    errorArr.push('SensorFailureInRefrigeratedRoom');
        if(data.RefrigeratorEvaporatorSensorFailure!=undefined&&data.RefrigeratorEvaporatorSensorFailure!=0)    errorArr.push('RefrigeratorEvaporatorSensorFailure');
        if(data.FreezingChamberSensorFailure!=undefined&&data.FreezingChamberSensorFailure!=0)    errorArr.push('FreezingChamberSensorFailure');
        if(data.RefrigerationRoomEvaporatorSensorFailure!=undefined&&data.RefrigerationRoomEvaporatorSensorFailure!=0)    errorArr.push('RefrigerationRoomEvaporatorSensorFailure');
        if(data.GreenhouseSensorFailure!=undefined&&data.GreenhouseSensorFailure!=0)    errorArr.push('GreenhouseSensorFailure');
        if(data.SensorFailureInGreenhouse!=undefined&&data.SensorFailureInGreenhouse!=0)    errorArr.push('SensorFailureInGreenhouse');
        if(data.PCBAenvironmentSensorFault!=undefined&&data.PCBAenvironmentSensorFault!=0)    errorArr.push('PCBAenvironmentSensorFault');
        if(data.DoorSwitchFailureSwitchHardwareFailure!=undefined&&data.DoorSwitchFailureSwitchHardwareFailure!=0)    errorArr.push('DoorSwitchFailureSwitchHardwareFailure');
        if(data.CoolDoorSwitchFailureSwitchHardwareFailure!=undefined&&data.CoolDoorSwitchFailureSwitchHardwareFailure!=0)    errorArr.push('CoolDoorSwitchFailureSwitchHardwareFailure');
        if(data.ChangDoorSwitchFailureSwitchHardwareFailure!=undefined&&data.ChangDoorSwitchFailureSwitchHardwareFailure!=0)    errorArr.push('ChangDoorSwitchFailureSwitchHardwareFailure');
        if(data.ACvoltageAbnormalFau!=undefined&&data.ACvoltageAbnormalFau!=0)    errorArr.push('ACvoltageAbnormalFau');
        if(data.CompressorFault!=undefined&&data.CompressorFault!=0)    errorArr.push('CompressorFault');
        if(data.FailureOfRefrigerant!=undefined&&data.FailureOfRefrigerant!=0)    errorArr.push('FailureOfRefrigerant');
        if(data.AgingLayerFault!=undefined&&data.AgingLayerFault!=0)    errorArr.push('AgingLayerFault');
        if(data.LeakageProtectionFault!=undefined&&data.LeakageProtectionFault!=0)    errorArr.push('LeakageProtectionFault');
        if(data.CompressorOverTemperatureFault!=undefined&&data.CompressorOverTemperatureFault!=0)    errorArr.push('CompressorOverTemperatureFault');
        if(data.RefrigeratorDoorIsNotClosedStrict!=undefined&&data.RefrigeratorDoorIsNotClosedStrict!=0)    errorArr.push('RefrigeratorDoorIsNotClosedStrict');
        if(data.FrozenDoorIsNotClosedStrict!=undefined&&data.FrozenDoorIsNotClosedStrict!=0)    errorArr.push('FrozenDoorIsNotClosedStrict');
        if(data.MCUFLASHReadWriteError!=undefined&&data.MCUFLASHReadWriteError!=0)    errorArr.push('MCUFLASHReadWriteError');
        if(data.WIFIFLASHReadWriteError!=undefined&&data.WIFIFLASHReadWriteError!=0)    errorArr.push('WIFIFLASHReadWriteError');
        if(data.WIFIandMCUCommunicationFault!=undefined&&data.WIFIandMCUCommunicationFault!=0)    errorArr.push('WIFIandMCUCommunicationFault');
        if(data.SensorFailureInRefrigeratedRoom!=undefined){
            appData.errorArr = errorArr;
        }
        //console.log('运行数据 冷冻设置温度:',appData.coolroomsettemp ,'运行数据 冷藏设置温度:',appData.setstoreTemp);
        //console.log('控制数据 冷冻设置温度:',appData.setTempcolorromm ,' 控制数据 冷藏设置温度:',appData.setTempStorage);
        this.trigger(appData);

    },
    onGetData(getUrl){
        if(!getUrl) return;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState==4 && xmlhttp.status==200){
                let res = JSON.parse(xmlhttp.responseText);
                if(res.code==0){
                    //数组
                    let stateData = res.data;
                    var myDate = new Date();
                    var currentYear = myDate.getFullYear();
                    //console.log('用电量告警 ',stateData);
                    for(var i=0;i<stateData.length;i++){
                        if(stateData[i].checkTime ==currentYear){

                            if(stateData[i].addRate>30&&stateData[i].addRate<50){
                                //用电量告警
                                console.log('用电量告警 ',stateData[i].addRate);
                                //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标30%', "tel":"400-777-2009"}));
                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标30%", "button":"我知道了"}');

                            }else if(stateData[i].addRate>50&&stateData[i].addRate<100) {
                                //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标50%', "tel":"400-777-2009"}));
                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标50%", "button":"我知道了"}');

                            }else if(stateData[i].addRate>100&&stateData[i].addRate<150) {
                                //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标100%', "tel":"400-777-2009"}))
                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标100%", "button":"我知道了"}');
                            }
                            else if(stateData[i].addRate>150){
                                //直接报废
                                //het.toast(JSON.stringify({"contactService":'设备故障 能耗超标200%', "tel":"400-777-2009"}))
                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标150% 建议更换整机 ", "button":"我知道了"}');
                            }
                        }
                    }
                    //console.log('state',stateData);
                    this.trigger(stateData);
                };
            }
        }.bind(this);
        xmlhttp.open("GET",getUrl,true);
        xmlhttp.send();
    },
    onLocal(data){
        this.trigger(appData);
    },
    //时间控件的取消
    onCancelSelect:function(data) {
        this.trigger({selectshow:false});
        //this.trigger({openSubscribeClock:false});
    },
    onSubmitSelect:function(data,type) {

        //console.log('onSubmitSelect------------',data);
        //0冷冻  1冷藏
        let updateFlag;
        if(type ==0){
            updateFlag= '000f0000';//het.hexUpFlag(5, 4, 4);
            let Tempcolorromm = data.setTempcolorromm;
            if(data.setTempcolorromm==-14){
                data.setTempcolorromm = '437F0000';
            }else{
                data.setTempcolorromm = hexToFloat.toHex(Tempcolorromm);
            }
            appData.coolroomsettemp = Tempcolorromm;


        }else if(type == 1){
            updateFlag='f0000000'; //het.hexUpFlag(4, 4, 4);
            let TempStorage = data.setTempStorage;
            if(data.setTempStorage==11){
                data.setTempStorage = '437F0000';
            }else{
                data.setTempStorage= hexToFloat.toHex(TempStorage);
            }
            appData.setstoreTemp = TempStorage;

        }
        data.updateFlag = updateFlag;
        setDataTimer('setstoreTemp','coolroomsettemp');
        het.send(data, function(data){},function(data){het.toast("命令发送失败");});

        this.trigger(appData);

    },
    onSelectMode:function(data){
        console.log('OnSelectMode',data.function);

        this.trigger({function:data.function});
    },
    onLaunchMode:function(data) {
        let selectMode = data.workmode;
        let updateFlag;
        switch(selectMode){
            case 1:
                //正常
                //updateFlag= '00000100';
                updateFlag= 'f00f0100';
                break;
            case 2:
                //速冷
                //updateFlag=  'f0000100'; //;het.hexUpFlag(4, 1, 4);
                updateFlag= 'f00f0100';
                data.setTempStorage=modeArray[selectMode].setTempStorage;
                appData.setstoreTemp = 2;
                break;
            case 3:
                //速冻
                data.setTempcolorromm=modeArray[selectMode].setTempcolorromm;
                //updateFlag= '000f0100';//het.hexUpFlag(4, 1, 4);
                updateFlag= 'f00f0100';
                appData.coolroomsettemp = -24;
                break;
            case 4:
                //智能
                data.setTempStorage=modeArray[selectMode].setTempStorage;
                data.setTempcolorromm=modeArray[selectMode].setTempcolorromm;
                updateFlag= 'f00f0100';//het.hexUpFlag(7, 1, 4,het.hexUpFlag(5, 4, 4,het.hexUpFlag(6, 4, 4)));
                appData.setstoreTemp = 5;
                appData.coolroomsettemp = -18;
                break;
            case 5:
                //节能
                data.setTempStorage=modeArray[selectMode].setTempStorage;
                data.setTempcolorromm=modeArray[selectMode].setTempcolorromm;
                console.log('data.setTempStorage ',data.setTempStorage);
                updateFlag= 'f00f0100';//het.hexUpFlag(7, 1, 4,het.hexUpFlag(5, 4, 4,het.hexUpFlag(6, 4, 4)));
                appData.setstoreTemp = 8;
                appData.coolroomsettemp = -18;
                break;
        }
        data.updateFlag = updateFlag;
        het.send(data, function(data){},function(data){het.toast("命令发送失败");});

        appData.workmode = data.workmode;
        setDataTimer('setstoreTemp','coolroomsettemp');
        this.trigger(appData);
    }
});