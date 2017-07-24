'use strict';
/**
 * 日历组件
 * @prop {obj} getdata  请求接口需要传的参数
 * 
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';


export const Clndr = React.createClass({
    getInitialState: function(){
        return {datelist:[],dt:''};
    },

    render: function() {
        return (
        	<div className="calendar-wrap" ref='calendar'></div>
        );
    },
    componentDidMount:function(){
        let _this = this;
        setTimeout(function(){
            var datelist=[];
            let data =_this.state.dt,
                url='/v1/app/chealth/thermometer/getThermometerByDate',
                newmonth=Funs.dateFormatFull(new Date().getTime()/1000,'month');
            if(data!=''){
                data.date=newmonth;
                het.get(url,data,sucCallback,function(dd){console.log(dd)});
                function sucCallback(dd){
                    console.log(dd);
                let data=JSON.parse(dd),
                    date=data.data;
                if(date!=''){
                     for (var i in date)
                    {
                        /*let day=Funs.dateFormatFull(data[i].date,"day");时间戳处理*/ 
                        let day= Number(date[i].date.substring(8,11));
                        datelist.push(day);
                    }
                }

                new Calendar({
                    target:'.calendar-wrap',
                    className: 'cal',
                    tagDates:datelist,
                     //tagDates:[9,15],
                    'showToday': true,
                    onSelect: _this.selectDate,
                    onChangeMonthBefore: function (dateObj) {
                        _this.getTagDates(dateObj);
                    },
                    onToday: function (dateObj) {
                        //alert(dateObj.type);
                        _this.getTagDates(dateObj);
                        _this.selectDate(dateObj);
                    }
                    });
                }
            }
        },500);
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({dt:nextProps.getdata});
    },
    selectDate:function(dateObj,e){
         let day=dateObj.date>9?dateObj.date:'0'+dateObj.date,
             month=dateObj.month>9?dateObj.month:'0'+dateObj.month,
             newdate=dateObj.year+'-'+month+'-'+day,
             data=this.state.dt;
         Actions.changeDate(newdate,data);
    },
    getTagDates:function(dateObj){
        var datelist=[];
        let _this = this;
        let data =_this.state.dt;
        let url='/v1/app/chealth/thermometer/getThermometerByDate';
        let type=dateObj.type,
            month=dateObj.month,
            year=dateObj.year,
            newMonth=type==='pre'?month-1:(type==='today'?month:month+1),
            trueMonth=newMonth>9?newMonth:'0'+newMonth;
        console.log(type,trueMonth);
        if(data!=''){
            data.date=year+'-'+trueMonth;
            het.get(url,data,sucCallback,function(dd){console.log(dd)});

            function sucCallback(dd){
            //console.log(dd);
            let data=JSON.parse(dd),
                date=data.data;
            if(date!=''){
                 for (var i in date)
                {
                    /*let day=Funs.dateFormatFull(data[i].date,"day");时间戳处理*/ 
                    let day= Number(date[i].date.substring(8,11));
                    datelist.push(day);
                   
                } 
            }
            dateObj.tag(datelist);
            }
        }
    }
      
});