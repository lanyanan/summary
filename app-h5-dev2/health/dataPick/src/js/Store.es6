'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
let options={};

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        this.trigger(data);
    },
    onGetTime(opt){
        options.accessToken=opt.accessToken,
        options.appId = opt.appId,
        options.deviceId=opt.deviceId,
        options.timestamp=opt.timestamp,
        options.memberId=opt.memberId,
        options.userType=opt.userType;
    },
    onGetHisData(beginDate, endDate){
        var _this = this;
        let data = options;
        data.beginDate = beginDate;
        data.endDate = endDate;
        het.get('/v1/app/chealth/bodyfat/getBodyFatMonthData', data,
            function (data) {
                _this.trigger({"data": _this.classifyFn(data)})
            }, function () {
                het.toast('数据请求错误')
            });
    },
    classifyFn (data){
        data=data.data
        var len = data.length,newArr={},_weight=[],_fatRate=[],_boneWeight=[],_meatRate=[],_dataTime=[];
        for(var i=0;i<len;i++){
            for(var i=0;i<len;i++){
                if(data[i].dataTime[5]==0){
                    _dataTime.push(data[i].dataTime.substring(6).replace('-','.'));
                }else{
                    _dataTime.push(data[i].dataTime.substring(5).replace('-','.'));
                }
                _weight.push(data[i].weight);
                _fatRate.push(data[i].fatRate);
                _boneWeight.push(data[i].boneWeight);
                _meatRate.push(data[i].meatRate);
            }
            return newArr={_dataTime,_weight,_fatRate,_boneWeight,_meatRate}
        }
    }
});