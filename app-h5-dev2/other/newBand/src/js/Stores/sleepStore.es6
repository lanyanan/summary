'use strict';

import {sleepAction} from '../Actions/sleepAction.es6';
import Path from '../ApiPath.es6';

export const sleepStore = Reflux.createStore({
    listenables: [sleepAction],

    // 获取睡眠详细信息
    onGetMattressDetailData(opts, callback, err){
    	var url = Path.aPath + '/v1/app/csleep/mattress/getMattressDetailData';
        
        het.get(url, opts, (data)=>{
            callback && callback(data);
        },err)
    },
    
    // 获取最新睡眠状态
    onGetLastRawStatus(callback){
        var url = Path.aPath + '/v1/app/csleep/mattress/getLastRawStatus';

        het.get(url, (data)=>{
            callback && callback(data);
        })
    },

    // 获取某月的睡眠数据
    onGetDateTime: function(date){
        var self = this,
            url = Path.aPath + '/v1/app/csleep/mattress/getMonthDateList';

        het.get(url, {date:date}, (data)=>{
            var i = 0, len = data.length, list = [];

            for(; i < len; i++){ 
                list.push(data[i].dataTime);
            }

            self.trigger({dateList: list, nextTime: list[len - 1], flag: 'list'})
        })
    }
});