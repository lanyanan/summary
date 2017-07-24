'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';

let needSave = false; // 是否需要保存设置
let work = 0; // 工作模式，0-洁面，1-按摩
let part = 0; // 部位 0-额头 1-鼻子 2-下巴 3-左脸 4-右脸
let auto = 0; // 自动/手动模式， 0-手动 1-自动
let runConfig = {}; // 运行数据
let recData = { // 推荐数据
    'forHeadDescribe': '轻度偏油', //额头肤质说明
    'noseDescribe': '中性', //鼻子肤质说明
    'chinDescribe': '中性',//下巴肤质说明 
    'leftFaceDescribe': '中性',//左脸肤质说明
    'rightFaceDescribe': '中性',//右脸肤质说明
    'recomondConfig' : {
        'gears1': 4, //洁面模式 number
        'runtime1': 40,//洁面模式 number
        'gears2': 4,//洁面模式 number
        'runtime2': 20,//洁面模式 number
        'gears3': 4,//洁面模式 number
        'runtime3': 20,//洁面模式 number
        'gears4': 2,//洁面模式 number
        'runtime4': 20,//洁面模式 number
        'gears5': 2,//洁面模式 number
        'runtime5': 20,//洁面模式 number
        'massageGears1': 2,//按摩模式 number
        'massageRuntime1': 20,//按摩模式 number
        'massageGears2': 2,//按摩模式 number
        'massageRuntime2': 20,//按摩模式 number
        'massageGears3': 2,//按摩模式 number
        'massageRuntime3': 20,//按摩模式 number
        'massageGears4': 1,//按摩模式 number
        'massageRuntime4': 20,//按摩模式 number
        'massageGears5': 1,//按摩模式 number
        'massageRuntime5': 20//按摩模式 number
    }
};

/**
 * 获取模式数据
 * @return   {json}           返回{gears, runTime}
 */
function getMode(){
    let configs = auto ? recData.recomondConfig : runConfig;
    let keys = getKeyNames();
    return {
        gears: configs[keys.gearName],
        runTime: configs[keys.runtimeName],
        recGears: recData.recomondConfig[keys.gearName.replace('commonG', 'g').replace('commonM', 'm')],
        recRunTime: recData.recomondConfig[keys.runtimeName]
    };
}

// 获取gearName，runtimeName
function getKeyNames(){
    let suffix=part + 1;
    let gearName, runtimeName, commonGearName;
    if (work===1) {
        switch(suffix) { // 按摩模式需要交换suffix（2-4交换、3-5交换）
            case 2: suffix=4; break;
            case 3: suffix=5; break;
            case 4: suffix=2; break;
            case 5: suffix=3; break;
        }
        commonGearName = 'commonMassageGears' + suffix; // 常用档位名
        gearName = !auto && runConfig[commonGearName] > 0 ? commonGearName : 'massageGears' + suffix;
        runtimeName = 'massageRuntime' + suffix;
    } else {
        commonGearName = 'commonGears' + suffix; // 常用档位名
        gearName = !auto && runConfig[commonGearName] > 0 ? commonGearName : 'gears' + suffix;
        runtimeName = 'runtime' + suffix;
    }
    return {gearName:gearName, runtimeName:runtimeName};
}

/**
 * 获取肤质数据
 * @return   {json}           返回{skinDescribe}
 */
function getSkinDescribe(){
    switch (part) {
        case 0: return {skinDescribe : recData.forHeadDescribe};
        case 1: return {skinDescribe : recData.noseDescribe};
        case 2: return {skinDescribe : recData.chinDescribe};
        case 3: return {skinDescribe : recData.leftFaceDescribe};
        case 4: return {skinDescribe : recData.rightFaceDescribe};
    }
}

/**
 * 获取app需要的数据
 * @return   {json}   返回app需要的所有数据
 */
function getAppData(){
    let data = {
        work : work,
        part : part,
        auto : auto,
        skinDataCode : recData.skinDataCode,
        electricity : runConfig.electricity,
        onlineStatus : runConfig.onlineStatus,
        chargeStatus : runConfig.chargeStatus,
        needSave : needSave
    };
    return Funs._extends(data, getMode(), getSkinDescribe());
}

/**
 * 检测是否含有某字段
 * @param    {json}      data 待检数据
 * @param    {...string} keys 键名（rest参数形式）
 * @return   {Boolean}        返回布尔值
 */
function has(data, ...keys){
    let tag = true; // 先假设成立
    for (var i in keys) {
        if (typeof data[keys[i]] === 'undefined') {
            tag = false;
        }
    }
    return tag;
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        if (!needSave) { // 无数据需要保存时，接受所有字段
            if (has(data, 'recomondConfig')) { // 检测是否推荐数据
                recData = data;
                runConfig = Funs._extends(runConfig, data.siliconeFacecleannerConfig);
            } else { // 其它数据当运行数据处理
                runConfig = Funs._extends(runConfig, data);
            }
            if (runConfig.cleanSwitch==1) {
                work = 0;
            } else if (runConfig.massageSwitch==1) {
                work = 1;
            }
        } else { // 有数据需要保存时，仅接受部分状态字段
            if (has(data, 'recomondConfig')) { // 检测是否推荐数据
                let c = data.siliconeFacecleannerConfig;
                runConfig.electricity = typeof c.electricity!=='undefined' ? c.electricity : runConfig.electricity;
                runConfig.onlineStatus = typeof c.onlineStatus!=='undefined' ? c.onlineStatus : runConfig.onlineStatus;
                runConfig.chargeStatus = typeof c.chargeStatus!=='undefined' ? c.chargeStatus : runConfig.chargeStatus;
            } else {
                runConfig.electricity = typeof data.electricity!=='undefined' ? data.electricity : runConfig.electricity;
                runConfig.onlineStatus = typeof data.onlineStatus!=='undefined' ? data.onlineStatus : runConfig.onlineStatus;
                runConfig.chargeStatus = typeof data.chargeStatus!=='undefined' ? data.chargeStatus : runConfig.chargeStatus;
            }
        }
        auto = parseInt(runConfig.busiSwitch);
        this.trigger(getAppData()); // 有数据需要保存时，不进行渲染
    },
    onSwitchPart(value){
        part = value;
        this.trigger(getAppData());
    },
    onShowSortPanel(value){
        this.trigger({sortPanelShow:value});
    },
    onSwitchAuto(){
        auto = auto===1 ? 0 : 1;
        needSave = true;
        runConfig.busiSwitch = auto;
        this.trigger(getAppData());
    },
    onSwitchWork(){
        work = work===1 ? 0 : 1;
        needSave = true;
        this.trigger(getAppData());
    },
    onChangeGears(value){
        let key = getKeyNames().gearName.replace('commonG', 'g').replace('commonM', 'm'); // 数据不能保存到常用模式里
        needSave = true;
        runConfig[key] = value;
        if (auto==0) { // 把常用档位归零
            runConfig['common' + key.replace(/^g/, 'G').replace(/^m/, 'M')] = 0;
        }
        this.trigger(getAppData());
    },
    onChangeRuntime(value){
        let key = getKeyNames().runtimeName;
        needSave = true;
        runConfig[key] = value;
        this.trigger(getAppData());
    },
    onSubmit(){
        let sendData = auto ? Funs._extends({}, runConfig, recData.recomondConfig) : runConfig;
        needSave = false;
        if (work===1) { // 按摩模式
            sendData.cleanSwitch = 2;
            sendData.massageSwitch = 1;
        } else { // 洁面模式
            sendData.cleanSwitch = 1;
            sendData.massageSwitch = 2;
        }
        het.send(sendData, (data)=>{
            het.toast('同步成功！');
        }, (data)=>{
            het.toast('同步失败！');
        });
        this.trigger(getAppData());
    },
    onRefreshData(){
        this.trigger(getAppData());
    },
    onPushGuiderData(){
        let configs = auto ? recData.recomondConfig : runConfig;
        this.trigger(Funs._extends({work:work},configs));
    }
});