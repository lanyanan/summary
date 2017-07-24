'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Funs} from '../../../common/src/fun.es6';
let urlGet = '/clife-wechat-test/wechat/device/config/get';
let urlSet = '/clife-wechat-test/wechat/device/config/set';
// 默认数据行
let runData = {
    "_user_id": 1,
    "_source": 6,
    "presetStartupTimeH": 0,
    "timeCloseM": 0,
    "sourceFlag": 0,
    "presetStartupTimeM": 0,
    "_bindUserId": 10177,
    "presetShutdownTimeH": 0,
    "sessionId": "ACCF2353688C",
    "color": 5,
    "presetShutdownTimeM": 0,
    "updateFlag": 255,
    "light": 1,
    "timeCloseH": 0,
    "mist": 1,
};
function padded8Char(str) {
    let c = 8-str.length,a=[];
    for(var i=0;i<c;i++){
        a.push(0), a.join('');
    };
    return a.join('')+str;
};
// 运行数据行
//webInterface.repaint({type:1, data:runData});

let deviceId = Funs.getUrlParam('deviceId'); // clife_ACCF2353688C_7879
let connType = Funs.getUrlParam('connType') || 'WIFI';
let appId = Funs.getUrlParam('appId') || '10001';
// console.log(connType, deviceId,appId);
import {Actions} from './Actions.es6';

export const Store = Reflux.createStore({
    listenables: [Actions],
    //加载默认数据
    onGetDefaultData(){
        //模拟app发送给页面数据，造假数据
        webInterface.repaint({type:1, data:runData});
    },
    //请求接口
    onGetOnlineData(){
        $.ajax({
            url: urlGet + `?deviceId=${deviceId}` + `&appId=${appId}`,
            dataType: 'json',
            success: (data)=>{
                // console.log(data);
                //默认初始化数据，如果没有数据不请求数据
                if(data.data!=null && data.data!='' && data.data!=undefined){
                    runData = data.data;
                }
                webInterface.repaint({type:1, data:runData});
            }
        });
    },
    onRepaint(data){
        this.trigger(data);
    },
    onSwitch(e){
        if (isShutdown()) {
            // 关机状态，开机
            // runData.updateFlag = 0x01 | 0x02 | 0x08 | 0x10;
            runData.light=1;
            runData.mist=1;
        } else {
            // 开机状态，关机
            // runData.updateFlag = 0x01 | 0x02 | 0x10;
            runData.light=3;
            runData.mist=2;
        }
        this.trigger(runData);
        this.submit(runData);
    },
    onToggleColor(value){
        runData.color = value;//颜色值
        runData.light = 1;//全灯亮
        //runData.updateFlag = 0x40 | 0x00 | 0x08 | 0x00;
        //计算updateFlag
        var c1 = het.hexUpFlag(11, 1, 4);
        var c = het.hexUpFlag(31, 1, 4, c1);
        //runData.updateFlag = '80000800' || c;
        runData.updateFlag = '80000800';
        runData.timer =null;
        this.trigger(runData);
        this.submit(runData);

        // this.trigger({color: value});
    },
    onToggleLight(value){
        runData.light = value;

        runData.updateFlag = '80000000';
        //runData.updateFlag = '80000000' || het.hexUpFlag(31, 1, 4);
        runData.timer =null;
        this.trigger(runData);
        this.submit(runData);
        // this.trigger({light: value});
    },
    onToggleMist(value){
        runData.mist = value;
        runData.updateFlag = '40000000';
        //runData.updateFlag = '40000000' || het.hexUpFlag(30, 1, 4);
        runData.timer =null;
        this.trigger(runData);
        this.submit(runData);
        // this.trigger({light: value});
    },
    submit(data){
        let cfgData = {
            deviceId: deviceId,
            connType: connType,
            json: JSON.stringify(data)
        };
        $.ajax({
            //设备id~~~
            url: urlSet +`?appId=${appId}`,
            type: 'POST',
            dataType: 'json',
            data: cfgData,
            success: (data)=>{
                //重置回0
                runData.updateFlag = 0;
                //console.log(data);
                //console.log(cfgData);

            }
        });
    }
});

// 判断是否关机状态
export const isShutdown = () => runData.light==3 && runData.mist==2;
