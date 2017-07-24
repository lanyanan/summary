'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';
let AppData = {};
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        if(data.back==1){
          window.history.back();
        }
        AppData = Funs._extends(AppData,data);
        if(AppData.isBleConnect !== undefined) delete AppData.isBleConnect;
        // console.log('trigger',data);
        this.trigger(data);
    },
    onGetOldData(){
        this.trigger(AppData);
    },
    onChangeDate(newdate,data,isConnect){
        let timelist=[],
            templist=[],
            _this=this;
            // let datajson={"data": [{"key": "2016-12-09 01:00:00","value": "36.4"},   {"key": "2016-12-09 04:00:00","value": "36.6"},
            // {"key": "2016-12-09 08:00:00","value": "36.9"}, {"key": "2016-06-12 06:00:00", "value": "37.4" }]};
            // sucCallback();
           let  url='/v1/app/chealth/thermometer/getThermometerByMiniute';
           let haveHistoryUrl = "/v1/app/chealth/thermometer/getLatestThermometer";
           het.get(haveHistoryUrl,data,function(dt){
                var data=JSON.parse(dt),
                date = data.data || {};
                for(var i in date){
                    if(!AppData.haveHistory){
                      het.toast('haveHistory');
                    }
                    AppData.haveHistory = true;
                }
                let haveHistory = AppData.haveHistory ? true : false; 
                AppData.haveHistory = true;
                _this.trigger({haveHistory:haveHistory});
           },function(dd){console.log(dd);});
           data.date=newdate;
           het.get(url,data,sucCallback,function(dd){console.log(dd);});
           

        
        function sucCallback(dt){
          // console.log('dt',dt);
            var data=JSON.parse(dt),
                obj = data.data || {},
                date=obj.data;
            //alert(JSON.stringify(date));
            // console.log(date);
            for (var i in date)
            {
                /*let time=Funs.dateFormatFull(data[i].key,"-",1);时间戳处理*/
                /*let time=date[i].key.substring(11,16), */
                //utc要改为本地时间
                if(typeof date[i] !== "object") return;
                let utcDay= date[i].key.split(' ');
                let utcDate=utcDay[0].split('-'),
                    utcTime=utcDay[1].split(':'),
                    timetamp=Math.round(Date.UTC(utcDate[0],utcDate[1]-1,utcDate[2],utcTime[0],utcTime[1],utcTime[2])/1000),
                    time=Funs.dateFormatFull(timetamp,"-",1),
                    temp=date[i].value<34?'34':(date[i].value>42?'42':date[i].value);
                timelist.push(time);
                templist.push(temp);
                // console.log(timetamp);
            }
            timelist = (timelist instanceof Array && timelist.length>0)? timelist : ["00:00"];
            templist = (templist instanceof Array && templist.length>0)? templist : ["37"];
            let hour = new Date().getHours();
            let oneTempArray = [];
            let oneTimeArray = [];
            let sixTempArray = [];
            let sixTimeArray = [];
            timelist.map((item,index)=>{
                let arr = item.split(':');
                if(arr[0]>=(hour-1)&&arr[0]<hour){
                    oneTimeArray.push(item);
                    oneTempArray.push(timelist[index]);
                }else if(arr[0]>=(hour-6)&&arr[0]<hour){
                    sixTimeArray.push(item);
                    sixTempArray.push(timelist[index]);
                }
            });
             _this.trigger({timeArray:timelist,tempArray:templist,highestThermometer:obj.highestThermometer,description:obj.description,dateTime:obj.dataTime,oneTempArray:oneTempArray,oneTimeArray:oneTimeArray,sixTempArray:sixTempArray,sixTimeArray:sixTimeArray,initTimeArray:timelist,initTempArray:templist});
        }
    }
});