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
    'networkavailable': 1,
    'online': 1,
};
const isOffline = () => {
    return (AppData.online == 2);
};

//判断手机是否断网
const isNetOff = () => {
    return (AppData.networkavailable == 2);
};

// 数据过滤计时器
let dataFilterTimers = {
    MachineOperationState: 0,
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
        console.log("onRepaint data====>" + JSON.stringify(data));
        //console.log('data',data);
        //产品id
        if (!!data.productId) AppData.productId = data.productId;
        //设备id
        if (!!data.deviceId) AppData.deviceId = data.deviceId;
        //断网离线
        if (!!data.online) {
            AppData.online = data.online;
        }
        if (!!data.networkavailable) {
            AppData.networkavailable = data.networkavailable;
        }

        //回退数据重渲缓存
        if (data.DeviceSwitch != undefined) {
            AppData.DeviceSwitch = data.DeviceSwitch;
        }   //开关设置
        if (data.StoveSwitch != undefined) AppData.StoveSwitch = data.StoveSwitch;  //炉灯开关设置
        if (data.FunctionSelect != undefined) AppData.FunctionSelect = data.FunctionSelect;  //功能选择
        if (data.WorkTempSetHight8b != undefined) AppData.WorkTempSetHight8b = data.WorkTempSetHight8b;  //工作温度设置（高位）
        if (data.WorkTempSetLow8b != undefined) AppData.WorkTempSetLow8b = data.WorkTempSetLow8b;   //工作温度设置（低位）
        if (data.WorkTimeSetHour != undefined) AppData.WorkTimeSetHour = data.WorkTimeSetHour;   //工作时间设置(小时)：
        if (data.WorkTimeSetMinute != undefined) AppData.WorkTimeSetMinute = data.WorkTimeSetMinute;   //工作时间设置(分钟)

        //运行数据字段
        if (data.HadSetTotalTimeHour != undefined) AppData.HadSetTotalTimeHour = data.HadSetTotalTimeHour;
        if (data.HadSetTotalTimeMinute != undefined) AppData.HadSetTotalTimeMinute = data.HadSetTotalTimeMinute;
        if (data.CurrentTimeRemainHour != undefined) AppData.CurrentTimeRemainHour = data.CurrentTimeRemainHour;
        if (data.CurrentTimeRemainMinute != undefined) AppData.CurrentTimeRemainMinute = data.CurrentTimeRemainMinute;
        if (data.HadSetTempHight8b != undefined) AppData.HadSetTempHight8b = data.HadSetTempHight8b;
        if (data.HadSetTempLow8b != undefined) AppData.HadSetTempLow8b = data.HadSetTempLow8b;
        if (data.CurrentTempHight8b != undefined) AppData.CurrentTempHight8b = data.CurrentTempHight8b;
        if (data.CurrentTempLow8b != undefined) AppData.CurrentTempLow8b = data.CurrentTempLow8b;
        if (data.WaterBoxStatus != undefined) AppData.WaterBoxStatus = data.WaterBoxStatus;
        if (data.StoveStatus != undefined) AppData.StoveStatus = data.StoveStatus;
        if (data.CurrentWorkMode != undefined) AppData.CurrentWorkMode = data.CurrentWorkMode;
        if (data.SysStatus != undefined && (parseInt(data.SysStatus) < 3 || parseInt(data.SysStatus) == 5)) {  //(0-无操作，1-关机，2-待机，3-运行)   (0-关机，1-待机，2-运行)
            if (parseInt(data.SysStatus) == 5) {
                if (parseInt(data.CurrentWorkMode) != 0) {
                    AppData.DeviceSwitch = 3;
                    data.DeviceSwitch = 3;
                } else {
                    AppData.DeviceSwitch = 2;
                    data.DeviceSwitch = 2;
                }
            } else {
                AppData.DeviceSwitch = parseInt(data.SysStatus + 1);
                data.DeviceSwitch = parseInt(data.SysStatus + 1);
            }
            AppData.SysStatus = data.SysStatus;
        }
        if (data.CookBookTotalSteps != undefined) AppData.CookBookTotalSteps = data.CookBookTotalSteps;
        if (data.CookBookCurStep != undefined) AppData.CookBookCurStep = data.CookBookCurStep;
        if (data.CookBookCurTempH8b != undefined) AppData.CookBookCurTempH8b = data.CookBookCurTempH8b;
        if (data.CookBookCurTempL8b != undefined) AppData.CookBookCurTempL8b = data.CookBookCurTempL8b;
        if (data.CookBookCurTimeRemainHour != undefined) AppData.CookBookCurTimeRemainHour = data.CookBookCurTimeRemainHour;
        if (data.CookBookCurTimeRemainMin != undefined) AppData.CookBookCurTimeRemainMin = data.CookBookCurTimeRemainMin;
        if (data.CookBookCurIsPause != undefined) AppData.CookBookCurIsPause = data.CookBookCurIsPause;
        if (data.CookBookHight8b != undefined) AppData.CookBookHight8b = data.CookBookHight8b;
        if (data.CookBookLow8b != undefined) AppData.CookBookLow8b = data.CookBookLow8b;

        //故障数据字段
        if (data.ErrorStatus != undefined) {
            AppData.ErrorStatus = data.ErrorStatus;//传感器错误
        }
        console.log("onRepaint AppData====>" + JSON.stringify(AppData));
        this.trigger(data);
    },
    onGetData(){
        console.log("AppData=" + JSON.stringify(AppData));
        this.trigger(AppData);
    },
    onOnOff(value){//处理开机事件 (0-无操作，1-关机，2-待机，3-运行)
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备不在线');
            return;
        }
        AppData.DeviceSwitch = value;
        AppData.StoveSwitch = 0;
        AppData.FunctionSelect = 0;
        AppData.StoveStatus = 0;
        AppData.workStatus = 0;
        AppData.updateFlag = het.hexUpFlag(0, 1, 4);
        het.send({DeviceSwitch: AppData.DeviceSwitch, updateFlag: AppData.updateFlag}, (data) => {
            AppData.SysStatus = parseInt(value - 1);
            setDataTimer('SysStatus');
            console.log('成功');
            this.trigger(AppData);
        }, (data) => {
            het.toast("命令发送失败");
        });
    },
    onSwicthMode(mode){//直接启动的模式
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备不在线');
            return;
        }
        let defTime = parseInt(stateModel.getAll()[parseInt(mode - 1)].defTime);  //设置时间 如果没有选默认
        let defTemp = parseInt(stateModel.getAll()[parseInt(mode - 1)].defTemp);  //设置温度 如果没有选默认


        AppData.DeviceSwitch = 3;
        AppData.FunctionSelect = mode;
        AppData.WorkTempSetHight8b = 0;
        AppData.WorkTempSetLow8b = defTemp;
        AppData.WorkTimeSetHour = parseInt(defTime / 60);
        AppData.WorkTimeSetMinute = parseInt(defTime % 60);
        AppData.updateFlag = het.hexUpFlag(0, 1, 4, het.hexUpFlag(2, 5, 4));
        het.send(AppData, (data) => {
            console.log('成功');
            AppData.CurrentWorkMode = AppData.FunctionSelect;
            AppData.SysStatus = 2;
            setDataTimer('CurrentWorkMode', 'SysStatus');
        }, (data) => {
            het.toast("命令发送失败");
        });
        this.trigger({
            DeviceSwitch: AppData.DeviceSwitch,
            FunctionSelect: AppData.FunctionSelect,
            selectModel: 0,
            CurrentWorkMode: AppData.FunctionSelect
        });
    },
    onSwicthStove(stoveSwitch){
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备不在线');
            return;
        }
        AppData.StoveSwitch = stoveSwitch;
        AppData.updateFlag = het.hexUpFlag(1, 1, 4);
        het.send(AppData, (data) => {
            console.log('成功');
            AppData.StoveStatus = (stoveSwitch - 1);
            setDataTimer('StoveStatus');
            this.trigger({StoveSwitch: AppData.StoveSwitch, StoveStatus: AppData.StoveStatus});
        }, (data) => {
            het.toast("命令发送失败");
        });
    },
    onCancel(){
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备不在线');
            return;
        }
        AppData.DeviceSwitch = 2;
        AppData.FunctionSelect = 0;
        AppData.updateFlag = het.hexUpFlag(0, 1, 4, het.hexUpFlag(2, 1, 4));

        het.send(AppData, (data) => {//取消之后手动恢复所有运行工作状态
            AppData.HadSetTotalTimeHour = 0;
            AppData.HadSetTotalTimeMinute = 0;
            AppData.CurrentTimeRemainHour = 0;
            AppData.CurrentTimeRemainMinute = 0;
            AppData.HadSetTempHight8b = 0;
            AppData.HadSetTempLow8b = 0;
            AppData.CurrentTempHight8b = 0;
            AppData.CurrentTempLow8b = 0;
            AppData.CurrentWorkMode = 0;

            AppData.WorkTempSetHight8b = 0;
            AppData.WorkTempSetLow8b = 0;
            AppData.WorkTimeSetHour = 0;
            AppData.WorkTimeSetMinute = 0;

            AppData.CookBookTotalSteps = 0;
            AppData.CookBookCurStep = 0;
            AppData.CookBookCurTempH8b = 0;
            AppData.CookBookCurTempL8b = 0;
            AppData.CookBookCurTimeRemainHour = 0;
            AppData.CookBookCurTimeRemainMin = 0;
            AppData.CookBookCurIsPause = 0;
            AppData.CookBookHight8b = 0;
            AppData.CookBookLow8b = 0;

            AppData.SysStatus = 1;
            setDataTimer('HadSetTotalTimeHour', 'HadSetTotalTimeMinute', 'HadSetTempHight8b', 'HadSetTempLow8b', 'CurrentWorkMode', 'SysStatus');
            this.trigger(AppData);
        }, (data) => {
            het.toast("命令发送失败");
        });
    },
    onChangeTampTime(setTemp, setTime){
        let _this = this;
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备不在线');
            return;
        }

        AppData.WorkTempSetHight8b = 0;
        AppData.WorkTempSetLow8b = setTemp;
        AppData.WorkTimeSetHour = parseInt(setTime / 60);
        AppData.WorkTimeSetMinute = parseInt(setTime % 60);
        AppData.updateFlag = het.hexUpFlag(3, 4, 4);
        console.log('send mode', AppData);
        het.send(AppData, function (data) {
            console.log('onstart succee');
            AppData.HadSetTotalTimeHour = AppData.WorkTimeSetHour;
            AppData.HadSetTotalTimeMinute = AppData.WorkTimeSetMinute;
            AppData.CurrentTimeRemainHour = AppData.WorkTimeSetHour;
            AppData.CurrentTimeRemainMinute = AppData.WorkTimeSetMinute;
            AppData.HadSetTempHight8b = 0;
            AppData.HadSetTempLow8b = AppData.WorkTempSetLow8b;
            AppData.CurrentTempHight8b = 0;
            AppData.CurrentTempLow8b = AppData.WorkTempSetLow8b;

            setDataTimer('HadSetTotalTimeHour', 'HadSetTotalTimeMinute', 'HadSetTempHight8b', 'HadSetTempLow8b');
            _this.trigger(AppData);
        }, function (data) {
            het.toast("命令发送失败");
        });
    },
    onModeStart(mode, setTemp, setTime){
        let _this = this;
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备不在线');
            return;
        }

        AppData.DeviceSwitch = 3;
        AppData.FunctionSelect = mode;
        AppData.WorkTempSetHight8b = 0;
        AppData.WorkTempSetLow8b = setTemp;
        AppData.WorkTimeSetHour = parseInt(setTime / 60);
        AppData.WorkTimeSetMinute = parseInt(setTime % 60);
        AppData.updateFlag = het.hexUpFlag(0, 1, 4, het.hexUpFlag(2, 5, 4));
        console.log('send mode', AppData);
        het.send(AppData, function (data) {
            console.log('onstart succee');
            AppData.HadSetTotalTimeHour = AppData.WorkTimeSetHour;
            AppData.HadSetTotalTimeMinute = AppData.WorkTimeSetMinute;
            AppData.CurrentTimeRemainHour = AppData.WorkTimeSetHour;
            AppData.CurrentTimeRemainMinute = AppData.WorkTimeSetMinute;
            AppData.HadSetTempHight8b = 0;
            AppData.HadSetTempLow8b = AppData.WorkTempSetLow8b;
            AppData.CurrentTempHight8b = 0;
            AppData.CurrentTempLow8b = AppData.WorkTempSetLow8b;
            AppData.CurrentWorkMode = AppData.FunctionSelect;

            AppData.SysStatus = 2;
            setDataTimer('HadSetTotalTimeHour', 'HadSetTotalTimeMinute', 'HadSetTempHight8b', 'HadSetTempLow8b', 'CurrentWorkMode', 'SysStatus');
            _this.trigger(AppData);
            history.back();
        }, function (data) {
            het.toast("命令发送失败");
        });
    },

    onMenuMode(zfff){
        let _this = this;
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备不在线');
            return;
        }

        AppData.DeviceSwitch = 2;
        AppData.FunctionSelect = 9;
        AppData.updateFlag = het.hexUpFlag(0, 1, 4, het.hexUpFlag(2, 1, 4));
        console.log('send mode', AppData);
        het.send(AppData, function (data) {
            console.log('send mode succee');
            AppData.CurrentWorkMode = AppData.FunctionSelect;
            AppData.SysStatus = 1;
            setDataTimer('CurrentWorkMode', 'SysStatus');
            zfff();
            _this.trigger(AppData);
        }, function (data) {
            het.toast("命令发送失败");
        });
    },

    onNextStep(cookBookPauseStart){
        let _this = this;
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备不在线');
            return;
        }

        AppData.CookBookPauseStart = cookBookPauseStart;
        AppData.updateFlag = het.hexUpFlag(7, 1, 4);
        console.log('Next Step', AppData);
        het.send(AppData, function (data) {
            console.log('Next Step succee');
            AppData.CookBookCurIsPause = 0;
            _this.trigger(AppData);
        }, function (data) {
            het.toast("命令发送失败");
        });
    },

    onGetMenuList(pageIndex){
        let cfg = {
            pageIndex: pageIndex || 1,
            productId: AppData.productId
        };
        let _this = this;
        let url = '/v1/app/customization/cookbook/menu/menuList';
        het.get(url, cfg, (data) => {
            _this.trigger({response: data});
        }, (data) => {
            console.log('fail sendData');
            het.toast('请求失败，请稍后重试');
        });
    },
});