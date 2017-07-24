'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';

let AppData = {

};
let needSave = false;
//modelIndex:0-清洁,1-回春,2-滋养,3-美白,4-自定义
//0-关，1-1档，2-2档，3-3档，4-4档，5-5档，6-开，7-红，8-蓝，9-绿
//exportText:0-导入/导出 1-导出 2-导入
//(modeCorner,soundCorner,exportCorner,switchCorner,ligntCorner,timeCorner) 0-没有角标 1-普通角标 2-红色角标
let configData = [{modelIndex:0,soundGear:3,exportGear:3,exportText:1,switchMode:6,lightMode:8,runTime:15,modeCorner:1,soundCorner:0,exportCorner:0,switchCorner:0,ligntCorner:0,timeCorner:0},
                  {modelIndex:1,soundGear:0,exportGear:3,exportText:2,switchMode:6,lightMode:9,runTime:10,modeCorner:1,soundCorner:0,exportCorner:0,switchCorner:0,ligntCorner:0,timeCorner:0},
                  {modelIndex:2,soundGear:0,exportGear:3,exportText:2,switchMode:6,lightMode:7,runTime:15,modeCorner:1,soundCorner:0,exportCorner:0,switchCorner:0,ligntCorner:0,timeCorner:0},
                  {modelIndex:3,soundGear:3,exportGear:3,exportText:1,switchMode:6,lightMode:9,runTime:13,modeCorner:1,soundCorner:0,exportCorner:0,switchCorner:0,ligntCorner:0,timeCorner:0},
                  {modelIndex:4,soundGear:0,exportGear:0,exportText:0,switchMode:0,lightMode:0,runTime:5,modeCorner:1,soundCorner:1,exportCorner:1,switchCorner:1,ligntCorner:1,timeCorner:1}];

//默认设置的角标信息
let configCorner = [{modeCorner:1,soundCorner:0,exportCorner:0,switchCorner:0,ligntCorner:0,timeCorner:0,needSave:false},
                    {modeCorner:1,soundCorner:1,exportCorner:1,switchCorner:1,ligntCorner:1,timeCorner:1,needSave:false},
                    {modeCorner:0,soundCorner:0,exportCorner:0,switchCorner:0,ligntCorner:0,timeCorner:0,needSave:false}];
/**
* 将档位的字符串转化为对应的数字
**/
//0-关，1-1档，2-2档，3-3档，4-4档，5-5档，6-开，7-红，8-蓝，9-绿
function stringToGear(gearString){
    let value = "";
    switch(gearString){
        case 0:
            value = 0; break;
        case '关闭':
            value = 0; break;
        case'关':
            value = 0; break;
        case'导入':
            value = 2;break;
        case'导出':
            value = 1;break;
        case'1档':
            value = 1; break;
        case'2档':
            value = 2; break;
        case'3档':
            value = 3; break;
        case'4档':
            value = 4; break;
        case'5档':
            value = 5; break;
        case'开':
            value = 6; break;
        case'红光':
            value = 7; break;
        case'蓝光':
            value = 8; break;
        case'绿光':
            value = 9; break;
        default:
            value = '';break;
    }
    return value;
}

/**
* 将档位的数字转化为对应的字符串
**/
//0-关，1-1档，2-2档，3-3档，4-4档，5-5档，6-开，7-红，8-绿光，9-蓝光
function gearToString(gear){
    let value = "";
    switch(gear){
        case 0:
            value = '关闭'; break;
        case 1:
            value = '1档'; break;
        case 2:
            value = '2档'; break;
        case 3:
            value = '3档'; break;
        case 4:
            value = '4档'; break;
        case 5:
            value = '5档'; break;
        case 6:
            value = '开'; break;
        case 7:
            value = '红光'; break;
        case 8:
            value = '蓝光'; break;
        case 9:
            value = '绿光'; break;
        default:
            value = '';break;
    }
    return value;
}

/**
* 获取当前运行模式,智能开关位,电量,离线等信息
**/
function getAppData(){
    // let modelIndex;
    // AppData.busiSwitch ? modelIndex = AppData.mode : modelIndex = AppData.currentRunMode;
    return {
        mode:AppData.mode,
        // modelIndex: AppData.modelIndex,
        busiSwitch: AppData.busiSwitch,
        skinDataCode: AppData.skinDataCode,
        electricity: AppData.electricity,
        onlineStatus: AppData.onlineStatus,
        chargeStatus: AppData.chargeStatus,
        needSave : needSave
    }
}

/**
* 转换gear信息
**/
function transGear(data){
    if(data.gears1 === undefined){
        return;
    }
    let modelIndex;
    let exportText;
    modelIndex = data.currentRunMode-1;
    if(data.gears2){
        exportText = 1;
    }else if(data.gears3){
        exportText = 2;
    }else{
        exportText = 0;
    }
    return {
        modelIndex:modelIndex,
        soundGear:data.gears1,
        exportGear:data.gears2 || data.gears3,
        exportText:exportText,
        switchMode:data.gears4,
        lightMode:data.gears5,
        runTime:data.runTime
    }
}
/**
* 获取每个档位的角标信息
**/ 
//(modeCorner,soundCorner,exportCorner,switchCorner,ligntCorner,timeCorner) 0-没有角标 1-普通角标 2-红色角标       
function getCorner(index){
    return{
        modeCorner:configData[index].modeCorner,
        soundCorner:configData[index].soundCorner,
        exportCorner:configData[index].exportCorner,
        switchCorner:configData[index].switchCorner,
        ligntCorner:configData[index].ligntCorner,
        timeCorner:configData[index].timeCorner
    }
}

/**
* 保存成功重置各个模式的角标信息
**/
function resetCorner(index){
    let mode;
    configData.map((item,index)=>{
        if(index == 4){
            item.modeCorner = 1;
            item.soundCorner = 1;
            item.exportCorner = 1;
            item.switchCorner = 1;
            item.ligntCorner = 1;
            item.timeCorner = 1;
        }else{
            item.modeCorner = 1;
            item.soundCorner = 0;
            item.exportCorner = 0;
            item.switchCorner = 0;
            item.ligntCorner = 0;
            item.timeCorner = 0;
        }
    });
    if(AppData.busiSwitch == 1){
        mode = configCorner[2];
    }else{
        index == 4 ? mode = configCorner[1] : mode = configCorner[0];
    }
    AppData.currentRunConfig = Funs._extends(AppData.currentRunConfig,mode);
    return mode;
}


export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        console.log('nnnnnnnnns-----',data);

        AppData.electricity = typeof data.electricity!=='undefined' ? data.electricity : AppData.electricity;
        AppData.onlineStatus = typeof data.onlineStatus!=='undefined' ? data.onlineStatus : AppData.onlineStatus;
        AppData.chargeStatus = typeof data.chargeStatus!=='undefined' ? data.chargeStatus : AppData.chargeStatus;

        if(!needSave){//无需要保存的数据
            if(data.currentRunConfig){
                AppData.currentRunConfig = transGear(data.currentRunConfig);
                AppData.currentRunConfig.modelIndex = data.currentRunMode-1;
                if(data.currentRunMode-1 == 4){
                    configData[4] = Funs._extends(configData[4],AppData.currentRunConfig);
                    AppData.currentRunConfig = Funs._extends(AppData.currentRunConfig,configData[4]);
                }
                console.log('AppData.currentRunConfig:',JSON.stringify(AppData.currentRunConfig));
            }
            if(data.importExportConfig){
                AppData.importExportConfig = transGear(data.importExportConfig);
                AppData.importExportConfig.modelIndex = data.mode-1;
                AppData.importExportConfig.modeCorner = 0;
                AppData.importExportConfig.soundCorner = 0;
                AppData.importExportConfig.exportCorner = 0;
                AppData.importExportConfig.switchCorner = 0;
                AppData.importExportConfig.ligntCorner = 0;
                AppData.importExportConfig.timeCorner = 0;
                console.log('AppData.importExportConfig:',JSON.stringify(AppData.importExportConfig));
            }
            AppData.mode = typeof data.mode!=='undefined' ? data.mode : AppData.mode;
            AppData.currentRunMode = typeof data.currentRunMode!=='undefined' ? data.currentRunMode : AppData.currentRunMode;
            AppData.busiSwitch = typeof data.busiSwitch!=='undefined' ? data.busiSwitch : AppData.busiSwitch;
            AppData.skinDataCode = typeof data.skinDataCode!=='undefined' ? data.skinDataCode : AppData.skinDataCode;
            // AppData.busiSwitch == 1 ? AppData.modelIndex = AppData.mode-1 : AppData.modelIndex = AppData.currentRunMode-1;
            if(AppData.busiSwitch == 1){
                let data1 = getAppData();
                let tempData = Funs._extends(AppData.importExportConfig,data1);
                this.trigger(tempData);
            }else{
                let data1 = getAppData();
                AppData.currentRunConfig = Funs._extends({},AppData.currentRunConfig,transGear(data));
                let corner = getCorner(AppData.currentRunConfig.modelIndex);
                if(AppData.currentRunConfig.modelIndex == 4){
                    configData[4] = Funs._extends({},configData[4],transGear(data));
                }
                console.log('收到新数据的：',JSON.stringify(AppData.currentRunConfig));
                AppData.currentRunConfig = Funs._extends({},configData[AppData.modelIndex],AppData.currentRunConfig,corner);
                console.log('合并configData数据的：',JSON.stringify(AppData.currentRunConfig));
                data1 = Funs._extends(AppData.currentRunConfig,data1);
                // console.log('AppData.currentRunConfig2222',configData);
                this.trigger(data1); 
            }
        }else{//有数据保存时
            if(AppData.busiSwitch == 1){
                let data1 = getAppData();
                let tempData = Funs._extends(AppData.importExportConfig,data1);
                this.trigger(tempData);
            }else{
                let data1 = getAppData();
                let tempData = Funs._extends(AppData.currentRunConfig,data1);
                this.trigger(tempData);
            }
        }
    },
    onSetMode(mode){//模式选择
        let oldMode = AppData.currentRunConfig.modelIndex;
        if(mode != oldMode){
            AppData.updateFlag |= Math.pow(2,0);
            configData[mode].modeCorner = 2;
            needSave = true;
        }else{
            needSave ? needSave = true: needSave = false;
        }
        let tempData = {
            modeShow:false
        };
        AppData.modelIndex = mode;
        let data1 = getAppData();
        AppData.currentRunConfig = Funs._extends({},AppData.currentRunConfig,configData[mode]);
        tempData = Funs._extends({},AppData.currentRunConfig,data1,tempData);
        this.trigger(tempData);
    },
    onSetGear(mode,gear){//超声波模式选择
        let oldSound = AppData.currentRunConfig.soundGear;
        if(stringToGear(gear) != oldSound){
            AppData.updateFlag |= Math.pow(2,1);
            configData[mode].soundCorner = 2;
            needSave = true;
        }else{
            needSave ? needSave = true: needSave = false;
        }
        configData[mode].soundGear = stringToGear(gear);
        let tempData;
        let data1 = getAppData();
        AppData.currentRunConfig = Funs._extends({},AppData.currentRunConfig,configData[mode]);
        tempData = Funs._extends(AppData.currentRunConfig,data1);
        this.trigger(tempData);
    },
    onSetExport(mode,h,m){//导入导出设置
        let oldExpText = AppData.currentRunConfig.exportText;
        let oldExpGear = AppData.currentRunConfig.exportGear;
        if(oldExpText != stringToGear(h) || oldExpGear != stringToGear(m)){
            AppData.updateFlag |= Math.pow(2,2);
            AppData.updateFlag |= Math.pow(2,3);
            configData[mode].exportCorner = 2;
            needSave = true;
        }else{
            needSave ? needSave = true: needSave = false;
        }
        if(stringToGear(m) == 0){
            configData[mode].exportGear = 0;
            configData[mode].exportText = 0;
        }else{
            configData[mode].exportGear = stringToGear(m);
            configData[mode].exportText = (h == '导出'?1:2);
        }
        let data1 = getAppData();
        AppData.currentRunConfig = Funs._extends({},AppData.currentRunConfig,configData[mode]);
        let tempData = Funs._extends(AppData.currentRunConfig,data1);
        this.trigger(tempData);
    },
    onModeSwicth(mode,modeOpen){//按摩模式设置
        let oldSwitch = AppData.currentRunConfig.switchMode;
        let newSwitch = modeOpen ?  0 : 6;
        if(oldSwitch != newSwitch){
            AppData.updateFlag |= Math.pow(2,4);
            configData[mode].switchCorner = 2;
            needSave = true;
        }else{
            needSave ? needSave = true: needSave = false;
        }
        configData[mode].switchMode = newSwitch;
        let tempData = {
            modelSwitchShow : false
        }
        let data1 = getAppData();
        AppData.currentRunConfig = Funs._extends({},AppData.currentRunConfig,configData[mode]);
        tempData = Funs._extends({},AppData.currentRunConfig,data1,tempData);
        this.trigger(tempData)
    },
    onSetLight(mode,modeLight){//灯光设置
        let oldLight = AppData.currentRunConfig.lightMode;
        let light;
        switch(modeLight){
            case 0:
                light = 7;break;
            case 1:
                light = 8;break;
            case 2:
                light = 9;break;
            default:
                light = 0;break;
        }
        if(light != oldLight){
            AppData.updateFlag |= Math.pow(2,5);
            configData[mode].ligntCorner = 2;
            needSave = true;
        }else{
            needSave ? needSave = true: needSave = false;
        }
        let tempData = {
            lightShow:false
        }
        configData[mode].lightMode = light;
        let data1 = getAppData();
        AppData.currentRunConfig = Funs._extends({},AppData.currentRunConfig,configData[mode]);
        tempData = Funs._extends({},AppData.currentRunConfig,data1,tempData);
        this.trigger(tempData);   
    },
    onSubmitRunTime(mode,time) {//运行时间设置
        let oldRunTime = AppData.currentRunConfig.runTime;
        if(oldRunTime != time){
            AppData.updateFlag |= Math.pow(2,6);
            configData[mode].timeCorner = 2;
            needSave = true;
        }else{
            needSave ? needSave = true: needSave = false;
        }        
        let tempData = {
            runTimeShow:false
        }
        configData[mode].runTime = time;
        let data1 = getAppData();
        AppData.currentRunConfig = Funs._extends({},AppData.currentRunConfig,configData[mode]);
        tempData = Funs._extends(AppData.currentRunConfig,data1,tempData);
        this.trigger(tempData);
    },
    //手动智能切换
    onBusiSwitch(busiSwitch){
        needSave = true;
        AppData.busiSwitch = busiSwitch;
        AppData.updateFlag |= Math.pow(2,2);
        let corner;
        if(busiSwitch == 1){
            let recommend = AppData.importExportConfig;
            let data = getAppData();
            let runData = Funs._extends(recommend,data);
            this.trigger(runData);
        }else{
            corner = getCorner(AppData.currentRunConfig.modelIndex);
            let current = AppData.currentRunConfig;
            let data = getAppData();
            let runData = Funs._extends(current,data,corner);
            this.trigger(runData);
        }
    },
    onSubmit(){
        let sendData = {};
        let tempData;
        if(AppData.busiSwitch == 1){
            tempData = AppData.importExportConfig;
        }else{
            tempData = AppData.currentRunConfig;
        }
        console.log('123123212',JSON.stringify(tempData));
        sendData.gears1 = tempData.soundGear;
        if(tempData.exportText == 0){
            sendData.gears2 = tempData.exportGear;
            sendData.gears3 = tempData.exportGear;
        }else if(tempData.exportText == 1){
            sendData.gears2 = tempData.exportGear;
            sendData.gears3 = 0;
        }else{
            sendData.gears2 = 0;
            sendData.gears3 = tempData.exportGear;
        }
        sendData.gears4 = tempData.switchMode;
        sendData.gears5 = tempData.lightMode;
        sendData.runTime = tempData.runTime;
        sendData.busiSwitch = AppData.busiSwitch;
        sendData.configMode = tempData.modelIndex+1;
        sendData.updateFlag = AppData.updateFlag;
        console.log('sendData:',sendData);
        needSave = false;
        let triggerData = resetCorner(tempData.modelIndex);
        this.trigger(triggerData);
        het.send(sendData, (data)=>{
            het.toast('同步成功！');
            needSave = false;
            this.trigger(triggerData);
        }, (data)=>{
            het.toast('同步失败！');
            needSave = true;
            let tempData = Funs._extends({},triggerData,{needSave:true})
            this.trigger(tempData);
        });
        AppData.updateFlag = 0;
    }
});