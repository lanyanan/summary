'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';

let needSave = false; // 是否需要保存设置
let showTestSkin = 0; // 智能模式的描述显示
let work = 0; // 工作模式，0-洁面，1-按摩
let part = 0; // 部位 0-额头 1-鼻子 2-下巴 3-左脸 4-右脸
let auto = 0; // 自动/手动模式， 0-手动 1-自动
let smartModeSwitch = 0; //智能模式开关：0-手动，1-自动
let runConfig = {}; // 运行数据
let recData = { // 推荐数据
    'recomondConfig' : {
        "cleanSwitch": null,
        "foreheadGears": 2,
        "foreheadRuntime": 20,
        "foreheadRotation": 2,
        "noseGears": 2,
        "noseRuntime": 10,
        "noseRotation": 3,
        "chinGears": 2,
        "chinRuntime": 10,
        "chinRotation": 2,
        "leftfaceGears": 1,
        "leftfaceRuntime": 10,
        "leftfaceRotation": 2,
        "rightfaceGears": 1,
        "rightfaceRuntime": 10,
        "rightfaceRotation": 2,
        "smartModeSwitch": null,
        "foreheadRemarks": "您的肤质为：中性肤质，额头推荐使用双向2次、中速、界面时间20s",
        "noseRemarks": "您的肤质为：中性肤质，鼻子推荐使用双向3次、中速、界面时间10s",
        "chinRemarks": "您的肤质为：中性肤质，下巴推荐使用双向2次、中速、界面时间10s",
        "leftfaceRemarks": "您的肤质为：中性肤质，左脸推荐使用双向2次、低速、界面时间10s",
        "rightfaceRemarks": "您的肤质为：中性肤质，右脸推荐使用双向2次、低速、界面时间10s"
    }
};
const AppData = {
    'skinType':null
};
let sendData = {};
let recConfigMark = {};
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

/**
 * 配置数组到配置对象的转换
 * @param    {array}      items 设置参数
 * @return   {json}        返回设置对象
 */
function arrToObj(array){
    let data = {};
    data.foreheadGears = array[0].speed;//额头档位
    data.foreheadRuntime = array[0].time;//额头时间
    data.foreheadRotation = array[0].direction;//额头方向
    data.foreheadChanged = array[0].changed;
    data.noseGears = array[1].speed;//鼻子档位
    data.noseRuntime = array[1].time;//鼻子时间
    data.noseRotation = array[1].direction;//鼻子方向
    data.noseChanged = array[1].changed;
    data.chinGears = array[2].speed;//下巴档位
    data.chinRuntime = array[2].time;//下巴时间
    data.chinRotation = array[2].direction;//下巴方向
    data.chinChanged = array[2].changed;
    data.leftfaceGears = array[3].speed;//左脸档位
    data.leftfaceRuntime = array[3].time;//左脸时间
    data.leftfaceRotation = array[3].direction;//左脸方向
    data.leftfaceChanged = array[4].changed;
    data.rightfaceGears = array[4].speed;//右脸档位
    data.rightfaceRuntime = array[4].time;//右脸时间
    data.rightfaceRotation = array[4].direction;//右脸方向
    data.rightfaceChanged = array[4].changed;
    return data;
}

/**
 * 档位转换
 * @param    {string}      gearstring 参数
 * @return   {number}        返回档位
 */
function checkGearsString(gearstring){
    switch(gearstring){
        case '低': return 1;break;
        case '中': return 2;break;
        case '高': return 3;break;
        default: return 1;
    }
}

/**
 * 旋转方向转换
 * @param    {string}      rotationString 参数
 * @return   {number}        返回旋转方向
 */
function checkRotationString(rotationString){
    switch(rotationString){
        case '单向': return 1;break;
        case '双向-切换1次': return 2;break;
        case '双向-切换2次': return 3;break;
        case '双向-切换3次': return 4;break;
        default:return 1;
    }
}

/**
 * 智能推荐模式下不能更改状态
 * @return   {object}        返回智能模式下changed
 */
function getRecChanged(){
    let data = {};
    data.foreheadChanged = false;
    data.noseChanged = false;
    data.chinChanged = false;
    data.leftfaceChanged = false;
    data.rightfaceChanged = false;
    return data;
}

/**
 * 拼接返回给页面的字段
 * @return   {object}        返回给页面的字段
 */
function getTriggerData(){
    let data = {
        skinType : AppData.skinType,
        needSave : needSave,
        electricity : AppData.electricity,
        onlineStatus : AppData.onlineStatus,
        chargeStatus : AppData.chargeStatus
    };
    return data;
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        console.log('nnnnnnnnn-----',data);
        let skinType,runData;
        if(AppData.currentConfig === undefined || AppData.currentConfig == null){
            AppData.currentConfig = {};
        }
        if(AppData.recommendConfig === undefined || AppData.recommendConfig == null){
            AppData.recommendConfig = {};
        }
        if(data.currentConfig){
            AppData.currentConfig = data.currentConfig;
            AppData.currentConfig.skinType = data.skinType;
            AppData.currentConfig.smartModeSwitch = data.currentConfig.smartModeSwitch;
            smartModeSwitch = data.currentConfig.smartModeSwitch;
        }
        if(data.recommendConfig){
            AppData.recommendConfig = Funs._extends(data.recommendConfig);
            AppData.recommendConfig.skinType = data.skinType;
            AppData.recommendConfig.smartModeSwitch = AppData.currentConfig.smartModeSwitch;
            AppData.recommendConfig.model = AppData.currentConfig.smartModeSwitch;
            AppData.recommendConfig.foreheadChanged = false;
            AppData.recommendConfig.noseChanged = false;
            AppData.recommendConfig.chinChanged = false;
            AppData.recommendConfig.leftfaceChanged = false;
            AppData.recommendConfig.rightfaceChanged = false;
            recConfigMark.foreheadRemarks = data.recommendConfig.foreheadRemarks;
            recConfigMark.noseRemarks = data.recommendConfig.noseRemarks;
            recConfigMark.chinRemarks = data.recommendConfig.chinRemarks;
            recConfigMark.leftfaceRemarks = data.recommendConfig.leftfaceRemarks;
            recConfigMark.rightfaceRemarks = data.recommendConfig.rightfaceRemarks;
        }
        AppData.skinType = typeof data.skinType!=='undefined' ? data.skinType : AppData.skinType;
        AppData.electricity = typeof data.electricity!=='undefined' ? data.electricity : AppData.electricity;
        AppData.onlineStatus = typeof data.onlineStatus!=='undefined' ? data.onlineStatus : AppData.onlineStatus;
        AppData.chargeStatus = typeof data.chargeStatus!=='undefined' ? data.chargeStatus : AppData.chargeStatus;

        if(!needSave){//无数据保存时，接受所有字段
            if(smartModeSwitch == 1){
                let tempData = getTriggerData();
                this.trigger(Funs._extends(AppData.recommendConfig, tempData, recConfigMark));
            }else{
                // sendData = data;
                let tempData = getTriggerData();
                if(data.currentConfig){
                    AppData.currentConfig = Funs._extends(AppData.currentConfig,data.currentConfig);
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
            if(smartModeSwitch == 1){
                let tempData = getTriggerData();
                this.trigger(Funs._extends(AppData.recommendConfig, tempData, recConfigMark));
            }else{
                let tempData = getTriggerData();
                runData = Funs._extends(AppData.currentConfig, tempData, recConfigMark);
                this.trigger(runData);
            }
        }
    },
    onSubmit(items){
        needSave = false;
        sendData.foreheadGears = items[0].speed;//额头档位
        sendData.foreheadRuntime = items[0].time;//额头时间
        sendData.foreheadRotation = items[0].direction;//额头方向
        sendData.noseGears = items[1].speed;//鼻子档位
        sendData.noseRuntime = items[1].time;//鼻子时间
        sendData.noseRotation = items[1].direction;//鼻子方向
        sendData.chinGears = items[2].speed;//下巴档位
        sendData.chinRuntime = items[2].time;//下巴时间
        sendData.chinRotation = items[2].direction;//下巴方向
        sendData.leftfaceGears = items[3].speed;//左脸档位
        sendData.leftfaceRuntime = items[3].time;//左脸时间
        sendData.leftfaceRotation = items[3].direction;//左脸方向
        sendData.rightfaceGears = items[4].speed;//右脸档位
        sendData.rightfaceRuntime = items[4].time;//右脸时间
        sendData.rightfaceRotation = items[4].direction;//右脸方向
        sendData.source = 2;
        sendData.smartModeSwitch = smartModeSwitch;
        sendData.updateFlag = het.calcUpdateFlag(1);
        sendData.cleanSwitch = AppData.currentConfig.cleanSwitch;
        needSave = false;
        this.trigger({needSave:false});
        het.send(sendData, (data)=>{
            het.toast('同步成功！');
            needSave = false;
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
    },
    onRefreshData(){
        this.trigger(getAppData());
    },
    onChangeMode(model){
        needSave = true;
        let tempData = getTriggerData();
        if(model==1){
            AppData.currentConfig.needSave = true;
            AppData.currentConfig.showTestSkin = 0;
            AppData.currentConfig.model = 0;
            AppData.currentConfig.smartModeSwitch = 0;
            smartModeSwitch = 0;
            this.trigger(Funs._extends(AppData.currentConfig,tempData,recConfigMark));
        }else if(model==0){
            if(AppData.recommendConfig){
                AppData.recommendConfig.needSave = true;
                AppData.recommendConfig.model = 1;
                AppData.recommendConfig.smartModeSwitch = 1;
                smartModeSwitch = 1;
            }
            if(AppData.recommendConfig && AppData.skinType !== null){
                AppData.recommendConfig.showTestSkin = 1;//智能模式有推荐数据
            }else{
                AppData.recommendConfig.showTestSkin = 2;//智能模式无推荐数据
            }
            this.trigger(Funs._extends(AppData.recommendConfig,tempData,recConfigMark));
        }
    },
    onChangeGears(index,h,m,s,items){
        items[index].speed = checkGearsString(h);
        items[index].time = m;
        items[index].direction = checkRotationString(s);
        items[index].changed = items[index].changed;
        needSave = true;
        let data = arrToObj(items);
        let tempData = getTriggerData();
        AppData.currentConfig = Funs._extends(AppData.currentConfig, data, tempData, recConfigMark);
        this.trigger(AppData.currentConfig);
    }
});