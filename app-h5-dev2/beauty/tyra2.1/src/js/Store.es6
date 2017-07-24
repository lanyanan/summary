'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
var Toast = require('../../../common/src/lib/Toast.jsx');
// 定义toast函数，以供多次调用
var topToast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    ReactDOM.render(<Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,document.getElementById('mytoast'));
};
const AppData = {};

const temp = {};

let needSave = false;

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        Funs._extends(AppData,data);
        if (!AppData.busiSwitch) { // 手动模式
            AppData.mode = AppData.currentMode;
            AppData.gear = AppData.currentGear;
        } else{
            AppData.mode = AppData.recommendMode;
            AppData.gear = AppData.recommendGear;
        }
        this.trigger(AppData);
    },
    onReceiveRepaint(data, type){
        if(needSave){
            return;
        }
        Funs._extends(AppData,data);
        if(AppData.busiSwitch == 1 && (AppData.type == null || AppData.type <= 1)){
            AppData.busiSwitch = 0;
        }
        if (!AppData.busiSwitch) { // 手动模式
            AppData.mode = AppData.currentMode;
            AppData.gear = AppData.currentGear;
        } else{
            AppData.mode = AppData.recommendMode;
            AppData.gear = AppData.recommendGear;
        }
        this.trigger(AppData);
    },
    onToggleBusi: function() {
        needSave = true;
        if(AppData.busiSwitch != 1 && (AppData.type == null || AppData.type <= 1)){
            het.toast("您还未测试肤质，请先测试肤质！");
            return;
        }
        if(AppData.updateFlag == null){
            AppData.updateFlag = 0;
        }
        AppData.busiSwitch = !AppData.busiSwitch ? 1 : 0;
        if (AppData.busiSwitch) { // 自动模式
            AppData.mode = AppData.recommendMode;
            AppData.gear = AppData.recommendGear;
        } else { // 切回手动模式
            AppData.mode = AppData.currentMode;
            AppData.gear = AppData.currentGear;
        }
        if(temp.busiSwitch == null || AppData.busiSwitch == temp.busiSwitch){
            AppData.updateFlag += 4;
        } else if(AppData.updateFlag >= 4){
            AppData.updateFlag -= 4;
        }
        if(temp.busiSwitch == 0 && AppData.busiSwitch == 1){
            AppData.updateFlag = 0;
        }
        if(temp.busiSwitch == null){
            temp.busiSwitch = AppData.busiSwitch;
        }
        if(AppData.updateFlag > 0){
            AppData.needSave = true;
        } else{
            AppData.needSave = false;
        }
        this.trigger(AppData);
    },
    onSelectMode: function(data) {
        needSave = true;
        if(AppData.updateFlag == null){
            AppData.updateFlag = 0;
        }
        if(temp.mode == null){
            temp.mode = AppData.mode;
        }
        if(data.currentMode != null && data.currentMode != temp.mode){
            AppData.updateFlag += 1;
            AppData.modechange = true;
        } else if((AppData.updateFlag >= 1 && AppData.updateFlag < 2) 
            || (AppData.updateFlag >= 3 && AppData.updateFlag < 4)
            || (AppData.updateFlag >= 5 && AppData.updateFlag < 6)){
            AppData.updateFlag -= 1;
            AppData.modechange = false;
        }
        if(AppData.updateFlag > 0){
            AppData.needSave = true;
        } else{
            AppData.needSave = false;
        }
        Funs._extends(AppData,data);
        AppData.mode = AppData.currentMode;
        this.trigger(AppData);
    },
    onSelectGear: function(data) {
        needSave = true;
        if(AppData.updateFlag == null){
            AppData.updateFlag = 0;
        }
        if(temp.gear == null){
            temp.gear = AppData.gear;
        }
        if(data.currentGear != null && data.currentGear != temp.gear){
            AppData.updateFlag += 2;
            AppData.gearchange = true;
        } else if((AppData.updateFlag >= 2 && AppData.updateFlag < 4)
            || (AppData.updateFlag >= 6 && AppData.updateFlag < 8)){
            AppData.updateFlag -= 2;
            AppData.gearchange = false;
        }
        if(AppData.updateFlag > 0){
            AppData.needSave = true;
        } else{
            AppData.needSave = false;
        }
        Funs._extends(AppData,data);
        AppData.gear = AppData.currentGear;
        this.trigger(AppData);
    },
    onSync: function() {
        if (AppData.needSave) {
            // 同步数据至app
            temp.mode = AppData.recommendMode;
            temp.gear = AppData.recommendGear;
            AppData.recommendMode = AppData.mode;
            AppData.recommendGear = AppData.gear;
            het.send(AppData, function(data){
                het.toast("同步成功！");
                Actions.repaint({needSave: false, updateFlag: 0, modechange: false, gearchange:false, currentMode: AppData.mode, currentGear: AppData.gear, recommendMode: temp.mode, recommendGear: temp.gear, busiSwitch: AppData.busiSwitch});
                topToast("使用完提拉嫩肤仪,建议进行肤质测试,以得到更好的效果...");
                temp.busiSwitch = null;
                temp.mode = null;
                temp.gear = null;
                needSave = false;// 重置
            }, function(data){
                het.toast("同步失败！");
                Actions.repaint({updateFlag: 0, needSave: true, modechange: false, gearchange:false});
                temp.busiSwitch = null;
                temp.mode = null;
                temp.gear = null;
                needSave = true;// 重置
            });
            Actions.repaint({updateFlag: 0, needSave: false, currentMode: AppData.mode, currentGear: AppData.gear, modechange: false, gearchange:false});
        }
    }
});