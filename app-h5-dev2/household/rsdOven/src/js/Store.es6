'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {StateModel} from './StateModel.jsx';

let stateModel = new StateModel;
const AppData = {
    'networkavailable':1,
    'online':1
}
const isOffline = ()=>{
    return (AppData.online==2);
}

//判断手机是否断网
const isNetOff = ()=>{
    return (AppData.networkavailable==2);
};
const decToHex = (dec)=> {
    let hex = parseInt(dec).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
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

        let data = dataFilter(datas);
        console.log("onRepaint data====>"+JSON.stringify(data));
        //console.log('data',data);
        //设备id
        if(!!data.deviceId) AppData.deviceId = data.deviceId;
        //断网离线
        if(!!data.online) {AppData.online = data.online;if(data.online == 2){data.loading = 2; AppData.loading = 2}}
        if(!!data.networkavailable) {AppData.networkavailable = data.networkavailable;if(data.networkavailable == 2){data.loading = 2; AppData.loading = 2}}

        //回退数据重渲缓存
        if(data.cOnoff != undefined) {AppData.cOnoff = data.cOnoff ;data.loading = 2;AppData.loading = 2};
        if(data.cBookingTimeSetHour != undefined) AppData.cBookingTimeSetHour = data.cBookingTimeSetHour;
        if(data.cBookTimeSetMin != undefined) AppData.cBookTimeSetMin = data.cBookTimeSetMin;
        if(data.cStoveMode != undefined) AppData.cStoveMode = data.cStoveMode;
        if(data.cWorkTimeHour != undefined) AppData.cWorkTimeHour = data.cWorkTimeHour;
        if(data.cWorkTimeMin != undefined) AppData.cWorkTimeMin = data.cWorkTimeMin;
        if(data.cHotWindSw != undefined) AppData.cHotWindSw = data.cHotWindSw;
        if(data.cCancle != undefined) AppData.cCancle = data.cCancle;
        if(data.cWorkSet != undefined) AppData.cWorkSet = data.cWorkSet;
        if(data.cConfirm != undefined)  AppData.cConfirm =  data.cConfirm;
        if(data.updateFlag != undefined) AppData.updateFlag = data.updateFlag;
        //运行字段
        if(data.onoff != undefined) {
            AppData.online = 1; data.online = 1;
            data.loading = 2; AppData.loading = 2;//有数据过来就直接认为是在线的
            AppData.cOnoff = data.onoff ;data.cOnoff = data.onoff; AppData.onoff = data.onoff;data.loading = 2;AppData.loading = 2};
        if(data.workStatus != undefined) AppData.workStatus = data.workStatus;
        if(data.HotWindStatus != undefined) {AppData.HotWindStatus = data.HotWindStatus;
            AppData.cHotWindSw = data.HotWindStatus;
            data.cHotWindSw = data.HotWindStatus;
        };
        if(data.SetTemp != undefined) AppData.SetTemp = data.SetTemp;
        if(data.curTemp != undefined) AppData.curTemp = data.curTemp;
        if(data.SetTempHigh != undefined)  AppData.SetTempHigh  =  data.SetTempHigh;
        if(data.setTempLow != undefined) AppData.setTempLow = data.setTempLow;
        if(data.curTempHigh != undefined) AppData.curTempHigh = data.curTempHigh;
        if(data.curTempLow != undefined) AppData.curTempLow = data.curTempLow;
        if(data.setTimeHour != undefined) AppData.setTimeHour = data.setTimeHour;
        if(data.setTimeMin != undefined) AppData.setTimeMin = data.setTimeMin;
        if(data.leftTimeHour != undefined) AppData.leftTimeHour = data.leftTimeHour;
        if(data.leftTimeMin != undefined) AppData.leftTimeMin = data.leftTimeMin;
        if(data.setBookingTimeHour != undefined) AppData.setBookingTimeHour = data.setBookingTimeHour;
        if(data.setBookingtimeMin != undefined) AppData.setBookingtimeMin = data.setBookingtimeMin;
        if(data.leftbookingTimeHour != undefined) AppData.leftbookingTimeHour = data.leftbookingTimeHour;
        if(data.leftBookingtimeMin != undefined) AppData.leftBookingtimeMin = data.leftBookingtimeMin;
        //错误字节字段
        if(data.senseError != undefined){
            AppData.senseError = data.senseError;//传感器错误
        }

        console.log("onRepaint AppData====>"+JSON.stringify(AppData));
        this.trigger(data);
    },
    onGetData(){
        console.log("AppData="+JSON.stringify(AppData));
        this.trigger(AppData);
    },
    onCOnoff(value){//处理开机事件 (1-关机，2-开机)
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        AppData.cStoveMode= "00";
        AppData.workStatus = 0;
        AppData.cHotWindSw = "00";
        AppData.HotWindStatus = "00";
        AppData.cOnoff = "0" + value;
        AppData.updateFlag =  het.hexUpFlag(0,1,2);
        het.send({cOnoff: AppData.cOnoff,updateFlag:AppData.updateFlag}, (data)=>{
            console.log('成功');
            AppData.onoff = "0" + value;
            this.trigger(AppData);//这里直接显示uI 点击终止烘焙状态/预约模式，下发关机命令
        },(data)=>{
            het.toast("命令发送失败");
        });
    },
    onSwicthMode(mode){//直接启动的模式
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        let defTime = parseInt(stateModel.getAll()[parseInt(mode + 8)].defTime) ;
        let defTemp = parseInt(stateModel.getAll()[parseInt(mode + 8)].defTemp) ;
        let setTemp = parseInt(defTemp);//设置温度 如果没有选默认
        let setTime = parseInt(defTime);//设置时间 如果没有选默认
        AppData.cStoveMode = '0' + mode;
        AppData.cWorkSet = setTemp
        AppData.cWorkTimeHour = "00";
        AppData.cWorkTimeMin = setTime;;
        AppData.updateFlag =  het.hexUpFlag(2,1,2,het.hexUpFlag(5,2,2,het.hexUpFlag(8,2,2)));
        AppData.cOnoff = 2;
        AppData.updateFlag =  het.hexUpFlag(0,1,2,AppData.updateFlag);
        het.send({cWorkSet:AppData.cWorkSet,cWorkTimeHour:AppData.cWorkTimeHour,cWorkTimeMin:AppData.cWorkTimeMin,cOnoff:AppData.cOnoff ,cStoveMode: AppData.cStoveMode,updateFlag:AppData.updateFlag}, (data)=>{
            console.log('成功');
            AppData.workStatus = AppData.cStoveMode;
            AppData.onoff = AppData.cOnoff;
        },(data)=>{
            het.toast("命令发送失败");
        });
        this.trigger({cOnoff:AppData.cOnoff,onoff:AppData.onoff,cStoveMode: AppData.cStoveMode,selectModel:0,'workStatus':mode});
    },
    onSwicthModefun(mode){//直接启动的模式
        AppData.cStoveMode = '0' + mode;
        AppData.cConfirm = "01";
        AppData.updateFlag =  het.hexUpFlag(2,1,2,het.hexUpFlag(.11,1,2));
        het.send(AppData, (data)=>{
            console.log('成功');
            AppData.workStatus = AppData.cStoveMode;
        },(data)=>{
            het.toast("命令发送失败");
        });
        this.trigger({cStoveMode: AppData.cStoveMode,'workStatus':mode});
    },
    onSwicthHotWind(cHotWindSw){
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        AppData.cHotWindSw = "0" + cHotWindSw;
        AppData.updateFlag =  het.hexUpFlag(9,1,2);
        het.send({cHotWindSw: AppData.cHotWindSw,updateFlag:AppData.updateFlag}, (data)=>{
            console.log('成功');
            AppData.HotWindStatus = "0" + cHotWindSw;
            this.trigger({'cHotWindSw': AppData.cHotWindSw,'HotWindStatus':AppData.cHotWindSw});
        },(data)=>{
            het.toast("命令发送失败");
        });


    },
    onSelectRateTemp(value) {
        AppData.TempcWorkSet = value;
        this.trigger({TempcWorkSet:value});
    },
    onSelectRateTime(value) {
        AppData.Timehour = parseInt(value)/60;
        AppData.Timemin =  parseInt(value)%60;
        AppData.TempcWorkTime = value;
        this.trigger({Timehour:AppData.Timehour,Timemin:AppData.Timemin,TempcWorkTime:value});
    },
    onSelectTime(hour,minute){
        this.trigger({hour:hour,minute:minute,selectshow:false});
    },
    onCancelElm(){
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        AppData.cCancle = "01";
        AppData.cStoveMode = "00";
        AppData.updateFlag =  het.hexUpFlag(2,1,2,het.hexUpFlag(10,1,2));

        het.send(AppData, (data)=>{//取消之后手动恢复所有运行工作状态
            AppData.setTimeHour = 0;
            AppData.setTimeMin = 0;
            AppData.HotWindStatus = 1;
            AppData.workStatus = 0;
            AppData.onoff = 2;
            AppData.setBookingTimeHour = 0;
            AppData.setBookingtimeMin = 0;
            this.trigger(AppData);
        },(data)=>{
            het.toast("命令发送失败");
        });
    },
    onModeStart(setTimeHour,setTimeMin,SetTemp,WorkModeSelect,setBookingTimeHour,setBookingtimeMin){
        let _this = this;
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        if (setBookingTimeHour != 0 || setBookingtimeMin !=0) {//预约  开始
            //AppData.cBookTimeSetMin= minute>59?(minute-60):minute;
            //AppData.cBookingTimeSetHour = (minute>59?hour+1:hour)%24 ;
            if(parseInt(setBookingTimeHour) == 24 && parseInt(setBookingtimeMin) != 0){
                het.toast("预约时长不能大于24个小时,请重新选择预约时长！");
                return ;
            }
            AppData.cBookingTimeSetHour = setBookingTimeHour ;
            AppData.cBookTimeSetMin= setBookingtimeMin;
            AppData.updateFlag =  het.hexUpFlag(3,1,2,het.hexUpFlag(4,1,2));
        }else{
            AppData.cBookingTimeSetHour = '00';
            AppData.cBookTimeSetMin = '00';
            AppData.updateFlag =  het.hexUpFlag(3,1,2,het.hexUpFlag(4,1,2));
        }

        AppData.cStoveMode = "00";
        AppData.cConfirm = "00";
        let date = new Date();
        if(WorkModeSelect >8){
            AppData.cStoveMode = "0" + (parseInt(WorkModeSelect) - 8);//直接开始
            AppData.updateFlag =  het.hexUpFlag(2,1,2,AppData.updateFlag);
        }else {
            AppData.cStoveMode =  "0" + (parseInt(WorkModeSelect) + 4);//需要确认开始开始
            AppData.cConfirm = '01';
            AppData.updateFlag =  het.hexUpFlag(2,1,2,het.hexUpFlag(11,1,2,AppData.updateFlag));
        }
        AppData.cOnoff = 2;
        AppData.updateFlag =  het.hexUpFlag(0,1,2,AppData.updateFlag);
        if(setTimeHour != 0 || setTimeMin != 0)  {
            AppData.cWorkTimeHour = setTimeHour;
            AppData.cWorkTimeMin = setTimeMin;
            AppData.updateFlag =  het.hexUpFlag(7,1,2,het.hexUpFlag(8,1,2,AppData.updateFlag));
        }
        if(SetTemp != 0){
            AppData.cWorkSet = SetTemp;
            AppData.updateFlag =  het.hexUpFlag(5,2,2,AppData.updateFlag);
        }
        console.log('send mode', AppData);
        het.send(AppData, function(data){
            console.log('onstart succee');
            AppData.setBookingTimeHour = AppData.cBookingTimeSetHour;
            AppData.setBookingtimeMin = AppData.cBookTimeSetMin;
            AppData.leftbookingTimeHour = AppData.setBookingTimeHour;
            AppData.leftBookingtimeMin = AppData.setBookingtimeMin;

            AppData.setTimeHour = AppData.cWorkTimeHour;
            AppData.setTimeMin = AppData.cWorkTimeMin;
            AppData.leftTimeHour = AppData.setTimeHour;
            AppData.leftTimeMin = AppData.setTimeMin;
            if(parseInt(WorkModeSelect) >8){
                AppData.workStatus = parseInt(WorkModeSelect) - 8;//直接开始
            }else {
                AppData.workStatus = parseInt(WorkModeSelect) + 4;//直接开始
            }
            AppData.onoff = AppData.cOnoff;
            _this.trigger({
                'cOnoff':  AppData.cOnoff,
                'onoff':  AppData.onoff,
                'workStatus':AppData.workStatus,
                'cStoveMode':AppData.cStoveMode,
                'cConfirm':AppData.cConfirm,
                'SetTemp':AppData.cWorkSet,
                'cWorkSet':AppData.cWorkSet,
                'setBookingTimeHour':AppData.setBookingTimeHour,
                'setBookingtimeMin':AppData.setBookingtimeMin,
                'cBookingTimeSetHour':AppData.cBookingTimeSetHour,
                'cBookTimeSetMin':AppData.cBookTimeSetMin,
                'setTimeHour':AppData.setTimeHour,
                'setTimeMin':AppData.setTimeMin,
                'leftTimeHour':AppData.leftTimeHour,
                'leftTimeMin':AppData.leftTimeMin,
                'cWorkTimeHour':AppData.cWorkTimeHour,
                'cWorkTimeMin':AppData.cWorkTimeMin
            });
            history.back();
        },function(data){
            het.toast("命令发送失败");
        });
    }
});