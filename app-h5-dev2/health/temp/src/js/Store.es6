'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';



export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        this.trigger(data);
    },
    onChangeDate(newdate,data){
        let timelist=[],
            templist=[],
            _this=this;
            //datajson={"data": [{"key": "2016-06-12 10:00:00","value": "36.4"},   {"key": "2016-06-12 11:00:00","value": "36.6"},
            // {"key": "2016-06-12 15:00:00","value": "36.9"}, {"key": "2016-06-12 18:00:00", "value": "37.4" }]};
       
           let  url='/v1/app/chealth/thermometer/getThermometerByDate';
           data.date=newdate;
           het.get(url,data,sucCallback,function(dd){console.log(dd);});
          // het.get(url,data,function(dd){console.log('sucCallback'+dd);},function(dd){alert('error'+dd);});

        
        function sucCallback(dt){
            var data=JSON.parse(dt),
                date=data.data;
            //console.log(date);
            for (var i in date)
            {
                /*let time=Funs.dateFormatFull(data[i].key,"-",1);时间戳处理*/
                /*let time=date[i].key.substring(11,16), */
                //utc要改为本地时间
                let utcDay= date[i].key.split(' '),
                    utcDate=utcDay[0].split('-'),
                    utcTime=utcDay[1].split(':'),
                    timetamp=Math.round(Date.UTC(utcDate[0],utcDate[1]-1,utcDate[2],utcTime[0],utcTime[1],utcTime[2])/1000),
                    time=Funs.dateFormatFull(timetamp,"-",1),
                    temp=date[i].value<34?'34':(date[i].value>42?'42':date[i].value);
                timelist.push(time);
                templist.push(temp);
                console.log(timetamp);
            }
             console.log(timelist,templist);
             _this.trigger({timeArray:timelist,tempArray:templist});
        }
    }
});