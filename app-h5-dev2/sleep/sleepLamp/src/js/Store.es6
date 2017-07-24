'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';


let lightTimer=0; // 亮度计时器，防止操作过频繁
let colorTimer=0; // 色温计时器，防止操作过频繁

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        if (data) {
            data.tips = '';
            data.tipsShow = false;
            if (data.onlineStatus && data.onlineStatus!=0) {
                data.tips = '设备不在线';
                data.tipsShow = true;
            }
            this.trigger(data);
        } else if (data.msg) {
            this.trigger({tips: json.msg, tipsShow: true});
        }
    },
    onChangeSwitch(value){

        het.send({switchStatus: value}, (res)=>{

            if (res.code===0) {
                console.log('调节开关成功');
            }
        });

        this.trigger({switchStatus:value});
    },
    onChangeMode(value){
        let modes = [
            {colorTemp:0, lightness:10, sceneMode:1},
            {colorTemp:2, lightness:8, sceneMode:2,},
            {colorTemp:1, lightness:2, sceneMode:3,}
        ]

        het.send(modes[value], (res)=>{
            if (res.code===0) {
                console.log('调节模式成功');
            }
        });
        this.trigger(modes[value]);
    },
    onChangeLight(value){
        clearTimeout(lightTimer);
        lightTimer = setTimeout(()=>{
            het.send({lightness: value}, (res)=>{
                if (res.code===0) {
                    console.log('调节亮度成功');
                }
            });
        }, 600);
        this.trigger({lightness:value});
    },
    onChangeColor(value){
        clearTimeout(colorTimer);
        colorTimer = setTimeout(()=>{
            het.send({colorTemp: value}, (res)=>{
                if (res.code===0) {
                    console.log('调节色温成功');
                }
            });
        }, 600);
        this.trigger({colorTemp:value});
    }
});