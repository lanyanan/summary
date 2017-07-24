'use strict';
/**
 * 日历组件
 * @prop {array} tagDates  有数据的日期
 * @function  {fun} getTagDates 获取有请求月有数据的日期数组
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';

const timeZone = new Date().getTimezoneOffset()/60;
let timer = null;
export const Clndr = React.createClass({
    render() {
        return (
            <div className="calendar-wrap" ref='calendar'></div>
        );
    },
    componentWillReceiveProps(next){},
    componentDidMount(){
        let self = this,
            tagDates = self.props.tagDates ? self.props.tagDates: [],
            firstTagDates = self.props.firstTagDates?self.props.firstTagDates:[],
            month = this.props.month;
        clearTimeout(timer);
        timer = setTimeout(function(){
            //console.log('calendar',tagDates);
            new Calendar({
                target:'.calendar-wrap',
                className: 'cal',
                tagDates: month == (new Date().getMonth()+1) ? firstTagDates : tagDates ,
                onReady: function (dateObj) {},
                onChangeMonthBefore: function (dateObj, type) { self.getTagDates(dateObj,type) },
                onSelect: self.selectDate.bind(self),
                onChangeMonth: function (dateObj) {}
            });
        },100);
    },
    selectDate(dateObj,e){
        let tagDates = this.props.tagDates?this.props.tagDates:[];
        let day=dateObj.date>9?dateObj.date:'0'+dateObj.date,
            month=dateObj.month>9?dateObj.month:'0'+dateObj.month,
            newdate=dateObj.year+'-'+month+'-'+day;

        let dateTime = new Date(newdate).getTime(),
            todayTime = new Date().getTime();

        if(dateTime>todayTime){//未来日期比较
            het.toast("未来日期没有测试数据");
            return false;
        }else{
            if(tagDates.indexOf(dateObj.date)!=-1){//是否为有数据的日期
                //het.toast('有测试数据'+curTagDates.toString());
                let yesterday= Funs.dateFormat(dateTime-24*60*60*1000,'yyyy-MM-dd')+' 16:00:00';
                Actions.getHistoryData({"measureDateBeginNew":yesterday,"measureDateEndNew":newdate+' 16:00:00',timeZone:timeZone});
            }else{
                het.toast('今日没有测试数据');
            }
        }
    },
    getTagDates(dateObj, type){
        let month = dateObj.month,
            year = dateObj.year,
            newMonth = type === 'pre'?month-1:(type==='today'?month:month+1),
            trueMonth = newMonth>9 ? newMonth :'0'+ newMonth;
        if(newMonth>12){
            trueMonth = "01";
            year ++;
        }else if(newMonth<1){
            trueMonth = 12;
            year --;
        }

        /*获取当月有数据日期  UTC时间*/
        let firstdate = Funs.dateFormat(new Date(year,trueMonth-1,1)-24*60*60*1000,'yyyy-MM-dd'),
            endDate = new Date(year, trueMonth, 0).getDate(),
            measureDateBeginNew =  firstdate + ' 16:00:00',
            measureDateEndNew = year + '-' + trueMonth+ '-' + endDate + ' 16:00:00';

        //月份变更，请求有数据的日期
        Actions.getValidDate(
            {
                measureDateBeginNew:measureDateBeginNew, measureDateEndNew:measureDateEndNew, timeZone: timeZone
            },
            dateObj
        );
    }
})
