'use strict'
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

const appData = {
    hasShowAlert: false,//是否已经显示过Dialog
};

// 数据过滤计时器
let dataFilterTimers = {
    lightstatus: 0,
    runstatus: 0,
    wisdomeye: 0,
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
    onRepaint(datas, type){//type:0 控制数据;1: 运行数据

        let data = dataFilter(datas);
        if (data.online != undefined) appData.online = data.online;
        if (data.networkavailable != undefined) appData.networkavailable = data.networkavailable;

        //控制数据
        if (data.power != undefined) appData.power = data.power;
        if (data.light != undefined) appData.light = data.light;
        if (data.wisdomeye != undefined) {
            // console.log("----appData.wisdomeye----- data.wisdomeye : "+data.wisdomeye+", ");
            appData.wisdomeye = data.wisdomeye;
        }
        if (data.ventilation != undefined) appData.ventilation = data.ventilation;
        if (data.updateFlag != undefined) appData.updateFlag = data.updateFlag;

        //运行数据
        if (data.runstatus != undefined) appData.runstatus = data.runstatus;
        if (data.odor != undefined) appData.odor = data.odor;
        // if(data.motormode!=undefined)  appData.motormode = data.motormode;
        if (data.lightstatus != undefined) appData.lightstatus = data.lightstatus;
        if (data.ventilationtime != undefined) appData.ventilationtime = data.ventilationtime;
        if (data.notcleantime != undefined) appData.notcleantime = data.notcleantime;

        //故障
        if (data.water != undefined) appData.water = data.water;

        let isWisdomEye = (appData.runstatus === 1 || appData.runstatus === 4 || appData.runstatus === 5 || appData.runstatus === 6) && appData.wisdomeye === 1;
        if (data.runstatus != undefined && data.odor != undefined && isWisdomEye && data.odor > 70 && (appData.hasShowAlert === undefined || !appData.hasShowAlert)) {
            appData.isShowAlert = true;
            appData.hasShowAlert = true;
        } else if (appData.odor !== undefined && ((isWisdomEye && appData.odor <= 70) || appData.wisdomeye !== 1)) {
            appData.hasShowAlert = false;
        }
        this.trigger(appData);
    },
    /**
     *
     * @param where                 点击的位置
     */
    onChangeMode(where, wisedonEyeStatus){//点击的位置
        let _this = this;
        // console.log("onChangeMode 开始更改模式 where : "+where);
        if (where === 0) {
            appData.light = appData.lightstatus === 2 ? 1 : 2, appData.updateFlag = het.hexUpFlag(1, 1, 2);
        } else if (where === 1) {
            if (appData.runstatus === 7){//关机状态下,
                appData.power = 1;
                appData.updateFlag = het.hexUpFlag(0, 1, 2);
            } else {
                appData.power = 2;
                appData.light = 2;
                appData.wisdomeye = 2;
                appData.ventilation = 2;
                appData.updateFlag = het.hexUpFlag(0, 4, 2);
            }
            // appData.power = appData.runstatus === 7 ? 1 : 2, appData.updateFlag = het.hexUpFlag(0, 1, 2);
        } else if (where === 2) {//打开智慧眼
            if (appData.runstatus === 2) {//如果当前是换气模式下, 亦既是 当前换气模式已打开, 点击智慧眼(打开智慧眼, 关闭换气)
                appData.wisdomeye = 1;//打开智慧眼
                appData.ventilation = 2;//关闭换气开关
                appData.updateFlag = het.hexUpFlag(2, 2, 2);
            } else {
                appData.wisdomeye = wisedonEyeStatus && wisedonEyeStatus === 1 ? 2 : 1, appData.updateFlag = het.hexUpFlag(2, 1, 2);
            }
        } else if (where === 3) {//打开换气开关
            if ((appData.runstatus === 1 || appData.runstatus === 4 || appData.runstatus === 5 || appData.runstatus === 6) && appData.wisdomeye === 1) {//如果当前是智慧眼模式下
                appData.wisdomeye = 2;//关闭智慧眼
                appData.ventilation = 1;//打开换气开关
                appData.updateFlag = het.hexUpFlag(2, 2, 2);
            } else {
                appData.ventilation = appData.runstatus !== 2 ? 1 : 2, appData.updateFlag = het.hexUpFlag(3, 1, 2);
            }
        }

        het.send(appData, (data) => {
            if (where === 0) {
                appData.lightstatus = appData.light;
            } else if (where === 1) {
                appData.runstatus = appData.power === 1 ? 1 : 7;
                if (appData.power === 2) {
                    appData.wisdomeye = 2;
                    appData.lightstatus = 2;
                }
            } else if (where === 2 || where === 3) {
                if (appData.wisdomeye === 2 && appData.ventilation === 2) appData.runstatus = 1;//关闭智慧眼和换气, 将runstatus置为待机状态
                if (appData.wisdomeye === 1 && appData.ventilation === 2) appData.runstatus = 1;//打开智慧眼, 关闭换气, 将runstatus置为待机状态
                if (appData.wisdomeye === 2 && appData.ventilation === 1) appData.runstatus = 2;//打开换气开关, 关闭智慧眼
            }
            // console.log("===== runstatus : "+appData.runstatus+", wisdomeye : "+appData.wisdomeye+", ventilation : "+appData.ventilation+", lightstatus : "+appData.lightstatus +", updateFlag : "+appData.updateFlag);
            _this.trigger(appData);
        }, (appData) => {
            het.toast("命令发送失败")
        });

        if (where === 0) {
            setDataTimer('lightstatus');
        } else if (where === 1) {
            setDataTimer('runstatus');
        } else {
            setDataTimer('runstatus', 'wisdomeye');
        }
    },
    onStartVentilation(){
        let _this = this;
        appData.wisdomeye = 2;//关闭智慧眼
        appData.ventilation = 1;//打开换气开关
        appData.updateFlag = het.hexUpFlag(2, 2, 2);
        het.send(appData, (data) => {
        }, (appData) => {
            het.toast("命令发送失败")
        });
        setDataTimer('runstatus', 'wisdomeye');
        appData.isShowAlert = false;
        appData.hasShowAlert = true;
        appData.runstatus = 2;//直接修改运行数据, 渲染UI
        _this.trigger(appData);
    },
    onHideDialog(){
        appData.isShowAlert = false;
        appData.hasShowAlert = true;
        this.trigger(appData);
    },
});