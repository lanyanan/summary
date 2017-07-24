'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {onRepaint} 获取运行数据渲染
 * @type {onSwitch} 开关机
 * @type {onSubmitSelect} 提交选择数据
 * @type {onCancleSelect} 隐藏选择插件
 * @type {onToggleModeShow} 显隐模式面板
 * @type {onToggleModeSelect} 设置模式面板
 * @type {toggleModeSet} 切换工作模式
 * @params data默认取运行数据（type:1）渲染页面，该设备需要同时用到控制数据和运行数据渲染页面,
 * @params data字段 if判断，开启数据渲染判断筛选，因为渲染同时使用了控制数据（设备配置）和运行数据（故障数据也在type:1的运行数据里）
 * @params 但故障数据（也放到运行数据里发送）不包含power等开关机字段，需要先判断故障数据过来是否有该字段，防止缺少字段的故障数据过来冲掉正常运行数据里的字段
 */
//~_~ My first react page is so ugly,any problem please email to 576478636@qq.com,i won't be back to you
import {Funs} from '../../../common/src/fun.es6';
import {Tips} from '../../../common/static/Tips';
import {Actions} from './Actions.es6';


const host = 'https://test.api.clife.cn';
const getPath = host + '/v1/device/data/get';
const setPath = host + '/v1/device/config/set';
const getFaultPath = host + '/v1/device/data/getErrorData';
const getCtrlDataPath = host + '/v1/device/config/get';

const AppData = {
    count: 0,
    fold: false,
    dryalarm: 0,
    coldwater: 0,
    separation: 0,
    record_time:0,
    dryalarm_hint:0,
    separation_hint:0,

};
const deviceId = het.getDeviceId();
const isFault = () => {
    if(AppData.networkavailable==2){
        return '请检查网络';
    }
    if(AppData.online==2){
        return '设备与APP已断开连接!';
    }
    return false;
}
const dataFilterTimers = {
    power : 0,
    boots: 0,
    status: 0,
    selectMode:0,
    slide:0,
    selectShow:0,
    reserve:0,
    resrve1:0,
    surplusworktimehour:0,
    surplusworktimemin:0,
    surplusreservationtimehour:0,
    surplusreservationtimemin:0,
    surplusheatpreservationhour:0,
    surplusheatpreservationmin:0,
    temperature:0,
    workingmode:0,
    workingpower:0,
    menuworkstage:0,
    workstatus:0
};

const fnGetParams = (token) => {
    return {
        "accessToken": token,
        "deviceId": deviceId,
        "appId": '30590',
        "timestamp": + new Date()
    }
};

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

    onRepaint(dataOrig){
        let data = dataFilter(dataOrig);
        if(data.online) AppData.online=data.online;
        if(data.networkavailable) AppData.networkavailable=data.networkavailable;
        if(data.workingmode){
            AppData.workingmode=data.workingmode
        }
        //防止故障数据的少字段传入导致先前的字段被冲刷
        if(data.power){
            AppData.power = data.power;
            AppData.boots = data.power;
            data.boots = data.power;
        }
        //计数器，H5两次点击同一模式，设置同样的预约时间启动，视为不同模式
        if(data.count){
            AppData.count= data.count;
        }
        //故障数据缓存
        data.dryalarm!=undefined ? AppData.dryalarm = data.dryalarm : data.dryalarm = AppData.dryalarm;
        data.coldwater!=undefined ? AppData.coldwater = data.coldwater : data.coldwater = AppData.coldwater;
        data.separation!=undefined ? AppData.separation = data.separation : data.separation = AppData.separation;

        if(data.power==2){
            data.coldwater = 0;
            data.dryalarm = 0;
            data.separation = 0;
        }
        //离线online=2 离线
        if(data.online==2){
            AppData.dryalarm = 0;
            AppData.coldwater = 0;
            AppData.separation = 0;
            data.coldwater = 0;
            data.dryalarm = 0;
            data.separation = 0;
        }

        ////当前加热时间
        //if(data.timehour!=undefined){
        //    AppData.timehour = data.timehour;
        //}
        //if(data.timemin!=undefined){
        //    AppData.timemin = data.timemin;
        //}
        ////当前预约时间
        //if(data.reservation){
        //    AppData.reservation = data.reservation;
        //};
        this.trigger(data);
    },

    onSwitch(value){
        //if(isFault()){het.toast(isFault());return false};
        if (isClose() || value==2) {
            // 关机状态，开机
            AppData.power=1;
            AppData.boots=1;
            AppData.status=0;
            AppData.selectMode = 0;
            AppData.slide = 2;
            AppData.selectShow = 0;
        } else {
            // 开机状态，关机
            AppData.power=2;
            AppData.boots=2;
            AppData.status=1;
            AppData.slide = 2;
            AppData.selectShow = 0;
        }
        AppData.workingmode = 0;
        AppData.reservation =0;
        //关机不再人为重置故障状态，跟随设备返回的数据执行故障提示
        //AppData.dryalarm = 0;
        //AppData.coldwater = 0;
        //AppData.separation = 0;
        let u0 = het.hexUpFlag(0, 1, 2);//开关机 标志位0
        AppData.updateFlag = u0;
        /*het.send(AppData, function(data){
        },function(data){
            het.toast("命令发送失败");
        });*/
        setDataTimer('power', 'boots', 'status', 'selectMode', 'slide', 'selectShow');
        this.trigger(AppData);
        this.onPostData(AppData);
    },
    onSubmitSelect(hour,minute,slide,whereSet){
        //if(isFault()){this.trigger(AppData);het.toast(isFault());return false};
        let AppDataLive = {
            //power: 1,
            //reservation: AppData.reservation,
            //timehour: AppData.timehour,
            //timemin: AppData.timemin
        };
        //仅仅A实时发送，且只是有些模式可以实时发送,外部功率设置
        if(whereSet=='A'){
            let u2u3Live = '';
            if(AppData.workingmode==1){
                AppDataLive.heatpreservation =hour;
                AppData.heatpreservation = hour;
                u2u3Live = het.hexUpFlag(2, 1, 2);//保温-标志位2
            }else{
                AppDataLive.heatingpower =hour/100;
                AppData.heatingpower = hour/100;
                u2u3Live = het.hexUpFlag(3, 1, 2);//功率-标志位3
            }
            AppDataLive.updateFlag = u2u3Live;
            /*het.send(AppDataLive, function(data){
            },function(data){
                het.toast("命令发送失败");
            });*/
            this.onPostData(AppDataLive);

            AppData.powerTemperature = hour;
            //console.log('实时切换功率or保温温度'+hour,minute,'实时提交字段'+JSON.stringify(AppDataLive));
        }else if(whereSet=='B'){
            AppData.selectPower = hour;
        }else if(whereSet=='C'){
            AppData.selectHeating = hour;
        }else if(whereSet=='D'){
            //预约时间计算
            let sendTime = parseInt(hour)*60 + minute;
            if(minute==59){
                minute = 0;
                hour= parseInt(hour)+1;
            }
            sendTime = parseInt(hour)*60  + parseInt(minute);
            AppData.selectReservation =sendTime;
        }
        AppData.selectShow = 0;
        AppData.slide = slide;

        this.trigger(AppData);
    },
    onCancleSelect(value,type){
        this.trigger({selectShow:0});
    },
    onToggleModeShow(slideData){
        //if(isFault()){het.toast(isFault());return false};
        AppData.slide = slideData.slide;
        AppData.fold = slideData.fold;
        this.trigger(slideData);
    },
    onToggleSelectShow(){
        //if(isFault()){het.toast(isFault());return false};
    },
    onToggleModeSelect(selectMode,selectPower,selectHeating,selectReservation){
        //if(isFault()){het.toast(isFault());return false};
        AppData.selectMode =selectMode;
        AppData.selectPower = selectPower;
        AppData.selectHeating = selectHeating;
        AppData.selectReservation = selectReservation;
        AppData.slide = 1;
        AppData.fold = true;
        this.trigger(AppData);
    },
    onToggleModeChange(mode,power,heating,reservation,hideModeSet,status){
        //if(isFault()){het.toast(isFault());return false};
        AppData.slide = 2;
        AppData.modeShow = hideModeSet;
        AppData.status = status|| 2;
        //updateFlag校验位开始
        reservation === undefined && (reservation= 0);
        AppData.reservation = reservation/10;//预约时间(必须)除以10传给设备
        //加热功率or保温温度
        if(mode==1){
            AppData.heatpreservation = power;//保温温度(二选一);
        }else{
            delete AppData.heatpreservation;
            AppData.heatingpower = power/100;//加热功率(二选一)
        }
        AppData.workingmode = mode;//工作模式(必须)
        //console.log('--模式--',mode)
        //工作时间，酸奶模式为13
        if(mode==13){
            AppData.timehour = heating;//酸奶4-18H
            AppData.timemin = 0;//酸奶没有加热分钟设置
            AppData.heatingTime = AppData.timehour;
        }else{
            AppData.timehour= 0;
            AppData.timemin=0;
            AppData.heatingTime=0;
        }
        let u1 = het.hexUpFlag(1, 1, 2);//预约时间-标志位1O
        let u2u3=0;//保温温度-标志位2//加热功率-标志位3
        mode==1 ? (u2u3 =het.hexUpFlag(2, 1, 2,u1)) : (u2u3=het.hexUpFlag(3, 1, 2,u1));
        let u4 = het.hexUpFlag(4, 1, 2,u2u3);//工作模式-标志位4
        if(mode==13){
            let u5 = het.hexUpFlag(5, 1, 2,u4);//工作时间-标志位5高位
            let u6 = het.hexUpFlag(6, 1, 2,u5);//工作时间-标志位6低位
            AppData.updateFlag = u6;
        }else{
            AppData.updateFlag = u4;
        }
        //发送规则，不置位字段需要发送0，否则框架会合并上一次字段到发送对象中,切记
        /*het.send(AppData, function(data){
        },function(data){
            het.toast("命令发送失败");
        });*/



        this.onPostData(AppData);
        AppData.powerTemperature =power;
        AppData.count =AppData.count+1;

        //数据延迟，清空倒计时，温度，状态，
        AppData.surplusreservationtimehour =0;
        AppData.surplusreservationtimemin =0;
        AppData.surplusworktimehour =0;
        AppData.surplusworktimemin =0;
        AppData.surplusheatpreservationhour =0;
        AppData.surplusheatpreservationmin =0;
        setDataTimer('workingmode','temperature','workingpower','menuworkstage','workstatus','surplusreservationtimehour', 'surplusreservationtimemin', 'surplusworktimehour','surplusworktimemin','surplusheatpreservationhour','surplusheatpreservationmin','temperature');
        this.trigger(AppData);
        //console.log('--启动--',AppData.count,mode,power,heating,reservation,hideModeSet,JSON.stringify(AppData));
    },
    onIntervalData() {
        const _this = this;
        // 直接应用openlifeSDK
        het.get(getPath, '', function(response) {
            const result = JSON.parse(response);
            if (result.code === 0) {
                _this.onRepaint(result.data)
            } else if (result.msg) {
                if(result.msg === '设备不在线') {
                    result.msg = '主人，养生壶与App已断开连接！'
                }
                _this.trigger({showTips: true, tipsMsg: '请检查网络或者设备在线情况'});
            }
        });
    },
    onPostData(appData) {
        var _this = this;
        // 直接应用openlifeSDK
        het.post(setPath, appData, function(response) {
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
        het.getToken(function(token) {
            const params = fnGetParams(token);
            $.ajax({
                type: 'GET',
                url: getFaultPath,
                data: params,
                dataType: 'json',
                success: function(response) {
                    if (response.code === 0) {
                        if (response.data.dryalarm == 1) {
                            _this.trigger({showTips: true, tipsMsg: '主人，需切断电源后将发热盘降温才能正常工作'});
                        }

                        if (response.data.separation == 1) {
                            _this.trigger({showTips: true, tipsMsg: '主人，30秒可以延续上一程序，30秒后自动断电'});
                        }

                        if (response.data.coldwater == 1) {
                            _this.trigger({showTips: true, tipsMsg: '主人，主人养生壶里被注入了冷水！'});
                        }
                    }
                }
            })
        });
    },
    onGetCtrlData() {
        var _this = this;
        het.getToken(function(token) {
            const params = fnGetParams(token);
            $.ajax({
                type: 'GET',
                url: getCtrlDataPath,
                data: params,
                dataType: 'json',
                success: function(response) {
                    response.code === 0 &&  _this.onRepaint(response.data)
                }
            })
        });
    }

});

// 判断是否关机状态1开机2关机
export const isClose = ()=>{
    return AppData.power==2 || AppData.power===undefined;
}
// 判断是否关
