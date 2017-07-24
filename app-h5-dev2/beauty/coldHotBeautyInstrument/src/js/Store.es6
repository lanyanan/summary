'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';

let needSave = false;
let smartModeSwitch = 0;
const AppData = {
	
};
let sendData = {};
let items = [
	{'modeWord':'水润护理',mIndex:0,coldtitle:'10',hottitle: '40','modeImg':'water','massageSwitch':0,'hotTemp': 40,'coldTemp': 10,'workMinutes': 8,'steps': [{'name':'热护理','timeLength':3,'mark':'hot'},{'name':'冷护理','timeLength':1,'mark':'cold'},{'name':'热护理','timeLength':3,'mark':'hot'},{'name':'冷护理','timeLength':1,'mark':'cold'}]},
	{'modeWord':'弹性护理',mIndex:1,coldtitle:'8',hottitle: '42','modeImg':'flex','massageSwitch':0,'hotTemp': 42,'coldTemp': 8,'workMinutes': 8,'steps': [{'name':'热护理','timeLength':6,'mark':'hot'},{'name':'冷护理','timeLength':2,'mark':'cold'}]},
	{'modeWord':'清爽护理',mIndex:2,coldtitle:'8',hottitle: '42','modeImg':'cool','massageSwitch':0,'hotTemp': 42,'coldTemp': 8,'workMinutes': 8,'steps': [{'name':'热护理','timeLength':2,'mark':'hot'},{'name':'冷护理','timeLength':1,'mark':'cold'},{'name':'热护理','timeLength':2,'mark':'hot'},{'name':'冷护理','timeLength':1,'mark':'cold'},{'name':'热护理','timeLength':2,'mark':'hot'}]},
	{'modeWord':'控油护理',mIndex:3,coldtitle:'6',hottitle: '44','modeImg':'control','massageSwitch':0,'hotTemp': 44,'coldTemp': 6,'workMinutes': 8,'steps': [{'name':'热护理','timeLength':2,'mark':'hot'},{'name':'冷护理','timeLength':2,'mark':'cold'},{'name':'热护理','timeLength':2,'mark':'hot'},{'name':'冷护理','timeLength':2,'mark':'cold'}]},
	{'modeWord':'自定义',mIndex:4,coldtitle:'',hottitle: '','modeImg':'custom','massageSwitch':0,'hotTemp': 42,'coldTemp': 8,'workMinutes': 8,'steps': [{'name':'热护理','timeLength':6,'mark':'hot'},{'name':'冷护理','timeLength':2,'mark':'cold'},{'name':'热护理','timeLength':0,'mark':'hot'},{'name':'冷护理','timeLength':0,'mark':'cold'},{'name':'热护理','timeLength':0,'mark':'hot'}]}
];

let recItems = [
    {'modeWord':'水润护理',mIndex:0,coldtitle:'',hottitle: '','modeImg':'water','massageSwitch':0,'hotTemp': 40,'coldTemp': 10,'workMinutes': 8,'steps': [{'name':'热护理','timeLength':3,'mark':'hot'},{'name':'冷护理','timeLength':1,'mark':'cold'},{'name':'热护理','timeLength':3,'mark':'hot'},{'name':'冷护理','timeLength':1,'mark':'cold'}]},
    {'modeWord':'弹性护理',mIndex:1,coldtitle:'',hottitle: '','modeImg':'flex','massageSwitch':0,'hotTemp': 42,'coldTemp': 8,'workMinutes': 8,'steps': [{'name':'热护理','timeLength':6,'mark':'hot'},{'name':'冷护理','timeLength':2,'mark':'cold'}]},
    {'modeWord':'清爽护理',mIndex:2,coldtitle:'',hottitle: '','modeImg':'cool','massageSwitch':0,'hotTemp': 42,'coldTemp': 8,'workMinutes': 8,'steps': [{'name':'热护理','timeLength':2,'mark':'hot'},{'name':'冷护理','timeLength':1,'mark':'cold'},{'name':'热护理','timeLength':2,'mark':'hot'},{'name':'冷护理','timeLength':1,'mark':'cold'},{'name':'热护理','timeLength':2,'mark':'hot'}]},
    {'modeWord':'控油护理',mIndex:3,coldtitle:'',hottitle: '','modeImg':'control','massageSwitch':0,'hotTemp': 44,'coldTemp': 6,'workMinutes': 8,'steps': [{'name':'热护理','timeLength':2,'mark':'hot'},{'name':'冷护理','timeLength':2,'mark':'cold'},{'name':'热护理','timeLength':2,'mark':'hot'},{'name':'冷护理','timeLength':2,'mark':'cold'}]}
]
/**
 * 拼接返回给页面的字段
 * @return   {object}        返回给页面的字段
 */
function getTriggerData(){
    let data = {
        skinTypeName : AppData.skinTypeName,
        needSave : needSave,
        electricity : AppData.electricity,
        onlineStatus : AppData.onlineStatus,
    };
    return data;
}
function getRecRenderData(modeName){
        let data = {};
        switch(modeName){
            case 1:
                data = recItems[0];
                break;
            case 2:
                data = recItems[1];
                break;
            case 3:
                data = recItems[2];
                break;
            case 4:
                data = recItems[3];
                break;
        }
        return data;
}
function getRenderData(modeName){
	let data = {};
	switch(modeName){
		case 1:
			data = items[0];
			break;
		case 2:
			data = items[1];
			break;
		case 3:
			data = items[2];
			break;
		case 4:
			data = items[3];
			break;
        case 10:
            data = items[4];
            break;
        case 16:
            data = items[4];
            break;
        case 17:
            data = items[4];
            break;
	}
	return data;
}
function getHotGear(deg){
    let index=0;
    switch(deg){
        case 38:
            index=1;
            break;
        case 40:
            index=2;
            break;
        case 42:
            index=3;
            break;
        case 44:
            index=4;
            break;
        case 46:
            index=5;
            break;
    }
    return index;
}
function getColdGear(deg){
    let index=0;
    switch(deg){
        case 14:
            index=1;
            break;
        case 12:
            index=2;
            break;
        case 10:
            index=3;
            break;
        case 8:
            index=4;
            break;
        case 6:
            index=5;
            break;
    }
    return index;
}
function getHotDeg(num){
    let deg=0;
    switch(num){
        case 0:
            deg=38;
            break;
        case 1:
            deg=38;
            break;
        case 2:
            deg=40;
            break;
        case 3:
            deg=42;
            break;
        case 4:
            deg=44;
            break;
        case 5:
            deg=46;
            break;
    }
    return deg;
}
function getColdDeg(num){
    let deg=0;
    switch(num){
        case 0:
            deg=14;
            break;
        case 1:
            deg=14;
            break;
        case 2:
            deg=12;
            break;
        case 3:
            deg=10;
            break;
        case 4:
            deg=8;
            break;
        case 5:
            deg=6;
            break;
    }
    return deg;
}
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        // console.log('数据中的肤质名',data.skinTypeName);
        if(data.modeName==0){
            return false
        }
        let skinTypeName,runData;
        if(AppData.currentConfig === undefined || AppData.currentConfig == null){
            AppData.currentConfig = {};
        }
        if(AppData.recommendConfig === undefined || AppData.recommendConfig == null){
            AppData.recommendConfig = {};
        }
        if(data.currentConfig){
            AppData.currentConfig = data.currentConfig;
            AppData.currentConfig.skinTypeName = data.skinTypeName;
            smartModeSwitch = data.currentConfig.smartModeSwitch;
            if(typeof data.recommendConfig==='undefined'&& typeof data.skinTypeName==='undefined'){
                AppData.skinTypeName = null;
            }
        }
        if(data.recommendConfig){
            AppData.recommendConfig = data.recommendConfig;
            AppData.recommendConfig.skinTypeName = data.skinTypeName;
            AppData.recommendConfig.smartModeSwitch = AppData.currentConfig.smartModeSwitch;
        }

        AppData.skinTypeName = typeof data.skinTypeName!=='undefined' ? data.skinTypeName : AppData.skinTypeName;
        //console.log('Appdata里面的skinTypeName',AppData.skinTypeName)
        AppData.electricity = typeof data.electricity!=='undefined' ? data.electricity : AppData.electricity;
        AppData.onlineStatus = typeof data.onlineStatus!=='undefined' ? data.onlineStatus : AppData.onlineStatus;
        if(!needSave){//无数据保存时，接受所有字段
            if(smartModeSwitch == 1){
                let tempData = getTriggerData();
                let renderData = getRecRenderData(AppData.recommendConfig.modeName);
                this.trigger(Funs._extends(AppData.recommendConfig, tempData,renderData));
            }else{
                // sendData = data;
                let tempData = getTriggerData();
                if(data.currentConfig){
                    AppData.currentConfig = Funs._extends(AppData.currentConfig,data.currentConfig);
                    let index = AppData.currentConfig.modeName;
                    if(index==10||index==16||index==17){
                        items[4].massageSwitch = AppData.currentConfig.massageSwitch;
                        
                        items[4].hotTemp = getHotDeg(AppData.currentConfig.hotCompressGears1);
                        items[4].coldTemp = getColdDeg(AppData.currentConfig.coldCompressGears1);
                        items[4].workMinutes = AppData.currentConfig.workMinutes;
                        items[4].steps[0].timeLength = AppData.currentConfig.hotCompressRuntime1;
                        items[4].steps[1].timeLength = AppData.currentConfig.coldCompressRuntime1;
                        items[4].steps[2].timeLength = AppData.currentConfig.hotCompressRuntime2;
                        items[4].steps[3].timeLength = AppData.currentConfig.coldCompressRuntime2;
                        items[4].steps[4].timeLength = AppData.currentConfig.hotCompressRuntime3;
                    }else{
                        items[index-1].massageSwitch = AppData.currentConfig.massageSwitch;
                       
                        items[index-1].hotTemp = getHotDeg(AppData.currentConfig.hotCompressGears1);
                        items[index-1].coldTemp = getColdDeg(AppData.currentConfig.coldCompressGears1);
                        items[index-1].workMinutes = AppData.currentConfig.workMinutes;
                        if(items[index-1].steps[0]){items[index-1].steps[0].timeLength = AppData.currentConfig.hotCompressRuntime1;}
                        if(items[index-1].steps[1]){items[index-1].steps[1].timeLength = AppData.currentConfig.coldCompressRuntime1;}
                        if(items[index-1].steps[2]){items[index-1].steps[2].timeLength = AppData.currentConfig.hotCompressRuntime2;}
                        if(items[index-1].steps[3]){items[index-1].steps[3].timeLength = AppData.currentConfig.coldCompressRuntime2;}
                        if(items[index-1].steps[4]){items[index-1].steps[4].timeLength = AppData.currentConfig.hotCompressRuntime3;}
                    }
                }else if(typeof data.smartModeSwitch!=='undefined'){
                        AppData.currentConfig.smartModeSwitch = data.smartModeSwitch;
                        AppData.currentConfig.modeName = data.modeName;
                        let index = data.modeName;
                        if(index==10||index==16||index==17){
                            items[4].massageSwitch = data.massageSwitch;
                            
                            items[4].hotTemp = getHotDeg(data.hotCompressGears1);
                            items[4].coldTemp = getColdDeg(data.coldCompressGears1);
                            items[4].workMinutes = data.workMinutes;
                            items[4].steps[0].timeLength = data.hotCompressRuntime1;
                            items[4].steps[1].timeLength = data.coldCompressRuntime1;
                            items[4].steps[2].timeLength = data.hotCompressRuntime2;
                            items[4].steps[3].timeLength = data.coldCompressRuntime2;
                            items[4].steps[4].timeLength = data.hotCompressRuntime3;
                        }else{
                            items[index-1].massageSwitch = data.massageSwitch;
                           
                            items[index-1].hotTemp = getHotDeg(data.hotCompressGears1);
                            items[index-1].coldTemp = getColdDeg(data.coldCompressGears1);
                            items[index-1].workMinutes = data.workMinutes;
                            if(items[index-1].steps[0]){items[index-1].steps[0].timeLength = data.hotCompressRuntime1;}
                            if(items[index-1].steps[1]){items[index-1].steps[1].timeLength = data.coldCompressRuntime1;}
                            if(items[index-1].steps[2]){items[index-1].steps[2].timeLength = data.hotCompressRuntime2;}
                            if(items[index-1].steps[3]){items[index-1].steps[3].timeLength = data.coldCompressRuntime2;}
                            if(items[index-1].steps[4]){items[index-1].steps[4].timeLength = data.hotCompressRuntime3;}
                        }
                        let sm = {};
                        if(AppData.skinTypeName == null || AppData.skinTypeName === undefined){
                        	sm = {smartModeSwitch: 0};
                        }
                        AppData.currentConfig = Funs._extends(AppData.currentConfig,data,sm);
                }    
                let renderData = getRenderData(AppData.currentConfig.modeName);
                let runData = Funs._extends(AppData.currentConfig, tempData,renderData);
                //console.log(111111,runData)
                this.trigger(runData);
                }
        }else{//有数据保存时，仅接受部分字段
            if(smartModeSwitch == 1){
                let tempData = getTriggerData();
                let renderData = getRecRenderData(AppData.recommendConfig.modeName);
                this.trigger(Funs._extends(AppData.recommendConfig, tempData, renderData));
            }else{
                let tempData = getTriggerData();
                runData = Funs._extends(AppData.currentConfig, tempData);
                this.trigger(runData);
            }
        }
    },
    onChangeMode(model){
        needSave = true;
        let tempData = getTriggerData();
        if(model==1){
        	let renderData = {};
            AppData.currentConfig.needSave = true;
            AppData.currentConfig.smartModeSwitch = 0;
            smartModeSwitch = 0;
            let modeName = AppData.currentConfig.modeName;
            renderData = getRenderData(modeName);
            this.trigger(Funs._extends(AppData.currentConfig,tempData,renderData));
        }else if(model==0){
            if(AppData.recommendConfig){
                AppData.recommendConfig.needSave = true;
                AppData.recommendConfig.smartModeSwitch = 1;
                smartModeSwitch = 1;
                let renderData = getRecRenderData(AppData.recommendConfig.modeName);
                this.trigger(Funs._extends(AppData.recommendConfig,tempData,renderData));
            }
        }
    },
    onConfirmMode(idx){
        needSave = true;
        let index = parseInt(idx);
        let tempData = getTriggerData();
        if(index==4){
            AppData.currentConfig.modeName = index+6;
        }else{
            AppData.currentConfig.modeName = index+1;
        }
        let renderData = getRenderData(AppData.currentConfig.modeName);
        this.trigger(Funs._extends(AppData.currentConfig,tempData,renderData));
    },
    onConfirmShock(idx,md){
        needSave = true;
        let index,massageSwitch;
        switch(md){
            case 1:
                index = 0;
                break;
            case 2:
                index = 1;
                break;
            case 3:
                index = 2;
                break;
            case 4:
                index = 3;
                break;
            case 10:
                index = 4;
                break;
            case 16:
                index = 4;
                break;
            case 17:
                index = 4;
                break;
        }
        if(idx==0){
            massageSwitch =1;
        }else if(idx == 1){
            massageSwitch = 0
        }
        
        items[index].massageSwitch = massageSwitch;
        AppData.currentConfig.massageSwitch = massageSwitch;
        AppData.currentConfig.modeName = md;
        let tempData = getTriggerData();
        let renderData = getRenderData(AppData.currentConfig.modeName);
        this.trigger(Funs._extends(AppData.currentConfig,tempData,renderData));
    },
    onSubmitHot(m,md){
    	needSave = true;
    	let index;
    	let tempData = getTriggerData();
    	switch(md){
    	    case 1:
    	        index = 0;
    	        break;
    	    case 2:
    	        index = 1;
    	        break;
    	    case 3:
    	        index = 2;
    	        break;
    	    case 4:
    	        index = 3;
    	        break;
    	    case 10:
    	        index = 4;
    	        break;
            case 16:
                index = 4;
                break;
            case 17:
                index = 4;
                break;
    	};
    	items[index].hotTemp = m;
    	AppData.currentConfig.modeName =md;
    	let renderData = getRenderData(AppData.currentConfig.modeName);
    	this.trigger(Funs._extends(AppData.currentConfig,tempData,renderData));
    },
    onSubmitCold(m,md){
    	needSave = true;
    	let index;
    	let tempData = getTriggerData();
    	switch(md){
    	    case 1:
    	        index = 0;
    	        break;
    	    case 2:
    	        index = 1;
    	        break;
    	    case 3:
    	        index = 2;
    	        break;
    	    case 4:
    	        index = 3;
    	        break;
    	    case 10:
    	        index = 4;
    	        break;
            case 16:
                index = 4;
                break;
            case 17:
                index = 4;
                break;
    	};
    	items[index].coldTemp = m;
    	AppData.currentConfig.modeName =md;
    	let renderData = getRenderData(AppData.currentConfig.modeName);
    	this.trigger(Funs._extends(AppData.currentConfig,tempData,renderData));
    },
    onSubmitClock(m,idx,md,wk){
    	needSave = true;
    	if(md==10||md==16||md==17){
    		items[4].steps[parseInt(idx)].timeLength = m;
    		// let workMinutes=0;
    		// for(let i=0,len=items[4].steps.length;i<len;i++){
    		// 	workMinutes += items[4].steps[i].timeLength;
    		// }
    		items[4].workMinutes = wk;
    		AppData.currentConfig.modeName = md;
    		let tempData = getTriggerData();
    		let renderData = getRenderData(AppData.currentConfig.modeName);
    		this.trigger(Funs._extends(AppData.currentConfig,tempData,renderData));
    	}
    },
    onSubmit(data){
    	sendData.smartModeSwitch = data.smartModeSwitch;
    	sendData.massageSwitch = data.massageSwitch;
        let md = data.modeName;
        if(md==16||md==17) md = 10;
    	sendData.modeName = md;
    	sendData.workMinutes = data.workMinutes;
    	let hotTemp = getHotGear(data.hotTemp),coldTemp = getColdGear(data.coldTemp);
    	sendData.hotCompressGears1 = hotTemp;
    	sendData.coldCompressGears1 = coldTemp;
    	sendData.hotCompressGears2 = hotTemp;
    	sendData.coldCompressGears2 = coldTemp;
    	sendData.hotCompressGears3 = hotTemp;
    	let steps = data.steps;
    	sendData.hotCompressRuntime1 = steps[0]?steps[0].timeLength:0;
    	sendData.coldCompressRuntime1 = steps[1]?steps[1].timeLength:0;
    	sendData.hotCompressRuntime2 = steps[2]?steps[2].timeLength:0;
    	sendData.coldCompressRuntime2 = steps[3]?steps[3].timeLength:0;
    	sendData.hotCompressRuntime3 = steps[4]?steps[4].timeLength:0;
    	sendData.updateFlag = het.calcUpdateFlag(1);
    	// console.log(sendData)
        this.trigger({needSave:false});
    	het.send(sendData, (data)=>{
    	    het.toast('同步成功！');
            //this.trigger({needSave:false});
    	    needSave = false; 
    	}, (data)=>{
    	    het.toast('同步失败！');
    	    needSave = true;
    	    this.trigger({needSave:true});
    	});
    },
    onSelectColdRate(value,md) {
        needSave = true;
        let index;
        let tempData = getTriggerData();
        switch(md){
            case 1:
                index = 0;
                break;
            case 2:
                index = 1;
                break;
            case 3:
                index = 2;
                break;
            case 4:
                index = 3;
                break;
            case 10:
                index = 4;
                break;
            case 16:
                index = 4;
                break;
            case 17:
                index = 4;
                break;
        };
        let m = getColdDeg(value);
        items[index].coldTemp = m;
        AppData.currentConfig.modeName =md;
        let renderData = getRenderData(AppData.currentConfig.modeName);
        this.trigger(Funs._extends(AppData.currentConfig,tempData,renderData,{showColdRange: false}));
    },
    onSelectHotRate(value,md) {
        needSave = true;
        let index;
        let tempData = getTriggerData();
        switch(md){
            case 1:
                index = 0;
                break;
            case 2:
                index = 1;
                break;
            case 3:
                index = 2;
                break;
            case 4:
                index = 3;
                break;
            case 10:
                index = 4;
                break;
            case 16:
                index = 4;
                break;
            case 17:
                index = 4;
                break;
        };
        let m = getHotDeg(value);
        items[index].hotTemp = m;
        AppData.currentConfig.modeName =md;
        let renderData = getRenderData(AppData.currentConfig.modeName);
        this.trigger(Funs._extends(AppData.currentConfig,tempData,renderData,{showHotRange: false}));
    },
    onCancelColdRange(){
        this.trigger({showColdRange: false})
    },
    onCancelHotRange(){
        this.trigger({showHotRange: false})
    }
});