'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

let needSave = false; // 是否需要保存设置
let smartModeSwitch = 0; //智能模式开关：0-手动，1-自动
let showTestSkin = 0; // 智能模式的描述显示
const AppData = {
    'skinType':null
};
let sendData = {
    updateFlag:0
};
let recConfigMark = {};
let currentData = {};

/**
 * 配置数组到配置对象的转换
 * @param    {array}      items 设置参数
 * @return   {json}        返回设置对象
 */
function arrToObj(array){
    let data = {};
    data.foreheadGears = array[0].speed;//额头档位
    data.foreheadRuntime = array[0].time;//额头时间
    data.foreheadChanged = array[0].changed;
    data.noseGears = array[1].speed;//鼻子档位
    data.noseRuntime = array[1].time;//鼻子时间
    data.noseChanged = array[1].changed;
    data.chinGears = array[2].speed;//下巴档位
    data.chinRuntime = array[2].time;//下巴时间
    data.chinChanged = array[2].changed;
    data.leftfaceGears = array[3].speed;//左脸档位
    data.leftfaceRuntime = array[3].time;//左脸时间
    data.leftfaceChanged = array[3].changed;
    data.rightfaceGears = array[4].speed;//右脸档位
    data.rightfaceRuntime = array[4].time;//右脸时间
    data.rightfaceChanged = array[4].changed;
    return data;
}


/**
 * 拼接返回给页面的字段
 * @return   {object}        返回给页面的字段
 */
function getTriggerData(){
    let data = {
        smartModeSwitch:AppData.smartModeSwitch,
        skinType : AppData.skinType,
        needSave : needSave,
        electricity : AppData.electricity,
        onlineStatus : AppData.onlineStatus,
        chargeStatus : AppData.chargeStatus
    };
    return data;
}

function getFaceCleanerConfig(array){

    let data = {
    }

    //part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
    array.map((item,index)=>{
        if (item.part == 11){
            data.foreheadGears = item.gears;
            data.foreheadRuntime = item.runTime;
            data.foreheadRemarks = item.remark;
        }
        if (item.part == 14){
            data.chinGears = item.gears;
            data.chinRuntime = item.runTime;
            data.chinRemarks = item.remark;
        }
        if (item.part == 13){
            data.leftfaceGears = item.gears;
            data.leftfaceRuntime = item.runTime;
            data.leftfaceRemarks = item.remark;
        }
        if (item.part == 15){
            data.rightfaceGears = item.gears;
            data.rightfaceRuntime = item.runTime;
            data.rightfaceRemarks = item.remark;
        }
        if (item.part == 12){
            data.noseGears = item.gears;
            data.noseRuntime = item.runTime;
            data.noseRemarks = item.remark;
        }
    })
    return data;
}

function getCurrentRunConfig(array){

    let data = {
    }

    //part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
    array.map((item,index)=>{
        if (item.part == 11){
            data.foreheadGears = item.gears;
            data.foreheadRuntime = item.runTime;
            data.foreheadRemarks = item.remark;
        }
        if (item.part == 14){
            data.chinGears = item.gears;
            data.chinRuntime = item.runTime;
            data.chinRemarks = item.remark;
        }
        if (item.part == 13){
            data.leftfaceGears = item.gears;
            data.leftfaceRuntime = item.runTime;
            data.leftfaceRemarks = item.remark;
        }
        if (item.part == 15){
            data.rightfaceGears = item.gears;
            data.rightfaceRuntime = item.runTime;
            data.rightfaceRemarks = item.remark;
        }
        if (item.part == 12){
            data.noseGears = item.gears;
            data.noseRuntime = item.runTime;
            data.noseRemarks = item.remark;
        }
    })
    return data;
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        let skinType,runData;
        if(AppData.currentConfig === undefined || AppData.currentConfig == null){
            AppData.currentConfig = {};
        }
        if(AppData.faceCleanerConfig === undefined || AppData.faceCleanerConfig == null){
            AppData.faceCleanerConfig = {};
        }
        if(!needSave){//无数据保存时，接受所有字段
            if(data.currentRunConfig){
                let tempData = getCurrentRunConfig(data.currentRunConfig);
                currentData =  Funs._extends({},tempData);// 这个是最原始的当前数据
                // console.log('原始的当前运行数据转换后的数据',currentData);
                AppData.currentConfig = Funs._extends({},currentData);
            }
            if(data.faceCleanerConfig){

                let tempData = getFaceCleanerConfig(data.faceCleanerConfig);

                AppData.faceCleanerConfig = tempData;
                AppData.skinType = 1;
                AppData.faceCleanerConfig.foreheadChanged = false;
                AppData.faceCleanerConfig.noseChanged = false;
                AppData.faceCleanerConfig.chinChanged = false;
                AppData.faceCleanerConfig.leftfaceChanged = false;
                AppData.faceCleanerConfig.rightfaceChanged = false;
                recConfigMark.foreheadRemarks = tempData.foreheadRemarks;
                recConfigMark.noseRemarks = tempData.noseRemarks;
                recConfigMark.chinRemarks = tempData.chinRemarks;
                recConfigMark.leftfaceRemarks = tempData.leftfaceRemarks;
                recConfigMark.rightfaceRemarks = tempData.rightfaceRemarks;
            }
            AppData.electricity = typeof data.electricity!=='undefined' ? data.electricity : AppData.electricity;
            AppData.onlineStatus = typeof data.onlineStatus!=='undefined' ? data.onlineStatus : AppData.onlineStatus;
            AppData.chargeStatus = typeof data.chargeStatus!=='undefined' ? data.chargeStatus : AppData.chargeStatus;
            AppData.smartModeSwitch = typeof data.currentRunMode!=='undefined' ? data.currentRunMode : AppData.smartModeSwitch;

            if(AppData.smartModeSwitch == 1){
                let tempData = getTriggerData();
                this.trigger(Funs._extends(AppData.faceCleanerConfig, tempData, recConfigMark));// 推荐数据，和当前的运行数据，每个部位的描述合并
            }else{
                let tempData = getTriggerData();
                if(data.currentRunConfig){
                    AppData.currentConfig = Funs._extends(AppData.currentConfig,data.currentRunConfig);
                }else{
                    if(AppData.skinType == null || AppData.skinType === undefined){//设备以前绑定了有肤质的智能模式，但是现在绑到了无肤质的用户下
                        AppData.currentConfig = Funs._extends(AppData.currentConfig,data,{smartModeSwitch:0});
                    }else{
                        AppData.currentConfig = Funs._extends(AppData.currentConfig,data);
                    }
                }
                let runData = Funs._extends(AppData.currentConfig, tempData, recConfigMark);
                this.trigger(runData);
            }
        }else{//有数据保存时，仅接受部分字段
            if(AppData.smartModeSwitch == 1){
                let tempData = getTriggerData();
                this.trigger(Funs._extends(AppData.faceCleanerConfig, tempData, recConfigMark));
            }else{
                let tempData = getTriggerData();
                runData = Funs._extends(AppData.currentConfig, tempData, recConfigMark);
                this.trigger(runData);
            }
        }
    },

    onSwitchStateChange(value){
        needSave = true;
        if(value==1){
            // 先改变value的值，然后再合并
            AppData.smartModeSwitch = 0;
            let tempData = getTriggerData();
            this.trigger(Funs._extends(AppData.currentConfig,tempData,recConfigMark));
        }else if(value==0){
            // 先改变value的值，然后再合并
            if(AppData.faceCleanerConfig){
                AppData.smartModeSwitch = 1;
            }
            let tempData = getTriggerData();
            // if(AppData.faceCleanerConfig && AppData.skinType !== null){
            //     AppData.faceCleanerConfig.showTestSkin = 1;//智能模式有推荐数据
            // }else{
            //     AppData.faceCleanerConfig.showTestSkin = 2;//智能模式无推荐数据
            // }
            this.trigger(Funs._extends(AppData.faceCleanerConfig,tempData,recConfigMark));
        }
    },

    //  这个是选择器点击了确定之后
    onChangeGears(items){
        needSave = true;
        let data = arrToObj(items);
        console.log(items);
        let tempData = getTriggerData();
        AppData.currentConfig = Funs._extends(AppData.currentConfig, data, tempData, recConfigMark);
        console.log("222222",AppData.currentConfig);
        this.trigger(AppData.currentConfig);
    },

    onSubmit(items){
        console.log("currentData ....",currentData);
        needSave = false;
        sendData.gears1 = items[0].speed;//额头档位
        sendData.runtime1 = items[0].time;//额头时间
        sendData.gears2 = items[1].speed;//鼻子档位
        sendData.runtime2 = items[1].time;//鼻子时间
        sendData.gears3 = items[2].speed;//下巴档位
        sendData.runtime3 = items[2].time;//下巴时间
        sendData.gears4 = items[3].speed;//左脸档位
        sendData.runtime4 = items[3].time;//左脸时间
        sendData.gears5 = items[4].speed;//右脸档位
        sendData.runtime5 = items[4].time;//右脸时间
        sendData.source = 2;
        sendData.configMode = AppData.smartModeSwitch;
        needSave = false;

        console.log("sendData ....",sendData);
        this.trigger({needSave:false});
        if (AppData.smartModeSwitch == 1) {
            if (AppData.faceCleanerConfig.foreheadGears!=AppData.currentConfig.foreheadGears) {
                sendData.updateFlag |= Math.pow(2, 0);
            };
            if (AppData.faceCleanerConfig.noseGears!=AppData.currentConfig.noseGears) {
                sendData.updateFlag |= Math.pow(2, 2);
            };
            if (AppData.faceCleanerConfig.leftfaceGears!=AppData.currentConfig.leftfaceGears) {//左脸 gear4
                sendData.updateFlag |= Math.pow(2, 6);
            };
            if (AppData.faceCleanerConfig.chinGears!=AppData.currentConfig.chinGears) {//下巴  gear3
                sendData.updateFlag |= Math.pow(2, 4);
            };
            if (AppData.faceCleanerConfig.rightfaceGears!=AppData.currentConfig.rightfaceGears) {
                sendData.updateFlag |= Math.pow(2, 8);
            };

            if (AppData.faceCleanerConfig.foreheadRuntime!=AppData.currentConfig.foreheadRuntime) {
                sendData.updateFlag |= Math.pow(2, 1);
            };
            if (AppData.faceCleanerConfig.noseRuntime!=AppData.currentConfig.noseRuntime) {
                sendData.updateFlag |= Math.pow(2, 3);
            };
            if (AppData.faceCleanerConfig.leftfaceRuntime!=AppData.currentConfig.leftfaceRuntime) {
                sendData.updateFlag |= Math.pow(2, 7);
            };
            if (AppData.faceCleanerConfig.chinRuntime!=AppData.currentConfig.chinRuntime) {
                sendData.updateFlag |= Math.pow(2, 5);
            };
            if (AppData.faceCleanerConfig.rightfaceRuntime!=AppData.currentConfig.rightfaceRuntime) {
                sendData.updateFlag |= Math.pow(2, 9);
            };
        }else{
            console.log("AcurrentData.foreheadGears",currentData.foreheadGears)
            console.log("sendData.gears1",sendData.gears1)
            if (currentData.foreheadGears!=sendData.gears1) {
                sendData.updateFlag |= Math.pow(2, 0);
            };
            if (currentData.noseGears!=sendData.gears2) {
                sendData.updateFlag |= Math.pow(2, 2);
            };
            if (currentData.leftfaceGears!=sendData.gears4) {//左脸 gear4
                sendData.updateFlag |= Math.pow(2, 6);
            };
            if (currentData.chinGears!=sendData.gears3) {//下巴  gear3
                sendData.updateFlag |= Math.pow(2, 4);
            };
            if (currentData.rightfaceGears!=sendData.gears5) {
                sendData.updateFlag |= Math.pow(2, 8);
            };

            if (currentData.foreheadRuntime!=sendData.runtime1) {
                sendData.updateFlag |= Math.pow(2, 1);
            };
            if (currentData.noseRuntime!=sendData.runtime2) {
                sendData.updateFlag |= Math.pow(2, 3);
            };
            if (currentData.chinRuntime!=sendData.runtime3) {
                sendData.updateFlag |= Math.pow(2, 5);
            };
            if (currentData.leftfaceRuntime!=sendData.runtime4) {
                sendData.updateFlag |= Math.pow(2, 7);
            };
            if (currentData.rightfaceRuntime!=sendData.runtime5) {
                sendData.updateFlag |= Math.pow(2, 9);
            };
        }
        het.send(sendData, (data)=>{
            het.toast('同步成功！');
            needSave = false;
            sendData.updateFlag = 0;//每次提交重置自动模式的updateFlag
            this.trigger({needSave:false});
        }, (data)=>{
            het.toast('同步失败！');
            needSave = true;
            this.trigger({needSave:true});
        });
        AppData.currentConfig.foreheadChanged = false;
        AppData.currentConfig.noseChanged = false;
        AppData.currentConfig.chinChanged = false;
        AppData.currentConfig.leftfaceChanged = false;
        AppData.currentConfig.rightfaceChanged = false;
    }
});