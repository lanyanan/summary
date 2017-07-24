'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

const AppData = {
    'networkavailable': 1,
    'online': 1
};
const isOffline = () => {
    return (AppData.online == 2);
};

//判断手机是否断网
const isNetOff = () => {
    return (AppData.networkavailable == 2);
};
const decToHex = (dec) => {
    let hex = parseInt(dec).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
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
    let time = (new Date).getTime() + 2*10e3; // 20秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas,type){
        let data = dataFilter(datas);
        console.log("onRepaint data====>" + JSON.stringify(data) + "====type=====>" + type);
        //console.log('data',data);
        //设备id
        if (!!data.deviceId) AppData.deviceId = data.deviceId;
        //断网离线
        if (!!data.online) {
            AppData.online = data.online;
            if (data.online == 2) {
                data.loading = 2;
                AppData.loading = 2;
            }
        }
        if (!!data.networkavailable) {
            AppData.networkavailable = data.networkavailable;
            if (data.networkavailable == 2) {
                data.loading = 2;
                AppData.loading = 2;
            }
        }

        //回退数据重渲缓存
        if (data.preh != undefined) AppData.preh = data.preh;
        if (data.start != undefined) AppData.start = data.start;
        if (data.cancel != undefined) AppData.cancel = data.cancel;
        if (data.updateFlag != undefined) AppData.updateFlag = data.updateFlag;
        //运行字段
        if (data.prehour != undefined) AppData.prehour = data.prehour;
        if (parseInt(type || 0) == 1) {
            if (data.model != undefined) AppData.model = data.model;
            if (data.premin != undefined) AppData.premin = data.premin;
        }
        //故障字段
        if (data.BottomNTCFault != undefined) AppData.BottomNTCFault = data.BottomNTCFault;//底盘NTC异常
        if (data.TopNTCFault != undefined) AppData.TopNTCFault = data.TopNTCFault;//上盖NTC异常
        if (data.PCBANTCFault != undefined) AppData.PCBANTCFault = data.PCBANTCFault;//环境温度NTC异常
        if (data.CircuitFault != undefined) AppData.CircuitFault = data.CircuitFault;//主加热电路故障
        if (data.EEPROMFault != undefined) AppData.EEPROMFault = data.EEPROMFault;//存储器件故障
        if (data.LeakageFault != undefined) AppData.LeakageFault = data.LeakageFault;//机器漏电异常

        console.log("onRepaint AppData====>" + JSON.stringify(AppData));
        if (AppData.preh != undefined) {
            data.loading = 2;
            AppData.loading = 2;
        }
        this.trigger(AppData);
    },
    onGetData(){
        console.log("AppData=" + JSON.stringify(AppData));
        this.trigger(AppData);
    },
    onKeep(){//处理保温事件 (7-保温)
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备已离线');
            return;
        }
        AppData.model = "07";
        AppData.start = "01";
        AppData.cancel = "00";
        AppData.updateFlag = het.hexUpFlag(14, 3, 4);
        het.send({
            model: AppData.model,
            start: AppData.start,
            cancel: AppData.cancel,
            updateFlag: AppData.updateFlag
        }, (data) => {
            console.log('成功');
            this.trigger(AppData);//这里直接显示uI 点击进入保温模式
        }, (data) => {
            het.toast("命令发送失败");
        });
        // setDataTimer('model');
    },
    onSwicthModel(model){//直接启动的模式
        AppData.model = "0" + model;
        AppData.start = "01";
        AppData.cancel = "00";
        AppData.updateFlag = het.hexUpFlag(14, 3, 4);
        het.send(AppData, (data) => {
            console.log('成功');
        }, (data) => {
            het.toast("命令发送失败");
        });
        // setDataTimer('model');
        this.trigger({model: AppData.model});
    },
    onSelectTime(hour, minute){
        this.trigger({hour: hour, minute: minute, selectshow: false});
    },
    onModelCancel(){
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备已离线');
            return;
        }
        AppData.model = "00";
        AppData.start = "00";
        AppData.cancel = "01";
        AppData.updateFlag = het.hexUpFlag(14, 3, 4);
        het.send(AppData, (data) => {//取消之后手动恢复所有运行工作状态
            AppData.model = "00";
            AppData.preh = "00";
            AppData.prehour = "00";
            AppData.premin = "00";
            this.trigger(AppData);
        }, (data) => {
            het.toast("命令发送失败");
        });
        // setDataTimer('model');
    },
    onModelStart(WorkModelSelect, preh, premin){
        let _this = this;
        if (isNetOff()) {
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if (isOffline()) {
            het.toast('设备已离线');
            return;
        }
        console.log('iserr model = ', JSON.stringify(AppData));
        if (preh != 0 || premin != 0) {//预约  开始
            if (parseInt(preh) == 24 && parseInt(premin) != 0) {
                het.toast("预约时长不能大于24个小时,请重新选择预约时长！");
                return;
            }
            AppData.preh = decToHex(preh);
            AppData.premin = decToHex(premin);
            AppData.updateFlag = het.hexUpFlag(12, 2, 4);
        } else {
            AppData.preh = '00';
            AppData.premin = '00';
            AppData.updateFlag = het.hexUpFlag(12, 2, 4);
        }
        AppData.model = "0" + (parseInt(WorkModelSelect) + 1);
        AppData.start = "02";
        AppData.cancel = "00";
        AppData.updateFlag = het.hexUpFlag(14, 3, 4, AppData.updateFlag);
        console.log('send model', AppData);
        het.send(AppData, function (data) {
            console.log('onstart succee');
            AppData.prehour = AppData.preh;
            _this.trigger({
                'preh': AppData.preh,
                'premin': AppData.premin,
                'model': AppData.model,
                'start': AppData.start,
                'cancel': AppData.cancel,
                'prehour': AppData.prehour,
            });
            history.back();
        }, function (data) {
            het.toast("命令发送失败");
        });
        // setDataTimer('model');
    }
});