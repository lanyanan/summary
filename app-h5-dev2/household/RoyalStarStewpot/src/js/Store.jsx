'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.jsx';

const appData = {
};
//    {id:0,name:'待机'},
//{id:1,name:'大骨汤'},
//{id:2,name:'婴儿粥'},
//{id:3,name:'煲仔饭',heatinghour:0,heatingmin:15},
//{id:4,name:'营养饭',heatinghour:0,heatingmin:16},
//{id:5,name:'营养汤',heatinghour:0,heatingmin:18},
//{id:6,name:'老火汤',heatinghour:0,heatingmin:22},
//{id:7,name:'乌鸡汤',heatinghour:0,heatingmin:24},
//{id:8,name:'老鸭汤',heatinghour:0,heatingmin:35},
//{id:9,name:'八宝粥',heatinghour:1,heatingmin:0},
//{id:10,name:'五谷粥',heatinghour:0,heatingmin:20},
//{id:11,name:'砂锅粥',heatinghour:0,heatingmin:20},
//{id:12,name:'隔水炖',heatinghour:0,heatingmin:20},
//{id:13,name:'药膳',heatinghour:0,heatingmin:20},
//{id:14,name:'甜品',heatinghour:0,heatingmin:20},
//{id:15,name:'盐焗',heatinghour:0,heatingmin:20},
//{id:16,name:'焖烧',heatinghour:0,heatingmin:20},
//{id:17,name:'保温',heatinghour:0,heatingmin:20},
//{id:18,name:'云菜单',heatinghour:0,heatingmin:20},
let modeArray = [
    {id:0,name:'待机'},
    {id:1,name:'待机'},
    {id:2,name:'营养汤',functimeset:70,minTime:45,maxTime:120},
    {id:3,name:'八宝粥',functimeset:90,minTime:45,maxTime:120},
    {id:4,name:'药膳',functimeset:60,minTime:45,maxTime:300},
    {id:5,name:'老火汤',functimeset:90,minTime:45,maxTime:120},
    {id:6,name:'五谷粥',functimeset:90,minTime:45,maxTime:120},
    {id:7,name:'甜品',functimeset:60,minTime:30,maxTime:120},
    {id:8,name:'乌鸡汤',functimeset:90,minTime:45,maxTime:120},
    {id:9,name:'砂锅粥',functimeset:60,minTime:45,maxTime:120},
    {id:10,name:'盐焗',functimeset:60,minTime:30,maxTime:120},
    {id:11,name:'老鸭汤',functimeset:90,minTime:45,maxTime:120},
    {id:12,name:'隔水炖',functimeset:60,minTime:45,maxTime:120},
    {id:13,name:'焖烧',functimeset:60,minTime:30,maxTime:120},
    {id:14,name:'大骨汤',functimeset:90,minTime:45,maxTime:120},
    {id:15,name:'婴儿粥',functimeset:60,minTime:60,maxTime:120},
    {id:16,name:'煲仔饭',functimeset:45,minTime:0,maxTime:0},
    {id:17,name:'营养饭',functimeset:35,minTime:0,maxTime:0},
    {id:18,name:'保温',functimeset:0,minTime:0,maxTime:0},
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
// 数据过滤计时器
let dataFilterTimers = {
    AppointmentOrHeat : 0,
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
    let time = (new Date).getTime() + 20e3; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas, type){
        //缓存数据到appData里，协议定义中文>_<，中转一下字段发送
        //console.log('appData data:',data);
        let data = dataFilter(datas);
        //console.log("onRepaint data====>"+JSON.stringify(data));
        appData.modeArray = modeArray;
//运行数据
        //当前模式
        if(data.function!=undefined)   appData.mode = data.function,  appData.modeName = modeArray[data.function].name;
        //预约设定时间
        if(data.ordertimehour!=undefined)  appData.reservehour= data.ordertimehour;
        if(data.ordertimemin!=undefined)  appData.reservemin= data.ordertimemin;
        //预约剩余时间
        if(data.orderfreehour!=undefined)  appData.surplusreservehour = data.orderfreehour;
        if(data.orderfreemin!=undefined)  appData.surplusreservemin = data.orderfreemin;
        //功能设定时间
        if(data.functimeset!=undefined)                appData.heatingTime = data.functimeset;
        //功能剩余时间
        if(data.functimefree!=undefined)  appData.surplusHeatingTime  = data.functimefree;
        //当前温度
        if(data.temperature!=undefined) appData.curTemp = data.temperature;
//离线&故障
        if(data.online)                             appData.online = data.online;  //1在线 2 离线
        if(data.networkavailable)                   appData.networkavailable = data.networkavailable; //1可用 2不可用
        if(data.soaktimehour)                             appData.soaktimehour = data.soaktimehour;  //保温时间（小时）
        if(data.soaktimeminute)                   appData.soaktimeminute = data.soaktimeminute; //保温时间（分钟）
        //传感器故障
        if(data.sensorflag!=undefined)             appData.error = data.sensorflag;
        //烹饪阶段  1预约  2加热
        if(data.AppointmentOrHeat!=undefined)             appData.AppointmentOrHeat = data.AppointmentOrHeat;
        //console.log('appData',appData);
        this.trigger(appData);
    },
    onLocal(data){
        this.trigger(appData);
    },
    onSelectMode(data){
        console.log('onSelectMode------------',data);
        this.trigger(data);
    },
    //时间控件的取消
    onCancelSelect:function(data) {
        this.trigger({selectshow:false});
        this.trigger({openSubscribeClock:false});
    },
    onSubmitSelect:function(h,m,where,selectMode) {
        console.log('onSubmitSelect------------',h,m,where,selectMode);
        let selectArray = {};
        switch(parseInt(where)){
            //预约时间
            case 0:

                if(parseInt(m)%60==0){
                    selectArray.ordertimehour=parseInt(h)+parseInt(m)/60;
                    selectArray.ordertimemin=0;

                }else{
                    selectArray.ordertimehour=parseInt(h);
                    selectArray.ordertimemin=parseInt(m);
                }

                if(selectArray.ordertimehour>=24){
                    selectArray.ordertimehour=24;
                    selectArray.ordertimemin=0;
                }else if(selectArray.ordertimehour==0&&selectArray.ordertimemin==30){
                    selectArray.ordertimehour=1;
                    selectArray.ordertimemin=0;
                }

                break;
            //加热时间
            case 1:
                //加热时间选择h为分钟数的值

                selectArray.runtime=parseInt(h)*60+parseInt(m);
                if(selectArray.runtime>modeArray[selectMode].maxTime){
                    selectArray.runtime = modeArray[selectMode].maxTime;
                }

                break;
        }
        this.trigger(selectArray);
        console.log('selectArray------------',selectArray,modeArray[selectMode].maxTime);
    },
    onLaunchMode:function(data) {
        //置位字段加入计算，其他的按协议或约定发送
        //let updateFlag = het.hexUpFlag(1, 2, 2,het.hexUpFlag(2, 1, 2,het.hexUpFlag(3, 1, 2)));

        //硬件预约时间的概念是 所有工作完成时间,app的预约概念是  等待工作开始的时间.
        //所以处理传给硬件的预约时间   预约时间+加热时间
        //console.log('ordertimehour,ordertimemin,runtime',typeof(data.ordertimehour),typeof(data.ordertimemin),data.runtime);

        //let _surplusreservehour = data.ordertimehour;
        //let _surplusreservemin = data.ordertimemin;
        //if(data.ordertimehour!=0||data.ordertimemin!=0){
        //    console.log('&1111');
        //    if(data.runtime>=60){
        //        data.ordertimehour=data.ordertimehour +parseInt(data.runtime/60);
        //        data.ordertimemin = data.ordertimemin+ data.runtime%60;
        //        console.log('&&&&&&&&&&&&&',data.ordertimehour,data.ordertimemin);
        //    }else{
        //        console.log('&2222');
        //        data.ordertimemin = data.ordertimemin+ data.runtime;
        //    }
        //}

        let updateFlag;
        if(data.ordertimehour == 0&&data.ordertimemin == 0){
            updateFlag= het.hexUpFlag(2, 1, 2,het.hexUpFlag(3, 2, 2));
        }else{
            updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1, 1, 2,het.hexUpFlag(2, 1, 2,het.hexUpFlag(3, 2, 2))));
        }
        data.updateFlag = updateFlag;
        het.send(data, function(data){},function(data){het.toast("命令发送失败");});
        setDataTimer('AppointmentOrHeat');
        //协议定义为拼音不便阅读，映射一遍，存到全局变量里trigger，物理返回键和回退操作都调用了local方法重新请求了一次缓存数据
        appData.mode = data.function;
        appData.modeName =  modeArray[data.function].name;
        ////预约剩余时间
        appData.surplusreservehour = data.ordertimehour;
        appData.surplusreservemin = data.ordertimemin;
        ////功能剩余时间
        appData.surplusHeatingTime  = data.runtime;
        if(appData.mode !=1&&appData.mode!=0&&appData.mode !=18){
            if(appData.surplusreservehour!=0||appData.surplusreservemin!=0){
                appData.AppointmentOrHeat=1;
            }else{
                appData.AppointmentOrHeat=2;
            }
        }else{
            appData.AppointmentOrHeat=0;
        }
        this.trigger(appData);
        this.trigger({selectshow:false});
        this.trigger({openSubscribeClock:false});
        console.log("appDataappDataappDataappDataappDataappData",data,appData);
        console.log("Store/// surplusreservehour,surplusreservemin,AppointmentOrHeat",appData.surplusreservehour,pData.surplusreservemin,appData.AppointmentOrHeat);

    },
    //取消之前选择的模式
    onCancel:function(data) {
        let updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1, 1, 2,het.hexUpFlag(2, 1, 2,het.hexUpFlag(3, 2, 2))));
        data.updateFlag = updateFlag;
        het.send(data, function(data){},function(data){het.toast("命令发送失败")});
        console.log('取消',data)
        //协议定义为拼音不便阅读，映射一遍，存到全局变量里trigger，物理返回键和回退操作都调用了local方法重新请求了一次缓存数据
        appData.mode = data.function;
        appData.modeName = '模式';
        appData.AppointmentOrHeat=0;
        appData.reservehour = data.ordertimehour;
        appData.reservemin = data.ordertimemin;
        appData.surplusreservehour = data.ordertimehour;
        appData.surplusreservemin = data.ordertimemin;
        appData.heatingTime = data.runtime;
        this.trigger(appData);
    }
});
